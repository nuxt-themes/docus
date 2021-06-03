---
title: ストア
description: '`store` ディレクトリには Vuex ストアに関するファイルが含まれています。Vuex ストアは Nuxt.js に付属していてすぐに使えますが、デフォルトでは無効化されています。このディレクトリ内に `index.js` ファイルを作成することで、ストアが有効化されます。'
position: 13
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/14_store?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: どうしたらストアを有効化できますか？
    answers:
      - デフォルトで有効化されている
      - ストアのフォルダに js ファイルを作成する
      - 'store: true を nuxt.config.js ファイルに追加する'
    correctAnswer: ストアのフォルダに js ファイルを作成する
  - question: store ディレクトリに存在するすべての .js ファイルは以下のどれに変換されますか？
    answers:
      - プラグイン
      - モジュール
      - 関数
    correctAnswer: モジュール
  - question: ストアの中ではステートを以下のどの形式でエクスポートする必要がありますか？
    answers:
      - 関数
      - オブジェクト
      - 文字列
    correctAnswer: 関数
  - question: ストアの中ではミューテーションとアクションを以下のどの形でエクスポートする必要がありますか？
    answers:
      - 関数
      - オブジェクト
      - 文字列
    correctAnswer: オブジェクト
  - question: ストアにプラグインを追加することができますか？
    answers:
      - はい
      - いいえ
    correctAnswer: はい
  - question: fetch メソッドは以下のどのタイミングでストアを更新しますか？
    answers:
      - ページをレンダリングする前
      - ページをレンダリングしている間
      - ページをレンダリングした後
    correctAnswer: ページをレンダリングする前
  - question: サーバでデータを持っていて、クライアントサイドに直接渡したいときはどれを使うのが良いですか？
    answers:
      - nuxtServerInit
      - fetch
      - asyncData
    correctAnswer: nuxtServerInit
  - question: asyncData では、context は nuxtServerInit にどう渡されますか？
    answers:
      - 第 1 引数として
      - 第 2 引数として
      - 第 3 引数として
    correctAnswer: 第 2 引数として
---

`store`  ディレクトリには [Vuex ストア](http://vuex.vuejs.org/ja/)に関するファイルが含まれています。Vuex ストアは Nuxt.js に付属していてすぐに使えますが、デフォルトでは無効化されています。このディレクトリ内に `index.js` ファイルを作成することで、ストアが有効化されます。

<base-alert>

_このディレクトリは追加の設定無しにリネームすることはできません。_

</base-alert>

ストアを使って状態を管理するのは、どういった大きなアプリケーションを作るにあたっても重要なことです。それがなぜ Nuxt.js がそのコアに Vuex を組み込んでいるかの理由です。

## ストアを有効化する

Nuxt.js は `store` ディレクトリを確認します。もし隠しファイルや `README.md` ではないファイルが含まれていたら、ストアは有効化されます。これは Nuxt が以下を行うことを意味しています:

1. Vuex をインポートする
2. ルートの Vue インスタンスに `store` オプションを追加します。

## モジュール

`store` ディレクトリの中にあるすべての  `.js` ファイルは[名前空間付きモジュール](http://vuex.vuejs.org/ja/modules.html)に変換されます（`index` はルートモジュールになります）。`state` の値は不必要に状態がサーバサイドで*共有されてしまう*ことを避けるため、常に `function` であるべきです。

はじめに、ステートを関数で、ミューテーションとアクションをオブジェクトでエクスポートしましょう。

```js{}[store/index.js]
export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
```

次に、`store/todos.js` ファイルを作成しましょう:

```js{}[store/todos.js]
export const state = () => ({
  list: []
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
```

ストアは以下のように生成されるでしょう:

```js
new Vuex.Store({
  state: () => ({
    counter: 0
  }),
  mutations: {
    increment(state) {
      state.counter++
    }
  },
  modules: {
    todos: {
      namespaced: true,
      state: () => ({
        list: []
      }),
      mutations: {
        add(state, { text }) {
          state.list.push({
            text,
            done: false
          })
        },
        remove(state, { todo }) {
          state.list.splice(state.list.indexOf(todo), 1)
        },
        toggle(state, { todo }) {
          todo.done = !todo.done
        }
      }
    }
  }
})
```

また、`pages/todos.vue` では `todos` モジュールを以下のように利用することができます:

```js{}[pages/todos.vue]
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.text">
      <input :checked="todo.done" @change="toggle(todo)" type="checkbox">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li><input @keyup.enter="addTodo" placeholder="What needs to be done?"></li>
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    todos () {
      return this.$store.state.todos.list
    }
  },
  methods: {
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
```

モジュールメソッドはストアディレクトリにサブディレクトリを追加することなく、トップレベルでの定義に利用することができます。

ステートの例: 以下のように `store/state.js` を作成します。

```js
export default () => ({
  counter: 0
})
```

対応するミューテーションは `store/mutations.js` に置くことができます

```js{}[store/mutations.js]
export default {
  increment(state) {
    state.counter++
  }
}
```

## ストアでのプラグイン

`store/index.js` ファイルの中に置くことで、ストアにプラグインを追加することができます:

```js{}[store/index.js]
import myPlugin from 'myPlugin'

export const plugins = [myPlugin]

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
```

プラグインについてより詳細な情報はこちら: [Vuex のドキュメント](https://vuex.vuejs.org/ja/plugins.html)

## nuxtServerInit アクション

ストアに `nuxtServerInit` アクションが定義されていて、かつ `universal` モードの場合、Nuxt.js はコンテキストを渡してこれを呼び出します（サーバサイドのみ）。これはサーバにある何らかのデータを直接クライアントサイドに渡すときに便利です。

例えば、サーバサイドにセッションがあり、`req.session.user` で接続したユーザにアクセスできるとしましょう。認証されたユーザをストアに渡すには、`store/index.js` を以下のように変更します:

```js{}[store/index.js]
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

<base-alert>

このアクションは受け取るのは（`store/index.js` 内の）プライマリモジュールだけです。ここから他のモジュールのアクションに呼び出しを繋いでいく必要があります。

</base-alert>

[コンテキスト](/docs/2.x/concepts/context-helpers)は `asyncData` メソッドのように、`nuxtServerInit` の第 2 引数として渡されます。

`nuxt generate` が走った場合、`nuxtServerInit` は全ての動的に生成されたルートで実行されます。

<base-alert type="info">

非同期の `nuxtServerInit` アクションは、Promise を返すか async/await を利用して nuxt サーバが待機できるようにしなければなりません。

</base-alert>

```js{}[store/index.js]
actions: {
  async nuxtServerInit({ dispatch }) {
    await dispatch('core/load')
  }
}
```

## Vuex 厳格モード

厳格モードは dev モードではデフォルトで有効になっていて、production モードでは無効になっています。 厳格モードを dev モードでも無効化するには、`store/index.js` を下記の例に従ってください:

```js
export const strict = false
```

<quiz :questions="questions"></quiz>
