---
title: 'API: build プロパティ'
description: Nuxt.js ではウェブアプリケーションを自由にビルドできるよう Webpack 設定をカスタマイズできます。
menu: build
category: configuration
position: 101
---

> Nuxt.js ではウェブアプリケーションを自由にビルドできるよう Webpack 設定をカスタマイズできます。

## analyze

> Nuxt.js では [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) を使ってバンドルファイルと最適化の仕方を視覚化できます。

- 型: `Boolean` または `Object`
- デフォルト: `false`

オブジェクトの場合は、利用できるプロパティは [こちら](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin) を参照してください。

例（`nuxt.config.js`）:

```js
export default {
  build: {
    analyze: true,
    // または
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<div class="Alert Alert--teal">

**情報:** `yarn nuxt build --analyze` または `yarn nuxt build -a` コマンドを使って、アプリケーションをビルドしてバンドルアナライザを [http://localhost:8888](http://localhost:8888) で起動できます。`yarn` を使っていない場合は、コマンドに `npx` を付けて実行できます。

</div>

## babel

> JavaScript や Vue ファイルのために Babel の設定をカスタマイズします。 `.babelrc` はデフォルトで無視されます。

- 型: `Object` `babel-loader` の [options](https://github.com/babel/babel-loader#options) と `babel` の [options](https://babeljs.io/docs/en/options) を参照してください
- デフォルト:

  ```js
  {
    babelrc: false,
    cacheDirectory: undefined,
    presets: ['@nuxt/babel-preset-app']
  }
  ```

[@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/blob/dev/packages/babel-preset-app/src/index.js) のデフォルトターゲットは `client` ビルドでは `ie: '9'`、`server` ビルドでは `node: 'current'` になります。

### presets

- 型: `Function`
- 引数:
  1. `Object`: { isServer: true | false }
  2. `Array`:
     - プリセット名 `@nuxt/babel-preset-app`
     - `@nuxt/babel-preset-app` の [`options`](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app#options)

**メモ**: `build.babel.presets` のプリセットの設定はクライアントビルド、サーバービルド両方に適用されます。ターゲットは（クライアント/サーバー）それぞれに応じて Nuxt によって設定されます。クライアントビルドとサーバービルドで異なるプリセットの設定をしたい場合は、関数として `presets` を使用してください。

> 以下のカスタマイズの代わりにデフォルトのプリセットを使用することを **強くお勧めします**

```js
export default {
  build: {
    babel: {
      presets({ isServer }, [ preset, options ]) {
        // 直接オプションを変更する
        options.targets = isServer ? ... :  ...
        options.corejs = ...
        // 何も返さない
      }
    }
  }
}
```

もしくは、プリセットのリスト全体を返すことによってデフォルトの値を上書きします:

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
            // 他のプリセット
          ]
        ]
      }
    }
  }
}
```

## cache

- 型: `Boolean`
- デフォルト: `false`
- ⚠️ 実験的機能です

> [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin#options) と [cache-loader](https://github.com/webpack-contrib/cache-loader#cache-loader) でキャッシュを有効化します。

## crossorigin

- 型: `String`
- デフォルト: `undefined`

生成された HTML の `<link rel="stylesheet">` タグと `<script>` タグの `crossorigin` 属性を設定します。

詳細: [CORS settings attributes](https://developer.mozilla.org/ja/docs/Web/HTML/CORS_settings_attributes)

## cssSourceMap

- 型: `boolean`
- デフォルト: 開発モードでは `true` でプロダクションモードでは `false`

> CSS ソースマップのサポートを有効にします。

## devMiddleware

- 型: `Object`

利用できるオプションは [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) を参照してください。

## devtools

- 型: `boolean`
- デフォルト: `false`

[vue-devtools](https://github.com/vuejs/vue-devtools) を許可するかどうかを設定します。

既に nuxt.config.js などで有効化している場合は、このフラグに関係なく devtools が有効になります。

## extend

> クライアント及びサーバーのバンドルについて Webpack の設定を手動で拡張します。

- 型: `Function`

extend メソッドは一度はサーバーのバンドルのため、一度はクライアントのバンドルのため、つまり二度呼び出されます。メソッドの引数は次のとおり:

1. Webpack 設定オブジェクト
2. 次のキーを持つオブジェクト（`loaders` を除きすべてブーリアン）: `isDev`, `isClient`, `isServer`, `loaders`

<div class="Alert Alert--orange">

**警告:** 提供される `isClient` および `isServer` は [`context`](/api/context) で利用可能なキーとは別物です。 これらは非推奨 **ではありません**。ここでは `process.client` および `process.server` は undefined となるため使用しないでください。

</div>

例（`nuxt.config.js`）:

```js
export default {
  build: {
    extend(config, { isClient }) {
      // クライアントのバンドルの Webpack 設定のみを拡張する
      if (isClient) {
        config.devtool = 'source-map'
      }
    }
  }
}
```

デフォルトの Webpack の設定についてもう少し見てみたい場合は Nuxt.js の [webpack ディレクトリ](https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config) を参照してください。

### extend 内の loaders

`loaders` は、[build.loaders](#loaders) と同じオブジェクト構造を持っているため、`extend` 内部の loaders のオプションを変えることができます。

例（`nuxt.config.js`）:

```js
export default {
  build: {
    extend(config, { isClient, loaders: { vue } }) {
      // クライアントのバンドルの Webpack 設定のみを拡張する
      if (isClient) {
        vue.transformAssetUrls.video = ['src', 'poster']
      }
    }
  }
}
```

## extractCSS

> Vue のサーバーサイドレンダリング [ガイドライン](https://ssr.vuejs.org/ja/guide/css.html)を利用して、共通の CSS を抽出できるようにします。

- 型: `Boolean`
- デフォルト: `false`

内部で [`extract-css-chunks-webpack-plugin`](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin/) が使われ、全ての CSS は別々のファイルに、通常はコンポーネントごとに 1 つ抽出されます。これは CSS と JavaScript を別々にキャッシュすることを可能にし、多くのグローバルまたは共通 CSS が存在する場合には試してみる価値があります。

<div class="Alert Alert--teal">

**注記:** Vue 2.5.18 以前では、このオプションを使用したときにクリティカルな CSS のインポートを削除するバグがありました。

</div>

全ての CSS を単一ファイルに抽出した方がいいこともあります。このための回避策があります。:

<div class="Alert Alert--orange">
⚠️ 全てのファイルを単一ファイルに抽出することは推奨しません。
複数の CSS ファイルに抽出する方が、キャッシングとプリロードの分離に適しています。
また、必要なリソースのみをダウンロードして解決することによって、ページのパフォーマンスを向上させることもできます。
</div>

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

> バンドルのファイル名をカスタマイズします。

- 型: `Object`
- デフォルト:

  ```js
  {
    app: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
    chunk: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
    css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css',
    img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
    font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
    video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
  }
  ```

この例ではチャンク名を数値の ID に変更します（`nuxt.config.js`）:

```js
export default {
  build: {
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
    }
  }
}
```

manifest の使い方をより理解するためには [webpack のドキュメント](https://webpack.js.org/guides/code-splitting/) を参照してください。

## friendlyErrors

- 型: `Boolean`
- デフォルト: `true` (上書きが有効）

[FriendlyErrorsWebpackPlugin](https://github.com/nuxt/friendly-errors-webpack-plugin)によって提供される上書きを有効にするか無効にするかを設定します。

## hardSource

- 型: `Boolean`
- デフォルト: `false`
- ⚠️ 実験的機能です

キャッシュを改善するために [HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin) を有効にします。

## hotMiddleware

- 型: `Object`

利用できるオプションは [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) を参照してください。

## html.minify

- 型: `Object`
- デフォルト:

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

**情報:** `html.minify`に変更を加えても、それらはデフォルトとマージされません！

ビルドプロセス中に作成された HTML ファイルのミニファイに使われる [html-minifier](https://github.com/kangax/html-minifier) プラグインの設定（*全てのモード*に適用される）。

## indicator

> 開発モードでホットリローディングのビルドインジケーターを表示します(`v2.8.0+` から利用可能)

- 型: `Boolean`
- デフォルト: `true`

![nuxt-build-indicator](https://user-images.githubusercontent.com/5158436/58500509-93ba0f80-8197-11e9-8524-e115c6d32571.gif)

## loaders

> webpack loaders を統合した Nuxt.js のカスタマイズオプション

- 型: `Object`
- デフォルト:

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

> 注意: `nuxt.config.js` の設定で指定することに加え、[build.extend](#extend) で変更することもできます。

### loaders.file

> 詳細は [file-loader options](https://github.com/webpack-contrib/file-loader#options) を参照してください。

### loaders.fontUrl and loaders.imgUrl

> 詳細は [url-loader options](https://github.com/webpack-contrib/url-loader#options) を参照してください。

### loaders.pugPlain

> 詳細は [pug-plain-loader](https://github.com/yyx990803/pug-plain-loader) または [Pug compiler options](https://pugjs.org/api/reference.html#options) を参照してください。

### loaders.vue

> 詳細は [vue-loader options](https://vue-loader.vuejs.org/options.html) を参照してください。

### loaders.css と loaders.cssModules

> 詳細は [css-loader options](https://github.com/webpack-contrib/css-loader#options) を参照してください。注意: cssModules は、[CSS Modules](https://vue-loader.vuejs.org/guide/css-modules.html#css-modules) を使うための loader オプションです。

### loaders.less

> Less specific オプションは、`loaders.less` を介して `less-loader` に渡すことができます。dash-case で利用可能な全てのオプションについては [Less documentation](http://lesscss.org/usage/#command-line-usage-options) を参照してください。

### loaders.sass と loaders.scss

> 利用可能な全てのオプションについては [Sass documentation](https://github.com/sass/dart-sass#javascript-api) を参照してください。注意: `loaders.sass` は [Sass Indented Syntax](http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html) 用です。

### loaders.vueStyle

> 詳細は [vue-style-loader options](https://github.com/vuejs/vue-style-loader#options) を参照してください。

## loadingScreen
- 型: `Boolean` または `Object`
- デフォルト: `{}`
       
> [Nuxt loading screen](https://github.com/nuxt/screens) を無効または有効（デフォルト）にします。`false` を渡して無効にした場合, webpack dev サーバーは完全に起動するまで応答しません。

## optimization

- 型: `Object`
- デフォルト:

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

`dev` または `analyze` モードでは、`splitChunks.name` のデフォルト値は `true` になっています。

カスタマイズされたプラグインの配列に `minimizer` を設定するか、`minimize` を `false` にすることで全ての minimizer を無効にできます。（`minimize` はデフォルトで開発用に無効になっています）

[Webpack の最適化](https://webpack.js.org/configuration/optimization/)を参照してください。

## optimizeCSS

- 型: `Object` または `Boolean`
- デフォルト:
  - `false`
  - extractCSS が有効の場合は `{}`

OptimizeCSSAssets プラグインのオプションです。

[NMFR/optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin) を参照してください。

## parallel

- 型: `Boolean`
- デフォルト: `false`
- ⚠️ 実験的機能です

webpack のビルドで[thread-loader](https://github.com/webpack-contrib/thread-loader#thread-loader) を有効にします。

## plugins

> Webpack のプラグインを追加します。

- 型: `Array`
- デフォルト: `[]`

例（`nuxt.config.js`）:

```js
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

> [PostCSS Loader](https://github.com/postcss/postcss-loader#usage) プラグインをカスタマイズします。

- 型: `Array`、`Object`（推奨）、`Function` または `Boolean`

  **注意：** Nuxt.js は [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env) を適用しました。デフォルトでは、[Stage 2 features](https://cssdb.org/) と [Autoprefixer](https://github.com/postcss/autoprefixer) が有効になっています。`build.postcss.preset` を使うことで設定が出来ます

- デフォルト:

  ```js
  {
    plugins: {
      'postcss-import': {},
      'postcss-url': {},
      'postcss-preset-env': this.preset,
      'cssnano': { preset: 'default' } // 開発モードでは無効化されています
    },
    order: 'presetEnvAndCssnanoLast',
    preset: {
      stage: 2
    }
  }
  ```

カスタムプラグイン設定は、デフォルトのプラグイン設定とマージされます (`Object` のかわりに `Array` を使っている場合を除く）。

例（`nuxt.config.js`）:

```js
export default {
  build: {
    postcss: {
      plugins: {
        // `postcss-url` の無効化
        'postcss-url': false,
        // plugin の追加
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

postcss の設定が `Object` 型の場合、プラグインの順番の定義に `order`を利用できます:

- 型: `Array` (順序付けされたプラグイン名）, `String` (順序付けされたプリセット名）, `Function`
- デフォルト: `cssnanoLast` (最後に `cssnano` を配置する）

例 (`nuxt.config.js`):

```js
export default {
  build: {
    postcss: {
      // プリセット名
      order: 'cssnanoLast',
      // 順序付けされたプラグイン名の配列
      order: ['postcss-import', 'postcss-preset-env', 'cssnano']
      // プラグインの順番を算出するための関数
      order: (names, presets) => presets.cssnanoLast(names)
    }
  }
}
```

## profile

- 型: `Boolean`
- デフォルト: コマンドライン引数 `--profile` で有効にします

[WebpackBar](https://github.com/nuxt/webpackbar#profile) の profiler で有効にします。

## publicPath

> Nuxt.js ではパフォーマンスの最大化のため dist ディレクトリ内のファイルを CDN にアップロードすることも可能です。そのためにはまず `publicPath` に CDN を指定します。

- 型: `String`
- デフォルト: `'/_nuxt/'`

例（`nuxt.config.js`）:

```js
export default {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

設定後、`nuxt build` を実行する際に `.nuxt/dist/client` ディレクトリの内容を CDN にアップロードしてください。

## quiet

> ビルド出力ログの大半を抑制します

- 型: `Boolean`
- デフォルト: [std-env](https://github.com/blindmedia/std-env) によって `CI` または `test` 環境で検出された際に有効になります

## splitChunks

- 型: `Object`
- デフォルト:

  ```js
  {
    layouts: false,
    pages: true,
    commons: true
  }
  ```

`layout`、`pages` や `commons` で分割したコードの場合（共通ライブラリ: vue|vue-loader|vue-router|vuex...）

## ssr

> SSR レンダラー用の webpack バンドルを作成します。

- 型: `Boolean`
- ユニバーサルモードでのデフォルト値は `true`、spa モードでのデフォルト値は `false` です

このオプションは、提供されていない場合は `mode` 値に基づいて自動的に設定されます。

## styleResources

- 型: `Object`
- デフォルト: `{}`

<div class="Alert Alert--orange">

**警告** このプロパティは非推奨です。 パフォーマンスおよび開発体験の向上のために、代わりに [style-resources-module](https://github.com/nuxt-community/style-resources-module/) を使用してください。

</div>

毎回インポートせずに変数やミックスインをページに挿入する必要がある場合に便利です。

Nuxt.js はこの動作を実現するために https://github.com/yenshih/style-resources-loader を使用します。

特定のプリプロセッサに含めるパターン/パスを指定する必要があります: `less`、`sass`、`scss`、`stylus`

：警告：ここではパスのエイリアス（`~` や `@`）を使用することができないため、相対パスまたは絶対パスを使用する必要があります。

`nuxt.config.js`:

```js
{
  build: {
    styleResources: {
      scss: './assets/variables.scss',
      less: './assets/*.less',
      // sass: ...,
      // scss: ...
      options: {
        // https://github.com/yenshih/style-resources-loader#options の
        // `patterns` プロパティ以外を参照してください。
      }
    }
  }
}
```

## templates

> Nuxt.js では、設定に基づいてレンダリングされる独自のテンプレートを提供できます。この機能は[モジュール](/guide/modules)を使用する場合にとりわけ便利です。

- 型: `Array`

例 (`nuxt.config.js`):

```js
export default {
  build: {
    templates: [
      {
        src: '~/modules/support/plugin.js', // `src` は絶対パスもしくは相対パスで指定してください
        dst: 'support.js', // `dst` は `.nuxt` ディレクトリからみた相対パスです
        options: {
          // Options は `options` キーとしてテンプレートに提供されます
          live_chat: false
        }
      }
    ]
  }
}
```

テンプレートは [`lodash.template`](https://lodash.com/docs/#template) を使ってレンダリングされます。[こちら](https://github.com/learn-co-students/javascript-lodash-templates-lab-v-000)でより詳細な使い方を知ることができます。

## terser

- 型: `Object` または `Boolean`
- デフォルト:

```js
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

Terser プラグインのオプションです。 `false` を設定するとこのプラグインは無効になります。

`soruceMap` は webpack の `config.devtool` が `source-?map` と一致した際に有効になります。

[webpack-contrib/terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin) を参照してください。

## transpile

- 型: `Array<String | RegExp | Function>`
- デフォルト: `[]`

特定の依存関係を Babel で変換したい場合、`build.transpile` を追加することができます。transpile の項目は、マッチする依存ファイル名の文字列または正規表現オブジェクトになります。

`v2.9.0` 以降からは、関数を使用して条件付きでトランスパイルすることもできます。関数はオブジェクト（`{ isDev, isServer, isClient, isModern, isLegacy }`）を受け取ります：

```js
{
  build: {
    transpile: [({ isLegacy }) => isLegacy && 'ky']
  }
}
```

## vueLoader

> 注意: この設定は Nuxt 2.0 から削除されました。[`build.loaders.vue`](#loaders) をかわりに使用してください。

- 型: `Object`
- デフォルト

  ```js
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

[Vue Loader Options](https://vue-loader.vuejs.org/options.html) を指定します。

## watch

> 監視や変更後に再生成を行うカスタムファイルを提供することができます。この機能は[モジュール](/guide/modules)を使用する場合にとりわけ便利です。

- 型: `Array<String>`

```js
export default {
  build: {
    watch: ['~/.nuxt/support.js']
  }
}
```

## followSymlinks

> デフォルトでは、ビルドプロセスはシンボリックリンク内のファイルをスキャンしません。`followSymlinks` を `true` に設定するとフォルダー（例えば `pages`）内のシンボリックリンクがビルドプロセスでスキャンされます。

- 型: `Boolean`

```js
export default {
  build: {
    followSymlinks: true
  }
}
```
