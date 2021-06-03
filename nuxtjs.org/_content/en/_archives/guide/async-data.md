---
title: Async Data
description: You may want to fetch data and render it on the server-side. Nuxt.js adds an `asyncData` method to let you handle async operations before setting the component data.
category: getting-started
position: 106
---

> You may want to fetch data and render it on the server-side. Nuxt.js adds an `asyncData` method to let you handle async operations before initializing the component

<div>
  <a href="https://vueschool.io/courses/async-data-with-nuxtjs?friend=nuxt" target="_blank" class="Promote">
    <img src="/async-data-with-nuxtjs.png" srcset="/async-data-with-nuxtjs-2x.png 2x" alt="AsyncData by vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Async Data with Nuxt.js</h4>
      <p class="Promote__Content__Description">Learn how to manage asynchronous data with Nuxt.js.</p>
      <p class="Promote__Content__Signature">Video courses made by VueSchool to support Nuxt.js development.</p>
    </div>
  </a>
</div>

## The asyncData method

Sometimes you just want to fetch data and pre-render it on the server without using a store. `asyncData` is called every time before loading the **page** component. It will be called server-side once (on the first request to the Nuxt app) and client-side when navigating to further routes. This method receives [the context](/api/context) as the first argument, you can use it to fetch some data and Nuxt.js will merge it with the component data.

Nuxt.js will automatically merge the returned object with the component data.

<div class="Alert Alert--orange">

You do **NOT** have access to the component instance through `this` inside `asyncData` because it is called **before initializing** the component.

</div>

Nuxt.js offers you different ways to use `asyncData`. Choose the one you're the most familiar with:

1. Returning a `Promise`. Nuxt.js will wait for the promise to be resolved before rendering the component.
2. Using [async/await](https://javascript.info/async-await)

<div class="Alert Alert--grey">

We are using [axios](https://github.com/mzabriskie/axios) to make isomorphic HTTP requests, we <strong>strongly recommend</strong> to use our [axios module](https://axios.nuxtjs.org/) for your Nuxt projects.

</div>

If you are using `axios` directly from `node_modules` and used the `axios.interceptors` to add interceptors to transform the data, make sure to create an instance before adding interceptors. If not, when you refresh the serverRender page, the interceptors will be added multiple times, which will cause a data error.

```js
import axios from 'axios'
const myaxios = axios.create({
  // ...
})
myaxios.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    // ...
  }
)
```

### Returning a Promise

```js
export default {
  asyncData({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`).then(res => {
      return { title: res.data.title }
    })
  }
}
```

### Using async/await

```js
export default {
  async asyncData({ params }) {
    const { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

### Displaying the data

The result from asyncData will be **merged** with data. You can display the data inside your template like you're used to doing:

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## The Context

To see the list of available keys in `context`, take a look at the [API Essential `context`](/api/context).

### Use `req`/`res` objects

When `asyncData` is called on server side, you have access to the `req` and `res` objects of the user request.

```js
export default {
  async asyncData({ req, res }) {
    // Please check if you are on the server side before
    // using req and res
    if (process.server) {
      return { host: req.headers.host }
    }

    return {}
  }
}
```

### Accessing dynamic route data

You can use the `context` parameter to access dynamic route data as well! For example, dynamic route params can be retrieved using the name of the file or folder that configured it. If you've defined a file named `_slug.vue` in your `pages` folder, you can access the value via `context.params.slug`:

```js
export default {
  async asyncData({ params }) {
    const slug = params.slug // When calling /abc the slug will be "abc"
    return { slug }
  }
}
```

### Listening to query changes

The `asyncData` method **is not called** on query string changes by default. If you want to change this behavior, for example when building a pagination component, you can set up parameters that should be listened to with the `watchQuery` property of your page component. Learn more on the [API `watchQuery` page](/api/pages-watchquery) page.

## Handling Errors

Nuxt.js adds the `error(params)` method in the `context`, which you can call to display the error page. `params.statusCode` will be also used to render the proper status code from the server-side.

Example with a `Promise`:

```js
export default {
  asyncData({ params, error }) {
    return axios
      .get(`https://my-api/posts/${params.id}`)
      .then(res => {
        return { title: res.data.title }
      })
      .catch(e => {
        error({ statusCode: 404, message: 'Post not found' })
      })
  }
}
```

To customize the error page, take a look at the [views guide](/guide/views#layouts) .
