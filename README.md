# Portfolio preview

This repository contains a GitHub Pages preview of Zhipan Xu's interactive
portfolio. It is separate from the existing personal homepage.

## Develop and build

Use Node.js 22.13 or newer:

```sh
npm ci
npm run build
npm run typecheck
```

The build creates a static site in `out/`. The preview is hosted below
`/portfolio-preview`, configured in `app/site-path.ts` and `next.config.ts`.
Its published files live on the `gh-pages` branch. To update the preview,
rebuild and publish the contents of `out/` (including `.nojekyll`) to that
branch. Pushing source changes to `main` alone does not update the site.

The homepage and Projects page share the same project data and presentations.
The paper chart is derived from the original NeurIPS figure; source and license
information is kept alongside the assets in `public/`.
