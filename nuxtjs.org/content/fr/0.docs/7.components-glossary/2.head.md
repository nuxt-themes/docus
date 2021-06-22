---
title: La méthode head
description: Nuxt.js utilise vue-meta pour mettre à jour les entêtes et attributs HTML de votre application.
menu: La méthode head
category: components-glossary
position: 2
---

> Nuxt.js utilise [vue-meta](https://github.com/nuxt/vue-meta) pour mettre à jour les `entêtes` et `attributs HTML` de votre application.

- **Type:** `Object` ou `Function`

Utilisez la méthode `head` pour définir les balises d'entête HTML de votre page actuelle.

```html
<template>
  <h1>{{ titre }}</h1>
</template>

<script>
  export default {
    data() {
      return {
        titre: 'Salut le monde !'
      }
    },
    head() {
      return {
        title: this.titre,
        meta: [
          // `hid` est un identifiant unique. N'utilisez pas `vmid` pour cela car cela ne marchera pas.
          {
            hid: 'description',
            name: 'description',
            content: 'Ma description personnalisée'
          }
        ]
      }
    }
  }
</script>
```
