---
title: static
description: static ディレクトリはサーバルートに直接マッピングされ、また変更されない可能性があるファイルが含まれています。含まれている全てのファイルは Nuxt によって自動で提供され、プロジェクトのルート URL からアクセスできます。
position: 12
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/13_static?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: favicon や robots.txt など、変更されない可能性のあるファイルをどのディレクトリに配置する必要がありますか?
    answers:
      - assets
      - static
      - src
    correctAnswer: static
  - question: このディレクトリは設定なしで簡単に名前を変更できます
    answers:
      - 正
      - 偽
    correctAnswer: 偽
  - question: webpack に画像をバンドルさせたい時、どこに画像を配置する必要がありますか?
    answers:
      - static
      - assets
      - src
    correctAnswer: assets
  - question: static ディレクトリ内のすべてのものは、ルートディレクトリに関連しています
    answers:
      - 正
      - 偽
    correctAnswer: 正
  - question: nuxt.config.js で static ディレクトリの動作を設定できます
    answers:
      - 正
      - 偽
    correctAnswer: 正
---

`static` ディレクトリはサーバルートに直接マッピングされ、また変更されない可能性があるファイルが含まれています。含まれている全てのファイルは Nuxt によって自動で提供され、プロジェクトのルート URL からアクセスできます。

`/static/robots.txt` は、`http://localhost:3000/robots.txt` で利用できます

`/static/favicon.ico` は、`http://localhost:3000/favicon.ico` で利用できます

このオプションは `robots.txt`、`sitemap.xml`、`CNAME`（GitHub Pages のデプロイに重要です）などのファイルに役立ちます。

<base-alert>

_このディレクトリは追加の設定をせずに名前を変更することはできません。_

</base-alert>

## Static アセット

`assets` ディレクトリの Webpack assets を使用したくない場合は、画像を static ディレクトリに追加できます。

コードではルート（`/`）を基準にしてこれらのファイルを参照できます:

```html
<!--static ディレクトリからの static 画像-->
<img src="/my-image.png" />

<!--assets ディレクトリからの webpack された 画像-->
<img src="~/assets/my-image-2.png" />
```

<base-alert type="info">Nuxt はこのパスを変更しないため `router.base` をカスタマイズする場合、手動でパスを追加する必要があります。例:

```html
<img :src="`${yourPrefix}/my-image.png`" />
```

</base-alert>

## Static ディレクトリ設定

必要に応じて `nuxt.config.js` ファイルで `static/` ディレクトリの動作を設定できます。

### Static アセットプレフィックス

Nuxt.js をサブフォルダにデプロイする場合（例：`/blog/` の場合）ルータベースはデフォルトで static アセットパスに追加されます。この動作を無効にしたいなら、`nuxt.config.js` で `static.prefix` を false に設定します。

```js
export default {
  static: {
    prefix: false
  }
}
```

デフォルト: `/blog/my-image.png`

`static.prefix` を無効にした場合: `/my-image.png`

<quiz :questions="questions"></quiz>
