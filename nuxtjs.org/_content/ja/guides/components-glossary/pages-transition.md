---
title: 'ページ `transition` プロパティ'
description: 'Nuxt.js では `<transition>` コンポーネントを使って、ページ間を遷移する際のトランジション/アニメーションの作成や適用を行うことができます。'
menu: 'transition プロパティ'
category: components-glossary
position: 0
---

> Nuxt.js では [`<transition>`](https://v3.ja.vuejs.org/guide/transitions-enterleave.html#%E5%8D%98%E4%B8%80%E8%A6%81%E7%B4%A0-%E3%82%B3%E3%83%B3%E3%83%9B%E3%82%9A%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B7%E3%82%99%E3%82%B7%E3%83%A7%E3%83%B3) コンポーネントを使って、ページ間を遷移する際のトランジション/アニメーションの作成することができます。

- **型:** `String` または `Object` または `Function`

特定のルートに対してカスタムトランジションを設定するには、ページコンポーネントに `transition` キーを追加してください。

```js
export default {
  // 文字列を指定できます
  transition: ''
  // またはオブジェクト
  transition: {}
  // または関数
  transition (to, from) {}
}
```

## 文字列

もし `transition` キーが文字列で設定された場合は `transition.name` として用いられます。

```js
export default {
  transition: 'test'
}
```

Nuxt.js はこれらの設定を使ってコンポーネントを以下のように設定します:

```html
<transition name="test"></transition>
```

## オブジェクト

もし `transition` キーがオブジェクトで設定された場合:

```js
export default {
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

Nuxt.js はこれらの設定を使ってコンポーネントを以下のように設定します:

```html
<transition name="test" mode="out-in"></transition>
```

`transition` オブジェクトが持てるプロパティは以下の通りです:

| キー               | 型        | デフォルト | 定義                                                                                                                                                                                                                                                                                                           |
| ------------------ | --------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`             | `String`  | `"page"`   | すべてのルートトランジションに適用されるトランジション名です。                                                                                                                                                                                                                                                 |
| `mode`             | `String`  | `"out-in"` | すべてのルートに適用されるトランジションモードです。章氏は [Vue.js のドキュメント](https://v3.ja.vuejs.org/guide/transitions-enterleave.html#%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B7%E3%82%99%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%88%E3%82%99)を参照してください。                                 |
| `css`              | `Boolean` | `true`     | CSS トランジションクラスを適用するかどうかを設定します。デフォルトは `true` です、もし `false` に設定した場合コンポーネントのイベント経由で登録された JavaScript フックのみがトリガーとなります。                                                                                                              |
| `duration`         | `Integer` | n/a        | トランジションが適用される時間（ミリ秒）です。[Vue.js のドキュメント](https://v3.ja.vuejs.org/guide/transitions-enterleave.html#%E6%98%8E%E7%A4%BA%E7%9A%84%E3%81%AA%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B7%E3%82%99%E3%82%B7%E3%83%A7%E3%83%B3%E6%9C%9F%E9%96%93%E3%81%AE%E8%A8%AD%E5%AE%9A)を参照してください。 |
| `type`             | `String`  | n/a        | トランジション終了のタイミングを判定するために待ち受けるトランジションのイベントタイプを指定します。指定可能な値は `"transition"` または `"animation"` です。デフォルトではより期間の長いほうのタイプが自動的に検出されます。                                                                                  |
| `enterClass`       | `String`  | n/a        | トランジションクラスの開始状態です。[Vue.js のドキュメント](https://v3.ja.vuejs.org/guide/transitions-enterleave.html#%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B7%E3%82%99%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%AF%E3%83%A9%E3%82%B9)を参照してください。                             |
| `enterToClass`     | `String`  | n/a        | トランジションの終了状態です。[Vue.js のドキュメント](https://v3.ja.vuejs.org/guide/transitions-enterleave.html#%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B7%E3%82%99%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%AF%E3%83%A9%E3%82%B9)を参照してください。                                   |
| `enterActiveClass` | `String`  | n/a        | トランジション中に適用されるクラスです。[Vue.js のドキュメント](https://v3.ja.vuejs.org/guide/transitions-enterleave.html#%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B7%E3%82%99%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%AF%E3%83%A9%E3%82%B9)を参照してください。                         |
| `leaveClass`       | `String`  | n/a        | トランジションクラスの開始状態です。[Vue.js のドキュメント](https://v3.ja.vuejs.org/guide/transitions-enterleave.html#%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B7%E3%82%99%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%AF%E3%83%A9%E3%82%B9)を参照してください。                             |
| `leaveToClass`     | `String`  | n/a        | トランジションの終了状態です。[Vue.js のドキュメント](https://v3.ja.vuejs.org/guide/transitions-enterleave.html#%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B7%E3%82%99%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%AF%E3%83%A9%E3%82%B9)を参照してください。                                   |
| `leaveActiveClass` | `String`  | n/a        | トランジション中に適用されるクラスです。[Vue.js のドキュメント](https://v3.ja.vuejs.org/guide/transitions-enterleave.html#%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B7%E3%82%99%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%AF%E3%83%A9%E3%82%B9)を参照してください。                         |

ページ `transition` プロパティでメソッドを定義することもできます。これらは [JavaScript フック](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks)用です:

- `beforeEnter(el)`
- `enter(el, done)`
- `afterEnter(el)`
- `enterCancelled(el)`
- `beforeLeave(el)`
- `leave(el, done)`
- `afterLeave(el)`
- `leaveCancelled(el)`

```js
export default {
  transition: {
    afterLeave(el) {
      console.log('afterLeave', el)
    }
  }
}
```

_注意: JavaScript のみのトランジションに `css: false` を明示的に追加して Vue が CSS の検出をスキップできるようにすることもいい考えです。これにより CSS ルールが誤ってトランジションに干渉するのを防ぎます。_

### トランジションモード

**ページ用のデフォルトのトランジションモードは Vue.js のデフォルトモードとは異なります**。`transition` モードはデフォルトで `out-in` が設定されます。もしトランジションの開始と終了を同時に実行したい場合モードを空文字（`mode: ''`）に設定する必要があります。

```js
export default {
  transition: {
    name: 'test',
    mode: ''
  }
}
```

## 関数

もし `transition` キーが関数で設定された場合:

```js
export default {
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
```

トランジションは各ページ遷移時に適用されます:

- `/` to `/posts` => `slide-left`,
- `/posts` to `/posts?page=3` => `slide-left`,
- `/posts?page=3` to `/posts?page=2` => `slide-right`.
