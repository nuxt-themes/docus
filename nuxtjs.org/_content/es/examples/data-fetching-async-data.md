---
title: Hook asyncData
description: En este ejemplo utilizamos asyncData para obtener datos de nuestra API.
position: 1
category: dataFetching
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/data-fetching/async-data-hook?fontsize=14&hidenavigation=1&theme=dark&view=editor
---

<example-intro></example-intro>

`pages/index.vue` y `pages/posts/_id` utilizan el hook `asyncData` y el módulo `$http` para obtener nuestra lista de montañas de nuestra API.

<base-alert type="next">

Obtén más información sobre [módulo http](https://http.nuxtjs.org/).

</base-alert>

<base-alert type="next">

Obtén más información sobre el hook asyncData en el capítulo de [Obtener datos](/docs/2.x/features/data-fetching) del libro de Características.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
