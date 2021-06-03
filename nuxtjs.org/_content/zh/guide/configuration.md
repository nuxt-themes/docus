---
title: 配置
description: Nuxt.js 默认的配置涵盖了大部分使用情形，可通过 nuxt.config.js 来覆盖默认的配置。
category: getting-started
position: 103
---

> Nuxt.js 默认的配置涵盖了大部分使用情形，可通过 nuxt.config.js 来覆盖默认的配置。

### build

Nuxt.js 允许你在自动生成的 `vendor.bundle.js` 文件中添加一些模块，以减少应用 bundle 的体积。如果你的应用依赖第三方模块，这个配置项是十分实用的。

[关于 build 配置项的详细文档](/docs/2.x/configuration-glossary/configuration-build)

### css

该配置项用于定义应用的全局（所有页面均需引用的）样式文件、模块或第三方库。

[关于 css 配置项的详细文档](/api/configuration-css)

### dev

该配置项用于配置 Nuxt.js 应用是开发还是生产模式。

[关于 dev 配置项的详细文档](/api/configuration-dev)

### env

该配置项用于定义应用客户端和服务端的环境变量。

[关于 env 配置项的详细文档](/docs/2.x/configuration-glossary/configuration-env)

### generate

该配置项用于定义每个动态路由的参数，Nuxt.js 依据这些路由配置生成对应目录结构的静态文件。

[关于 generate 配置项的详细文档](/docs/2.x/configuration-glossary/configuration-generate)

### head

该配置项用于配置应用默认的 meta 标签。

[关于 head 配置项的详细文档](/docs/2.x/configuration-glossary/configuration-head)

### loading

该配置项用于个性化定制 Nuxt.js 使用的加载组件。

[关于 loading 配置项的详细文档](/api/configuration-loading)

### modules

该配置项允许您将 Nuxt 模块添加到项目中。

[关于 `modules` 配置项的详细文档](/docs/2.x/configuration-glossary/configuration-modules)

### modulesDir

该配置项允许您定义`Nuxt.js`应用程序的`node_modules`文件夹。

[关于 `modulesDir` 配置项的详细文档](/docs/2.x/configuration-glossary/configuration-modulesdir)

### plugins

该配置项用于配置那些需要在 `根vue.js应用` 实例化之前需要运行的 Javascript 插件。

[关于 plugins 配置项的详细文档](/api/configuration-plugins)

### rootDir

该配置项用于配置 Nuxt.js 应用的根目录。

[关于 rootDir 配置项的详细文档](/api/configuration-rootdir)

### router

该配置项可用于覆盖 Nuxt.js 默认的 `vue-router` 配置。

[关于 router 配置项的详细文档](/api/configuration-router)

### server

此选项允许您配置 Nuxt.js 应用程序的服务器实例变量。

[关于 server 配置项的详细文档](/api/configuration-server)

### srcDir

该配置项用于配置应用的源码目录路径。

[关于 srcDir 配置项的详细文档](/api/configuration-srcdir)

### dir

此选项允许您配置 Nuxt.js 应用程序的自定义目录。

[Documentation about `dir` integration](/api/configuration-dir)

### transition

该配置项用于个性化配置应用过渡效果属性的默认值。

[关于 transition 配置项的详细文档](/api/configuration-transition)
