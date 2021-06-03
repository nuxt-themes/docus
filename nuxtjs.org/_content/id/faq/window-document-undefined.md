---
title: window atau document tidak terdefinisi
description: window atau document tidak terdefinisi di Nuxt.js?
category: development
position: 101
---

# window atau document tidak terdefinisi?

Hal ini disebabkan oleh proses rendering di sisi-server. Jika Anda hanya ingin mengimpor sumber daya (resource) hanya berada di sisi-klien, maka Anda perlu menggunakan variabel `process.client`.

Sebagai contoh, di file `.vue` Anda:

```js
if (process.client) {
  require('pustaka_eksternal')
}
```

Jika Anda menggunakan pustaka (library) ini dalam beberapa file, sebaiknya tambahkan ke [bundel vendor](/docs/2.x/configuration-glossary/configuration-build#build-vendor) melalui `nuxt.config.js`:

```js
build: {
  vendor: ['pustaka_eksternal']
}
```
