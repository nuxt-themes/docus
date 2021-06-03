---
title: Layouts
description: Utilizando layouts para mostrar diferentes formas de estructurar tu página
position: 1
category: miscellaneous
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/miscellaneous/layouts?fontsize=14&hidenavigation=1&module=%2Fpages%2Fprofile.vue&theme=dark&view=editor
---

<example-intro></example-intro>

- `layouts/default.vue` es utilizada en la página principal al no estar definida la propiedad `layout`
- `layouts/auth.vue` es utilizada en la página /login con la propiedad `layout` establecida como 'auth'
- `layouts/profile.vue` es utilizada en la página /profile con la propiedad `layout` establecida como 'profile'

<base-alert type="next">

Obtén más información en el capítulo [Vistas](/docs/2.x/concepts/views) del Libro de Conceptos o en el capítulo [Layouts](/docs/2.x/directory-structure/layouts) del libro de Estructura de Directorios.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
