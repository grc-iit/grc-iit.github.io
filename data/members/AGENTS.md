# Agent Guide: Members

Goal

- Enable an agent to add or modify member profiles. Files here are YAML, consumed by the members plugin.

Member categories

- Researchers, engineers, visiting, external are in this folder.
- Faculty profiles are under `data/faculty/`.

What to edit

- Create or modify a `*.yaml` file with these fields (see `Member` in `src/types.ts`).

Common fields

- `name` (e.g., `Hua Xu`)
- `title` (e.g., `PhD Candidate`)
- `type` (`researcher` | `engineer` | `visiting` | `external`)
- `slug` (used for researcher page routes; must be unique)
- `image` (filename in `static/img/members/`)
- `links` (map of link types to URLs; keys: `website`, `email`, `github`, `linkedin`, `orcid`, `twitter`, `scholar`)
- `researchInterests` (array of strings)
- `bio` (string)
- Optional: `advisor`, `affiliation`

Routing

- Researcher pages are auto-generated at `/members/{slug}` only for entries with `type: researcher`.
- Other types (engineer/visiting/external) appear on the directory page but do not get detail pages.

Publication matching

- Member pages display publications matched by short-name author format `F. Lastname`. Ensure publication YAMLs list the author in that form so they show up.

Images

- Place images in `static/img/members/` and reference by filename in `image:`.

Examples

Researcher with page:

```yaml
name: Hua Xu
title: PhD Candidate
type: researcher
slug: hua-xu
image: xu.jpg
links:
  email: hxu40@hawk.illinoistech.edu
researchInterests:
  - HPC
  - Distributed Storage
bio: >-
  Short bio...
advisor: Dr. Xian-He Sun
```

External collaborator (no detail page):

```yaml
name: Jane Doe
title: Collaborator
type: external
slug: jane-doe
image: jane.jpg
links:
  website: https://example.com
```

Preview

- Run from repo root: `npm start`
- Visit `/members`
