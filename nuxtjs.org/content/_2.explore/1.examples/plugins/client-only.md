---
title: Client Only Plugins
description: In this example we show how to use a plugin so that it is only available on the client side
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/plugins/client-only-plugins?fontsize=14&hidenavigation=1&module=%2Fplugins%2Fclient-only.client.js&theme=dark&view=editor
---

<example-intro></example-intro>

`plugins/client-only.client.js` uses the `window.alert()` function which is not available on server side.

`nuxt.config.js` contains the `plugins` property which registers the plugin on the client side by adding the `.client` extension.

<alert type="next">

Learn more in the Directory Structure book in the [plugins](/docs/directory-structure/plugins#client-or-server-side-only) chapter.

</alert>

<code-sandbox :src="csb_link"></code-sandbox>
