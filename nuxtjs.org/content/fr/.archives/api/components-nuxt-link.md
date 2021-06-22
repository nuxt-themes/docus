---
title: 'API: Le composant <nuxt-link>'
description: Reliez les pages entre elles avec nuxt-link.
menu: nuxt-link
category: components
position: 43
---

> Ce composant est utilisé pour fournir une navigation entre les composants de page et améliorer les performances grâce à la prélecture intelligente.

Le composant `<nuxt-link>` est un élément essentiel de Nuxt. Il **doit être utiliser pour naviguer** à travers l'application, similaire au composant `<router-link>` d'une application traditionnelle Vue.

En effet, `<nuxt-link>` étend [`<router-link>`](https://router.vuejs.org/api/#router-link). Cela signifie qu'il prend les mêmes propriétés et peut être utilisé de la même manière. Lisez la [documentation de Vue Router](https://router.vuejs.org/api/#router-link) pour plus d'informations.

Exemple (`pages/index.vue`):

```html
<template>
  <div>
    <h1>Home page</h1>
    <nuxt-link to="/about"
      >About (internal link that belongs to the Nuxt App)</nuxt-link
    >
    <a href="https://nuxtjs.org">External Link to another page</a>
  </div>
</template>
```

**Alias:** `<n-link>`, `<NuxtLink>`, et `<NLink>`

> Ajoutés avec Nuxt.js v2.4.0

Pour améliorer la réactivité de vos applications Nuxt.js, lorsque le lien sera affiché dans la fenêtre, Nuxt.js récupèrera automatiquement le _code fractionnée_ de la page. Cette fonctionnalité est inspirée de [quicklink.js](https://github.com/GoogleChromeLabs/quicklink) par Google Chrome Labs.

Pour désactiver la prélecture de la page liée, vous pouvez utiliser la propriété `no-prefetch`. Depuis Nuxt.js v2.10.0, vous pouvez également modifier la propriété `prefetch` à `false` :

```html
<n-link to="/about" no-prefetch>About page not pre-fetched</n-link>
<n-link to="/about" :prefetch="false">About page not pre-fetched</n-link>
```

Vous pouvez configurer globalement ce comportement avec [router.prefetchLinks](/api/configuration-router#prefetchlinks).

Depuis Nuxt.js v2.10.0, si vous avez définie globalement [router.prefetchLinks](/api/configuration-router#prefetchlinks) à `false` mais que vous souhaitez pré-extraire un lien spécifique, vous pouvez utiliser la propriété`prefetch` :

```html
<n-link to="/about" prefetch>About page pre-fetched</n-link>
```

La propriété `prefetched-class` est également disponible pour personnaliser la classe ajoutée lorsque le code fractionnée de la page a été pré-lue. Assurez-vous de configurer cette fonctionnalité globalement avec [router.linkPrefetchedClass](/api/configuration-router#linkprefetchedclass).
