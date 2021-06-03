---
title: 'buildDir プロパティ'
description: 'Nuxt.js アプリケーションの dist ディレクトリを定義します'
menu: buildDir
category: configuration-glossary
position: 2
---

- 型: `String`
- デフォルト: `.nuxt`

> Nuxt.js アプリケーションの dist ディレクトリを定義します

```js{}[nuxt.config.js]
export default {
  buildDir: 'nuxt-dist'
}
```

名前がドットで始まるため、デフォルトでは多くのツールが `.nuxt` を隠しディレクトリとみなします。このオプションを使うことでそれを防ぐことができます。
