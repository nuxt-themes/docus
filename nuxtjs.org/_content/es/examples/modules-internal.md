---
title: Módulo Local
description: Módulo Local para crear un túnel utilizando ngrok
position: 501
category: modules
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/modules/local-module?fontsize=14&hidenavigation=1&module=%2Fmodules%2Fngrok%2Findex.js&theme=dark&view=editor
---

<example-intro></example-intro>

- `modules/ngrok/index.js` añade una URL pública de ngrok al Nuxt CLI estando en modo desarrollo.
- `pages/index.vue` muestra la URL pública de ngrok.
- `nuxt.config.js` resgistra nuestro módulo utilizando la propiedad `buildModules`.

<base-alert type="next">

Obtén más información en el capítulo [modules](/docs/2.x/directory-structure/modules) del libro de Estructura de Directorios.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
