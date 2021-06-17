---
title: La propriété generate
description: Permet de configurer la génération de votre application web universelle en une application web statique.
menu: generate
category: configuration-glossary
position: 10
---

- Type: `Object`

> Permet de configurer la génération de votre application web universelle en une application web statique.

Lors de l'appel de `nuxt.generate()`, Nuxt.js va utiliser la configuration définie dans la propriété `generate`.

```js{}[nuxt.config.js]
export default {
  generate: {
    ...
  }
}
```

## cache

> Introduit avec la v2.14.0

- Type: `Object` ou `false`

Cette option est utilisée par `nuxt generate` avec la [cible statique](/docs/2.x/features/deployment-targets#static-hosting) pour éviter de re-build lorsque les fichiers traqués n'ont pas été modifiés.

Par défaut:

```js
{
  ignore: [
    '.nuxt', // buildDir
    'static', // dir.static
    'dist', // generate.dir
    'node_modules',
    '.**/*',
    '.*',
    'README.md'
  ]
}
```

Si on veut éviter de re-build lors d'un changement du fichier de configuration, il faut l'ajouter à la liste au travers de l'option `cache.ignore`:

```js{}[nuxt.config.js]
export default {
  generate: {
    cache: {
      ignore: ['renovate.json'] // ignore les changements appliqués à ce fichier
    }
  }
}
```

## concurrency

- Type: `Number`
- Par défaut: `500`

La génération des routes est concomitance, `generate.concurrency` spécifie le nombre de routes qui peuvent s'exécuter dans un seul thread.

## crawler

- Type: `boolean`
- Par défaut: true

Depuis Nuxt.js v2.13, un crawler s'occupera de trouver et de générer toutes les routes dynamiques en passant en revue tous les liens relatifs. Si l'on veut désactiver cette fonctionnalité, il suffit de passer la valeur à `false`.

```js
export default {
  generate: {
    crawler: false
  }
}
```

## dir

- Type: `String`
- Par défault: `'dist'`

Le nom du répertoire créé lors du build de l'application web en mode statique avec `nuxt generate` ou en mode SPA avec `nuxt build`.

## devtools

- Type: `boolean`
- Par défault: `false`

Permet de configurer si l'on est autorisé ou pas à inspecter les [vue-devtools](https://github.com/vuejs/vue-devtools).

Si c'est déjà activé dans le fichier `nuxt.config.js` ou ailleurs, les devtools seront activés, peut importe le flag.

## exclude

- Type: `Array`
  - Items: `String` ou `RegExp`

`exclude` accepte un tableau de chaînes de caractères ou des expressions régulières et s'occupe d'éviter de générer les routes qui match. Les routes seront toujours accessibles lorsque `generate.fallback` est utilisé.

En prenant cet exemple de structure:

```bash
-| pages/
---| index.vue
---| admin/
-----| about.vue
-----| index.vue
```

Par défaut, lors de l'exécution de `nuxt generate`, un fichier sera créé pour chaque route.

```bash
-| dist/
---| index.html
---| admin/
-----| about.html
-----| item.html
```

Losque dans `ignore`, on ajoute une expression régulière qui match toutes les routes, cela va empêcher la génération de ces routes.

```js{}[nuxt.config.js]
export default {
  generate: {
    exclude: [
      /^\/admin/ // un chemin qui commence par /admin
    ]
  }
}
```

```bash
-| dist/
---| index.html
```

On peut aussi exclure une route spécifique en passant une chaîne de caractères:

```js{}[nuxt.config.js]
export default {
  generate: {
    exclude: ['/ma-page-secrete']
  }
}
```

## fallback

- Type: `String` ou `Boolean`
- Par défault: `200.html`

```js{}[nuxt.config.js]
export default {
  generate: {
    fallback: '404.html'
  }
}
```

Fournit le chemin du fallback au fichier HTML. Cela devrait être définit en tant que page d'erreur, pour que toutes les routes inconnues soit render via Nuxt.js. Si la valeur n'est pas spécifiée ou est `falsy`, le fallback sera `200.html`. Si la valeur est à `true`, le fallback sera à `404.html`. Si l'on fournit une chaîne de caractères, elle sera utilisée à la place.

Lorsque notre application est une SPA, il est plus idiomatique d'utiliser une `200.html` vu que ce sera le seul fichier nécessaire car aucune autre route ne sera générée.

```js{}[nuxt.config.js]
fallback: false
```

Lorsque l'on travaille avec des pages générées de manière statique, il est recommandé d'utiliser une `404.html` en tant que page d'erreur et pour celles qui concordent avec les entrées dans [excludes](https://nuxtjs.org/api/configuration-generate#exclude) (autrement dit, les fichiers que l'on ne veut pas voir être générés en tant que pages statiques).

```js{}[nuxt.config.js]
fallback: true
```

Cependant, Nuxt.js permet de configurer n'importe quelle page si vous ne souhaitez pas utiliser les classiques `200.html` ou `404.html`, il suffit d'ajouter la chaîne de caractères souhaitée et de penser à faire la redirection sur cette page. Ce n'est bien sûr pas nécessaire et le mieux reste encore de rediriger vers des pages `200.html`/`404.html`.

```js{}[nuxt.config.js]
fallback: 'pageDeFallback.html'
```

_Note: De nombreux services (ex: Netlify) détectent une `404.html` automatiquement. Si on est en charge de la configuration de notre propre serveur web, il faudra consulter la documentation pour trouver comment définir une page d'erreur (et la passer à `404.html`)._

## interval

- Type: `Number`
- Par défault: `0`

L'intervalle entre 2 cycles de render, utile pour éviter de spam une API avec les appels de notre application web.

## minify

- **Déprécié !**
- Il faut utiliser [build.html.minify](/docs/2.x/configuration-glossary/configuration-build#htmlminify) à la place.

## routes

- Type: `Array`

<base-alert type="info">

Depuis Nuxt.js v2.13, un crawler est installé. Ce dernier se charge de trouver tous les liens et de générer les routes correspondantes lors d'un `nuxt generate`.

SI on a détaché des pages (comme des pages secrètes) mais que l'on veut que celles-ci soit aussi générées, on peut utiliser la propriété `generate.routes`.

</base-alert>

<base-alert>

Les routes dynamiques seront ignorés par la commande `generate` lors de l'utilisation d'une version de Nuxt.js inférieure à `2.12`.

</base-alert>

Exemple:

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

Seule la route `/` sera générée par Nuxt.js.

Si l'on souhaite que Nuxt.js génère des routes avec des paramètres dynamiques, on a besoin de définir la propriété `generate.routes` à un tableau de routes dynamiques.

On ajoute les routes pour `/users/:id`:

```js{}[nuxt.config.js]
export default {
  generate: {
    routes: ['/users/1', '/users/2', '/users/3']
  }
}
```

Ensuite on lance `nuxt generate`:

```bash
[nuxt] Generating...
[...]
nuxt:render Rendering url / +154ms
nuxt:render Rendering url /users/1 +12ms
nuxt:render Rendering url /users/2 +33ms
nuxt:render Rendering url /users/3 +7ms
nuxt:generate Generate file: /index.html +21ms
nuxt:generate Generate file: /users/1/index.html +31ms
nuxt:generate Generate file: /users/2/index.html +15ms
nuxt:generate Generate file: /users/3/index.html +23ms
nuxt:generate HTML Files generated in 7.6s +6ms
[nuxt] Generate done
```

Bien, mais que se passe-t-il si on a des **paramètres dynamiques** ?

1. On peut utiliser une `fonction` qui nous retournera une `Promesse`.
2. On peut utiliser une `fonction` avec un `callback(erreur, parametres)`.

### Une fonction qui retourne une Promesse

```js{}[nuxt.config.js]
import axios from 'axios'

export default {
  generate: {
    routes() {
      return axios.get('https://mon-api/users').then(res => {
        return res.data.map(user => {
          return '/users/' + user.id
        })
      })
    }
  }
}
```

### Fonction avec un callback

```js{}[nuxt.config.js]
import axios from 'axios'

export default {
  generate: {
    routes(callback) {
      axios
        .get('https://mon-api/users')
        .then(res => {
          const routes = res.data.map(user => {
            return '/users/' + user.id
          })
          callback(null, routes)
        })
        .catch(callback)
    }
  }
}
```

### Accélérer la génération des routes dynamiques avec `payload`

Dans l'exemple précédent, nous utilisons `user.id` à partir du serveur pour générer les routes mais on jette le reste de la data. En général, on aura besoin de le récupérer de nouveau à l'intérieur de `/users/_id.vue`. Même si on peut faire cela, on aura certainement besoin de passer la valeur de `generate.interval` à queqlue chose comme `100` pour éviter de spam le serveur avec nos appels. Parce que cela va augmenter le temps que prend le script de génération, il serait préférable de passer l'objet `user` en entier dans le contexte de `_id.vue`. Nous pouvons faire cela en modifiant le code au dessus par:

```js{}[nuxt.config.js]
import axios from 'axios'

export default {
  generate: {
    routes() {
      return axios.get('https://mon-api/users').then(res => {
        return res.data.map(user => {
          return {
            route: '/users/' + user.id,
            payload: user
          }
        })
      })
    }
  }
}
```

Nous pouvons maintenant accéder à `payload` à partir de `/users/_id.vue` commme ceci:

```js
async asyncData ({ params, error, payload }) {
  if (payload) return { user: payload }
  else return { user: await backend.fetchUser(params.id) }
}
```

## subFolders

- Type: `Boolean`
- Par défault: `true`

Par défaut, lorsqu'on lance un `nuxt generate`, Nuxt.js va créer un répertoire pour chaque route et servir un fichier `index.html`.

Exemple:

```bash
-| dist/
---| index.html
---| about/
-----| index.html
---| products/
-----| item/
-------| index.html
```

Lorsque l'on passe la valeur à `false`, les fichiers HTML seront générés d'après le chemin de la route:

```js{}[nuxt.config.js]
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
