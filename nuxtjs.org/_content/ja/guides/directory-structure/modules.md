---
title: モジュール
description: Nuxt.js はコア機能を拡張できるようにする高度なモジュールシステムを提供します。モジュールは Nuxt.js 起動時に順番に呼び出される関数です。
position: 9
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/10_modules?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/modules.svg
imgAlt: modules-in-nuxt-js
questions:
  - question: モジュールはいつ呼ばれますか？
    answers:
      - Nuxt.js 開始前
      - Nuxt.js 実行中
      - Nuxt.js 開始後
    correctAnswer: Nuxt.js 開始前
  - question: Nuxt.js モジュールは npm パッケージに組み込むことができますか？
    answers:
      - true
      - false
    correctAnswer: true
  - question: nuxt.config.js ファイルのどのプロパティでモジュールを追加しますか？
    answers:
      - nuxtModules
      - modules
      - plugins
    correctAnswer: modules
  - question: nuxt.config.js ファイルにモジュールをに追加する際、順序は重要ですか？
    answers:
      - true
      - false
    correctAnswer: true
  - question: 開発およびビルド時にのみ必要なモジュールはどこに追加しますか？
    answers:
      - modules
      - build
      - buildModules
    correctAnswer: buildModules
  - question: モジュールは正確に言うと？
    answers:
      - 配列
      - 関数
      - プラグイン
    correctAnswer: 関数
  - question: Nuxt.js の初期化中だけでなく特定の条件でのみ処理を実行したい場合は何を使いますか？
    answers:
      - plugins
      - hooks
      - asyncData
    correctAnswer: hooks
  - question: モジュールができることは
    answers:
      - npm パッケージとしてのみ使われます
      - プロジェクトのソースコードに調節含めることができます
      - 両方
    correctAnswer: 両方
  - question: モジュールを npm パッケージとして公開する場合どれが必要ですか？
    answers:
      - module.exports
      - module.exports.meta
      - module.exports.module
    correctAnswer: module.exports.meta
  - question: オプションとしてオプションのパラメーターを使ってモジュールをロードするように Nuxt.js に指示できますか？
    answers:
      - true
      - false
    correctAnswer: true
---

## Nuxt モジュールを探す

Nuxt プロジェクトを強化するために、Nuxt チームとコミュニティによって作成された[モジュールの一覧](https://modules.nuxtjs.org)を見てください。

- 165 以上のモジュール
- 105 人以上のメンテナー

<base-alert type="next">

[modules.nuxtjs.org](https://modules.nuxtjs.org) を確認してください。

</base-alert>

<app-modal :src="img" :alt="imgAlt"></app-modal>

Nuxt.js を使って本番相当のアプリケーションを開発しているときに、フレームワークのコア機能が十分でないことに気付くかもしれません。Nuxt.js は設定オプションとプラグインで拡張できますが、複数のプロジェクト間でこれらのカスタマイズを維持するのは面倒で反復的で時間がかかります。一方、すべてのプロジェクトのニーズをすぐにサポートすると、Nuxt.js は非常に複雑になり使いにくくなります。

これが Nuxt がコア機能を簡単に拡張できるようにするために、より高度なモジュールシステムを導入する理由の 1 つです。モジュールは Nuxt 起動時に順番に呼び出される関数です。フレームワークは Nuxt が処理を続ける前に各モジュールが処理を完了するまで待機します。このようにして、モジュールは Nuxt のほとんどすべての項目をカスタマイズできます。Webpack の [Tapable](https://github.com/webpack/tapable) に基づいた Nuxt のモジュール設計のおかげで、モジュールは例えばビルドの初期化のような特定のエントリーポイントにフックを簡単に登録できます。また、モジュールはテンプレートの上書き、webpack ローダーの設定、CSS ライブラリの追加、その他多くの便利なタスクを実行することができます。

素晴らしいことに Nuxt モジュールは npm パッケージに組み込めます。これによりてプロジェクト間で再利用したり、コミュニティでシェアすることができるようになり、高品質なアドオンのエコシステムを作成できます。

## modules プロパティ

モジュールは Nuxt.js の拡張機能であり、フレームワークのコア機能を拡張し無限に組み込めます。一度モジュールをインストールすると、nuxt.config.js ファイルの modueles プロパティにモジュールを追加できます。

```js{}[nuxt.config.js]
export default {
  modules: [
    // 使うパッケージ名
    '@nuxtjs/axios',

    // プロジェクトのソースディレクトリの相対パス
    '~/modules/awesome.js',

    // オプションの提供
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // インライン定義
    function () {}
  ]
}
```

<base-alert type="info">

モジュール開発者は通常、使い方について追加で必要な手順と詳細を提供します。

</base-alert>

Nuxt.js は node が要求するパス（`node_modules` 内）を使ってモジュール配列内の各項目を解決しようとします。`@` エイリアスが使われている場合はプロジェクトの  `srcDir`  から解決します。

<base-alert>

モジュールは順番に実行されるため、順序が重要です。

</base-alert>

モジュールはビルドや実行を強化する関数をエクスポートし、オプションでジョブが終了するまで promise を返す必要があります。実行時にインポートされるので、最新の ES6 機能を使っている場合は事前にトランスパイルする必要があることに注意してください。

## 独自のモジュールを書く

モジュールは関数です。モジュールは npm モジュールとしてパッケージ化することもプロジェクトのソースコードに直接含めることもできます。

```js{}[nuxt.config.js]
export default {
  exampleMsg: 'hello',
  modules: [
    // シンプルな使い方
    '~/modules/example',
    // オプションを直接渡す
    ['~/modules/example', { token: '123' }]
  ]
}
```

```js{}[modules/example.js]
export default function ExampleModule(moduleOptions) {
  console.log(moduleOptions.token) // '123'
  console.log(this.options.exampleMsg) // 'hello'

  this.nuxt.hook('ready', async nuxt => {
    console.log('Nuxt is ready')
  })
}

// モジュールを npm パッケージとして公開する場合は必須
module.exports.meta = require('./package.json')
```

## 1) ModuleOptions

`moduleOptions`: これは `modules` の配列を利用するために、モジュールの利用者から渡されるオブジェクトです。これを使うことで modules のふるまいをカスタマイズすることができます。

### トップレベルのオプション

`nuxt.config.js` にモジュールを登録するときにトップレベルでオプションを使えると便利な場合があります。このオプションにより、複数のオプションソースを組み合わせることができます。

```js{}[nuxt.config.js]
export default {
  modules: [['@nuxtjs/axios', { anotherOption: true }]],

  // axios モジュールは `this.options.axios` を使ってこのオプションを認識します
  axios: {
    option1,
    option2
  }
}
```

## 2) this.options

`this.options`: このリファレンスを使って Nuxt.js オプションに直接アクセスできます。これはすべてのデフォルトオプションが割り当てられたユーザーの `nuxt.config.js` のコンテンツです。モジュール間の共有オプションに使用えます。

```js{}[module.js]
export default function (moduleOptions) {
  // `options` には option1、option2、anotherOption が含まれます
  const options = Object.assign({}, this.options.axios, moduleOptions)

  // ...
}
```

### CSS ライブラリの追加

モジュールが CSS ライブラリを提供する場合は、重複を避けるためにユーザーがすでにライブラリを含んでいるかどうかを確認し、モジュールで CSS ライブラリを無効にするオプションを追加してください。

```js{}[module.js]
export default function (moduleOptions) {
  if (moduleOptions.fontAwesome !== false) {
    // Font Awesome を追加
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```

### アセットの出力

ビルド中にアセットを出力するために webpack プラグインを登録できます。

```js{}[module.js]
export default function (moduleOptions) {
  const info = 'Built by awesome module - 1.3 alpha on ' + Date.now()

  this.options.build.plugins.push({
    apply(compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        // info 変数の内容を含む `.nuxt/dist/info.txt` が生成されます。
        // ソースもバッファにすることができます
        compilation.assets['info.txt'] = {
          source: () => info,
          size: () => info.length
        }

        cb()
      })
    }
  })
}
```

## 3) this.nuxt

`this.nuxt`: これは現在の Nuxt.js インスタンスへの参照です。特定のライフサイクルイベントにフックを登録できます。

- **Ready** : Nuxt は動作する準備ができています（ModuleContainer とレンダラーの準備ができます）。

```js
nuxt.hook('ready', async nuxt => {
  // カスタムコードはここに記述する
})
```

- **Error**: フックを呼び出すときに捕まえられなかったエラーです。

```js
nuxt.hook('error', async error => {
  // カスタムコードはここに記述する
})
```

- **Close**: Nuxt インスタンスは正常に終了します。

```js
nuxt.hook('close', async nuxt => {
  // カスタムコードはここに記述する
})
```

- **Listen**: Nuxt の内部サーバーがリッスンを開始します（nuxt start または nuxt dev を使います）

```js
nuxt.hook('listen', async (server, { host, port }) => {
  // カスタムコードはここに記述する
})
```

`this`: モジュールのコンテキストです。すべてのモジュールは、ModuleContainer インスタンスのコンテキスト内で呼び出されます。

利用可能なメソッドについては  [ModuleContainer](/docs/2.x/internals-glossary/internals-module-container)  クラスのドキュメントを参照してください。

### 特定のフックでタスクを実行する

モジュールは Nuxt.js の初期化中だけでなく、特定の条件でのみ処理を実行する必要がある場合があります。強力な Nuxt.js フックを使って特定のイベントでタスクを実行できます（[Hookable](https://github.com/nuxt-contrib/hookable) に基づきます）。Nuxt.js は Promise か `async` として定義された関数が返されるのを待ちます。

基本的な例をいくつか提示します:

```js{}[modules/myModule.js]
export default function myModule() {
  this.nuxt.hook('modules:done', moduleContainer => {
    // これはすべてのモジュールのロードが終了したときに呼び出されます
  })

  this.nuxt.hook('render:before', renderer => {
    // レンダラーが作成された後に呼び出されます
  })

  this.nuxt.hook('build:compile', async ({ name, compiler }) => {
    // コンパイラ（デフォルト: webpack）が起動する前に呼び出されます
  })

  this.nuxt.hook('generate:before', async generator => {
    // これは Nuxt がページを生成する前に呼び出されます
  })
}
```

### 提供されるプラグイン

モジュールが追加されると、1 つ以上のプラグインを提供するのが一般的です。たとえば、[bootstrap-vue](https://bootstrap-vue.js.org/) モジュールは自分自身を Vue に登録する必要があります。このような状況では `this.addPlugin` ヘルパーが使えます。

```js{}[plugin.js]
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```

```js{}[module.js]
import path from 'path'

export default function nuxtBootstrapVue(moduleOptions) {
  // `plugin.js` テンプレートを登録する
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

### テンプレートプラグイン

登録済みのテンプレートとプラグインは [lodash テンプレート](https://lodash.com/docs/4.17.4#template)を利用して登録済みのプラグインの出力を条件付きで変更できます。

```js{}[plugin.js]
// Set Google Analytics UA
ga('create', '<%= options.ua %>', 'auto')

<% if (options.debug) { %>
// Dev only code
<% } %>
```

```js{}[module.js]
import path from 'path'

export default function nuxtGoogleAnalytics(moduleOptions) {
  // `plugin.js` テンプレートを登録する
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      // プラグインをプロジェクトにコピーするとき Nuxt は `options.ua` を `123` に置き換えます
      ua: 123,

      // dev を含む条件付きパーツは本番ビルドのプラグインコードから削除されます
      debug: this.options.dev
    }
  })
}
```

### カスタム webpack ローダーの登録

`this.extendBuild` を使って `nuxt.config.js` の `build.extend` と同じことが行えます。

```js{}[module.js]
export default function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
      // `.foo` ローダー
      config.module.rules.push({
        test: /\.foo$/,
        use: [...]
      })

      // 既存のローダーをカスタマイズします
      // Nuxt 内部のソースコードを参照してください:
      // https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```

## 非同期モジュール

すべてのモジュールがすべてを同期的に実行するわけではありません。たとえば、API でデータを取得したり非同期操作を実行したりする必要があるモジュールを開発したい場合があります。このため、Nuxt.js は Promise を返すか、コールバックを呼び出すことができる非同期モジュールをサポートしています。

### async/await を使う

```js
import fse from 'fs-extra'

export default async function asyncModule() {
  // ここで `async`/`await` を使って非同期作業が行えます
  const pages = await fse.readJson('./pages.json')
}
```

### Promise を返す

```js
export default function asyncModule($http) {
  return $http
    .get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      // Nuxt ルートを拡張して何かをする
    })
}
```

<base-alert type="info">

モジュールにはもっと多くのフックと可能性があります。Nuxt 内部の API についての詳細は [NuxtInternals](/docs/2.x/internals-glossary/internals) を参照してください。

</base-alert>

## モジュールを公開する

`module.exports.meta`: モジュールを npm パッケージとして公開する場合はこの行が必要です。Nuxt は内部的にメタを使ってパッケージをより適切に処理します。

```js{}[modules/myModule.js]
module.exports.meta = require('./package.json')
```

## buildModules

一部のモジュールは開発およびビルド時にのみインポートされます。`buildModules`  を使うと本番環境での起動が速くなり、本番環境での `node_modules` のサイズが大幅に削減されます。各モジュールのドキュメントを参照し `modules` または  `buildModules` の使用が推奨されているかどうかを確認してください。

使い方の違いは以下の通りです:

- `nuxt.config.js` に `modules` を追加するかわりに `buildModules` を使います

```js{}[nuxt.config.js]
export default {
  buildModules: ['@nuxtjs/eslint-module']
}
```

- `package.json` に `dependencies` を追加するかわりに `devDependencies` を使います

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D @nuxtjs/eslint-module
```

  </code-block>
  <code-block label="npm">

```bash
npm install --save-dev @nuxtjs/eslint-module
```

  </code-block>
</code-group>

<base-alert type="info">

モジュール作成者の場合、パッケージを  `devDependency` としてインストールし、`nuxt.config.js` では  `modules`  のかわりに  `buildModules`  を使うことをユーザーに提案することを強くおすすめします。

</base-alert>

次の場合を除いてモジュールは `buildModule` です:

- serverMiddleware を提供している
- Node.js ランタイムフックを登録する必要がある（例えば Sentry）
- vue-renderer の動作に影響しているか、`server:`  または `vue-renderer:` 名前空間からのフックを使っている
- webpack スコープ外のその他のもの（ヒント: プラグインとテンプレートはコンパイルされ、webpack スコープ内にある）

<base-alert> 

`buildModules` を使って提供する場合、この機能は Nuxt v2.9 以降から利用可能であることに注意してください。昔からのユーザーは、Nuxt をアップグレードするか `modules` セクションを使う必要があります。

</base-alert>

<quiz :questions="questions"></quiz>
