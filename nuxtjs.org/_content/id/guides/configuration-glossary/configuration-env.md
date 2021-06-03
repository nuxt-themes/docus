---
title: 'Properti env'
description: Berbagi variabel lingkungan antara klien dan peladen.
menu: env
category: configuration-glossary
position: 8
---

- Tipe: `Object`

> Nuxt.js memungkinkan kamu membuat variabel lingkungan sisi klien, juga untuk dibagikan dari sisi peladen.

Properti env mendefinisikan variabel lingkungan yang harus tersedia di sisi klien. Properti ini dapat ditugaskan menggunakan variabel lingkungan sisi peladen, [modul dotenv](https://github.com/nuxt-community/dotenv-module) atau yang serupa.

**Pastikan untuk membaca tentang `process.env` dan `process.env == {}` di bawah untuk pemecahan masalah yang lebih baik.**

```js{}[nuxt.config.js]
export default {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

Ini memungkinkan kamu membuat properti `baseUrl` yang akan sama dengan variabel lingkungan sisi peladen `BASE_URL` jika ada atau telah ditentukan. Jika tidak, `baseUrl` di sisi klien akan sama dengan `'http://localhost:3000'`. Oleh karena itu, variabel sisi peladen BASE_URL disalin ke sisi klien melalui properti `env` di `nuxt.config.js`. Atau, nilai lain yang ditentukan (http://localhost:3000).

Kemudian, kamu dapat mengakses variabel `baseUrl` dengan 2 cara:

1. Melalui `process.env.baseUrl`.
2. Melalui `context.env.baseUrl`, lihat [API konteks](/docs/2.x/internals-glossary/context).

Kamu dapat menggunakan properti `env` misalnya untuk memberikan token publik.

Untuk contoh di atas, kita dapat menggunakannya untuk mengkonfigurasi [axios](https://github.com/mzabriskie/axios).

```js{}[plugins/axios.js]
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

Kemudian, di laman kamu, kamu dapat mengimpor axios seperti berikut: `import axios from '~/plugins/axios'`

## Injeksi otomatis variabel lingkungan

Jika kamu menentukan variabel lingkungan yang dimulai dengan `NUXT_ENV_` dalam fase _build_ (misalnya, `NUXT_ENV_COOL_WORD=freezing nuxt build`), variabel tersebut akan otomatis dimasukkan ke dalam lingkungan proses. Ketahuilah bahwa variabel tersebut berpotensi didahulukan daripada variabel yang ditentukan di `nuxt.config.js` dengan nama yang sama.

## process.env == {}

Perhatikan bahwa Nuxt menggunakan `definePlugin` _webpack_ untuk mendefinisikan variabel lingkungan. Ini berarti bahwa `process` atau `process.env` yang aktual dari Node.js, itu tidak tersedia atau ditentukan. Setiap properti `env` yang ditentukan di nuxt.config.js secara individual dipetakan ke `process.env.xxxx` dan diubah selama kompilasi.

Artinya, `console.log(process.env)` akan memberi keluaran `{}` tetapi `console.log(process.env.your_var)` akan tetap memberikan keluaran nilai kamu. Ketika _webpack_ mengkompilasi kode kamu, itu menggantikan semua _instance_ `process.env.your_var` dengan nilai yang kamu telah setel, misalnya: `env.test = 'testing123'`. Jika kamu menggunakan `process.env.test` dalam kode di suatu tempat, ini sebenarnya diterjemahkan ke 'testing123'.

sebelum

```js
if (process.env.test == 'testing123')
```

setelah

```js
if ('testing123' == 'testing123')
```

## serverMiddleware

Karena [serverMiddleware](/docs/2.x/configuration-glossary/configuration-servermiddleware) dipisahkan dari _build_ Nuxt utama, variabel `env` yang ditentukan di `nuxt.config.js` tidak tersedia di sana.
