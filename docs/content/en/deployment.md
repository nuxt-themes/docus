---
title: Deployment
category: More
description: 'Deploy your documentation with Docus to any static hosting 🪶'
position: 16
---

To generate the documentation for production, run the following command:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn build
```

</code-block>
<code-block label="NPM">

```bash
npm run build
```

</code-block>
</code-group>

A `dist/` directory will be generated, ready to be deployed on any static hosting (GitHub pages, Vercel, Netlify, Surge, etc).

## Github Pages

Best way to deploy Docus on Github Pages is using [Github Actions](https://github.com/features/actions). Github Actions will build, generate and publish your documentation on Github Pages.

If you have a workflow you need to append a new step to your existing workflow.  

```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
```
**Note**: You must insert this step after `generate`. This step uses the [GitHub Pages Action](https://github.com/marketplace/actions/github-pages-action) to push the generated files from the `dist` folder to your default GitHub Pages branch `gh-pages`.


If you don't have a workflow you need to create a new one. Create a new file called `gh-pages.yml` in `.github/workflows` directory and paste following content into the file.

```yaml [.github/workflows/gh-pages.yml]
name: gh-pages
on: [push, pull_request]
jobs:
  deploy:
    runs-on: ${{ matrix.os }}

    strategy:
      matrix:
        os: [ubuntu-latest]
        node: [14]

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Setup node env
        uses: actions/setup-node@v2.1.2
        with:
          node-version: ${{ matrix.node }}

      - name: Install dependencies
        run: yarn

      - name: Generate
        run: yarn run nuxt generate

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Save the file and push it to the repository. Checkout Actions tab in your Github repository and you'll see the running job. Wait for jobs to finish and your site will update.