---
title: assets
description: Direktori `assets` berisikan aset Anda yang belum dikompilasi seperti berkas Stylus/Sass, gambar atau fon.
position: 2
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/02_assets?fontsize=14&hidenavigation=1&theme=dark
videoScript:
  - assets-video.md
questions:
  - question: Direktori mana yang berisi aset Anda yang belum dikompilasi seperti berkas Stylus/Sass, gambar, atau fon?
    answers:
      - static
      - assets
      - pages
    correctAnswer: assets
  - question: Apa yang Anda gunakan jika Anda perlu mereferensikan direktori aset Anda di dalam templat vue?
    answers:
      - '/assets/gambar_anda.png'
      - '@assets/gambar_anda.png'
      - '@/assets/gambar_anda.png'
    correctAnswer: '@/assets/gambar_anda.png'
  - question: Apa yang Anda gunakan jika Anda perlu mereferensikan direktori aset Anda di dalam berkas css?
    answers:
      - url("@assets/banner.svg")
      - url("assets/banner.svg")
      - url("@/assets/banner.svg")
    correctAnswer: url("@assets/banner.svg")
  - question: Di mana Anda mengimpor _stylesheet_ css global Anda?
    answers:
      - di dalam berkas index.vue Anda
      - di dalam berkas nuxt.config.js
      - di dalam berkas layout default
    correctAnswer: di dalam berkas nuxt.config.js
  - question: Di properti mana Anda mengimpor fon global?
    answers:
      - font
      - head
      - css
    correctAnswer: head
  - question: Pemuat _(loader)_ mana yang memungkinkan Anda untuk menyisipkan berkas secara _inline_ sebagai URL data _base-64_?
    answers:
      - file-loader
      - url-loader
      - image-loader
    correctAnswer: url-loader
  - question: Apa alias untuk direktori sumber?
    answers:
      - '@'
      - '@@'
      - '^'
    correctAnswer: '@'
  - question: Apa alias untuk direktori root?
    answers:
      - '@'
      - '@@'
      - '@root'
    correctAnswer: '@@'
---

Direktori `assets` berisi aset Anda yang belum terkompilasi seperti berkas Stylus/Sass, gambar atau fon.

## Gambar:

Di dalam _tag_ templat `vue` Anda, jika Anda perlu menautkan ke direktori `assets` maka gunakan `~/assets/gambar_anda.png` dengan garis miring sebelum `assets`.

```html
<template>
  <img src="~/assets/gambar_anda.png" />
</template>
```

Di dalam berkas `css` Anda, jika Anda perlu mereferensikan direktori `assets`, gunakan `~assets/gambar_anda.png` (tanpa garis miring sebelum `assets`)

```css
background: url('~assets/banner.svg');
```

Ketika bekerja dengan gambar dinamis, Anda perlu menggunakan _require_

```html
<img :src="require(`~/assets/img/${gambar}.jpg`)" />
```

<base-alert type="next">

Pelajari lebih lanjut tentang [Aset Webpack](/docs/2.x/directory-structure/assets#webpack-assets)

</base-alert>

## Gaya:

Nuxt.js memungkinkan Anda menentukan berkas/modul/_libraries_ CSS yang ingin Anda atur secara global (disertakan di setiap halaman). Di nuxt.config Anda dapat dengan mudah menambahkan _style_ Anda menggunakan _CSS Property_.

```js{}[nuxt.config.js]
export default {
  css: [
    // Memuat modul Node.js secara langsung (di sini merupakan berkas Sass)
    'bulma',
    // Berkas CSS di dalam proyek
    '~/assets/css/main.css',
    // Berkas SCSS di dalam proyek
    '~/assets/css/main.scss'
  ]
}
```

<base-alert type="info">

Jika Anda ingin menggunakan `sass` pastikan Anda telah memasang _package_ untuk `sass` dan `sass-loader`.

</base-alert>

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D sass sass-loader@10 fibers
```

  </code-block>
  <code-block label="npm">

```bash
npm install --save-dev sass sass-loader@10 fibers
```

  </code-block>
</code-group>

Nuxt.js secara otomatis akan menebak jenis file dengan ekstensinya dan menggunakan pemuat pra-prosesor yang sesuai untuk webpack. Anda masih perlu memasang pemuat yang diperlukan jika Anda perlu menggunakannya.

## Fon:

Anda dapat menggunakan fon lokal dengan menambahkannya ke _folder_ aset Anda. Setelah ditambahkan, Anda dapat mengaksesnya melalui css menggunakan @font-face.

```
-| assets
----| fonts
------| DMSans-Regular.ttf
------| DMSans-Bold.ttf
```

```css{}[assets/main.css]
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('~assets/fonts/DMSans-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('~assets/fonts/DMSans-Bold.ttf') format('truetype');
}
```

<base-alert type="next">

Untuk menambahkan fon eksternal seperti fon google, lihat [bab Tag Meta dan SEO](/docs/2.x/features/meta-tags-seo#external-resources)

</base-alert>

## Aset Webpack

Secara setelan standar, Nuxt menggunakan vue-loader, file-loader, dan url-loader webpack untuk melayani aset Anda. Anda juga dapat menggunakan direktori statis untuk aset yang tidak boleh dijalankan melalui webpack

## Webpack

[vue-loader](http://vue-loader.vuejs.org/) secara otomatis memproses berkas gaya dan templat Anda dengan `css-loader` dan kompilator templat Vue tanpa perlu setelan tambahan apapun. Dalam proses kompilasi ini, semua URL aset seperti `<img src ="...">`, `background: url(...)` dan CSS `@import` terurai sebagai dependensi modul.

Sebagai contoh, terdapat struktur berkas seperti ini:

```
-| assets/
----| image.png
-| pages/
----| index.vue
```

Jika Anda menggunakan `url('~assets/gambar.png')` di CSS Anda, ini akan diterjemahkan menjadi `require('~/assets/gambar.png')`.

<base-alert>

Alias `~/` tidak akan diterjemahkan dengan benar di file CSS Anda. Anda harus menggunakan `~assets` (**tanpa garis miring**) di referensi CSS `url`, yaitu `background: url("~assets/banner.svg")`

</base-alert>

Jika Anda mereferensikan gambar itu di `pages/index.vue` maka:

```html{}[pages/index.vue]
<template>
  <img src="~/assets/gambar.png" />
</template>
```

Ini akan dikompilasi menjadi:

```js
createElement('img', { attrs: { src: require('~/assets/gambar.png') } })
```

Karena `.png` bukan file JavaScript, Nuxt.js mengatur konfigurasi webpack agar menggunakan [file-loader](https://github.com/webpack/file-loader) dan [url-loader](https://github.com/webpack/url-loader) sebagai pemuat untuk Anda.

Manfaat dari pemuat-pemuat ini adalah:

`file-loader` memungkinkan Anda menentukan tempat untuk menyalin dan menempatkan berkas aset, dan cara menamainya menggunakan _version hashes_ untuk penyimpanan tembolok _(cache)_ yang lebih baik. Dalam mode produksi, Anda akan mendapatkan keuntungan dari tembolok jangka panjang sebagai setelan standar!

`url-loader` memungkinkan Anda untuk menyisipkan berkas secara _inline_ sebagai URL data _base-64_ dengan syarat jika lebih kecil dari ambang batas yang ditentukan. Ini dapat mengurangi jumlah permintaan HTTP untuk berkas yang sepele. Jika berkas lebih besar dari ambang batas, maka secara otomatis akan kembali ke file-loader.

Untuk kedua pemuat ini, setelan standarnya adalah:

```js
// https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L297-L316
;[
  {
    test: /\.(png|jpe?g|gif|svg|webp)$/,
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

Artinya, setiap berkas di bawah 1 KB akan disisipkan sebagai URL data _base-64_. Jika tidak, gambar/fon akan disalin di _folder_ yang sesuai (di dalam direktori `.nuxt`) dengan nama yang berisi hash versi untuk penyimpanan tembolok yang lebih baik.

Saat meluncurkan aplikasi Anda dengan `nuxt`, templat Anda di `pages/index.vue`:

```html{}[pages/index.vue]
<template>
  <img src="@/assets/gambar_anda.png" />
</template>
```

Akan diubah menjadi:

```html
<img src="/_nuxt/img/gambar_anda.0c61159.png" />
```

Jika Anda ingin mengubah konfigurasi pada pemuat tersebut, gunakan [build.extend](/docs/2.x/configuration-glossary/configuration-build#extend).

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

## Alias

Pada setelan standar, direktori sumber (srcDir) dan direktori _root_ (rootDir) adalah sama. Anda dapat menggunakan alias `~` untuk direktori sumber. Daripada menulis jalur relatif seperti `../assets/gambar_anda.png`, Anda bisa menggunakan` ~/assets/gambar_anda.png`.

Keduanya akan mencapai hasil yang sama.

```html{}[components/Avatar.vue]
<template>
  <div>
    <img src="../assets/gambar_anda.png" />
    <img src="~/assets/gambar_anda.png" />
  </div>
</template>
```

Direkomendasikan untuk penggunaan `~` sebagai alias. `@` masih didukung tetapi tidak akan berfungsi di semua kasus seperti dengan gambar latar belakang di css Anda.

Anda dapat menggunakan alias `~~` atau `@@` untuk direktori _root_.

<base-alert type="info">

Tip: Pada papan ketik Spanyol, Anda dapat mengakses `~` dengan (`Option` +` ñ`) di Mac OS

</base-alert>

<quiz :questions="questions"></quiz>
