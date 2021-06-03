---
title: 'Properti  Build'
description: Nuxt.js mengizinkan Anda untuk mengkustomisasi Webpack untuk membangun aplikasi web seperti yang Anda mau.
menu: build
category: configuration-glossary
position: 1
---

> Nuxt.js mengizinkan Anda untuk mengkustomisasi Webpack untuk membangun aplikasi web seperti yang Anda mau.

## analyze

> Nuxt.js menggunakan [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) untuk mengizinkan Anda menvisualisasikan pembungkus (_bundle_) Anda dan mengoptimisasi mereka.

- Tipe: `Boolean` atau `Object`
- Nilai bawaan: `false`

Jika sebuah objek, lihat properti yang tersedia [di sini](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin).

```js{}[nuxt.config.js]
export default {
  build: {
    analyze: true,
    // atau
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<base-alert type="info">

**Info:** Anda dapat menggunakan perintah `yarn nuxt build --analyze` atau `yarn nuxt build -a` untuk membangun aplikasi Anda dan meluncurkan _bundle analyzer_ pada [http://localhost:8888](http://localhost:8888). Jika Anda tidak menggunakan `yarn` Anda dapat menggunakan perintah `npx`.

</base-alert>

## corejs

> Pada [Nuxt@2.14](https://github.com/nuxt/nuxt.js/releases/tag/v2.14.0) secara otomatis mendeteksi versi saat ini dari `core-js` pada projek, juga Anda dapat menentukan versi mana yang akan digunakan.

- Tipe: `number` | `string` (nilai yang valid adalah `'auto'`, `2` dan `3`)
- Nilai bawaan: `'auto'`

## babel

> Melakukan konfigurasi Babel untuk berkas Javascript dan Vue. `.babelrc` akan diabaikan pada bawaannya.

- Tipe: `Object`
- Lihat [opsi](https://github.com/babel/babel-loader#options) `babel-loader` dan [opsi](https://babeljs.io/docs/en/options) `babel`
- Nilai bawaan:

  ```js
  {
    babelrc: false,
    cacheDirectory: undefined,
    presets: ['@nuxt/babel-preset-app']
  }
  ```

Target bawaan dari [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/blob/dev/packages/babel-preset-app/src/index.js) adalah `ie: '9'` di `client` _build_, dan `node: 'current'` di `server` _build_.

### presets

- Tipe: `Function`
- Argumen:
  1. `Object`: { isServer: true | false }
  2. `Array`:
     - nama preset `@nuxt/babel-preset-app`
     - [`opsi`](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app#options) dari `@nuxt/babel-preset-app`

**Catatan**: Preset yang dikonfigurasi di `build.babel.presets` akan diterapkan ke keduanya klien dan _server_. Target akan diatur oleh Nuxt selayaknya. Jika Anda ingin mengkonfigurasikan preset secara berbeda untuk klien atau _server_, mohon gunakan `presets` sebagai fungsi:

> Kami **sangat merekomendasikan** untuk menggunakan preset bawaan daripada kustomisasi dibawah ini.

```js
export default {
  build: {
    babel: {
      presets({ isServer }, [ preset, options ]) {
        // mengganti opsi secara langsung
        options.targets = isServer ? ... :  ...
        options.corejs = ...
        // tidak mengembalikan apapun
      }
    }
  }
}
```

Atau merubah secara nilai bawaan dengan mengembalikan preset keseluruhan:

```js
export default {
  build: {
    babel: {
      presets({ isServer }, [preset, options]) {
        return [
          [
            preset,
            {
              targets: isServer ? ... :  ...,
              ...options
            }
          ],
          [
            // Preset lainnya
          ]
        ]
      }
    }
  }
}
```

## tembolok (cache)

- Tipe: `Boolean`
- Nilai bawaan: `false`
- ⚠️ Ekperimen

> Mengaktifkan tembolok dari [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin#options) dan [cache-loader](https://github.com/webpack-contrib/cache-loader#cache-loader)

## cssSourceMap

- Tipe: `boolean`
- Nilai bawaan: `true` untuk mode _dev_ dan `false` untuk mode _production_.

> Mengaktifkan dukungan CSS Source Map

## devMiddleware

- Tipe: `Object`

Lihat [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) untuk opsi yang tersedia.

## devtools

- Tipe: `boolean`
- Nilai bawaan: `false`

Mengkonfigurasi apakah mengizinkan inspeksi menggunakan [vue-devtools](https://github.com/vuejs/vue-devtools)

Jika Anda sudah mengaktifkan melalui `nuxt.config.js` atau sebaliknya, _devtools_ dapat aktif tanpa melihat _flag_.

## memperpanjang (extend)

> Memperpanjang konfigurasi webpack secara manual untuk pembungkus klien dan _server_

- Tipe: `Function`

_Extend_ dipanggil dua kali, pertama untuk pembungkus _server_ dan satu kali untuk pembungkus klien. Argumen dari metode adalah:

1. Konfigurasi objek _webpack_,
2. Sebuah objek dengan kunci seperti berikut (semua _boolean_ kecuali `loaders`): `isDev`, `isClient`, `isServer`, `loaders`.

<base-alert>

**Peringatan:** kunci `isClient` dan `isServer` yang diberikan dipisahkan dari kunci yang tersedia di [`context`](/docs/2.x/internals-glossary/context). Mereka tidak terdepresiasi. Jangan menggunakan `process.client` dan `process.server` di sini berhubung mereka adalah `undefined`.

</base-alert>

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isClient }) {
      // Memperpanjang konfigurasi webpack untuk client-bundle
      if (isClient) {
        config.devtool = 'source-map'
      }
    }
  }
}
```

Jika Anda ingin melihat lebih tentang konfigurasi bawaan webpack kami, lihat [direktori webpack](https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config).

### loaders in extend

`loaders` memiliki struktur objek yang sama seperti [build.loaders](#loaders), jadi Anda bisa mengubah opsi pemuat di dalam `extend`.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isClient, loaders: { vue } }) {
      // Memperpanjang konfigurasi webpack untuk client-bundle
      if (isClient) {
        vue.transformAssetUrls.video = ['src', 'poster']
      }
    }
  }
}
```

## extractCSS

> Mengaktifkan ekstraksi CSS yang umum menggunakan [paduan](https://ssr.vuejs.org/en/css.html) Vue Server Renderer.

- Tipe: `Boolean` Atau `Object`
- Nilai bawaan: `false`

Menggunakan [`extract-css-chunks-webpack-plugin`](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin/) di bawahnya, semua CSS Anda akan diekstrak ke berkas yang terpisah, biasanya satu komponen. Ini mengizinkan untuk meng-_cache_ CSS dan Javascript secara terpisah dan menarik untuk dicoba ketika Anda memiliki banyak global CSS atau CSS yang terbagi.

Contoh (`nuxt.config.js`):

```js
export default {
  build: {
    extractCSS: true,
    // atau
    extractCSS: {
      ignoreOrder: true
    }
  }
}
```

<base-alert type="info">

**Catatan:** Terdapat _bug_ pada Vue 2.5.18 yang menghapus impor CSS yang penting ketika menggunakan opsi ini.

</base-alert>

Anda mungkin ingin mengekstrak semua CSS pada satu berkas. Terdapat solusi untuk ini:

<base-alert>

Ini tidak direkomendasikan untuk mengekstrak semuanya ke satu berkas. Mengekstrak ke banyak berkas CSS lebih baik untuk meng-_cache_ dan mengisolasi _preload_. Ini dapat meningkatkan performa halaman dengan mengunduh dan menyelesaikan sumber daya yang dibutuhkan.

</base-alert>

```js
export default {
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  }
}
```

## filenames

> Mengkustomisasi pembungkus filenames

- Tipe: `Object`
- Nilai bawaan:

  ```js
  {
    app: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
    chunk: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
    css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash:7].css',
    img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name].[contenthash:7].[ext]',
    font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[name].[contenthash:7].[ext]',
    video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[name].[contenthash:7].[ext]'
  }
  ```

Ini adalah contoh perubahan nama _chunk_ ke id numeric:

```js{}[nuxt.config.js]
export default {
  build: {
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
    }
  }
}
```

Untuk memahami lebih lanjut tentang penggunaan manifest ini, lihat [dokumentasi webpack](https://webpack.js.org/guides/code-splitting/).

<base-alert>

Berhati-hati ketika menggunakan _filenames_ berbasis _non-hashed_ pada mode produksi mengingat kebanyakan _browser_ akan meng-_cache_ aset dan tidak akan mendeteksi perubahan pada pemuat pertama.

</base-alert>

## friendlyErrors

- Tipe: `Boolean`
- Nilai bawaan: `true` (_Overlay_ diaktifkan)

Mengaktifkan atau menonaktifkan _overlay_ yang diberikan oleh [FriendlyErrorsWebpackPlugin](https://github.com/nuxt/friendly-errors-webpack-plugin)

## hardSource

- Tipe: `Boolean`
- Nilai bawaan: `false`
- ⚠️ Eksperimen

Mengaktifkan [HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin) untuk meningkatkan tembolok.

## hotMiddleware

- Tipe: `Object`

Lihat [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) untuk opsi yang ada

## html.minify

- Tipe: `Object`
- Nilai bawaan:

```js
{
  collapseBooleanAttributes: true,
  decodeEntities: true,
  minifyCSS: true,
  minifyJS: true,
  processConditionalComments: true,
  removeEmptyAttributes: true,
  removeRedundantAttributes: true,
  trimCustomFragments: true,
  useShortDoctype: true
}
```

**Perhatian**: Jika Anda membuat perubahan ke `html.minify`, mereka tidak akan digabungkan dengan nilai bawaan.

Menkonfigurasikan _plugin_ [html-minifier](https://github.com/kangax/html-minifier) untuk digunakan mengecilkan berkas HTML yang dibuat ketika proses pembangunan (akan diaplikasikan untuk _all modes_).

## indikator

> Menampilkan indikator pembangunan untuk _hot module replacement_ pada pengembangan (tersedia di `v2.8.0+`)

- Tipe: `Boolean`
- Nilai bawaan: `true`

![nuxt-build-indicator](https://user-images.githubusercontent.com/5158436/58500509-93ba0f80-8197-11e9-8524-e115c6d32571.gif)

## pemuat (loaders)

> Mengkustomisasi opsi Nuxt.js yang terintegrasi dengan pemuat _webpack_

- Tipe: `Object`
- Nilai bawaan:

```js
{
  file: {},
  fontUrl: { limit: 1000 },
  imgUrl: { limit: 1000 },
  pugPlain: {},
  vue: {
    transformAssetUrls: {
      video: 'src',
      source: 'src',
      object: 'src',
      embed: 'src'
    }
  },
  css: {},
  cssModules: {
    localIdentName: '[local]_[hash:base64:5]'
  },
  less: {},
  sass: {
    indentedSyntax: true
  },
  scss: {},
  stylus: {},
  vueStyle: {}
}
```

> Catatan: untuk melakukan spesifikasi konfigurasi di `nuxt.config.js`, ini juga bisa dimodifikasi dengan [build.extend](#extend)

### loaders.file

> Untuk lebih lengkap [opsi file-loader](https://github.com/webpack-contrib/file-loader#options).

### loaders.fontUrl dan loaders.imgUrl

> Untuk lebih lengkap [opsi url-loader](https://github.com/webpack-contrib/url-loader#options).

### loaders.pugPlain

> Untuk lebih lengkap [pug-plain-loader](https://github.com/yyx990803/pug-plain-loader) atau [Pug compiler options](https://pugjs.org/api/reference.html#options).

### loaders.vue

> Untuk lebih lengkap [opsi vue-loader](https://vue-loader.vuejs.org/options.html).

### loaders.css dan loaders.cssModules

> Untuk lebih lengkap [opsi css-loader](https://github.com/webpack-contrib/css-loader#options). Catatan: cssModule adalah pemuat untuk kegunaan [CSS Modules](https://vue-loader.vuejs.org/guide/css-modules.html#css-modules)

### loaders.less

> Anda dapat melewatkan opsi _Less_ apapun ke `less-loader` melalui `loaders.less`. Lihat [dokumentasi Less](http://lesscss.org/usage/#command-line-usage-options) untuk semua opsi yang ada di dash-case.

### loaders.sass dan loaders.scss

> Lihat [dokumentasi Sass](https://github.com/sass/dart-sass#javascript-api) untuk semua opsi yang ada. Catatan: `loaders.sass` digunakan untuk [Sass Indented Syntax](http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html)

### loaders.vueStyle

> Untuk lebih lengkap [opsi vue-style-loader](https://github.com/vuejs/vue-style-loader#options).

## optimisasi

- Tipe: `Object`
- Nilai bawaan:

  ```js
  {
    minimize: true,
    minimizer: [
      // terser-webpack-plugin
      // optimize-css-assets-webpack-plugin
    ],
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      name: undefined,
      cacheGroups: {}
    }
  }
  ```

Nilai bawaan dari `splitChunks.name` adalah `true` pada mode `dev` atau `analyze`.

Anda dapat mengatur `minimizer` menjadi _plugins Array_ yang terkustom atau mengatur `minimize` ke `false` untuk menonaktifkan semua `minimizers`. (`minimize` secara bawaan akan di nonaktifkan pada mode `dev`.)

Lihat [Webpack Optimization](https://webpack.js.org/configuration/optimization).

## optimizeCSS

- Tipe: `Object` or `Boolean`
- Nilai bawaan:
  - `false`
  - `{}` ketika extractCSS diaktifkan

Opsi OptimizeCSSAssets _plugin_.

Lihat [NMFR/optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin).

## parallel

- Tipe: `Boolean`
- Nilai bawaan: `false`
- ⚠️ Experimental

> Aktifkan [thread-loader](https://github.com/webpack-contrib/thread-loader#thread-loader) di dalam pembangunan _webpack_

## plugins

> Tambahkan _plugin webpack_

- Tipe: `Array`
- Nilai bawaan: `[]`

```js{}[nuxt.config.js]
import webpack from 'webpack'
import { version } from './package.json'
export default {
  build: {
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': version
      })
    ]
  }
}
```

## postcss

> Mengkustomisasi _plugin_ [PostCSS Loader](https://github.com/postcss/postcss-loader#usage).

- Tipe: `Array` (versi lama, akan ditimpa secara bawaannya), `Object` (direkomendasikan), `Function` atau `Boolean`

  **Catatan**: Nuxt.js telah mengaplikasikan [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env). Secara bawaan, ini mengaktifkan [fitur Stage 2](https://cssdb.org/) dan [Autoprefixer](https://github.com/postcss/autoprefixer), Anda dapat menggunakan `build.postcss.preset` untuk mengkonfigurasikan hal ini.

- Nilai bawaan:

  ```js{}[nuxt.config.js]
  {
    plugins: {
      'postcss-import': {},
      'postcss-url': {},
      'postcss-preset-env': this.preset,
      'cssnano': { preset: 'default' } // nonaktif di mode pengembangan
    },
    order: 'presetEnvAndCssnanoLast',
    preset: {
      stage: 2
    }
  }
  ```

Pengaturan _Plugin_ kustom Anda akan digabungkan dengan _plugin_ bawaan (kecuali Anda menggunakan `Array` daripada `Object`).

```js{}[nuxt.config.js]
export default {
  build: {
    postcss: {
      plugins: {
        // Nonaktifkan `postcss-url`
        'postcss-url': false,
        // tambahkan beberapa plugin
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        autoprefixer: {
          grid: true
        }
      }
    }
  }
}
```

Jika konfigurasi postcss adalah `Object`, `order` bisa digunakan untuk mendefinisikan urutan _plugin_:

- Tipe: `Array` (urutkan nama _plugin_), `String` (urutkan nama preset), `Function`
- Nilai bawaan: `cssnanoLast` (taruh`cssnano` dibagian akhir)

```js{}[nuxt.config.js]
export default {
  build: {
    postcss: {
      // nama preset
      order: 'cssnanoLast',
      // urutkan nama plugin
      order: ['postcss-import', 'postcss-preset-env', 'cssnano']
      // Fungsi untuk mengkalkulasi urutan plugin
      order: (names, presets) => presets.cssnanoLast(names)
    }
  }
}
```

### _plugin_ postcss & nuxt-tailwindcss

Jika Anda ingin menerapkan postcss (contoh: postcss-pxtorem) pada konfigurasi nuxt-tailwindcss, Anda harus mengubah urutan dan pemuat pertama ke tailwindcss.

**Pengaturan ini tidak memiliki dampak ke nuxt-purgecss**

```js{}[nuxt.config.js]
import { join } from 'path'

export default {
  // ...
  build: {
    postcss: {
      plugins: {
        tailwindcss: join(__dirname, 'tailwind.config.js'),
        'postcss-pxtorem': {
          propList: ['*', '!border*']
        }
      }
    }
  }
}
```

## profil

- Tipe: `Boolean`
- Nilai bawaan: diaktifkan oleh argumen pada _command line_ `--profile`

> Aktifkan _profiler_ di [WebpackBar](https://github.com/nuxt/webpackbar#profile)

## publicPath

> Nuxt.js mengizinkan Anda mengunggah berkas _dist_ ke CDN untuk performa yang maksimal, simplenya hanya dengan mengatur `publicPath` ke CDN.

- Tipe: `String`
- Nilai bawaan: `'/_nuxt/'`

```js{}[nuxt.config.js]
export default {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

Kemudian, ketika meluncurkan `nuxt build`, unggah konten dari direktori `.nuxt/dist/client` ke CDN dan voilà!

## quiet

> Melewatkan sebagian besar dari keluaran _log_

- Tipe: `Boolean`
- Nilai bawaan: Aktifkan ketika sebuah lingkungan `CI` atau `test` terdeteksi oleh [std-env](https://github.com/blindmedia/std-env)

## splitChunks

- Tipe: `Object`
- Nilai bawaan:

  ```js{}[nuxt.config.js]
  export default {
    build: {
      splitChunks: {
        layouts: false,
        pages: true,
        commons: true
      }
    }
  }
  ```

Jika memisahkan kode untuk `layout`, `pages` dan `commons` (pustaka umum: vue|vue-loader|vue-router|vuex...).

## ssr

> Membuat pembungkus webpack khusus untuk perender SSR.

- Tipe: `Boolean`
- Nilai bawaan: `true` untuk mode universal dan `false` untuk mode spa.

Opsi ini secara otomatis mengatur berdasarkan `mode` jika tidak disediakan.

## styleResources

- Tipe: `Object`
- Nilai bawaan: `{}`

<base-alert>

**Catatan**: Properti ini tidak digunakan. Mohon gunakan [style-resources-module](https://github.com/nuxt-community/style-resources-module/) saja untuk meningkatkan performa dan lebih baik.

</base-alert>

Hal ini berguna ketika Anda perlu menginjeksi beberapa variabel dan _mixins_ di halaman tanpa harus mengimpor setiap waktu.

Nuxt.js menggunakan https://github.com/yenshih/style-resources-loader untuk mencapai sikap ini.

Anda pelu menspesifikasi jalur/_pattern_ yang Anda mau untuk memasukkan pre-processors yang diberikan: `less`, `sass`, `scss` or `stylus`

Anda tidak dapat menggunakan alias disini (`~` and `@`), Anda pelu menggunakan jalur relatif atau absolut.

```js{}[nuxt.config.js]
{
  build: {
    styleResources: {
      scss: './assets/variables.scss',
      less: './assets/*.less',
      // sass: ...,
      // scss: ...
      options: {
        // lihat https://github.com/yenshih/style-resources-loader#options
        // kecuali properti `patterns`
      }
    }
  }
}
```

## templates

> Nuxt.js mengizinkan Anda memberikan _templates_ Anda sendiri yang akan di-_render_ berdasarkan konfigurasi Nuxt. Fitur ini berguna untuk menggunakan [modules](/docs/2.x/directory-structure/modules).

- Tipe: `Array`

```js{}[nuxt.config.js]
export default {
  build: {
    templates: [
      {
        src: '~/modules/support/plugin.js', // `src` bisa absolut atau relatif
        dst: 'support.js', // `dst` relatif ke projek `.nuxt` dir
        options: {
          // Opsi diberikan sebagai kunci `options`
          live_chat: false
        }
      }
    ]
  }
}
```

Templates di-_render_ menggunakan [`lodash.template`](https://lodash.com/docs/#template). Anda dapat mempelajari tentang ini [disini](https://github.com/learn-co-students/javascript-lodash-templates-v-000).

## terser

- Tipe: `Object` atau `Boolean`
- Nilai bawaan:

```js{}[nuxt.config.js]
{
  parallel: true,
  cache: false,
  sourceMap: false,
  extractComments: {
    filename: 'LICENSES'
  },
  terserOptions: {
    output: {
      comments: /^\**!|@preserve|@license|@cc_on/
    }
  }
}
```

Opsi _plugin terser_ diatur ke `false` untuk menonaktifkan _plugin_.

`sourceMap` akan diaktifkan ketika webpack `config.devtool` sesuai `source-?map`

Lihat [webpack-contrib/terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin).

## transpile

- Tipe: `Array<String | RegExp | Function>`
- Nilai bawaan: `[]`

Jika Anda ingin men-_transpile_ dependensi khusus dengan Babel, Anda dapat menambahkan mereka di `build.transpile`. Setiap benda di _transpile_ bisa menjadi nama paket, sebuah _string_ atau objek _regex_ yang sama dengan nama berkas dependensi.

Dimulai dari `v2.9.0`, Anda dapat menggunakan fungsi untuk _transpile_, fungsi akan menerima objek (`{ isDev, isServer, isClient, isModern, isLegacy }`):

```js{}[nuxt.config.js]
{
  build: {
    transpile: [({ isLegacy }) => isLegacy && 'ky']
  }
}
```

## vueLoader

> Catatan: konfigurasi ini telah dihilangkan sejak Nuxt 2.0, tologn gunakan [`build.loaders.vue`](#loaders) saja.

- Tipe: `Object`
- Nilai bawaan:

  ```js{}[nuxt.config.js]
  {
    productionMode: !this.options.dev,
    transformAssetUrls: {
      video: 'src',
      source: 'src',
      object: 'src',
      embed: 'src'
    }
  }
  ```

> Spesifikasikan [opsi pemuat Vue](https://vue-loader.vuejs.org/options.html).

## watch

> Anda dapat menyediakan kustom berkas untuk melakukan _watch_ dan regenerasi setelah perubahan. Fitur ini secara spesial berguna untuk menggunakan [modules](/docs/2.x/directory-structure/modules).

- Tipe: `Array<String>`

```js{}[nuxt.config.js]
export default {
  build: {
    watch: ['~/.nuxt/support.js']
  }
}
```

## followSymlinks

> Secara bawaan, proses pembangunan tidak memindai berkas di dalam _symlinks_. _Boolean_ ini termasuk mereka, jadi mengizinkan penggunaan _symlinks_ di dalam direktori-direktori seperti "pages" direktori

- Tipe: `Boolean`

```js{}[nuxt.config.js]
export default {
  build: {
    followSymlinks: true
  }
}
```
