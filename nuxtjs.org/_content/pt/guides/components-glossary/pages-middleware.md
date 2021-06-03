---
title: 'A propriedade middleware'
description: Defina o middleware para uma página específica da aplicação.
menu: Middleware Property
category: components-glossary
position: 0
---

- Tipo: `String` ou `Array` ou `Function`
  - Items: `String` ou `Function`

Defina o middleware para uma página específica da aplicação.

## Middleware nomeado

Você pode criar um middleware nomeado criando um arquivo dentro do diretório `middleware/`. O nome do arquivo será o nome do middleware.

```js{[middleware/authenticated.js]}
export default function ({ store, redirect }) {
  // Se o usuário não estiver autenticado
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

```html{}[pages/secret.vue]
<template>
  <h1>Página Secreta</h1>
</template>

<script>
  export default {
    middleware: 'authenticated'
  }
</script>
```

## Middleware anônimo

Se você precisar usar um middleware apenas para uma página específica, poderá passar diretamente uma função para ele (ou um array de funções):

```html{[pages/secret.vue]}
<template>
  <h1>Página Secreta</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      // Se o usuário não estiver autenticado
      if (!store.state.authenticated) {
        return redirect('/login')
      }
    }
  }
</script>
```
