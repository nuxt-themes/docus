---
title: Vues
description: La section des vues décrit tout ce que nous devons savoir pour configurer votre data et de potentielles vues pour une route spécifique dans votre application Nuxt.js. Les vues se composent du template d'une app, son layout et la page actuelle.
position: 1
category: concepts
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/01_views?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Quel est l'ordre de la composition d'une vue Nuxt (du haut vers le bas)?
    answers:
      - Layout → Page → Document
      - Page → Layout → Document
      - Document → Layout → Page
    correctAnswer: Document → Layout → Page
  - question: Comment s'appelle le layout par défaut?
    answers:
      - default.vue
      - layout.vue
      - defaultLayout.vue
    correctAnswer: default.vue
  - question: Comment créer un layout custom?
    answers:
      - ajouter un fichier .vue dans le répertoire pages
      - ajouter un fichier .vue dans le répertoire layouts
      - ajouter un fichier .vue dans le répertoire components
    correctAnswer: ajouter un fichier .vue dans le répertoire layouts
  - question: Commment activons-nous le layout custom nommé 'blog' sur votre page?
    answers:
      - "layout: 'blog'"
      - "layout: 'default'"
      - "blog: 'blog'"
    correctAnswer: "layout: 'blog'"
  - question: Où doit se situer le fichier error.vue qui crée une page d'erreur personnalisée?
    answers:
      - dans le répertoire pages
      - dans le répertoire errors
      - dans le répertoire layouts
    correctAnswer: dans le répertoire layouts
---

La section des vues décrit tout ce que nous avons besoin de savoir pour configurer la data et les vues pour une route spécifique dans notre application Nuxt.js. Les vues se composent d'un template, d'un layout et de la page actuelle. En plus de cela, nous pouvons définir des méta tags personnalisés pour la section `head` de chaque page. Ces derniers sont important pour le SEO (référencement naturel).

![Composition of a View in Nuxt.js](/docs/2.x/views.png)

Composition d'une vue dans Nuxt.js

## Pages

Chaque composant Page est un composant Vue mais Nuxt.js ajoute un attribut spécial et des fonctions pour rendre le développement de notre application aussi facile que possible.

```html{}[pages/index.vue]
<template>
  <h1 class="red">Hello World</h1>
</template>

<script>
  export default {
    head() {
      // Configurer les méta tags pour cette page
    }
    // ...
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

## Propriétés du composant page

Il y a beaucoup de propriétés possibles sur un composant Page comme le `head` dans l'exemple juste au dessus.

<base-alert type="next">

Se référer à [la documentation sur la structure des répertoires](/docs/2.x/directory-structure/nuxt) pour en apprendre davantage sur les propriétés que nous pouvons utiliser sur notre page.

</base-alert>

## Layouts

Les layouts sont un moyen efficace quand nous voulons changer l'apparence et le feeling de notre app Nuxt.js. Pour par exemple, inclure une sidebar ou avoir des layouts bien distincts entre une vue mobile et bureau.

### Layout par défaut

Nous pouvons définir un layout par défaut en ajoutant un fichier `default.vue` dans le répertoire des `layouts`. Ceci sera utilisé pour toutes les pages qui n'ont pas de layout déjà spécifié. La seule chose qu'il sera nécessaire d'inclure dans le layout est le composant `<Nuxt />` qui s'occupera de render le composant page.

```html{}[layouts/default.vue]
<template>
  <Nuxt />
</template>
```

<base-alert type="next">

Se référer au [composant Nuxt](/docs/2.x/features/nuxt-components) dans le chapitre des composants.

</base-alert>

### Layout personnalisé

Nous pouvons créer des layouts personnalisés en ajoutant un fichier `.vue` dans le répertoire des `layouts`. Pour utiliser ce layout personnalisé, nous aurons besoin de specifier la propriété `layout` dans le composant page dans lequel nous voulons utiliser ce layout. La value sera le nom du layout personnalisé que nous aurons créé.

Pour créer un layout de blog, ajoutez un fichier `blog.vue` au répertoire `layouts`:

```html{}[layouts/blog.vue]
<template>
  <div>
    <div>La barre de navigation de mon blog</div>
    <Nuxt />
  </div>
</template>
```

<base-alert>

Il faut faire bien attention à ajouter le composant `<Nuxt />` lorsque nous créons le composant pour y inclure le contenu de la page.

</base-alert>

Par la suite, il suffit d'attribuer la valeur `blog` à la propriété `layout` dans la page où nous souhaitons que le layout soit utilisé.

```html{}[pages/posts.vue]
<template>
  <!-- notre template -->
</template>
<script>
  export default {
    layout: 'blog'
    // ici se trouvent les définitions du composant page
  }
</script>
```

<base-alert type="info">

Si on ne spécifie par la propriété `layout` sur notre page (ex: `layout: 'blog'`) alors le layout `default.vue` sera utilisé.

</base-alert>

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

### Page d'erreur

La page d'erreur est le _composant page_ qui sera toujours affiché lors d'une erreur (ce n'est pas le cas lors d'une utilisation en mode server-side rendering).

<base-alert>

Même si ce fichier sera placé dans le répertoire `layouts`, il devra être considéré comme une page.

</base-alert>

Comme dit ci-dessus, ce layout est spécial car il ne devra pas contenir de composant `<Nuxt />` dans son `template`. Ce layout devra être vu comme un composant affiché lorsque des erreurs surviennent (`404`, `500`, etc.). Comme pour les autres composants page, Nous pouvons appliquer un layout personnalisé pour la page erreur.

Nous pouvons personnaliser la page erreur en ajoutant un fichier `layouts/error.vue`:

```html{}[layouts/error.vue]
<template>
  <div>
    <h1 v-if="error.statusCode === 404">Page non trouvée</h1>
    <h1 v-else>Une erreur est survenue</h1>
    <NuxtLink to="/">Page d'accueil</NuxtLink>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // nous pouvons definir un layout personnalisé pour la page erreur
  }
</script>
```

## Document: App.html

Le template `app` est utilisé pour créer le cadre HTML pour le document de notre application Nuxt.js, ce dernier s'occupera d'injecter le contenu ainsi que les variables pour le `head` ainsi que le `body`. Ce fichier est automatiquement créé pour nous et a rarement besoin d'être modifié. Nous pouvons customiser le template HTML `app` utilisé par Nuxt.js pour inclure des scripts ou des classes CSS conditionnelles en créant un fichier `app.html` dans le répertoire source de notre projet, qui par défaut, n'est autre que la racine de votre projet.

Le template par défaut utilisé par Nuxt.js est:

```html{}[app.html]
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

Un cas d'usage de personnalisation du template app serait d'ajouter des classes CSS conditionnelles pour IE:

```html{}[app.html]
<!DOCTYPE html>
<!--[if IE 9]><html class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

<base-alert type="info">

Même si nous pouvons ajouter du JavaScript et des fichiers CSS dans `app.html`, il est plutôt recommandé d'utiliser `nuxt.config.js` pour cet usage !

</base-alert>

<quiz :questions="questions"></quiz>
