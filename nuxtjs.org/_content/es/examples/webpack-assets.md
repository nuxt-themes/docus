---
title: Recursos de webpack
description: Haz uso del directorio assets para añadir css, imágenes y fuentes a tu aplicación
position: 1
category: assetManagement
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/asset-management/webpack-assets?fontsize=14&hidenavigation=1&theme=dark&view=editor
---

<example-intro></example-intro>

`pages/index.vue` muestra:

- cómo añadir una imagen del directorio `assets`.
- cómo añadir como fondo una imagen del directorio `assets` haciendo uso de CSS.
- cómo añadir dinámicamente imágenes del directorio `assets` haciendo uso de la propiedad `data`.

`nuxt.config.js` contiene la propiedad `css` para añadir un archivo css globalmente.

`assets/main.css` muestra cómo hacer referencia a las fuentes DMSans del directorio de `assets` haciendo uso de la regla `@font-face`.

<base-alert type="next">

Obtén más información en el capítulo [Recursos](/docs/2.x/directory-structure/assets) del libro de Estructura de Directorios.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
