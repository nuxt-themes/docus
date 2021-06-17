---
title: '$nuxt: Le helper Nuxt.js'
description: $nuxt est un helper conçu pour améliorer l'expérience de l'utilisateur.
category: internals-glossary
position: 2
---

`$nuxt` est un helper conçu pour améliorer l'expérience de l'utilisateur.
Pour plus d'informations sur les helpers Nuxt.js, consultez le [chapitre sur le contexte et les aides dans le livre des concepts](https://nuxtjs.org/guides/concepts/context-helpers#nuxt-the-nuxtjs-helper)

## Contrôle de connexion

- `isOffline`
  - Type: `Boolean`
  - Description: `true` lorsque la connexion internet de l'utilisateur est hors ligne
- `isOnline`
  - Type: `Boolean`
  - Description: L'opposé de `isOffline`

```html{}[layouts/default.vue]
<template>
  <div>
    <div v-if="$nuxt.isOffline">Vous êtes hors ligne</div>
    <nuxt />
  </div>
</template>
```

## Rafraîchissement des données de la page

- `refresh()`
  - Lorsque vous souhaitez rafraîchir les données fournies par `asyncData` ou `fetch`

```html{}[example.vue]
<template>
  <div>
    <div>{{ content }}</div>
    <button @click="refresh">Rafraîchir</button>
  </div>
</template>

<script>
  export default {
    asyncData() {
      return { content: 'Créé à : ' + new Date() }
    },
    methods: {
      refresh() {
        this.$nuxt.refresh()
      }
    }
  }
</script>
```

## Contrôle de la barre de chargement

- `$loading`
  - Lorsque vous voulez contrôler la barre de chargement de Nuxt

```js{}[]
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```
