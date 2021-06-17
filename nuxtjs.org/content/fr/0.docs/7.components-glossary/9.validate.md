---
title: La méthode validate
description: Nuxt.js vous permet de définir une méthode de validation à l'intérieur de votre composant de routes dynamiques.
menu: La méthode validate
category: components-glossary
position: 9
---

> Nuxt.js vous permet de définir une méthode de validation à l'intérieur de votre composant de routes dynamiques.

- **Type:** `Function` ou `Async Function`

`validate` est appelé avant chaque navigation sur une nouvelle route. Il sera appelé une fois côté serveur: lors de la première requête à l'application Nuxt et côté client: lors de la navigation sur d'autres routes . Cette méthode prend l'objet [`context`](/docs/2.x/internals-glossary/context) en tant qu'argument.

```js
validate({ params, query, store }) {
  return true // si les paramètres sont valides
  return false // ceci va arrêter Nuxt.js dans son render de la route et afficher la page d'erreur
}
```

```js
async validate({ params, query, store }) {
  // opérations asynchrone à attendre
  return true // si les paramètres sont valides
  return false // ceci va arrêter Nuxt.js dans son render de la route et afficher la page d'erreur
}
```

On peut aussi renvoyer des promesses:

```js
validate({ params, query, store }) {
  return new Promise((resolve) => setTimeout(() => resolve()))
}
```

Nuxt.js vous permet de définir une méthode de validation à l'intérieur de votre composant de routes dynamiques (dans notre exemple: `pages/users/_id.vue`).

Si la méthode de validation ne retourne pas `true`, Nuxt.js va automatiquement charger la page d'erreur 404.

```js
export default {
  validate({ params }) {
    // Doit être un nombre
    return /^\d+$/.test(params.id)
  }
}
```

On peut aussi vérifier de la data dans notre [store](/docs/2.x/directory-structure/store) (remplie par exemple par [`nuxtServerInit`](/docs/2.x/directory-structure/store#the-nuxtserverinit-action) avant l'action):

```js
export default {
  validate({ params, store }) {
    // On vérifie si `params.id` est une catégorie existante
    return store.state.categories.some(category => category.id === params.id)
  }
}
```

On peut aussi renvoyer des erreurs attendues (ou pas) durant l'exécution de la fonction de validation:

```js
export default {
  async validate({ params, store }) {
    // Renvoie une erreur interne serveur 500 avec un message personnalisé
    throw new Error('En cours de construction !')
  }
}
```
