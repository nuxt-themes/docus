---
title: モジュール
description: モジュールは、Nuxt.js のコア機能を拡張し、無限のインテグレーションを加える Nuxt.js の拡張機能です。
category: getting-started
position: 109
---

> モジュールは、Nuxt.js のコア機能を拡張し、無限のインテグレーションを加える Nuxt.js の拡張機能です。

## はじめに

Nuxt を使ってプロダクションレベルのアプリケーションを開発していると、Nuxt のコア機能が十分ではないことにすぐに気が付くでしょう。Nuxt はオプション設定やプラグインにより拡張できますが、複数のプロジェクトにわたってそれらのカスタマイズをメンテナンスしていくことは、退屈で、繰り返される、時間を浪費する作業です。しかし一方であらゆるプロジェクトのニーズを盛り込んでしまうと、Nuxt がとても複雑になり使いづらいものになってしまうでしょう。

これが Nuxt が、コア機能を簡単に拡張できるようにするために、より高度なモジュールシステムを導入する理由の 1 つです。モジュールは、Nuxt 起動時に順番に呼び出される、シンプルな**関数**です。フレームワークは Nuxt が処理を続けるよりも前に、各モジュールが処理を完了するまで待機します。このようにして、モジュールは Nuxt のほとんどすべての項目をカスタマイズできます。Webpack の [Tapable](https://github.com/webpack/tapable) に基づいた Nuxt のモジュール設計のおかげで、モジュールは例えばビルドの初期化のような特定のエントリーポイントに、フックを簡単に登録できるのです。また、モジュールはテンプレートの上書き、webpack のローダーの設定、CSS ライブラリの追加、その他多くの便利なタスクを実行することができます。

素晴らしいことに Nuxt モジュールは npm パッケージと統合できます。したがって複数のプロジェクト間で再利用したり、Nuxt コミュニティでシェアすることが容易にできます。そして高品質の Nuxt アドオンのエコシステムをつくっていくことに繋がるでしょう。

もしあなたが下記に該当するならば、モジュールはきっと役に立ってくれるでしょう:

- 新しいプロジェクトを素早く立ち上げる必要がある**アジャイル・チーム**のメンバーである。
- Google Analytics を統合するようなお決まりのタスクのための車輪の**再発明**にうんざりしている。
- 愛すべき**オープンソース**熱狂者であり、あなたの成果をコミュニティと簡単に**シェア**したいと思っている。
- **品質**と**再利用性**が重視される**エンタープライズ**企業に所属している。
- いつもタイトな締切に追われており、いろいろな新しいライブラリや統合の詳細を深く調べる時間がない。
- 低レベルのインターフェースの破壊的な変更への対応にうんざりしていて、**とにかく動くもの**を必要としている。

## Nuxt.js 公式モジュール一覧

Nuxt.js チームが提供している **公式** モジュール:

- [@nuxt/http](https://http.nuxtjs.org): [ky-universal](https://github.com/sindresorhus/ky-universal) をベースにしており、軽量でユニバーサルな HTTP リクエストを送ります
- [@nuxt/content](https://content.nuxtjs.org): `content` ディレクトリへの書き込みや、MongoDB のような API を通した Markdown や JSON、YAML、CSV ファイルの取得をします
- [@nuxtjs/axios](https://axios.nuxtjs.org): セキュアかつ簡単に Axios と Nuxt.js とを統合し、HTTP リクエストを送ります
- [@nuxtjs/pwa](https://pwa.nuxtjs.org): 十分にテストされアップデートされた安定した PWA ソリューションを Nuxt に提供します
- [@nuxtjs/auth](https://auth.nuxtjs.org): Nuxt.js のための認証モジュールです。さまざまなスキームやストラテジーを提供します

コミュニティによって作成されたモジュール一覧は https://awesomejs.dev/for/nuxt/ と https://github.com/topics/nuxt-module で確認できます。

## 基本的なモジュールを書く

既に言及されているように、モジュールはただの関数です。npm モジュールとしてパッケージングしたり、あるいはプロジェクトのソースコードに直接インクルードすることができます。

**modules/simple.js**

```js
export default function SimpleModule(moduleOptions) {
  // ここにあなたのコードを書く
}

// モジュールを npm パッケージとして公開するのであれば必須
// module.exports.meta = require('./package.json')
```

**`moduleOptions`**

これは `modules` の配列を利用するために、モジュールの利用者から渡されるオブジェクトです。これを使うことで modules のふるまいをカスタマイズすることができます。

**`this.options`**

この参照を利用して Nuxt options へ直接アクセスすることができます。これはすべてのデフォルトのオプションがアサインされた、ユーザーの `nuxt.config.js` の内容です。モジュール間で共有されるオプションとして利用できます。

**`this.nuxt`**

現在の Nuxt インスタンスへの参照です。利用可能なメソッドは [Nuxt クラスのドキュメント](/api/internals-nuxt) を参照してください。

**`this`**

モジュールのコンテキストです。利用可能なメソッドは [モジュールコンテナ](/api/internals-module-container) クラスのドキュメントを参照してください。

**`module.exports.meta`**

この行は npm パッケージとして公開するときは**必須**です。Nuxt はあなたのパッケージをより良く機能させるために、内部でメタ情報を利用します。

**nuxt.config.js**

```js
export default {
  modules: [
    // シンプルな使い方
    '~/modules/simple'[
      // 直接オプションを渡す
      ('~/modules/simple', { token: '123' })
    ]
  ]
}
```

それから Nuxt にプロジェクトでいくつかの特定のモジュールをロードするよう伝えます。その際に任意のパラメーターを options として渡すようにします。詳しくは [モジュール設定](/api/configuration-modules) を参照してください。

## 非同期モジュール

すべてのモジュールが同期的に処理を行うわけではありません。例えばどこかの API からフェッチしたり IO を非同期的に扱うモジュールを開発したい場合もあるでしょう。このような場合のために Nuxt は Promise を返したりコールバックを呼び出す非同期モジュールをサポートしています。

## ビルド専用モジュール

通常、モジュールは開発時とビルド時のみ必要です。`buildModules` を使用すると、本番環境の起動を高速化し、本番環境のデプロイで `node_modules` のサイズを大幅に削減することができます。あなたがモジュールの作成者である場合、あなたのパッケージを `devDependency` としてインストールし、`nuxt.config.js` の `modules` ではなく `buildModules` を使用するよう、ユーザーに提案することをお勧めします。

次の場合を除き、モジュールは `buildModule` です：

- serverMiddleware を提供している
- Node.js ランタイムフックを登録する必要がある（sentry のように）
- vue-renderer の動作に影響を与えているか、`server:` または `vue-renderer:` ネームスペースのフックを使用している
- webpack スコープ外にあるその他のもの（ヒント：プラグインとテンプレートはコンパイルされ、webpack スコープ内にあります）

<div class="Alert Alert--orange">

<b>注意：</b> <code>buildModules</code> を使用する場合、この機能は Nuxt <b>v2.9</b> 以降でのみ使用することが可能です。 古いユーザーは Nuxt をアップグレードするか、<code>modules</code> セクションを使用する必要があります。

</div>

### async/await を利用する

```js
import fse from 'fs-extra'

export default async function asyncModule() {
  // `async`/`await` を使って非同期処理ができる
  const pages = await fse.readJson('./pages.json')
}
```

### Promise を返す

```js
import axios from 'axios'

export default function asyncModule() {
  return axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      // Nuxt のルートを拡張して何かの処理を行う
    })
}
```

## 共通のスニペット

### トップレベルのオプション

`nuxt.config.js` に登録しているモジュールのトップレベルのオプションを使用すると、より便利な時があります。オプションは複数組み合わせることができます。

**nuxt.config.js**

```js
export default {
  modules: [['@nuxtjs/axios', { anotherOption: true }]],

  // axios モジュールは下記のオプションを `this.options.axios` で利用できることを知っている
  axios: {
    option1,
    option2
  }
}
```

**module.js**

```js
export default function (moduleOptions) {
  // `options` は option1, option2 そして anotherOption を含む
  const options = Object.assign({}, this.options.axios, moduleOptions)

  // ...
}
```

### プラグインを提供する

モジュールが追加されるときに、1 つ以上のプラグインを提供することは一般的です。例えば [bootstrap-vue](https://bootstrap-vue.js.org) モジュールは bootstrap-vue モジュール自身を Vue に登録することを求めます。このようなケースのため `this.addPlugin` ヘルパーが用意されています。

**plugin.js**

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```

**module.js**

```js
import path from 'path'

export default function nuxtBootstrapVue(moduleOptions) {
  // `plugin.js` テンプレートを登録する
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

### テンプレートプラグイン

登録されたテンプレートやプラグインは、登録されたプラグインの出力を条件に応じて変更するために [lodash templates](https://lodash.com/docs/4.17.4#template) を利用できます。

**plugin.js**

```js
// Google Analytics UA をセットする
ga('create', '<%= options.ua %>', 'auto')

<% if (options.debug) { %>
// 開発時のみのコード
<% } %>
```

**module.js**

```js
import path from 'path'

export default function nuxtGoogleAnalytics(moduleOptions) {
  // `plugin.js` テンプレートを登録する
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      // Nuxt はプラグインをプロジェクトにコピーする際に `options.ua` を `123` に置き換える
      ua: 123,

      // 開発時のみ有効な部分であり、プロダクションビルド時にはプラグインのコードから取り除かれる
      debug: this.options.dev
    }
  })
}
```

### CSS ライブラリを追加する

モジュールが CSS ライブラリを提供する際、重複を回避するために CSS ライブラリが存在しているかの確認や、モジュール内の CSS ライブラリの**無効化オプション**の追加を検討してください。

**module.js**

```js
export default function (moduleOptions) {
  if (moduleOptions.fontAwesome !== false) {
    // Font Awesome を追加する
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```

### assets を出力する

ビルド時にアセットを出力するために Webpack のプラグインを登録することができます。

**module.js**

```js
export default function (moduleOptions) {
  const info = 'Built by awesome module - 1.3 alpha on ' + Date.now()

  this.options.build.plugins.push({
    apply(compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        // info 変数の内容を用いて `.nuxt/dist/info.txt' を生成する
        // source はバッファとなる
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

### webpack のカスタムローダーを登録する

`nuxt.config.js` 内の `build.extend` と同じように `this.extendBuild` を使うことができます。

**module.js**

```js
export default function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
      // `.foo` ローダー
      config.module.rules.push({
        test: /\.foo$/,
        use: [...]
      })

      // 既存のローダーをカスタマイズする
      // 詳しくは Nuxt 内部のソースコードを参照:
      // https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```

## 特定のフックでタスクを実行する

単に Nuxt の初期化処理時だけではなく、特定の条件下でのみ、モジュールにある処理を実行させたいこともあるでしょう。Nuxt.js システムの強力なフックを使用して特定のイベントでタスクを実行できます（[Hookable](https://github.com/nuxt-contrib/hookable) をベースにしています）。Nuxt は関数が Promise を返すか、`async` として定義されている場合その関数を待機します。

以下が基本的な例です。

```js
export default function myModule() {
  this.nuxt.hook('modules:done', moduleContainer => {
    // 全てのモジュールのロードが完了したときに呼ばれます
  })

  this.nuxt.hook('render:before', renderer => {
    // renderer が作成された後に呼ばれます
  })

  this.nuxt.hook('build:compile', async ({ name, compiler }) => {
    // コンパイラ (デフォルト: webpack) が始まる前に呼ばれます
  })

  this.nuxt.hook('generate:before', async generator => {
    // Nuxt が pages を generate する前に呼ばれます
  })
}
```

## モジュールパッケージコマンド

**実験的**

`v2.4.0`からは、Nuxt モジュールのパッケージを通してカスタムの nuxt コマンドを追加することができます。そのためには、コマンドを定義するときに `NuxtCommand` API に従ってください。仮想的に `my-module/bin/command.js` に置かれたシンプルな例は次のようになります。

```js
#!/usr/bin/env node

const consola = require('consola')
const { NuxtCommand } = require('@nuxt/cli')

NuxtCommand.run({
  name: 'command',
  description: 'My Module Command',
  usage: 'command <foobar>',
  options: {
    foobar: {
      alias: 'fb',
      type: 'string',
      description: 'Simple test string'
    }
  },
  run(cmd) {
    consola.info(cmd.argv)
  }
})
```

ここで注意すべきことがいくつかあります。まず、Node 実行ファイルを取得するための `/usr/bin/env` の呼び出しを忘れないでください。 また、ES モジュールの構文は、[`esm`](https://github.com/standard-things/esm) をコードに手動で組み込んでいない限り、コマンドには使用できません。

次に、`NuxtCommand.run()` がコマンドの設定と振る舞いを指定するためにどのように使われるかに気づくでしょう。オプションは `options` で定義され [`minimist`](https://github.com/substack/minimist) によってパースされます。引数がパースされると、`NuxtCommand` インスタンスを最初のパラメータとして `run()` が自動的に呼び出されます。

上の例では、`cmd.argv` はパースされたコマンドライン引数を取得するために使われています。`NuxtCommand` には更に多くのメソッドとプロパティがあります -- これらのドキュメントはこの機能がさらにテストされ改善されていくにつれて提供されるでしょう。

コマンドを Nuxt CLI で認識できるようにするには、それを package.json の `bin` セクションの下に、`nuxt-module` 規約を使って記述してください。この `module` はパッケージの名前に関係します。この中心的なバイナリを使って、さらに `subcommands` をパースするために `argv` を使うこともできます。

```js
{
  "bin": {
    "nuxt-foobar": "./bin/command.js"
  }
}
```

(npm か Yarn 　によって）パッケージがインストールされると、コマンドラインで `nuxt foobar ...` を実行できるようになります。

<div class="Alert">

モジュールには他にも多くのフックがあり、また他にももっとできることがあります。Nuxt の内部 API については [Nuxt Internals](/api/internals) を参照してください。

</div>
