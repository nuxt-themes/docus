---
title: 'API : la propriété scrollToTop'
description: La propriété `scrollToTop` vous permet d'indiquer à Nuxt.js de faire défiler la page tout en haut avant de faire le rendu.
menu: scrollToTop
category: pages
position: 28
---

> La propriété `scrollToTop` vous permet d'indiquer à Nuxt.js de faire défiler la page tout en haut avant de faire le rendu.

- **Type :** `Boolean` (défaut : `false`)

Par défaut, Nuxt.js fait défiler la page vers le sommet quand vous changez de page. Mais dans le cas de routes enfants, Nuxt.js reste à sa position actuelle. Si vous désirez indiquer à Nuxt.js de défiler vers le haut de la page lors du rendu de la page enfant, utilisez `scrollToTop: true` :

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

À l'inverse, vous pouvez manuellement définir `scrollToTop` à `false` sur les routes parentes aussi.

Si vous désirez écraser le comportement par défaut du défilement, regardez l'[option `scrollBehavior`](/api/configuration-router#scrollbehavior).
