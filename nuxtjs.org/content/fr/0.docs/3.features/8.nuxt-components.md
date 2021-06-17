---
title: Composants Nuxt
description: Nuxt.js arrive avec quelques composants importants, ceux-ci nous seront utiles pour construire notre application.
position: 9
category: features
csb_link_nuxt_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/09_components_nuxt-link?fontsize=14&hidenavigation=1&theme=dark
csb_link_nuxt: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/09_components_nuxt?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Quel composant est utilisé lorsque nous souhaitons afficher les composants page ?
    answers:
      - '<Nuxt>'
      - '<Page>'
      - '<Views>'
    correctAnswer: '<Nuxt>'
  - question: 'Le composant <Nuxt> peut être utilisé dans :'
    answers:
      - les composants
      - les pages
      - les layouts
    correctAnswer: les layouts
  - question: Quel composant est utilisé lorsque nous souhaitons afficher les composants enfants dans une route imbriquée ?
    answers:
      - '<Nuxt>'
      - '<NuxtChild>'
      - '<Children>'
    correctAnswer: '<NuxtChild>'
  - question: Où faut-il insérer le composant `<NuxtChild>` ?
    answers:
      - pages/child.vue
      - pages/parent.vue
      - layouts/parent.vue
    correctAnswer: pages/parent.vue
  - question: '`keep alive` peut être utilisé dans'
    answers:
      - 'le composant <Nuxt> seulement'
      - 'les composants <Nuxt> et <NuxtChild>'
      - 'le composant <NuxtChild> seulement'
    correctAnswer: 'les composants <Nuxt> et <NuxtChild>'
  - question: Quel composant faut-il utiliser pour lier des pages internes ?
    answers:
      - '<NuxtLink>'
      - '<RouterLink>'
      - '<a>'
    correctAnswer: '<NuxtLink>'
  - question: 'Comment se fait le lien de la page À propos en utilisant un <NuxtLink> ?'
    answers:
      - to="/about"
      - href="/about"
      - link="/about"
    correctAnswer: to="/about"
  - question: Quel paramètre faut-il utiliser pour désactiver le prefetching sur certaines pages ?
    answers:
      - no-prefetch
      - :prefetch="false"
      - no-prefetch et :prefetch="false"
    correctAnswer: no-prefetch et :prefetch="false"
  - question: Quelle est la classe (utilisée par défaut) qui nous permet d'ajouter des styles à des liens actifs ?
    answers:
      - nuxt-link-active
      - link-active
      - router-link-active
    correctAnswer: nuxt-link-active
  - question: Quelle est la classe (utilisée par défaut) qui nous permet d'ajouter des styles à des liens actifs dans le cas d'une correspondance exacte ?
    answers:
      - nuxt-link-exact-active
      - link-exact-active
      - nuxt-exact-active-link
    correctAnswer: nuxt-link-exact-active
  - question: Dans Nuxt ≥ 2.9.0, quel composant faut-il utiliser pour que le composant ne soit render que du côté client ?
    answers:
      - '<client-only>'
      - '<no-ssr>'
      - '<client>'
    correctAnswer: '<client-only>'
---

Nuxt.js arrive avec quelques composants importants, ceux-ci nous seront utiles pour construire notre application. Les composants sont disponibles de manière globale, ce qui veut dire que nous n'avons pas besoin de les importer pour les utiliser.

Dans les paragraphes suivants, chacun de ces composants sera expliqué.

## Le composant Nuxt

Le composant `<Nuxt>` nous permet d'afficher les composants page. Basiquement, le composant est remplacé par les pages qui concordent avec la route montrée. Ainsi, il est important d'ajouter le composant `<Nuxt>` à nos layouts.

```html{}[layouts/default.vue]
<template>
  <div>
    <div>Ma barre de navigation</div>
    <Nuxt />
    <div>Mon pied de page</div>
  </div>
</template>
```

<base-alert>

Le composant `<Nuxt>` ne peut être utilisé que dans les [layouts](/docs/2.x/concepts/views#layouts).

</base-alert>

Le composant `<Nuxt>` peut prendre la propriété `nuxt-child-key`, cette dernière sera passée à `<RouterView>` afin que les transitions dans les pages dynamiques fonctionnent correctement.

Il y a 2 façons de gérer la propriété `key` de `<RouterView>`:

1. Utiliser la propriété `nuxt-child-key` sur notre composant `<Nuxt>`

```html{}[layouts/default.vue]
<template>
  <div>
    <Nuxt :nuxt-child-key="uneKey" />
  </div>
</template>
```

2. Ajouter l'option `key` dans les composants _page_ en tant que `string` ou `function`

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```

## Le composant NuxtChild

Ce composant est utilisé pour afficher les composants enfants dans une route imbriquée.

Exemple:

```
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

Cette arborescence de fichiers va générer les chemins suivants :

```js
;[
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~/pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```

Pour afficher le composant `child.vue`, il faut insérer le composant `<NuxtChild>` à l'intérieur de `pages/parent.vue`:

```html{}[pages/parent.vue]
<template>
  <div>
    <h1>Je suis la view parent</h1>
    <NuxtChild :foobar="123" />
  </div>
</template>
```

## keep-alive

Les composants `<Nuxt>` et `<NuxtChild/>` acceptent tous les deux `keep-alive` et `keep-alive-props.`

<base-alert type="info">

Pour en apprendre davantage sur `keep-alive` et `keep-alive-props`, se référer à la [documentation de Vue](https://vuejs.org/v2/api/#keep-alive).

</base-alert>

```html{}[layouts/default.vue]
<template>
  <div>
    <Nuxt keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- le code du haut sera converti dans le code suivant -->
<div>
  <keep-alive :exclude="['modal']">
    <RouterView />
  </keep-alive>
</div>
```

```html{}[pages/parent.vue]
<template>
  <div>
    <NuxtChild keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- le code du haut sera converti dans le code suivant -->
<div>
  <keep-alive :exclude="['modal']">
    <RouterView />
  </keep-alive>
</div>
```

Les composants `<NuxtChild>` peuvent aussi recevoir des propriétés comme n'importe quel composant standard de Vue.

```html
<template>
  <div>
    <NuxtChild :key="$route.params.id" />
  </div>
</template>
```

Pour voir un exemple, on peut regarder celui sur les [routes imbriquées](https://nuxtjs.org/examples/nested-routes).

<app-modal>
  <code-sandbox :src="csb_link_nuxt"></code-sandbox>
</app-modal>

## Le composant NuxtLink

Pour naviguer entre les pages de notre application, il faut utiliser le composant `<NuxtLink>`. Ce composant est inclus dans Nuxt.js et nous n'avons donc pas besoin de l'importer comme un composant standard. Son fonctionnement est le même qu'une balise HTML `<a>` a l'exception qu'au lieu d'utiliser un `href="/about"` il faut utiliser `to="/about"`. Si nous avons déjà utilisé `vue-router` par le passé, nous pouvons voir `<NuxtLink>` comme un équivalent à `<RouterLink>`.

Un simple lien vers la page `index.vue` dans notre répertoire `pages`:

```html
<template>
  <NuxtLink to="/">Page d'accueil</NuxtLink>
</template>
```

Le composant `<NuxtLink>` doit être utilisé pour tous les liens internes. Ce qui veut dire que tous les liens à l'intérieur de notre site doivent utiliser `<NuxtLink>`. La balise `<a>` doit être utilisée pour les liens externes (les sites web qui ne font pas partie de notre application).

```html
<template>
  <div>
    <h1>Page d'accueil</h1>
    <nuxt-link to="/about">
      À propos (lien interne à l'application Nuxt)
    </nuxt-link>
    <a href="https://nuxtjs.org">Lien externe vers une autre page</a>
  </div>
</template>
```

<base-alert type="info">

Si nous voulons en savoir plus sur `RouterLink`, se référer à la [documentation du Routeur Vue](https://router.vuejs.org/api/#router-link).

</base-alert>

<base-alert type="info">

`<NuxtLink>` est utilise le [préfétching intelligent](/docs/2.x/features/nuxt-components#the-nuxtlink-component) par défaut.

</base-alert>

## prefetchLinks

Nuxt.js fait du prefetching intelligent, il détecte si un lien est visible (soit dans le viewport, soit lors d'un défilement) et il prefetch le JavaScript pour ces pages pour qu'elles soient prêtes quand l'utilisateur clique sur le lien. Nuxt.js charge la ressource seulement quand le navigateur n'est pas occupé. Le prefetching n'a pas non plus lieu si l'utilisateur est hors-ligne ou qu'il est en connexion 2G.

### Désactiver le prefetching pour des liens spécifiques

Cependant, si notre page est lourde en JavaScript ou que nous avons beaucoup de pages différentes qui se retrouveraient à charger de nombreux scripts tiers, nous pouvons désactiver le prefetching sur certains de ces liens. Pour cela, nous pouvons utiliser la propriété `no-prefetch`. Depuis Nuxt.js v2.10.0, nous pouvons aussi définir la propriété `prefetch` à `false`.

```html
<NuxtLink to="/about" no-prefetch>Page à propos non pré-fetchée</NuxtLink>
<NuxtLink to="/about" :prefetch="false">Page à propos non pré-fetchée</NuxtLink>
```

### Désactiver le prefetching de manière globale

Pour désactiver le prefetching sur tous les liens, il faut passer `prefetchLinks` à `false`:

```js{}[nuxt.config.js]
export default {
  router: {
    prefetchLinks: false
  }
}
```

Depuis Nuxt.js v2.10.0, si nous avons passé `prefetchLinks` à `false` mais que nous souhaitons cependant prefetch un lien particulier, nous pouvons utiliser la propriété `prefetch`:

```html
<NuxtLink to="/about" prefetch>Page à propos pré-fetchée</NuxtLink>
```

## linkActiveClass

`linkActiveClass` marche de la même façon que la classe sur des liens actifs de `vue-router`. Si nous souhaitons montrer quels liens sont actifs, la seule chose que nous avons besoin de faire est de créer un peu de CSS pour la classe `nuxt-link-active`.

```css
.nuxt-link-active {
  color: red;
}
```

<base-alert>

Ce CSS peut être ajouté au composant de navigation, dans une page spécifique, dans un layout ou dans le fichier `main.css`.

</base-alert>

Si nous souhaitons changer le nom de cette classe par autre chose, nous pouvons modifier `linkActiveClass` dans la propriété `router` à l'intérieur du fichier `nuxt.config.js`.

```js
export default {
  router: {
    linkActiveClass: 'mon-super-lien-actif'
  }
}
```

<base-alert type="info">

Cette option est donnée directement à la propriété `linkActiveClass` du `vue-router`, plus d'informations [ici](https://router.vuejs.org/api/#active-class).

</base-alert>

## linkExactActiveClass

`linkExactActiveClass` marche exactement de la même façon que [`linkActiveClass`](#linkactiveclass) dans le cas d'une correspondance exacte de la route.

```css
.nuxt-link-exact-active {
  color: green;
}
```

La configuration dans le fichier `nuxt.config.js` se fait de la même façon.

```js{}[nuxt.config.js]
export default {
  router: {
    linkExactActiveClass: 'mon-lien-exact-actif'
  }
}
```

## linkPrefetchedClass

`linkPrefetchedClass` va nous permettre d'ajouter des styles pour tous les liens qui ont été prefetch. C'est pratique pour tester tous les liens qui ont été prefetch après avoir modifié un comportement. `linkPrefetchedClass` est désactivé par défaut. Si nous souhaitons l'activer, il faut ajouter la propriété dans le fichier `nuxt.config.js`.

```js{}[nuxt.config.js]
export default {
  router: {
    linkPrefetchedClass: 'lien-de-nuxt-prefetched'
  }
}
```

Il suffit par la suite d'ajouter les styles pour cette classe.

```css
.nuxt-link-prefetched {
  color: orangeRed;
}
```

<base-alert type="info">

Comme nous avons pu le voir avec `lien-de-nuxt-prefetched`, le nom de la classe est totalement arbitraire.

</base-alert>

<app-modal>
  <code-sandbox :src="csb_link_nuxt_link"></code-sandbox>
</app-modal>

## Le composant côté-client seulement

L'usage de ce composant force un composant a être render uniquement du côté client. Pour importer un composant seulement sur le client, il faut l'encapsuler dans un `client-only`.

```html{}[pages/example.vue]
<template>
  <div>
    <sidebar />
    <client-only placeholder="Chargement...">
      <!-- ce composant sera render seulement du côté client -->
      <comments></comments>
    </client-only>
  </div>
</template>
```

Utiliser un élément de substitution jusqu'à ce que le contenu du `<client-only />` ne soit monté sur le client.

```html{}[pages/example.vue]
<template>
  <div>
    <sidebar />
    <client-only>
      <!-- ce composant sera render seulement du côté client -->
      <comments></comments>

      <!-- indicateur de chargement, render du côté serveur -->
      <comments-placeholder slot="placeholder"></comments-placeholder>
    </client-only>
  </div>
</template>
```

<base-alert>

Depuis Nuxt.js > v2.9.0, il faut utiliser `<client-only>` au lieu de `<no-ssr>`.

</base-alert>

<quiz :questions="questions"></quiz>
