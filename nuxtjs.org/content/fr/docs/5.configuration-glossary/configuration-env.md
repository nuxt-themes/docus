---
title: La propriété env
description: Permet de partager des variables d'environnement entre le client et le serveur.
menu: env
category: configuration-glossary
position: 8
---

- Type: `Object`

> Nuxt.js nous permet de créer des variables d'environnement côté client et de les partager aussi côté serveur.

La propriété `env` définit les variables d'environnement qui devraient être disponibles côté client. Elles peuvent être assignées en utilisant les variables d'environnement côté serveur. Pour plus d'informations, voir le [module dotenv](https://github.com/nuxt-community/dotenv-module).

**Faites attention de lire à propos de `process.env` et `process.env == {}` ci-dessous pour un meilleur débogage.**

```js{}[nuxt.config.js]
export default {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

Cela nous permet de créer une propriété `baseUrl` qui sera égale à la variable d'environment côté serveur nommée `BASE_URL` si disponible/définie. Sinon, `baseUrl` côté client sera égale à `'http://localhost:3000'`. La variable `BASE_URL` côté serveur sera ainsi copiée côté client via la propriété `env` du fichier `nuxt.config.js`. En dernier recours, la valeur sera égale à `'http://localhost:3000'`.

Ensuite, on peut avoir accès à la variable `baseUrl` de 2 façons:

1. Via `process.env.baseUrl`.
2. Via `context.env.baseUrl`, voir l'[API context](/docs/2.x/internals-glossary/context).

On peut par exemple, utiliser la propriété `env` pour donner un token public.

Pour l'exemple au dessus, on peut l'utiliser pour configurer [axios](https://github.com/mzabriskie/axios).

```js{}[plugins/axios.js]
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

Ensuite, dans nos pages, on peut import axios ainsi: `import axios from '~/plugins/axios'`.

## Injection automatique de variables d'environnement

Si on définit des variables d'environnement commençant par un `NUXT_ENV_` lors de la phase de build (ex: `NUXT_ENV_COOL_WORD=freezing nuxt build`), elles seront automatiquement injectées dans le processus de l'environnement. Attention cependant à ne pas oublier que ces variables peuvent écraser des variables du même nom précédemment définies dans le fichier `nuxt.config.js`.

## process.env == {}

Il faut savoir que Nuxt.js utilise `definePlugin` de Webpack pour définir les variables d'environnement. Cela veut dire que les `process` ou `process.env` de Node.js ne sont ni disponibles ni définis. Chaque propriété d'`env` définie dans `nuxt.config.js` est individuellement mappée à un `process.env.xxxx` et convertie durant la compilation.

Cela veut dire que `console.log(process.env)` va renvoyer `{}` mais que `console.log(process.env.notre_variable)` va tout de même renvoyer notre valeur. Lorsque Webpack compile notre code, il remplace toutes les instances de `process.env.your_variable` par la valeur qui lui est attribuée.

Exemple: `env.test = 'testing123'`. Si on utilise `process.env.test` quelque part dans notre code, cela sera traduit en `'testing123'`.

avant

```js
if (process.env.test == 'testing123')
```

après

```js
if ('testing123' == 'testing123')
```

## serverMiddleware

Comme le [serverMiddleware](/docs/2.x/configuration-glossary/configuration-servermiddleware) est découplé du build principal de Nuxt.js, les variables `env` définies dans le fichier `nuxt.config.js` n'y seront pas disponibles.
