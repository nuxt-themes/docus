---
title: 'Key Özelliği'
description: Dahili `<router-view>` bileşeninin `key` özelliğini ayarlayın
menu: Key Özelliği
category: components-glossary
position: 0
---

> Dahili `<router-view>` bileşeninin `key` özelliğini ayarlayın

- **Type:** `String` veya `Function`

`key` özelliği `<router-view>` içerisine yayılır, dinamik bir sayfa ve farklı rota içerisinde geçişler yapmak için kullanışlıdır. Farklı keyler sayfa bileşenlerinin yeniden oluşturulmasına neden olur.

Key'i ayarlamanın çeşitli yolları vardır. Daha fazla ayrıntılı bilgi için, lütfen [nuxt bileşenindeki](/docs/2.x/features/nuxt-components) `nuxtChildKey` 'a bakın.

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```
