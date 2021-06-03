---
title: アセット
description: assets ディレクトリには、Stylus や Sass ファイル、画像、フォントなどコンパイルされていないアセットが含まれます。
position: 2
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/02_assets?fontsize=14&hidenavigation=1&theme=dark
videoScript:
  - assets-video.md
questions:
  - question: Which directory contains your un-compiled assets such as Stylus or Sass files, images, or fonts?
    answers:
      - static
      - assets
      - pages
    correctAnswer: assets
  - question: What do you use if you need to reference your  assets directory inside your vue templates?
    answers:
      - '/assets/your_image.png'
      - '@assets/your_image.png'
      - '@/assets/your_image.png'
    correctAnswer: '@/assets/your_image.png'
  - question: What do you use if you need to reference your  assets directory inside your css files?
    answers:
      - url("@assets/banner.svg")
      - url("assets/banner.svg")
      - url("@/assets/banner.svg")
    correctAnswer: url("@assets/banner.svg")
  - question: Where do you import your global css stylesheets?
    answers:
      - in your index.vue file
      - in the nuxt.config.js file
      - in the default layout file
    correctAnswer: in the nuxt.config.js file
  - question: Under which property do you import a global font?
    answers:
      - font
      - head
      - css
    correctAnswer: head
  - question: Which loader lets you inline a file as base-64 data URL?
    answers:
      - file-loader
      - url-loader
      - image-loader
    correctAnswer: url-loader
  - question: What is the aliases for the source directory?
    answers:
      - '@'
      - '@@'
      - '^'
    correctAnswer: '@'
  - question: What is the aliases for the root directory?
    answers:
      - '@'
      - '@@'
      - '@root'
    correctAnswer: '@@'
---

`assets` ディレクトリには、Stylus や Sass ファイル、画像、フォントなどコンパイルされていないアセットが含まれます。

## 画像ファイル

`vue` テンプレートの中で `assets` ディレクトリにリンクする必要がある場合は、`assets` の前にスラッシュを付け `~/assets/your_image.png` と記述します。

```html
<template>
  <img src="~/assets/your_image.png" />
</template>
```

`css` ファイルの中で `assets` ディレクトリにリンクする必要がある場合は、スラッシュなしで `~assets/your_image.png` と記述します。

```css
background: url('~assets/banner.svg');
```

動的イメージを使う場合は、`require` を使う必要があります。

```html
<img :src="require(`~/assets/img/${image}.jpg`)" />
```

<base-alert type="next">

[webpack Assets](/docs/2.x/directory-structure/assets#webpack-assets) の詳細についてはこちらをご覧ください。

</base-alert>

## スタイル

Nuxt.js では、グローバル (すべてのページ）に設定したい CSS ファイルやモジュール、ライブラリを定義することができます。nuxt.config 内で CSS プロパティを使って簡単にスタイルを追加することができます。

```js{}[nuxt.config.js]
export default {
  css: [
    // Load a Node.js module directly (here it's a Sass file)
    'bulma',
    // CSS file in the project
    '~/assets/css/main.css',
    // SCSS file in the project
    '~/assets/css/main.scss'
  ]
}
```

### Sass

`sass` を使用したい場合、`sass` と `sass-loader` プラグインがインストールされているか確認してください。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D sass sass-loader@10 fibers
```

  </code-block>
  <code-block label="npm">

```bash
npm install --save-dev sass sass-loader@10 fibers
```

  </code-block>
</code-group>

<base-alert type="info">`fibers` がインストールされている場合、`sass` の同期コンパイル（2 倍速）が[自動的に有効になります](https://github.com/webpack-contrib/sass-loader)。</base-alert>

Nuxt.js は拡張子からファイルの種類を自動的に推測して webpack に適したプリプロセッサローダーを使用します。それでも必要な場合は、必要なローダーをインストールする必要があります。

## フォント

ローカルフォントをアセットフォルダに追加することで使用できるようになります。追加したら @font-face を使用して css からアクセスすることができます。

```
-| assets
----| fonts
------| DMSans-Regular.ttf
------| DMSans-Bold.ttf
```

```css{}[assets/main.css]
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('~assets/fonts/DMSans-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('~assets/fonts/DMSans-Bold.ttf') format('truetype');
}
```

<base-alert type="next">

Google フォントのような外部フォントを追加する場合は [Meta Tags and SEO chapter](/docs/2.x/features/meta-tags-seo#external-resources) を確認してください。

</base-alert>

## Webpack アセット

デフォルトでは、Nuxt は webpack の vue-loader、file-loader、url-loader を使用してアセットを提供します。また webpack を通して実行されるべきではないアセットのために、静的ディレクトリを使用することもできます。

## Webpack

[vue-loader](http://vue-loader.vuejs.org/)  は、`css-loader` と Vue テンプレートコンパイラを用いて、スタイルやテンプレートファイルを自動的に処理します。このコンパイル処理の中で、`<img src="...">` や  `background: url(...)` や CSS `@import` などのすべてのアセット URL はモジュールの依存関係として解決されます。

例えば、次のようなファイル構成があるとします。:

```
-| assets/
----| image.png
-| pages/
----| index.vue
```

CSS で `url('~assets/image.png')` と記述した場合、それは `require('~/assets/image.png')` に変換されます。

<base-alert>

`~/` エイリアスは CSS ファイルで正しく解決されないでしょう。CSS の `url` の参照には、`~assets` (スラッシュなし）を使わなければなりません。例: `background: url("~assets/banner.svg")`

</base-alert>

`pages/index.vue` で画像を参照する場合:

```html{}[pages/index.vue]
<template>
  <img src="~/assets/image.png" />
</template>
```

次のようにコンパイルされます:

```js
createElement('img', { attrs: { src: require('~/assets/image.png') } })
```

`.png` は JavaScript ファイルではないため、Nuxt.js は file-loader と url-loader を使ってそれらを処理できるよう webpack を設定します。

これらのローダーを利用する利点:

`file-loader` は、アセットファイルをコピー・配置する場所と、キャッシュ改善のためにバージョンハッシュを用いてファイル名を指定することができます。

`url-loader` は、指定した閾値よりも小さい場合に、Base64 データ URL として条件付きでファイルに埋め込むことができます。これにより、小さなファイル取得のための HTTP リクエスト数を減らすことができます。もし閾値よりも大きい場合は、file-loader に自動的にフォールバックします。

これら 2 つのローダーのデフォルトの設定は次の通りです。:

```js
// https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L297-L316
;[
  {
    test: /\.(png|jpe?g|gif|svg|webp)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

つまり、1 KB 未満のすべてのファイルは Base64 データ URL としてインライン化されます。 それ以外の場合、画像やフォントは、対応するフォルダ（`.nuxt` ディレクトリの下）にコピーされ、より良いキャッシュのためにバージョンハッシュを含む名前が付けられます。

`nuxt` コマンドでアプリケーションを起動するときの `pages/index.vue` のテンプレートは以下の通りです。:

```html{}[pages/index.vue]
<template>
  <img src="~/assets/your_image.png" />
</template>
```

次のように生成されます。

```html
<img src="/_nuxt/img/your_image.0c61159.png" />
```

ローダの設定を変更したい場合は [build.extend](/docs/2.x/configuration-glossary/configuration-build#extend) を使用してください。

## エイリアス

デフォルトでは、ソースディレクトリ (srcDir) とルートディレクトリ (rootDir) は同じディレクトリを意味します。ソースディレクトリには `~` のエイリアスを使うことができます。`../assets/your_image.png` のような相対パスを記述する代わりに、`~/assets/your_image.png` と記述することができます。

どちらも同じ結果になります。

```html{}[components/Avatar.vue]
<template>
  <div>
    <img src="../assets/your_image.png" />
    <img src="~/assets/your_image.png" />
  </div>
</template>
```

エイリアスとして `~` を使うことをお勧めします。`@` はまだサポートされていますが、CSS の background image などすべてのケースで機能するわけではありません。

ルートディレクトリには、エイリアスの `~~` や `@@` を使用することができます。

<quiz :questions="questions"></quiz>
