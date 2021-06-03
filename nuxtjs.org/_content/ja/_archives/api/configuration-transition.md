---
title: 'API: transition プロパティ'
description: ページとレイアウトのトランジションのデフォルトプロパティを設定します。
menu: transition
category: configuration
position: 131
---

## pageTransition プロパティ

> Nuxt v2.7.0 では "transition" キーに代わり "pageTransition" が導入され、layout transition キーの命名が統合されています。

- 型: `String` または `Object`

> ページのトランジションのデフォルト設定を指定するために使われます。

デフォルト:

```js
{
  name: 'page',
  mode: 'out-in'
}
```

例（`nuxt.config.js`）:

```js
export default {
  pageTransition: 'page'
  // または
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Before enter...');
    }
  }
}
```

`nuxt.config.js` 内の transition キーはページのトランジションのデフォルト設定を指定するために使われます。`transition` キーがオブジェクトのときに利用可能なキーについてより深く理解するには [ページのトランジションプロパティ](/api/pages-transition#オブジェクト) を参照してください。

## layoutTransition プロパティ

- 型: `String` または `Object`

> レイアウトトランジションのデフォルト設定を指定するために使われます。設定は `layout` と同じです。

デフォルト:

```js
{
  name: 'layout',
  mode: 'out-in'
}
```

例 (`nuxt.config.js`):

```js
export default {
  layoutTransition: 'layout'
  // または
  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  }
}
```

グローバル `css` の例:

```css
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s;
}
.layout-enter,
.layout-leave-active {
  opacity: 0;
}
```
