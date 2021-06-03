---
title: 'vue.config プロパティ'
description: 'Vue.config の構成オブジェクト'
menu: vue.config
category: configuration-glossary
position: 32
---

- 型: `Object`
- デフォルト: `{ silent: !isDev, performance: isDev }`

> vue.config プロパティは `Vue.config` 用に直接設定できる橋渡しを提供します。

**例**

```js{}[nuxt.config.js]
export default {
  vue: {
    config: {
      productionTip: true,
      devtools: false
    }
  }
}
```

この設定により次の Vue.config が作成されます:

```js
Vue.config.productionTip // true
Vue.config.devtools // false
Vue.config.silent // !isDev（デフォルト値）
Vue.config.performance // isDev（デフォルト値）
```

`Vue.config` API の詳細については[公式の Vue のドキュメント](https://jp.vuejs.org/v2/api/index.html#%E3%82%B0%E3%83%AD%E3%83%BC%E3%83%90%E3%83%AB%E8%A8%AD%E5%AE%9A)を参照してください。
