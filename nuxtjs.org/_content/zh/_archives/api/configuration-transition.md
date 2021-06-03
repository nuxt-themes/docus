---
title: 'API: transition 属性配置'
description: 用于设置页面切换过渡效果的默认属性值。
menu: transition
category: configuration
position: 131
---

# transition 属性配置

- Type: `String` 或 `Object`

> 用于设置页面切换过渡效果的默认属性值。

默认值：

```js
{
  name: 'page',
  mode: 'out-in'
}
```

例如 (`nuxt.config.js`)：

```js
module.exports = {
  transition: 'page'
  // or
  transition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Before enter...');
    }
  }
}
```

`transition` 用于设置页面切换过渡效果的默认属性值。想了解当 `transition` 的值为对象类型时有哪些可用的属性，请参考 [页面过渡效果配置](/api/pages-transition#object)。

# layoutTransition 属性

- 类型: `String` 或 `Object`

> 用于设置布局过渡的默认属性。配置与 `layout` 相同

默认:

```js
{
  name: 'layout',
  mode: 'out-in'
}
```

例如 (`nuxt.config.js`):

```js
export default {
  layoutTransition: 'layout'
  // or
  transition: {
    name: 'layout',
    mode: 'out-in'
  }
}
```

全局配置示例 `css`:

```css
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s;
}
.layout-enter,
.layout-leave-active {
  opacity: 0;
}
```
