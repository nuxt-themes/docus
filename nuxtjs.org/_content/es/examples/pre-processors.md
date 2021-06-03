---
title: Preprocesadores
description: Configura tu aplicación para hacer uso de Pug y Sass con recursos de estilo y así añadir fácilmente variables a todos los componentes.
position: 2
category: assetManagement
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/asset-management/pre-processors?fontsize=14&hidenavigation=1&theme=dark&view=editor
---

<example-intro></example-intro>

`pages/index.vue` hace uso de Pug como lenguaje de la plantilla y Sass para el estilo.

`nuxt.config.js`:

- registra el módulo de recursos de estilo.
- contiene una propiedad `styleResources` para añadir `assets/variables.scss`.
- contiene una propiedad `css` para añadir `assets/main.scss`.

`package.json` muestra las dependencias necesitadas.

<base-alert type="next">

Obtén más información en el capítulo [Configuración](/docs/2.x/features/configuration#pre-processors) del libro de Características.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
