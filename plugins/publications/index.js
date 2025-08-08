const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function loadPublications(siteDir) {
  const dataDir = path.join(siteDir, 'data/publications');
  const publicationFiles = fs.readdirSync(dataDir).filter(file => file.endsWith('.yaml'));

  const publications = publicationFiles.map(file => {
    const filePath = path.join(dataDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    return yaml.load(content);
  });

  // Sort publications by date (most recent first)
  publications.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  return publications;
}

module.exports = function publicationsPlugin(context, options) {
  return {
    name: 'grc-plugin-publications',

    async loadContent() {
      const publications = loadPublications(context.siteDir);
      return { publications };
    },

    async contentLoaded({ content, actions }) {
      const { createData, addRoute, setGlobalData } = actions;
      const { publications } = content;

      // Set global data for publications list pages
      await setGlobalData({
        publications: publications
      });

      await createData('publications.json', JSON.stringify(publications));

      // Create routes for each publication
      for (const publication of publications) {
        await addRoute({
          path: `/publications/${publication.slug}`,
          component: '@site/src/components/publications/PublicationPage.tsx',
          exact: true,
          modules: {
            publication: await createData(`publication-${publication.slug}.json`, JSON.stringify(publication))
          }
        });
      }
    }
  };
};
