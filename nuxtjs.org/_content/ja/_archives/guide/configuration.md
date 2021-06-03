---
title: 設定
description: Nuxt.js ではデフォルトの設定でほとんどのユースケースをカバーしています。`nuxt.config.js` を使ってこの設定を上書きすることができます。
category: getting-started
position: 103
---

> Nuxt.js ではデフォルトの設定でほとんどのユースケースをカバーしています。`nuxt.config.js` を使ってこの設定を上書きすることができます。

### build

このオプションで、`loaders`、`filenames` や `webpack` の設定、`transpilation` を含む `build` ステップにおけるさまざまな設定を行うことができます。

[`build` オプションに関するドキュメント](/api/configuration-build)

### css

このオプションで、グローバルに（すべてのページで）利用したい CSS ファイル/モジュール/ライブラリを指定できます。

[`css` オプションに関するドキュメント](/api/configuration-css)

### dev

このオプションで、Nuxt.js の `development` または `production` モードを定義できます。（Nuxt.js をプログラム的に使う際に重要です）

[`dev` オプションに関するドキュメント](/api/configuration-dev)

### env

このオプションで、クライアントサイドでもサーバーサイドでも使える環境変数を指定できます。

[`env` オプションに関するドキュメント](/api/configuration-env)

### generate

このオプションで、アプリケーションの動的なルーティングに用いるパラメータを指定できます。Nuxt.js により HTML ファイルに変換されます。

[`generate` オプションに関するドキュメント](/api/configuration-generate)

### head

このオプションで、アプリケーションのデフォルトのメタタグを全て指定できます。

[`head` オプションに関するドキュメント](/api/configuration-head)

### loading

このオプションで、Nuxt.js のデフォルトのローディングコンポーネントをカスタマイズできます。

[`loading` オプションに関するドキュメント](/api/configuration-loading)

### modules

このオプションで、プロジェクトに Nuxt モジュールを追加できます。

[`modules` オプションに関するドキュメント](/api/configuration-modules)

### modulesDir

このオプションで、Nuxt.js アプリケーションの node_modules ディレクトリの指定ができます。

[`modulesDir` オプションに関するドキュメント](/api/configuration-modulesdir)

### plugins

このオプションで、ルートの Vue.js アプリケーションをインスタンス化する前に実行したい JavaScript plugin を指定できます。

[`plugins` オプションに関するドキュメント](/api/configuration-plugins)

### rootDir

このオプションで、Nuxt.js アプリケーションのワークスペースを指定できます。

[`rootDir` オプションに関するドキュメント](/api/configuration-rootdir)

### router

このオプションで、Nuxt.js のデフォルトの Vue Router 設定を上書きできます。

[`router` オプションに関するドキュメント](/api/configuration-router)

### server

このオプションで、Nuxt.js アプリケーションのサーバーインスタンスにおける接続変数を設定できます。

[`server` オプションに関するドキュメント](/api/configuration-server)

### srcDir

このオプションで、Nuxt.js アプリケーションのソースディレクトリを指定できます。

[`srcDir` オプションに関するドキュメント](/api/configuration-srcdir)

### dir

このオプションで、Nuxt.js アプリケーションのカスタムディレクトリを指定できます。

[`dir` オプションに関するドキュメント](/api/configuration-dir)

### transition

このオプションで、ページトランジションのデフォルトプロパティを指定できます。

[`transition` オプションに関するドキュメント](/api/configuration-transition)

## Asynchronous Configuration

一部のオプション（例えば、head）に非同期データ（例えば、API からのデータなど）を入力する必要がある場合は、promise を返す可能性があります。例は以下のとおりです。

```js
/*
nuxt.config.js では axios-module を使用できません。
axios をインポートして、再度設定する必要があります。
*/
import axios from 'axios'

export default async () => {
  const data = await axios.get('endpoint')
  return {
    head: {
      title: data.head.title
      //... REST の設定
    }
  }
}
```
