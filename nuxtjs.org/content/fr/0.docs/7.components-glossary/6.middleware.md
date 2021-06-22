---
title: La propriété middleware
description: Définit le middleware pour une page spécifique de l'application.
menu: La propriété middleware
category: components-glossary
position: 6
---

- Type: `String` or `Array` or `Function`
  - Items: `String` or `Function`

Définit le middleware pour une page spécifique de l'application.

## Middleware nommé

Vous pouvez nommer votre middleware en créant un fichier à l'intérieur du répertoire `middleware/`, le nom du fichier sera le nom du middleware.

```js{[middleware/authenticated.js]}
export default function ({ store, redirect }) {
  // Si l'utilisateur n'est pas authentifié
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

```html{}[pages/secret.vue]
<template>
  <h1>Page secrète</h1>
</template>

<script>
  export default {
    middleware: 'authenticated'
  }
</script>
```

## Middleware anonyme

Si l'on ressent le besoin d'utiliser un middleware seulement pour une page spécifique, on peut directement utiliser une fonction pour cela (voire même un tableau de fonctions):

```html{[pages/secret.vue]}
<template>
  <h1>Page secrète</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      // Si l'utilisateur n'est pas authentifié
      if (!store.state.authenticated) {
        return redirect('/login')
      }
    }
  }
</script>
```
