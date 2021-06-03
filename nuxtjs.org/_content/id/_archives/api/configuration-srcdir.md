---
title: 'API: Properti srcDir'
description: Menentukan direktori asal pada aplikasi Nuxt.js Anda.
menu: srcDir
category: configuration
position: 128
---

# Properti srcDir

- Type: `String`
- Default: [rootDir value](/api/configuration-rootdir)

> Menentukan direktori asal pada aplikasi nuxt.js Anda.

Contoh (`nuxt.config.js`):

```js
module.exports = {
  srcDir: 'client/'
}
```

Kemudian, struktur aplikasi seperti:

```bash
-| app/
---| node_modules/
---| client/
------| pages/
------| components/
---| nuxt.config.js
---| package.json
```

Pilihan ini berguna ketika memiliki server khusus yang menggunakan Nuxt.js, jadi semua dependensi npm dapat dikelompokkan kembali dalam satu `package.json`.
