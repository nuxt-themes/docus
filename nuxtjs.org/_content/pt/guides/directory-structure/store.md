---
title: store
description: O diretório `store` contém seus arquivos da Store Vuex. A Store Vuex vem pronto para uso com o Nuxt.js, mas é desabilitado por padrão. Criar um arquivo `index.js` neste diretório habilita a store.
position: 13
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/14_store?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Como você habilita a loja?
    answers:
      - Está habilitado por padrão
      - crie um arquivo js na pasta store
      - 'adicione store: true em seu arquivo nuxt.config.js'
    correctAnswer: crie um arquivo js na pasta store
  - question: Cada arquivo .js no diretório store é transformado em um
    answers:
      - plugin
      - module
      - function
    correctAnswer: module
  - question: Na loja você deve exportar o state como
    answers:
      - uma função
      - um objeto
      - uma string
    correctAnswer: uma função
  - question: Na loja você deve exportar as mutations e actions como
    answers:
      - uma função
      - um objeto
      - uma string
    correctAnswer: um objeto
  - question: Você pode adicionar plugins à store
    answers:
      - true
      - false
    correctAnswer: true
  - question: O método fetch é usado para popular a store
    answers:
      - antes de renderizar a página
      - enquanto renderiza a página
      - depois de renderizar a página
    correctAnswer: antes de renderizar a página
  - question: O que você pode usar quando tiver alguns dados no servidor que deseja fornecer diretamente para o cliente?
    answers:
      - nuxtServerInit
      - fetch
      - asyncData
    correctAnswer: nuxtServerInit
  - question: Em asyncData, o contexto é dado ao nuxtServerInit como o
    answers:
      - primerio argumento
      - segundo argumento
      - terceiro argumento
    correctAnswer: segundo argumento
---

O diretório `store` contém seus arquivos da [Store Vuex](http://vuex.vuejs.org/en/). A Store Vuex vem pronto para uso com o Nuxt.js, mas é desabilitado por padrão. Criar um arquivo `index.js` neste diretório habilita a store.

<base-alert>

_Este diretório não pode ser renomeado sem configuração extra._

</base-alert>

Usar uma store para gerenciar o estado é importante para todos as aplicações de grande porte. É por isso que o Nuxt.js implementa o Vuex em seu núcleo.

## Ative a Store

Nuxt.js procurará o diretório `store`, se existir, irá:

1. Importar Vuex
2. Adicionar a opção `store` à instância raiz do Vue.

## Módulos

Cada arquivo `.js` dentro do diretório `store` é transformado em um [módulo com namespace](http://vuex.vuejs.org/en/modules.html) (`index` sendo o módulo raiz). Seu valor `state` deve ser sempre uma `função` para evitar o estado _compartilhado_ indesejado no lado do servidor.

Para começar, exporte o state como uma função e as mutations e actions como objetos.

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

Então, você pode ter um arquivo `store/todos.js`:

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
  toggle(todo) {
    todo.done = !todo.done
  }
}
```

A store será criada da seguinte forma:

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

E em seu `pages/todos.vue`, usando o módulo `todos`:

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

O método do módulo também funciona para definições de alto nível sem implementar um subdiretório no diretório da store

Exemplo de state: você cria um arquivo `store/state.js` e adiciona o seguinte:

```js
export default () => ({
  counter: 0
})
```

E as mutations correspondentes podem estar no arquivo `store/mutations.js`

```js{}[store/mutations.js]
export default {
  increment(state) {
    state.counter++
  }
}
```

## Plugins na Store

Você pode adicionar plugins adicionais à store, colocando-os no arquivo `store/index.js`:

```js{}[store/index.js]
import meuPlugin from 'meuPlugin'

export const plugins = [meuPlugin]

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
```

Mais informações sobre os plugins: [documentação do Vuex](https://vuex.vuejs.org/en/plugins.html).

## A action nuxtServerInit

Se a action `nuxtServerInit` for definida na store e o modo for `universal`, o Nuxt.js irá chamá-la com o contexto (apenas do lado do servidor). É útil quando temos alguns dados no servidor que queremos passar diretamente para o lado do cliente.

Por exemplo, digamos que temos sessões no lado do servidor e podemos acessar o usuário conectado através de `req.session.user`. Para fornecer o usuário autenticado à nossa store, atualizamos nosso `store/index.js` para o seguinte:

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

Apenas o módulo primário (em store/index.js) receberá esta action. Você precisará encadear as ações do módulo a partir daí.

</base-alert>

O [contexto](/docs/2.x/concepts/context-helpers) é dado ao `nuxtServerInit` como o segundo argumento no método `asyncData`.

Se `nuxt generate` for executado, `nuxtServerInit` será executado para cada rota dinâmica gerada.

<base-alert type="info">

As actions nuxtServerInit assíncronas devem retornar uma Promise ou utilizar async/await para permitir que o servidor nuxt espere por elas.

</base-alert>

```js{}[store/index.js]
actions: {
  async nuxtServerInit({ dispatch }) {
    await dispatch('core/load')
  }
}
```

## Modo estrito do Vuex

O modo estrito é habilitado por padrão no modo dev e desligado no modo de produção. Para desativar o modo estrito em dev, siga o exemplo abaixo em `store/index.js`:

```js
export const strict = false
```

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
