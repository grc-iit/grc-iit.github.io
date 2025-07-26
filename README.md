# Gnosis Research Center Website

The official website for the Gnosis Research Center at Illinois Institute of Technology, built with [Docusaurus 3](https://docusaurus.io/).

## Architecture

This repository implements a data-driven architecture where content is managed through YAML files in the `data/` directory and dynamically transformed into web pages via custom Docusaurus plugins.

## Data-Driven Content Management

The `data/` folder serves as the **single source of truth** for all entity types:

- `data/faculty/` - Faculty member profiles and information
- `data/members/` - Research team member details
- `data/projects/` - Research project metadata
- `data/publications/` - Publication records and citations

## Plugin System

Custom plugins in the `plugins/` directory automatically process the YAML data files and generate:

- **Dynamic pages** - Individual pages for faculty, projects, etc.
- **Global data** - Makes data available across all components
- **JSON exports** - Creates importable data files for components

Each plugin follows the pattern:

1. Load YAML files from corresponding `data/` subdirectory
2. Transform and validate the data structure
3. Generate pages and make data globally available
4. Watch for file changes during development

## Key Features

- **TypeScript support** - Full type safety with custom type definitions
- **Responsive design** - Mobile-first CSS with custom styling
- **MDX integration** - Rich content with React components in Markdown
- **Multi-instance blogs** - Separate blog and newsletter systems
- **SEO optimization** - Structured metadata and social cards

## Development

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

Starts the development server on `http://localhost:4720` with hot reloading.

### Build

```bash
npm build
```

Generates static content in the `build/` directory for deployment.

## Project Structure

```text
├── data/           # YAML data files (single source of truth)
├── docs/           # Documentation and tutorials
├── plugins/        # Custom Docusaurus plugins
├── src/            # React components and TypeScript utilities
├── static/         # Static assets (images, files)
├── blog/           # Blog posts
├── newsletter/     # Newsletter posts
└── build/          # Generated static site
```

## Deployment

The site is automatically deployed to [grc.iit.edu](https://grc.iit.edu) via static hosting.
