---
title: 'build プロパティ'
description: 'Nuxt.js では、webpack の設定をカスタマイズして web アプリケーションを思いのままに構築することができます。'
menu: build
category: configuration-glossary
position: 1
---

> Nuxt.js では、webpack の設定をカスタマイズして web アプリケーションを思いのままに構築することができます。

## analyze

> Nuxt.js では [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) を使ってバンドルファイルと最適化の仕方を視覚化できます。

- 型: `Boolean` または `Object`
- デフォルト: `false`

オブジェクトの場合、利用できるプロパティについて[こちら](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin)を参照してください。

```js{}[nuxt.config.js]
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

<base-alert type="info">

**情報:** `yarn nuxt build --analyze` または `yarn nuxt build -a` コマンドを使って、アプリケーションをビルドし、バンドルアナライザを [http://localhost:8888](http://localhost:8888) で起動できます。`yarn` を使っていない場合は `npx` を使って実行できます。

</base-alert>

## corejs

> [Nuxt@2.14](https://github.com/nuxt/nuxt.js/releases/tag/v2.14.0) 以降、Nuxt は `core-js` の現在のバージョンを自動的に検出します。また、使用するバージョンを指定することもできます。

- 型: `number` | `string`（有効な値は `'auto'`、`2` そして `3` です）
- デフォルト: `'auto'`

## babel

> JavaScript や Vue ファイル用に Babel の設定をカスタマイズします。デフォルトでは `.babelrc` は無視されます。

- 型: `Object`
- `babel-loader` [オプション](https://github.com/babel/babel-loader#options) と `babel` [オプション](https://babeljs.io/docs/en/options) を参照してください
- デフォルト:

  ```js
  {
    babelrc: false,
    cacheDirectory: undefined,
    presets: ['@nuxt/babel-preset-app']
  }
  ```

[@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/blob/dev/packages/babel-preset-app/src/index.js) のデフォルトのターゲットは `client` ビルドでは `ie: '9'`、`server` ビルドでは `node: 'current'` です。

### presets

- 型: `Function`
- 引数:
  1. `Object`: { isServer: true | false }
  2. `Array`:
     - プリセット名 `@nuxt/babel-preset-app`
     - `@nuxt/babel-preset-app` の[`options`](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app#options)

**注意**: `build.babel.presets` で設定されたプリセットはクライアントとサーバー両方のビルドに適用されます。ターゲットは（クライアント/サーバー）それぞれに応じて Nuxt によって設定されます。クライアントビルドとサーバービルドで異なるプリセットの設定をしたい場合は、関数として `presets`を使用してください:

> 以下のカスタマイズの代わりにデフォルトのプリセットを使用することを**強くおすすめします**

```js
export default {
  build: {
    babel: {
      presets({ isServer }, [ preset, options ]) {
        // change options directly
        options.targets = isServer ? ... :  ...
        options.corejs = ...
        // return nothing
      }
    }
  }
}
```

またはプリセットのリスト全体を返すことによってデフォルトの値を上書きします:

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
            // Other presets
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

> [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin#options) と [cache-loader](https://github.com/webpack-contrib/cache-loader#cache-loader) を使ってキャッシュを有効化します

## cssSourceMap

- 型: `boolean`
- デフォルト: 開発モードでは `true`、プロダクションモードでは `false`

> CSS ソースマップのサポートを有効にします

## devMiddleware

- 型: `Object`

利用できるオプションは [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) を参照してください。

## devtools

- 型: `boolean`
- デフォルト: `false`

[vue-devtools](https://github.com/vuejs/vue-devtools) の検査を許可するかどうかを設定します。

既に nuxt.config.js などで有効化している場合は、このフラグに関係なく devtools が有効になります。

## extend

> クライアント及びサーバーのバンドルについて webpack の設定を手動で拡張します。

- 型: `Function`

extend メソッドは一度はサーバーのバンドルのため、一度はクライアントのバンドルのため、計二度呼び出されます。メソッドの引数は次のとおりです:

1. webpack 設定オブジェクト
2. 次のキーを持つオブジェクト（`loaders` を除きすべてブーリアン）: `isDev`、`isClient`、`isServer`、`loaders`

<base-alert>

**警告:** 提供される `isClient` と `isServer` は [`context`](/docs/2.x/internals-glossary/context) で利用可能なキーとは別物です。これらのキーは非推奨では**ありません**。ここでは、`process.client` および `process.server` は `undefined` となるため使用しないでください。

</base-alert>

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isClient }) {
      // クライアントのバンドルの webpack 設定のみを拡張する
      if (isClient) {
        config.devtool = 'source-map'
      }
    }
  }
}
```

デフォルトの webpack の設定についてもう少し見たい場合は [webpack ディレクトリ](https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config)を参照してください。

### extend 内の loaders

`loaders` は [build.loaders](#loaders) と同じオブジェクト構造を持っているため、`extend` 内部の loaders のオプションを変えることができます。

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isClient, loaders: { vue } }) {
      // クライアントのバンドルの webpack 設定のみを拡張する
      if (isClient) {
        vue.transformAssetUrls.video = ['src', 'poster']
      }
    }
  }
}
```

## extractCSS

> Vue サーバーサイドレンダリング[ガイドライン](https://ssr.vuejs.org/ja/guide/css.html)を使って共通の CSS を抽出できるようにします。

- 型: `Boolean` または `Object`
- デフォルト: `false`

内部で [`extract-css-chunks-webpack-plugin`](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin/) が使われ、全ての CSS は別々のファイルに、通常はコンポーネントごとに 1 つ抽出されます。これは CSS と JavaScript を別々にキャッシュすることを可能にし、多くのグローバルまたは共通 CSS が存在する場合には試してみる価値があります。

例（`nuxt.config.js`）:

```js
export default {
  build: {
    extractCSS: true,
    // または
    extractCSS: {
      ignoreOrder: true
    }
  }
}
```

<base-alert type="info">

**注意:** Vue 2.5.18 以前では、このオプションを使用したときに重要な CSS のインポートが削除されるバグがありました。

</base-alert>

全ての CSS を 1 つのファイルに抽出したい場合があります。このための回避策があります:

<base-alert>

全てのファイルを 1 つのファイルに抽出することはおすすめしません。複数の CSS ファイルに抽出する方が、キャッシングとプリロードの分離には適しています。また、必要なリソースのみをダウンロードして解決することによって、ページのパフォーマンスを向上させることもできます。

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

> バンドルのファイル名をカスタマイズします。

- 型: `Object`
- デフォルト:

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

この例ではチャンク名を数値の id に変更します:

```js{}[nuxt.config.js]
export default {
  build: {
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
    }
  }
}
```

manifest の使い方をより理解するためにこの [webpack ドキュメント](https://webpack.js.org/guides/code-splitting/)を参照してください。

<base-alert>

ハッシュ化されていないベースのファイル名を本番環境で使用する場合、ほとんどのブラウザはアセットをキャッシュし、最初のロード時には変更を検出しないので注意してください。

</base-alert>

## friendlyErrors

- 型: `Boolean`
- デフォルト: `true` (上書きが有効）

[FriendlyErrorsWebpackPlugin](https://github.com/nuxt/friendly-errors-webpack-plugin) を使って上書きを有効にするか無効にするかを設定します。

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

**注意:** `html.minify` に変更を加えても、それらはデフォルトとマージされません！

ビルドプロセス中に作成された HTML ファイルを最小化するために使用される [html-minifier](https://github.com/kangax/html-minifier) プラグインの設定（*すべてのモード*に適用されます）。

## indicator

> 開発モードにおいて hot module replacement のビルドインジケータを表示する（`v2.8.0` 以上から利用可能）

- 型: `Boolean`
- デフォルト: `true`

![nuxt-build-indicator](https://user-images.githubusercontent.com/5158436/58500509-93ba0f80-8197-11e9-8524-e115c6d32571.gif)

## loaders

> Nuxt.js に統合された webpack loaders のカスタマイズオプション

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

> 注意: `nuxt.config.js` の設定で指定するだけでなく、[build.extend](#extend) でも設定を変更することができます

### loaders.file

> 詳細は [file-loader options](https://github.com/webpack-contrib/file-loader#options) を参照してください。

### loaders.fontUrl と loaders.imgUrl

> 詳細は [url-loader options](https://github.com/webpack-contrib/url-loader#options) を参照してください。

### loaders.pugPlain

> 詳細は [pug-plain-loader](https://github.com/yyx990803/pug-plain-loader) または [Pug compiler options](https://pugjs.org/api/reference.html#options) を参照してください。

### loaders.vue

> 詳細は [vue-loader options](https://vue-loader.vuejs.org/options.html) を参照してください。

### loaders.css と loaders.cssModules

> 詳細は [css-loader options](https://github.com/webpack-contrib/css-loader#options) を参照してください。注意: cssModules は [CSS Modules](https://vue-loader.vuejs.org/guide/css-modules.html#css-modules) を使うための loader オプションです。

### loaders.less

> Less specific オプションは `loaders.less` を介して `less-loader` に渡すことができます。dash-case で利用可能な全てのオプションについては [Less のドキュメント](http://lesscss.org/usage/#command-line-usage-options)を参照してください。

### loaders.sass と loaders.scss

> 利用可能な Sass のオプションについては [Sass のドキュメント](https://github.com/sass/dart-sass#javascript-api)を参照してください。注意: `loaders.sass` は [Sass Indented Syntax](http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html) 用です。

### loaders.vueStyle

> 詳細は [vue-style-loader options](https://github.com/vuejs/vue-style-loader#options) を参照してください。

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

`dev` または `analyze` モードでは `splitChunks.name` のデフォルト値は `true` です。

カスタマイズされたプラグインの配列に `minimizer` を設定するか、`minimize` を `false` にすることで全ての minimizer を無効にできます。（`minimize` はデフォルトで開発用に無効になっています）

[Webpack の最適化](https://webpack.js.org/configuration/optimization)を参照してください。

## optimizeCSS

- 型: `Object` または `Boolean`
- デフォルト:
  - `false`
  - `{}` when extractCSS is enabled

OptimizeCSSAssets プラグインのオプションです。

[NMFR/optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin) を参照してください。

## parallel

- 型: `Boolean`
- デフォルト: `false`
- ⚠️ 実験的機能です

> webpack のビルドで [thread-loader](https://github.com/webpack-contrib/thread-loader#thread-loader) を有効にする

## plugins

> webpack プラグインを追加する

- 型: `Array`
- デフォルト: `[]`

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

> [PostCSS Loader](https://github.com/postcss/postcss-loader#usage) プラグインをカスタマイズします

- 型: `Array`（レガシーな場合はデフォルトで上書きします）、`Object`（推奨）、`Function` または `Boolean`

  **注意:** Nuxt.js は [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env) を適用しました。デフォルトでは、[Stage 2 features](https://cssdb.org/) と [Autoprefixer](https://github.com/postcss/autoprefixer) が有効になっていますが、`build.postcss.preset` を使って設定できます。

- デフォルト:

  ```js{}[nuxt.config.js]
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

カスタムプラグイン設定は、デフォルトのプラグイン設定にマージされます (`Object` のかわりに `Array` を使っている場合を除きます）。

```js{}[nuxt.config.js]
export default {
  build: {
    postcss: {
      plugins: {
        // `postcss-url` の無効化
        'postcss-url': false,
        // プラグインの追加
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

postcss の設定が `Object` の場合、プラグインの順番の定義に `order` が利用できます:

- 型: `Array` (順序付けされたプラグイン名）、`String` (、`Function`
- デフォルト: `cssnanoLast`（最後に `cssnano` を配置する）

```js{}[nuxt.config.js]
export default {
  build: {
    postcss: {
      // プリセット名
      order: 'cssnanoLast',
      // 順序付けされたプラグイン名
      order: ['postcss-import', 'postcss-preset-env', 'cssnano']
      // プラグインの順番を算出するための関数
      order: (names, presets) => presets.cssnanoLast(names)
    }
  }
}
```

### postcss plugins と @nuxtjs/tailwindcss

@nuxtjs/tailwindcss の設定で postcss プラグイン（例えば postcss-pxtorem）を適用したい場合、順番を変更して最初に tailwindcss を読み込む必要があります。

**この設定は nuxt-purgecss には影響しません。**

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

## profile

- 型: `Boolean`
- デフォルト:コマンドライン引数 `--profile` で有効にします

> [WebpackBar](https://github.com/nuxt/webpackbar#profile) の profiler で有効にします

## publicPath

> Nuxt.js ではパフォーマンスの最大化のため dist ディレクトリ内のファイルを CDN にアップロードすることも可能です。そのためにはまず `publicPath` に CDN を指定します。

- 型: `String`
- デフォルト: `'/_nuxt/'`

```js{}[nuxt.config.js]
export default {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

設定後、`nuxt build` を実行する際に `.nuxt/dist/client` ディレクトリの内容を CDN にアップロードしてください。

Nuxt v2.15 以降では、実行時にこのプロパティの値を変更すると、既にビルドされているアプリケーションの設定が上書きされます。

## quiet

> ビルド出力ログの大半を抑制します

- 型: `Boolean`
- デフォルト: [std-env](https://github.com/blindmedia/std-env) によって `CI` または `test` 環境で検出された際に有効になります

## splitChunks

- 型: `Object`
- デフォルト:

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

`layout`、`pages` や `commons` で分割したコードの場合（共通ライブラリ:vue|vue-loader|vue-router|vuex...）

## ssr

> SSR レンダラー用の webpack バンドルを作成します。

- 型: `Boolean`
- デフォルト: ユニバーサルモードでのデフォルト値は `true`、spa モードでのデフォルト値は `false`

このオプションは、指定されていない場合は `mode` 値に基づいて自動的に設定されます。

## standalone

> サーバービルドにおいて依存関係をインラインでバンドル（アドバンスド）

- 型: `Boolean`
- デフォルト: `false`

このモードは通常サーバービルドで外部として保存される `node_modules` をバンドルします（[詳細](https://github.com/nuxt/nuxt.js/pull/4661)）。

<base-alert type="warning">\*_Warning_: ランタイムの依存関係（モジュール、`nuxt.config`、サーバーミドルウェア、静的ディレクトリ）はバンドルされていません。この機能は、server-bundle での [webpack-externals](https://webpack.js.org/configuration/externals/) の使用のみを無効にします。</base-alert>

<base-alert type="info">**Info:** コマンド `yarnnuxt build --standalone` を使用して、コマンドラインでこのモードを有効にすることができます。（`yarn` を使用していない場合は、`npx` を使用してコマンドを実行できます）</base-alert>

## styleResources

- 型: `Object`
- デフォルト: `{}`

<base-alert>

**警告:** このプロパティは非推奨です。パフォーマンスおよび開発体験の向上のために、代わりに [style-resources-module](https://github.com/nuxt-community/style-resources-module/) を使ってください。

</base-alert>

毎回インポートせずに変数やミックスインをページに挿入する必要がある場合に便利です。

Nuxt.js はこの動作を実現するために https://github.com/yenshih/style-resources-loader を使用しています。

特定のプリプロセッサ（`less`、`sass`、`scss` または `stylus`）に含めるパターン/パスを指定する必要があります:

ここではパスのエイリアス（`~` や `@`）を使用することができないため、相対パスまたは絶対パスを使用する必要があります。

```js{}[nuxt.config.js]
{
  build: {
    styleResources: {
      scss: './assets/variables.scss',
      less: './assets/*.less',
      // sass: ...,
      // scss: ...
      options: {
        // https://github.com/yenshih/style-resources-loader#options の
        // `patterns` プロパティ以外を参照してください
      }
    }
  }
}
```

## templates

> Nuxt.js では設定に基づいてレンダリングされる独自のテンプレートを提供できます。この機能は[モジュール](/docs/2.x/directory-structure/modules)を使う場合にとりわけ便利です。

- 型: `Array`

```js{}[nuxt.config.js]
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

Terser プラグインのオプションです。`false` を設定するとこのプラグインは無効になります。

`sourceMap` は webpack の `config.devtool` が `source-?map` と一致した場合に有効になります。

[webpack-contrib/terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin) を参照してください。

## transpile

- 型: `Array<String | RegExp | Function>`
- デフォルト: `[]`

特定の依存関係を Babel でトランスパイルしたい場合、`build.transpile` を追加することができます。transpile の項目はパッケージ名や依存関係のファイル名にマッチする文字列または正規表現オブジェクトになります。

`v2.9.0` からは条件付きでトランスパイルするために関数を使うこともできます。関数はオブジェクト（`{ isDev, isServer, isClient, isModern, isLegacy }`）を受け取ります:

```js{}[nuxt.config.js]
{
  build: {
    transpile: [({ isLegacy }) => isLegacy && 'ky']
  }
}
```

## vueLoader

> 注意: この設定は Nuxt 2.0 から削除されました。代わりに [`build.loaders.vue`](#loaders) を使ってください。

- 型: `Object`
- デフォルト:

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

> [Vue Loader オプション](https://vue-loader.vuejs.org/options.html)を指定します。

## watch

> 監視や変更後に再生成を行うカスタムファイルを提供することができます。この機能は[モジュール](/docs/2.x/directory-structure/modules)を使用する場合にとりわけ便利です。

- 型: `Array<String>`

```js{}[nuxt.config.js]
export default {
  build: {
    watch: ['~/.nuxt/support.js']
  }
}
```

## followSymlinks

> デフォルトでは、ビルドプロセスはシンボリックリンク内のファイルをスキャンしません。この boolean 値はスキャンするかどうかを含むため、followSymlinks を true に設定すると例えば「pages」フォルダなどでフォルダ内のシンボリックリンクを使うことができます。

- 型: `Boolean`

```js{}[nuxt.config.js]
export default {
  build: {
    followSymlinks: true
  }
}
```
