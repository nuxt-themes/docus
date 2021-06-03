---
title: 'modern プロパティ'
description: 'モダンなバンドルのビルドとデプロイ'
menu: modern
category: configuration-glossary
position: 18
---

> この機能は [vue-cli の modern mode](https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode) にインスパイアされています

- 型: `String` または `Boolean`
  - デフォルト: false
  - 設定できる値:
    - `'client'`: モダンバンドル `<script type="module">` とレガシーバンドル `<script nomodule>` スクリプトの両方を提供し、モダンバンドル用の `<link rel="modulepreload">` も提供します。`module` タイプを理解するすべてのブラウザではモダンバンドルをロードしますが、古いブラウザではレガシー（トランスパイルされた）バンドルにフォールバックします。
    - `'server'` または `true`: Node.js サーバーは、ユーザーエージェントに基づいてブラウザのバージョンをチェックし、対応するモダンバンドルまたはレガシーバンドルを提供します。
    - `false`: モダンビルドを無効にします

2 つのバージョンのバンドルについて:

1. モダンバンドル: ES modules をサポートするモダンなブラウザを対象にしています。
1. レガシーバンドル: babel config（デフォルトでは IE9 互換）をベースにした古いブラウザを対象にしています。

**情報:**

- モダンバンドルでビルド/スタートするにはコマンドオプション `[--modern | -m]=[mode]` を使ってください:

```json{}[package.json]
{
  "scripts": {
    "build:modern": "nuxt build --modern=server",
    "start:modern": "nuxt start --modern=server"
  }
}
```

**nuxt generate に関する注意\_:** `modern` プロパティは `nuxt generate` コマンドでも動作しますが、この場合は `client` オプションだけが優先され `nuxt generate --modern` コマンドを値なしで実行した際に自動的に選択されます。

- `modern` が指定されていない場合、Nuxt は `nuxt start` の `modern` ビルドを自動的に検出します。自動検出モードは次のとおりです:

| ssr    | モダンモード |
| --------- | :----------: |
| true |    server    |
| false       |    client    |

- `nuxt generate` のモダンモードは `client` のみになります。
- [`render.crossorigin`](/docs/2.x/configuration-glossary/configuration-render#クロスオリジン) を使って `<link>` と `<script>` タグに `crossorigin` 属性を設定します。

> モダンビルドについての詳細は [Phillip Walton さんの素晴らしい投稿](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)を参照してください。
