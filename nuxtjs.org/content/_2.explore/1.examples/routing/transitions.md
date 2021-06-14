---
title: Nuxt transitions
description: Adding default and custom transitions to your pages and layouts
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/transitions/nuxt-transitions?fontsize=14&hidenavigation=1&module=%2Flayouts%2Fdefault.vue&theme=dark&view=editor
---

<example-intro></example-intro>

- `pages/index.vue` and `pages/fade.vue` use the default page transiton.
- `pages/bounce.vue` uses the `transition` property with a bounce transition
- `pages/slide.vue` uses the `transition` property with a slide-bottom transition.
- `layout/default.vue` contains the classes for all transitions.

<alert type="next">

Learn more in the Features book in the [Transitions](/docs/features/transitions) chapter.

</alert>

<code-sandbox :src="csb_link"></code-sandbox>
