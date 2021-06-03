---
title: 'API: Properti router'
description: Properti router memungkinkan Anda menyesuaikan router Nuxt.js.
menu: router
category: configuration
position: 124
---

# Properti router

> Properti router memungkinkan Anda menyesuaikan router Nuxt.js ([vue-router](https://router.vuejs.org/en/)).

## base

- Tipe: `String`
- Default: `'/'`

URL `base` pada aplikasi. Misalnya, jika seluruh aplikasi satu halaman disajikan di bawah `/app/`, maka `base` harus menggunakan nilai `'/app/'`.

Contoh (`nuxt.config.js`):

```js
module.exports = {
  router: {
    base: '/app/'
  }
}
```

<div class="Alert Alert-blue">Ketika `base` di-set, Nuxt.js juga akan menambahkan dalam header dokumen `<base href="%7B%7B%20router.base%20%7D%7D">

`.

</div>

> Pilihan ini diberikan langsung ke vue-router [Router constructor](https://router.vuejs.org/en/api/options.html).

## extendRoutes

- Tipe: `Function`

Anda mungkin ingin mengembangkan rute yang dibuat oleh Nuxt.js. Anda bisa melakukannya melalui opsi `extendRoutes`.

Contoh menambahkan rute khusus:

`nuxt.config.js`

```js
module.exports = {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  }
}
```

Skema rute harus mematuhi skema [vue-router](https://router.vuejs.org/en/).

## linkActiveClass

- Tipe: `String`
- Default: `'nuxt-link-active'`

Secara global mengkonfigurasikan [`<nuxt-link>`](/api/components-nuxt-link) kelas aktif default.

Contoh (`nuxt.config.js`):

```js
module.exports = {
  router: {
    linkActiveClass: 'active-link'
  }
}
```

> Pilihan ini diberikan langsung ke [vue-router Router constructor](https://router.vuejs.org/en/api/options.html).

## linkExactActiveClass

- Tipe: `String`
- Default: `'nuxt-link-exact-active'`

Secara global mengkonfigurasikan [`<nuxt-link>`](/api/components-nuxt-link) kelas aktif default yang sebenarnya.

Contoh (`nuxt.config.js`):

```js
module.exports = {
  router: {
    linkExactActiveClass: 'exact-active-link'
  }
}
```

> Pilihan ini diberikan langsung ke [vue-router Router constructor](https://router.vuejs.org/en/api/options.html).

## middleware

- Tipe: `String` atau `Array`
  - Items: `String`

Menetapkan middleware default untuk setiap halaman aplikasi.

Contoh:

`nuxt.config.js`

```js
module.exports = {
  router: {
    // Jalankan middleware/user-agent.js pada setiap halaman
    middleware: 'user-agent'
  }
}
```

`middleware/user-agent.js`

```js
export default function (context) {
  // Tambah properti userAgent dalam konteks (tersedia dalam `data` dan `fetch`)
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

Untuk mempelajari lebih lanjut tentang middleware, lihat [panduan middleware](/guide/routing#middleware).

## mode

- Tipe: `String`
- Default: `'history'`

Mengkonfigurasi mode router, ini tidak disarankan untuk diubah karena berkaitan dengan `rendering` sisi-server (SSR).

Contoh (`nuxt.config.js`):

```js
module.exports = {
  router: {
    mode: 'hash'
  }
}
```

> Pilihan ini diberikan langsung ke vue-router [Router constructor](https://router.vuejs.org/en/api/options.html).

## scrollBehavior

- Tipe: `Function`

Pilihan `scrollBehavior` memungkinkan Anda menentukan perilaku khusus untuk posisi gulir (scroll position) di antara rute. Metode ini dipanggil setiap kali sebuah halaman di-render.

Secara default, pilihan scrollBehavior diatur ke:

```js
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (
          typeof window.CSS !== 'undefined' &&
          typeof window.CSS.escape !== 'undefined'
        ) {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn(
            'Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).'
          )
        }
      }
      resolve(position)
    })
  })
}
```

Contoh memaksa posisi gulir (scroll position) ke atas untuk setiap rute:

`nuxt.config.js`

```js
module.exports = {
  router: {
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  }
}
```

> Pilihan ini diberikan langsung ke vue-router [Router constructor](https://router.vuejs.org/en/api/options.html).
