---
title: store
description: Direktori `store` mengandung berkas Vuex Store Anda. Vuex Store sudah termasuk dalam Nuxt.js, tetapi dimatikan secara bawaan. Membuat berkas `index.js` dalam direktori ini akan menyalakan store tersebut.
position: 13
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/14_store?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Bagaimana cara Anda menyalakan store?
    answers:
      - Sudah dinyalakan secara bawaan
      - membuat berkas js dalam direktori store
      - 'add store: true dalam berkas nuxt.config.js'
    correctAnswer: membuat berkas js dalam direktori store
  - question: Setiap berkas .js dalam direktori store, diubah menjadi
    answers:
      - plugin
      - module
      - function
    correctAnswer: module
  - question: Di dalam store, Anda harus ekspor state sebagai
    answers:
      - function
      - object
      - string
    correctAnswer: function
  - question: Di dalam store, Anda harus ekspor mutations dan actions sebagai
    answers:
      - function
      - object
      - string
    correctAnswer: object
  - question: Anda dapat menambahkan plugin-plugin ke dalam store
    answers:
      - true
      - false
    correctAnswer: true
  - question: Metode fetch digunakan untuk mengisi store
    answers:
      - sebelum _rendering_ halaman
      - ketika _rendering_ halaman
      - sesudah _rendering_ halaman
    correctAnswer: sebelum _rendering_ halaman
  - question: Apa yang dapat Anda gunakan ketika Anda mempunyai data pada server yang ingin Anda berikan langsung ke sisi client?
    answers:
      - nuxtServerInit
      - fetch
      - asyncData
    correctAnswer: nuxtServerInit
  - question: Dalam asyncData, context diberikan ke nuxtServerInit sebagai
    answers:
      - argumen pertama
      - argumen kedua
      - argumen ketiga
    correctAnswer: argumen kedua
---

Direktori `store` mengandung berkas [Vuex Store](http://vuex.vuejs.org/en/) Anda. Vuex Store sudah termasuk dalam Nuxt.js, tetapi dimatikan secara bawaan. Membuat berkas `index.js` dalam direktori ini akan menyalakan store tersebut.

<base-alert>

_Direktori ini tidak bisa dinamakan ulang tanpa konfigurasi ekstra._

</base-alert>

Menggunakan store untuk mengelola keadaan (_state_) sangat penting untuk setiap aplikasi besar. Itulah mengapa Nuxt.js mengimplementasikan Vuex pada dasarnya.

## Mengaktifkan Store

Nuxt.js akan melihat direktori `store`, jika ada, maka:

1. Impor Vuex
2. Menambahkan opsi `store` pada dasar Vue _instance_.

## Modul-modul

Setiap berkas `.js` dalam direktori `store`, berubah menjadi [namespaced module](http://vuex.vuejs.org/en/modules.html) (`index` menjadi modul dasar). Nilai `state` Anda harus selalu menjadi `function` untuk menghindari ketidakinginan _shared_ _state_ pada sisi server.

Untuk permulaan, ekspor state menjadi function, dan mutations dan actions menjadi obyek.

```js{}[store/index.js]
export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
```

Lalu, Anda dapat memiliki berkas `store/todos.js`:

```js{}[store/todos.js]
export const state = () => ({
  list: []
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(todo) {
    todo.done = !todo.done
  }
}
```

Store akan dihasilkan menjadi seperti:

```js
new Vuex.Store({
  state: () => ({
    counter: 0
  }),
  mutations: {
    increment(state) {
      state.counter++
    }
  },
  modules: {
    todos: {
      namespaced: true,
      state: () => ({
        list: []
      }),
      mutations: {
        add(state, { text }) {
          state.list.push({
            text,
            done: false
          })
        },
        remove(state, { todo }) {
          state.list.splice(state.list.indexOf(todo), 1)
        },
        toggle(state, { todo }) {
          todo.done = !todo.done
        }
      }
    }
  }
})
```

Dan pada `pages/todos.vue` Anda, menggunakan modul `todos`:

```js{}[pages/todos.vue]
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.text">
      <input :checked="todo.done" @change="toggle(todo)" type="checkbox">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li><input @keyup.enter="addTodo" placeholder="What needs to be done?"></li>
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    todos () {
      return this.$store.state.todos.list
    }
  },
  methods: {
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
```

Metode modul juga bekerja pada definisi _top-level_ tanpa pengimplementasian sub-direktori pada direktori store

Contoh state: anda dapat membuat berkas `store/state.js` dan menambahkan sebagai berikut

```js
export default () => ({
  counter: 0
})
```

Dan mutations yang sesuai dapat berada pada berkas `store/mutations.js`

```js{}[store/mutations.js]
export default {
  increment(state) {
    state.counter++
  }
}
```

## Plugin dalam Store

Anda dapat menambahkan plugin tambahan pada store dengan menaruh plugin-plugin tersebut ke dalam berkas `store/index.js`:

```js{}[store/index.js]
import myPlugin from 'myPlugin'

export const plugins = [myPlugin]

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
```

Informasi lebih lanjut mengenai plugin: [Vuex documentation](https://vuex.vuejs.org/en/plugins.html).

## nuxtServerInit Action

Jika action dari `nuxtServerInit` ditentukan dalam store dan modenya merupakan `universal`, Nuxt.js akan memanggilnya dengan context (hanya dari sisi server). Ini akan menjadi berguna ketika kita mempunyai beberapa data pada server yang ingin kita bagikan langsung ke sisi client.

Sebagai contoh, jika kita mempunyai beberapa sesi pada sisi server dan kita ingin mengakses user yang terkoneksi melalui `req.session.user`. Untuk memberi user yang sudah terotentikasi ke dalam store kita, kita memperbarui `store/index.js` kita sebagai berikut:

```js{}[store/index.js]
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

<base-alert>

Hanya modul utama (dalam store/index.js) yang akan menerima action ini. Anda dibutuhkan untuk menyambungkan modul actions dari sana.

</base-alert>

[Context](/docs/2.x/concepts/context-helpers) diberikan kepada `nuxtServerInit` menjadi argumen kedua dalam metode `asyncData`.

Jika `nuxt generate` dijalankan, `nuxtServerInit` akan dieksekusi pada setiap jalur dinamis yang dihasilkan.

<base-alert type="info">

Action Asynchronous nuxtServerInit harus membalikkan (_return_) Promise atau async/await agar server nuxt diizinkan untuk menunggu mereka.

</base-alert>

```js{}[store/index.js]
actions: {
  async nuxtServerInit({ dispatch }) {
    await dispatch('core/load')
  }
}
```

## Vuex Mode Strict

Mode strict dinyalakan secara bawaan pada mode dev dan dimatikan ketika mode menjadi production. Untuk mematikan mode strict ketika dev, ikuti cara dibawah ini sebagai contoh dalam `store/index.js`:

```js
export const strict = false
```

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
