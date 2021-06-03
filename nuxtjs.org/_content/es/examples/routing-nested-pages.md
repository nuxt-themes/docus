---
title: Páginas Anidadas
description: Cómo hacer uso del componente NuxtChild para crear página padre y página hija.
position: 105
category: routing
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/routing/nested-pages?fontsize=14&hidenavigation=1&module=%2Fpages%2Fparent.vue&theme=dark&view=editor
---

<example-intro></example-intro>

`pages/parent.vue` contiene el componente `<NuxtChild>`. Todo en esta página se podrá ver en ambas páginas padre e hija.

`pages/parent/index.vue` contiene el texto que será reemplazado al hacer clic en los enlaces de las hijas.

`pages/parent/child.vue` y `pages/parent/child2.vue` serán renderizadas como parent/child y parent/child2.

<base-alert type="next">

Obtén más información en el capítulo [Componentes de Nuxt](/docs/2.x/features/nuxt-components#the-nuxtchild-component) del libro de Características.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
