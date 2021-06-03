---
title: 'API: <nuxt-child> 컴포넌트'
description: 현재 페이지를 보여줍니다
menu: nuxt-child
category: components
position: 42
---

# The &lt;nuxt-child&gt; 컴포넌트

> 이 컴포넌트는 하위 컴포넌트를 [nested 경로](/guide/routing#nested-routes)에 보여주기 위해 사용됩니다.

예제:

```bash
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

이 파일 트리는 다음과 같이 생성됩니다:

```js
;[
  {
    path: '/parent',
    component: '~pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```

`child.vue` 컴포넌트를 보여주기 위해, `pages/parent.vue`에 `<nuxt-child/>`넣어야합니다:

```html
<template>
  <div>
    <h1>난 부모 View 입니다~</h1>
    <nuxt-child />
  </div>
</template>
```

예제를 보려면 [nested-routes 예제](/examples/nested-routes) 페이지를 참고해주세요.
