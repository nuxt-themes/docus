---
title: 'API: buildDir プロパティ'
description: dist ディレクトリを定義します。
menu: buildDir
category: configuration
position: 102
---

- 型: `String`
- デフォルト: `.nuxt`

> dist ディレクトリを定義します。

例（`nuxt.config.js`）:

```js
export default {
  buildDir: 'nuxt-dist'
}
```

デフォルトでは `.nuxt` のディレクトリ名がドットで始まるため、多くのツールが隠しディレクトリと見なします。このオプションを使うと dist フォルダを隠しディレクトリではなく、表示することができます。
