---
title: Uso de Axios
description: En el primer ejemplo mostramos como utilizar la propiedad env en nuestro archivo `nuxt.config.js` para añadir la URL de nuestra API y así podamos hacerle llamadas fácilmente sin tener que utilizar la URL en nuestra página
position: 503
category: modules
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/modules/axios-usage?fontsize=14&hidenavigation=1&module=%2Fnuxt.config.js&theme=dark&view=editor
---

<example-intro></example-intro>

`nuxt.config.js` contiene :

- la propiedad `publicRuntimeConfig` para añadir la URL de nuestra API.
- la propiedad `modules` para registrar nuestro módulo `@nuxtjs/axios`.

`pages/index.vue` - utiliza `$axios` para obtener nuestros datos y `$config` para obtener nuestra API URL.

<base-alert type="next">

Obtén más información del [módulo axios](https://axios.nuxtjs.org/).

</base-alert>

<base-alert type="next">

Obtén más información en el capítulo [nuxt.config](/docs/2.x/directory-structure/nuxt-config) del libro de Estructura de Directorios.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
