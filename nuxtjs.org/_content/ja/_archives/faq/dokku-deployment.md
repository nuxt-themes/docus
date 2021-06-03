---
title: Dokku へデプロイするには？
description: Dokku へデプロイするには？
menu: Deploy on Dokku
category: deployment
position: 204
---

[Dokku のセットアップに関するドキュメント](http://dokku.viewdocs.io/dokku/getting-started/installation/) と [Dokku を使って Digital Ocean 上に Node.js アプリケーションにデプロイする](http://jakeklassen.com/post/deploying-a-node-app-on-digital-ocean-using-dokku/) を読むことをお勧めします。

例として、Nuxt.js アプリケーションを `my-nuxt-app` としましょう。

まず `npm run build` を実行できるようにするために、Dokku にプロジェクトの `devDependencies` をインストールすることを伝える必要があります:

```bash
// Dokku サーバー上で
dokku config:set my-nuxt-app NPM_CONFIG_PRODUCTION=false YARN_PRODUCTION=false
```

また、アプリケーションに `0.0.0.0` ポートを Listen させ、プロダクションモードで起動します:

```bash
// Dokku サーバー上で
dokku config:set my-nuxt-app HOST=0.0.0.0 NODE_ENV=production
```

`dokku config my-nuxt-app` を入力し、以下の 3 行を確認します。

![nuxt config vars Dokku](https://i.imgur.com/9FNsaoQ.png)

そして、`app.json` 内のスクリプト部 `scripts.dokku.predeploy` を介して Dokku に `npm run build` を実行すること伝えます。:

`プロジェクトのルートディレクトリに app.json という名前のファイルを作成してください。`

```js
{
  "scripts": {
    "dokku": {
      "predeploy": "npm run build"
    }
  }
}
```

[Procfile](http://dokku.viewdocs.io/dokku/deployment/methods/dockerfiles/#procfiles-and-multiple-processes) を使ってアプリケーションを起動するために `npm run start` を実行します:

```
web: npm run start
```

最後にアプリケーションを Dokku に git push します:

```bash
// push する前に変更をコミットしてください
git remote add dokku dokku@yourServer:my-nuxt-app
git push dokku master
```

やりました！これで Nuxt.js アプリケーションは Dokku でホストされるようになりました！
