---
title: 'API: cli プロパティ'
description: Nuxt.js  は CLI 設定をカスタマイズできます。
menu: cli
category: configuration
position: 103
---

> Nuxt.js は CLI 設定をカスタマイズできます。

## bannerColor

- 型： `String`
- デフォルト： `green`

CLI バナーの 'Nuxt.js' タイトルの色を変更します。

利用可能な色：

- `black`、`red`、`green`、`yellow`、`blue`、`magenta`、`cyan`、`white`、`gray`、`redBright`、`greenBright`、`yellowBright`、`blueBright`、`magentaBright`、`cyanBright`、　`whiteBright`

例（`nuxt.config.js`）：

```js
export default {
  cli: {
    bannerColor: 'yellow'
  }
}
```
