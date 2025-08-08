# Agent Guide: Projects

Goal

- Enable an agent to add or modify project definitions. Projects here are YAML entries exposed globally and rendered via components.

What to edit

- Create or modify a `*.yaml` file representing a project. Fields correspond to `Project` in `src/types.ts`.

Required/common fields

- `id` (kebab-case string; used to name optional MDX page and cross-references)
- `name` (human name; used in tags for publications association)
- `title` (string)
- `shortDescription` (string)
- `link` (URL path to the project details page, typically `/research/projects/{id}`)
- `researchStatus` (`ready` | `testing` | `r&d`)
- `status` (`active` | `archived`)
- `type` (`funded` | `student`)

Optional fields

- `isFeatured` (boolean)
- `isOurs` (boolean)
- `sourceLink` (external repo URL)
- `tutorialLink` (docs link)

Rendering

- Projects list page: `src/pages/research/projects/index.mdx` via `ProjectList`.
- Project cards/items: `src/components/projects/`.
- Data is loaded by `plugins/projects/` and available through global data.

Per-project content (MDX)

- If you want a detailed content page: create `src/pages/research/projects/{id}.mdx` and set `link: /research/projects/{id}` in YAML.

Publication association

- To show related publications in a project widget elsewhere, ensure publication YAMLs include the project `name` in their `tags`.

Examples

```yaml
id: chronolog
name: ChronoLog
title: 'ChronoLog: A High-Performance Storage Infrastructure for Activity and Log Workloads'
shortDescription: >-
  One or two sentences about the project.
link: /research/projects/chronolog
isFeatured: true
isOurs: true
researchStatus: testing
sourceLink: https://github.com/grc-iit/chronolog
status: active
tutorialLink: /docs/category/chronolog
type: funded
```

Checklist

- `id` is unique, lower-case, kebab-case
- `link` points to an existing MDX page if you set it to `/research/projects/{id}`
- If you expect publications to associate, confirm their `tags` include this project `name`

Preview

- Run from repo root: `npm start`
- Visit `/research/projects`
