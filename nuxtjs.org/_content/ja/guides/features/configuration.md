---
title: 設定
description: Nuxt.js ではデフォルトの設定でほとんどのユースケースをカバーしています。nuxt.config.js を使ってこの設定を上書きすることができます。
position: 7
category: features
csb_link_host_port: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/07_configuration_host_port?fontsize=14&hidenavigation=1&theme=dark
csb_link_pre-processors: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/07_configuration_pre-processors?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: nuxt.config.js の axios モジュールを使えますか？
    answers:
      - 使えます
      - 使えません
    correctAnswer: 使えません
  - question: Nuxt.js 開発のサーバーホストのデフォルトは？
    answers:
      - localhost
      - 3000
      - '0'
    correctAnswer: localhost
  - question: SCSS を使うためにスタイルタグでどの属性を使いますか？
    answers:
      - lang="scss"
      - language="scss"
      - style="scss"
    correctAnswer: lang="scss"
  - question: Nuxt.js 開発サーバーポート番号のデフォルト値は？
    answers:
      - 8000
      - 3000
      - localhost
    correctAnswer: 3000
  - question: nuxt.config.js でグローバルな CSS ファイルを追加するためにどのプロパティを使いますか？
    answers:
      - styles
      - css
      - globalCss
    correctAnswer: css
  - question: Nuxt.js アプリケーションで JSX を使えますか？
    answers:
      - 使えます
      - 使えません
    correctAnswer: 使えます
  - question: nuxt.config.js で webpack の設定を拡張するためにどのプロパティを使いますか？
    answers:
      - webpack.extend
      - build.extend
      - extend.build
    correctAnswer: build.extend
  - question: Nuxt.js アプリケーションのファイルを無視するために呼び出されるファイルは？
    answers:
      - .ignore
      - .nuxtignore
      - .ignorenuxt
    correctAnswer: .nuxtignore
  - question: Nuxt.js アプリケーションの about ファイルを無視したい場合に使われるプレフィックスは？
    answers:
      - _about.vue
      - -about.vue
      - __about.vue
    correctAnswer: -about.vue
---

Nuxt.js ではデフォルトの設定でほとんどのユースケースをカバーしています。nuxt.config.js を使ってこの設定を上書きすることができます。

## css プロパティ

グローバルに（すべてのページで）適用したい CSS ファイル/モジュール/ライブラリを設定できます。

<base-alert>

`sass` を利用したい場合は  `node-sass` と `sass-loader` パッケージをインストールしてください。

</base-alert>

`nuxt.config.js` 内で CSS リソースを追加するには:

```js{}[nuxt.config.js]
export default {
  css: [
    // Node.js モジュールを直接ロードする（ここでは Sass ファイル）
    'bulma',
    // プロジェクト内の CSS ファイル
    '~/assets/css/main.css',
    // プロジェクト内の SCSS ファイル
    '~/assets/css/main.scss'
  ]
}
```

<base-alert>

Nuxt.js は拡張子から自動的にファイルタイプを推測して Webpack の適切なプリプロセッサローダを使用します。それらを使用する場合は各自で必要なローダをインストールしてください。

</base-alert>

### スタイルの拡張

nuxt の設定ファイルで、css プロパティの配列に記述する CSS/SCSS/Postcss/Less/Stylus/ などのファイルの拡張子は省略することができます。

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main', '~/assets/css/animations']
}
```

<base-alert>

`main.scss` と `main.css` のような同じ名前の 2 つのファイルが存在し、`css: ['~/assets/css/main']` のように css 配列中で拡張子を明示しなかった場合、`styleExtensions` の順番に応じて 1 つのファイルだけが読み込まれます。このケースの場合、`css` がデフォルトの `styleExtension` の配列の中で最初に登場するため、`css` ファイルだけが読み込まれ `scss` ファイルは無視されます。

</base-alert>

デフォルトの順番: `['css', 'pcss', 'postcss', 'styl', 'stylus', 'scss', 'sass', 'less']`

## プリプロセッサ

[Vue Loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html) のおかげで、`lang` 属性を使うだけで `<template>` や `<style>` などのためのさまざまなプリプロセッサを使うことができます。

[Pug](https://github.com/pugjs/pug) と [Sass](http://sass-lang.com/) を使った `pages/index.vue` の例:

```html{}[pages/index.vue]
<template lang="pug"> h1.red Hello {{ name }}! </template>

<style lang="scss">
  .red {
    color: red;
  }
</style>
```

これらのプリプロセッサを使うために Webpack のローダをインストールする必要があります:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D pug pug-plain-loader
yarn add -D sass sass-loader@10 fibers
```

  </code-block>
  <code-block label="npm">

```bash
npm install --save-dev pug pug-plain-loader
npm install --save-dev sass sass-loader@10 fibers
```

  </code-block>
</code-group>

<base-alert type="info">`fibers` がインストールされている場合、`sass` の同期コンパイル（2 倍速）が[自動的に有効になります](https://github.com/webpack-contrib/sass-loader)。</base-alert>

## 外部のリソース

### グローバルの設定

ヘッドオブジェクトまたは関数に外部リソースを含めることができます。[head API のドキュメント](https://nuxtjs.org/api/pages-head/)で説明したように、次の例ではオブジェクトや関数として `head` の使い方を示します。もし計算されたプロパティやデータなど、Vue コンポーネントの値を使いたい場合は、 `head()` 関数を使って最終的な head オブジェクトを返すことができます。オプションの `body: true` を各リソースに渡して、閉じる `</body>` タグの前にリソースを含めることもできます。

`nuxt.config.js`（ここでは head オブジェクト）にリソースを含めます:

```js
export default {
  head: {
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
      }
    ]
  }
}
```

### ローカルの設定

`pages/` ディレクトリ（ここでは head 関数）内の `.vue` ファイルにリソースを含めます:

```html
<template>
  <h1>About page with jQuery and Roboto font</h1>
</template>

<script>
  export default {
    head() {
      return {
        script: [
          {
            src:
              'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
          }
        ],
        link: [
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-family: Roboto, sans-serif;
  }
</style>
```

## PostCSS プラグイン

もし存在する場合、プロジェクトディレクトリにある `postcss.config.js` の名前を変更するか削除します。そして `nuxt.config.js` ファイルに以下を追加します:

```js
export default {
  build: {
    postcss: {
      // プラグイン名をキーとして、引数を値として追加します
      // npm または yarn を使って依存関係としてこれらを事前にインストールします
      plugins: {
        // false を値として渡しプラグインを無効にします
        'postcss-url': false,
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        // postcss-preset-env の設定を変更します
        autoprefixer: {
          grid: true
        }
      }
    }
  }
}
```

## JSX

Nuxt.js は babel のデフォルトの設定用の公式の  [@vue/babel-preset-app](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app) に基づいた  [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app) を使用しています。そのため、コンポーネントに JSX を使うことができます。

コンポーネントの `render` メソッド内で JSX が使えます:

```js
<script>
export default {
  data () {
    return { name: 'World' }
  },
  render (h) {
    return <h1 class="red">{this.name}</h1>
  }
}
</script>
```

`createElement` を `h` にエイリアスすることは、Vue のエコシステムで見られる共通の慣例です。しかしその慣例は JSX では任意です。なぜなら ES2015 の構文で宣言された（関数またはアロー関数ではない）JSX で書かれた任意のメソッドやゲッターには `const h = this.$createElement` が[自動的にインジェクト](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection) されるためです。よって `(h)` パラメータは削除することができます。

JSX の使い方をより深く理解するには Vue.js ドキュメントの [JSX のセクション](https://vuejs.org/v2/guide/render-function.html#JSX)を参照してください。

## ファイルの無視

### .nuxtignore

`.nuxtignore` を使用することで、ビルド時にプロジェクトルート（`rootDir`）にある `layout`、`page`、`store` そして `middleware` のファイルを Nuxt.js に無視させることができます。`.nuxtignore` ファイルは `.gitignore` や `.eslintignore` と同じ仕様に従います。各行はどのファイルを無視するかを示す glob パターンです。

```markdown{}[.nuxtignore]
# foo.vue レイアウトを無視する

layouts/foo.vue

# ファイル名が -ignore.vue で終わるレイアウトファイルを無視する

layouts/\*-ignore.vue

# bar.vue ページを無視する

pages/bar.vue

# ignore フォルダにあるページを無視する

pages/ignore/\*.vue

# bar.js ストアを無視する

store/baz.js

# _.test._ にマッチするストアファイルを無視する

store/ignore/_.test._

# foo フォルダにある foo/bar.js 以外のミドルウェアファイルと無視する

middleware/foo/\*.js !middleware/foo/bar.js
```

### ignorePrefix プロパティ

pages/、layout/、middleware/ や store/ ディレクトリに含まれる、ファイル名が ignorePrefix プロパティで指定された接頭辞から始まっているファイルはビルド時に無視されます。

デフォルトでは `-` から始まる `store/-foo.js` や `pages/-bar.vue` のようなファイルはすべて無視されます。これにより、ルートやストア等に変換されることなく、呼び出し元と同じ場所にテスト、ユーティリティ、コンポーネントなどのファイルを置くことができます。

### ignore プロパティ

ignorePrefix よりカスタマイズしやすいです: ignore プロパティに指定した glob パターンと一致するすべてのファイルがビルド時に無視されます。

```js{}[nuxt.config.js]
export default {
  ignore: 'pages/bar.vue'
}
```

### ignoreOptions

`nuxtignore` は内部で `node-ignore` を使用しています。`ignoreOptions` は `node-ignore` の `options` として設定されます。

```js{}[nuxt.config.js]
export default {
  ignoreOptions: {
    ignorecase: false
  }
}
```

## webpack config を拡張する

`nuxt.config.js` 内の `extend` オプションを通して nuxt の webpack 設定を拡張できます。`build` プロパティの `extend` オプションは 2 つの引数を受け取る関数です。 第一引数は nuxt の webpack 設定からエクスポートされた webpack `config` オブジェクトです。第二引数はこれらの Boolean 型のプロパティを持つ context オブジェクトです: `{ isDev, isClient, isServer, loaders }`。

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isDev, isClient }) {
      // ..
      config.module.rules.push({
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      })
      // `isDev` が true の場合、webpack を開発モードに設定します。
      if (isDev) {
        config.mode = 'development'
      }
    }
  }
}
```

`extend` メソッドは 2 回呼び出されます - 1 回目はクライアントのバンドルため、もう 1 回はサーバーのバンドルのためです。

### チャンク設定をカスタマイズする

デフォルトのオブジェクトを書き換えずに [最適化構成](/docs/2.x/configuration-glossary/configuration-build#optimization) を微調整することができます。

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.optimization.splitChunks.maxSize = 200000
      }
    }
  }
}
```

### webpack 設定の検査

複雑なプロジェクトやデバッグの場合、最終的な webpack 構成がどのようになるかを確認すると便利な場合があります。幸い、プロジェクトから `nuxt webpack` コマンドを実行して設定を出力できます。詳細については、[#7029](https://github.com/nuxt/nuxt.js/pull/7029) の PR を確認してください。

### webpack プラグインの追加

`nuxt.config.js` ファイルの `build` オプションを使うと、[`webpack.config.js` ファイル](https://webpack.js.org/configuration/plugins/)と同じ方法で webpack `plugins` を渡すことができます。

この例では JavaScript モジュール（_lodash_ と _jQuery_）を `import` や `require` するかわりに自動的にロードする webpack ビルトインの [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/)を追加します。

```js
import webpack from 'webpack'

export default {
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        // グローバルモジュール
        $: 'jquery',
        _: 'lodash'
      })
    ]
  }
}
```

> 注意: Vue ベースのアプリケーションでは jQuery は必要ないかもしれません。

Nuxt を使うと、プラグインの実行コンテキストを制御することもできます。もしプラグインが [`build.extend`](/docs/2.x/configuration-glossary/configuration-build#extend) 内の `client` または `server` ビルド（または `dev` ビルドと `prod` ビルドを区別する）で実行されることを意図している場合 、webpack プラグインを手動で渡すこともできます。

### Webpack を拡張してオーディオファイルをロードする

オーディオファイルは `file-loader` で処理する必要があります。このローダーはすでにデフォルトの Webpack 設定に含まれていますが、オーディオファイルを処理するように設定されていません。`nuxt.config.js` でデフォルトの設定を拡張する必要があります:

```js
export default {
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  }
}
```

これでオーディオファイルを `<audio :src="require('@/assets/water.mp3')" controls></audio>` のようにインポートできます。

`<audio src="@/assets/water.mp3" controls></audio>` だけ書きたい場合、`src` 属性でこれらを参照する際に `vue-loader` に自動的にオーディオファイルを要求するように支持する必要があります:

```js
export default {
  build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: 'src'
        }
      }
    },

    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  }
}
```

## ホストとポート番号を編集する

デフォルトでは、Nuxt.js の開発サーバーのホストは `localhost`（ホストマシン内からのみアクセス可能）です。アプリケーションを他のデバイスで確認するにはホストを修正する必要があります。nuxt.config.js ファイルでホストを修正することができます。

ホストの `'0.0.0.0'` は、ホストマシンの _外部_ からの接続（例えば LAN）でもアクセスが可能なホストアドレスを解決するように Nuxt.js に指示します。ホストに `'0'`（0 ではありません）や `'0.0.0.0'` という文字列が指定された場合、ローカル IP アドレスが Nuxt.js に割り振られます。

```js{}[nuxt.config.js]
export default {
  server: {
    host: '0' // デフォルト: localhost
  }
}
```

ポート番号をデフォルトの 3000 から変更することもできます。

```js{}[nuxt.config.js]
export default {
  server: {
    port: 8000 // デフォルト: 3000
  }
}
```

<base-alert type="info">

ポート番号に `'0'`（0 ではなく falsy）という文字列の値が指定された場合、ランダムなポートが Nuxt.js アプリケーションに割り振られます。

</base-alert>

nuxt.config.js ファイル内で変更することはできますが、サイトをホスティングする際に問題が発生する場合があるのでおすすめしません。dev コマンドで直接ホストとポートを指定することをおすすめします。

```bash
HOST=0 PORT=8000 npm run dev
```

または package.json 内でスクリプトを作成します。

```json
"scripts": {
  "dev:host": "nuxt --hostname '0' --port 8000"
}
```

## 非同期な設定

通常の `export default {}` を使用した設定をするのが望ましいですが、config オブジェクトを返却する非同期な関数をエクスポートすることで非同期な設定をすることができます。

```js{}[nuxt.config.js]
import axios from 'axios'

export default async () => {
  const data = await axios.get('https://api.nuxtjs.dev/posts')
  return {
    head: {
      title: data.title
      //... 残りの設定
    }
  }
}
```

<base-alert>

`nuxt.config.js` 内で axios-module を使うことはできません。axios をインポートして再度設定する必要があります。

</base-alert>

## さらなる設定

<base-alert type="next">

`nuxt.config.js` には、カスタマイズや設定オプションがたくさんあります！[build の設定](/docs/2.x/configuration-glossary/configuration-build)ですべてのキーを確認しましょう。

</base-alert>

<quiz :questions="questions"></quiz>
