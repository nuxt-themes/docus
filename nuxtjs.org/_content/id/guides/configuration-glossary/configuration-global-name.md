---
title: 'Properti globalName'
description: Nuxt.js memungkinkan kamu menyesuaikan ID global yang digunakan dalam templat HTML utama serta nama instance Vue utama dan opsi lainnya.
menu: globalName
category: configuration-glossary
position: 11
---

> Nuxt.js memungkinkan kamu menyesuaikan ID global yang digunakan dalam templat HTML utama serta nama _instance_ Vue utama dan opsi lainnya.

- Tipe: `String`
- Bawaan: `nuxt`

```js{}[nuxt.config.js]
{
  globalName: 'myCustomName'
}
```

<base-alert>

`globalName` harus menjadi pengenal JavaScript yang valid, dan mengubahnya dapat merusak dukungan untuk _plugin_ tertentu yang mengandalkan fungsi Nuxt-bernama. Jika kamu hanya ingin mengubah ID HTML `__nuxt` yang terlihat, gunakan properti `globals`.

</base-alert>

## Properti globals

> Menyesuaikan nama global tertentu yang didasarkan pada `globalName` secara bawaan.

- Tipe: `Object`
- Bawaan:

```js{}[nuxt.config.js]
globals: {
  id: globalName => `__${globalName}`,
  nuxt: globalName => `$${globalName}`,
  context: globalName => `__${globalName.toUpperCase()}__`,
  pluginPrefix: globalName => globalName,
  readyCallback: globalName => `on${_.capitalize(globalName)}Ready`,
  loadedCallback: globalName => `_on${_.capitalize(globalName)}Loaded`
},
```
