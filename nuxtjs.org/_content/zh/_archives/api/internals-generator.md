---
title: 'API: The Generator Class'
description: Nuxt Generator Class
menu: Generator
category: internals
position: 306
---

# Generator Class

- 来源: **[generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)**

## Hooks

我们可以在某些生命周期事件中注册钩子。

| Hook                    | Arguments               | When                             |
| ----------------------- | ----------------------- | -------------------------------- |
| `generate:before`       | (nuxt, generateOptions) | 钩子(hook)生成之前               |
| `generate:distRemoved`  | (nuxt)                  | 钩子(hook)目标文件夹已清理       |
| `generate:distCopied`   | (nuxt)                  | 钩子(hook)复制静态和构建文件     |
| `generate:page`         | ({route, path, html})   | 钩子(hook)让用户更新 path&html   |
| `generate:routeCreated` | (route, path, errors)   | 钩子(hook)生成页面成功           |
| `generate:extendRoutes` | (routes)                | 钩子(hook)让用户更新要生成的路由 |
| `generate:routeFailed`  | (route, errors)         | 钩子(hook)保存生成的页面失败     |
| `generate:done`         | (nuxt, errors)          | 钩子(hook)生成完毕               |
