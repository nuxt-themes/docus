---
title: 'head メソッド'
description: Nuxt.js はアプリケーションの headers 及び html attributes を更新するために vue-meta を使います。
menu: head メソッド
category: components-glossary
position: 0
---

> Nuxt.js はアプリケーションの `headers` 及び `html attributes` を更新するために [vue-meta](https://github.com/nuxt/vue-meta) を使います。

- **型:** `Object` または `Function`

現在のページの HTML の head タグを設定するために `head` メソッドを使います。

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello World!'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          // `hid` は一意の識別子として使用されます。 `vmid` は動作しないので使わないでください。
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description'
          }
        ]
      }
    }
  }
</script>
```

<base-alert type="info">

子コンポーネントで使用するときにメタタグが重複しないようにするために、メタ要素の `hid` キーを使って一意の識別子を設定します（[詳細はこちら](https://vue-meta.nuxtjs.org/api/#tagidkeyname)）。

</base-alert>
