---
title: 目录结构
description: 默认的Nuxt.js应用结构旨在为小型和大型的应用提供一个良好的起点。开发者可以随意组织自己的应用程序，也可以在需要时创建其他目录。
position: 3
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/03_directory_structure?fontsize=14&hidenavigation=1&theme=dark
---

默认的 Nuxt.js 应用结构旨在为小型和大型的应用提供一个良好的起点。开发者可以随意组织自己的应用程序，也可以在需要时创建其他目录。

现在让我们创建项目中尚不存在的目录和文件。

```bash
mkdir components assets static
touch nuxt.config.js
```

这些是构建 Nuxt.js 应用时使用的主要目录和文件。你将在下面找到每个说明。

<base-alert type="info">

要使用 Nuxt.js 项目中的功能，需要用指定用这些名称来创建目录。

</base-alert>

## 目录

### `pages`目录

`page`目录包含应用的视图和路由。正如在上一章中学到的那样，Nuxt.js 读取此目录中的所有`.vue`文件并使用它们创建应用路由。

<base-alert type="next">

了解更多关于 [pages directory](/docs/2.x/directory-structure/pages)

</base-alert>

### `components`目录

`components`目录是放置你所有`Vue.js`组件的位置，然后将这些组件导入到你的页面中。

使用 Nuxt.js，可以创建组件并将其自动导入到`.vue`文件中，这意味着无需在`<script>`部分中手动导入它们。 一旦将组件设置为`true`，Nuxt.js 将扫描并自动导入这些文件。

<base-alert type="next">

了解更多关于 [components directory](/docs/2.x/directory-structure/components)

</base-alert>

### `assets`目录

`assets`目录可以放置未编译的依赖，例如样式，图像或字体。

<base-alert type="next">

了解更多关于 [assets directory](/docs/2.x/directory-structure/assets)

</base-alert>

### `static`目录

`static`目录则直接映射到服务器根目录，可以放置必须保留名称后缀的文件（例如：`robots.txt`）或着不太会更改的文件（例如:`favicon.ico`）

<base-alert type="next">

了解更多关于 [static directory](/docs/2.x/directory-structure/static)

</base-alert>

### `nuxt.config.js`文件

`nuxt.config.js`是 Nuxt.js 唯一的应用配置文件。如果要添加模块或覆盖默认设置，则可以在此处应用更改。

<base-alert type="next">

了解更多关于 [nuxt.config.js file](/docs/2.x/directory-structure/nuxt-config)

</base-alert>

### `package.json`文件

`package.json`文件包含有关应用的所有依赖关系和使用方法。

## 有关项目结构的更多信息

还有更多有用的目录和文件，比如[content](/docs/2.x/directory-structure/content), [layouts](/docs/2.x/directory-structure/layouts), [middleware](/docs/2.x/directory-structure/middleware), [modules](/docs/2.x/directory-structure/modules), [plugins](/docs/2.x/directory-structure/plugins) 和 [store](/docs/2.x/directory-structure/store)。由于它们对小型的应用来说并不是必需的，因此这里不介绍它们。

<base-alert type="next">

要详细了解所有有关目录的信息，请随时阅读[Directory Structure book](/docs/2.x/directory-structure/nuxt).

</base-alert>
