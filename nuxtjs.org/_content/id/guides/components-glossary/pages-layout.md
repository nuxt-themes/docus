---
title: 'Properti layout'
description: Setiap file (tingkat pertama) dalam direktori `layouts` akan membuat layout kustom yang dapat diakses dengan properti layout di komponen halaman.
menu: Properti Layout
category: components-glossary
position: 0
---

> Setiap file (tingkat pertama) di direktori layouts akan membuat layout khusus yang dapat diakses dengan properti layout di komponen halaman.

- **Tipe:** `String` atau `Function` (default: `'default'`)

Gunakan kunci `layout` di komponen halaman Anda untuk menentukan layout mana yang akan digunakan:

```js
export default {
  layout: 'blog',
  // ATAU
  layout(context) {
    return 'blog'
  }
}
```
