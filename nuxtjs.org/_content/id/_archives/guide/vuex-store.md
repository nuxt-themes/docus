---
title: Vuex Store (Penyimpanan).
description: Menggunakan store untuk mengelola state adalah penting untuk setiap aplikasi besar, itulah sebabnya Nuxt.js menerapkan Vuex sebagai inti.
category: getting-started
position: 110
---

> Menggunakan store untuk mengelola state adalah penting untuk setiap aplikasi besar, itulah sebabnya Nuxt.js menerapkan [Vuex](https://vuex.vuejs.org/en/) sebagai inti.

## Mengaktifkan store

Nuxt.js akan mencari direktori `store`, jika ada, maka akan:

1. Mengimpor Vuex,
2. Menambahkan modul `vuex` pada bundel vendor,
3. Menambahkan opsi `store` ke instansi root Vue.

Nuxt.js memungkinkan Anda memiliki **2 mode store**, pilih yang sesuai:

- **Klasik:** `store/index.js` mengembalikan instansi store.
- **Modul:** setiap file `.js` pada direktori `store` akan diubah sebagai [modul namespace](http://vuex.vuejs.org/en/modules.html) (`index` menjadi modul root).

## Mode Klasik

Untuk mengaktifkan store pada mode klasik, kita buat file `store/index.js` yang mana harus mengekspor sebuah metode yang mengembalikan instansi Vuex:

```js
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0
    },
    mutations: {
      increment(state) {
        state.counter++
      }
    }
  })
}

export default createStore
```

> Kita tidak perlu lagi menginstal `vuex` karena sudah tersedia bersama Nuxt.js.

Sekarang kita bisa menggunakan `this.$store` di dalam komponen kita:

```html
<template>
  <button @click="$store.commit('increment')">
    {{ $store.state.counter }}
  </button>
</template>
```

## Mode Modules

> Nuxt.js memungkinkan Anda memiliki direktori `store` bersamaan dengan file-file yang sesuai dengan modul.

Jika Anda ingin menerapkannya, ekspor state sebagai fungsi (function), mutasi (mutations) dan actions sebagai objek-objek di dalam `store/index.js` sebagai ganti instansi store:

```js
export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
```

Kemudian, Anda dapat memiliki file `store/todos.js`:

```js
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
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
```

Store akan menjadi seperti:

```js
new Vuex.Store({
  state: { counter: 0 },
  mutations: {
    increment(state) {
      state.counter++
    }
  },
  modules: {
    todos: {
      state: {
        list: []
      },
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

Dan pada file `pages/todos.vue`, dengan menggunakan modul `todos`:

```html
<template>
  <ul>
    <li v-for="todo in todos">
      <input type="checkbox" :checked="todo.done" @change="toggle(todo)" />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li>
      <input placeholder="What needs to be done?" @keyup.enter="addTodo" />
    </li>
  </ul>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    computed: {
      todos() {
        return this.$store.state.todos.list
      }
    },
    methods: {
      addTodo(e) {
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

<div class="Alert">

Anda juga dapat memiliki modul-modul dengan cara mengekspor instansi store, Anda harus menambahkannya secara manual pada store Anda.

</div>

### Plugins

Anda dapat menambahkan plugin tambahan pada store (pada mode Module) dan meletakkannya ke dalam file `store/index.js`:

```js
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

Informasi lebih lanjut tentang plugin: [dokumentasi Vuex](https://vuex.vuejs.org/en/plugins.html).

## Metode Pengambilan Data (fetch)

> Metode `fetch` digunakan untuk mengisikan data pada store sebelum me-render halaman, ia seperti metode `data`, bedanya ia tidak mengatur data komponen.

Informasi lebih lanjut tentang metode fetch: [API Pages fetch](/api/pages-fetch).

## Tindakan nuxtServerInit

Jika `nuxtServerInit` terdefinisi pada store actions, Nuxt.js akan memanggilnya bersama context (hanya pada sisi-server). Itu berguna ketika kita memiliki beberapa data pada server yang ingin diberikan secara langsung pada sisi-klien.

Sebagai contoh, katakan kita mempunyai sessions pada sisi-server dan kita bisa mengakses user yang terkoneksi melalui `req.session.user`. Untuk memberikan user yang terotentikasi pada store, kita perbarui `store/index.js` sebagai berikut:

```js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

> Apabila Anda menggunakan mode _Modules_ Vuex store, hanya modul utama (di dalam `store/index.js`) akan menerima action ini. Anda harus mengatur modul actions Anda dari sana.

[Context](/api/context) akan dilemparkan ke `nuxtServerInit` sebagai argumen kedua, hal ini sama dengan `asyncData` atau metode `fetch`.

> Catatan: Actions asynchronous `nuxtServerInit` harus mengembalikan (return) Promise untuk mengijinkan server `nuxt` untuk menunggunya.
