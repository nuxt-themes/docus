---
title: Données asynchrones
description: Vous voudriez peut-être récupérer des données et faire le rendu côté serveur. Nuxt.js ajoute une méthode `asyncData` pour vous permettre de gérer les opérations asynchrones avant de définir les données du composant.
category: getting-started
position: 106
---

> Vous voudriez peut-être récupérer des données et faire leur rendu côté serveur. Nuxt.js ajoute une méthode `asyncData` pour vous permettre de gérer les opérations asynchrones avant d'initialiser le composant.

<div>
  <a href="https://vueschool.io/courses/async-data-with-nuxtjs?friend=nuxt" target="_blank" class="Promote">
    <img src="/async-data-with-nuxtjs.png" srcset="/async-data-with-nuxtjs-2x.png 2x" alt="Données asynchrones par vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Données asynchrones avec Nuxt.js</h4>
      <p class="Promote__Content__Description">Apprendre comment gérer les données asynchrones avec Nuxt.js.</p>
      <p class="Promote__Content__Signature">Cours en vidéo réalisés par VueSchool pour aider au développement de Nuxt.js.</p>
    </div>
  </a>
</div>

## La méthode asyncData

Parfois vous souhaitez simplement récupérer des données et faire le rendu côté serveur sans utiliser de store. `asyncData` est appelé avant chaque chargement du composant **page**. Il sera appelé côté serveur une seule fois (au premier appel à l'application Nuxt) et côté client lors de la navigation vers la route correspondante. Cette méthode reçoit [le contexte](/api/context) comme premier argument, vous pouvez l'utiliser pour récupérer différentes données et Nuxt.js les fusionnera avec les données du composant.

Nuxt.js fusionnera automatiquement l'objet retourné avec les données du composant.

<div class="Alert Alert--orange">

Vous **n'**avez **PAS** accès à l'instance du composant via `this` au sein de `asyncData` parce que la fonction est appelée **avant d'initier** le composant.

</div>

Nuxt.js vous propose différentes façons d'utiliser `asyncData`. Choisissez celle avec laquelle vous êtes le plus à l'aise :

1. Retourner une `Promise`. Nuxt.js attendra que la promesse soit résolue avant de faire le rendu du composant.
2. En utilisant [async/await](https://github.com/lukehoban/ecmascript-asyncawait) ([en savoir plus](https://zeit.co/blog/async-and-await))

<div class="Alert Alert--grey">

Nous utilisons [axios](https://github.com/mzabriskie/axios) pour faire des requêtes HTTP isomorphiques, nous recommandons <strong>fortement</strong> d'utiliser notre [module axios](https://axios.nuxtjs.org/) pour vos projets Nuxt.

</div>

### Retourner une promesse

```js
export default {
  asyncData({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`).then(res => {
      return { title: res.data.title }
    })
  }
}
```

### Utiliser async/await

```js
export default {
  async asyncData({ params }) {
    const { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

### Afficher les données

Le résultat de `asyncData` sera **fusionné** avec les données. Vous pouvez afficher les données au sein du template comme habituellement :

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## Le contexte

Pour voir la liste des attributs disponibles dans `context`, jeter un œil à [la partie Essentielle de l'API pour `context`](/api/context).

### Utiliser les objets `req`/`res`

Lorsque `asyncData` est appelé du côté serveur, vous avez accès aux objets `req` et `res` de la requête utilisateur.

```js
export default {
  async asyncData({ req, res }) {
    // Merci de vérifier en premier lieu si vous êtes du côté serveur
    // avant d'utiliser req et res
    if (process.server) {
      return { host: req.headers.host }
    }

    return {}
  }
}
```

### Accéder aux données des routes dynamiques

Vous pouvez utiliser le paramètre `context` afin d'accéder aux données des routes dynamiques. Par exemple, les données des routes dynamiques peuvent être accédées en utilisant le nom du fichier ou du dossier qui la configure. Si vous définissez un fichier nommé `_slug.vue` dans votre dossier `page`, vous pourrez accéder à sa valeur via `context.params.slug` :

```js
export default {
  async asyncData({ params }) {
    const slug = params.slug // en appelant /abc la valeur de slug sera "abc"
    return { slug }
  }
}
```

### Écouter les changements de query

La méthode `asyncData` **n'est pas appelée** par défaut lors du changement sur la chaine de requête. Si vous souhaitez changer ce comportement, par exemple quand vous construisez un composant de pagination, vous pouvez initialiser les paramètres qui devraient être écoutés avec la propriété `watchQuery` de votre composant de page. Consultez la page de [l'API `watchQuery`](/api/pages-watchquery) pour en savoir plus.

## Gestion des erreurs

Nuxt.js ajoute la méthode `error(params)` au `context`, que vous pouvez appeler pour afficher la page d'erreur. `params.statusCode` sera également utilisée pour faire le rendu avec le code de statut approprié côté serveur.

Exemple avec une `Promise` :

```js
export default {
  asyncData({ params, error }) {
    return axios
      .get(`https://my-api/posts/${params.id}`)
      .then(res => {
        return { title: res.data.title }
      })
      .catch(e => {
        error({ statusCode: 404, message: 'Billet non trouvé' })
      })
  }
}
```

Pour personnaliser la page d'erreur, jeter un œil à [Mises en page de la section Vues](/guide/views#mises-en-page).
