---
title: 'Middleware プロパティ'
description: アプリケーションの特定のページのミドルウェアを設定します。
menu: Middleware プロパティ
category: components-glossary
position: 0
---

- **型:** `String` または `Array` または `Function`
  - **要素:** `String` または `Function`

アプリケーションの特定のページのミドルウェアを設定します。

## 名前付きミドルウェア

`middleware/` ディレクトリ内にファイルを作成することで名前付きミドルウェアを作成できます。ファイル名がミドルウェア名になります。

```js{}[middleware/authenticated.js]
export default function ({ store, redirect }) {
  // ユーザーが認証されていない場合
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

```html{}[pages/secret.vue]
<template>
  <h1>Secret page</h1>
</template>

<script>
  export default {
    middleware: 'authenticated'
  }
</script>
```

## 無名ミドルウェア

特定のページにだけミドルウェアを使用する必要がある場合は、関数（もしくは関数の配列）を直接使用できます:

```html{}[pages/secret.vue]
<template>
  <h1>Secret page</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      // ユーザーが認証されていない場合
      if (!store.state.authenticated) {
        return redirect('/login')
      }
    }
  }
</script>
```
