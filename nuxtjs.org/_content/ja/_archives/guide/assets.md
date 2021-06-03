---
title: アセット
description: デフォルトでは、Nuxt は vue-loader、file-loader、url-loader webpack ローダーを使用して、強力なアセットを提供します。静的アセットには静的ディレクトリを使用することもできます。
category: getting-started
position: 107
---

> デフォルトでは、Nuxt は vue-loader、file-loader、url-loader webpack ローダーを使用して、強力なアセットを提供します。 静的アセットには `static` ディレクトリを使用することもできます。

## Webpack

[vue-loader](http://vue-loader.vuejs.org/) は `css-loader` と `vue-template-compiler` を用いて、スタイルやテンプレートファイルを自動的に処理します。このコンパイル処理の中で、 `<img src="...">` や `background: url(...)` や CSS `@import` などのすべてのアセット URL はモジュールの依存関係として解決されます。

例えば、次のようなファイル構成があるとします:

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

CSS で `url('~assets/image.png')` と書いた場合、それは `require('~/assets/image.png')` に変換されます。

<div class="Alert Alert--orange">

**Warning:** Nuxt 2.0 からは `~/` エイリアスは CSS ファイルで正しく解決されないでしょう。 CSS の参照には、`~assets`（スラッシュなし）か、`@` のエイリアスを使わなければなりません。 例：`background: url("~assets/banner.svg")`

</div>

`pages/index.vue`で画像を参照するなら:

```html
<template>
  <img src="~/assets/image.png" />
</template>
```

それは次のようにコンパイルされます:

```js
createElement('img', { attrs: { src: require('~/assets/image.png') } })
```

`.png` は JavaScript ファイルではないため、Nuxt.js は [file-loader](https://github.com/webpack/file-loader) と [url-loader](https://github.com/webpack/url-loader) を使ってそれらを処理できるよう webpack を設定します。

これらのローダーを利用する利点:

- `file-loader` は、アセットファイルをコピー・配置する場所と、キャッシュ改善のためにバージョンハッシュを用いてファイル名を指定することができます。本番環境では、デフォルトで長期キャッシングの恩恵を受けるでしょう。
- `url-loader` は、指定した閾値よりも小さい場合に、Base64 データ URL として条件付きでファイルに埋め込むことができます。これにより、小さなファイル取得のための HTTP リクエスト数を減らすことができます。もし閾値よりも大きい場合は、file-loader に自動的にフォールバックします。

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

つまり、1 KB 未満のすべてのファイルは Base64 データ URL としてインライン化されます。それ以外の場合、画像/フォントは、対応するフォルダ（`.nuxt` ディレクトリの下）にコピーされ、より良いキャッシュのためにバージョンハッシュを含む名前が付けられます。

アプリケーションを `nuxt` コマンドで起動するとき、`pages/index.vue` 内のテンプレートは下記のようになっており:

```html
<template>
  <img src="~/assets/image.png" />
</template>
```

そこから次のように生成されます:

```html
<img src="/_nuxt/img/image.0c61159.png" />
```

ローダーの設定を変更したい場合は、[build.extend](/api/configuration-build#extend)を使用してください。

## Static

`assets` ディレクトリで webpack したくないアセットがある場合は、プロジェクトのルートディレクトリに `static` ディレクトリ（プロジェクトのルートフォルダに）を作成して利用することができます。

これらのファイルは Nuxt によって自動的に提供され、プロジェクトのルート URL からアクセスできます。（`static/favicon.ico` は `localhost:3000/favicon.ico` で利用することができます）

このオプションは `robots.txt` や `sitemap.xml`、`CNAME`（GitHub Pages などで使う）などのファイルの扱いに役立ちます。

あなたのコードでは、それらのファイルを `/` を基準に参照することができます。:

```html
<!-- static ディレクトリにある静的イメージ  -->
<img src="/my-image.png" />

<!-- assets ディレクトリにある webpack されたイメージ -->
<img src="~/assets/my-image-2.png" />
```
