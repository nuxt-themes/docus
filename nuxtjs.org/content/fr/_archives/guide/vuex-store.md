---
title: Store Vuex
description: L'utilisation d'un store pour gérer l'état est important pour toutes les applications de taille importante. C'est pourquoi Vuex est implémenté au cœur de Nuxt.js.
category: getting-started
position: 110
---

> L'utilisation d'un store pour gérer l'état est important pour toutes les applications de taille importante. C'est pourquoi [Vuex](https://vuex.vuejs.org/fr/) est implémenté au cœur de Nuxt.js.

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/utilising-the-vuex-store-nuxtjs?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Visionner un cours gratuit sur <strong>Nuxt.js et Vuex</strong> sur Vue School (EN)
    </p>
  </a>
</div>

## Activer le store

Nuxt.js recherchera le répertoire `store`. S'il existe, il :

1. importera Vuex,
2. ajoutera l'option `store` à l'instance racine de Vue.

Nuxt.js vous laisse le choix entre **2 modes de store**, choisissez celui qui vous convient le mieux :

- **Modules :** chaque fichier `.js` dans le répertoire `store` est transformé en tant que module avec son propre espace de nom (`index` étant le module racine).
- **Classique (**deprécié**):** `store/index.js` retourne une méthode pour créer une instance de store.

Quelque soit le mode utilisé, votre valeur `state` devrait **toujours être une `function`** afin d'éviter tout état _partagé_ non désiré du côté serveur.

## Mode modules

> Nuxt.js vous permet d'avoir un répertoire `store` dans lequel chaque fichier correspond à un module.

Si vous voulez cette option, exportez l'état, les mutations et les actions dans `store/index.js` au lieu de l'instance `store` :

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

Puis, vous pouvez avoir un fichier `store/todos.js` :

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

Le store sera comme suit :

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

Et dans votre `pages/todos.vue`, utiliser le module `todos` :

```html
<template>
  <ul>
    <li v-for="todo in todos">
      <input type="checkbox" :checked="todo.done" @change="toggle(todo)" />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li>
      <input
        placeholder="Qu'est-ce qui doit être fait ?"
        @keyup.enter="addTodo"
      />
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

> La méthode module fonctionne également pour les définitions de premier niveau sans implémenter de sous-répertoire dans le dossier `store`

Exemple pour l'état ; créer un fichier `store/state.js` et ajouter ceci

```js
export default () => ({
  counter: 0
})
```

Et les mutations correspondantes peuvent être dans le fichier `store/mutations.js`

```js
export default {
  increment(state) {
    state.counter++
  }
}
```

<div class="Alert">

Vous pouvez également avoir des modules en exportant une instance de store, vous devrez alors les ajouter manuellement sur votre store.

</div>

### Fichiers de module

Vous pouvez optionnellement scinder un fichier de module en plusieurs fichiers séparés : `state.js`, `actions.js`, `mutations.js` et `getters.js`. Si vous maintenez un fichier `index.js` avec un état, des accesseurs et des mutations alors que les actions sont dans un fichier séparé, cela va également être proprement interprété.

> Note : lorsque vous utilisez des modules en fichiers séparés, vous devez vous rappeler que d'utiliser des fonctions fléchées , `this` n'est disponible que de façon lexicale. La portée lexicale signifie simplement que le `this` fait toujours référence au propriétaire de la fonction fléchée. Si la fonction fléchée n'est pas contenue, alors `this` sera non défini. La solution est d'utiliser une fonction "normale" qui produira sa propre portée et qui dispose donc de `this`.

> Note: Whilst using split-file modules, you must remember that using arrow functions, `this` is only lexically available. Lexical scoping simply means that the `this` always references the owner of the arrow function. If the arrow function is not contained then `this` would be undefined. The solution is to use a "normal" function which produces its own scope and thus has `this` available.

### Plugins

Vous pouvez ajouter des plugins additionnels au store (en mode modules) en les ajoutant dans le fichier `store/index.js` :

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

Pour plus d'informations à propos des plugins, consultez la [documentation Vuex](https://vuex.vuejs.org/fr/plugins.html).

## La méthode fetch

> La méthode `fetch` est utilisée pour remplir le store avant de faire le rendu de la page, c'est comme la méthode `asyncData` sauf qu'elle ne définit pas les données du composant.

Plus d'informations à propos de la méthode `fetch` dans [la partie Pages de l'API pour `fetch`](/api/pages-fetch).

## L'action nuxtServerInit

Si l'action `nuxtServerInit` est définie dans le store, Nuxt.js l'appellera avec le contexte (uniquement côté serveur). C'est utile lorsque nous disposons de données sur le serveur que nous voulons donner directement au client.

Par exemple, disons que nous avons des sessions côté serveur et nous pouvons accéder à l'utilisateur connecté grâce à `req.session.user`. Pour fournir l'utilisateur authentifié à notre store, nous mettons à jour notre `store/index.js` comme suit :

```js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

> Si vous utilisez le mode _Modules_ du store Vuex, seul le module principal (dans `store/index.js`) recevra cette action. Vous devrez chainer vos actions de module à partir de là.

Le [contexte](/api/context) est fourni par `nuxtServerInit` comme deuxième argument. C'est le même que pour les méthodes `data` et `fetch`.

> Note : Les actions `nuxtServerInit` asynchrones doivent retourner une promesse pour permettre au serveur `nuxt` de les attendre.

```js
actions: {
  async nuxtServerInit({ dispatch }) {
    await dispatch('core/load')
  }
}
```

## Mode strict de Vuex

Le mode strict est activé par défaut sur le mode développement et est désactivé par défaut sur le mode production. Désactivez le mode strict en développement en procédent comme ci-après dans `store/index.js`:

`export const strict = false`

## Mode classique

> Cette fonctionnalité sera dépréciée et retirée dans Nuxt 3.

Pour activer le store avec le mode classique, nous créons `store/index.js` qui devrait exporter une méthode qui renvoie une instance Vuex :

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

> Pas besoin d'installer `vuex`, celui-ci étant livré avec Nuxt.js.

Nous pouvons alors utiliser `this.$store` dans nos composants :

```html
<template>
  <button @click="$store.commit('increment')">
    {{ $store.state.counter }}
  </button>
</template>
```
