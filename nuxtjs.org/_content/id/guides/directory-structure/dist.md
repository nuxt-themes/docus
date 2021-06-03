---
title: dist
description: Direktori `dist`, merupakan kependekan dari direktori distribusi (_distribution_). Direktori tersebut secara dinamis dihasilkan ketika perintah `nuxt generate` dijalankan dan berisikan berkas-berkas HTML dan aset yang sudah siap produksi. Berkas-berkas ini sangat dibutuhkan untuk proses penggelaran (_deployment_) dan menjalankan aplikasi Nuxt.js secara statis.
position: 5
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/05_dist?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Perintah apa yang dapat dijalankan untuk menghasilkan dist _folder_?
    answers:
      - nuxt build
      - nuxt start
      - nuxt generate
    correctAnswer: nuxt generate
  - question: Ini merupakan direktori yang Anda butuhkan untuk mengunggah ke hosting statis Anda
    answers:
      - true
      - false
    correctAnswer: true
  - question: Properti apa yang dapat Anda gunakan untuk mengganti nama dari direktori dist?
    answers:
      - dist
      - dir
      - buildDir
    correctAnswer: dir
  - question: Properti apa yang Anda dapat gunakan agar halaman-halaman yang dihasilkan secara otomatis tidak berada dalam direktori?
    answers:
      - 'folders: false'
      - 'subFolders: false'
      - 'pages: true'
    correctAnswer: 'subFolders: false'
  - question: Nilai anggapan dari Nuxt.js ketika properti _fallback_ tidak ditetapkan?
    answers:
      - "'200.html'"
      - "'404.html'"
      - 'false'
    correctAnswer: "'200.html'"
  - question: Ketika bekerja dengan halaman-halaman statis, berkas mana yang direkomendasikan untuk menjadi halaman error?
    answers:
      - "'200.html'"
      - "'404.html'"
      - false
    correctAnswer: "'404.html'"
  - question: Properti apa yang dapat Anda gunakan untuk mengecualikan berkas agar berkas tersebut tidak dihasilkan menjadi halaman statis?
    answers:
      - ignore
      - exclude
      - fallback
    correctAnswer: exclude
---

Direktori `dist`, merupakan kependekan dari direktori distribusi (_distribution_). Direktori tersebut secara dinamis dihasilkan ketika perintah `nuxt generate` dijalankan dan berisikan berkas-berkas HTML dan aset yang sudah siap produksi. Berkas-berkas ini sangat dibutuhkan untuk proses penggelaran (_deployment_) dan menjalankan aplikasi Nuxt.js secara statis.

### Penggelaran (_Deploying_)

Ini merupakan direktori yang dibutuhkan **untuk mengunggah ke _hosting_ statis** karena direktori ini berisikan berkas-berkas HTML dan aset-aset yang sudah siap produksi.

<base-alert>

Direktori `dist` seharusnya tidak disertakan dalam sistem pengontrolan versi (_git_) dan harus diabaikan dalam berkas `.gitignore` karena direktori tersebut akan dihasilkan secara otomatis setiap kali `nuxt generate` dijalankan.

</base-alert>

### Properti direktori

Direktori dist dinamakan dist secara otomatis tetapi dapat dikonfigurasi melalui berkas nuxt.config Anda.

```js{}[nuxt.config.js]
generate: {
  dir: 'site-saya'
}
```

<base-alert>

Jika Anda mengganti nama dari direktori dist Anda, maka Anda harus menambahkan nama direktori tersebut ke dalam sistem pengontrolan versi (_git_) Anda, sehingga git dapat mengabaikan direktori tersebut.

</base-alert>

### Properti subDirektori

Nuxt.js menaruh semua berkas halaman Anda yang dibuat secara otomatis ke dalam direktori, namun Anda dapat mengubah ini jika Anda mau, dengan cara, mengubah berkas nuxt.config dan menuliskan properti subFolders menjadi _false_.

```js{}[nuxt.config.js]
generate: {
  subFolders: false
}
```

### Properti _fallback_

Ketika menggelar (_deploying_) situs Anda, Anda harus memastikan jalur html _fallback_ ditetapkan dengan benar. Jalur _fallback_ harus ditetapkan sebagai halaman _error_, sehingga halaman yang tidak diketahui dapat di-_render_ melalui Nuxt. Jika tidak ditetapkan maka Nuxt.js akan menggunakan nilai anggapan yang merupakan 200.html.

Ketika menjalankan aplikasi _Single-Page_, memang masuk akal menggunakan 200.html karena itu merupakan satu-satunya berkas yang dibutuhkan, tidak ada halaman lain yang dihasilkan.

Ketika bekerja dengan halaman yang dihasilkan secara statis maka direkomendasikan untuk menggunakan 404.html sebagai halaman _error_.

<base-alert>

Tergantung dimana Anda menggelar situs Anda, Anda mungkin membutuhkan halaman 200.html atau 404.html. Mohon memeriksa _provider hosting_ Anda. Sebagai contoh, Netlify menggunakan 404.html.

</base-alert>

```js{}[nuxt.config.js]
export default {
  generate: {
    fallback: '404.html'
  }
}
```

### Properti pengecualian (_excludes_)

Anda dapat mengecualikan halaman agar tidak dihasilkan secara otomatis dengan menggunakan properti _generate excludes_. Sebagai gantinya, halaman yang tidak dihasilkan menjadi halaman statis akan menjadi aplikasi _Single-Page_ dan hanya akan di-_render_ pada sisi klien (_client side_).

```js{}[nuxt.config.js]
generate: {
  exclude: [/admin/]
}
```

<base-alert type="info">

Anda juga dapat menggunakan _regex expression_ disini untuk mengecualikan halaman-halaman yang dari atau berakhir dengan kata tertentu.

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
