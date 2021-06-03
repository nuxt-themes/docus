---
title: Customize Nuxt Loading
description: Create a custom loading component to replace the default loader
position: 1
category: loading
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/loading/customize-nuxt-loading?fontsize=14&hidenavigation=1&module=%2Fnuxt.config.js&theme=dark&view=editor
---

<example-intro></example-intro>

`nuxt.config.js` contains the `loading` property which modifies the default loader

`pages/loading.vue` programmatically starts the loader so we force the page to take 2 seconds to load

<base-alert type="next">

Learn more in the Features book in the [Loading](/docs/2.x/features/loading) chapter.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
