---
title: Caching Components
description: 如何使用 cache 组件？
menu: 如何使用 cache 组件？
category: configuration
position: 8
---

# 如何使用 Vue 组件中的 cache？

> 虽然 Vue 的 SSR 非常快，但由于创建组件实例和 Virtual DOM 节点的成本，它无法与纯粹基于字符串的模板的性能相匹配。在 SSR 性能至关重要的情况下，合理地利用缓存策略可以大大缩短响应时间并减少服务器负载。

请使用 Nuxt.js 的[Component Cache module](https://github.com/nuxt-community/modules/tree/master/packages/component-cache)模块。此模块使用 vue-server-renderer 为 Vue 组件添加 LRU 缓存支持。

## 使用

- 使用 yarn 或 npm 将 `@nuxtjs/component-cache` 依赖项添加到项目中
- 将 `@nuxtjs/component-cache` 添加到 `nuxt.config.js` 的`modules`部分

```js
{
  modules: [
    // 简单的用法
    '@nuxtjs/component-cache',

    // 配置选项
    [
      '@nuxtjs/component-cache',
      {
        max: 10000,
        maxAge: 1000 * 60 * 60
      }
    ]
  ]
}
```

有关更多信息，请参阅[component-level caching](http://ssr.vuejs.org/en/caching.html#component-level-caching)。

## 提醒

- 可缓存组件**必须定义唯一 `name` 选项**。
- 不应该缓存组件的情况
  - 可能拥有依赖`global`数据的子组件。
  - 具有在渲染`context`中产生副作用的子组件。
