import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import dotenv from "dotenv";

// Load environment variables from .env file if it exists
dotenv.config();

// Set up Gemini API client
const apiKey = process.env.GEMINI_API_KEY;

if (
  !apiKey ||
  apiKey === "your_gemini_api_key_here" ||
  apiKey === "GEMINI_API_KEY"
) {
  console.error("\x1b[31mError: Valid Gemini API key not found!\x1b[0m");
  console.error(
    "Please add your Gemini API key to the .env file in the project root:"
  );
  console.error("GEMINI_API_KEY=your_actual_api_key_here");
  console.error("You can get an API key from https://ai.google.dev/");
  process.exit(1);
}

console.log("Using Gemini API with provided key");
const ai = new GoogleGenAI({ apiKey });

// Configuration
const PUBLICATIONS_DIR = path.resolve(__dirname, "../data/publications");

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
 * Download a PDF file from a URL and verify it's a valid PDF
 * @param url The URL of the PDF file
 * @returns The PDF file content as an ArrayBuffer, or null if not a valid PDF
 */
async function downloadPdf(url: string): Promise<ArrayBuffer | null> {
  try {
    console.log(`Downloading PDF from ${url}`);

    // Add headers to mimic a browser request
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      Accept: "application/pdf,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(
        `Failed to download PDF: ${response.status} ${response.statusText}`
      );
    }

    // Check if the response is actually a PDF
    const contentType = response.headers.get("content-type");
    if (contentType && !contentType.includes("application/pdf")) {
      console.warn(
        `Warning: Response from ${url} is not a PDF (Content-Type: ${contentType})`
      );
      // Some servers might not set the correct content type, so we'll check the first bytes
    }

    // Get the response as an array buffer
    const data = await response.arrayBuffer();
    
    // Check if the file starts with the PDF magic number (%PDF-)
    const firstBytes = new Uint8Array(data.slice(0, 5));
    const magic = String.fromCharCode.apply(null, Array.from(firstBytes));
    
    if (!magic.startsWith("%PDF-")) {
      console.error(`The file from ${url} is not a valid PDF (doesn't start with %PDF-)`);
      return null;
    }
    
    console.log(`Successfully downloaded and verified PDF from ${url}`);
    return data;
  } catch (error) {
    console.error(`Error downloading PDF from ${url}:`, error);
    return null;
  }
}

/**
 * Extract the abstract from a PDF using Gemini AI
 * @param pdfData The PDF data as an ArrayBuffer
 * @returns The extracted abstract
 */
async function extractAbstract(pdfData: ArrayBuffer): Promise<string | null> {
  try {
    const model = ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          text: "Extract ONLY the abstract from this academic paper. Return ONLY the text content of the abstract without any prefix like 'Abstract:' or 'Abstract-'. If the paper has no explicit abstract section, return ONLY the word 'N/A'.",
        },
        {
          inlineData: {
            mimeType: "application/pdf",
            data: Buffer.from(pdfData).toString("base64"),
          },
        },
      ],
    });

    const response = await model;
    const abstractText = response.text.trim();
    
    // If Gemini returned N/A, return null so we don't save it
    if (abstractText === "N/A") {
      console.log("No abstract found in the paper.");
      return null;
    }
    
    // Remove common prefixes if Gemini still included them
    const cleanedText = abstractText
      .replace(/^abstract[\s:-]+/i, '')
      .replace(/^summary[\s:-]+/i, '')
      .trim();
      
    return cleanedText;
  } catch (error) {
    console.error("Error extracting abstract:", error);
    return null;
  }
}

/**
 * Process a publication: download PDF, extract abstract, update YAML
 * @param filePath The path to the publication YAML file
 */
async function processPublication(filePath: string): Promise<void> {
  console.log(`Processing ${filePath}`);

  // Read and parse the YAML file
  const publication = await readYamlFile(filePath);
  if (!publication) return;

  // Skip if the publication already has an abstract
  if (publication.abstract) {
    console.log(`Publication ${filePath} already has an abstract. Skipping.`);
    return;
  }

  // Check if PDF link exists
  if (!publication.links || !publication.links.pdf) {
    console.log(`Publication ${filePath} has no PDF link. Skipping.`);
    return;
  }

  // Download the PDF
  const pdfUrl = publication.links.pdf;
  const pdfData = await downloadPdf(pdfUrl);
  if (!pdfData) return;

  // Extract abstract
  const abstract = await extractAbstract(pdfData);
  if (!abstract) return;

  // Update publication with abstract
  publication.abstract = abstract;

  // Write updated publication back to YAML file
  await writeYamlFile(filePath, publication);

  console.log(`Updated ${filePath} with abstract.`);
}

async function main() {
  console.log(`Starting to process publications from ${PUBLICATIONS_DIR}`);

  try {
    // Verify Gemini API access before starting
    try {
      // Simple test request to check if the API key is valid
      await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ text: "Test" }],
      });
      console.log("✅ Gemini API access verified");
    } catch (error) {
      console.error(
        "\x1b[31mError: Cannot access Gemini API. Please check your API key.\x1b[0m"
      );
      console.error(error);
      process.exit(1);
    }

    // Read all files in the publications directory
    const files = fs.readdirSync(PUBLICATIONS_DIR);    // Filter YAML files only
    const yamlFiles = files
      .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"));

    console.log(`Found ${yamlFiles.length} YAML files to process.`);

    // Process each publication sequentially
    for (const file of yamlFiles) {
      const filePath = path.join(PUBLICATIONS_DIR, file);
      await processPublication(filePath);

      // Add a small delay between requests to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("Finished processing publications.");
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

main();
