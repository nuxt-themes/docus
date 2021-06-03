---
title: 'API: rootDir 属性配置'
description: 设置 Nuxt.js 应用的根目录。
menu: rootDir
category: configuration
position: 123
---

# rootDir 属性配置

- 类型： `String`
- 默认值： `process.cwd()`

> 设置 Nuxt.js 应用的根目录。

该配置项的值会被 [nuxt 命令行](/guide/commands) 指定的路径参数覆盖（例如：`nuxt my-app/` 会将 `rootDir` 的值覆盖设置为 `my-app/` 目录对应的绝对路径）。

该配置项一般是 [编码中使用 Nuxt.js](/api/nuxt) 时才会被用到。

<div class="Alert Alert--blue">

该配置项的一个限制是应用的 `node_modules` 目录必须在 `rootDir` 目录内。 应用的源码目录（`srcDir`）则无此限制，具体请查看 [`srcDir` 属性配置](/api/configuration-srcdir)。

</div>
