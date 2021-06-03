---
title: Plugin de Paquetes Externos
description: En este ejemplo mostramos cómo hacer uso de un plugin con un paquete externo - axios
position: 403
category: plugins
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/plugins/external-packages-plugin?fontsize=14&hidenavigation=1&module=%2Fplugins%2Faxios.js&theme=dark&view=editor
---

<example-intro></example-intro>

`plugins/axios.js` intercepta la llamada de `$axios` haciendo uso de la función `onError()`.

`pages/index.vue` utiliza `$axios` para obtener nuestros datos de una API.

`pages/mountains/_slug.vue` utiliza `$axios` para obtener nuestros datos de una API con la id procedente de los parámetros de ruta.

`pages/404.vue` es la página a la que se llama cuando hay un error.

`nuxt.config.js` contiene la propiedad `module` y la propiedad `plugin` para registrar nuestros módulo y plugin.

`package.json` muestra que nuestro módulo `@nuxtjs/axios` ha sido instalado.

<base-alert type="next">

Obtén más información en el capítulo [plugins](/docs/2.x/directory-structure/plugins#external-packages) del libro de Estructura de Directorios.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
