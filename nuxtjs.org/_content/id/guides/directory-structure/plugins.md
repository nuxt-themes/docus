---
title: plugins
description: Direktori `plugins` mengandung _plugins_ Javascript Anda yang ingin Anda jalankan sebelum memulai aplikasi Vue.js.
position: 11
category: directory-structure
csb_link_plugins_client: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/12_plugins_client?fontsize=14&hidenavigation=1&theme=dark
csb_link_plugins_external: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/12_plugins_external?fontsize=14&hidenavigation=1&theme=dark
csb_link_plugins_custom: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/12_plugins_custom_plugin?fontsize=14&hidenavigation=1&theme=dark
csb_link_plugins_vue: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/12_plugins_vue?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/plugins.svg
imgAlt: modules-servermiddleware-plugins-in-nuxt-js
questions:
  - question: Direktori `plugins` mengandung _plugins_ Javascript Anda yang Anda ingin jalankan
    answers:
      - sebelum memulai aplikasi Vue.js
      - ketika memulai aplikasi Vue.js
      - setelah memulai aplikasi Vue.js
    correctAnswer: sebelum memulai aplikasi Vue.js
  - question: __Hooks__ Vue.js _beforeCreate_ dan _created_ dipanggil pada
    answers:
      - hanya dari sisi _client_
      - hanya dari sisi _server_
      - dari keduanya, sisi _client_ dan sisi _server_
    correctAnswer: dari keduanya, sisi _client_ dan sisi _server_
  - question: Setiap kali Anda ingin menggunakan Vue.use(), Anda harus membuat berkas pada direktori apa?
    answers:
      - vue
      - plugins
      - vuePlugins
    correctAnswer: plugins
  - question: Dimanakah Anda menambahkan _plugin_ agar dapat diimpor ke dalam aplikasi utama Anda?
    answers:
      - pada halaman _layouts_
      - pada berkas nuxt.config.js
      - tidak dibutuhkan, secara otomatis diimpor
    correctAnswer: pada berkas nuxt.config.js
  - question: Beberapa _plugin_ hanya dapat bekerja pada _browser_?
    answers:
      - true
      - false
    correctAnswer: true
  - question: _Extension_ apa yang dapat Anda gunakan jika Anda ingin _plugin_ Anda hanya dijalankan pada _server_?
    answers:
      - .serverside.js
      - .ssr.js
      - .server.js
    correctAnswer: .server.js
  - question: 2 Mode yang Anda dapat gunakan untuk _plugins_ Anda.
    answers:
      - server dan client
      - ssr dan client
      - server-side dan client-side
    correctAnswer: server dan client
  - question: Apa yang Anda lakukan untuk membuat fungsi atau nilai-nilai tersedia pada seluruh aplikasi Anda?
    answers:
      - membuat _plugin_
      - menggunakan metode injeksi
      - membuat modul
    correctAnswer: menggunakan metode injeksi
  - question: Berdasarkan kesepakatan, apa yang harus Anda berikan pada awalan fungsi injeksi Anda
    answers:
      - $
      - _
      - ':'
    correctAnswer: $
  - question: Untuk mengubah urutan dari _plugins_ Anda, properti apa yang dapat Anda gunakan?
    answers:
      - orderPlugins
      - extendPlugins
      - plugins
    correctAnswer: extendPlugins
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

Direktori `plugins` mengandung _plugins_ Javascript Anda yang ingin Anda jalankan sebelum memulai aplikasi Vue.js. Lokasi ini merupakan tempat untuk menambahkan _plugins_ Vue dan untuk memasukkan fungsi-fungsi atau konstanta-konstanta (_constants_). Setiap kali Anda membutuhkan penggunaan `Vue.use()`, Anda harus membuat berkas dalam direktori `plugins/` dan menambahkan jalur ke `plugins` dalam `nuxt.config.js`.

## _External Packages_ (Paket-paket luar)

Anda mungkin ingin menggunakan paket/modul dari luar ke dalam aplikasi (salah satu contoh terbaik [axios](https://axios.nuxtjs.org/)) untuk membuat HTTP _requests_ untuk _server_ dan _client_.

Pertama-tama, _install_ paket (_package_) menggunakan npm atau Yarn.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @nuxtjs/axios
```

  </code-block>
  <code-block label="npm">

```bash
npm install @nuxtjs/axios
```

  </code-block>
</code-group>

Sebagai contoh, Anda dapat melakukan konfigurasi untuk axios _interceptors_ yang dapat bereaksi terhadap kemungkinan _error_ yang terjadi, dari panggil API Anda dalam aplikasi. Dalam contoh ini, kami melakukan pengalihan jalur (_redirect_) pada _user_ menuju halaman _custom error_ yang memberi informasi maaf, ketika kami mendapatkan _status error_ 500 dari API kami.

```js{}[plugins/axios.js]
export default function ({ $axios, redirect }) {
  $axios.onError(error => {
    if (error.response.status === 500) {
      redirect('/maaf')
    }
  })
}
```

Terakhir, tambahkan modul dan _plugin_ yang baru saja dibuat, ke dalam konfigurasi proyek.

```js{}[nuxt.config.js]
module.exports = {
  modules: ['@nuxtjs/axios'],
  plugins: ['~/plugins/axios.js']
}
```

Lalu kita dapat menggunakannya langsung dari komponen halaman:

```js{}[pages/index.vue]
<template>
  <h1>{{ post.title }}</h1>
</template>

<script>
export default {
	async asyncData ({ $axios, params }) {
	    const  post  = await $axios.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
	    return { post }
	  }
}
</script>
```

<app-modal>
  <code-sandbox :src="csb_link_plugins_external"></code-sandbox>
</app-modal>

## Vue _Plugins_

Jika kita ingin menggunakan Vue _plugins_, seperti [v-tooltip](https://akryum.github.io/v-tooltip) untuk menampilkan _tooltips_ dalam aplikasi Anda, kita dibutuhkan untuk melakukan penetapan _plugin_ tersebut sebelum meluncurkan aplikasi.

Pertama kita harus _install_ _plugin_ tersebut

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add v-tooltip
```

  </code-block>
  <code-block label="npm">

```bash
npm install v-tooltip
```

  </code-block>
</code-group>

Lalu kita membuat berkas `plugins/vue-tooltip.js`

```js{}[plugins/vue-tooltip.js]
import Vue from 'vue'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
```

<app-modal>
  <code-sandbox  :src="csb_link_plugins_vue"></code-sandbox>
</app-modal>

## Properti _plugins_

Lalu kita menambahkan jalur menuju berkas tersebut ke dalam kunci `plugins` dari `nuxt.config.js`. Properti _plugins_ dapat membiarkan Anda menambahkan _plugins_ Vue.js secara mudah untuk aplikasi utama Anda. Semua jalur yang ditentukan dalam properti `plugins` akan diimpor sebelum menginisialisasi aplikasi utama.

```js{}[nuxt.config.js]
export default {
  plugins: ['~/plugins/vue-tooltip.js']
}
```

### _Plugins_ ES6

Jika _plugin_ terletak di `node_modules` dan diekspor melalui modul ES6, Anda mungkin dibutuhkan untuk menambahkannya ke dalam opsi _build_, `transpile`:

```js{}[nuxt.config.js]
module.exports = {
  build: {
    transpile: ['vue-tooltip']
  }
}
```

Anda dapat mengacu pada dokumentasi [configuration build](/docs/2.x/configuration-glossary/configuration-build#transpile) untuk mengetahui lebih lanjut mengenai opsi-opsi yang ada.

## _Client or server side only_ (Hanya _client_ atau sisi _server_)

Beberapa _plugins_ mungkin hanya dapat bekerja pada _browser_ karena mereka kurang dukungan untuk SSR.

### Penamaan konvensional _plugin_

Jika _plugin_ diasumsikan hanya bekerja pada _client_ atau sisi _server_, `.client.js` atau `.server.js` dapat diterapkan menjadi _extension_ dari berkas _plugin_ tersebut. Berkas tersebut akan secara otomatis dimasukkan hanya pada sisi (_client_ atau _server_) yang bersangkutan.

```js{}[nuxt.config.js]
export default {
  plugins: [
    '~/plugins/foo.client.js', // hanya pada sisi client
    '~/plugins/bar.server.js', // hanya pada sisi server
    '~/plugins/baz.js' // keduanya, client & server
  ]
}
```

### Sintaksis obyek

Anda juga dapat menggunakan sintaksis obyek dengan properti `mode` (`'client'` atau `'server'`) dalam `plugins`.

```js{}[nuxt.config.js]
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' }, // Hanya pada sisi client
    { src: '~/plugins/server-only.js', mode: 'server' } // Hanya pada sisi server
  ]
}
```

<app-modal>
  <code-sandbox  :src="csb_link_plugins_client"></code-sandbox>
</app-modal>

## Menginjeksi ke dalam `$root` & context

Terkadang Anda butuh untuk membuat fungsi-fungsi atau nilai-nilai yang dapat digunakan pada seluruh aplikasi Anda. Anda dapat menginjeksi nilai-nilai tersebut ke dalam _Vue instances_ (sisi _client_), _context_ (sisi _server_) dan bahkan dalam Vuex store. Merupakan sebuah kesepakatan untuk memberi awalan pada fungsi-fungsi tersebut dengan `$`.

Nuxt.js menyediakan Anda dengan metode `inject(key, value)`
untuk melakukan ini secara mudah. _Inject_ diberikan dengan _parameter_ kedua ketika melakukan ekspor pada fungsi tersebut. `$` akan ditambahkan secara otomatis kepada key.
<base-alert type="info">

Penting untuk diketahui bahwa dalam Vue [instance lifecycle](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram), hanya  `beforeCreate` dan `created` *hooks* dipanggil secara pada kedua sisi, dari _client-side_ dan _server-side_. _Hooks_ yang lain hanya dipanggil pada _client-side_.

</base-alert>

```js{}[plugins/hello.js]
export default ({ app }, inject) => {
  // Menginjeksi $hello(msg) ke dalam Vue, context dan store.
  inject('hello', msg => console.log(`Hello ${msg}!`))
}
```

```js{}[nuxt.config.js]
export default {
  plugins: ['~/plugins/hello.js']
}
```

Sekarang servis `$hello` dapat diakses dari `context` dan `this` di dalam halaman, komponen, _plugin_, dan aksi pada store.

```js{}[example-component.vue]
export default {
  mounted() {
    this.$hello('mounted')
    // akan melakukan console.log 'Hello mounted!'
  },
  asyncData({ app, $hello }) {
    $hello('asyncData')
    // Jika menggunakan Nuxt <= 2.12, gunakan 👇
    app.$hello('asyncData')
  }
}
```

```js{}[store/index.js]
export const state = () => ({
  someValue: ''
})

export const actions = {
  setSomeValueToWhatever({ commit }) {
    this.$hello('store action')
    const newValue = 'whatever'
    commit('changeSomeValue', newValue)
  }
}
```

<base-alert>
Jangan menggunakan `Vue.use()`, `Vue.component()`, dan secara global, jangan memasukkan apapun ke dalam fungsi Vue ini, hanya dikhususkan untuk injeksi Nuxt. Melakukannya dapat menyebabkan _memory leak_ pada sisi _server_.
</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link_plugins_custom"></code-sandbox>
</app-modal>

## Properti _extendPlugins_

Anda mungkin ingin memperluas _plugins_ atau mengubah urutan _plugins_ yang dihasilkan oleh Nuxt.js. Fungsi ini menerima array dari obyek [plugin](/docs/2.x/configuration-glossary/configuration-plugins) dan harus membalikan (_return_) plugin dalam bentuk obyek dalam array.

Contoh pengubahan urutan _plugins_:

```js{}[nuxt.config.js]
export default {
  extendPlugins(plugins) {
    const pluginIndex = plugins.findIndex(
      ({ src }) => src === '~/plugins/harusPertama.js'
    )
    const harusPertama = plugins[pluginIndex]

    plugins.splice(pluginIndex, 1)
    plugins.unshift(harusPertama)

    return plugins
  }
}
```

### _Global mixins_

_Global mixins_ dapat ditambahkan secara mudah dengan Nuxt _plugins_, tetapi dapat menyebabkan masalah dan _memory leaks_ ketika tidak ditangani dengan baik. Kapanpun Anda menambahkan _global mixin_ ke dalam aplikasi Anda, Anda diharuskan untuk menggunakan _flag_ untuk menghindari melakukan pendaftarannya secara berulang kali:

```js{}[plugins/my-mixin-plugin.js]
if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin({ ... }) // Tetapkan mixin Anda lalu
}
```

<quiz :questions="questions"></quiz>
