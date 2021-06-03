---
title: Pemuat
description: Hal yang di luar kotak, Nuxt.js memberikan Anda proses pemuat komponen sendiri yang ditampilkan diantara rute. Anda dapat melakukan kustomisasi, menonaktifkan atau bahkan membuat proses pemuat milik Anda sendiri.
position: 8
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/08_loading?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Untuk membuat proses pemuat Nuxt.js bekerja, apa yang Anda perlu lakukan?
    answers:
      - Tidak ada, itu langsung bekerja
      - Mengatur proses pemuat menjadi true pada nuxt.config.js
      - Membuat komponen pemuat
    correctAnswer: Tidak ada, itu langsung bekerja
  - question: Dimana Anda dapat melakukan modifikasi gaya untuk proses pemuat bawaan?
    answers:
      - komponen layout
      - komponen page
      - nuxt.config.js
    correctAnswer: komponen layout
  - question: Pada properti mana anda dapat mengatur gaya untuk proses pemuat di nuxt.config.js?
    answers:
      - progress
      - loading
      - loadingBar
    correctAnswer: loading
  - question: Apa yang Anda tambahkan pada nuxt.config.js untuk menonaktifkan pemuat?
    answers:
      - 'loadingBar: false'
      - "loading: 'none'"
      - 'loading: false'
    correctAnswer: 'loading: false'
  - question: Anda dapat menonaktifkan pemuat pada halaman tertentu?
    answers:
      - true
      - false
    correctAnswer: true
  - question: Apa yang Anda gunakan untuk memulai batang pemuat secara terprogram?
    answers:
      - $nuxt.loading.start()
      - $nuxt.loading()
      - $loading.start()
    correctAnswer: $nuxt.loading.start()
  - question: Bagian properti mana yang Anda gunakan untuk membuat batang proses secara terus-menerus ketika pemuat mengambil waktu yang lama dari yang diprediksi?
    answers:
      - "duration: 'continuous'"
      - "loading: 'continuous'"
      - 'continuous: true'
    correctAnswer: 'continuous: true'
  - question: Mana dua metode yang dibutuhkan ketika membuat komponen pemuat secara kustom?
    answers:
      - start() dan fail()
      - start() dan finish()
      - loading() dan finish()
    correctAnswer: start() dan finish()
  - question: Ketika Anda telah membuat komponen loading.vue, bagaimana Anda menggunakan itu?
    answers:
      - diimpor ke halaman layout
      - menambahkan di nuxt.config.js dibawah properti pemuat
      - menambahkan di nuxt.config.js dibawah properti _plugins_
    correctAnswer: menambahkan di nuxt.config.js dibawah properti pemuat
  - question: Untuk menambahkan pemuat lingkaran berputar ketika Nuxt.js di metode SPA, apa yang Anda tambahkan ke properti pemuat?
    answers:
      - 'circle: true'
      - 'spinner: circle'
      - 'name: circle'
    correctAnswer: 'name: circle'
---

Hal yang di luar kotak, Nuxt.js memberikan Anda proses pemuat komponen sendiri yang ditampilkan diantara rute. Anda dapat melakukan kustomisasi, menonaktifkan atau bahkan membuat proses pemuat milik Anda sendiri.

## Melakukan kustomisasi batang proses

Diantara properti lainnya, warna, ukuran, durasi, dan arah dari batang proses dapat dikustomisasi untuk menyesuaikan aplikasi Anda. Ini dilakukan dengan melakukan update properti `loading` dari `nuxt.config.js` sesuai dengan properti,

Contohnya, untuk mengatur sebuah batang proses berwarna biru dengan tinggi 5px, kita perbarui `nuxt.config.js` seperti berikut ini:

```js
export default {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

Daftar properti untuk melakukan kustomisasi batang proses.

| Key         | Tipe    | Nilai anggapan | Deskripsi                                                                                                                   |     |
| ----------- | ------- | -------------- | --------------------------------------------------------------------------------------------------------------------------- | --- |
| color       | String  | 'black'        | Warna CSS untuk batang proses                                                                                               |     |
| failedColor | String  | 'red'          | Warna CSS dari batang proses ketika terjadi sebuah kegalatan ketika me-_render_ (jika data atau `fetch` mengirimkan error). |     |
| height      | String  | '2px'          | Tinggi dari batang proses (digunakan pada properti gaya dari batang proses).                                                |     |
| throttle    | Number  | 200            | Dalam milidetik, tunggu pada waktu tertentu untuk menampilkan batang proses. Berguna untuk mencegah batang dari _flashing_. |     |
| duration    | Number  | 5000           | Dalam milidetik, durasi maksimal dari batang proses, Nuxt.js mengasumsikan bahwa rute akan di-_render_ sebelum 5 detik.     |     |
| continuous  | Boolean | false          | Tetap menjalankan animasi batang proses ketika memuat lebih lama dari yang diharapkan.                                      |     |
| css         | Boolean | true           | Atur ke `false` untuk menghapus gaya dari batang proses bawaan (dan tambahkan milik Anda sendiri).                          |     |
| rtl         | Boolean | false          | Atur arah dari batang proses dari kanan ke kiri.                                                                            |     |

## Menonaktifkan Batang Proses

Jika Anda tidak ingin menampilkan batang proses diantara rute, tambahkan `loading: false` di nuxt.config.js:

```js{}[nuxt.config.js]
export default {
  loading: false
}
```

Properti pemuat memberikan Anda opsi untuk menonaktifkan batang proses bawaan pada halaman tertentu.

```html{}[pages/index.vue]
<template>
  <h1>My page</h1>
</template>

<script>
  export default {
    loading: false
  }
</script>
```

## Memulai batang proses secara terprogram

Batang pemuat juga dapat secara terprogram dimulai di komponen dengan memanggil `this.$nuxt.$loading.start()` untuk memulainya dan `this.$nuxt.$loading.finish()` untuk menyelesaikannya.

Selama proses _mounting_ pada halaman komponen, properti `$loading` tidak tersedia secara langsung untuk diakses. Solusinya, jika Anda ingin memulai pemuat pada metode `mounted`, pastikan untuk membungkus `$loading` di dalam `this.$nextTick` seperti dibawah ini.

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

## Bagian internal dari batang proses

Sayangnya tidak memungkinkan bagi komponen pemuat untuk mengetahui seberapa lama halaman akan memuat (kontennya). Untuk itu, hal ini tidak memungkinkan untuk secara akurat memberikan animasi pada batang proses menuju ke 100% ketika loading.

Komponen pemuat Nuxt.js secara parsial menyelesaikan masalah ini dengan mengizinkan Anda mengatur `duration`, ini bisa diatur berdasarkan perkiraan waktu halaman dimuat. Kecuali Anda menggunakan komponen pemuat kustom, batang proses ini akan selalu bergerak dari 0% sampai 100% dalam `duration` yang telah diatur. Ketika pemuat mengambil waktu lebih lama ketika memuat lebih dari waktu `duration`, batang proses akan tetap pada 100% sampai halaman selesai termuat.

Anda dapat mengubah sikap bawaan dengan mengatur `continuous` ke `true`, kemudian setelah menyentuh 100%, batang proses akan mulai bergerah ke 0% lagi pada waktu `duration` yang telah diatur. Ketika pemuat belum selesai setelah menyentuh 0%, ini akan mulai bergerak dari 0% ke 100% lagi, ini akan terulang sampai memuat selesai.

```js
export default {
  loading: {
    continuous: true
  }
}
```

_Contoh dari batang proses secara berkelanjutan:_

![https://nuxtjs.org/api-continuous-loading.gif](https://nuxtjs.org/api-continuous-loading.gif)

## Menggunakan komponen pemuat kustom

Anda juga dapat membuat komponen kustom Anda sendiri yang akan dipanggil dari pada batang pemuat bawaan Nuxt.js. Untuk melakukan hal ini, Anda perlu memberikan jalan ke komponen Anda di opsi `loading`. Kemudian, komponen Anda akan dipanggil secara langsung oleh Nuxt.js.

Komponen Anda harus membuka beberapa metode ini:

| Metode        | Diperlukan | Deskripsi                                                                                      |
| ------------- | ---------- | ---------------------------------------------------------------------------------------------- |
| start()       | Diperlukan | Dipanggil ketika rute berganti, ini berada dimana Anda menampilkan komponen                    |
| finish()      | Diperlukan | Dipanggil ketika rute dimuat dan data diambil, ini berada dimana Anda menyembunyikan komponen. |
| fail(error)   | Opsional   | Dipanggil ketika rute tidak bisa dimuat dan data gagal diambil.                                |
| increase(num) | Opsional   | Dipanggil ketika memuat komponen rute, _num_ adalah _Integer_ < 100.                           |

Anda dapat membuat komponen kustom di `components/LoadingBar.vue`:

```html{}[components/LoadingBar.vue]
<template>
  <div v-if="loading" class="loading-page">
    <p>Memuat...</p>
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

Lalu, Anda memperbarui `nuxt.config.js` unutk memberitahu Nuxt.js untuk menggunakan komponen Anda:

```js{}[nuxt.config.js]
export default {
  loading: '~/components/LoadingBar.vue'
}
```

## Properti indikator pemuat

Ketika menjalankan Nuxt.js pada mode SPA, tidak ada konten dari _server_ pada pertama kali halaman dimuat. Jadi, daripada menampilkan halaman kosong ketika halaman dimuat, Nuxt.js memberikan Anda pemutar (_spinner_) yang dapat Anda kustom unutk menambahkan warna atau latar belakang dan bahkan mengganti indikator.

```js{}[nuxt.config.js]
export default {
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  }
}
```

## Indikator bawaan

Indikator ini diimpor dari projek [Spinkit](http://tobiasahlin.com/spinkit). Anda dapat mengecek halaman contoh untuk melihat pemutarnya (_spinner_). Unutk dapat menggunakan satu dari pemutar itu, Anda perlu melakukan penambahan nama pemutar ke nama properti. Tidak perlu melakukan impor atau memasang apapun. Ini daftar indikator bawaan yang bisa digunakan.

- _circle_
- _cube-grid_
- _fading-circle_
- _folding-cube_
- _chasing-dots_
- _nuxt_
- _pulse_
- _rectangle-bounce_
- _rotating-plane_
- _three-bounce_
- _wandering-cubes_

Indikator bawaan mendukung opsi `color` dan `background`.

## Indikator kustom

Jika Anda perlu indikator spesial Anda sendiri, sebuah nilai untaian atau nama kunci juga menjadi jalur ke _template_ HTML dari kode sumber dari indikator. Semua opsi yang ada juga dikirim ke _template_.

[Kode sumber](https://github.com/nuxt/nuxt.js/tree/dev/packages/vue-app/template/views/loading) bawaan Nuxt.js juga tersedia jika Anda membutuhkannya.

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
