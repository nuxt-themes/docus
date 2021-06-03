---
title: 'transition プロパティ'
description: 'ページトランジションとレイアウトトランジションのデフォルトプロパティを設定します。'
menu: transition
category: configuration-glossary
position: 31
---

## pageTransition プロパティ

> Nuxt v2.7.0 では「transition」キーに代わり「pageTransition」キーが導入され、名前が layout transition キーに統合されています。

- 型: `String` または `Object`

> ページトランジションのデフォルトプロパティを設定するために使われます。

デフォルト:

```js
{
  name: 'page',
  mode: 'out-in'
}
```

```js{}[nuxt.config.js]
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

`nuxt.config.js` 内の transition キーはページトランジションのデフォルトプロパティを指定するために使われます。`transition` キーがオブジェクトのときに利用可能なキーの詳細については[ページトランジションのプロパティ](/docs/2.x/features/transitions)を参照してください。

## layoutTransition プロパティ

- 型: `String` または `Object`

> レイアウトトランジションのデフォルトプロパティを設定するために使われます。`name` オプションで指定された値は `layouts` フォルダーの `layout` で指定された名前で動くように設定されています。

デフォルト:

```js
{
  name: 'layout',
  mode: 'out-in'
}
```

```js{}[nuxt.config.js]
export default {
  layoutTransition: 'layout'
  // または
  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  }
}
```

```css{}[assets/main.css]
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s;
}
.layout-enter,
.layout-leave-active {
  opacity: 0;
}
```
