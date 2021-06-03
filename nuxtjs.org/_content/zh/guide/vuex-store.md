---
title: Vuex 状态树
description: 对于每个大项目来说，使用状态树 (store) 管理状态 (state) 十分有必要。这就是为什么 Nuxt.js 内核实现了 Vuex。
category: getting-started
position: 110
---

> 对于每个大项目来说，使用状态树 (store) 管理状态 (state) 十分有必要。这就是为什么 Nuxt.js 内核实现了 [Vuex](https://github.com/vuejs/vuex)。

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/utilising-the-vuex-store-nuxtjs?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
    在Vue School 上观看关于<strong>Nuxt.js 和 Vuex</strong> 的免费课程
    </p>
  </a>
</div>

## 使用状态树

Nuxt.js 会尝试找到 src 目录（默认是应用根目录）下的 `store` 目录，如果该目录存在，它将做以下的事情：

1. 引用 `vuex` 模块
2. 将 `vuex` 模块 加到 vendors 构建配置中去
3. 设置 `Vue` 根实例的 `store` 配置项

Nuxt.js 支持两种使用 `store` 的方式，你可以择一使用：

- **模块方式：** `store` 目录下的每个 `.js` 文件会被转换成为状态树[指定命名的子模块](http://vuex.vuejs.org/en/modules.html) （当然，`index` 是根模块）

- **Classic(不建议使用)：** `store/index.js`返回创建 Vuex.Store 实例的方法。

无论使用那种模式，您的`state`的值应该**始终是**`function`，为了避免返回引用类型，会导致多个实例相互影响。

### 普通方式

> Nuxt.js 允许您拥有一个 `store` 目录，其中包含与模块对应的每个文件。

首先，只需将状态导出为 _函数_，将变量和操作作为 `store/index.js` 中的对象导出：

```js
export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
```

然后，您可以拥有 `store/todos.js` 文件：

```js
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

Vuex 将如下创建：

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

在您的 `pages/todos.vue` 中，使用 `todos` 模块：

```html
<template>
  <ul>
    <li v-for="todo in todos">
      <input type="checkbox" :checked="todo.done" @change="toggle(todo)" />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li>
      <input placeholder="What needs to be done?" @keyup.enter="addTodo" />
    </li>
  </ul>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    computed: {
      todos() {
        return this.$store.state.todos.list
      }
    },
    methods: {
      addTodo(e) {
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

> 模块方法也适用于顶级定义，而无需在 `store` 目录中实现子目录

示例：您创建文件 `store/state.js` 并添加以下内容

```js
export default () => ({
  counter: 0
})
```

相应的可以在文件夹中添加 `store/mutations.js`

```js
export default {
  increment(state) {
    state.counter++
  }
}
```

### 模块文件

您可以将模块文件分解为单独的文件：`state.js`,`actions.js`,`mutations.js`和`getters.js`。如果您使用`index.js`来维护`state`,`getters`,`actions`和`mutations`，同时具有单个单独的操作文件，那么仍然可以正确识别该文件。

> 注意：在使用拆分文件模块时，必须记住使用**箭头函数功能**， `this` 在词法上可用。词法范围`this`意味着它总是指向引用**箭头函数**的所有者。如果未包含**箭头函数**，那么`this`将是未定义的(`undefined`)。解决方案是使用 "normal" 功能，该功能会将`this`指向自己的作用域，因此可以使用。

### 插件

您可以将其他插件添加到 store（在模块模式下），将其放入`store/index.js`文件中：

```js
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

有关插件的更多信息: [Vuex 文档](https://vuex.vuejs.org/en/plugins.html).

## fetch 方法

> fetch 方法会在渲染页面前被调用，作用是填充状态树 (store) 数据，与 asyncData 方法类似，不同的是它不会设置组件的数据。

关于 `fetch` 方法的更多信息，请参考 [页面 fetch 方法 API](/docs/2.x/components-glossary/pages-fetch)。

## nuxtServerInit 方法

如果在状态树中指定了 `nuxtServerInit` 方法，Nuxt.js 调用它的时候会将页面的上下文对象作为第 2 个参数传给它（服务端调用时才会酱紫哟）。当我们想将服务端的一些数据传到客户端时，这个方法是灰常好用的。

举个例子，假设我们服务端的会话状态树里可以通过 `req.session.user` 来访问当前登录的用户。将该登录用户信息传给客户端的状态树，我们只需更新 `store/index.js` 如下：

```js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

> 如果你使用*状态树模块化*的模式，只有主模块（即 `store/index.js`）适用设置该方法（其他模块设置了也不会被调用）。

这时[context](/docs/2.x/internals-glossary/context)被赋予`nuxtServerInit`作为第二个参数，它与`asyncData`或`fetch`方法相同。

`nuxtServerInit` 方法接收的上下文对象和 `fetch` 的一样，但不包括 `context.redirect()` 和 `context.error()`。

> 注意：异步`nuxtServerInit`操作必须返回 Promise 来通知`nuxt`服务器等待它们。

```js
actions: {
  async nuxtServerInit({ dispatch }) {
    await dispatch('core/load')
  }
}
```

## Vuex 严格模式

默认情况下，在开发模式下启用严格模式，在生产模式下关闭模式。要在 dev 中禁用严格模式，请遵循以下示例。

### Module Mode

`export const strict = false`

### 经典模式

> 此功能已经弃用，将在 Nuxt 3 中删除。

要使用经典模式创建 Vuex，我们应该创建`store/index.js`到处返回 Vuex 实例的方法的文件：

```js
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    strict: false,
    state: () => ({
      counter: 0
    }),
    mutations: {
      increment(state) {
        state.counter++
      }
    }
  })
}

export default createStore
```

> 我们不需要安装，因为 Vuex 由 Nuxt.js 提供。

我们现在可以在我们的组件中使用`this.$store`：

```html
<template>
  <button @click="$store.commit('increment')">
    {{ $store.state.counter }}
  </button>
</template>
```
