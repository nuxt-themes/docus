---
title: 资源文件
description: 默认情况下 Nuxt 使用 vue-loader、file-loader 以及 url-loader 这几个 Webpack 加载器来处理文件的加载和引用。
category: getting-started
position: 107
---

> 默认情况下 Nuxt 使用 vue-loader、file-loader 以及 url-loader 这几个 Webpack 加载器来处理文件的加载和引用。对于不需要通过 Webpack 处理的静态资源文件，可以放置在 `static` 目录中。

## Webpack 构建

默认情况下, [vue-loader](http://vue-loader.vuejs.org/en/)自动使用 `css-loader` 和 Vue 模板编译器来编译处理 vue 文件中的样式和模板。在此编译过程中，所有的资源 URL 例如 `<img src="...">`、 `background: url(...)` 和 CSS 中的 `@import` 均会被解析成模块通过 `require` 引用。

举个例子, 假设我们有以下文件目录结构：

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

如果我们在 CSS 代码中使用 `url('~assets/image.png')`, 那么编译后它将被转换成 `require('~/assets/image.png')`。

<div class="Alert Alert--orange">

**请注意:** 从 Nuxt 2.0 开始，`~/alias`将无法在**CSS 文件**中正确解析。你必须在 url CSS 引用中使用`~assets`（没有斜杠）或`@`别名，即`background:url("~assets/banner.svg")`

</div>

又或者如果我们在 `pages/index.vue` 中使用以下代码引用图片资源：

```html
<template>
  <img src="~/assets/image.png" />
</template>
```

那么编译后会被转换成：

```js
createElement('img', { attrs: { src: require('~/assets/image.png') } })
```

`.png` 并非 JavaScript 文件, 因此 Nuxt.js 通过配置 Webpack 使用[file-loader](https://github.com/webpack/file-loader) 和 [url-loader](https://github.com/webpack/url-loader) 这两个加载器来处理此类引用。

这样做的好处有：

- `file-loader` 能让你指定从什么地方拷贝资源文件以及发布后放到哪个目录去，并能让你使用版本哈希码来重命名发布后的文件来实现增量更新和更好的缓存策略。
- `url-loader` 能根据你指定的文件大小阈值，来判断一个文件是转换成内联的 base-64 码（如果该文件尺寸小于该阈值）还是使用`file-loader`来降级处理。小文件 base-64 化能有效减少 HTTP 请求数。

实际上, Nuxt.js 默认的加载器配置如下：

```js
;[
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1KB
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1 KB
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

也即文件（图片或字体）的尺寸小于 1K 的时候，它将会被转换成 Base-64 data URL 来内联引用；否则它将被拷贝至指定的子目录（在 `.nuxt` 目录下），并被重命名（加上 7 位的哈希码作为版本标识）以实现更好的缓存策略。

当用 `nuxt` 命令运行我们的应用时，`pages/index.vue` 中的模板代码：

```html
<template>
  <img src="~/assets/image.png" />
</template>
```

将被编译生成：

```html
<img src="/_nuxt/img/image.0c61159.png" />
```

如果你想更新这些加载器的配置或者禁用他们，请参考[build.extend](/docs/2.x/configuration-glossary/configuration-build#extend)。

## 静态文件

如果你的静态资源文件需要 Webpack 做构建编译处理，可以放到 `assets` 目录，否则可以放到 `static` 目录中去。

Nuxt 服务器启动的时候，该目录下的文件会映射至应用的根路径 `/` 下，像 `robots.txt` 或 `sitemap.xml` 这种类型的文件就很适合放到 `static` 目录中。

你可以在代码中使用根路径 `/` 结合资源相对路径来引用静态资源：

```html
<!-- 引用 static 目录下的图片 -->
<img src="/my-image.png" />

<!-- 引用 assets 目录下经过 webpack 构建处理后的图片 -->
<img src="~/assets/my-image-2.png" />
```
