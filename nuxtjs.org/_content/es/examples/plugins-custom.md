---
title: Plugins personalizados
description: En este ejemplo mostramos cómo puedes crear tu propio plugin
position: 404
category: plugins
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/plugins/custom-plugins?fontsize=14&hidenavigation=1&module=%2Fplugins%2Fnuxt-api.js&theme=dark&view=editor
---

<example-intro></example-intro>

`plugins/hello.js` - registra un mensaje en la consola con un mensaje dinámico.

`store/index.js` - guarda nuestro mensaje dinámico procedente de nuestro input.

`pages/index.vue` utiliza el plugin hello para:

- registra un mensaje en la consola durante el método de ciclo de vida mounted.
- registra un mensaje en la consola con el valor obtenido desde nuestro input.

`plugins/nuxt-api.js` - obtiene datos de nuestra API.

`pages/api-plugin.vue` - utiliza nuestro plugin para obtener y mostrar los datos de nuestra API.

`nuxt.config.js` - registra nuestros plugins haciendo uso de la propiedad `plugins`.

<base-alert type="next">

Obtén más información en el capítulo [plugins](/docs/2.x/directory-structure/plugins#inject-in-root--context) del libro de Estructura de Directorios.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
