---
title: 'API: CSS 配置'
description: 在 Nuxtjs 里配置全局的 CSS 文件、模块、库。 (每个页面都会被引入)
menu: css
category: configuration
position: 104
---

# CSS 配置

> 在 Nuxtjs 里配置全局的 CSS 文件、模块、库。 (每个页面都会被引入)

如果要使用 `sass` 就必须要安装 `sass`和`sass-loader` 。

```sh
npm install --save-dev sass sass-loader fibers
```

在 `nuxt.conf.js`中，添加要使用的 CSS 资源：

- Type: Array
- Items: string

```js
module.exports = {
  css: [
    // 直接加载一个 Node.js 模块。（在这里它是一个 Sass 文件）
    'bulma',
    // 项目里要用的 CSS 文件
    '@/assets/css/main.css',
    // 项目里要使用的 SCSS 文件
    '@/assets/css/main.scss'
  ]
}
```

Nuxt.js 会自动识别被导入文件的扩展名，之后，webpack 会使用相应的预处理器进行处理。前提是，你安装了对应预处理器。
