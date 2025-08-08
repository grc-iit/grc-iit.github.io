const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function loadAffiliations(siteDir) {
  const dataDir = path.join(siteDir, 'data/affiliations');

  const affiliations = [];

  if (fs.existsSync(dataDir)) {
    const files = fs
      .readdirSync(dataDir)
      .filter((file) => file.endsWith('.yaml') || file.endsWith('.yml'));

    for (const file of files) {
      const filePath = path.join(dataDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const affiliation = yaml.load(content);
      affiliations.push(affiliation);
    }
  }

  // Sort by type then by name for consistent ordering
  affiliations.sort((a, b) => {
    const typeA = a.type || '';
    const typeB = b.type || '';
    if (typeA !== typeB) return typeA.localeCompare(typeB);
    return (a.name || '').localeCompare(b.name || '');
  });

  return affiliations;
}

module.exports = function affiliationsPlugin(context, options) {
  return {
    name: 'grc-plugin-affiliations',

    async loadContent() {
      const affiliations = loadAffiliations(context.siteDir);
      return { affiliations };
    },

    async contentLoaded({ content, actions }) {
      const { setGlobalData, createData } = actions;
      const { affiliations } = content;

      await setGlobalData({ affiliations });
      await createData('affiliations.json', JSON.stringify(affiliations));
    },

    getPathsToWatch() {
      return [path.join(context.siteDir, 'data', 'affiliations', '**/*.{yaml,yml}')];
    },
  };
};


