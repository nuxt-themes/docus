---
title: Páginas Dinámicas
description: Haciendo uso de páginas dinámicas para obtener datos de una API e ingresarlos en esas páginas
position: 104
category: routing
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/routing/dynamic-pages?fontsize=14&hidenavigation=1&module=%2Fpages%2F_continent%2F_mountain.vue&theme=dark&view=editor
---

<example-intro></example-intro>

`pages/_slug.vue` muestra datos provenientes de los parámetros de ruta.

`pages/index.vue` obtiene nuestras montañas de nuestra API.

`pages/_continent/_mountain.vue` muestra la página en detalle para cada montaña en cada continente.

<base-alert type="next">

Obtén más información en el capítulo [páginas](/docs/2.x/directory-structure/pages) del libro de Estructura de Directorios.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
