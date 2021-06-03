---
title: 'The asyncData Method'
description: You may want to fetch data and render it on the server-side. Nuxt.js adds an `asyncData` method that lets you handle async operations before setting the component data.
menu: asyncData
category: pages
position: 21
---

> You may want to fetch data and render it on the server-side. Nuxt.js adds an `asyncData` method that lets you handle async operations before setting the component data.

- **Type:** `Function`

<div class="Alert Alert--nuxt-green">

<b>Info:</b> Please visit the [async data guide](/guide/async-data) as well!

</div>

`asyncData` is called every time before loading the **page** component and is only available for such. It will be called server-side once (on the first request to the Nuxt app) and client-side when navigating to further routes. This method receives the [`context`](/api/context) object as the first argument, you can use it to fetch some data and return the component data.

The result from asyncData will be **merged** with data.

```js
export default {
  data() {
    return { project: 'default' }
  },
  asyncData(context) {
    return { project: 'nuxt' }
  }
}
```

<div class="Alert Alert--orange">

<b>Warning:</b> You **don't** have access to the component instance through `this` inside `asyncData` because it is called **before initiating** the component.

</div>
