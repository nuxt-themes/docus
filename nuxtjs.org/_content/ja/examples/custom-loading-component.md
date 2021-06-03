---
title: Custom Loading Component
description: Create a custom loading component, modify the default loader as well as the spinner for spas
position: 3
category: loading
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/loading/custom-loading-component?fontsize=14&hidenavigation=1&module=%2Fcomponents%2FLoadingBar.vue&theme=dark&view=editor
---

<example-intro></example-intro>

`components/LoadingBar.vue` shows a custom loading spinner to use instead of the default loading bar.

`nuxt.config.js` contains the `loading` property which imports the loading component

`pages/loading.vue` programmatically starts the loader so we force the page to take 2 seconds to load

<base-alert type="next">

Learn more in the Features book in the [Loading](/docs/2.x/features/loading) chapter.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
