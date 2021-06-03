---
title: 'API: modern 属性'
description: Build and server a modern bundle
menu: modern
category: configuration
position: 118
---

# modern 属性

> 此功能的想法来自 [vue-cli modern mode](https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode)

- 类型: `String` 或 `Boolean`
  - 默认: false
  - 可能的值:
    - `'client'`: 构建两个版本的包：同时提供面向支持现在浏览器的 ES2015+ 写法支持 `<script type ="module">` 和兼容性低的其他旧浏览器的包 `<script nomodule>` 的脚本，同时为现代浏览器打包提供 `<link rel ="modulepreload">` 。每个正确解析模块类型的现代浏览器都会加载现代浏览器软件依赖包，而旧版浏览器则会加载到指定旧版浏览器的依赖包（已编译）。
    - `'server'` or `true`: Node.js 服务器将根据用户代理检查浏览器版本，并提供相应的现代浏览器或兼容性低的浏览器捆绑依赖。
    - `false`: 关闭 modern 打包

捆绑打包的两个版本是:

1. Modern bundle: 定位支持 ES 模块的现代浏览器
1. Legacy bundle: 基于 babel 配置定位兼容性低浏览器（默认情况下兼容 IE9）。

**Info:** 在 package.json 中，可以使用命令选项：`[--modern | -m]=[mode]` 来指定构建并启动(`build/start`) modern 属性，例如：

```json
{
  "scripts": {
    "build:modern": "nuxt build --modern=server",
    "start:modern": "nuxt start --modern=server"
  }
}
```

- 当未指定`modern`时，在打包时 Nuxt 将自动检测`nuxt start`中的`modern`，自动检测模式为：

| Mode      | Modern Mode |
| --------- | :---------: |
| universal |   server    |
| spa       |   client    |

- 在使用`nuxt generate`时，`modern mode`只有`client`
- 使用 [`render.crossorigin`](/api/configuration-render#crossorigin) 在`<link>` 和 `<script>` 中设置 `crossorigin` 属性

> 请参阅 [Phillip Walton's excellent post](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) 来了解更多关于 modern builds 信息.
