---
title: La méthode fetch
description: La méthode fetch est utilisé pour remplir le store avant de render la page, c'est similaire à `asyncData` sauf que cela ne remplit pas le `data` du composant.
menu: La méthode fetch
category: components-glossary
position: 1
---

## Nuxt >= 2.12

Avec l'arrivée de la `v2.12` de Nuxt.js, nous avons droit à un nouveau hook disponible dans **tous les composants Vue**: `fetch`.

<base-alert>

`fetch(context)` a été déprécié, à la place on peut utiliser un [middleware anonyme](/docs/2.x/components-glossary/pages-middleware#anonymous-middleware) dans la page: `middleware(context)`

</base-alert>

### Quand utiliser fetch?

À chaque fois que l'on a besoin d'avoir de la data **asynchrone**. `fetch` est appelé côté serveur pour render les routes et côté client lors de la navigation.

Il expose `$fetchState` au niveau du composant:

- `$fetchState.pending`: `Boolean`, permet d'afficher un placeholder pendant que fetch est appelé (côté client).
- `$fetchState.error`: `null` ou `Error`, vous permet d'afficher un message d'erreur
- `$fetchState.timestamp`: `Integer`, l'horodatage du dernier fetch, utile en combinaison avec `keep-alive` pour de la mise en cache.

Si vous souhaitez appeler le hook `fetch` depuis votre template, utilisez:

```html
<button @click="$fetch">Rafraîchir</button>
```

ou la méthode dans le composant:

```javascript
// méthode dans la section script
export default {
  methods: {
    refresh() {
      this.$fetch()
    }
  }
}
```

On peut accéder au [context](/docs/2.x/internals-glossary/context) de Nuxt.js à l'intérieur du hook `fetch` en utilisant `this.$nuxt.context`.

### Options

- `fetchOnServer`: `Boolean` ou `Function` (par défaut: `true`), appelle `fetch()` lors d'un render de page côté serveur
- `fetchDelay`: `Integer` (défaut: `200`), définit un temps d'exécution minimal en millisecondes (pour éviter les flashs)

<div class="Alert Alert--green">

Quand `fetchOnServer` est falsy (`false` ou retourne `false`), `fetch` sera appelé uniquement côté client et `$fetchState.pending` retournera `true` lors d'un render côté serveur du composant.

</div>

```html
<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    async fetch() {
      this.posts = await this.$http.$get(
        'https://jsonplaceholder.typicode.com/posts'
      )
    },
    fetchOnServer: false
  }
</script>
```
