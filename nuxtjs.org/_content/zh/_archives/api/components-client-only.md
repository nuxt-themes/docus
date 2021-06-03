---
title: 'API: The <client-only> Component'
description: Render a component only on client-side, and display a placeholder text on server-side.
menu: client-only
category: components
position: 44
---

# The &lt;client-only&gt; 组件

> 此组件用于仅在客户端渲染其他组件.

<div class="Alert Alert--orange">

**警告:** Nuxt 版本小于 `v2.9.0` 的用户, 请使用 `<no-ssr>`

</div>

**Props**:

- placeholder: `string`
  - 在 `<client-only />` 被挂载之前, 使用此属性作为文本占位符.

```html
<template>
  <div>
    <sidebar />
    <client-only placeholder="Loading...">
      <!-- comments 组件只会在客户端被渲染 -->
      <comments />
    </client-only>
  </div>
</template>
```

**Slots**:

- placeholder:
  - 在 `<client-only />` 被挂载之前, 使用此属性作为插槽.

```html
<template>
  <div>
    <sidebar />
    <client-only>
      <!-- comments 组件只会在客户端被渲染 -->
      <comments />

      <!-- comments-placeholder 会在服务端被加载-->
      <comments-placeholder slot="placeholder" />
    </client-only>
  </div>
</template>
```

此组件仓库为 [egoist/vue-client-only](https://github.com/egoist/vue-client-only). 在此感谢 [@egoist](https://github.com/egoist)!
