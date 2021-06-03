---
title: Importar componentes dinámicamente
description: Utiliza fetch en tus componentes para obtener datos de una API así como importar componentes de forma automática y dinámica
position: 6
category: miscellaneous
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/miscellaneous/lazy-loading-components?fontsize=14&hidenavigation=1&theme=dark&view=editor
---

<example-intro></example-intro>

`components/MountainsList.vue` utiliza fetch para obtener datos de una API y usa:

- `$fetchState.pending` para mostrar un mensaje de carga cuando está esperando a que se carguen los datos.
- `$fetchState.error` para mostrar un mensaje de error si el componente no carga.

`pages/index.vue` muestra como importar dinámicamente un componente precediéndolo con la palabra "Lazy".

`nuxt.config.js` muestra `components: true` para importar automáticamente los componentes.

<base-alert type="next">

Obtén más información en el capítulo [Componentes](/docs/2.x/directory-structure/components) del libro de Estructura de Directorios.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
