---
title: SEO HTML Head
description: En este ejemplo hacemos uso de la propiedad head para mostrar como obtener buen SEO.
position: 3
category: seo
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/seo/seo-html-head?fontsize=14&hidenavigation=1&module=%2Fnuxt.config.js&theme=dark&view=editor
---

<example-intro></example-intro>

`nuxt.config.js` hace uso de la propiedad `head` para mostrar un `title`, `titleTemplate`, y `meta` incluyendo `description`. Además muestra cómo añadir una fuente de google externa haciendo uso de la propiedad `link` y JS a través de la propiedad `script`. Los atributos `lang` y `amp` son establecidos a través de la propiedad `htmlAttrs`.

`pages/index.vue` hace uso de la propiedad `head` como una función con datos dinámicos y utiliza la fuente de google.

`pages/about.vue` hace uso de la propiedad `head` como objeto.

<base-alert type="next">

Obtén más información de las opciones disponibles para `head`, en la [vue-meta documentation](https://vue-meta.nuxtjs.org/api/#metainfo-properties).

</base-alert>

<base-alert type="next">

Obtén más información sobre etiquetas meta en el capítulo [Etiquetas Meta y SEO](/docs/2.x/features/meta-tags-seo) del libro de Características.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
