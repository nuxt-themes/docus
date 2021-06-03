---
title: Dynamic Pages
description: Using dynamic pages to fetch data from an API and populate those pages
position: 104
category: routing
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/routing/dynamic-pages?fontsize=14&hidenavigation=1&module=%2Fpages%2F_continent%2F_mountain.vue&theme=dark&view=editor
---

<example-intro></example-intro>

`pages/_slug.vue` shows data coming from the route params.

`pages/index.vue` fetches our mountains from our API.

`pages/_continent/_mountain.vue` shows the detail page for each mountain in each continent.

<base-alert type="next">

Learn more in the Directory Structure book in the [pages](/docs/2.x/directory-structure/pages) chapter.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
