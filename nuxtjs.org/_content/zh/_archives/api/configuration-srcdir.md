---
title: 'API: srcDir 属性配置'
description: 设置 Nuxt.js 应用的源码目录
menu: srcDir
category: configuration
position: 128
---

# srcDir 属性配置

- 类型： `String`
- 默认值：[rootDir 的值](/api/configuration-rootdir)

> 设置 Nuxt.js 应用的源码目录

例如 (`nuxt.config.js`)：

```js
module.exports = {
  srcDir: 'client/'
}
```

此时，应用的目录结构应为：

```bash
-| app/
---| node_modules/
---| client/
------| pages/
------| components/
---| nuxt.config.js
---| package.json
```

当在现有的服务中集成使用 Nuxt.js 时，该配置项才有使用价值。可以将 Nuxt.js 的依赖包和原服务的 npm 依赖包一起组织至一个 `package.json` 文件中。
