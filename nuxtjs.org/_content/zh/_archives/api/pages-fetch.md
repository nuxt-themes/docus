---
title: 'API: fetch 方法'
description: fetch 方法用于在渲染页面前填充应用的状态树（store）数据， 与 asyncData 方法类似，不同的是它不会设置组件的数据。
menu: fetch
category: pages
position: 22
---

# fetch 方法

> fetch 方法用于在渲染页面前填充应用的状态树（store）数据， 与 asyncData 方法类似，不同的是它不会设置组件的数据。

- **类型：** `Function`

如果页面组件设置了 `fetch` 方法，它会在组件每次加载前被调用（在服务端或切换至目标路由之前）。

`fetch` 方法的第一个参数是页面组件的[上下文对象](/api/#上下文对象) `context`，我们可以用 `fetch` 方法来获取数据填充应用的状态树。为了让获取过程可以异步，你需要**返回一个 Promise**，Nuxt.js 会等这个 promise 完成后再渲染组件。

<div class="Alert Alert--orange">

**警告**: 您无法在内部使用`this`获取**组件实例**，`fetch`是在**组件初始化之前**被调用

</div>

例如 `pages/index.vue`：

```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
  export default {
    fetch({ store, params }) {
      return axios.get('http://my-api/stars').then(res => {
        store.commit('setStars', res.data)
      })
    }
  }
</script>
```

你也可以使用 `async` 或 `await` 的模式简化代码如下：

```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
  export default {
    async fetch({ store, params }) {
      let { data } = await axios.get('http://my-api/stars')
      store.commit('setStars', data)
    }
  }
</script>
```

## Vuex

如果要在`fetch`中调用并操作`store`，请使用`store.dispatch`，但是要确保在内部使用`async / await`等待操作结束：

```html
<script>
  export default {
    async fetch({ store, params }) {
      await store.dispatch('GET_STARS')
    }
  }
</script>
```

`store/index.js`

```js
// ...
export const actions = {
  async GET_STARS({ commit }) {
    const { data } = await axios.get('http://my-api/stars')
    commit('SET_STARS', data)
  }
}
```

## 监听 query 字符串的改变

默认情况下，不会在查询字符串更改时调用`fetch`方法。如果想更改此行为，例如，在编写分页组件时，您可以设置通过页面组件的`watchQuery`属性来监听参数的变化。了解更多有关 [API `watchQuery` page](/api/pages-watchquery)的信息。
