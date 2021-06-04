---
title: Anonymous Middleware
description: Using anonymous middleware to show the analytics of how many times a user visits a page.
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/middleware/anonymous-middleware?fontsize=14&hidenavigation=1&module=%2Fpages%2Fanonymous-middleware.vue&theme=dark&view=editor
---

<example-intro></example-intro>

`pages/anonymous-middleware.vue` contains a middleware function which uses the store to call the increment mutation with results from the store displayed on the page.

`store/analytics.js` sets the `pageVisits` to 0 and increments the visits every time the increment function is called.

<alert type="next">

Learn more in the Directory Structure book in the [middleware](/docs/2.x/directory-structure/middleware#anonymous-middleware) chapter.

</alert>

<code-sandbox :src="csb_link"></code-sandbox>
