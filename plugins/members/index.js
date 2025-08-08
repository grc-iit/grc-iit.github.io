const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Helper function to get authorShortName from member name
 */
function getAuthorShortName(name) {
  // Remove common title prefixes for processing
  const nameWithoutTitle = name.replace(
    /^(Dr\.|Mr\.|Ms\.|Mrs\.|Prof\.)\s+/i,
    ""
  );

  const parts = nameWithoutTitle.split(" ");
  if (parts.length < 2) return nameWithoutTitle;

  const firstName = parts[0];
  const lastName = parts[parts.length - 1];

  return `${firstName[0]}. ${lastName}`;
}

/**
 * Helper function to filter publications by author short name
 */
function getPublicationsByAuthorShortName(publications, authorShortName) {
  if (!authorShortName || !publications) return [];

  const filteredPublications = publications.filter(pub => {
    if (!pub.authors) return false;
    // Authors are stored as simple strings, not objects
    return pub.authors.some(author =>
      author === authorShortName
    );
  });

  // Sort publications by date (most recent first)
  return filteredPublications.sort((a, b) => {
    // Parse dates - publications have a 'date' field
    const dateA = new Date(a.date || '1900-01-01');
    const dateB = new Date(b.date || '1900-01-01');

    // Sort descending (most recent first)
    return dateB - dateA;
  });
}/**
 * Custom Docusaurus plugin to load YAML data and create dynamic routes
 */
module.exports = function membersPlugin(context, options) {
  return {
    name: 'grc-plugin-members',

    async loadContent() {
      const { siteDir } = context;
      const dataDir = path.join(siteDir, 'data');

      // Load members data
      const membersDir = path.join(dataDir, 'members');
      const members = [];

      if (fs.existsSync(membersDir)) {
        const memberFiles = fs.readdirSync(membersDir).filter(file =>
          file.endsWith('.yaml') || file.endsWith('.yml')
        );

        for (const file of memberFiles) {
          const filePath = path.join(membersDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const memberData = yaml.load(content);

          // Don't transform image path here - keep it as is for the component
          members.push(memberData);
        }
      }

      // Load publications data
      const publicationsDir = path.join(dataDir, 'publications');
      const publications = [];

      if (fs.existsSync(publicationsDir)) {
        const publicationFiles = fs.readdirSync(publicationsDir).filter(file =>
          file.endsWith('.yaml') || file.endsWith('.yml')
        );

        for (const file of publicationFiles) {
          const filePath = path.join(publicationsDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const publicationData = yaml.load(content);

          publications.push(publicationData);
        }
      }

      return {
        members,
        publications,
      };
    },

    async contentLoaded({ content, actions }) {
      const { setGlobalData, createData, addRoute } = actions;
      const { members, publications } = content;

      // Make data available globally
      setGlobalData({
        members
      });

      // Create data files that can be imported
      await createData('members.json', JSON.stringify(members));

      // Create dynamic routes for member pages (only for researchers)
      for (const member of members) {
        if (member.slug && (member.type === 'researcher' || member.type === 'engineer')) {
          const authorShortName = getAuthorShortName(member.name);
          const memberPublications = getPublicationsByAuthorShortName(publications, authorShortName);

          // Create route for this member
          addRoute({
            path: `/members/${member.slug}`,
            component: '@site/src/components/people/MemberPage',
            modules: {
              member: await createData(`member-${member.slug}.json`, JSON.stringify(member)),
              publications: await createData(`member-${member.slug}-publications.json`, JSON.stringify(memberPublications)),
            },
            exact: true,
          });
        }
      }
    },

    getPathsToWatch() {
      return [
        path.join(context.siteDir, 'data', 'members', '**/*.{yaml,yml}'),
        path.join(context.siteDir, 'data', 'publications', '**/*.{yaml,yml}'),
      ];
    },
  };
};
