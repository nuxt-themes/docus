---
title: 'API: modules 属性'
description: modules是Nuxt.js扩展，可以扩展它的核心功能并添加无限的集成。
menu: modules
category: configuration
position: 119
---

# modules 属性

- 类型: `Array`

> modules 是 Nuxt.js 扩展，可以扩展它的核心功能并添加无限的集成。[了解更多](/guide/modules)

例如 (`nuxt.config.js`):

```js
export default {
  modules: [
    // Using package name
    '@nuxtjs/axios',

    // Relative to your project srcDir
    '~/modules/awesome.js',

    // Providing options
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // Inline definition
    function () {}
  ]
}
```

模块开发通常会提供额外需要的步骤和使用细节。

Nuxt.js 尝试使用节点需求路径（在`node_modules`中）解析`modules`数组中的每个项目，如果使用`~`别名，则将从项目`srcDir`中解析。模块按顺序执行，因此顺序很重要。

模块应该导出一个函数来增强**nuxt 构建 / 运行**，并可选择返回一个`promise`，直到它们的工作完成。请注意，它们在运行时是必需的，因此如果依赖于现代`ES6`功能，应该已经进行了转换。

有关它们如何工作或是否有兴趣开发自己的模块的更多详细信息，请参阅[模块指南](/guide/modules)。此外，我们还提供了一个官方[Modules](https://github.com/nuxt-community/awesome-nuxt#modules)部分，列出了由 Nuxt 社区制作的数十个生产模块。
