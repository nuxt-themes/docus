---
title: Transiciones en Nuxt
description: Añadiendo transiciones predeterminadas y personalizadas a tus páginas y layouts
position: 201
category: transitions
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/transitions/nuxt-transitions?fontsize=14&hidenavigation=1&module=%2Flayouts%2Fdefault.vue&theme=dark&view=editor
---

<example-intro></example-intro>

- `pages/index.vue` y `pages/fade.vue` usan la transición de página predeterminada.
- `pages/bounce.vue` usa la propiedad `transition` con una transición de rebote.
- `pages/slide.vue` usa la propiedad `transition` con una transición de desplazamiento hacia abajo.
- `layout/default.vue` contiene las clases para todas las transiciones.

<base-alert type="next">

Obtén más información en el capítulo de [Transiciones](/docs/2.x/features/transitions) del libro de Características.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
