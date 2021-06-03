---
title: Google App Engine へデプロイするには？
description: Nuxt.js を Google App Engine へデプロイするには？
category: deployment
position: 206
---

[Google App Engine](https://cloud.google.com/appengine/) へのデプロイは Google のクラウドサービスでユニバーサル Nuxt アプリケーションをホストするための迅速で簡単なソリューションです。

このガイドでは、アプリケーションをローカルに構築してから、プロジェクトフォルダ全体を Google App Engine にアップロードするまでを行います。アップロード後、Google App Engine は自動的に package.json の `start` スクリプトを起動するので、あなたのアプリケーションはすぐに利用可能となります。

## はじめに

[Google App Engine](https://cloud.google.com/appengine/) に Google クラウドアカウント、プロジェクト、空の Google App Engine アプリケーションが設定されていることを確認してください。さらに、[こちら](https://cloud.google.com/sdk/) の説明に従って Google から Cloud SDK(CLI) をダウンロードしてインストールし、Google クラウドアカウントにログインしてください。

## アプリケーションの設定

ユニバーサル Nuxt アプリケーションを App Engine にデプロイするために追加する必要があるのは、`app.yaml` というファイルだけです。ルートプロジェクトディレクトリにその名前の新しいファイルを作成し、次の内容を追加します:

```yaml
runtime: nodejs10

instance_class: F2

handlers:
  - url: /_nuxt
    static_dir: .nuxt/dist/client
    secure: always

  - url: /(.*\.(gif|png|jpg|ico|txt))$
    static_files: static/\1
    upload: static/.*\.(gif|png|jpg|ico|txt)$
    secure: always

  - url: /.*
    script: auto
    secure: always

env_variables:
  HOST: '0.0.0.0'
```

また、フレキシブル環境の最小構成の設定ファイルは以下です:

```yaml
runtime: nodejs
env: flex
```

## ビルドとデプロイ

さあ、あなたのアプリケーションを `npm run build` でビルドしてください。

これで、アプリケーションを Google App Engine にアップロードする準備が整いました。では、次のコマンドを実行してください:

```
gcloud app deploy app.yaml --project [project-id]
```

ほら！　 Nuxt.js アプリケーションが Google App Engine 上にホストされました！

## 詳細

- app.yaml ファイルの `instance_class` 属性はアプリケーションのインスタンスクラスを設定します。F2 インスタンスは完全に無料ではありませんが、Nuxt アプリケーションを実行するために必要な最小限のメモリを有しています。
- package.json の `start` がデプロイ後に実行したいコマンドであることを確認してください。普段から `start:prod` などの別のコマンドで実行している場合、アプリケーションは期待通りに動作しません。

deploy コマンドには、必ず `project-name` ではなく `project-id` を入れてください。これら 2 つは異なるものです - しかし混同しやすいです。
