---
title: 'Properti Antarmuka Baris Perintah (CLI)'
description: Nuxt.js memungkinkan Anda menyesuaikan konfigurasi Antarmuka Baris Perintah(CLI).
menu: cli
category: configuration-glossary
position: 3
---

> Nuxt.js memungkinkan Anda menyesuaikan konfigurasi Antarmuka Baris Perintah (CLI).

## bannerColor

- Tipe: `String`
- Nilai Anggapan: `'green'`

Ubah warna judul 'Nuxt.js' di spanduk CLI.

**Warna yang tersedia:**

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

```js{}[nuxt.config.js]
export default {
  cli: {
    bannerColor: 'yellow'
  }
}
```
