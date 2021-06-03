---
title: Hook fetch
description: En este ejemplo utilizamos el hook fetch en componentes y páginas para obtener datos
position: 2
category: dataFetching
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/data-fetching/fetch-hook?fontsize=14&hidenavigation=1&module=%2Fcomponents%2FMountains.vue&theme=dark&view=editor
---

<example-intro></example-intro>

`pages/index.vue` importa `components/Mountains.vue` el cual utiliza el hook `fetch` y el módulo `$http` para obtener nuestros datos a nivel componente mientras `pages/mountains/_slug` obtiene los datos a nivel de página e inluye:

- `$fetchState.pending` para mostrar un texto informativo cuando se están cargando los datos.
- `$fetchState.error` para mostrar un mensaje de error cuando no hemos podido recuperar los datos.
- `$fetch` para obtener de nuevo los datos al pulsar el botón.

<base-alert type="next">

Obtén más información sobre el [módulo http](https://http.nuxtjs.org/).

</base-alert>

<base-alert type="next">

Obtén más información sobre el hook fetch en el capítulo de [Obtener datos](/docs/2.x/features/data-fetching) del libro de Características.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
