---
title: 'API : la méthode head'
description: Nuxt.js utilise vue-meta pour mettre à jour les entêtes et les attributs HTML de votre application.
menu: head
category: pages
position: 23
---

> Nuxt.js utilise [vue-meta](https://github.com/nuxt/vue-meta) pour mettre à jour les entêtes et les attributs HTML de votre application.

- **Type :** `Object` ou `Function`

Utilisez la méthode `head` pour définir les balises d'entête HTML de la page courante.

Les données de votre composant sont disponibles avec `this` au sein de la méthode `head`, vous pouvez définir des balises meta personnalisées avec les données de page.

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello World !'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          // hid est utilisé comme identifiant unique. N'utilisez pas `vmid` car ça ne fonctionnera pas
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

<div class="Alert Alert--teal">

<b>Info :</b> Afin d'éviter les doublons quand vous utilisez un composant enfant, utilisez un identifiant unique à l'aide de la clé `hid`. En savoir [plus à ce propos](https://vue-meta.nuxtjs.org/api/#tagidkeyname).

</div>
