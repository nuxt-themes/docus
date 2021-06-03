---
title: '$nuxt: Pembantu Nuxt.js'
description: $nuxt adalah pembantu yang dirancang untuk meningkatkan pengalaman pengguna.
category: internals-glossary
position: 2
---

`$nuxt` adalah pembantu yang dirancang untuk meningkatkan pengalaman pengguna.
Untuk mempelajari lebih lanjut mengenai pembantu Nuxt.js lihat [bagian context and helpers dalam bab Konsep](/docs/2.x/concepts/context-helpers#nuxt-the-nuxtjs-helper)

## Pemeriksa koneksi

- `isOffline`
  - Tipe: `Boolean`
  - Deskripsi: `true` saat koneksi internet pengguna menjadi offline
- `isOnline`
  - Tipe: `Boolean`
  - Deskripsi: Kebalikan dari `isOffline`

```html{}[layouts/default.vue]
<template>
  <div>
    <div v-if="$nuxt.isOffline">Anda sedang offline</div>
    <nuxt />
  </div>
</template>
```

## Menyegarkan data halaman

- `refresh()`
  - Jika Anda hanya ingin menyegarkan data yang disediakan oleh `asyncData` atau `fetch`

```html{}[example.vue]
<template>
  <div>
    <div>{{ content }}</div>
    <button @click="refresh">Refresh</button>
  </div>
</template>

<script>
  export default {
    asyncData() {
      return { content: 'Created at: ' + new Date() }
    },
    methods: {
      refresh() {
        this.$nuxt.refresh()
      }
    }
  }
</script>
```

## Mengontrol loading bar

- `$loading`
  - Jika Anda ingin mengontrol _loading bar_ Nuxt secara terprogram

```js{}[]
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```
