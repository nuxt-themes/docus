---
title: store
description: El directorio `store` contiene tus archivos del Vuex Store. Vuex Store viene con Nuxt.js listo para usar, pero está deshabilitado de forma predeterminada. La creación de un archivo `index.js` en este directorio habilita el _store_.
position: 13
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/14_store?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: ¿Cómo se habilita el _store_?
    answers:
      - Está habilitado por defecto
      - Crea un archivo js en la carpeta de la tienda
      - 'Añade store: true a tu archivo nuxt.config.js'
    correctAnswer: Crea un archivo js en la carpeta _store_
  - question: Cada archivo .js en el directorio _store_ es transformado a
    answers:
      - plugin
      - módulo
      - función
    correctAnswer: módulo
  - question: En el _store_ debes exportar el estado como
    answers:
      - una función
      - un objeto
      - una cadena
    correctAnswer: una función
  - question: En el _store_ debes exportar las mutaciones y acciones como
    answers:
      - una función
      - un objeto
      - un _string_
    correctAnswer: an object
  - question: Puedes agregar complementos al _store_
    answers:
      - cierto
      - falso
    correctAnswer: Verdadero
  - question: El método _fetch_ se usa para llenar el _store_
    answers:
      - antes de renderizar la página
      - mientras se renderiza la página
      - después de renderizar la página
    correctAnswer: antes de renderizar la página
  - question: ¿Qué puedes usar cuando tiene algunos datos en el servidor que deseas dar directamente al lado del cliente?
    answers:
      - nuxtServerInit
      - fetch
      - asyncData
    correctAnswer: nuxtServerInit
  - question: En asynData el contexto es dado al nuxtServerInit como el
    answers:
      - primer argumento
      - segundo argumento
      - tercer argumento
    correctAnswer: segundo argumento
---

El directorio `store` contiene tus archivos del [Vuex Store](http://vuex.vuejs.org/en/). Vuex Store viene con Nuxt.js listo para usar, pero está deshabilitado de forma predeterminada. La creación de un archivo `index.js` en este directorio habilita el _store_.

<base-alert>

_Este directorio no puede ser renombrado sin configuraciones adicionales._

</base-alert>

Usar un _store_ para administrar el estado es importante para todas las aplicaciones grandes. Es por eso que Nuxt.js implementa Vuex en su núcleo.

## Activar el Store

Nuxt.js buscará el directorio `store`, si existe, hará lo suigiente:

1. Importar Vuex
2. Agrega la opción `store` a la instancia raíz de Vue.

## Módulos

Cada archivo `.js` dentro del directorio `store` es transformado como un [módulo de espacio de nombres](http://vuex.vuejs.org/en/modules.html) (siendo `index` el módulo raíz). El valor de tu `state` siempre debe ser una función para evitar un estado _compartido_ no deseado en el lado del servidor.

Para empezar, exporta el estado como una función, y las mutaciones y acciones como objetos.

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

Entonces, puedes tener un archivo `store/todos.js`:

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

La tienda se creará como tal:

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

Y en tu `pages/todos.vue`, usando el módulo `todos`:

```js{}[pages/todos.vue]
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.text">
      <input :checked="todo.done" @change="toggle(todo)" type="checkbox">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li><input @keyup.enter="addTodo" placeholder="¿Qué hay que hacer?"></li>
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

El método del módulo también funciona para definiciones de nivel superior sin implementar un subdirectorio en el directorio del _store_.

Ejemplo de estado: crea un archivo `store/state.js` y agrega lo siguiente

```js
export default () => ({
  counter: 0
})
```

Y las mutaciones correspondientes pueden estar en el archivo `store/mutations.js`

```js{}[store/mutations.js]
export default {
  increment(state) {
    state.counter++
  }
}
```

## Plugins en el Store

Puedes agregar plugins adicionales al _store_ poniéndolos en el archivo `store/index.js`:

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

Más información sobre los plugins: [Vuex documentation](https://vuex.vuejs.org/en/plugins.html).

## La acción nuxtServerInit

Si la acción `nuxtServerInit` está definida en el _store_ y el modo es `universal`, Nuxt.js lo llamará con el contexto (solo desde el lado del servidor). Es útil cuando tenemos algunos datos en el servidor que queremos dar directamente al lado del cliente.

Por ejemplo, digamos que tenemos sesiones en el lado del servidor y podemos acceder al usuario conectado a través de `req.session.user`. Para dar el usuario autenticado a nuestro _store_, actualizamos nuestro `store/index.js` a lo siguiente:

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

Solo el módulo principal (en `store/index.js`) recibirá esta acción. Deberá encadenar las acciones de su módulo desde allí.

</base-alert>

El [contexto](/docs/2.x/concepts/context-helpers) es dado a `nuxtServerInit` como el segundo argumento al método `asyncData`.

Si se ejecuta `nuxt generate`, `nuxtServerInit` se ejecutará para cada ruta dinámica generada.

<base-alert type="info">

Las acciones asincrónicas de `nuxtServerInit` deben devolver una promesa o aprovechar async/await para permitir que el servidor nuxt las espere.

</base-alert>

```js{}[store/index.js]
actions: {
  async nuxtServerInit({ dispatch }) {
    await dispatch('core/load')
  }
}
```

## Modo estricto de Vuex

El modo estricto está habilitado de forma predeterminada en el modo de desarrollo y desactivado en el modo de producción. Para deshabilitar el modo estricto en dev, sigue el siguiente ejemplo en `store/index.js`:

```js
export const strict = false
```

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
