---
title: Middleware anónimo
description: Utilizando middleware anónimo para mostrar el análisis de cuantas veces un usuario visita una página.
position: 603
category: middleware
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/middleware/anonymous-middleware?fontsize=14&hidenavigation=1&module=%2Fpages%2Fanonymous-middleware.vue&theme=dark&view=editor
---

<example-intro></example-intro>

`pages/anonymous-middleware.vue` contiene una función middleware que utiliza el store para llamar a la mutación increment siendo el resultado del store mostrado en la página.

`store/analytics.js` establece `pageVisits` a 0 e incrementa las visitas cada vez que se llama a la funcion increment.

<base-alert type="next">

Obtén más información en el capítulo [middleware](/docs/2.x/directory-structure/middleware#anonymous-middleware) del libro de Estructura del Directorio.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
