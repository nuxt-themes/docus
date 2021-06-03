---
title: インストール
description: Nuxt.js はとても簡単に始められます。シンプルなプロジェクトでは必要な依存パッケージは `nuxt` だけです。
category: getting-started
position: 101
---

> Nuxt.js はとても簡単に始められます。シンプルなプロジェクトでは必要な依存パッケージは `nuxt` だけです。

<div>
  <a href="https://vueschool.io/courses/nuxtjs-fundamentals/?friend=nuxt" target="_blank" class="Promote">
    <img src="/nuxt-fundamentals.png" srcset="/nuxt-fundamentals-2x.png 2x" alt="Nuxt Fundamentals by vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Nuxt.js の基礎</h4>
      <p class="Promote__Content__Description">ビデオで Nuxt.js をすぐに使い始める方法を学ぶ。</p>
      <p class="Promote__Content__Signature">Nuxt.js の開発をサポートするために、VueSchool がビデオコースを作りました。</p>
    </div>
  </a>
</div>

## `create-nuxt-app` を使用する

素早くスタートできるようにするため、Nuxt.js チームは足場ツール [create-nuxt-app](https://github.com/nuxt/create-nuxt-app) を作成しました。

[npx](https://www.npmjs.com/package/npx) がインストールされていることを確認してください。（`npx` は npm `5.2.0` からデフォルトでバンドルされています）

```bash
$ npx create-nuxt-app <project-name>
```

もしくは [yarn](https://yarnpkg.com/ja/) を使ってください:

```bash
$ yarn create nuxt-app <project-name>
```

いくつか質問（名前、Nuxt オプション、UI フレームワーク、TypeScript、linter、テストフレームワークなど）に答えると選択した全ての依存関係がインストールされます。次のステップはプロジェクトフォルダに遷移し起動します:

```bash
$ cd <project-name>
$ npm run dev
```

するとアプリケーションは http://localhost:3000 で動いています。

<div class="Alert">

Nuxt.js は `pages` ディレクトリ内のファイルの更新を監視します。そのため、新しいページを追加したときにアプリケーションを再起動する必要はありません。

</div>

プロジェクトのディレクトリ構造についてより深く理解するには [ディレクトリ構造のドキュメント](/guide/directory-structure) を参照してください。

## スクラッチから始める

Nuxt.js プロジェクトをスクラッチから作ることも簡単で、必要なのは _1 つのファイルと 1 つのディレクトリ_ だけです。まずは空のディレクトリを作りましょう:

```bash
$ mkdir <project-name>
$ cd <project-name>
```

<div class="Alert Alert--nuxt-green">

<b>情報:</b> `<project-name>` の箇所はプロジェクト名に置き換えてください。

</div>

### package.json

それぞれのプロジェクトには、 `nuxt` を起動するために `package.json` ファイルが必要です。下記の json を package.json にコピーをして、 npm install を実行する前に保存してください:

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```

上のように書いておけば `npm run dev` で Nuxt.js を起動できます。

### `nuxt` のインストール

`package.json` を作成したら `nuxt` を npm でプロジェクトに追加しましょう:

```bash
$ npm install --save nuxt
```

### `pages` ディレクトリ

Nuxt.js は `pages` ディレクトリ内の `*.vue` ファイルについて、各ファイルがアプリケーションの 1 つのルートに対応するものとして変換します。

`pages` ディレクトリを作ります:

```bash
$ mkdir pages
```

それから最初のページを `pages/index.vue` に作ります:

```html
<template>
  <h1>Hello world!</h1>
</template>
```

そして、プロジェクトを起動します:

```bash
$ npm run dev
```

すると、アプリケーションは http://localhost:3000 で動いています。

<div class="Alert">

Nuxt.js は `pages` ディレクトリ内のファイルの更新を監視します。そのため新しいページを追加した場合にアプリケーションを再起動する必要はありません。

</div>

プロジェクトのディレクトリ構造についてより深く理解するには [ディレクトリ構造のドキュメント](/guide/directory-structure) を参照してください。
