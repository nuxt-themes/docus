---
title: Routage
description: La plupart des sites Web ont plus d'une page. Par exemple, une page d'accueil, une page à propos, une page de contact, etc. Pour afficher ces pages, nous avons besoin d'un routeur.
position: 2
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/02_routing?fontsize=14&hidenavigation=1&theme=dark
---

## Routes automatiques

La plupart des sites Web possèdent plus d'une page (comme une page d'accueil, une page à propos, une page de contact, etc.). Pour afficher ces pages, nous avons besoin d'un routeur. C'est là qu'intervient `vue-router`.

Lorsque nous travaillons avec Vue, nous devons configurer un fichier de configuration (comme `router.js`) et y ajouter manuellement toutes nos routes. Nuxt.js génère automatiquement la configuration `vue-router` pour nous, en fonction des fichiers Vue fournis dans le répertoire `pages`.

Cela signifie que nous n'avons plus jamais besoin d'écrire une configuration de routeur ! Nuxt.js nous offre également le découpage dynamique de code pour toutes nos routes.

En d'autres termes, tout ce que nous avons à faire pour avoir un routage dans notre application est de créer des fichiers `.vue` dans le répertoire `pages`.

<base-alert type="next">

En savoir plus sur le [Routage](/docs/2.x/features/file-system-routing)

</base-alert>

## Navigation

Pour naviguer entre les pages de notre application, nous devons utiliser le composant [NuxtLink](/docs/2.x/features/nuxt-components#the-nuxtlink-component). Ce composant est inclus avec Nuxt.js et nous n'avons donc pas à l'importer comme on le fait avec d'autres composants.

Il est similaire à la balise HTML `<a>`, mais à la place d'utiliser un attribut `href="/about"`, nous utilisons `to="/about"`. Si nous avons déjà utilisé `vue-router`, nous pouvons comparer `<NuxtLink>` au composant `<RouterLink>`.

Voici un exemple de l'utilisation du composant `NuxtLink` avec un lien vers la page `index.vue` dans le répertoire `pages` :

```html{}[pages/index.vue]
<template>
  <NuxtLink to="/">Home page</NuxtLink>
</template>
```

Pour tous liens vers des pages de notre site, il faut utiliser `<NuxtLink>`. Si nous avons des liens vers d'autres sites Web, nous devons utiliser la balise `<a>` comme ci-dessous :

```html{}[pages/index.vue]
<template>
  <main>
    <h1>Home page</h1>
    <NuxtLink to="/about">
      About (lien interne vers une page appartenant à notre application Nuxt)
    </NuxtLink>
    <a href="https://nuxtjs.org">Lien vers une page externe</a>
  </main>
</template>
```

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<base-alert type="next">

En savoir plus sur le [composant NuxtLink](/docs/2.x/features/nuxt-components#the-nuxtlink-component).

</base-alert>
