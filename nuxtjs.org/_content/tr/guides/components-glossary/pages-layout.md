---
title: 'Layout Özelliği'
description: layouts dizinindeki her dosya (birince seviye), sayfa bileşenindeki layout özelliği ile erişilebilen özel bir düzen oluşturacaktır.
menu: Layout Özelliği
category: components-glossary
position: 0
---

> Layouts dizinindeki her dosya (birince seviye), sayfa bileşenindeki layout özelliği ile erişilebilen özel bir düzen oluşturacaktır.

- **Type:** `String` veya `Function` (varsayılan: `'default'`)

Hangi layout'un kullanılacağını tanımlamak için sayfa bileşenlerinizdeki `layout` 'ı kullanın.

```js
export default {
  layout: 'blog',
  // veya
  layout(context) {
    return 'blog'
  }
}
```
