---
title: Meningkatkan
description: Meningkatkan Nuxt.js itu cepat, tetapi ini melibatkan lebih dari sekadar memperbarui package.json Anda.
position: 5
category: get-started
---

> Meningkatkan Nuxt.js itu cepat, tetapi ini melibatkan lebih dari sekadar memperbarui package.json Anda.

Jika Anda meningkatkan ke Nuxt v2.14 dan ingin menggunakan _hosting_ statis, maka Anda perlu menambahkan [target:static](/docs/2.x/features/deployment-targets#static-hosting) ke file `nuxt.config.js` agar perintah _generate_ berfungsi dengan benar.

```js{}[nuxt.config.js]
export default {
  target: 'static'
}
```

## Memulai

1. Periksa [catatan rilis](/docs/release-notes) untuk versi yang ingin Anda tingkatkan untuk melihat apakah ada instruksi tambahan untuk rilis tersebut.
2. Perbarui versi yang ditentukan untuk paket `nuxt` di file `package.json`.

Setelah langkah ini, instruksi bervariasi tergantung pada apakah Anda menggunakan Yarn atau npm.. _[Yarn](https://yarnpkg.com/en/docs/usage) adalah manajer paket yang lebih disukai untuk bekerja dengan Nuxt karena ini adalah alat pengembangan yang menjadi dasar pengujian._

## Yarn

1. Hapus file `yarn.lock`
2. Hapus direktori `node_modules`
3. Jalankan perintah `yarn`
4. Setelah penginstalan selesai dan Anda telah menjalankan pengujian, pertimbangkan untuk meningkatkan dependensi lain juga. Perintah `yarn outdated` dapat digunakan.

## npm

1. Hapus file `package-lock.json`
2. Hapus direktori `node_modules`
3. Jalankan perintah `npm install`
4. Setelah penginstalan selesai dan Anda telah menjalankan pengujian, pertimbangkan untuk meningkatkan dependensi lain juga. Perintah `npm outdated` dapat digunakan.
