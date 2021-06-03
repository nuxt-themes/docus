---
title: .nuxt
description: '`.nuxt` ディレクトリはいわゆる *build ディレクトリ*です。このディレクトリは動的に生成され、デフォルトでは非表示になっています。ディレクトリの中には、`nuxt dev` を使っているときには自動生成されたファイルが、`nuxt build` を使っているときにはビルドの成果物が入っています。'
position: 1
category: directory-structure
questions:
  - question: .nuxt フォルダはどのようなコマンドで生成されますか？
    answers:
      - nuxt start
      - nuxt generate
      - nuxt build または nuxt dev
    correctAnswer: nuxt build または nuxt dev
  - question: nuxt フォルダの名前を変更するときに使用するプロパティは？
    answers:
      - dir
      - build
      - buildDir
    correctAnswer: buildDir
  - question: 生成されたルートはどのファイルにありますか？
    answers:
      - pages.js
      - router.js
      - views.js
    correctAnswer: router.js
  - question: components フォルダには何が入っていますか？
    answers:
      - nuxt components
      - custom components
      - global components
    correctAnswer: nuxt components
  - question: .nuxt フォルダは、静的サイトをデプロイする際にアップロードするフォルダです。
    answers:
      - true
      - false
    correctAnswer: false
---

`.nuxt` ディレクトリはいわゆる *build ディレクトリ*です。このディレクトリは動的に生成され、デフォルトでは非表示になっています。ディレクトリの中には、`nuxt dev` を使っているときには自動生成されたファイルが、`nuxt build` を使っているときにはビルドの成果物が入っています。これらのファイルを変更することはデバッグに最適ですが、これらは生成されたファイルであり、`dev` や `build` コマンドを再度実行すると、ここに保存されていたものはすべて再生成されることを覚えておいてください。

<base-alert>

`.nuxt` ディレクトリはバージョン管理システムにコミットされるべきではありません。`nuxt dev` または `nuxt build` を実行したときに自動的に生成されるので、`.gitignore` で無視してください。

</base-alert>

### buildDir プロパティ

デフォルトでは `.nuxt` のディレクトリ名がドットで始まるため、多くのツールが隠しディレクトリと見なします。これを防ぐには buildDir オプションを使用します。名前を変更した場合は、新しい名前を `.gitignore` ファイルに追加することを忘れないようにしてください。

```js{}[nuxt.config.js]
export default {
  buildDir: 'nuxt-dist'
}
```

### .nuxt フォルダの中身 :

- router.js ファイルは、ページフォルダ内に `.vue` ファイルを配置したときに、Nuxt.js が生成してくれるルーターファイルです。このファイルは、vue-router 用に生成されたルートを調べたり、特定のルートの名前を調べたりしたいときのデバッグに使うことができます。
- router.scrollBehavior.js は、ルーターの ScrollBehavior です。
- components フォルダには、NuxtChild や NuxtLink などの Nuxt コンポーネントが入っています。また、アプリケーションのビルド中に表示されるページである nuxt-build-indicator や、ページの読み込みを待っているときに表示されるロードコンポーネントである nuxt-loading も含まれています。Nuxt のデフォルトのエラーページを含む nuxt-error ページもここにあります。
- mixins フォルダには、Nuxt の `$fetch` メソッドに必要なファイルが含まれています。
- views フォルダには、アプリのテンプレートとサーバーエラーページが含まれます。
- app.js は、メインのアプリケーションファイルです。
- client.js ファイルは、クライアントサイドで発生するすべてのことに必要なクライアントファイルです。
- empty ファイルは何も処理しないエイリアスのために意図的に空のままになっています。
- index.js ファイルは、アプリケーションを起動します。
- loading.html は、ページの読み込み時に使用するファイルです。
- middleware ファイルは、ミドルウェアが保存されている場所です。
- server.js ファイルは、サーバー上で実行されるすべてのコードです。
- ユーティリティには、Nuxt が動作するために必要なユーティリティが含まれています。

### デプロイする

`.nuxt` フォルダは SSR アプリケーションのデプロイに必要なファイルの一部です。ただし、静的 Nuxt.js アプリのデプロイには `dist` フォルダを使用するため必要ありません。

<quiz :questions="questions"></quiz>
