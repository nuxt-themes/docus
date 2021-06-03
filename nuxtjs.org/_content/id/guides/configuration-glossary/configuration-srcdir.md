---
title: 'Properti srcDir'
description: Tentukan direktori sumber aplikasi Nuxt.js Anda
menu: srcDir
category: configuration-glossary
position: 28
---

- Tipe: `String`
- Nilai Anggapan: [nilai rootDir](/docs/2.x/configuration-glossary/configuration-rootdir)

> Tentukan direktori sumber aplikasi Nuxt.js Anda

Jika jalur relatif ditentukan, itu akan menjadi relatif terhadap rootDir

Contoh 1: Prasyarat:

```js{}[nuxt.config.js]
export default {
  srcDir: 'client/'
}
```

```js{}[package.json]
  "script": {
    "dev": "yarn nuxt"
  }
```

bekerja dengan struktur _folder_ berikut (perhatikan bahwa nuxt.config terdaftar di direktori app)

```bash
-| app/
---| node_modules/
---| nuxt.config.js
---| package.json
---| client/
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/
```

Contoh 2:

Selain contoh 1, Anda juga dapat memindahkan nuxt.config ke _folder_ src Anda. Dalam hal ini, Anda hanya perlu menetapkan klien sebagai rootDir dan Anda dapat mengosongkan srcDir:

Prerequisites:

```js{}[nuxt.config.js]
export default {
  srcDir: '' // atau hapus saja
}
```

```js{}[package.json]
  "script": {
    "dev": "yarn nuxt client" // ini menetapkan klien sebagai rootDir
  }
```

bekerja dengan struktur _folder_ berikut (perhatikan bahwa nuxt.config terdaftar di direktori client)

```bash
-| app/
---| node_modules/
---| package.json
---| client/
------| nuxt.config.js
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/
```
