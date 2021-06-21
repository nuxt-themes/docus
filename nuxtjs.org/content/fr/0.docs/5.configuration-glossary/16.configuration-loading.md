---
title: La propriété loading
description: Nuxt.js utilise son propre composant pour montrer une barre de progression lors de la navigation entre les routes. On peut le personnaliser, le désactiver ou même créer le notre.
menu: loading
category: configuration-glossary
position: 15
---

- Type: `Boolean` ou `Object` ou `String`

> Nuxt.js utilise son propre composant pour montrer une barre de progression lors de la navigation entre les routes. On peut le personnaliser, le désactiver ou même créer le notre.

```javascript
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

## Désactiver la barre de progression

- Type: `Boolean`

```js{}[nuxt.config.js]
export default {
  loading: false
}
```

## Personnaliser la barre de progression

- Type: `Object`

```js
export default {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

Voici la liste des propriétés que vous pouvez utiliser pour personnaliser la barre de progression.

| Propriété   | Type    | Défaut  | Description                                                                                                                     |
| ----------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| color       | String  | 'black' | Couleur CSS de la barre de progression                                                                                          |
| failedColor | String  | 'red'   | Couleur CSS de la barre de progression lors d'une erreur lors du render d'une route (ex: de la data ou un fetch ont échoué).    |
| height      | String  | '2px'   | Hauteur de la barre de progression (utilisé dans la propriété `style` de la barre de progression)                               |
| throttle    | Number  | 200     | En millisecondes, le temps a attendre avant que la barre de navigation ne soit affichée. Utile pour éviter de créer des flashs. |
| duration    | Number  | 5000    | En millisecondes, la durée maximum de la barre de progression, Nuxt.js assume que la route sera render en moins de 5 secondes.  |
| continuous  | Boolean | false   | Continuer d'animer la barre de progression lorsque le chargement prends plus de temps que la valeur de la propriété `duration`. |
| css         | Boolean | true    | Définir à `false` pour enlever tous les styles appliqués à la barre de progression (y compris les vôtres).                      |
| rtl         | Boolean | false   | Définit la direction de la barre de progression, de droite à gauche.                                                            |

## Utiliser un composant de chargement personnalisé

- Type: `String`

**Votre composant devra fournir certaines des méthodes suivantes**:

| Méthode       | Requis    | Description                                                                                                       |
| ------------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| start()       | Requis    | Appelé lors d'un changement de route, c'est à ce moment là que vous affichez votre composant.                     |
| finish()      | Requis    | Appelé lorsqu'une route est chargée (et la data collectée), c'est à ce moment là que vous cachez votre composant. |
| fail(error)   | Optionnel | Appelé lorsqu'une de vos routes n'a pas pu être chargée (ex: le chargement de la data a échoué)                   |
| increase(num) | Optionnel | Appelé durant le chargement du composant de la route, `num` est un `Integer` < 100.                               |

```html{}[components/loading.vue]
<template lang="html">
  <div class="loading-page" v-if="loading">
    <p>Chargement...</p>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
  }
</style>
```

```js{}[nuxt.config.js]
export default {
  loading: '~/components/loading.vue'
}
```
