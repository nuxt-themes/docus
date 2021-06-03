---
title: SEO Twitter y Open Graph
description: En este ejemplo, creamos un componente para agregar nuestras etiquetas de Twitter y Open Graph para cuando se comparte en las redes sociales.
position: 4
category: seo
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/seo/seo-twitter-og?fontsize=14&hidenavigation=1&module=%2Fcomponents%2FSocialHead.vue&theme=dark&view=editor
---

<example-intro></example-intro>

`components/SocialHead` usa la propiedad` head` para mostrar `meta` tanto para Twitter como para compartir en redes sociales Open Graph usando accesorios.

`pages/mountains/slug.vue` usa el componente` SocialHead` pasando el título, la descripción y la imagen de la montaña como valores para los accesorios. También usa la etiqueta `head` para establecer el enlace canónico.

`nuxtconfig.js` muestra la etiqueta principal con meta predeterminada para compartir en redes sociales cuando el componente` SocialHead` no se usa tan bien como el enlace canónico.

<base-alert type="next">

Aprende más sobre las opciones disponibles para `head`, en la [documentación de vue-meta](https://vue-meta.nuxtjs.org/api/#metainfo-properties).

</base-alert>

<base-alert type="next">

Aprende más sobre las metaetiquetas en el capítulo de [Metaetiquetas y SEO](/docs/2.x/features/meta-tags-seo) en el libro de Características.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
