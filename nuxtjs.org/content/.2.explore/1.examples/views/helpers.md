---
title: Nuxt Helpers
description: Using the $nuxt helpers with $nuxt.isOnline, renderedOn, refresh(), onNuxtReady
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/miscellaneous/nuxt-helpers?fontsize=14&hidenavigation=1&theme=dark&view=editor
---

<example-intro></example-intro>

`pages/index.vue` shows:

- `$nuxt.isOnline` and `$nuxt.isOffline` - tells the user if they are online or offline.
- `renderedOn` - prints a message telling us if the page is rendered on the server or client.
- `$nuxt.refresh()` - refreshes data without refreshing the page.

`plugins/nuxt-ready.client.js` shows:

- `window.onNuxtReady` - logs a message to the console when Nuxt is ready.

<alert type="next">

Learn more in the Concepts book in the [Context and Helpers](/docs/concepts/context-helpers#helpers) chapter.

</alert>

<code-sandbox :src="csb_link"></code-sandbox>
