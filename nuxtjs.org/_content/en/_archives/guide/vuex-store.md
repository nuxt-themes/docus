---
title: Vuex Store
description: Using a store to manage the state is important for every big application. That's why Nuxt.js implements Vuex in its core.
category: getting-started
position: 110
---

> Using a store to manage the state is important for every big application. That's why Nuxt.js implements [Vuex](https://vuex.vuejs.org/en/) in its core.

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/utilising-the-vuex-store-nuxtjs?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Watch a free lesson about <strong>Nuxt.js and Vuex</strong> on Vue School
    </p>
  </a>
</div>

## Activate the Store

Nuxt.js will look for the `store` directory. If it contains a file, that isn't a hidden file or a `README.md` file, then the store will be activated. This means that Nuxt will:

1. Import Vuex,
2. Add the `store` option to the root Vue instance.

Nuxt.js lets you decide between **2 store modes**. You can choose the one you prefer:

- **Modules:** every `.js` file inside the `store` directory is transformed as a [namespaced module](http://vuex.vuejs.org/en/modules.html) (`index` being the root module).
- **Classic (**deprecated**):** `store/index.js` returns a method to create a store instance.

Regardless of the mode, your `state` value should **always be a `function`** to avoid unwanted _shared_ state on the server side.

## Modules mode

> Nuxt.js lets you have a `store` directory with every file corresponding to a module.

To get started, export the state as a function, and the mutations and actions as objects in `store/index.js`:

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

Then, you can have a `store/todos.js` file:

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

The store will be created as such:

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
            done: false,
            id: Date.now()
          })
        },
        remove(state, { todo }) {
          state.list = state.list.filter(item => item.id !== todo.id)
        },
        toggle(state, { todo }) {
          todo.done = !todo.done
        }
      }
    }
  }
})
```

And in your `pages/todos.vue`, using the `todos` module:

```html
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <input :checked="todo.done" @change="toggle(todo)" type="checkbox" />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="removeTodo(todo)">remove</button>
    </li>
    <li>
      <input @keyup.enter="addTodo" placeholder="What needs to be done?" />
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
      }),
      removeTodo(todo) {
        this.$store.commit('todos/remove', todo)
      }
    }
  }
</script>

<style>
  .done {
    text-decoration: line-through;
  }
</style>
```

> The module method also works for top-level definitions without implementing a sub-directory in the `store` directory

Example for state: you create a file `store/state.js` and add the following

```js
export default () => ({
  counter: 0
})
```

And the corresponding mutations can be in the file `store/mutations.js`

```js
export default {
  increment(state) {
    state.counter++
  }
}
```

### Module files

You can optionally break down a module file into separate files: `state.js`, `actions.js`, `mutations.js` and `getters.js`. If you maintain an `index.js` file with state, getters and mutations while having a single separate file for actions, that will also still be properly recognized.

> Note: Whilst using split-file modules, you must remember that using arrow functions, `this` is only lexically available. Lexical scoping means that the `this` always references the owner of the arrow function. If the arrow function is not contained then `this` would be undefined. The solution is to use a "normal" function which produces its own scope and thus has `this` available.

### Plugins

You can add additional plugins to the store (in the modules mode) by putting them into the `store/index.js` file:

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

More information about the plugins: [Vuex documentation](https://vuex.vuejs.org/en/plugins.html).

## The fetch Method

> The `fetch` method is used to fill the store before rendering the page, it's like the `asyncData` method except it doesn't set the component data.

More information about the fetch method: [API Pages fetch](/api/pages-fetch).

## The nuxtServerInit Action

If the action `nuxtServerInit` is defined in the store and the mode is `universal`, Nuxt.js will call it with the context (only from the server-side). It's useful when we have some data on the server we want to give directly to the client-side.

For example, let's say we have sessions on the server-side and we can access the connected user through `req.session.user`. To add the authenticated user to our store, we update our `store/index.js` to the following:

```js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

> If you are using the _Modules_ mode of the Vuex store, only the primary module (in `store/index.js`) will receive this action. You'll need to chain your module actions from there.

The [context](/api/context) is given to `nuxtServerInit` as the 2nd argument, it is the same as `asyncData` or `fetch` method.

If `nuxt generate` is ran, `nuxtServerInit` will be executed for every dynamic route generated.

> Note: Asynchronous `nuxtServerInit` actions must return a Promise or leverage async/await to allow the `nuxt` server to wait on them.

```js
actions: {
  async nuxtServerInit({ dispatch }) {
    await dispatch('core/load')
  }
}
```

## Vuex Strict Mode

Strict mode is enabled by default on dev mode and turned off in production mode. To disable strict mode in dev, follow the below example in `store/index.js`:

`export const strict = false`

## Classic mode

> This feature is deprecated and will be removed in Nuxt 3.

To activate the store with the classic mode, we create the `store/index.js` file which should export a method that returns a Vuex instance:

```js
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
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

> We don't need to install `vuex` since it's shipped with Nuxt.js.

We can now use `this.$store` inside our components:

```html
<template>
  <button @click="$store.commit('increment')">
    {{ $store.state.counter }}
  </button>
</template>
```
