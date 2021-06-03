---
title: 'API: asyncData 方法'
description: 你可能想要在服务器端获取并渲染数据。Nuxt.js添加了`asyncData`方法使得你能够在渲染组件之前异步获取数据。
menu: asyncData
category: pages
position: 21
---

# asyncData 方法

> 你可能想要在服务器端获取并渲染数据。Nuxt.js 添加了`asyncData`方法使得你能够在渲染组件之前异步获取数据。

- **类型：** `Function`

`asyncData`方法会在组件（**限于页面组件**）每次加载之前被调用。它可以在服务端或路由更新之前被调用。在这个方法被调用的时候，第一个参数被设定为当前页面的**上下文对象**，你可以利用 `asyncData`方法来获取数据并返回给当前组件。

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

注意：由于`asyncData`方法是在组件 **初始化** 前被调用的，所以在方法内是没有办法通过 `this` 来引用组件的实例对象。

</div>
