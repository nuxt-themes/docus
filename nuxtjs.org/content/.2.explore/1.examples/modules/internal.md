---
title: Local Module
description: Local Module for setting up a tunnel using ngrok
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/modules/local-module?fontsize=14&hidenavigation=1&module=%2Fmodules%2Fngrok%2Findex.js&theme=dark&view=editor
---

<example-intro></example-intro>

- `modules/ngrok/index.js` adds a public URL from ngrok to the Nuxt CLI when in dev mode.
- `pages/index.vue` shows the public URL from ngrok.
- `nuxt.config.js` registers our module using the `buildModules` property.

<alert type="next">

Learn more in the Directory Structure book in the [modules](/docs/directory-structure/modules) chapter.

</alert>

<code-sandbox :src="csb_link"></code-sandbox>
