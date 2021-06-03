---
title: Plugins de Vue
description: En este ejemplo mostramos cómo añadir un plugin de vue a tu aplicación
position: 401
category: plugins
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/plugins/vue-plugins?fontsize=14&hidenavigation=1&module=%2Fplugins%2Fvue-tooltip.js&theme=dark&view=editor
---

<example-intro></example-intro>

`plugins/vue-toolitp.js` importa nuestro tooltip y le dice a Vue que haga uso de él.

`pages/index.vue` hace uso de nuestro plugin.

`nuxt.config.js` contiene la propiedad `plugins` para registrar nuestro plugin y la propiedad `css` para añadir el css de nuestro tooltip.

`package.json` muestra que nuestro paquete de tooltip ha sido instalado.

<base-alert type="next">

Obtén más información en el capítulo [plugins](/docs/2.x/directory-structure/plugins#vue-plugins) del libro de Estructura de Directorios.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
