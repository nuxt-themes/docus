---
title: Vue Plugins
description: In this example we show how to add a vue plugin to your application
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/plugins/vue-plugins?fontsize=14&hidenavigation=1&module=%2Fplugins%2Fvue-tooltip.js&theme=dark&view=editor
---

<example-intro></example-intro>

`plugins/vue-toolitp.js` imports our tooltip and tells Vue to use..

`pages/index.vue` uses our plugin.

`nuxt.config.js` contains the `plugins` property to register our plugin and the `css` property to add our tooltip css.

`package.json` show our tooltip package has been installed.

<alert type="next">

Learn more in the Directory Structure book in the [plugins](/docs/directory-structure/plugins#vue-plugins) chapter.

</alert>

<code-sandbox :src="csb_link"></code-sandbox>
