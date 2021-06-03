---
title: 'API: <nuxt-child> 组件'
description: 显示当前页面
menu: nuxt-child
category: components
position: 42
---

# &lt;nuxt-child&gt; 组件

> 该组件用于显示[嵌套路由](/guide/routing#嵌套路由)场景下的页面内容。

例如：

```bash
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

上面的目录树结构会生成下面这些路由配置：

```js
;[
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~/pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```

为了显示 `child.vue` 组件，我们需要在父级页面组件 `pages/parent.vue` 中加入 `<nuxt-child/>`：

```html
<template>
  <div>
    <h1>我是父级页面</h1>
    <nuxt-child :foobar="123" />
  </div>
</template>
```

`<nuxt-child/>` 接收 `keep-alive` 和 `keep-alive-props`:

```html
<template>
  <div>
    <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- 将被转换成以下形式 -->
<div>
  <keep-alive :exclude="['modal']">
    <router-view />
  </keep-alive>
</div>
```

> 子组件还可以接收 Vue 组件等属性。

可以看这个实际案例：[嵌套路由示例](/examples/nested-routes)

## 命名视图

> Nuxt v2.4.0 新增

`<nuxt-child/>`接受`name` prop 来呈现渲染命名视图：

```html
<template>
  <div>
    <nuxt-child name="top" />
    <nuxt-child />
  </div>
</template>
```

查看更多例子，请点击 [named-views 例子](/examples/named-views).
