---
title: 'Properti key'
description: Setel properti `key` dari komponen `<router-view>` internal
menu: Properti Key
category: components-glossary
position: 0
---

> Setel properti `key` dari komponen `<router-view>` internal

- **Tipe:** `String` atau `Function`

Properti `key` disebarkan ke dalam `<router-view>` yang berguna untuk membuat transisi di dalam halaman dinamis dan rute berbeda. Kunci yang berbeda menyebabkan perenderan ulang komponen halaman.

Ada beberapa cara untuk menyetel kuncinya. Untuk lebih jelasnya, silakan merujuk ke `nuxtChildKey` prop di [komponen nuxt](/docs/2.x/features/nuxt-components).

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```
