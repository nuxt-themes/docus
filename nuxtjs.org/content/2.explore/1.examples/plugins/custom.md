---
title: Custom Plugins
description: In this example we show how you how you can create your own plugin
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/plugins/custom-plugins?fontsize=14&hidenavigation=1&module=%2Fplugins%2Fnuxt-api.js&theme=dark&view=editor
---

<example-intro></example-intro>

`plugins/hello.js` - logs a message to the console with a dynamic message.

`store/index.js` - stores our dynamic message from our input.

`pages/index.vue` uses the hello plugin to:

- log a message to the console on mounted.
- log a message to the console containing the value from our input.

`plugins/nuxt-api.js` - fetches data from our API.

`pages/api-plugin.vue` - uses our plugin to fetch and show the data from our API.

`nuxt.config.js` - registers our plugins using the `plugins` property.

<alert type="next">

Learn more in the Directory Structure book in the [plugins](/docs/2.x/directory-structure/plugins#inject-in-root--context) chapter.

</alert>

<code-sandbox :src="csb_link"></code-sandbox>
