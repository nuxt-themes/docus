---
title: store
description: Le répertoire `store` contient vos fichiers Store pour Vuex. Le Store Vuex est livré avec Nuxt.js mais désactivé par défaut. La création d'un fichier `index.js` dans ce répertoire active le store.
position: 13
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/14_store?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Comment activer le store ?
    answers:
      - Il est activé par défaut
      - créer un fichier js dans le répertoire store
      - ajouter `store:true` au fichier nuxt.config.js
    correctAnswer: créer un fichier js dans le répertoire store
  - question: Chaque fichier .js dans le répertoire store est transformé en un
    answers:
      - plugin
      - module
      - fonction
    correctAnswer: module
  - question: Dans store, vous devez exporter `state` comme
    answers:
      - une fonction
      - un objet
      - une chaine de caractères
    correctAnswer: une fonction
  - question: Dans store, vous devez exporter les mutations et les actions comme
    answers:
      - une fonction
      - un objet
      - une chaine de caractères
    correctAnswer: un objet
  - question: Vous pouvez ajouter des plugins dans store
    answers:
      - vrai
      - faux
    correctAnswer: vrai
  - question: La méthode `fetch` est utilisée pour remplir le store
    answers:
      - avant le rendu de la page
      - pendant le rendu de la page
      - après le rendu de la page
    correctAnswer: avant le rendu de la page
  - question: Que pouvez-vous utiliser lorsque vous avez des données sur le serveur que vous voulez donner directement au côté client ?
    answers:
      - nuxtServerInit
      - fetch
      - asyncData
    correctAnswer: nuxtServerInit
  - question: Dans asynData, le contexte est donné au nuxtServerInit en tant que
    answers:
      - premier argument
      - deuxième argument
      - troisième argument
    correctAnswer: deuxième argument
---

Le répertoire `store` contient vos fichiers Store pour [Vuex](http://vuex.vuejs.org/en/). Le Store Vuex est livré avec Nuxt.js mais désactivé par défaut. La création d'un fichier `index.js` dans ce répertoire active le store.

<base-alert>

_Ce répertoire ne peut pas être renommé sans configuration supplémentaire._

</base-alert>

L'utilisation du store pour gérer l'état est importante pour toute grande application. C'est pourquoi Nuxt.js implémente Vuex dans son noyau.

## Activer le Store

Nuxt.js recherchera le répertoire `store`, s'il existe, il fera :

1. L'importation de Vuex
2. L'ajout de l'option `store` à la racine de l'instance Vue.

## Modules

Chaque fichier `.js` dans le répertoire `store` est transformé en [namespaced module](http://vuex.vuejs.org/en/modules.html) (`index` étant le module racine). L'état `state` doit toujours être une fonction pour éviter les états _partagés_ non désirés du côté du serveur.

Pour commencer, exportez l'état `state` en tant que fonction, et les mutations et actions en tant qu'objets.

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

Ensuite, vous pouvez avoir un fichier `store/todos.js` :

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

Le store sera créé en tant que tel :

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

Et dans votre `pages/todos.vue`, en utilisant le module `todos` :

```js{}[pages/todos.vue]
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.text">
      <input :checked="todo.done" @change="toggle(todo)" type="checkbox">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li><input @keyup.enter="addTodo" placeholder="Que faut-il faire ?"></li>
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

La méthode des modules fonctionne également pour les définitions de haut niveau sans implémenter un sous-répertoire dans le répertoire `store`.

Exemple pour l'état `state` : nous créons un fichier `store/state.js` et nous ajoutons ce qui suit.

```js
export default () => ({
  counter: 0
})
```

Et les mutations correspondantes peuvent se trouver dans le fichier `store/mutations.js`.

```js{}[store/mutations.js]
export default {
  increment(state) {
    state.counter++
  }
}
```

## Plugins dans le Store

Vous pouvez ajouter des plugins supplémentaires au store en les plaçant dans le fichier `store/index.js` :

```js{}[store/index.js]
import monPlugin from 'monPlugin'

export const plugins = [monPlugin]

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
```

Plus d'informations sur les plugins : [Documentation Vuex](https://vuex.vuejs.org/fr/guide/plugins.html).

## L'action nuxtServerInit

Si l'action `nuxtServerInit` est définie dans le store et que le mode est `universal`, alors Nuxt.js l'appellera avec le contexte (uniquement du côté du serveur). C'est utile lorsque nous avons des données sur le serveur à passer directement au côté client.

Par exemple, disons que nous avons des sessions côté serveur et que nous pouvons accéder à l'utilisateur connecté par l'intermédiaire de `req.session.user`. Pour donner l'utilisateur authentifié à notre store, nous mettons à jour notre `store/index.js` comme suit :

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

Seul le module principal (dans `store/index.js`) recevra cette action. Vous devrez enchaîner vos actions de module à partir de là.

</base-alert>

Le [contexte](/docs/2.x/concepts/context-helpers) est donné à `nuxtServerInit` comme 2ème argument dans la méthode `asyncData`.

Si `nuxt generate` est lancé, `nuxtServerInit` sera exécuté pour chaque route dynamique générée.

<base-alert type="info">

Les actions asynchrones `nuxtServerInit` doivent retourner une Promesse ou utiliser `async/await` pour permettre au serveur nuxt de les attendre.

</base-alert>

```js{}[store/index.js]
actions: {
  async nuxtServerInit({ dispatch }) {
    await dispatch('core/load')
  }
}
```

## Vuex Strict Mode

Le mode strict est activé par défaut en mode développement et désactivé en mode production. Pour désactiver le mode strict en dev, suivez l'exemple ci-dessous dans `store/index.js` :

```js
export const strict = false
```

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
