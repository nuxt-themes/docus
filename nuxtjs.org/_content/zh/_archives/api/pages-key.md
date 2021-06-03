---
title: 'API:key 属性'
description: 设置内部`<router-view>`组件的`key`属性
menu: key
category: pages
position: 24
---

# key 属性

> 设置内部`<router-view>`组件的`key`属性

- **类型:** `String` 或 `Function`

`key`属性赋值到`<router-view>`，这对于在动态页面和不同路径中进行转换很有用。不同的`key`会使页面组件重新渲染。

有几种方法可以设置`key`。有关更多详细信息，请参阅[nuxt 组件](/api/components-nuxt)中的`nuxtChildKey`属性。

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```
