---
title: 'The Context'
description: '`context` menyediakan objek/parameter tambahan dari Nuxt yang biasanya tidak tersedia untuk komponen Vue. `context` tersedia di lifecycle Nuxt khusus seperti `asyncData`, `plugins`, `middlewares`, `modules`, dan `store/nuxtServerInit`.'
menu: The Context
category: internals-glossary
position: 1
---

`context` menyediakan objek/parameter tambahan dari Nuxt untuk komponen Vue dan tersedia di _lifecycle_ Nuxt khusus seperti [`asyncData`](/docs/2.x/features/data-fetching#async-data), [`fetch`](/docs/2.x/features/data-fetching), [`plugins`](/docs/2.x/directory-structure/plugins), [`middleware`](/docs/2.x/directory-structure/middleware#router-middleware) dan [`nuxtServerInit`](/docs/2.x/directory-structure/store#the-nuxtserverinit-action).

> _Catatan: "Context" yang kami rujuk di sini jangan sampai tertukar dengan objek `context` yang tersedia di [`Vuex Actions`](https://vuex.vuejs.org/guide/actions.html). Keduanya tidak berhubungan._

```js
function (context) {
  // Kunci universal
  const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error,
    $config
  } = context
  // Sisi peladen
  if (process.server) {
    const { req, res, beforeNuxtRender } = context
  }
  // Sisi pengguna
  if (process.client) {
    const { from, nuxtState } = context
  }
}
```

## Universal keys

Kunci-kunci ini tersedia di sisi pengguna dan sisi peladen.

### app

`app` (_NuxtAppOptions_)

Opsi _root instance_ Vue yang menyertakan semua _plugin_ Anda. Misalnya, saat menggunakan `i18n`, anda dapat mengakses `$i18n` melalui `context.app.i18n`.

### store

`store` ([_Vuex Store_](https://vuex.vuejs.org/api/#vuex-store-instance-properties))

_Instance_ Vuex Store. **Hanya tersedia apabila [vuex store](/docs/2.x/directory-structure/store) telah diatur**.

### route

`route` ([_Vue Router Route_](https://router.vuejs.org/api/#the-route-object))

_Instance_ rute Vue Router.

### params

`params` (_Object_)

Alias dari `route.params`.

### query

`query` (_Object_)

Alias dari `route.query`.

### env

`env` (_Object_)

_Environment variables_ yang diatur di `nuxt.config.js`, lihat [env API](/docs/2.x/configuration-glossary/configuration-env).

### isDev

`isDev` (_Boolean_)

Boolean yang memberi tahu Anda jika Anda berada di mode pengembang, berguna untuk _caching_ beberapa data dalam produksi.

### isHMR

`isHMR` (_Boolean_)

Boolean yang memberi tahu Anda jika metode/_middleware_ dipanggil dari _hot module replacement_ webpack (_bernilai true hanya di sisi pengguna dalam mode pengembang_).

### redirect

`redirect` (_Function_)

Gunakan metode ini untuk mengarahkan pengguna ke rute lain, kode statusnya digunakan di sisi peladen, secara bawaan `302`. `redirect([status,] path [, query])`.

Contoh:

```js{}[]
redirect(302, '/login')
redirect({ name: 'slug', params: { slug: mySlug } })
redirect('https://vuejs.org')
```

Lihat [dokumen Vue Router](https://github.com/vuejs/vue-router/blob/64d60c01920405f0b93e00a401c73868b08ee6e5/types/router.d.ts#L161-L169) info lebih lanjut mengenai properti `Location`.

<base-alert type="info">

`redirect` atau `error` tidak mungkin untuk digunakan di [client-side Nuxt plugin](/docs/2.x/directory-structure/plugins#client-or-server-side-only) karena kesalahan pada _hydration_ (konten pengguna akan berbeda dari yang diharapkan dari peladen).

Solusi yang benar adalah dengan menggunakan `window.onNuxtReady(() => { window.$nuxt.$router.push('/your-route') })`

</base-alert>

### error

`error` (_Function_)

Gunakan metode ini untuk menampilkan halaman kesalahan: `error(params)`. `params` harus memiliki properti `statusCode` dan `message`.

### `$config`

`$config` (_Object_)

[Runtime config](/docs/2.x/configuration-glossary/configuration-runtime-config) yang sebenarnya.

## Server-side keys

Kunci-kunci ini hanya tersedia di sisi peladen.

### req

`req` ([_http.Request_](https://nodejs.org/api/http.html#http_class_http_incomingmessage))

Permintaan dari peladen Node.js. Apabila Nuxt digunakan sebagai _middleware_, objek _request_ dapat berbeda bergantung pada kerangka kerja yang Anda gunakan.<br>**Tidak tersedia melalui `nuxt generate`**.

### Res

`res` ([_http.Response_](https://nodejs.org/api/http.html#http_class_http_serverresponse))

Tanggapan dari peladen Node.js. Apabila Nuxt digunakan sebagai _middleware_, objek _response_ dapat berbeda bergantung pada kerangka kerja yang Anda gunakan.<br>**Tidak tersedia melalui `nuxt generate`**.

### beforeNuxtRender

`beforeNuxtRender(fn)` (_Function_)

Gunakan metode ini untuk memperbarui variabel `__NUXT__` yang dimuat di sisi pengguna, `fn` (dapat secara asinkron) dipanggil dengan `{ Components, nuxtState }`, lihat [contoh](https://github.com/nuxt/nuxt.js/blob/cf6b0df45f678c5ac35535d49710c606ab34787d/test/fixtures/basic/pages/special-state.vue).

## Client-side keys

Kunci-kunci ini hanya tersedia di sisi pengguna.

### from

`from` ([_Vue Router Route_](https://router.vuejs.org/api/#the-route-object))

Dari mana rute berasal.

### nuxtState

`nuxtState` _(Object)_

Keadaan Nuxt, berguna untuk _plugin_ yang menggunakan `beforeNuxtRender` untuk mendapatkan keadaan Nuxt pada sisi pengguna sebelum _hydration_. **Hanya tersedia dalam mode `universal`**.
