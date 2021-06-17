---
title: 'API: la propriété loading'
description: La propriété `loading` vous permet de désactiver la barre de progression du chargement par défaut sur une page spécifique.
menu: loading
category: pages
position: 26
---

> La propriété loading vous permet de désactiver la barre de progression du chargement par défaut sur une page spécifique.

- **Type:** `Boolean` (défaut: `true`)

Par défaut, Nuxt.js utilise son propre composant pour afficher une barre de progression entre les routes.

Vous pouvez le désactiver ou le personnaliser globalement via l'[option loading](/api/configuration-loading), mais aussi le désactiver pour des pages spécifiques en définissant la propriété `loading` sur `false`:

```html
<template>
  <h1>My page</h1>
</template>

<script>
  export default {
    loading: false
  }
</script>
```

Vous pouvez trouver un exemple officiel en utilisant cette propriété [ici](/examples/custom-page-loading).
