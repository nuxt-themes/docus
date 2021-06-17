---
title: La propriété key
description: Définit la propriété `key` pour un composant `<router-view>` interne
menu: La propriété key
category: components-glossary
position: 3
---

> Définit la propriété `key` pour un composant `<router-view>` interne

- **Type:** `String` ou `Function`

La propriété `key` est propagée dans le `<router-view>`, ce qui est utile pour faire des transitions dans une route dynamique et avec une route différente. Des clés différentes résulteront en un re-render des composants de la page.

Il y a plusieurs façons de définir la clé. Pour plus de détails, veuillez vous référer à la propriété `nuxtChildKey` dans le [composant nuxt](/docs/2.x/features/nuxt-components).

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```
