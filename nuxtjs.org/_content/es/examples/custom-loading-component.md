---
title: Componente de carga personalizado
description: Crear un componente de carga personalizado, modificar el cargador predeterminado y el indicador de carga para SPAs
position: 3
category: loading
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/loading/custom-loading-component?fontsize=14&hidenavigation=1&module=%2Fcomponents%2FLoadingBar.vue&theme=dark&view=editor
---

<example-intro></example-intro>

`components/LoadingBar.vue` muestra un indicador de carga personalizado, en lugar de la barra de carga predeterminada.

`nuxt.config.js` contiene la propiedad `loading` que importa el componente de carga.

`pages/loading.vue` inicia programáticamente el cargador, por lo que obligamos a la página a tardar 2 segundos en cargarse.

<base-alert type="next">

Obtenga más información en el libro de Características en el capítulo [carga](/docs/2.x/features/loading).

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
