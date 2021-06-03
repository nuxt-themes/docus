---
title: Vercel へデプロイするには？
description: Vercel へデプロイするには？
menu: Deploy on Vercel
category: deployment
position: 210
---

![nuxt-vercel-builder](https://user-images.githubusercontent.com/904724/61308402-7a752d00-a7f0-11e9-9502-23731ccd00fd.png)

## Vercel

[Vercel](https://vercel.com) を使ってデプロイするために、Nuxt.js チームとコントリビューターは公式の [@nuxtjs/vercel-builder](https://github.com/nuxt/vercel-builder) パッケージを作成しました（'Now' は Vercel の以前の名前です）。

必要なのは `now.json` をセットアップすることです:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "nuxt.config.js",
      "use": "@nuxtjs/vercel-builder",
      "config": {}
    }
  ]
}
```

詳細や例については https://github.com/nuxt/vercel-builder で見ることができます。

### Nuxt PWA モジュールを持つ Service Worker

Service Worker の 404 を回避するために、ルート設定に `sw` を必ず含めるようにしてください。

```json
{
  "version": 2,
  "builds": [
    {
      "src": "nuxt.config.js",
      "use": "@nuxtjs/vercel-builder",
      "config": {
        "serverFiles": ["package.json"]
      }
    }
  ],
  "routes": [
    { "src": "/_nuxt/.+", "headers": { "Cache-Control": "max-age=31557600" } },
    {
      "src": "/sw.js",
      "dest": "/_nuxt/static/sw.js",
      "headers": {
        "cache-control": "public, max-age=43200, immutable",
        "Service-Worker-Allowed": "/"
      }
    },
    { "src": "/(.*)", "dest": "/" }
  ]
}
```

## Now V1 (レガシー)

[Now V1](https://vercel.com) を使ってデプロイするには `package.json` を次のように記述することが推奨されます:

```json
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```

これで `now` を実行できます！エンジョイ！

メモ: `.nuxt` を `.npmignore` または `.gitignore` に入れておくことをお勧めします。
