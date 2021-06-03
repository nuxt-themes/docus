---
title: 'API: nuxt.renderAndGetWindow(url, options)'
description: 渲染指定url并获取对应的window对象。
menu: renderAndGetWindow
category: programmatically
position: 204
---

# nuxt.renderAndGetWindow(url, options = {})

- 类型： `Function`
- 参数： `String`
  1. `String`： 待渲染的 URL 路径
  2. _可选_， `Object`： options
  - virtualConsole： `Boolean` (默认值：`true`)
- 返回值： `Promise`
  - `Promise` 最终返回的值: `window`

> 渲染指定 url 并获取对应的 window 对象。

<div class="Alert Alert--orange">

这个方法只用于 [测试目的](guide/development-tools#端对端测试)。

</div>

要使用这个方法，需要先安装 `jsdom`：

```bash
npm install --save-dev jsdom
```

例如：

```js
const Nuxt = require('nuxt')
const nuxt = new Nuxt()

nuxt.renderAndGetWindow('http://localhost:3000').then(window => {
  // 显示文档标题
  console.log(window.document.title)
})
```
