---
title: Views
description: The Views section describes all you need to configure data and views for a specific route in your Nuxt.js Application (Document, Layouts, Pages and HTML Head).
category: getting-started
position: 105
---

> The Views section describes all you need to configure data and views for a specific route in your Nuxt.js Application (App Template, Layouts, Pages and HTML Head).

![nuxt-views-schema](/nuxt-views-schema.svg)

## App Template

> You can customize the HTML app template used by Nuxt.js to include scripts or conditional CSS classes.

To change the template, create an `app.html` file, in the src folder of your project. (which is the project's root directory by default).

The default template used by Nuxt.js is:

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

One use case of using a custom app template is to add conditional CSS classes for IE:

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

<!-- TODO: Load polyfills here? -->

## Layouts

Layouts are a great help when you want to change the look and feel of your Nuxt.js app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

### Default Layout

You can extend the main layout by adding a `layouts/default.vue` file. It will be used for all pages that don't have a layout specified.

<div class="Alert Alert--nuxt-green">

<b>Info:</b> Make sure to add the `<nuxt/>` component when creating a layout to actually include the page component.

</div>

The default layout that comes out of the box is just three lines long and simply renders the page component:

```html
<template>
  <nuxt />
</template>
```

### Custom Layout

Every file (_top-level_) in the `layouts` directory will create a custom layout accessible with the `layout` property in the page components.

Let's say we want to create a blog layout and save it to `layouts/blog.vue`:

```html
<template>
  <div>
    <div>My blog navigation bar here</div>
    <nuxt />
  </div>
</template>
```

Then we have to tell the pages (i.e. `pages/posts.vue`) to use your custom layout:

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

More information about the `layout` property: [API Pages `layout`](/api/pages-layout)

Check out the [demonstration video](https://www.youtube.com/watch?v=YOKnSTp7d38) to see custom layouts in action.

<!-- TODO: Scoped styles best practice -->

### Error Page

The error page is a _page component_ which is always displayed when an error occurs (that does not happen while server-side rendering).

<div class="Alert Alert--orange">

<b>Warning:</b> Though this file is placed in the <code>layouts</code> folder, it should be treated as a <b>page</b>.

</div>

As mentioned above, this layout is special, since you **should not** include `<nuxt/>` inside its template. You must see this layout as a component displayed when an error occurs (`404`, `500`, etc.). Similar to other page components, you can set a custom layout for the error page as well in the usual way.

The default error page source code is [available on GitHub](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt-error.vue).

You can customize the error page by adding a `layouts/error.vue` file:

```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'blog' // you can set a custom layout for the error page
  }
</script>
```

## Pages

Every Page component is a Vue component but Nuxt.js adds special attributes and functions to make the development of your universal application as easy as possible.

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/nuxtjs-page-components?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Watch a free lesson about <strong>Nuxt.js Page Components</strong> on Vue School
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
      // as the name said, it can be async
      // Also, the returned object will be merged with your data object
      return { name: 'World' }
    },
    fetch () {
      // The `fetch` method is used to fill the store before rendering the page
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

| Attribute     | Description                                                                                                                                                                                                                                                                                                                           | Documentation                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `asyncData`   | The most important key. It can be asynchronous and receives the context as argument.                                                                                                                                                                                                                                                  | [Guide: Async data](/guide/async-data)                                     |
| `fetch`       | Used to fill the store before rendering the page. It's like the `asyncData` method, except it doesn't set the component data.                                                                                                                                                                                                         | [API Pages `fetch`](/api/pages-fetch)                                      |
| `head`        | Set specific `<meta>` tags for the current page.                                                                                                                                                                                                                                                                                      | [API Pages `head`](/api/pages-head)                                        |
| `layout`      | Specify a layout defined in the `layouts` directory.                                                                                                                                                                                                                                                                                  | [API Pages `layout`](/api/pages-layout)                                    |
| `loading`     | If set to `false`, prevents a page from automatically calling `this.$nuxt.$loading.finish()` as you enter it and `this.$nuxt.$loading.start()` as you leave it, allowing you to **manually** control the behavior, as [this example](/examples/custom-page-loading) shows. Only applies if `loading` is also set in `nuxt.config.js`. | [API Configuration `loading`](/api/configuration-loading)                  |
| `transition`  | Defines a specific transition for the page.                                                                                                                                                                                                                                                                                           | [API Pages `transition`](/api/pages-transition)                            |
| `scrollToTop` | Boolean (default: `false`). Specify if you want the page to scroll to the top before rendering the page. It's used for [nested routes](/guide/routing#nested-routes).                                                                                                                                                                 | [API Pages `scrollToTop`](/api/pages-scrolltotop#the-scrolltotop-property) |
| `validate`    | Validator function for [dynamic routes](/guide/routing#dynamic-routes).                                                                                                                                                                                                                                                               | [API Pages `validate`](/api/pages-validate#the-validate-method)            |
| `middleware`  | Defines middleware for this page. The middleware will be called before rendering the page.                                                                                                                                                                                                                                            | [Guide: middleware](/guide/routing#middleware)                             |

More information about the pages properties usage: [API Pages](/api)

## HTML Head

Nuxt.js uses [vue-meta](https://vue-meta.nuxtjs.org/) to update the `document head` and `meta attributes` of your application.

The `vue-meta` Nuxt.js uses can be found [on GitHub](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/index.js#L42-L48).

<div class="Alert Alert--teal">

<b>Info:</b> Nuxt.js uses <code>hid</code> instead of the default <code>vmid</code> key to identify meta elements

</div>

### Default Meta Tags

Nuxt.js lets you define all default `<meta>` tags for your application inside `nuxt.config.js`. Define them using the same `head` property:

Example of a custom viewport with a custom Google font:

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

To learn more about the options available for `head`, take a look at [vue-meta documentation](https://vue-meta.nuxtjs.org/api/#metainfo-properties).

More information about the `head` method are available on the [API Configuration `head`](/api/configuration-head) page.

### Custom Meta Tags for a Page

More information about the head method can be found on the [API Pages `head`](/api/pages-head) page.
