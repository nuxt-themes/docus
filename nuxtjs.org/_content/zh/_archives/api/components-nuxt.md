---
title: 'API: <nuxt> 组件'
description: 该组件用于在布局中显示页面组件（即非布局内容）。
menu: nuxt
category: components
position: 41
---

# &lt;nuxt&gt; 组件

> 该组件只适用于在[布局](/guide/views#布局)中显示页面组件（即非布局内容）。

例子 (`layouts/default.vue`)：

```html
<template>
  <div>
    <div>页头</div>
    <nuxt />
    <div>页脚</div>
  </div>
</template>
```

可以看下这个实际的[布局示例](/examples/layouts)。

**Props**:

- nuxtChildKey: `string`
  - 此 prop 将设置为`<router-view />`，可用于在动态页面和不同路由内进行过渡。
  - 默认: `$route.path`

有三种方式可以处理 `<router-view />` 内部属性的 `key`。

1. `nuxtChildKey` 属性：

```html
<template>
  <div>
    <nuxt :nuxt-child-key="someKey" />
  </div>
</template>
```

2. 页面组件中的`key`选项：`string` 或 `function`

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```

3. 页面组件中的`watchQuery`选项：`boolean` 或 `string []`

[watchQuery](/api/pages-watchquery)选项中指定的查询会被用于构建`key`。如果`watchQuery`为`true`，则默认使用`fullPath`。

- name: `string` (_Nuxt v2.4.0 新增_)
  - 此 prop 将提供给`<router-view />`使用，用于渲染命名视图。
  - 默认: `default`

查看例子请点击： [命名视图例子](/examples/named-views).
