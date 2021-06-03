---
title: 'Properti transition'
description: Tetapkan nilai anggapan bagi properti dari transisi halaman dan tata letak.
menu: transition
category: configuration-glossary
position: 31
---

## Properti pageTransition

> Nuxt versi 2.7.0 memperkenalkan _key_ "pageTransition" yang menggantikan _key_ "transition" untuk menggabungkan penamaan _key_ dengan _key_ pada transisi tata letak.

- Tipe: `String` or `Object`

> Berguna dalam menetapkan nilai anggapan dari transisi halaman.

Nilai anggapan:

```js
{
  name: 'page',
  mode: 'out-in'
}
```

```js{}[nuxt.config.js]
export default {
  pageTransition: 'page'
  // or
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Sebelum masuk...');
    }
  }
}
```

_Key_ `transition` pada `nuxt.config.js` digunakan untuk menetapkan nilai anggapan dari transisi halaman. Anda dapat mempelajari lebih lanjut tentang _key_ yang tersedia pada saat _key_ `transition` merupakan sebuah objek pada halaman [pages transition property](/docs/2.x/features/transitions).

## Porperti layoutTransition

- Tipe: `String` atau `Object`

> Digunakan untuk menetapkan nilai anggapan pada transisi tata letak. Nilai yang dinyatakan dalam opsi `name` telah diatur untuk mampu bekerja sesuai dengan nama yang dinyatakan pada `layout` dari berkas `layouts` Anda.

Default:

```js
{
  name: 'layout',
  mode: 'out-in'
}
```

```js{}[nuxt.config.js]
export default {
  layoutTransition: 'layout'
  // or
  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  }
}
```

```css{}[assets/main.css]
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s;
}
.layout-enter,
.layout-leave-active {
  opacity: 0;
}
```
