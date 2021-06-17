---
title: La propriété watchQuery
description: Surveille les query strings et exécute des méthodes de composant lors d'un changement (asyncData, fetch(context), validate, layout, ...)
menu: La propriété watchQuery
category: components-glossary
position: 10
---

> Surveille les query strings et exécute des méthodes de composant lors d'un changement (asyncData, fetch(context), validate, layout, ...).

- **Type:** `Boolean` ou `Array` ou `Function` (par défaut: `[]`)

Utilisez la propriété `watchQuery` pour surveiller les query strings. Si les strings changent, toutes les méthodes du composant (asyncData, fetch(context), validate, layout, ...) seront appelées. La surveillance est désactivée par défaut pour des raisons de performance.

Si l'on souhaite surveiller toutes les query strings, il faut définir `watchQuery: true`.

```js
export default {
  watchQuery: ['page']
}
```

On peut aussi utiliser la fonction `watchQuery(nouvelleRequete, ancienneRequete)` pour avoir une surveillance plus précise.

```js
export default {
  watchQuery(nouvelleRequete, ancienneRequete) {
    // Exécute seulement les méthodes du composant dans le cas où l'ancienne query string
    // contenait la chaîne de caractères `bar` et la nouvelle `foo`
    return nouvelleRequete.foo && ancienneRequete.bar
  }
}
```

<base-alert>

**Warning**: Le nouveau hook `fetch` (disponible depuis la version 2.12) n'est pas affecté par `watchQuery`. Pour plus d'informations, se référer aux [changements sur la surveillance des query strings](/docs/2.x/features/data-fetching#the-fetch-hook).

</base-alert>
