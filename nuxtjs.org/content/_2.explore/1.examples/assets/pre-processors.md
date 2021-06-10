---
title: Pre-processors
description: Configuration your application to use pug and sass with style resources to easily add variables to all components.
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/asset-management/pre-processors?fontsize=14&hidenavigation=1&theme=dark&view=editor
---

<example-intro></example-intro>

`pages/index.vue` uses pug as a template language and sass for styling.

`nuxt.config.js`:

- registers the style resources module.
- contains a `styleResources` property to add `assets/variables.scss`.
- contains a `css property` to add `assets/main.scss`.

`package.json` shows the dependencies needed.

<alert type="next">

Learn more in the Features book in the [Configuration](/docs/2.x/features/configuration#pre-processors) chapter.

</alert>

<code-sandbox :src="csb_link"></code-sandbox>
