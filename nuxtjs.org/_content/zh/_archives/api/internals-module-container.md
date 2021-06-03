---
title: 'API: The ModuleContainer Class'
description: Nuxt ModuleContainer Class
menu: Module Container
category: internals
position: 304
---

# ModuleContainer Class

- 来源: **[core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/module.js)**

所有[模块](/guide/modules)都将在`ModuleContainer`实例的`context`调用。

## Tapable plugins

我们可以在某些生命周期事件中注册 hooks。

```js
nuxt.moduleContainer.plugin('ready', async moduleContainer => {
  // Do this after all modules where ready
})
```

在 [modules](/guide/modules) 的`context`中我们可以使用它:

```js
this.plugin('ready', async moduleContainer => {
  // Do this after all modules where ready
})
```

| 插件    | 参数            | 说明                                   |
| ------- | --------------- | -------------------------------------- |
| `ready` | moduleContainer | `nuxt.config.js`中的所有模块都已初始化 |

## 方法

### ~~添加 Vendor(vendor)~~

**`vendor`已经废弃不再使用**

添加到`options.build.vendor`并应用唯一插件过滤器。

### 添加到模板中 (template)

- **template**: `String` or `Object`
  - `src`
  - `options`
  - `fileName`

在构建到项目`buildDir` (`.nuxt`)期间使用[lodash 模板](https://lodash.com/docs/4.17.4#template)渲染指定模板。

如果未提供`fileName`或`template`为`string`，则目标文件名默认为`[dirName].[fileName].[pathHash].[ext]`。

这个方法将返回 `{ dist, src, options }` 对象.

### 添加插件 (template)

使用`addTemplate`注册插件并将其添加到 `plugins[]`选项。

您可以使用`template.ssr: false`来禁用包含在 SSR 中的插件。

### 添加服务器端渲染中间件 (middleware)

将中间件插入 [options.serverMiddleware](/api/configuration-servermiddleware).

### extendBuild (fn)

Allows easily extending webpack build config by chaining [options.build.extend](/api/configuration-build#extend) function.

### extendRoutes (fn)

允许通过链接[options.build.extendRoutes](/api/configuration-router#extendroutes)函数轻松扩展 webpack 构建配置。

### 添加模块 (moduleOpts, requireOnce)

注册模块。`moduleOpts`可以是`string`或`[src, options]`。如果`requireOnce`为`true`且已解析的模块导出`meta`阻止两次注册相同的模块。

### requireModule (moduleOpts)

`addModule(moduleOpts, true)`

## Hooks

我们可以在某些生命周期事件中注册钩子。

| Hook             | Arguments                  | When                                                           |
| ---------------- | -------------------------- | -------------------------------------------------------------- |
| `modules:before` | (moduleContainer, options) | 在创建 ModuleContainer 类之前调用 ​​，对重载方法和选项很有用。 |
| `modules:done`   | (moduleContainer)          | 加载所有模块时调用。                                           |
