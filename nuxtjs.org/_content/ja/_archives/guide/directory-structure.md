---
title: ディレクトリ構造
description: デフォルトの Nuxt.js アプリケーションの構造は、小規模のアプリケーションと大規模のアプリケーションのどちらにも適しています。
category: getting-started
position: 102
---

> デフォルトの Nuxt.js アプリケーションの構造は、小規模のアプリケーションと大規模のアプリケーションのどちらにも適しています。もちろん、好きなように構成することもできます。

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/guided-nuxtjs-project-tour?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Vue School で <strong>Nuxt.js のディレクトリ構造</strong>についての無料レッスンをみる
    </p>
  </a>
</div>

## ディレクトリ

### assets ディレクトリ

`assets` ディレクトリには Stylus や SASS、 Image、 Font のようなコンパイルされていないファイルを入れます。

アセットの取り扱いについてより深く理解するには [アセットに関するドキュメント](/guide/assets) を参照してください。

### components ディレクトリ

`components` ディレクトリには Vue.js のコンポーネントファイルを入れます。

<div class="Alert Alert--orange">

このディレクトリ内のコンポーネントは [`asyncData`](/guide/async-data) を利用できません。

</div>

### layouts ディレクトリ

`layouts` ディレクトリはアプリケーションのレイアウトを含みます。レイアウトはページの外観を変更するために使用されます（例えばサイドバーなど）。

レイアウトの取り扱いついてより深く理解するには [レイアウトに関するドキュメント](/guide/views#レイアウト) を参照してください。

_このディレクトリは特別な設定なしでは名前を変更できません。_

### middleware ディレクトリ

`middleware` ディレクトリにはアプリケーションのミドルウェアを入れます。ミドルウェアを使って、ページやページグループ（レイアウト）をレンダリングするよりも前に実行されるカスタム関数を定義できます。

ミドルウェアについてより深く理解するには [ミドルウェアに関するドキュメント](/guide/routing#ミドルウェア) を参照してください。

### pages ディレクトリ

`pages` ディレクトリにはアプリケーションのビュー及びルーティングファイルを入れます。Nuxt.js フレームワークはこのディレクトリ内のすべての `.vue` ファイルを読み込み、アプリケーションのルーターを作成します。

_このディレクトリは特別な設定なしでは名前を変更できません。_

ページの取り扱いについてより深く理解するには [ページに関するドキュメント](/guide/views) を参照してください。

### plugins ディレクトリ

`plugins` ディレクトリには、ルートの Vue.js アプリケーションをインスタンス化する前に実行したい JavaScript プラグインを入れます。 ここはコンポーネントをグローバルに登録したり、関数や定数を挿入するための場所です。

プラグインについてより深く理解するには [プラグインに関するドキュメント](/guide/plugins) を参照してください。

### static ディレクトリ

`static` ディレクトリは直接サーバのルートに配置され（`/static/robots.txt` は `http://localhost:3000/robots.txt` でアクセス可能です）、変更されない可能性の高いファイルが含まれています（例えば、favicon など）。

**例:** `/static/robots.txt` は `/robots.txt` に配置されます。

_このディレクトリは特別な設定なしでは名前を変更できません。_

静的ファイルの取り扱いについてより深く理解するには [静的ファイルに関するドキュメント](/guide/assets#webpack-で扱わない静的ファイル) を参照してください。

### store ディレクトリ

`store` ディレクトリには [Vuex ストア](http://vuex.vuejs.org) のファイルを入れます。Vuex ストアは Nuxt.js に付属していますが、デフォルトでは無効になっています。このディレクトリに `index.js`　ファイルを作成するとストアが有効になります。

_このディレクトリは特別な設定なしでは名前を変更できません。_

ストアの取り扱いについてより深く理解するには [ストアに関するドキュメント](/guide/vuex-store) を参照してください。

### nuxt.config.js ファイル

`nuxt.config.js` ファイルには Nuxt.js のカスタム設定を記述します。

_このファイルは特別な設定なしでは名前を変更できません。_

`nuxt.config.js` についてより深く理解するには [nuxt.config.js に関するドキュメント](/guide/configuration) を参照してください。

### package.json ファイル

`package.json` ファイルにはアプリケーションが依存するパッケージやスクリプトを記述します。

_このファイル名は変更できません。_

## エイリアス（別名）

| エイリアス   | ディレクトリ                          |
| ------------ | ------------------------------------- |
| `~` or `@`   | [srcDir](/api/configuration-srcdir)   |
| `~~` or `@@` | [rootDir](/api/configuration-rootdir) |

デフォルトでは `srcDir` は `rootDir` と同じです。

<div class="Alert Alert--nuxt-green">

<b>情報:</b> `vue` テンプレート内で `assets` または `static` ディレクトリへのリンクが必要なときは `~/assets/your_image.png` や `~/static/your_image.png` などを使ってください。

</div>
