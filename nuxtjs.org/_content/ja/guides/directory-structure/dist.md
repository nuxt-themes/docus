---
title: dist
description: '`dist` は _distribution_ の略です。dist フォルダは `nuxt generate` コマンドを使用すると動的に生成されます。dist フォルダ内には、静的に生成された Nuxt.js アプリケーションをデプロイ、実行するために必要となる本番用の HTML ファイルとアセットが含まれています。'
position: 5
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/05_dist?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: What command do you use to generate the dist folder?
    answers:
      - nuxt build
      - nuxt start
      - nuxt generate
    correctAnswer: nuxt generate
  - question: This is the folder you need to use to upload to your static site hosting
    answers:
      - true
      - false
    correctAnswer: true
  - question: What property do you use to change the name of the dist folder?
    answers:
      - dist
      - dir
      - buildDir
    correctAnswer: dir
  - question: What property do you use so that you don't have all your generated pages in a folder?
    answers:
      - 'folders: false'
      - 'subFolders: false'
      - 'pages: true'
    correctAnswer: 'subFolders: false'
  - question: What is the Nuxt.js default value for the fallback property?
    answers:
      - "'200.html'"
      - "'404.html'"
      - 'false'
    correctAnswer: "'200.html'"
  - question: When working with statically generated pages it is recommended to use which file for the error pages?
    answers:
      - "'200.html'"
      - "'404.html'"
      - false
    correctAnswer: "'404.html'"
  - question: Which property can you use to ignore certain files so that they are not statically generated?
    answers:
      - ignore
      - exclude
      - fallback
    correctAnswer: exclude
---

`dist` は _distribution_ の略です。dist フォルダは `nuxt generate` コマンドを使用すると動的に生成されます。dist フォルダ内には、静的に生成された Nuxt.js アプリケーションをデプロイ、実行するために必要となる本番用の HTML ファイルとアセットが含まれています。

### デプロイ

これは**静的ホスティング**のためにアップロードする必要があるフォルダで、本番用の HTML ファイルとアセットを含んでいます。

<base-alert>

`dist` ディレクトリはバージョン管理システムにコミットされるべきではありません。`nuxt generate` を行うたびに自動的に生成されるので、`.gitignore` で無視してください。

</base-alert>

### dir プロパティ

dist フォルダは、デフォルトでは dist という名前になっていますが nuxt.config ファイルで設定することができます。

```js{}[nuxt.config.js]
generate: {
  dir: 'my-site'
}
```

<base-alert>

もし dist フォルダの名前を変更する場合は、git がそれを無視するようにバージョン管理に追加する必要があります。

</base-alert>

### subFolders プロパティ

Nuxt.js は、デフォルトでは生成された全てのページをフォルダ内に配置しますが、nuxt.config ファイルを変更して subFolders を false にすることでこれを変更することができます。

```js{}[nuxt.config.js]
generate: {
  subFolders: false
}
```

### fallback プロパティ

サイトをデプロイする際、フォールバックの html パスが正しくセットされていることを確認する必要があります。不明なルートが Nuxt 経由でレンダリングされるようにエラーページとして設定する必要があります。もし設定されていない場合、Nuxt.js は 200.html のデフォルト値を使用します。

シングルページアプリケーションを実行しているときは、他のルートが生成されず、必要なファイルは 200.html だけなのでそれを使用するほうが理にかなっています。

静的に生成されたページで作業する場合、エラーページ用に 404.html を使用することをおすすめします。

<base-alert>

ホスティングサービスによっては 200.html もしくは 404.html を使わなければならないかもしれません。ホスティングプロバイダで確認してください。例えば　 Netlify は 404.html を使用しています。

</base-alert>

```js{}[nuxt.config.js]
export default {
  generate: {
    fallback: '404.html'
  }
}
```

### excludes プロパティ

generate の excludes プロパティを使用することで、生成されるページを除外することができます。静的ページとして生成される代わりにシングルページアプリケーションへとフォールバックされ、クライアントサイドのみでレンダリングされます。

```js{}[nuxt.config.js]
generate: {
  exclude: [/admin/]
}
```

<base-alert type="info">

また、正規表現を使用して、特定の単語で始まるページや終わるページ除外することもできます。

</base-alert>

<quiz :questions="questions"></quiz>
