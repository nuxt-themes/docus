---
title: 'Properti hooks'
description: Hooks merupakan _listeners_ untuk _event_ Nuxt yang umumnya digunakan pada modul Nuxt, tetapi Hooks dapat juga diakses melalui `nuxt.config.js`.
menu: hooks
category: configuration-glossary
position: 13
---

- Tipe: `Object`

> Hooks merupakan [_listeners_ untuk _event_ Nuxt](/docs/2.x/internals-glossary/internals) yang umumnya digunakan pada modul Nuxt, tetapi Hooks dapat juga diakses melalui `nuxt.config.js`.

```js{}[nuxt.config.js]
import fs from 'fs'
import path from 'path'

export default {
  hooks: {
    build: {
      done(builder) {
        const extraFilePath = path.join(
          builder.nuxt.options.buildDir,
          'extra-file'
        )
        fs.writeFileSync(extraFilePath, 'Suatu tambahan')
      }
    }
  }
}
```

Secara internal, hooks mengikuti pola penamaan menggunakan titik dua (seperti: `build:done`). Untuk memudahkan konfigurasi, Anda dapat mengatur mereka sebagai objek yang hierarkis ketika menggunakan `nuxt.config.js` (seperti pada contoh di atas) untuk mengatur hooks Anda sendiri. Lihat [Internal Nuxt](/docs/2.x/internals-glossary/internals) untuk informasi lebih detail bagaimana mereka bekerja.

## Daftar Hooks

- [Nuxt hooks](/docs/2.x/internals-glossary/internals-nuxt#hooks)
- [Renderer hooks](/docs/2.x/internals-glossary/internals-renderer#hooks)
- [ModulesContainer hooks](/docs/2.x/internals-glossary/internals-module-container#hooks)
- [Builder hooks](/docs/2.x/internals-glossary/internals-builder#hooks)
- [Generator hooks](/docs/2.x/internals-glossary/internals-generator#hooks)

## Contoh

### Mengalihkan ke router.base ketika URL tidak pada _root_

Katakanlah Anda ingin menyajikan suatu halaman sebagai `/portal` daripada `/`.

Hal tersebut mungkin kasus yang jarang, dan tujuan dari _nuxt.config.js_' `router.base` adalah ketika peladen (server) web menyajikan Nuxt ditempat lain selain _root_ domain.

Tetapi pada pengembangan lokal, mengakses _localhost_, ketika nilai router.base bukan / menghasilkan halaman 404. Untuk mencegah hal tersebut, Anda dapat menambahkan hook.

Mungkin mengalihkan halaman bukan contoh kasus yang terbaik untuk web skala produksi, tetapi contoh kasus tersebut akan membantu Anda memahami Hooks.

Untuk memulai, Anda [dapat mengubah `router.base`](/docs/2.x/configuration-glossary/configuration-router#base); Ubah `nuxt.config.js` Anda:

```js{}[nuxt.config.js]
import hooks from './hooks'
export default {
  router: {
    base: '/portal'
  }
  hooks: hooks(this)
}
```

Kemudian, buat beberapa berkas;

1. `hooks/index.js`, modul Hooks

   ```js{}[hooks/index.js]
   import render from './render'

   export default nuxtConfig => ({
     render: render(nuxtConfig)
   })
   ```

1. `hooks/render.js`, hook _Render_

   ```js{}[hooks/render.js]
   import redirectRootToPortal from './route-redirect-portal'

   export default nuxtConfig => {
     const router = Reflect.has(nuxtConfig, 'router') ? nuxtConfig.router : {}
     const base = Reflect.has(router, 'base') ? router.base : '/portal'

     return {
       /**
        * 'render:setupMiddleware'
        * {@link node_modules/nuxt/lib/core/renderer.js}
        */
       setupMiddleware(app) {
         app.use('/', redirectRootToPortal(base))
       }
     }
   }
   ```

1. `hooks/route-redirect-portal.js`, Middleware-nya sendiri

   ```js{}[hooks/route-redirect-portal.js]
   /**
    * Hook _middleware_ Nuxt untuk mengalihkan halaman dari / ke /portal (atau apapun yang kita atur pada nuxt.config.js router.base)
    *
    * Harus menggunakan versi yang sama seperti connect
    * {@link node_modules/connect/package.json}
    */
   import parseurl from 'parseurl'

   /**
    * _Middleware_ Connect untuk menangani pengalihan ke _Root_ Konteks Aplikasi Web yang dituju.
    *
    * Perhatikan bahwa dokumentasi Nuxt kurang dalam menjelaskan bagaimana cara menggunakan hooks.
    * Kode ini merupakan contoh router untuk membantu penjelasan tersebut.
    *
    * Lihat implementasi bagus berikut sebagai inspirasi:
    * - https://github.com/nuxt/nuxt.js/blob/dev/examples/with-cookies/plugins/cookies.js
    * - https://github.com/yyx990803/launch-editor/blob/master/packages/launch-editor-middleware/index.js
    *
    * [http_class_http_clientrequest]: https://nodejs.org/api/http.html#http_class_http_clientrequest
    * [http_class_http_serverresponse]: https://nodejs.org/api/http.html#http_class_http_serverresponse
    *
    * @param {http.ClientRequest} req Objek internal permintaan klien Node.js [http_class_http_clientrequest]
    * @param {http.ServerResponse} res Objek respon internal Node.js [http_class_http_serverresponse]
    * @param {Function} next middleware callback
    */
   export default desiredContextRoot =>
     function projectHooksRouteRedirectPortal(req, res, next) {
       const desiredContextRootRegExp = new RegExp(`^${desiredContextRoot}`)
       const _parsedUrl = Reflect.has(req, '_parsedUrl') ? req._parsedUrl : null
       const url = _parsedUrl !== null ? _parsedUrl : parseurl(req)
       const startsWithDesired = desiredContextRootRegExp.test(url.pathname)
       const isNotProperContextRoot = desiredContextRoot !== url.pathname
       if (isNotProperContextRoot && startsWithDesired === false) {
         const pathname = url.pathname === null ? '' : url.pathname
         const search = url.search === null ? '' : url.search
         const Location = desiredContextRoot + pathname + search
         res.writeHead(302, {
           Location
         })
         res.end()
       }
       next()
     }
   ```

Selanjutnya, kapanpun Anda mengakses `/` secara tidak sengaja ketika proses pengembangan, Nuxt akan mengalihkan ke `/portal` secara otomatis.
