---
title: 'API: middleware 프로퍼티'
description: 어플리케이션의 특정 페이지에 대한 미들웨어를 설정합니다.
menu: middleware
category: pages
position: 27
---

- Type: `String` or `Array` or `Function`
  - Items: `String` or `Function`

어플리케이션의 특정 페이지에 대한 미들웨어를 설정합니다.

## 이름이 있는 미들웨어

`middleware/` 디렉토리에 파일을 생성하는 것으로 이름이 있는 미들웨어를 만드실 수있습니다. 파일명이 미들웨어명이 될 것입니다.

`middleware/authenticated.js`:

```js
export default function ({ store, redirect }) {
  // 유저가 권한이 없다면
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

`pages/secret.vue`:

```html
<template>
  <h1>Secret page</h1>
</template>

<script>
  export default {
    middleware: 'authenticated'
  }
</script>
```

## 익명 미들웨어

특정 페이지에 대해서만 미들웨어를 셋팅하고 싶을 수 있습니다. 이럴 때에는 직접적으로 함수를 생성하시면 됩니다(혹은 함수의 배열).

`pages/secret.vue`:

```html
<template>
  <h1>Secret page</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      // 유저가 인증되지 않았다면
      if (!store.state.authenticated) {
        return redirect('/login')
      }
    }
  }
</script>
```

미들웨어에 대해 더 알고 싶으시다면, [미들웨어 가이드](/guide/routing#middleware)를 참조해 주세요..
