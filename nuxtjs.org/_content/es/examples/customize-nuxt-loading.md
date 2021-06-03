---
title: Personalizar el cargador de Nuxt
description: Cree un componente de carga personalizado para reemplazar el cargador predeterminado
position: 1
category: loading
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/loading/customize-nuxt-loading?fontsize=14&hidenavigation=1&module=%2Fnuxt.config.js&theme=dark&view=editor
---

<example-intro></example-intro>

`nuxt.config.js` contiene la propiedad `loading` que modifica el cargador predeterminado.

`pages/loading.vue`inicia programáticamente el cargador, por lo que obligamos a la página a tardar 2 segundos en cargarse.

<base-alert type="next">

Obtenga más información en el libro Características en el capítulo [carga](/docs/2.x/features/loading).

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
