---
title: 'API: The watchQuery Property'
description: Watch query strings and execute component methods on change (asyncData, fetch, validate, layout, ...)
menu: watchQuery
category: pages
position: 31
---

# watchQuery 属性

> 监听参数字符串更改并在更改时执行组件方法 (asyncData, fetch, validate, layout, ...)

- **类型:** `Boolean` or `Array` (默认: `[]`)

使用`watchQuery`属性可以监听参数字符串的更改。 如果定义的字符串发生变化，将调用所有组件方法(asyncData, fetch, validate, layout, ...)。 为了提高性能，默认情况下禁用。

如果您要为所有参数字符串设置监听， 请设置： `watchQuery: true`.

```js
export default {
  watchQuery: ['page']
}
```
