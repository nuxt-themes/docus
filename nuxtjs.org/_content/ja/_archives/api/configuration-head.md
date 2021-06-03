---
title: 'API: head プロパティ'
description: Nuxt.js では nuxt.config.js 内にアプリケーションのデフォルトのメタ情報を定義できます。
menu: head
category: configuration
position: 112
---

> Nuxt.js では `nuxt.config.js` 内にアプリケーションのデフォルトのメタ情報を定義できます。それには `head` プロパティを使います

- 型: `Object` or `Function`

An example `nuxt.config.js`:

```js
export default {
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hidは一意の識別子として使用されます。`vmid` は動作しないので使わないでください
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
```

`head` に設定できるオプション一覧は [vue-meta のドキュメント](https://vue-meta.nuxtjs.org/api/#metainfo-properties) を参照してください。

コンポーネントの関数として `head` を使うこともでき、`this` を経由してコンポーネントのデータにアクセスできます。詳しくは [コンポーネントの head プロパティ](/api/pages-head) を参照してください。

<div class="Alert Alert--teal">

<b>情報:</b> 子コンポーネントでメタタグが重複しないようにするには、メタ要素に `hid` を使って一意の識別子を設定します。詳しくは[こちら](https://github.com/declandewet/vue-meta#lists-of-tags)を参照してください。

</div>
