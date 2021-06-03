---
title: 'API: Properti loading indicator'
description: Tampilkan loading indicator pada saat halaman SPA dimuat!
menu: loadingIndicator
category: configuration
position: 116
---

# Properti loadingIndicator

> Memunculkan loading indicator ketika halaman SPA dimuat!

Saat menjalankan nuxt.js dalam mode SPA, tidak ada konten dari server side pada saat halaman pertama dimuat, Jadi, selama proses menampilkan halaman kosong dimuat, kita bisa menampilkan spiner.

Properti ini bisa memiliki 3 tipe yang berbeda: `string` atau `false` atau `object`. Jika nilai string telah ditetapkan, itu akan diubah menjadi objek style.

Nilai defaultnya adalah:

```js
{
  name: 'circle',
  color: '#3B8070',
  background: 'white'
}
```

## Indikator Built-in

Indikator ini di-porting dari proyek [Spinkit](http://tobiasahlin.com/spinkit) yang awesome. Anda bisa menggunakan halaman demo untuk melihatnya.

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

Indikator built-in mendukung opsi `color` dan `background` .

## Indikator custom

Jika Anda memerlukan indikator milik Anda sendiri, nilai String atau Name key juga bisa menjadikannya sebagai path pada templat html dari kode sumber (source code) indikator! Semua pengaturan juga melewati templat.

[Kode sumber](https://github.com/nuxt/nuxt.js/tree/dev/packages/vue-app/template/views/loading) Nuxt Built-ins juga tersedia jika Anda memerlukan base!
