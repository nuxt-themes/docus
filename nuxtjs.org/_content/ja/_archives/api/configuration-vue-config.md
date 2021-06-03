---
title: 'API: vue.config プロパティ'
description: Vue.config のための config オブジェクト
menu: vue.config
category: configuration
position: 132
---

- 型: `Object`
- デフォルト: `{ silent: !isDev, performance: isDev }`

> vue.config プロパティ は `Vue.config` を直接設定するための橋渡しをしてくれます。

**例**

```js
export default {
  vue: {
    config: {
      productionTip: true,
      devtools: false
    }
  }
}
```

この設定により、次の Vue.config が生成されます。

```js
Vue.config.productionTip // true
Vue.config.devtools // false
Vue.config.silent // !isDev [default value]
Vue.config.performance // isDev [default value]
```

`Vue.config` API についてもっと学びたければ、[公式の Vue ドキュメント](https://vuejs.org/v2/api/#Global-Config)を参照してください。
