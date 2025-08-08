# Agent Guide: Publications

Goal

- Enable an agent to add or modify publications safely. Publications are stored as YAML files here. Pages are generated automatically.

What to edit

- Create a new `*.yaml` file or edit an existing one. Ensure fields match the `Publication` type in `src/types.ts`.

Required fields

- `title` (string)
- `authors` (array of short-name strings, e.g., `A. Kougkas`)
- `venue` (string)
- `type` (one of: `Conference`, `Journal`, `Book`, `Book Chapter`, `Poster`, `Technical Report`, `Thesis`, `WIP`, `Workshop`)
- `date` (string, human-readable; e.g., `June, 2025`) – used for sorting
- `tags` (array of strings)
- `links` (map of string→url; keys like `pdf`, `bibtex`, `code` are common)
- `slug` (string, unique; becomes the URL segment)

Optional fields

- `abstract` (string)
- `doi` (string)
- `month` (number)
- `year` (number)

Routing and rendering

- Detail page path: `/publications/{slug}`
- List page: `src/pages/publications.mdx`
- Data is loaded by `plugins/publications/` and consumed by components in `src/components/publications/`.

Project associations

- To show a publication in a project’s publications widget, add the project `name` (not id) to `tags`. Example: `ChronoLog`, `Hermes`, `WisIO`.

Author matching for member pages

- Member pages match authors using short-name format `F. Lastname`. Ensure your `authors` follow this convention so the publication appears on relevant member pages.

Examples

Minimal valid entry:

```yaml
title: Example Title
authors:
  - A. Kougkas
  - X.-H. Sun
venue: ExampleConf 2025
type: Conference
date: June, 2025
tags:
  - HPC
  - Hermes
links:
  pdf: https://example.com/paper.pdf
slug: kougkas-2025-example-1234
```

With optional fields:

```yaml
title: WisIO: Automated I/O Bottleneck Detection with Multi-Perspective Views for HPC Workflows
authors:
  - I. Yildirim
  - H. Devarajan
  - A. Kougkas
  - X.-H. Sun
  - K. Mohror
venue: ICS 2025
type: Conference
date: June, 2025
month: 6
year: 2025
tags:
  - HPC
  - Workflows
  - WisIO
links:
  pdf: https://example.com/wisio.pdf
  bibtex: https://example.com/wisio.bib
slug: yildirim-2025-wisio-45f7
abstract: >-
  Short abstract here...
doi: 10.1145/xxxx.yyyy
```

Validation checklist

- `slug` is unique in this folder
- `type` is one of the accepted values
- `authors` are in short-name format
- `date` parses reasonably; keep a consistent `Month, Year` style
- If you expect the publication under a project, include the project `name` in `tags`

Preview

- Run the dev server from the repo root: `npm start`
- Visit `/publications` or `/publications/{slug}`
