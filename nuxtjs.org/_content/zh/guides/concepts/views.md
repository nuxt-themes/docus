---
title: Views 视图
description: 在`Views`视图部分，你可以了解到在Nuxt.js应用中为特定路由配置`data`数据和`View`视图所需的所有知识。`View`视图由应用模板`template`，布局`layout`和实际页面`page`组成。
position: 1
category: concepts
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/01_views?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: What is the composition order of a Nuxt view (top-down)?
    answers:
      - Layout → Page → Document
      - Page → Layout → Document
      - Document → Layout → Page
    correctAnswer: Document → Layout → Page
  - question: What is the default layout called?
    answers:
      - default.vue
      - layout.vue
      - defaultLayout.vue
    correctAnswer: default.vue
  - question: How do you create a custom layout?
    answers:
      - add a .vue file to the pages folder
      - add a .vue file to the layouts folder
      - add a .vue file to the components folder
    correctAnswer: add a .vue file to the layouts folder
  - question: How do you activate your custom layout called 'blog' on your page?
    answers:
      - "layout: 'blog'"
      - "layout: 'default'"
      - "blog: 'blog'"
    correctAnswer: "layout: 'blog'"
  - question: Where do you put your error.vue file that creates a customized error page
    answers:
      - in the pages folder
      - in the errors folder
      - in the layouts folder
    correctAnswer: in the layouts folder
---

在`Views`视图部分，你可以了解到在 Nuxt.js 应用中为特定路由配置`data`数据和`View`视图所需的所有知识。`View`视图由应用模板`template`，布局`layout`和实际页面`page`组成。此外，还可以为每页的首页定义自定义`meta`标记，这对于`SEO`（搜索引擎优化）很重要。

![Composition of a View in Nuxt.js](/docs/2.x/views.png)

Nuxt.js 中`Views`视图的组成

## Pages 页面

每个`Page`组件都是`Vue`组件，但是 Nuxt.js 添加了特殊的属性和功能，让你在开发应用时更加得心应手。

```html{}[pages/index.vue]
<template>
  <h1 class="red">Hello World</h1>
</template>

<script>
  export default {
    head() {
      // Set Meta Tags for this Page
    }
    // ...
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

## `Page`页面组件的属性

`Page`页面组件有许多属性，例如上述例子中的`head`属性。

<base-alert type="next">

查看[目录结构](/docs/2.x/directory-structure/nuxt) ，了解在`page`页面上可以使用的所有属性。

</base-alert>

## Layouts 布局

当你想要更改 Nuxt.js 应用的外观时，布局可以帮到你很多。

比如，需要有侧边栏的布局或针对移动设备和台式机的独特布局。

### 默认布局

你可以在`layouts`目录中添加`default.vue`文件来定义默认布局。这将用于所有未指定布局的页面。

确保在默认布局中包含`<Nuxt />`组件。

```html{}[layouts/default.vue]
<template>
  <Nuxt />
</template>
```

<base-alert type="next">

在组件目录中，了解更多有关 [Nuxt component](/docs/2.x/features/nuxt-components) 的信息

</base-alert>

### 自定义布局

你可以在`layouts`文件夹内添加 `.vue` 文件来创建自定义布局。为了使用自定义布局，你需要在要使用该布局的页面组件中设置`layout`属性。这个值将是你创建的自定义布局的名称。

在你的`layouts`文件夹下添加`blog.vue`文件，创建一个 blog 博客布局。

```html{}[layouts/blog.vue]
<template>
  <div>
    <div>My blog navigation bar here</div>
    <Nuxt />
  </div>
</template>
```

<base-alert>

在创建包括实际页面组件的布局时，请确保`<Nuxt />`组件已经被添加。

</base-alert>

然后，在想要使用该布局的页面中，将`layout`属性值设为'blog'。

```html{}[pages/posts.vue]
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

<base-alert type="info">

如果你没有向页面添加`layout`属性，例如`layout：'blog'`，那么将默认使用 default.vue 布局。

</base-alert>

## 错误页面

错误页面是一个*page component*页面组件，它会在发生错误时显示（不会在服务器端渲染时显示）。

<base-alert>

尽管这个文件放在`layouts`文件夹中，但应该把它当做一个页面。

</base-alert>

如上所述，这种布局是特殊的，因为你不应该在`template`模板中包含`<Nuxt />`组件。

你需要将此布局视为发生错误（如`404`，`500`状态码）时显示的组件。与其他页面组件类似，您也可以按照常规方式为错误页面设置自定义布局。

您可以添加一个`layouts/error.vue`文件来自定义错误页面：

```html{}[layouts/error.vue]
<template>
  <div>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>
```

## 文档: App.html

`app template`模板是为 Nuxt.js 应用创建结构的 HTML 框架，该框架可以给`head`和`body`注入变量。这个文件是自动创建的，通常很少需要修改。你可以通过在项目的源目录中创建一个`app.html`文件（默认情况下是根目录）来自定义 Nuxt.js 使用的 HTML 应用模板，可以添加`scripts`或`CSS`类。

Nuxt.js 使用的默认模板是：

```html{}[app.html]
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

使用自定义应用模板的一个用例是给 IE 添加条件 CSS 类：

```html{}[app.html]
<!DOCTYPE html>
<!--[if IE 9]><html class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

<base-alert type="info">

虽然你可以在`app.html`中添加 JavaScript 和 CSS 文件，但还是建议你使用`nuxt.config.js`来解决这些问题！

</base-alert>

<quiz :questions="questions"></quiz>
