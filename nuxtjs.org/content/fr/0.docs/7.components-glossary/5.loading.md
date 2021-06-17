---
title: La propriété loading
description: La propriété loading vous donne la possibilité de désactiver la barre de progression par défaut sur une page spécifique.
menu: La propriété loading
category: components-glossary
position: 5
---

> La propriété loading vous donne la possibilité de désactiver la barre de progression par défaut sur une page spécifique.

- **Type:** `Boolean` (par défaut: `true`)

Par défaut, Nuxt.js utilise son propre composant pour afficher une barre de progression entre les routes.

Vous pouvez la désactiver ou la personnaliser à travers les [options de configuration du chargement](/docs/2.x/configuration-glossary/configuration-loading), mais aussi la désactiver seulement sur des pages spécifiques en passant la propriété `loading` à false:

```html
<template>
  <h1>Ma page</h1>
</template>

<script>
  export default {
    loading: false
  }
</script>
```
