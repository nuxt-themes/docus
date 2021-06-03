---
title: Plugins solo para Cliente
description: En este ejemplo mostramos como utilizar un plugin que solo esté disponible en el lado del cliente
position: 402
category: plugins
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/plugins/client-only-plugins?fontsize=14&hidenavigation=1&module=%2Fplugins%2Fclient-only.client.js&theme=dark&view=editor
---

<example-intro></example-intro>

`plugins/client-only.client.js` utiliza la función `window.alert()` la cual no está disponible en el lado del servidor.

`nuxt.config.js` contiene la propiedad `plugins` la cual registra el plugin en el lado del cliente añadiendo la extension `.client`.

<base-alert type="next">

Obtén más información en el capítulo [plugins](/docs/2.x/directory-structure/plugins#client-or-server-side-only) del libro de Estructura de Directorios.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
