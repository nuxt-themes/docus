---
title: 'API: vue.config 属性'
description: Vue.config的配置对象
menu: vue.config
category: configuration
position: 132
---

# vue.config 属性

- 类型: `Object`
- 默认: `{ silent: !isDev, performance: isDev }`

> vue.config 属性为`Vue.config`提供直接配置

**示例**

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

将配置以下 Vue.config：

```js
Vue.config.productionTip // true
Vue.config.devtools // false
Vue.config.silent // !isDev [default value]
Vue.config.performance // isDev [default value]
```

了解更多关于 `Vue.config` API, 请查看 [official Vue 文档](https://vuejs.org/v2/api/#Global-Config)
