---
title: Nested Pages
description: How to use the Nuxt Child component to create parent and child pages.
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/routing/nested-pages?fontsize=14&hidenavigation=1&module=%2Fpages%2Fparent.vue&theme=dark&view=editor
---

<example-intro></example-intro>

`pages/parent.vue` contains the `<NuxtChild>` component. Everything on this page will be seen on both the parent and child pages.

`pages/parent/index.vue` contains text that will be replaced when the child links are clicked.

`pages/parent/child.vue` and `pages/parent/child2.vue` will be rendered as parent/child and parent/child2.

<alert type="next">

Learn more in the Features book in the [Nuxt Components](/docs/features/nuxt-components#the-nuxtchild-component) chapter.

</alert>

<code-sandbox :src="csb_link"></code-sandbox>
