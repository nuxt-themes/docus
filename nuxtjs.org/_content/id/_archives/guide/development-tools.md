---
title: Alat Pengembangan (Development Tools)
description: Nuxt.js membantu Anda membuat pengembangan web menjadi menyenangkan.
category: getting-started
position: 114
---

> Menguji aplikasi Anda adalah bagian dari pengembangan web. Nuxt.js membantu Anda membuatnya semudah mungkin.

## Pengujian Ujung-ke-Ujung (End-to-End)

[AVA](https://github.com/avajs/ava) adalah kerangka (framework) pengujian JavaScript yang hebat, dicampur dengan [jsdom](https://github.com/tmpvar/jsdom), kita dapat menggunakannya untuk melakukan pengujian dari ujung ke ujung dengan mudah.

Pertama, kita perlu menambahkan AVA dan jsdom sebagai dependensi pembangunan:

```bash
npm install --save-dev ava jsdom
```

Kemudian tambahkan skrip uji ke `package.json` kita dan konfigurasikan AVA untuk mengkompilasi file yang kita impor ke dalam pengujian kita.

```javascript
"scripts": {
  "test": "ava",
},
"ava": {
  "require": [
    "babel-register"
  ]
},
"babel": {
  "presets": [
    "es2015"
  ]
}
```

Kita akan menulis tes kita di folder `test` :

```bash
mkdir test
```

Katakanlah kita memiliki halaman di `pages/index.vue`:

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
  export default {
    data() {
      return { name: 'world' }
    }
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

Saat kita meluncurkan aplikasi kita dengan `npm run dev` dan buka http: // localhost: 3000, kita bisa melihat judul `Hello world!` berwarna merah.

Kita tambahkan file test `test/index.test.js`:

```js
import { resolve } from 'path'
import test from 'ava'
import { Nuxt, Builder } from 'nuxt'

// Kita tetap mengacu kepada Nuxt agar kita bisa
// menutup server pada akhir tes
let nuxt = null

// Init Nuxt.js dan mulai `listening` pada localhost:4000
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try {
    config = require(resolve(rootDir, 'nuxt.config.js'))
  } catch (e) {}
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

// Contoh `testing` only generated html
test('Route / exits and render HTML', async t => {
  const context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('<h1 class="red">Hello world!</h1>'))
})

// Example of testing via DOM checking
test('Route / exits and render HTML with CSS applied', async t => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.red')
  t.not(element, null)
  t.is(element.textContent, 'Hello world!')
  t.is(element.className, 'red')
  t.is(window.getComputedStyle(element).color, 'red')
})

// Close the Nuxt server
test.after('Closing server', t => {
  nuxt.close()
})
```

Kita sekarang bisa meluncurkan tes kita:

```bash
npm test
```

jsdom memiliki beberapa keterbatasan karena tidak menggunakan browser. Namun, ini akan mencakup sebagian besar tes kita. Jika Anda ingin menggunakan browser untuk menguji aplikasi Anda, Anda mungkin ingin lihat [Nightwatch.js](http://nightwatchjs.org).

## ESLint && Prettier

> ESLint adalah alat yang hebat untuk menjaga kode Anda tetap bersih

> [Prettier](prettier.io) adalah pemformat kode yang sangat populer

Anda dapat menambahkan ESLint dengan mudah di Nuxt.js. Pertama, Anda perlu menambahkan dependensi npm:

```bash
npm install --save-dev babel-eslint eslint eslint-config-prettier eslint-loader eslint-plugin-vue eslint-plugin-prettier prettier
```

Kemudian, Anda dapat mengkonfigurasi ESLint melalui file `.eslintrc.js` di direktori proyek root Anda:

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // Pertimbangkan untuk menggunakan `plugin:vue/strongly-recommended` atau `plugin:vue/recommended` untuk memperketat aturan.
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  // diperlukan untuk melinting file *.vue
  plugins: ['vue'],
  // tambahkan aturan anda disini
  rules: {
    semi: [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', { semi: false }]
  }
}
```

Kemudian, Anda bisa menambahkan skrip `lint` dan`lintfix` di `package.json` anda:

```js
"scripts": {
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
  "lintfix": "eslint --fix --ext .js,.vue --ignore-path .gitignore ."
}
```

Anda sekarang bisa menggunakan `lint` hanya untuk memeriksa apakah ada kesalahan:

```bash
npm run lint
```

Atau `lintfix` untuk bisa memperbaikinya

```bash
npm run lintfix
```

ESLint akan membungkus setiap file JavaScript dan Vue Anda sambil mengabaikan file yang Anda abaikan yang didefinisikan di `.gitignore` anda.

<div class="Alert Alert--orange">

Salah satu praktik terbaik adalah menambahkan juga `"precommit": "npm run lint"` di package.json Anda untuk memeriksa kode Anda secara otomatis sebelum menyerahkan (commit) kode Anda.

</div>
