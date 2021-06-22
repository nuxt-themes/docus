---
title: Authentification de routes
description: Exemple d'authentification de routes avec Nuxt.js
github: auth-routes
livedemo: https://nuxt-auth-routes.gomix.me
liveedit: https://gomix.com/#!/project/nuxt-auth-routes
category: advanced
position: 42
---

# Documentation

> Nuxt.js peut être utilisé pour créer facilement des routes authentifiées.

## Module officiel `auth-module`

Si vous souhaitez implémenter des flux d'authentification complexes, par exemple OAuth2, nous vous suggérons d'utiliser la fonction officielle [`auth-module`](https://github.com/nuxt-community/auth-module)

## Avec Express et Sessions

Si vous souhaitez implémenter un flux d'authentification complexe, par exemple OAuth2, nous suggérons d'utiliser le module officiel [`auth-module`](https://github.com/nuxt-community/auth-module)

## Utilisation de Express et des sessions

Pour ajouter la fonctionnalité de sessions dans notre application, nous utiliserons `express` et `express-session`. Pour cela, nous devons utiliser Nuxt.js de manière programmatique.

Premièrement, nous installons les dépendances :

```bash
yarn add express express-session body-parser whatwg-fetch
```

_Nous parlerons de `whatwg-fetch` plus loin._

Puis nous créons notre `server.js` :

```js
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()

// Analyse du corps de requête pour y accéder via `req.body`
app.use(bodyParser.json())

// Mise en place de sessions pour y accéder via `req.session`
app.use(
  session({
    secret: 'cle-super-secrete',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  })
)

// Accès à `/api/login` en POST pour connecter l'utilisateur et l'ajouter à `req.session.authUser`
app.post('/api/login', function (req, res) {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ error: 'Mauvaise authentification' })
})

// Accès à `/api/logout` en POST pour déconnecter l'utilisateur et le retirer de `req.session`
app.post('/api/logout', function (req, res) {
  delete req.session.authUser
  res.json({ ok: true })
})

// Nous instancions Nuxt.js avec les options
const isProd = process.env.NODE_ENV === 'production'
const nuxt = new Nuxt({ dev: !isProd })
// Pas de build en production
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)
app.listen(3000)
console.log('Le serveur écoute sur http://localhost:3000')
```

Et nous modifions nos scripts dans `package.json` :

```json
// ...
"scripts": {
  "dev": "node server.js",
  "build": "nuxt build",
  "start": "cross-env NODE_ENV=production node server.js"
}
// ...
```

Remarque: vous devrez exécuter `npm install --save-dev cross-env` afin de faire fonctionner l'exemple précédent. Si vous n'êtes pas en train de développer sur Windows, vous pouvez laisser cross-env en dehors de votre script `start` et définir `NODE_ENV` directement.

## Utilisation du store

Nous avons besoin d'un état global pour informer notre application si l'utilisateur reste **connecté entre les pages**.

Pour laisser Nuxt.js utiliser Vuex, nous créons un fichier `store/index.js`:

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Polyfill pour `window.fetch()`
require('whatwg-fetch')

const store = new Vuex.Store({
  state: () => ({
    authUser: null
  }),

  mutations: {
    SET_USER(state, user) {
      state.authUser = user
    }
  },

  actions: {
    // ...
  }
})

export default store
```

1. Nous importons `Vue` et `Vuex` (inclus dans Nuxt.js) et nous indiquons à Vue d'utiliser Vuex afin de pouvoir utiliser `$store` dans nos composants.
2. Nous utilisons `require('whatwg-fetch')` afin d'obtenir un polyfill pour la méthode `fetch()` pour tous les navigateurs (consultez le [dépôt fetch](https://github.com/github/fetch)).
3. Nous créons notre mutation `SET_USER` qui va instancier `state.authUser` avec l'utilisateur connecté.
4. Nous exportons notre instance du _store_ vers Nuxt.js afin qu'il puisse l'injecter dans notre application principale.

### Fonction nuxtServerInit()

Nuxt.js appellera une action spécifique nommée `nuxtServerInit` avec le contexte comme argument. Ainsi, lorsque l'application sera chargée, le store sera déjà rempli avec certaines données que nous pouvons obtenir du serveur.

Dans notre `store/index.js`, nous pouvons ajouter l'action `nuxtServerInit` :

```js
nuxtServerInit ({ commit }, { req }) {
  if (req.session && req.session.authUser) {
    commit('SET_USER', req.session.authUser)
  }
}
```

Pour rendre la méthode de données asynchrone, Nuxt.js vous offre différents moyens, choisissez celui avec lequel vous êtes le plus à l'aise :

1. Retourner une `Promise`, Nuxt.js attendra la résolution de la promesse avant d'afficher le composant.
2. En utilisant [`async` / `await`](https://github.com/lukehoban/ecmascript-asyncawait) ([en savoir plus](https://zeit.co/blog/async-and-await)).

### L'action login()

Nous ajoutons une action `login` qui sera appelée à partir de nos composants de pages pour connecter l'utilisateur :

```js
login ({ commit }, { username, password }) {
  return fetch('/api/login', {
    // Envoie les cookies client au serveur
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  .then((res) => {
    if (res.status === 401) {
      throw new Error('Mauvaise authentification')
    } else {
      return res.json()
    }
  })
  .then((authUser) => {
    commit('SET_USER', authUser)
  })
}
```

### La méthode logout()

```js
logout ({ commit }) {
  return fetch('/api/logout', {
    // Envoie les cookies au serveur
    credentials: 'same-origin',
    method: 'POST'
  })
  .then(() => {
    commit('SET_USER', null)
  })
}
```

## Composants de pages

Ensuite, nous pouvons utiliser `$store.state.authUser` dans nos composants de pages pour vérifier si l'utilisateur est connecté ou non dans notre application.

### Rediriger l'utilisateur s'il n'est pas connecté

Ajoutons une route `/secret` dont le contenu ne peut être vu que par un utilisateur connecté :

```html
<template>
  <div>
    <h1>Page super secrète</h1>
    <router-link to="/">Retour à l'accueil</router-link>
  </div>
</template>

<script>
  export default {
    // Nous utilisons`fetch()` car nous n'avons pas besoin d'associer les données à ce composant
    fetch({ store, redirect }) {
      if (!store.state.authUser) {
        return redirect('/')
      }
    }
  }
</script>
```

Nous pouvons voir dans la méthode `fetch` que nous appelons `redirect('/')` lorsque notre utilisateur n'est pas connecté.
