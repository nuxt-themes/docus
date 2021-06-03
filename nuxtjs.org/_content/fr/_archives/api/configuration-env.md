---
title: 'API: La propriété env'
description: Partager les variables d'environement entre client et serveur.
menu: env
category: configuration
position: 108
---

- Type: `Object`

> Nuxt.js nous laisse creer des variable d'environement côté client, pouvant être partagées également côté serveur.

La propriété env défini les variables d'environement que l'on a côté client. Elles peuvent être assignée en parametrant les variables côté serveur, celle du [module dotenv](https://github.com/nuxt-community/dotenv-module) ou similaires.

**Lire `process.env` et `process.env == {}` ci dessous pour une meilleure compréhension.**

Exemple (`nuxt.config.js`):

```js
export default {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

Cela nous permet de créer une propriété `baseUrl` qui sera égale à la valeur de `BASE_URL`, la variable d'environement côté serveur si définie et accessible. Sinon, `baseUrl` côté client sera égale à `'http://localhost:3000'`. Par conséquent la variable côté serveur BASE_URL est copiée au côté client dans la propriété `env` par l'intermédiaire de `nuxt.config.js`. Autrement, la valeur sera (http://localhost:3000).

à partir de là, Nous pouvons accéder à `baseUrl` de 2 manières:

1. Via `process.env.baseUrl`.
2. Via `context.env.baseUrl`, voir [context API](/api/context).

## process.env == {}

Vous pouvez utiliser la propriété `env` pour donner un jeton public par exemple.

Pour l'exemple ci-dessus, nous pouvons l'utiliser pour configurer [axios](https://github.com/mzabriskie/axios).

`plugins / axios.js`:

```js
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

Ensuite, dans vos pages, vous pouvez importer axios comme ceci: `import axios from '~/plugins/axios'`

## Injection automatique de variables d'environnement

Si vous définissez des variables d'environnement commençant par `NUXT_ENV_` dans la phase de compilation (nuxt build). Par exemple, `NUXT_ENV_COOL_WORD=freezing nuxt build`, elles seront automatiquement injectées dans la propriété d'environnement process.env Soyez conscient qu'elles auront potentiellement la priorité sur les variables définies dans votre `nuxt.config.js` avec le même nom.

## process.env == {}

Notez que Nuxt utilise `definePlugin` de webpack pour définir la variable d'environnement. Cela signifie que le `process` ou`process.env` réel de Node.js n'est ni disponible ni défini. Chacune des propriétés `env` définies dans nuxt.config.js est mappée individuellement en`process.env.xxxx` et convertie pendant la compilation.

Cela signifie que `console.log(process.env)` affichera `{}` mais `console.log(process.env.your_var)` affichera toujours votre valeur. Lorsque webpack compile votre code, il remplace toutes les instances de `process.env.your_var` par la valeur que vous avez définie. c'est-à-dire: `env.test = 'testing123'`. Si vous utilisez quelque part `process.env.test` dans votre code, il est en fait traduit par 'testing123'.

avant

```js
if (process.env.test == 'testing123')
```

après

```js
if ('testing123' == 'testing123')
```

## serverMiddleware

Comme le [serverMiddleware](/api/configuration-servermiddleware) est découplé de la version principale de Nuxt, les variables `env` définies dans`nuxt.config.js` n'y sont pas disponibles.
