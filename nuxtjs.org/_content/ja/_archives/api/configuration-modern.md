---
title: 'API: modern プロパティ'
description: モダンバンドルをビルドして配信する
menu: modern
category: configuration
position: 118
---

> この機能は [vue-cli modern モード](https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode) にインスパイアされています

- 型: `String` または `Boolean`
  - デフォルト: false
  - 受け取ることができる値:
    - `'client'`: モダンバンドルの `<script type="module">` とレガシーバンドルの `<script nomodule>` のスクリプトを両方配信し、 また `<link rel="modulepreload">` をモダンバンドルのために提供します。 古いブラウザがレガシー（トランスパイルされた）なバンドルにフォールバックしている間に、 `module` タイプを理解するすべてのブラウザはモダンバンドルを読み込むでしょう。
    - `'server'` または `true`: Node.js サーバがユーザエージェントをベースにブラウザのバージョンをチェックして、対応したモダンかレガシーどちらかのバンドルを配信するでしょう。
    - `false`: モダンビルドを無効化します。

2 つのバージョンのバンドルについて:

1. モダンバンドル: ES modules をサポートするモダンブラウザを対象にしています。
2. レガシーバンドル: babel config（デフォルトでは IE9 互換）をベースにした古いブラウザを対象にしています。

**情報:**

- モダンバンドルでビルド/スタートするにはコマンドオプションの `[--modern | -m]=[mode]` を使用してください。`package.json` の例:

```json
{
  "scripts": {
    "build:modern": "nuxt build --modern=server",
    "start:modern": "nuxt start --modern=server"
  }
}
```

**_nuxt generate_ に関する注記:** `modern` プロパティは `nuxt generate` コマンドでも動作しますが、このケースでは `client` オプションだけが優先されて `nuxt generate --modern` コマンドを値無しで起動した時に自動で選択されるでしょう。

- `modern` が指定されていない場合、Nuxt は自動的に `nuxt start` のビルド時に `modern` を検出します。自動検出のモードは以下になります:

| モード    | モダンモード |
| --------- | :----------: |
| universal |    server    |
| spa       |    client    |

- `nuxt generate` のモダンモードは `client` のみになります。
- [`render.crossorigin`](/api/configuration-render#crossorigin) を使用し、`<link>` と `<script>` の `crossorigin` 属性を設定してください。

> モダンビルドについてもっと詳しくは [Phillip Walton's excellent post](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) を参照してください。
