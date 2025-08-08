# Agent Guide: Faculty

Goal

- Enable an agent to add or modify faculty profiles. Files here are YAML and rendered on the Members page under Faculty.

What to edit

- Create or modify a `*.yaml` file. Faculty YAML extends `Member` with an `order` field and `type: faculty`.

Fields

- `name`
- `title`
- `type: faculty`
- `slug` (unique)
- `image` (filename in `static/img/members/`)
- `links` (map; keys like `email`, `linkedin`, `scholar`, `website`)
- `bio` (string)
- `order` (number; controls display order)

Routing

- Faculty currently do not get auto-generated detail pages. They appear on `/members` under the Faculty section.

Example

```yaml
name: Dr. Anthony Kougkas
title: Research Associate Professor
type: faculty
slug: anthony-kougkas
image: kougkas.jpg
links:
  email: akougkas@illinoistech.edu
  linkedin: https://www.linkedin.com/in/anthonykougkas/
  scholar: https://scholar.google.com/citations?user=hiNO0EEAAAAJ&hl=en
  website: https://akougkas.com/
order: 2
bio: >-
  Short bio...
```

Preview

- Run from repo root: `npm start`
- Visit `/members`
