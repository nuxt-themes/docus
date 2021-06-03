---
title: 'API: middleware プロパティ'
description: アプリケーションの特定のページにミドルウェアを設定します。
menu: middleware
category: pages
position: 27
---

- 型: `String` または `Array` または `Function`
  - 要素: `String` または `Function`

アプリケーションの特定のページにミドルウェアを設定します。

## 名前付きミドルウェア

`middleware/` ディレクトリ内に名前付きのミドルウェアを作ることができます。ファイル名はミドルウェア名と同じものにします。

`middleware/authenticated.js`:

```js
export default function ({ store, redirect }) {
  // ユーザーが認証されていないとき
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

`pages/secret.vue`：

```html
<template>
  <h1>シークレットページ</h1>
</template>

<script>
  export default {
    middleware: 'authenticated'
  }
</script>
```

## 無名ミドルウェア

特定のページにだけミドルウェアを使いたい場合、関数または配列の関数を直接使うことができます：

`pages/secret.vue`:

```html
<template>
  <h1>Secret page</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      // ユーザーが認証されていないとき
      if (!store.state.authenticated) {
        return redirect('/login')
      }
    }
  }
</script>
```

ミドルウェアについてより深く理解するには [ミドルウェアのガイド](/guide/routing/#ミドルウェア) を参照してください。
