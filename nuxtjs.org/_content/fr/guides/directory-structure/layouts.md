---
title: layouts
description: Les `layouts` sont d'une grande aide lorsque vous souhaitez modifier l'aspect et la présentation de votre application Nuxt.js. Vous pouvez inclure une barre latérale ou avoir des pages différentes entre une version mobile et web.
position: 7
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/07_layouts?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Vous pouvez facilement renommer le répertoire `layout` sans aucune configuration
    answers:
      - vrai
      - faux
    correctAnswer: faux
  - question: Comment s'appelle la page de layout par défaut ?
    answers:
      - layout.vue
      - default.vue
      - defaultLayout.vue
    correctAnswer: default.vue
  - question: Quel composant devez-vous inclure dans vos layouts ?
    answers:
      - <Nuxt />
      - <NuxtLink />
      - <RouterView />
    correctAnswer: <Nuxt />
  - question: Vous pouvez ajouter tout autre élément à votre layout
    answers:
      - vrai
      - faux
    correctAnswer: vrai
  - question: Pour ajouter un `layout` personnalisé, nous créons un fichier `.vue` et vous l'ajoutez à quel répertoire ?
    answers:
      - layout
      - layouts
      - page
    correctAnswer: layouts
  - question: Comment dire à une page d'utiliser le `layout` du blog ?
    answers:
      - "layout: 'blog'"
      - "name: 'blog'"
      - 'blog: true'
    correctAnswer: "layout: 'blog'"
  - question: Dans quel répertoire ajoutez-vous une page d'erreur ?
    answers:
      - pages
      - layouts
      - errors
    correctAnswer: layouts
  - question: Vous devez ajouter le composant `<Nuxt>` à la page d'erreur ?
    answers:
      - vrai
      - faux
    correctAnswer: faux
  - question: Vous pouvez définir un `layout` personnalisé pour votre page d'erreur
    answers:
      - vrai
      - faux
    correctAnswer: vrai
  - question: La page d'erreur est affichée lorsqu'une erreur se produit lors du rendu côté serveur (SSR) ?
    answers:
      - vrai
      - faux
    correctAnswer: faux
---

Les `layouts` sont d'une grande aide lorsque vous souhaitez modifier l'aspect et la présentation de votre application Nuxt.js. Vous pouvez inclure une barre latérale ou avoir des pages différentes entre une version mobile et web.

<base-alert>

_Ce répertoire ne peut pas être renommé sans configuration supplémentaire._

</base-alert>

## Layout par défaut

Vous pouvez étendre la présentation principale en ajoutant un fichier `layout/default.vue`. Il sera utilisé pour toutes les pages qui n'ont pas de `layout` défini. Assurez-vous d'ajouter le composant `<Nuxt>` lors de la création d'un `layout` pour inclure le composant de la page.

Tout ce dont vous avez besoin dans votre layout, c'est de trois lignes de code qui rendront le composant de la page.

```html{}[layouts/default.vue]
<template>
  <Nuxt />
</template>
```

Vous pouvez ajouter ici d'autres éléments tels que : Navigation, Header, Footer etc.

```html{}[layouts/default.vue]
<template>
  <TheHeader />
  <Nuxt />
  <TheFooter />
</template>
```

<base-alert type="info">

Si vos [composants sont réglés sur true](/docs/2.x/directory-structure/components) alors il n'est pas nécessaire de déclarer l'importation pour vos composants.

</base-alert>

## Layout personnalisé

Tous les fichiers du répertoire `layouts` créeront un `layout` personnalisée accessible avec la propriété `layout` dans les composants de la page.

Let's say we want to create a blog layout and save it to `layouts/blog.vue`:

```html{}[layouts/blog.vue]
<template>
  <div>
    <div>La barre de navigation de mon blog ici</div>
    <Nuxt />
  </div>
</template>
```

Ensuite, vous devez indiquer aux pages d'utiliser votre layout personnalisé

```js{}[pages/posts.vue]
<script>
export default {
  layout: 'blog',
  // OR
  layout (context) {
    return 'blog'
  }
}
</script>
```

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

## Page d'erreur

La page d'erreur est un composant (_page component_) qui est toujours affiché lorsqu'une erreur se produit (qui ne s'est pas lancée du côté du serveur).

<base-alert>

Bien que ce fichier soit placé dans le répertoire `layouts`, il doit être traité comme une page.

</base-alert>

Comme mentionné ci-dessus, ce `layout` est spéciale et vous ne devez pas inclure `<Nuxt>` dans son modèle. Vous devez voir ce `layout` comme un composant affiché lorsqu'une erreur se produit (`404`, `500`, etc.). Comme pour les autres composants de la page, vous pouvez également définir un `layout` personnalisé pour la page d'erreur de la manière habituelle.

Vous pouvez personnaliser la page d'erreur en ajoutant un fichier `layouts/error.vue` :

```js{}[layouts/error.vue]
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page non trouvée</h1>
    <h1 v-else>Une erreur est survenue</h1>
    <NuxtLink to="/">Page d'accueil</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // you can set a custom layout for the error page
}
</script>
```

<base-alert type="info">

Le code source de la page d'erreur par défaut est [disponible sur GitHub](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt-error.vue).

</base-alert>

<quiz :questions="questions"></quiz>
