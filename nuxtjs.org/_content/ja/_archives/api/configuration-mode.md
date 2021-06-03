---
title: 'API: mode プロパティ'
description: デフォルトの nuxt モードを変更します。
menu: mode
category: configuration
position: 117
---

- 型: `string`
  - デフォルト値: `'universal'`
  - 受け取ることができる値:
    - `'spa'`: サーバーサイドレンダリングを行わない（クライアントでのナビゲーションのみ）
    - `'universal'`: アイソモーフィックなアプリケーション（サーバーサイドレンダリングに加え、クライアントでのナビゲーションを行う）

> このオプションを利用すると、 `nuxt.config.js` を利用してプロジェクトのデフォルトの nuxt のモードを変更することができます。
