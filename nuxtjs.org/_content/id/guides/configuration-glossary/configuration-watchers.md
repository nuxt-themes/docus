---
title: 'Properti watchers'
description: Properti watchers memperbolehkan Anda untuk mengganti konfigurasi watchers.
menu: watchers
category: configuration-glossary
position: 34
---

- Tipe: `Object`
- Nilai Anggapan: `{}`

> Properti watchers memperbolehkan Anda untuk mengganti konfigurasi watchers pada nuxt.config.js Anda.

## chokidar

- Type: `Object`
- Default: `{}`

Anda dapat mempelajari lebih lanjut tentang opsi chokidar melalui [API chokidar](https://github.com/paulmillr/chokidar#api).

## webpack

- Tipe: `Object`
- Nilai Anggapan:

```js
watchers: {
  webpack: {
    aggregateTimeout: 300,
    poll: 1000
  }
}
```

Anda dapat mempelajari lebih lanjut tentang watchoptions milik webpack melalui [dokumentasi webpack](https://webpack.js.org/configuration/watch/#watchoptions).

### Selanjutnya

<base-alert type="next">

Anda dapat membaca [buku glosarium internal](/docs/2.x/internals-glossary/$nuxt)

</base-alert>
