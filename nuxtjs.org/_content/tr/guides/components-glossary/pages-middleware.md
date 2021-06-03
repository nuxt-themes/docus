---
title: 'Middleware Özelliği'
description: Uygulamanın belirli bir sayfası için middleware ayarlayın.
menu: Middleware Özelliği
category: components-glossary
position: 0
---

- Tip: `String` veya `Array` veya `Function`
  - Parçalar: `String` veya `Function`

Uygulamanın belirli bir sayfası için middleware ayarlayın.

## İsimlendirilmiş middleware

`middleware/` dizini içerisinde bir dosya oluşturarak isimlendirilmiş middleware oluşturabilirsiniz, dosyanın adı middleware'ın adı olacaktır.

```js{}[middleware/authenticated.js]
export default function ({ store, redirect }) {
  // Kullanıcı kimliği doğrulanmamışsa
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

```html{}[pages/secret.vue]
<template>
  <h1>Gizli sayfa</h1>
</template>

<script>
  export default {
    middleware: 'authenticated'
  }
</script>
```

## Anonim middleware

Bir middleware'ı yalnızca belirli bir sayfa için kullanmanız gerekiyorsa, doğrudan bir fonksiyon (veya bir fonksiyon dizisi) kullanabilirsiniz.

```html{}[pages/secret.vue]
<template>
  <h1>Gizli Sayfa</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      // Kullanıcı kimliği doğrulanmamışsa
      if (!store.state.authenticated) {
        return redirect('/login')
      }
    }
  }
</script>
```
