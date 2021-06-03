---
title: Хранилище Vuex
description: Использование единого хранилища для управления состоянием приложения важно для любого крупного проекта, поэтому nuxt.js в своём ядре использует Vuex.
category: getting-started
position: 110
---

> Использование единого хранилища для управления состоянием приложения важно для любого крупного проекта, поэтому nuxt.js в своём ядре использует Vuex.

## Активация хранилища

Если Nuxt.js обнаруживает каталог `store`, происходит следующее:

1. Импортируется Vuex
2. Модуль `vuex` добавляется в сборку vendors
3. Опция `store` добавляется к корневому экземпляру `Vue`.

Nuxt.js позволяет выбрать один из двух подходов при работе с хранилищем:

- **Обыкновенный:** `store/index.js` возвращает экземпляр хранилища
- **Модульный:** каждый `.js`-файл в папке `store` считается [модулем с пространством имён](http://vuex.vuejs.org/en/modules.html) (`index` считается корневым модулем)

Для использования хранилища в обычном режиме, мы создаём файл `store/index.js` и экспортируем экземпляр хранилища:

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    state: {
      counter: 0
    },
    mutations: {
      increment(state) {
        state.counter++
      }
    }
  })

export default store
```

> Нет необходимости отдельно устанавливать `vuex` — он идёт в комплекте с nuxt.js

Теперь в наших компонентах можно использовать `this.$store`:

```html
<template>
  <button @click="$store.commit('increment')">
    {{ $store.state.counter }}
  </button>
</template>
```

## Файлы модулей

> Nuxt.js позволяет использовать каждый файл в директории `store` как отдельный модуль хранилища.

Если вы хотите использовать этот подход, экспортируйте в `store/index.js` состояние, мутации и действия, а не экземпляр хранилища:

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

Предположим, у нас есть модуль `store/todos.js`:

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
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
```

И в `pages/todos.vue` мы используем модуль `todos`:

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

<div class="Alert">

Модули, экспортирующие экземпляр хранилища, использовать тоже можно — но подключать их придётся вручную.

</div>

## Метод fetch

> Метод `fetch` используется для заполнения хранилища перед рендерингом страницы. Он похож на метод `data`, но не устанавливает данные компонента.

Метод `fetch`, _если он указан_, вызывается каждый раз перед загрузкой компонента (**вышесказанное справедливо только для компонентов-страниц**). Он может быть вызван как при рендеренге на сервере, так и при переходе по ссылке на клиенте.

Метод `fetch` получает в качестве первого аргумента [контекст](/api/context). Чтобы сделать метод асинхронным, **верните промис** — nuxt.js дождётся его разрешения перед тем как рендерить компонент.

Пример `pages/index.vue`:

```html
<template>
  <h1>Звёзды: {{ $store.state.stars }}</h1>
</template>

<script>
  export default {
    fetch({ store, params }) {
      return axios.get('http://my-api/stars').then(res => {
        store.commit('setStars', res.data)
      })
    }
  }
</script>
```

Чтобы сделать код чище, можно использовать async/await:

```html
<template>
  <h1>Звёзды: {{ $store.state.stars }}</h1>
</template>

<script>
  export default {
    async fetch({ store, params }) {
      let { data } = await axios.get('http://my-api/stars')
      store.commit('setStars', data)
    }
  }
</script>
```

## Контекст

Чтобы увидеть список доступных ключей в `context`, взгляните на [документацию api контекста страницы](/api/context).

## Действие nuxtServerInit

Если действие `nuxtServerInit` определено для хранилища, nuxt.js вызовет его в рамках контекста (только на сервере). Это может быть полезным, если у нас есть данные на сервере, которые мы хотим передать клиентскому приложению напрямую.

Например, предположим что у нас есть хранилище сессий и мы можем получить доступ к пользователю через `req.authUser`. Чтобы указать данные о пользователе в хранилище, добавьте в `store/index.js` следующий код:

```js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.authUser) {
      commit('user', req.authUser)
    }
  }
}
```

Контекст передаётся в `nuxtServerInit` в качестве второго параметра. В целом метод работает так же как `data` или `fetch`, за исключением того, что `context.redirect()` и `context.error()` опускаются.
