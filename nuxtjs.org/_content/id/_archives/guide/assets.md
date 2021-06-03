---
title: Aset
description: Secara default, Nuxt menggunakan vue-loader, file-loader dan url-loader webpack loaders untuk penyimpanan aset yang kukuh. Kamu juga dapat menggunakan direktori Static untuk aset yang statis.
category: getting-started
position: 107
---

> Secara default, Nuxt menggunakan vue-loader, file-loader dan url-loader webpack loaders untuk penyimpanan aset yang kukuh. Kamu juga dapat menggunakan direktori Static untuk aset yang statis.

## webpacked

Secara default, [vue-loader](http://vue-loader.vuejs.org/en/) akan memproses file style dan templat kamu secara otomatis menggunakan css-loader dan kompiler templat Vue. Dalam proses kompilasi ini, semua aset URL seperti pemanggilan gambar pada komponen HTML atau CSS ( `<img src="...">`, `background: url(...)`, dan `CSS @import` ) akan dipecahkan sebagai modul dependensi.

Contoh, kita memiliki pohon (tree) file seperti berikut:

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

Dalam CSS kamu, jika kamu menggunakan `url('~/assets/image.png')` , itu akan diterjemahkan menjadi `require('~/assets/image.png')`.

Atau jika pada `pages/index.vue` Anda menggunakan:

```html
<template>
  <img src="~/assets/image.png" />
</template>
```

Maka akan dikompilasikan menjadi:

```js
createElement('img', { attrs: { src: require('~/assets/image.png') } })
```

Karena `.png` bukan file dari JavaScript, Nuxt.js mengonfigurasi webpack untuk menggunakan [file-loader](https://github.com/webpack/file-loader) dan [url-loader](https://github.com/webpack/url-loader) untuk menanganinya untuk Anda.

Manfaat menggunakan file-loader dan url-loader adalah:

- file-loader memungkinkan Anda menentukan tempat untuk menyalin dan menempatkan file aset, dan bagaimana cara menamainya menggunakan version hashes untuk caching (memori sementara) yang lebih baik.
- url-loader memungkinkan Anda untuk menyamakan inline file sebagai data URL base-64 jika ukurannya lebih kecil dari batas yang diberikan. Hal ini dapat mengurangi sejumlah permintaan HTTP untuk file yang kurang berarti. Jika file lebih besar dari batas, maka secara otomatis akan kembali ke file-loader.

Sebenarnya, konfigurasi pemindah aset yang default dari Nuxt.js adalah:

```js
;[
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

Yang berarti setiap file di bawah 1 KB akan digaris bawahi sebagai data URL base-64. Jika tidak, gambar/font akan disalin di foldernya yang sesuai (di bawah direktori `.nuxt`) dengan nama yang berisi version hash untuk caching yang lebih baik.

Saat menjalankan aplikasi kita dengan `nuxt`, templat kita berada pada `pages/index.vue`:

```html
<template>
  <img src="~/assets/image.png" />
</template>
```

Maka akan menjadi:

```html
<img src="/_nuxt/img/image.0c61159.png" />
```

Jika Anda ingin memperbarui loader ini atau menonaktifkannya, silakan menggunakan [build.extend](/api/configuration-build#extend).

## Static

Jika Anda tidak ingin menggunakan Aset webpacked dari direktori `assets`, Anda dapat membuat dan menggunakan direktori `static` pada direktori root Anda.

File-file ini akan secara otomatis dilayani oleh Nuxt dan dapat diakses di URL root proyek Anda.

Pilihan ini sangat membantu untuk file seperti `robots.txt`, `sitemap.xml`, atau `CNAME` (seperti halaman-halaman GitHub).

Dari kode Anda, Anda bisa merujuk file tersebut dengan `/` URL di bawah ini:

```html
<!-- Gambar statis dari direktori static -->
<img src="/my-image.png" />

<!-- Gambar webpacked dari direktori assets -->
<img src="~/assets/my-image-2.png" />
```
