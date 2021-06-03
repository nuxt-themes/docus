---
title: 'srcDir プロパティ'
description: 'Nuxt.js アプリケーションのソースディレクトリを設定します。'
menu: srcDir
category: configuration-glossary
position: 28
---

- 型: `String`
- デフォルト: [rootDir の値](/docs/2.x/configuration-glossary/configuration-rootdir)

> Nuxt.js アプリケーションのソースディレクトリを設定します。

相対パスを指定すると、`rootDir` からの相対パスになります。

例 1: 前提条件:

```js{}[nuxt.config.js]
export default {
  srcDir: 'client/'
}
```

```js{}[package.json]
  "script": {
    "dev": "yarn nuxt"
  }
```

次のフォルダ構成で動作します（nuxt.config は app ディレクトリにあることに注意してください）。

```bash
-| app/
---| node_modules/
---| nuxt.config.js
---| package.json
---| client/
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/
```

例 2:

例 1 の代わりに nuxt.config を `client` フォルダに移動することもできます。この場合 `client` を `rootDir` として指定するだけでよく、`srcDir` は空にできます:

前提条件:

```js{}[nuxt.config.js]
export default {
  srcDir: '' // または単に削除
}
```

```js{}[package.json]
  "script": {
    "dev": "yarn nuxt client" // client を rootDir として設定
  }
```

次のフォルダ構成で動作します（nuxt.config は client ディレクトリにあることに注意してください）。

```bash
-| app/
---| node_modules/
---| package.json
---| client/
------| nuxt.config.js
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/
```
