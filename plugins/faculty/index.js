const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Custom Docusaurus plugin to load faculty YAML data
 */
module.exports = function facultyPlugin(context, options) {
  return {
    name: 'grc-plugin-faculty',

    async loadContent() {
      const { siteDir } = context;
      const dataDir = path.join(siteDir, 'data');

      // Load faculty data
      const facultyDir = path.join(dataDir, 'faculty');
      const faculty = [];

      if (fs.existsSync(facultyDir)) {
        const facultyFiles = fs.readdirSync(facultyDir).filter(file =>
          file.endsWith('.yaml') || file.endsWith('.yml')
        );

        for (const file of facultyFiles) {
          const filePath = path.join(facultyDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const facultyData = yaml.load(content);

          // Don't transform image path here - keep it as is for the component
          faculty.push(facultyData);
        }
      }

      // Sort faculty by order field (Dr. Sun should be first with order: 1)
      faculty.sort((a, b) => {
        const orderA = a.order || 999; // Default to high number if no order specified
        const orderB = b.order || 999;
        return orderA - orderB;
      });

      return {
        faculty,
      };
    },

    async contentLoaded({ content, actions }) {
      const { setGlobalData, createData } = actions;
      const { faculty } = content;

      // Make faculty data available globally
      setGlobalData({
        faculty,
      });

      // Create data files that can be imported
      await createData('faculty.json', JSON.stringify(faculty));

      // Create individual faculty data files (for potential future use)
      for (const facultyMember of faculty) {
        if (facultyMember.slug) {
          await createData(`faculty-${facultyMember.slug}.json`, JSON.stringify(facultyMember));
        }
      }
    },

    getPathsToWatch() {
      return [
        path.join(context.siteDir, 'data', 'faculty', '**/*.{yaml,yml}'),
      ];
    },
  };
};
