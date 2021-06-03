---
title: 视图
description: 视图章节的内容阐述了如何在 Nuxt.js 应用中为指定的路由配置数据和视图，包括页面、布局和HTML头部等内容。
category: getting-started
position: 105
---

> 本章节的内容阐述了如何在 Nuxt.js 应用中为指定的路由配置数据和视图，包括应用模板、页面、布局和 HTML 头部等内容。

![nuxt-views-schema](/nuxt-views-schema.svg)

## 模板

> 你可以定制化 Nuxt.js 默认的应用模板。

定制化默认的 html 模板，只需要在 src 文件夹下（默认是应用根目录）创建一个 `app.html` 的文件。

默认模板为：

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

举个例子，你可以修改模板添加 IE 的条件表达式：

```html
<!DOCTYPE html>
<!--[if IE 9]><html lang="en-US" class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

## 布局

Nuxt.js 允许你扩展默认的布局，或在 `layout` 目录下创建自定义的布局。

### 默认布局

可通过添加 `layouts/default.vue` 文件来扩展应用的默认布局。

<div class="Alert Alert--nuxt-green">

<b>提示:</b> 别忘了在布局文件中添加 `<nuxt/>` 组件用于显示页面的主体内容。

</div>

默认布局的源码如下：

```html
<template>
  <nuxt />
</template>
```

### 自定义布局

`layouts` 目录中的每个文件 (_顶级_) 都将创建一个可通过页面组件中的 `layout` 属性访问的自定义布局。

假设我们要创建一个 _博客布局_ 并将其保存到`layouts/blog.vue`:

```html
<template>
  <div>
    <div>我的博客导航栏在这里</div>
    <nuxt />
  </div>
</template>
```

然后我们必须告诉页面 (即`pages/posts.vue`) 使用您的自定义布局：

```html
<template>
  <!-- Your template -->
</template>
<script>
  export default {
    layout: 'blog'
    // page component definitions
  }
</script>
```

更多有关 `layout` 属性信息: [API 页面 `布局`](/api/pages-layout)

点击查看 [演示视频](https://www.youtube.com/watch?v=YOKnSTp7d38) 了解自定义布局的实际效果。

### 错误页面

> 你可以通过编辑 `layouts/error.vue` 文件来定制化错误页面.

<div class="Alert Alert--orange">

<b>警告:</b> 虽然此文件放在 <code>layouts</code> 文件夹中, 但应该将它看作是一个 <b>页面(page)</b>.

</div>

这个布局文件不需要包含 `<nuxt/>` 标签。你可以把这个布局文件当成是显示应用错误（404，500 等）的组件。

默认的错误页面源码在 [这里](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt-error.vue).

举一个个性化错误页面的例子 `layouts/error.vue`:

```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">页面不存在</h1>
    <h1 v-else>应用发生错误异常</h1>
    <nuxt-link to="/">首 页</nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'blog' // 你可以为错误页面指定自定义的布局
  }
</script>
```

## 页面

页面组件实际上是 Vue 组件，只不过 Nuxt.js 为这些组件添加了一些特殊的配置项（对应 Nuxt.js 提供的功能特性）以便你能快速开发通用应用。

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/nuxtjs-page-components?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      观看Vue School出品的 <strong>Nuxt.js 页面组件</strong> 的免费课程 
    </p>
  </a>
</div>

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
  export default {
    asyncData (context) {
      // called every time before loading the component
      return { name: 'World' }
    },
    fetch () {
      // The fetch method is used to fill the store before rendering the page
    },
    head () {
      // Set Meta Tags for this Page
    },
    // and more functionality to discover
    ...
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

Nuxt.js 为页面提供的特殊配置项：

| 属性名      | 描述                                                                                                                                                                                                                                                                                |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| asyncData   | 最重要的一个键, 支持 [异步数据处理](/docs/2.x/features/data-fetching#async-data)，另外该方法的第一个参数为当前页面组件的 [上下文对象](/api#上下文对象)。                                                                                                                            |
| fetch       | 与 `asyncData` 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 `fetch` 方法不会设置组件的数据。详情请参考 [关于 fetch 方法的文档](/docs/2.x/components-glossary/pages-fetch)。                                                                              |
| head        | 配置当前页面的 Meta 标签, 详情参考 [页面头部配置 API](/api/pages-head)。                                                                                                                                                                                                            |
| layout      | 指定当前页面使用的布局（`layouts` 根目录下的布局文件）。详情请参考 [关于 布局 的文档](/api/pages-layout)。                                                                                                                                                                          |
| loading     | 如果设置为`false`，则阻止页面自动调用`this.$nuxt.$loading.finish()`和`this.$nuxt.$loading.start()`,您可以手动控制它,请看[例子](/examples/custom-loading-component),仅适用于在 nuxt.config.js 中设置`loading`的情况下。请参考[API 配置 `loading` 文档](/api/configuration-loading)。 |
| transition  | 指定页面切换的过渡动效, 详情请参考 [页面过渡动效](/api/pages-transition)。                                                                                                                                                                                                          |
| scrollToTop | 布尔值，默认: `false`。 用于判定渲染页面前是否需要将当前页面滚动至顶部。这个配置用于 [嵌套路由](/docs/2.x/features/file-system-routing)的应用场景。                                                                                                                                 |
| validate    | 校验方法用于校验 [动态路由](/docs/2.x/features/file-system-routing)的参数。                                                                                                                                                                                                         |
| middleware  | 指定页面的中间件，中间件会在页面渲染之前被调用， 请参考 [路由中间件](/docs/2.x/features/file-system-routing)。                                                                                                                                                                      |

关于页面配置项的详细信息，请参考 [页面 API](/api)。

## HTML 头部

Nuxt.js 使用了 [`vue-meta`](https://github.com/nuxt/vue-meta) 更新应用的 `头部标签(Head)` and `html 属性`。

Nuxt.js 使用以下参数配置 `vue-meta`:

```js
{
  keyName: 'head', // 设置 meta 信息的组件对象的字段，vue-meta 会根据这 key 值获取 meta 信息
  attribute: 'n-head', // vue-meta 在监听标签时所添加的属性名
  ssrAttribute: 'n-head-ssr', // 让 vue-meta 获知 meta 信息已完成服务端渲染的属性名
  tagIDKeyName: 'hid' // 让 vue-meta 用来决定是否覆盖还是追加 tag 的属性名
}
```

### 默认 Meta 标签

Nuxt.js 允许你在 `nuxt.config.js` 里定义应用所需的所有默认 meta 标签，在 `head` 字段里配置就可以了：

<div class="Alert Alert--teal">

<b>注意:</b> Nuxt.js 使用 <code>hid</code> 而不是默认值 <code>vmid</code> 识别元素`key`

</div>

一个使用自定义 `viewport` 和 `谷歌字体` 的配置示例：

```js
head: {
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
  ]
}
```

想了解 `head` 变量的所有可选项的话，请查阅 [`vue-meta` 使用文档](https://vue-meta.nuxtjs.org/api/#metainfo-properties)。

关于 Nuxt.js 应用 HTML 头部配置的更多信息，请参考 [HTML 头部配置 API](/api/configuration-head)。

### 个性化特定页面的 Meta 标签

关于个性化特定页面的 Meta 标签，请参考 [页面头部配置 API](/api/pages-head)。

<div class="Alert Alert--teal">

<b>注意:</b> 为了避免子组件中的 meta 标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 `hid` 键为 meta 标签配一个唯一的标识编号。请阅读[关于 `vue-meta` 的更多信息](https://vue-meta.nuxtjs.org/api/#tagidkeyname)。

</div>
