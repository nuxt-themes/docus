---
title: Dynamic Pages
description: Using dynamic pages to fetch data from an API and populate those pages
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/routing/dynamic-pages?fontsize=14&hidenavigation=1&module=%2Fpages%2F_continent%2F_mountain.vue&theme=dark&view=editor
---

<example-intro></example-intro>

`pages/_slug.vue` shows data coming from the route params.

`pages/index.vue` fetches our mountains from our API.

`pages/_continent/_mountain.vue` shows the detail page for each mountain in each continent.

<alert type="next">

Learn more in the Directory Structure book in the [pages](/docs/directory-structure/pages) chapter.

</alert>

<code-sandbox :src="csb_link"></code-sandbox>
