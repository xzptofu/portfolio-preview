# Personal homepage — production source

This branch contains the root-domain build of Zhipan Xu's personal homepage.
The separate `main` branch of this repository remains the independent preview.

## Develop and build

Use Node.js 22.13 or newer:

```sh
npm ci
npm run build
npm run typecheck
```

The static site is generated in `out/` for `https://xzptofu.github.io/`.
The published files are stored on `new-site-pages` in the
`xzptofu/xzptofu.github.io` repository. Pushing source changes to this branch
alone does not update the live site; rebuild and publish the contents of
`out/` (including `.nojekyll`) to the publishing branch.

The original homepage source and history remain on its `master` branch, with
an additional `backup-before-redesign-20261102` branch at the same commit.
Existing public files, images, and previously published HTML URLs are
preserved in `public/`; `legacy-urls.json` records the captured HTML URLs.
The new homepage and Publications page intentionally replace the old pages
at `/` and `/publications/`.

The paper chart is derived from the original NeurIPS figure; source and license
information is kept alongside the assets in `public/`.
