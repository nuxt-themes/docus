---
title: External Packages Plugin
description: In this example we show how to use a plugin with an external package - axios
position: 403
category: plugins
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/plugins/external-packages-plugin?fontsize=14&hidenavigation=1&module=%2Fplugins%2Faxios.js&theme=dark&view=editor
---

<example-intro></example-intro>

`plugins/axios.js` intercepts the `$axios` call using the `onError()` function.

`pages/index.vue` uses `$axios` to fetch our data from an API.

`pages/mountains/_slug.vue` uses `$axios` to fetch our data from an API with the id coming from route params.

`pages/404.vue` is the page that is called when there is an error.

`nuxt.config.js` contains the `module` property and `plugin` property to register our module and plugin.

`package.json` shows our module `@nuxtjs/axios` has been installed.

<base-alert type="next">

Learn more in the Directory Structure book in the [plugins](/docs/2.x/directory-structure/plugins#external-packages) chapter.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
