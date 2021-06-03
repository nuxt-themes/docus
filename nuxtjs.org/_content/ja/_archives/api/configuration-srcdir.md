---
title: 'API: srcDir プロパティ'
description: Nuxt.js アプリケーションのソースディレクトリを指定します
menu: srcDir
category: configuration
position: 128
---

- 型: `String`
- デフォルト: [rootDir の値](/api/configuration-rootdir)

相対パスを指定すると、rootDir からの相対パスになります。

例（`nuxt.config.js`）:

例 1: 前提条件:

```js
// nuxt.config.js
export default {
  srcDir: 'client/'
}

// package.json
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

例 1 の代わりに、nuxt.config を src フォルダに移動することもできます。以下の例だと、client を rootDir として指定するだけで、srcDir を空のままにできます:

前提条件:

```js
// nuxt.config.js
export default {
  srcDir: '' // または、単に削除
}
// package.json
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
