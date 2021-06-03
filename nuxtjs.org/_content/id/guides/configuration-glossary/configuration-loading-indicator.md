---
title: 'Properti loadingIndicator'
description: Tampilkan indikator loading saat halaman sedang dimuat.
menu: loadingIndicator
category: configuration-glossary
position: 16
---

> Tampilkan indikator _loading_ saat halaman sedang dimuat.

Tanpa _server-side rendering_ (ketika properti `ssr` bernilai `false`), tidak ada konten dari sisi peladen (_server_) yang perlu diambil ketika halaman pertama kali dimuat. Alih-alih menampilkan halaman kosong, kita bisa menampilkan _spinner_.

Properti ini dapat berupa 3 tipe data: `string` atau `false` atau `object`. Jika berupa _string_, akan diubah menjadi format objek seperti berikut dengan nilai yang Anda tuliskan diletakkan sebagai nilai sub-properti `name`.

Nilai bawaannya adalah:

```js
loadingIndicator: {
  name: 'circle',
  color: '#3B8070',
  background: 'white'
}
```

## Komponen Indikator Bawaan Nuxt.js

Komponen-komponen indikator ini diimpor dari proyek [SpinKit](http://tobiasahlin.com/spinkit). Anda dapat mengunjungi halaman demonya untuk meninjau _spinner-spinner_ ini.

- circle
- cube-grid
- fading-circle
- folding-cube
- chasing-dots
- nuxt
- pulse
- rectangle-bounce
- rotating-plane
- three-bounce
- wandering-cubes

Anda dapat memodifikasi properti `color` dan `background` dari komponen-komponen indikator bawaan tersebut.

## Gunakan Komponen Indikator Buatan Anda Sendiri

Jika Anda perlu membuat komponen indikator Anda sendiri, Anda dapat mengisi nilai properti `loadingIndicator` dengan _string_ yang berisi _path_ ke _template_ HTML komponen indikator buatan Anda. Sub-properti lainnya di dalam properti `loadingIndicator` juga akan diteruskan ke _template_ buatan Anda.

Jika Anda membutuhkan komponen dasar, Anda dapat melihat [kode sumber](https://github.com/nuxt/nuxt.js/tree/dev/packages/vue-app/template/views/loading) komponen-komponen indikator bawaan Nuxt.js
