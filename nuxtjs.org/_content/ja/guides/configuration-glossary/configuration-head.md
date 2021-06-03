---
title: 'head プロパティ'
description: 'Nuxt.js ではアプリケーションのデフォルトメタを全て `nuxt.config.js` 内で定義することができます'
menu: head
category: configuration-glossary
position: 12
---

> Nuxt.js ではアプリケーションのデフォルトメタを全て `head` プロパティを使って `nuxt.config.js` 内で定義することができます

- 型: `Object` または `Function`

```js{}[nuxt.config.js]
export default {
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // `hid` は一意の識別子として使用されます。`vmid` は動作しないので使わないでください
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
```

`head` に指定できるオプションリストについては [vue-meta のドキュメント](https://vue-meta.nuxtjs.org/api/#metainfo-properties)を参照してください。

コンポーネントの関数として `head` を使用して `this` を介してコンポーネントデータにアクセスすることもできます（[詳細はこちら](/docs/2.x/components-glossary/pages-head)）。

<base-alert type="info">

子コンポーネントを使用した際にメタタグの重複を避けるために、meta 要素に `hid` キーで一意な識別子を設定してください（[詳細はこちら](https://vue-meta.nuxtjs.org/api/#tagidkeyname)）。

</base-alert>
