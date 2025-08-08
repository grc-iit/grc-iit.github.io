const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function loadProjects(siteDir) {
  const dataDir = path.join(siteDir, 'data/projects');
  const projectFiles = fs.readdirSync(dataDir).filter(file => file.endsWith('.yaml'));

  const projects = projectFiles.map(file => {
    const filePath = path.join(dataDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    return yaml.load(content);
  });

  // Sort projects: first by explicit ascending 'order' (if present), then by name
  projects.sort((a, b) => {
    const hasOrderA = typeof a.order === 'number';
    const hasOrderB = typeof b.order === 'number';
    if (hasOrderA && hasOrderB) {
      if (a.order !== b.order) return a.order - b.order;
      return (a.name || '').localeCompare(b.name || '');
    }
    if (hasOrderA) return -1;
    if (hasOrderB) return 1;
    return (a.name || '').localeCompare(b.name || '');
  });

  return projects;
}

module.exports = function projectsPlugin(context, options) {
  return {
    name: 'grc-plugin-projects',

    async loadContent() {
      const projects = loadProjects(context.siteDir);
      return { projects };
    },

    async contentLoaded({ content, actions }) {
      const { createData, addRoute, setGlobalData } = actions;
      const { projects } = content;

      // Set global data for projects list pages
      await setGlobalData({
        projects: projects
      });

      await createData('projects.json', JSON.stringify(projects));

      // Create routes for each project (if needed in the future)
      // for (const project of projects) {
      //   await addRoute({
      //     path: `/projects/${project.id}`,
      //     component: '@site/src/components/projects/ProjectPage.tsx',
      //     exact: true,
      //     modules: {
      //       project: await createData(`project-${project.id}.json`, JSON.stringify(project))
      //     }
      //   });
      // }
    }
  };
};
