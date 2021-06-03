---
title: 'Metode fetch'
description: Metode `fetch` digunakan untuk mengisi penyimpanan sebelum merender halaman, ini seperti metode `asyncData` kecuali ia tidak menyetel data komponen.
menu: Metode Fetch
category: components-glossary
position: 0
---

## Nuxt >= 2.12

Nuxt.js `v2.12` memperkenalkan hook baru yang disebut `fetch` **di salah satu komponen Vue Anda**.

<base-alert>

`fetch(context)` sudah tidak digunakan lagi, sebagai gantinya Anda dapat menggunakan [anonymous middleware](/docs/2.x/components-glossary/pages-middleware#anonymous-middleware) di halaman Anda: `middleware(context)`

</base-alert>

### Kapan menggunakan fetch?

Every time you need to get **asynchronous** data. `fetch` is called on server-side when rendering the route, and on client-side when navigating.

It exposes `$fetchState` at the component level:

Setiap kali Anda perlu mendapatkan data **asynchronous**. Sedangkan `fetch` dipanggil di sisi server saat merender route dan di client-side saat menavigasi.

Ini memperlihatkan `$fetchState` di tingkat komponen:

- `$fetchState.pending`: `Boolean`, memungkinkan Anda untuk menampilkan placeholder saat `fetch` dipanggil di _client-side_.
- `$fetchState.error`: `null` atau `Error`, memungkinkan Anda untuk menampilkan pesan kesalahan.
- `$fetchState.timestamp`: `Integer`, adalah stempel waktu pengambilan terakhir, berguna untuk penyimpanan dalam cache `keep-alive`

Jika Anda ingin memanggil hook `fetch` dari template Anda, gunakan:

```html
<button @click="$fetch">Refresh</button>
```

atau metode komponen:

```javascript
// dari metode komponen di bagian skrip
export default {
  methods: {
    refresh() {
      this.$fetch()
    }
  }
}
```

Anda dapat mengakses Nuxt [context](/docs/2.x/internals-glossary/context) di dalam fetch hook menggunakan `this.$nuxt.context`.

### Pilihan

- `fetchOnServer`: `Boolean` atau `Function` (default: `true`), memanggil `fetch()` saat server merender halaman.
- `fetchDelay`: `Integer` (default: `200`), atur waktu eksekusi minimum dalam milidetik (untuk menghindari flash cepat).

<div class="Alert Alert--green">

Jika `fetchOnServer` false (`false` atau mengembalikan `false`), `fetch` hanya akan dipanggil di sisi klien dan `$fetchState.pending` akan mengembalikan `true` saat server merender komponen.

</div>

```html
<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    async fetch() {
      this.posts = await this.$http.$get(
        'https://jsonplaceholder.typicode.com/posts'
      )
    },
    fetchOnServer: false
  }
</script>
```
