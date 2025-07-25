import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import dotenv from "dotenv";

// Load environment variables from .env file if it exists
dotenv.config();

// Configuration
const PUBLICATIONS_DIR = path.resolve(__dirname, "../data/publications");
const DELAY_BETWEEN_REQUESTS = 2000; // Delay between API requests in ms

/**
 * Read a YAML file and parse its content
 * @param filePath The path to the YAML file
 * @returns The parsed YAML content
 */
async function readYamlFile(filePath: string): Promise<any> {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    return yaml.load(fileContent);
  } catch (error) {
    console.error(`Error reading YAML file ${filePath}:`, error);
    return null;
  }
}

/**
 * Write content to a YAML file
 * @param filePath The path to the YAML file
 * @param content The content to write
 */
async function writeYamlFile(filePath: string, content: any): Promise<void> {
  try {
    const yamlStr = yaml.dump(content, { sortKeys: true });
    fs.writeFileSync(filePath, yamlStr, "utf-8");
  } catch (error) {
    console.error(`Error writing YAML file ${filePath}:`, error);
  }
}

/**
 * Calculate similarity between two strings (simple implementation)
 * @param str1 First string
 * @param str2 Second string
 * @returns Similarity score between 0 and 1
 */
function similarityScore(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().replace(/[^\w\s]/g, "");
  const s2 = str2.toLowerCase().replace(/[^\w\s]/g, "");
  
  // Simple Jaccard similarity for words
  const words1 = new Set(s1.split(/\s+/).filter(w => w.length > 2));
  const words2 = new Set(s2.split(/\s+/).filter(w => w.length > 2));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}

/**
 * Find DOI using Crossref API
 * @param title Publication title
 * @param authors List of publication authors
 * @returns DOI if found, null otherwise
 */
async function findDOIByCrossref(title: string, authors: string[]): Promise<string | null> {
  try {
    // Format the first author's last name for better search results
    const firstAuthor = authors[0].split(".").pop()?.trim() || "";
    
    // Encode the title for URL
    const encodedTitle = encodeURIComponent(title);
    
    // Construct the Crossref API URL
    const url = `https://api.crossref.org/works?query=${encodedTitle}&rows=5`;
    
    console.log(`  Searching Crossref for: ${title}`);
    const response = await fetch(url, {
      headers: {
        // Good practice to add contact info for Crossref API
        "User-Agent": "GRC-Publication-Tool/1.0 (mailto:grc@illinoistech.edu)"
      }
    });
    
    if (!response.ok) {
      throw new Error(`Crossref API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.message?.items?.length) {
      return null;
    }
    
    // Look through results to find the best match
    for (const item of data.message.items) {
      // Skip if no title or no DOI
      if (!item.title?.[0] || !item.DOI) continue;
        const similarity = similarityScore(item.title[0], title);
      console.log(`    Match: ${item.title[0]} (similarity: ${similarity.toFixed(2)})`);
      
      // Check if it's a good match (title similarity > 0.65)
      if (similarity > 0.65) {
        // If we have author information, also check for author match
        if (item.author && item.author.length > 0) {
          const authorsMatch = item.author.some((a: any) => {
            return a.family && 
                  firstAuthor && 
                  (a.family.toLowerCase().includes(firstAuthor.toLowerCase()) || 
                   firstAuthor.toLowerCase().includes(a.family.toLowerCase()));
          });
          
          if (authorsMatch) {
            console.log(`    ✓ Found matching DOI: ${item.DOI}`);
            return item.DOI;
          }
        } else {          // If no author info available but title match is very strong
          if (similarity > 0.8) {
            console.log(`    ✓ Found DOI based on strong title match: ${item.DOI}`);
            return item.DOI;
          }
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error(`  Error searching Crossref:`, error);
    return null;
  }
}

/**
 * Find DOI using DataCite API
 * @param title Publication title
 * @param year Publication year
 * @returns DOI if found, null otherwise
 */
async function findDOIByDataCite(title: string, year?: number): Promise<string | null> {
  try {
    // Create a query with exact title match and publication year if available
    let query = `titles.title:"${title.replace(/"/g, '\\"')}"`;
    if (year) {
      query += ` AND publicationYear:${year}`;
    }
    
    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.datacite.org/works?query=${encodedQuery}`;
    
    console.log(`  Searching DataCite for: ${title}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`DataCite API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      for (const item of data.data) {
        const itemTitle = item.attributes?.titles?.[0]?.title;
        
        if (itemTitle) {          const similarity = similarityScore(itemTitle, title);
          console.log(`    Match: ${itemTitle} (similarity: ${similarity.toFixed(2)})`);
          
          if (similarity > 0.65) {
            console.log(`    ✓ Found DOI in DataCite: ${item.attributes.doi}`);
            return item.attributes.doi;
          }
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error(`  Error searching DataCite:`, error);
    return null;
  }
}

/**
 * Find DOI using Semantic Scholar API
 * @param title Publication title
 * @param authors List of authors
 * @returns DOI if found, null otherwise
 */
async function findDOIBySemanticScholar(title: string, authors: string[]): Promise<string | null> {
  try {
    // Format the first author's last name for better search results
    const firstAuthor = authors[0].split(".").pop()?.trim() || "";
    
    // Encode the query
    const encodedQuery = encodeURIComponent(`${title} ${firstAuthor}`);
    const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodedQuery}&fields=title,authors,year,externalIds&limit=5`;
    
    console.log(`  Searching Semantic Scholar for: ${title}`);
    const response = await fetch(url, {
      headers: {
        // Add your email address for contact purposes
        'x-api-key': process.env.SEMANTIC_SCHOLAR_API_KEY || '' // Optional API key
      }
    });
    
    if (response.status === 429) {
      console.log("  ⚠️ Rate limited by Semantic Scholar API. Adding extra delay for next requests.");
      // Add extra delay for rate limiting
      await new Promise(resolve => setTimeout(resolve, 5000));
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`Semantic Scholar API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      for (const paper of data.data) {
        if (paper.title) {          const similarity = similarityScore(paper.title, title);
          console.log(`    Match: ${paper.title} (similarity: ${similarity.toFixed(2)})`);
          
          // Check if it's a good match (similarity > 0.65)
          if (similarity > 0.65 && paper.externalIds?.DOI) {
            console.log(`    ✓ Found DOI in Semantic Scholar: ${paper.externalIds.DOI}`);
            return paper.externalIds.DOI;
          }
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error(`  Error searching Semantic Scholar:`, error);
    return null;
  }
}

/**
 * Find DOI for a publication using multiple APIs
 * @param publication Publication data
 * @returns DOI if found, null otherwise
 */
async function findDOI(publication: any): Promise<string | null> {
  const title = publication.title;
  const authors = publication.authors;
  const year = publication.year;
  
  console.log(`\nLooking for DOI for: "${title}"`);
  
  // Skip if already has a DOI
  if (publication.doi) {
    console.log(`  ℹ️ Publication already has DOI: ${publication.doi}`);
    return publication.doi;
  }
  
  // Try Crossref first (usually most comprehensive)
  let doi = await findDOIByCrossref(title, authors);
  if (doi) return doi;
  
  // Add a small delay between API calls
  await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_REQUESTS));
  
  // Try Semantic Scholar next
  doi = await findDOIBySemanticScholar(title, authors);
  if (doi) return doi;
  
  // Add a small delay between API calls
  await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_REQUESTS));
  
  // Try DataCite
  doi = await findDOIByDataCite(title, year);
  if (doi) return doi;
  
  console.log(`  ❌ No DOI found for this publication`);
  return null;
}

/**
 * Process a publication: find DOI and update YAML
 * @param filePath The path to the publication YAML file
 */
async function processPublication(filePath: string): Promise<void> {
  console.log(`Processing ${filePath}`);
  
  // Read and parse the YAML file
  const publication = await readYamlFile(filePath);
  if (!publication) return;
  
  // Skip if the publication already has a DOI (double-check)
  if (publication.doi) {
    console.log(`Publication ${filePath} already has a DOI: ${publication.doi}. Skipping.`);
    return;
  }
  
  // Find DOI
  const doi = await findDOI(publication);
  if (!doi) return;
  
  // Update publication with DOI
  publication.doi = doi;
  
  // Write updated publication back to YAML file
  await writeYamlFile(filePath, publication);
  
  console.log(`Updated ${filePath} with DOI: ${doi}`);
}

async function main() {
  console.log(`Starting to process publications from ${PUBLICATIONS_DIR}`);
  
  try {
    // Read all files in the publications directory
    const files = fs.readdirSync(PUBLICATIONS_DIR);
      // Filter YAML files only
    const yamlFiles = files
      .filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));
    
    console.log(`Found ${yamlFiles.length} YAML files to process.`);
    
    // Pre-filter publications without DOI
    const filesToProcess = [];
    
    for (const file of yamlFiles) {
      const filePath = path.join(PUBLICATIONS_DIR, file);
      const publication = await readYamlFile(filePath);
      
      if (publication && !publication.doi) {
        filesToProcess.push(filePath);
      } else if (publication && publication.doi) {
        console.log(`Skipping ${filePath} - already has DOI: ${publication.doi}`);
      }
    }
    
    console.log(`Found ${filesToProcess.length} publications without DOI to process.`);
    
    // Process each publication sequentially
    for (const filePath of filesToProcess) {
      await processPublication(filePath);
      
      // Add a small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_REQUESTS * 3));
    }
    
    console.log("Finished processing publications.");
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

main();
