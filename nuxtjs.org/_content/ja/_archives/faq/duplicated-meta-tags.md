---
title: メタタグが重複したときは？
description: メタタグが重複したときは？
category: development
position: 104
---

これは [vue-meta](https://github.com/nuxt/vue-meta) の "特徴" です。[head 要素のドキュメント](/docs/2.x/concepts/views#html-%E3%81%AE-head-%E6%83%85%E5%A0%B1) を参照してください。

<div class="Alert">

子コンポーネント利用された時にメタ情報が重複してしまうことを避けるために <code>hid</code> キーで一意な識別子を与えてください｡ これについてより深く理解するには [こちら](https://vue-meta.nuxtjs.org/api/#tagidkeyname) を参照してください。

</div>

例えば description のメタタグについて、`hid` ユニーク識別子を付与する必要があります。そうすれば vue-meta は、デフォルトのタグを上書きすべきということを知ることができます。

`nuxt.config.js`:

```js
...head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'keyword 1, keyword 2'},
      { hid: 'description', name: 'description', content: 'This is the generic description.'}
    ],
  },
...
```

それから個別ページには次のように記述します:

```js
export default {
  head() {
    return {
      title: `Page 1 (${this.name}-side)`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Page 1 description'
        }
      ]
    }
  }
}
```

ページ内の `head` プロパティの使い方をより深く理解するには [HTML の head 情報のドキュメント](/docs/2.x/concepts/views#html-%E3%81%AE-head-%E6%83%85%E5%A0%B1) を参照してください。
