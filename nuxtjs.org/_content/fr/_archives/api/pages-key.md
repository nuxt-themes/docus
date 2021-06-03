---
title: 'API: la propriété key'
description: Définir la propriété `key` du composant `<router-view>`
menu: key
category: pages
position: 24
---

> Définir la propriété `key` du composant `<router-view>`

- **Type:** `String` ou `Function`

La propriété `key` est propagée dans `<router-view>`, ce qui est utile pour effectuer des transitions à l'intérieur d'une page dynamique et d'une route différente. Des clés différentes entraînent le rerendering des composants de la page.

Il y a plusieurs façons de définir key. Pour plus de détails, veuillez vous référer à la propriété `nuxtChildKey` du [composant nuxt](/api/components-nuxt).

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```
