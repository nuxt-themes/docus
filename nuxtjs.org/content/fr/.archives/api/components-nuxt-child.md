---
title: 'API: Le composant <nuxt-child>'
description: Afficher la page courante.
menu: nuxt-child
category: components
position: 42
---

> Ce composant est utilisé pour afficher les composants enfants dans une [route imbriquée](/guide/routing#nested-routes).

Exemple:

```bash
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

Cette arborescence de fichiers va générer ces chemins :

```js
;[
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~/pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```

Pour afficher le composant `child.vue`, nous devons insérer `<nuxt-child/>` à l'intérieur de `pages/parent.vue`:

```html
<template>
  <div>
    <h1>I am the parent view</h1>
    <nuxt-child :foobar="123" />
  </div>
</template>
```

`<nuxt-child/>` accepte `keep-alive` et `keep-alive-props`:

```html
<template>
  <div>
    <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- se convertit en quelque chose comme ça -->
<div>
  <keep-alive :exclude="['modal']">
    <router-view />
  </keep-alive>
</div>
```

> Les composants enfants peuvent également recevoir des propriétés comme un composant Vue standard.

Pour voir un exemple, jetez un œil à l'exemple des [routes imbriquées](/examples/nested-routes).

## Vue nommée

> Introduite avec Nuxt v2.4.0

`<nuxt-child/>` accepte la propriété `name` pour rendre la vue nommée :

```html
<template>
  <div>
    <nuxt-child name="top" />
    <nuxt-child />
  </div>
</template>
```

Pour voir un exemple, jetez un œil à l'exemple des [vues nommées](/examples/named-views).
