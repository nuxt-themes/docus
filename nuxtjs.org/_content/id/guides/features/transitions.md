---
title: Transisi
description: Nuxt.js menggunakan komponen `<transition>` untuk memungkinkan Anda membuat transisi/animasi antar rute yang menakjubkan.
position: 10
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/05_transitions?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Key apa yang perlu ditambahkan ke komponen page Anda untuk mendefinisikan transisi buatan sendiri untuk rute tertentu?
    answers:
      - pageTransition
      - transition
      - layoutTransition
    correctAnswer: transition
  - question: Apakah mode transisi bawaan Nuxt.js?
    answers:
      - in-out
      - out-in
      - none
    correctAnswer: out-in
  - question: Apakah nama kelas transisi bawaan untuk transisi antar halaman?
    answers:
      - .page
      - .pages
      - .page-transition
    correctAnswer: .page
  - question: Di manakah tempat terbaik untuk menambahkan CSS untuk kelas transisi Anda secara global untuk semua rute?
    answers:
      - index.vue
      - Berkas CSS global
      - layouts/default.vue
    correctAnswer: Berkas CSS global
  - question: Di array mana di dalam berkas nuxt.config.js Anda bisa menambahkan stylesheet global Anda?
    answers:
      - 'css: []'
      - 'styles: []'
      - 'transitions: []'
    correctAnswer: 'css: []'
  - question: Apa kelas CSS bawaan untuk transisi antar layout?
    answers:
      - layout
      - layout-transition
      - transition
    correctAnswer: layout
  - question: Di dalam berkas nuxt.config.js, properti apa yang Anda gunakan untuk menyetel pengaturan bawaan untuk transisi antar layout?
    answers:
      - layout
      - layoutTransition
      - layoutTransitions
    correctAnswer: layoutTransition
  - question: Jika Anda mengubah nama kelas transisi bawaan menjadi 'ini-layout', kelas apa yang Anda gunakan untuk membuat CSS transisi?
    answers:
      - layout
      - ini-layout
      - iniLayout
    correctAnswer: ini-layout
  - question: Di dalam berkas nuxt.config.js, properti apa yang Anda gunakan untuk menyetel pengaturan bawaan untuk transisi antar halaman?
    answers:
      - page
      - pageTransition
      - layoutTransition
    correctAnswer: pageTransition
  - question: Di mana Anda dapat memodifikasi pengaturan bawaan untuk transisi antar halaman?
    answers:
      - main.css
      - pages.vue
      - nuxt.config.js
    correctAnswer: nuxt.config.js
---

Nuxt.js menggunakan [komponen `transition`](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) untuk memungkinkan Anda membuat transisi/animasi antar rute yang menakjubkan.

Untuk mendefinisikan transisi buatan Anda sendiri untuk rute tertentu, tambahkan _key_ `transition` ke dalam komponen _page_ tersebut.

```js{}[pages/index.vue]
export default {
  // Bisa berupa string
  transition: ''
  // Atau berupa objek
  transition: {}
  // Atau berupa fungsi
  transition (to, from) {}
}
```

## String

Jika _key_ `transition` disetel sebagai _string_, nilainya akan digunakan sebagai nilai `transition.name`.

```js{}[pages/index.vue]
export default {
  transition: 'home'
}
```

Nuxt.js akan menggunakan pengaturan ini untuk menyetel komponen transisi sebagai berikut:

```html{}[pages/index.vue]
<transition name="home"></transition>
```

<base-alert>

Hal ini secara otomatis dilakukan untuk Anda dan Anda tidak perlu menambahkan komponen `<transition>` secara manual ke dalam komponen _page_ atau _layout_ Anda.

</base-alert>

Sekarang Anda hanya perlu membuat _styling_ baru untuk kelas transisi Anda.

```html{}[pages/index.vue]
<styles>
  .home-enter-active, .home-leave-active { transition: opacity .5s; }
  .home-enter, .home-leave-active { opacity: 0; }
</styles>
```

## Objek

Jika nilai key `transition` disetel sebagai objek:

```js{}[pages/index.vue]
export default {
  transition: {
    name: 'home',
    mode: 'out-in'
  }
}
```

Nuxt.js akan menggunakan pengaturan ini untuk menyetel komponen `transition` sebagai berikut:

```html{}[pages/index.vue]
<transition name="test" mode="out-in"></transition>
```

Objek `transition` dapat memiliki banyak properti seperti _name_, _mode_, css, _duration_, dan lain-lain. Lihat dokumentasi Vue untuk informasi lebih lanjut.

Anda juga dapat mendefinisikan _method_ di dalam properti `transition` antar _page_. Untuk informasi lebih lanjut tentang [pengait-pengait JavaScript](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks), kunjungi dokumentasi Vue.

```js
export default {
  transition: {
    afterLeave(el) {
      console.log('afterLeave', el)
    }
  }
}
```

### Mode Transisi

<base-alert>

Mode transisi antar halaman bawaan Nuxt.js berbeda dengan mode bawaan milik Vue. Dalam Nuxt.js, nilai bawaan mode `transition` adalah `out-in`. Jika Anda ingin menjalankan animasi saat masuk dan keluar transisi secara bersamaan, Anda harus menyetel modenya menjadi _string_ kosong: `mode: ''`.

</base-alert>

```js{}[pages/index.vue]
export default {
  transition: {
    name: 'home',
    mode: ''
  }
}
```

## Fungsi

Jika _key_ `transition` disetel sebagai fungsi:

```js{}[pages/index.vue]
export default {
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
```

Transisi yang akan diterapkan pada masing-masing navigasi:

- `/` ke `/posts` akan menerapkan `slide-left`
- `/posts` ke `/posts?page=3` akan menerapkan `slide-left`
- `/posts?page=3` ke `/posts?page=2` akan menerapkan `slide-right`.

## Pengaturan Global

Nama kelas transisi bawaan Nuxt.js adalah `"page"`. Untuk menambahkan transisi _fade_ untuk setiap halaman di aplikasi Anda, Anda hanya perlu menambahkan _style_-nya ke dalam sebuah berkas CSS yang tersedia secara global untuk semua rute Anda.

Misal, berkas global CSS kita adalah `assets/main.css`:

```css{}[assets/main.css]
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
```

Lalu kita hanya perlu menambahkan jalan (_path_) dari berkas tersebut ke dalam _array_ `css` di dalam berkas `nuxt.config.js` kita:

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/main.css']
}
```

## Pengaturan Lebih Lanjut

## Properti layoutTransition

`layoutTransition` digunakan untuk menyetel properti bawaan untuk transisi-transisi antar _layout_.

Pengaturan bawaan untuk transisi antar _layout_ adalah sebagai berikut:

```js
{
  name: 'layout',
  mode: 'out-in'
}
```

```js{}[assets/main.css]
.layout-enter-active, .layout-leave-active {
  transition: opacity .5s
}
.layout-enter, .layout-leave-active {
  opacity: 0
}
```

Jika Anda ingin mengubah pengaturan bawaan untuk transisi antar _layout_ tersebut, Anda bisa melakukannya melalui berkas `nuxt.config.js` Anda.

```js{}[nuxt.config.js]
export default {
  layoutTransition: 'layout-saya'
  // atau
  layoutTransition: {
    name: 'layout-saya',
    mode: 'out-in'
  }
}
```

Jika Anda sudah memodifikasi nama kelas transisi antar halaman tersebut, jangan lupa untuk mengubah nama kelasnya di berkas CSS yang bersangkutan.

```css{}[assets/main.css]
.layout-saya-enter-active,
.layout-saya-leave-active {
  transition: opacity 0.5s;
}
.layout-saya-enter,
.layout-saya-leave-active {
  opacity: 0;
}
```

## Properti pageTransition

Pengaturan bawaan untuk transisi antar halaman adalah:

```js
{
  name: 'page',
  mode: 'out-in'
}
```

Jika Anda ingin memodifikasinya, Anda bisa melakukannya melalui berkas `nuxt.config.js` Anda.

```js{}[nuxt.config.js]
export default {
  pageTransition: 'page-saya'
  // atau
  pageTransition: {
    name: 'page-saya',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Ini animasi sebelum masuk...');
    }
  }
}
```

Jika Anda sudah memodifikasi nama kelas transisi antar halaman tersebut, jangan lupa untuk mengubah nama kelasnya di berkas CSS yang bersangkutan.

```css{}[assets/main.css]
.page-saya-enter-active,
.page-saya-leave-active {
  transition: opacity 0.5s;
}
.page-saya-enter,
.page-saya-leave-to {
  opacity: 0;
}
```

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
