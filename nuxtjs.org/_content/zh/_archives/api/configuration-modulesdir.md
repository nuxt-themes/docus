---
title: 'API: modulesDir 属性'
description: 为Nuxt.js应用程序定义modules目录
menu: modulesDir
category: configuration
position: 120
---

# modulesDir 属性

- 类型: `Array`
- 默认: `['node_modules']`
  > 用于设置路径解析的模块目录，例如：webpack resolveLoading，nodeExternal 和 postcss。配置路径为相对路径[options.rootDir](/api/configuration-rootdir) (默认: `process.cwd()`).

例如 (`nuxt.config.js`):

```js
export default {
  modulesDir: ['../../node_modules']
}
```

如果您的项目被 Yarn 工作区样式的 mono-repository，则可能需要设置此字段。
