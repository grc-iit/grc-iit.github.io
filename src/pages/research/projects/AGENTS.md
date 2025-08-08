# Agent Guide: Project Pages (MDX)

Goal

- Guide an agent to create or update a project detail page (MDX) that matches a project YAML entry.

When to add an MDX page

- If the project YAML `link` points to `/research/projects/{id}`, create `src/pages/research/projects/{id}.mdx`.
- If the project should only appear as a card on the list, you can omit the MDX page and set `link` to an external site or docs.

Creating a page

- File: `src/pages/research/projects/{id}.mdx` (use the same `{id}` as in `data/projects/{id}.yaml`)

Recommended frontmatter

```mdx
---
title: ChronoLog
hide_table_of_contents: false
---

# ChronoLog

Intro paragraph ...

```

Useful components/data

- Project cards/list are driven by `plugins/projects/` and `src/components/projects/`.
- To embed publications filtered for this project elsewhere, use `ProjectPublications` with tag = project name.

Checklist

- The YAML `link` matches this MDX route
- The YAML `name` is used as a tag on related publication entries if you want association

Preview

- Run from repo root: `npm start`
- Visit `/research/projects/{id}`
