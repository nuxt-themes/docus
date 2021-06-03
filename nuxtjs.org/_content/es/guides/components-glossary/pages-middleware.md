---
title: 'La propiedad middleware'
description: Configure un middleware para una página específica de la aplicación.
menu: Propiedad Middleware
category: components-glossary
position: 0
---

- tipo: `String` o `Array` o `Function`
  - Items: `String` o `Function`

Configure un middleware para una página específica de la aplicación.

## Middleware declarado

Puedes declarar un middleware con un nombre creando un archivo dentro del directorio `middleware/`, el nombre del archivo será el nombre del middleware.

```js{[middleware/authenticated.js]}
export default function ({ store, redirect }) {
  // Si el usuario no está autenticado
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

```html{}[pages/secret.vue]
<template>
  <h1>Pagina secreta</h1>
</template>

<script>
  export default {
    middleware: 'authenticated'
  }
</script>
```

## Middleware anónimo

Si necesitas usar un middleware solo para una página específica, puedes usar directamente una función (o un array de funciones):

```html{[pages/secret.vue]}
<template>
  <h1>Pagina secreta</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      // Si el usuario no está autenticado
      if (!store.state.authenticated) {
        return redirect('/login')
      }
    }
  }
</script>
```
