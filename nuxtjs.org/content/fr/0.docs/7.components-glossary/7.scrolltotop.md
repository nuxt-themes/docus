---
title: La propriété scrollToTop
description: La propriété scrollToTop indique à Nuxt.js qu'il faut défiler tout en haut de la page avant de la render.
menu: La propriété scrollToTop
category: components-glossary
position: 8
---

> La propriété scrollToTop indique à Nuxt.js qu'il faut défiler tout en haut de la page avant de la render.

- **Type:** `Boolean` (par défaut: `false`)

Par défaut, Nuxt.js défile tout en haut lorsque l'on va sur une autre page, mais avec les routes imbriquées, Nuxt.js garde la position du défilement. Si l'on souhaite que Nuxt.js défile tout en haut lors du render des routes imbriquées, il faut passer `scrollToTop` à `true`:

```html
<template>
  <h1>Mon composant enfant</h1>
</template>

<script>
  export default {
    scrollToTop: true
  }
</script>
```

Inversement, on peut passer `scrollToTop` à `false` sur les routes parent.

Si l'on souhaite écraser le comportement du défilement par défaut de Nuxt, veuillez vous référer à l'[option scrollBehavior](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior).
