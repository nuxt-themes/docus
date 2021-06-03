---
title: Routing
description: Nuxt.js use the file-system to generate the routes of your web applications.
category: getting-started
position: 104
---

> Nuxt.js automatically generates the [vue-router](https://github.com/vuejs/vue-router) configuration based on your file tree of Vue files inside the `pages` directory.

<div class="Alert Alert--grey">

To navigate between pages, we recommend to use the [`<nuxt-link>`](/api/components-nuxt-link) component.

</div>

For example:

```html
<template>
  <nuxt-link to="/">Home page</nuxt-link>
</template>
```

## Basic Routes

This file tree:

```bash
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

will automatically generate:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

## Dynamic Routes

To define a dynamic route with a parameter, you need to define a .vue file OR a directory **prefixed by an underscore**.

This file tree:

```bash
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

will automatically generate:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

As you can see the route named `users-id` has the path `:id?` which makes it optional, if you want to make it required, create an `index.vue` file in the `users/_id` directory instead.

<div class="Alert Alert-blue">

As of Nuxt >= v2.13 there is a crawler installed that will now crawl your link tags and generate your routes when using the command `generate` based on those links.

</div>

<div class="Alert Alert--orange">

**Warning:** If you are using Nuxt >= v2.13 and have pages that have no links, such as secret pages, and you would like these to also be generated then you can use the `generate.routes` property.

**Warning:** dynamic routes are ignored by the `generate` command when using Nuxt <= v2.12

[API Configuration generate](/api/configuration-generate#routes)

</div>

### Validate Route Params

Nuxt.js lets you define a validator method inside your dynamic route component.

In this example: `pages/users/_id.vue`

```js
export default {
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
```

If the validate method does not return `true` or a `Promise` that resolve to `true`, or throws an Error, Nuxt.js will automatically load the 404 error page or 500 error page in case of an error.

More information about the validate method: [API Pages validate](/api/pages-validate)

## Nested Routes

Nuxt.js lets you create nested route by using the children routes of vue-router.

To define the parent component of a nested route, you need to create a Vue file with the **same name as the directory** which contain your children views.

<div class="Alert Alert--orange">

<b>Warning:</b> don't forget to include `<nuxt-child/>` inside the parent component (<code>.vue</code> file).

</div>

This file tree:

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

will automatically generate:

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

## Dynamic Nested Routes

This scenario should not often happen, but it is possible with Nuxt.js: having dynamic children inside dynamic parents.

This file tree:

```bash
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue
```

will automatically generate:

```js
router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```

### Unknown Dynamic Nested Routes

If you do not know the depth of your URL structure, you can use `_.vue` to dynamically match nested paths. This will handle requests that do not match a _more specific_ request.

This file tree:

```bash
pages/
--| people/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue
```

Will handle requests like this:

| Path                     | File               |
| ------------------------ | ------------------ |
| `/`                      | `index.vue`        |
| `/people`                | `people/index.vue` |
| `/people/123`            | `people/_id.vue`   |
| `/about`                 | `_.vue`            |
| `/about/careers`         | `_.vue`            |
| `/about/careers/chicago` | `_.vue`            |

**Note:** Handling 404 pages is now up to the logic of the `_.vue` page. [More on 404 redirecting can be found here](/guide/async-data#handling-errors).

## Extending the router

There are multiple ways to extend the routing with Nuxt:

- [router-extras-module](https://github.com/nuxt-community/router-extras-module) to customise the route parameters in the page component
- [@nuxtjs/router](https://github.com/nuxt-community/router-module) to overwrite the Nuxt router and write your own `router.js` file
- Use the [router.extendRoutes](https://nuxtjs.org/api/configuration-router#extendroutes) property in your `nuxt.config.js`

## Named Views

To render named views you can use `<nuxt name="top"/>` or `<nuxt-child name="top"/>` components in your layout/page. To specify named view of page we need to extend router config in `nuxt.config.js` file:

```js
export default {
  router: {
    extendRoutes(routes, resolve) {
      const index = routes.findIndex(route => route.name === 'main')
      routes[index] = {
        ...routes[index],
        components: {
          default: routes[index].component,
          top: resolve(__dirname, 'components/mainTop.vue')
        },
        chunkNames: {
          top: 'components/mainTop'
        }
      }
    }
  }
}
```

It require to extend interested route with 2 properties `components` and `chunkNames`. Named view in this config example has name `top`.

To see an example, take a look at the [named-views example](/examples/named-views).

### SPA fallback

You can enable SPA fallbacks for dynamic routes too. Nuxt.js will output an extra file that is the same as the `index.html` that would be used in `mode: 'spa'`. Most static hosting services can be configured to use the SPA template if no file matches. It won't include the `head` info or any HTML, but it will still resolve and load the data from the API.

We enable this in our `nuxt.config.js` file:

```js
export default {
  generate: {
    fallback: true, // if you want to use '404.html' instead of the default '200.html'
    fallback: 'my-fallback/file.html' // if your hosting needs a custom location
  }
}
```

### Locally Accessing Route Params

You can access the current route parameters within your local page or component by referencing `this.$route.params.{parameterName}`. For example, if you had a dynamic users page (`users\_id.vue`) and wanted to access the `id` parameter to load the user or process information, you could access the variable like this: `this.$route.params.id`.

#### Implementation for Surge

Surge [can handle](https://surge.sh/help/adding-a-custom-404-not-found-page) both `200.html` and `404.html`. `generate.fallback` is set to `200.html` by default, so no need to change it.

#### Implementation for GitHub Pages and Netlify

GitHub Pages and Netlify recognize the `404.html` file automatically, so setting `generate.fallback` to `true` is all we have to do!

#### Implementation for Firebase Hosting

Firebase Hosting [can handle](https://firebase.google.com/docs/hosting/full-config#404) the `404.html` file automatically, so setting `generate.fallback` to `true` will render the error page with a default response code of 404.

## Transitions

Nuxt.js uses the [`<transition>`](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) component to let you create amazing transitions/animations between your routes.

### Global Settings

<div class="Alert Alert--nuxt-green">

<b>Info:</b> Nuxt.js default transition name is `"page"`.

</div>

To add a fade transition to every page of your application, we need a CSS file that is shared across all our routes, so we start by creating a file in the `assets` folder.

Our global css in `assets/main.css`:

```css
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
```

Then we add its path to the `css` array in our `nuxt.config.js` file:

```js
export default {
  css: ['~/assets/main.css']
}
```

More information about the transition key: [API Configuration transition](/api/pages-transition)

### Page Settings

You can also define a custom transition for a specific page with the `transition` property.

We add a new class in our global css in `assets/main.css`:

```css
.test-enter-active,
.test-leave-active {
  transition: opacity 0.5s;
}
.test-enter,
.test-leave-active {
  opacity: 0;
}
```

Then we use the transition property to define the class name to use for this page transition:

```js
export default {
  transition: 'test'
}
```

More information about the transition property: [API Pages transition](/api/pages-transition)

## Middleware

> Middleware lets you define custom functions that can be run before rendering either a page or a group of pages.

**Shared middleware should be placed in the `middleware/` directory.** The filename will be the name of the middleware (`middleware/auth.js` will be the `auth` middleware). You can also defined page-specific middleware by using a function directly, see [anonymous middleware](/api/pages-middleware#anonymous-middleware).

A middleware receives [the context](/api/context) as first argument:

```js
export default function (context) {
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

In universal mode, middlewares will be called server-side once (on the first request to the Nuxt app or when page refreshes) and client-side when navigating to further routes. While generating the pages statically the middlewares will be called once on build time instead of the server-side calls. In SPA mode, middlewares will be called client-side on the first request and when navigating to further routes.

The middleware will be executed in series in this order:

1. `nuxt.config.js` (in the order within the file)
2. Matched layouts
3. Matched pages

A middleware can be asynchronous. To do this, simply return a `Promise` or use the 2nd `callback` argument:

`middleware/stats.js`

```js
import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

Then, in your `nuxt.config.js`, use the `router.middleware` key:

`nuxt.config.js`

```js
export default {
  router: {
    middleware: 'stats'
  }
}
```

Now the `stats` middleware will be called for every route change.

You can add your middleware (even multiple) to a specific layout or page as well:

`pages/index.vue` or `layouts/default.vue`

```js
export default {
  middleware: ['auth', 'stats']
}
```

To see a real-life example using the middleware, please see [example-auth0](https://github.com/nuxt/example-auth0) on GitHub.
