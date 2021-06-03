---
title: webpack Assets
description: Use the assets folder to add css, images and fonts to your application
position: 1
category: assetManagement
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/asset-management/webpack-assets?fontsize=14&hidenavigation=1&theme=dark&view=editor
---

<example-intro></example-intro>

`pages/index.vue` shows:

- how to add an image from the assets folder.
- how to add a background image from the assets folder using CSS.
- how to add dynamic images from the assets folder using the data property.

`nuxt.config.js` contains the `css` property for globally adding a css file.

`assets/main.css` shows how to reference the DMSans fonts from the assets folder using the `@font-face` rule.

<base-alert type="next">

Learn more in the Directory Structure book in the [Assets](/docs/2.x/directory-structure/assets) chapter.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
