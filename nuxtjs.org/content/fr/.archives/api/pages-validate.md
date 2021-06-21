---
title: 'API : la méthode validate'
description: Nuxt.js vous permet de définir une méthode de validation dans votre composant de route dynamique.
menu: validate
category: pages
position: 31
---

> Nuxt.js vous permet de définir une méthode de validation dans votre composant de route dynamique.

- **Type:** `Function` ou `Async Function`

```js
validate({ params, query, store }) {
  return true // si le paramètre est valide
  return false // nous arrêtons Nuxt.js pour faire le rendu de la route et afficher la page d'erreur
}
```

```js
async validate({ params, query, store }) {
  // await operations (EN)
  return true // si le paramètre est valide
  return false // va stopper le process de rendering de Nuxt.js et afficher la page d'erreur
}
```

Vous pouvez aussi retourner une promesse:

```js
validate({ params, query, store }) {
  return new Promise((resolve) => setTimeout(() => resolve()))
}
```

Nuxt.js vous permet de définir une méthode de validation dans votre composant de route dynamique (dans cet exemple : `pages/users/_id.vue`).

Si la méthode de validation retourne `false`, Nuxt.js chargera automatiquement la page d'erreur 404.

```js
export default {
  validate({ params }) {
    // Doit être un nombre
    return /^\d+$/.test(params.id)
  }
}
```

Vous pouvez aussi vérifier les données dans votre [store](/guide/vuex-store) (remplies au préalable avec l'action [`nuxtServerInit`](/guide/vuex-store#the-nuxtserverinit-action)) :

```js
export default {
  validate({ params, store }) {
    // Vérifier si `params.id` est une catégorie existante
    return store.state.categories.some(category => category.id === params.id)
  }
}
```

Vous pouvez aussi émettre une erreur dans la fonction directement pour afficher la page d'erreur :

```js
export default {
  async validate({ params, store }) {
    // Émet une erreur 500 (internal server error) avec un message
    throw new Error('En construction!')
  }
}
```
