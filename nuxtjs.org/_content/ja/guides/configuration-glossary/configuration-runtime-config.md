---
title: 'RuntimeConfig プロパティ'
description: 'RuntimeConfig を使うと、動的な設定や環境変数を nuxt コンテキストに渡すことができます。'
menu: runtimeConfig
category: configuration-glossary
position: 25
---

RuntimeConfig を使うと、動的な設定や環境変数を nuxt コンテキストに渡すことができます。より詳細な使い方については [runtime config のドキュメント](/docs/2.x/directory-structure/nuxt-config#runtimeconfig)を参照してください。

## `publicRuntimeConfig`

- 型: `Object`

このオブジェクトの値は `$config` を使って**クライアントとサーバー両方からアクセスできます**。

## `privateRuntimeConfig`

- 型: `Object`

このオブジェクトの値は `$config` を使って**サーバーからのみ**アクセスできます。サーバー用の `publicRuntimeConfig` を上書きします。
