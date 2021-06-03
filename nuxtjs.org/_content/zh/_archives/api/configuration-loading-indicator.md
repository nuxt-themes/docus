---
title: 'API: The loading indicator Property'
description: 在SPA页面加载时显示不同加载进度条！
menu: loadingIndicator
category: configuration
position: 116
---

# loadingIndicator 属性

> 在 SPA 页面加载时显示不同加载进度条！

在 SPA 模式下运行 Nuxt.js 时，第一页加载时没有来自服务器端的内容。因此，我们可能会显示一个加载进度，而不是在页面加载时显示空白页面。此属性可以有 3 种不同的类型：`string`或`false`或`object`。如果提供了`string`值，则将其转换为`object`样式。

默认值为:

```js
{
  name: 'circle',
  color: '#3B8070',
  background: 'white'
}
```

## 内置加载器样式

这些指标来自令人敬佩的[Spinkit](http://tobiasahlin.com/spinkit)项目。您可以使用其 demo 页面预览加载进度样式。

- circle
- cube-grid
- fading-circle
- folding-cube
- chasing-dots
- nuxt
- pulse
- rectangle-bounce
- rotating-plane
- three-bounce
- wandering-cubes

内置加载器样式支持 `color` 和 `background` 配置.

## 自定义加载器

如果您需要自己的特殊加载器，`String`值或`Name`键也可以是指标源代码的`html`模板的路径！所有选项也都传递给模板。

如果您需要基础配置，Nuxt 的内置[源代码](https://github.com/nuxt/nuxt.js/tree/dev/packages/vue-app/template/views/loading)也可用！
