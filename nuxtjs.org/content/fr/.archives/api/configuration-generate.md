---
title: 'API : La propriété generate'
description: Configure la génération de votre application web universelle vers une application web statique.
menu: generate
category: configuration
position: 110
---

- Type : `Object`

> Configure la génération de votre application web universelle vers une application web statique.

Quand vous lancez `nuxt generate` ou appelez `nuxt.generate()`, Nuxt.js utilisera la configuration définie dans la propriété `generate`.

nuxt.config.js

```js
export default {
  generate: {
    ...
  }
}
```

## dir

- Type : `String`
- Par défaut : `'dist'`

Nom du répertoire créé par `nuxt generate`.

## devtools

- Type: `boolean`
- Par défaut: `false`

Configurer pour rendre l'inspection de [vue-devtools](https://github.com/vuejs/vue-devtools).

Si vous l'avez déjà activé via `nuxt.config.js` ou autrement, devtools est activé indépendamment de l'indicateur.

## fallback

- Type: `String` or `Boolean`
- Par défaut: `'200.html'`

Le chemin vers l'appel SPA. Ce fichier peut être utilisé lors de déploiements de sites générés vers un hébergement statique. Il revient au `mode: 'spa'` lorsqu'un chemin n'est pas généré.

## interval

- Type : `Number`
- Par défaut : `0`

Interval entre 2 rendus pour éviter d'inonder les appels d'API effectués par une API potentielle de l'application web.

## minify

- **Déprécié!**
- Utiliser [build.html.minify](/api/configuration-build#html-minify) à la place

## routes

- Type : `Array`

Les [routes dynamiques](/guide/routing#routes-dynamiques) sont ignorées par la commande `generate`.

Exemple :

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

Seulement la route `/` sera générée par Nuxt.js.

Si vous voulez que Nuxt.js génère les routes avec des paramètres dynamiques, vous allez devoir définir un tableau de routes dynamiques.

Nous ajoutons les routes pour `/utilisateurs/:id` dans `nuxt.config.js` :

```js
export default {
  generate: {
    routes: ['/utilisateurs/1', '/utilisateurs/2', '/utilisateurs/3']
  }
}
```

Puis nous lançons `nuxt generate` :

```bash
[nuxt] Generating...
[...]
nuxt:render Rendering url / +154ms
nuxt:render Rendering url /utilisateurs/1 +12ms
nuxt:render Rendering url /utilisateurs/2 +33ms
nuxt:render Rendering url /utilisateurs/3 +7ms
nuxt:generate Generate file: /index.html +21ms
nuxt:generate Generate file: /utilisateurs/1/index.html +31ms
nuxt:generate Generate file: /utilisateurs/2/index.html +15ms
nuxt:generate Generate file: /utilisateurs/3/index.html +23ms
nuxt:generate HTML Files generated in 7.6s +6ms
[nuxt] Generate done
```

Génial, mais que se passe t-il si nous avons des **paramètres dynamiques** ?

1. Utiliser une `Function` qui retourne une `Promise`.
2. Utiliser une `Function` avec une `callback(err, params)`.

### Fonction qui retourne une promesse

`nuxt.config.js`

```js
import axios from 'axios'

export default {
  generate: {
    routes() {
      return axios.get('https://mon-api/utilisateurs').then(res => {
        return res.data.map(user => {
          return '/utilisateurs/' + user.id
        })
      })
    }
  }
}
```

### Fonction avec une fonction de rappel

`nuxt.config.js`

```js
import axios from 'axios'

export default {
  generate: {
    routes(callback) {
      axios
        .get('https://mon-api/utilisateurs')
        .then(res => {
          const routes = res.data.map(user => {
            return '/utilisateurs/' + user.id
          })
          callback(null, routes)
        })
        .catch(callback)
    }
  }
}
```

### Augmenter la vitesse de génération d'une route dynamique avec `payload`

Dans l'exemple ci-dessus, nous avons utilisé `user.id` depuis le serveur pour générer les routes mais jeter le reste des données. Typiquement, nous avons besoin de les récupérer de nouveau depuis `/utilisateurs/_id.vue`. Pendant que nous faisons cela, nous allons probablement avoir besoin de définir `generate.interval` avec quelque chose comme `100` pour ne pas inonder le serveur avec des appels. Parce que cela va augmenter le temps de génération du script, il serait préférable de passer avec l'objet `user` le contexte dans `_id.vue`. Nous pouvons faire cela en modifiant le code ci-dessus pour celui-ci :

`nuxt.config.js`

```js
import axios from 'axios'

export default {
  generate: {
    routes() {
      return axios.get('https://mon-api/utilisateurs').then(res => {
        return res.data.map(user => {
          return {
            route: '/utilisateurs/' + user.id,
            payload: user
          }
        })
      })
    }
  }
}
```

Maintenant nous pouvons accéder à `payload` depuis `/utilisateurs/_id.vue` comme ceci :

```js
async asyncData ({ params, error, payload }) {
  if (payload) return { user: payload }
  else return { user: await backend.fetchUser(params.id) }
}
```

## subFolders

- Type : `Boolean`
- Par défaut : `true`

Par défaut, lancer `nuxt generate` va créer un répertoire pour chaque route et servir un fichier `index.html` file.

Exemple :

```bash
-| dist/
---| index.html
---| about/
-----| index.html
---| products/
-----| item/
-------| index.html
```

Quand il est mis à `false`, les fichier HTML seront générés en accord avec les chemins de routes :

nuxt.config.js

```js
export default {
  generate: {
    subFolders: false
  }
}
```

```bash
-| dist/
---| index.html
---| about.html
---| products/
-----| item.html
```

_Note : cette option peut être utile en utilisant [Netlify](https://netlify.com) ou n'importe quel hébergement utilisant des alternatives HTML._

## concurrence

- Type: `Number`
- Default: `500`

La génération de routes est concurrente, `generate.concurrency` spécifie le nombre de routes qui peuvent être exécuté par un thread.
