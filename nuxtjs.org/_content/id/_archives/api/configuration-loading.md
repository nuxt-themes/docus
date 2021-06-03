---
title: 'API: Properti loading'
description: Nuxt.js menggunakan komponennya sendiri untuk menunjukkan progress bar di antara rute. Anda dapat menyesuaikannya (kostumisasi), menonaktifkannya atau membuat komponen Anda sendiri.
menu: loading
category: configuration
position: 115
---

# Properti loading

- Type: `Boolean` or `Object` or `String`

> Nuxt.js menggunakan komponennya sendiri untuk menunjukkan progress bar di antara rute. Anda dapat menyesuaikannya (kostumisasi), menonaktifkannya atau membuat komponen Anda sendiri.

## Menonaktifkan Progress Bar

- Type: `Boolean`

Jika Anda tidak ingin menampilkan progress bar, cukup tambahkan `loading: false` di dalam file `nuxt.config.js`:

```js
module.exports = {
  loading: false
}
```

## Kostumisasi Progress Bar

- Type: `Object`

Daftar properti untuk mengkostumisasi progress bar.

| Key           | Tipe    | Default   | Keterangan                                                                                                                    |
| ------------- | ------- | --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `color`       | String  | `'black'` | Warna CSS dari progress bar                                                                                                   |
| `failedColor` | String  | `'red'`   | Warna CSS dari progress bar saat terjadi error ketika me-render rute (misalnya jika `data` atau `fetch` mengembalikan error). |
| `height`      | String  | `'2px'`   | Ketinggian progress bar (digunakan pada properti `style` progress bar)                                                        |
| `duration`    | Number  | `5000`    | Dalam ms (miliseconds), durasi maksimum progress bar, Nuxt.js mengasumsikan bahwa rute akan di-render sebelum 5 detik.        |
| `rtl`         | Boolean | `false`   | Atur arah progress bar dari kanan ke kiri.                                                                                    |

Untuk progress bar warna biru dengan tinggi 5px, kita bisa memperbarui `nuxt.config.js` menjadi seperti berikut:

```js
module.exports = {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

## Komponen Custom Loading

- Type: `String`

Anda dapat membuat komponen Anda sendiri, yang mana Nuxt.js akan memanggilnya sebagai pengganti komponen defaultnya. Untuk melakukannya, Anda perlu memberikan (path) di komponen Anda pada opsi `loading`. Kemudian, komponen Anda akan dipanggil langsung oleh Nuxt.js.

**Komponen Anda harus mengekspos beberapa metode berikut:**

| Method          | Required   | Keterangan                                                                                                 |
| --------------- | ---------- | ---------------------------------------------------------------------------------------------------------- |
| `start()`       | Required   | Dipanggil ketika sebuah route berpindah, di sini di mana Anda menampilkan komponen Anda.                   |
| `finish()`      | Required   | Dipanggil ketika rute dimuat (dan data diambil (fetch)), di sini tempat Anda menyembunyikan komponen Anda. |
| `fail(error)`   | _Optional_ | Dipanggil ketika route tidak dapat dimuat (misalnya ketika gagal untuk mengambil data).                    |
| `increase(num)` | _Optional_ | Dipanggil pada saat memuat komponen route, `num` adalah Integer                                            |

Kita dapat membuat komponen kustom pada `components/loading.vue` :

```html
<template lang="html">
  <div class="loading-page" v-if="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
  }
</style>
```

Kemudian, kita perbarui `nuxt.config.js` untuk memberitahukan Nuxt.js supaya menggunakan komponen kita:

```js
module.exports = {
  loading: '~/components/loading.vue'
}
```
