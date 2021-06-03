---
title: 'API: layout 프로퍼티'
description: layouts 디렉토리의 모든 파일(최상위 레벨)은 페이지 컴포넌트의 layout 프로퍼티를 사용하여 접근가능한 사용자 정의 layout을 만들 수 있습니다.
menu: layout
category: pages
position: 25
---

> layouts 디렉토리의 모든 파일(최상위 레벨)은 페이지 컴포넌트의 layout 프로퍼티를 사용하여 접근가능한 사용자 정의 layout을 만들 수 있습니다.

- **타입:** `String` 또는 `Function` (기본값: `'default'`)

페이지 컴포넌트에서 사용할 layout을 정의하기 위해서 `layout` 키를 정의하세요.

```js
export default {
  layout: 'blog',
  // 또는
  layout(context) {
    return 'blog'
  }
}
```

예를 들어, Nuxt.js는 페이지 컴포넌트의 layout으로 `layouts/blog.vue`을 포함할 것입니다.

어떻게 동작하는지 [데모 비디오](https://www.youtube.com/watch?v=YOKnSTp7d38)를확인해주세요.

nuxt.js의 layouts가 어떻게 동작하는지 이해하기 위해 [layout 문서](/guide/views#layouts)를 확인하세요.
