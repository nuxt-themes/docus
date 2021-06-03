---
title: Axios usage
description: In the first example we show how to use the env property in our `nuxt.config.js` file to add the URL of our API so that we can then easily make calls to it without having to use the URL on our page
position: 503
category: modules
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/modules/axios-usage?fontsize=14&hidenavigation=1&module=%2Fnuxt.config.js&theme=dark&view=editor
---

<example-intro></example-intro>

`nuxt.config.js` contains :

- the `publicRuntimeConfig` property to add the URL of our API.
- the `modules` property to register our `@nuxtjs/axios` module.

`pages/index.vue` - uses `$axios` to fetch our data and `$config` to retrieve our API URL.

<base-alert type="next">

Learn more about the [axios module](https://axios.nuxtjs.org/).

</base-alert>

<base-alert type="next">

Learn more in the Directory Structure book in the [nuxt-config](/docs/2.x/directory-structure/nuxt-config) chapter.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
