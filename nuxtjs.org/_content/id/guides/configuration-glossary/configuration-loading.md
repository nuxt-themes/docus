---
title: 'Properti loading'
description: Nuxt.js menggunakan sebuah komponen bawaan untuk menampilkan bar proses saat perpindahan rute. Anda dapat memodifikasinya, menonaktifkannya, ataupun menggantinya dengan komponen buatan Anda sendiri.
menu: loading
category: configuration-glossary
position: 15
---

- Tipe: `Boolean` atau `Object` atau `String`

> Nuxt.js menggunakan sebuah komponen bawaan untuk menampilkan bar proses saat perpindahan rute. Anda dapat memodifikasinya, menonaktifkannya, ataupun menggantinya dengan komponen buatan Anda sendiri.

```javascript
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

## Menonaktifkan Bar Proses

- Tipe: `Boolean`

```js{}[nuxt.config.js]
export default {
  loading: false
}
```

## Memodifikasi Bar Proses

- Tipe: `Object`

```js
export default {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

Daftar properti yang dapat diubah nilainya untuk memodifikasi bar proses bawaan Nuxt.js.
| Key | Tipe | Nilai Bawaan | Deskripsi |
| ------------- | ------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `color` | String | `'black'` | Warna bar proses (dalam format warna CSS) |
| `failedColor` | String | `'red'` | Warna bar proses jika terjadi error saat me-_render_ suatu halaman (misal jika terjadi error di dalam fungsi `data` ataupun `fetch`). |
| `height` | String | `'2px'` | Tinggi bar proses (digunakan dalam properti `style` bar proses). |
| `throttle` | Number | `200` | Tunggu sekian milidetik sebelum menampilkan bar proses. Berguna untuk mencegah bar berkedip. |
| `duration` | Number | `5000` | Durasi maksimum penampilan bar proses dalam milidetik, Nuxt.js mengasumsikan rute Anda dapat di-_render_ tidak lebih dari 5 detik. |
| `continuous` | Boolean | `false` | Terus animasikan bar proses jika proses memuat berlangsung lebih lama dari nilai yang terdapat di properti `duraton`. |
| `css` | Boolean | `true` | Ubah menjadi _false_ untuk menghapus semua _style_ bawaan bar proses (Anda juga dapat menambahkan _style_ Anda sendiri). |
| `rtl` | Boolean | `false` | Untuk mengubah arah bar proses menjadi dari kanan ke kiri. |

## Menggunakan Komponen _Loading_ Buatan Anda Sendiri

- Tipe: `String`

**Komponen Anda harus mengekspos beberapa _method_ berikut:**

| Method          | Harus ada | Deskripsi                                                                                                                                                 |
| --------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start()`       | Harus ada | Dieksekusi saat halaman berganti, di dalam _method_ ini Anda dapat menuliskan kode untuk menampilkan komponen Anda                                        |
| `finish()`      | Harus ada | Dieksekusi saat halaman sudah termuat (dan data sudah selesai ditarik), di dalam _method_ Anda ini dapat menulis kode untuk menyembunyikan komponen Anda. |
| `fail(error)`   | Opsional  | Dieksekusi saat halaman tidak dapat dimuat (misal terdapat galat saat proses penarikan data)                                                              |
| `increase(num)` | Opsional  | Dieksekusi saat sedang memuat komponen halaman, `num` adalah bilangan bulat kurang dari 100.                                                              |

```html{}[components/loading.vue]
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

```js{}[nuxt.config.js]
export default {
  loading: '~/components/loading.vue'
}
```
