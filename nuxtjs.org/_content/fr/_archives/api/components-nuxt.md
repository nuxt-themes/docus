---
title: 'API: Le composant <nuxt>'
description: Affichez les composants de la page dans une mise en page.
menu: nuxt
category: components
position: 41
---

> Ce composant est utilisé uniquement dans les [mises en page](/guide/views#layouts) pour afficher les composants de la page.

Exemple (`layouts/default.vue`):

```html
<template>
  <div>
    <div>My nav bar</div>
    <nuxt />
    <div>My footer</div>
  </div>
</template>
```

Pour voir un example, jetez un œil à [l'exemple de mise en page](/examples/layouts).

**Propriétés**:

- nuxtChildKey: `string`
  - Cette propriété sera définie sur `<router-view/>`, utile pour effectuer des transitions à l'intérieur d'une page dynamique et de différentes routes.
  - Par défaut: `$route.path`

Il y a 3 façons de gérer les propriétés internes `key` de `<router-view/>`.

1. `nuxtChildKey` propriété

```html
<template>
  <div>
    <nuxt :nuxt-child-key="someKey" />
  </div>
</template>
```

2. l'option `key` à l'intérieur des composants de la page : `string` ou `function`

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```

- nom: `string` (_introduit avec Nuxt v2.4.0_)
  - Cette propriété sera définie sur `<router-view/>`, utilisé pour rendre la vue nommée de la page du composant.
  - Par défaut: `default`

Pour voir un example, jetez un œil à [l'exemple de vue nommée](/examples/named-views).
