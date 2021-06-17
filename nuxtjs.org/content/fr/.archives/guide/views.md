---
title: Vues
description: La section des vues décrit tout ce dont vous avez besoin pour configurer les données et les vues pour une route spécifique dans votre application Nuxt.js (document, mises en page, pages et entête HTML).
category: getting-started
position: 105
---

> La section des vues décrit tout ce dont vous avez besoin pour configurer les données et les vues pour une route spécifique dans votre application Nuxt.js (document, mises en page, pages et entête HTML).

![nuxt-views-schema](/nuxt-views-schema.svg)

## Document

> Vous pouvez personnaliser le modèle HTML de l'application utilisée par Nuxt.js pour inclure des scripts ou du CSS conditionnel.

Pour étendre le modèle, créez un fichier `app.html` à la racine de votre projet.

Le modèle par défaut utilisé par Nuxt.js est le suivant :

```html
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

Un cas usuel d'utilisation d'un modèle personnalisé d'application est d'ajouter du CSS conditionnel pour IE :

```html
<!DOCTYPE html>
<!--[if IE 9]><html lang="fr-FR" class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

<!-- TODO: Load polyfills here? -->

## Mises en page

Les mises en pages sont une aide appréciable quand vous voulez changer l'aspect de votre application Nuxt.js. Que vous souhaitez inclure une barre latérale ou avoir une disposition distincte pour mobile ou ordinateur

### Mise en page par défaut

Vous pouvez étendre la mise en page principale en ajoutant un fichier `layouts/default.vue`. Il sera utilisé pour toutes les pages qui n'ont pas de mise en page spécifiée.

<div class="Alert Alert--nuxt-green">

<b>Info :</b> Assurez-vous d'ajouter le composant `<nuxt/>` lors de la création d'une mise en page afin d'afficher le composant de la page.

</div>

La mise en page fournie par défaut fait simplement trois lignes et affiche simplement le composant page :

```html
<template>
  <nuxt />
</template>
```

### Mise en page personnalisée

Chaque fichier (_premier niveau_) dans le répertoire `layouts` créera une mise en page personnalisée accessible via la propriété `layout` des composants page.

Disons que nous voulons créer une mise en page de blog et l'enregistrer sous `layouts/blog.vue` :

```html
<template>
  <div>
    <div>Ma navigation de blog est ici</div>
    <nuxt />
  </div>
</template>
```

Maintenant nous devons indiquer aux pages (par exemple `pages/posts.vue`) d'utiliser votre mise en page personnalisée :

```html
<template>
  <!-- Your template -->
</template>
<script>
  export default {
    layout: 'blog'
    // définitions du composant page
  }
</script>
```

Pour plus d'informations, consultez la configuration de l'API à propos de [La propriété `layout`](/api/pages-layout).

Regardez la [vidéo de démonstration](https://www.youtube.com/watch?v=YOKnSTp7d38) pour la voir en action (EN).

<!-- TODO: Scoped styles best practice -->

### Page d'erreur

La page d'erreur est une _page composant_ qui sera toujours affichée lorsqu'une erreur se produit (qui ne survient pas pendant le rendu côté serveur).

<div class="Alert Alert--orange">

<b>Attention :</b> Bien que ce fichier soit placé dans le répertoire <code>layouts</code>, il doit être traité comme une <b>page</b>.

</div>

Comme mentionné précédemment, cette mise en page est spéciale, car vous **ne devez pas** inclure `<nuxt/>` dans cette mise en page. Vous devez voir cette mise en page comme un composant affiché quand une erreur survient (`404`, `500`, etc.). Similaire aux autre composants page, vous pouvez définir une mise en page personnalisée pour la page d'erreur.

Le code source de la page d'erreur par défaut est [disponible sur GitHub](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt-error.vue).

Vous pouvez personnaliser la page d'erreur en ajoutant un fichier `layouts/error.vue` :

```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page non trouvée</h1>
    <h1 v-else>Une erreur s'est produite</h1>
    <nuxt-link to="/">Accueil</nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'blog' // vous pouvez définir une mise en page personnalisée pour la page d'erreur
  }
</script>
```

## Pages

Chaque composant page est un composant Vue, mais Nuxt.js ajoute des clés spéciales pour rendre le développement de votre application universelle le plus simple possible.

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/nuxtjs-page-components?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Visonner un cours gratuit sur les <strong>composants page Nuxt.js</strong> sur Vue School (EN)
    </p>
  </a>
</div>

```html
<template>
  <h1 class="red">Bonjour {{ name }} !</h1>
</template>

<script>
  export default {
    asyncData (context) {
      // appelé à chaque fois avant le chargement du composant
      // comme son nom l'indique, il peut être asynchrone
      // De plus, l'objet retourné sera ajouté à votre objet `data`
      return { name: 'le Monde' }
    },
    fetch () {
      // La méthode `fetch` est utilisée pour peupler le store avant d'effectuer le rendu de la page
    },
    head () {
      // Définit les balises meta pour cette page
    },
    // et plus de fonctionnalités à découvrir
    ...
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

| Attribut      | Description                                                                                                                                                                                                                                                                                                                                                                     | Documentation                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `asyncData`   | L'attribut le plus important. Il peut être asynchrone et reçoit le contexte comme argument.                                                                                                                                                                                                                                                                                     | [Guide : Données asynchrones](/guide/async-data)                                    |
| `fetch`       | Utilisé pour peupler le store avant de faire le rendu de la page. Identique à la méthode `asyncData`, sauf qu'il ne peuple pas le composant `data`                                                                                                                                                                                                                              | [pages de l'API sur `fetch`](/api/pages-fetch)                                      |
| `head`        | Défini des balises `<meta>` spécifiques pour la page en cours.                                                                                                                                                                                                                                                                                                                  | [pages de l'API sur `head`](/api/pages-head)                                        |
| `layout`      | Défini une mise en page existantes dans le répertoire `layouts`.                                                                                                                                                                                                                                                                                                                | [pages de l'API sur `layout`](/api/pages-layout)                                    |
| `loading`     | Si mis à `false`, empèche la page d'appeler automatiquement `this.$nuxt.$loading.finish()` quand vous allez dessus et `this.$nuxt.$loading.start()` quand vous la quittez, vous permettant de contrôller **manuellement** ce comportement, comme le montre [cet exemple](/examples/custom-loading-component). Seulement appliqué si `loading` est défini dans `nuxt.config.js`. | [configuration `loading` de l'API](/api/configuration-loading)                      |
| `transition`  | Défini une transition spécifique pour la page.                                                                                                                                                                                                                                                                                                                                  | [pages de l'API sur `transition`](/api/pages-transition)                            |
| `scrollToTop` | Booléen (par défaut : `false`). Indique si vous souhaitez que la position de défilement de la page soit déplacée vers le haut avant d'afficher la page. Est utilisé pour les [Routes imbriquées](/guide/routing#routes-imbriqu-es)                                                                                                                                              | [pages de l'API sur `scrollToTop`](/api/pages-scrolltotop#the-scrolltotop-property) |
| `validate`    | Fonction de validation pour les [Routes dynamiques](/guide/routing#routes-dynamiques).                                                                                                                                                                                                                                                                                          | [pages de l'API sur `validate`](/api/pages-validate#the-validate-method)            |
| `middleware`  | Défini un middleware pour cette page. Ce middleware sera exécuté avant d'effectuer le rendu de la page.                                                                                                                                                                                                                                                                         | [Guide : Middleware](/guide/routing#middleware)                                     |

Pour plus d'informations à propos de l'utilisation des attributs de pages, consultez [la partie Pages de l'API](/api)

## Entête HTML

<div class="Alert Alert--teal">

Nuxt.js utilise [vue-meta](https://github.com/declandewet/vue-meta) pour mettre à jour les `headers` et les `html attributes` de votre application.

`vue-meta` utilisé par Nuxt.js peut être trouvé [sur GitHub](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/index.js#L29-L35)

</div>

<div class="Alert Alert--teal">

<b>Info :</b> Nuxt.js utilise la clé <code>hid</code> à la place de la clé <code>vmid</code> par défaut pour identifier les éléments <meta>

</div>

### Balises meta par défaut

Nuxt.js vous permet de définir tous les tags `<meta>` par défaut de votre application dans `nuxt.config.js`. Définissez-les en utilisant la même propriété `head` :

Exemple d'un viewport spécifique et d'une police Google personnalisée :

```js
head: {
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
  ]
}
```

Pour connaitre la liste des options que vous pouvez donner à `head`, jeter un œil à la [documentation vue-meta](https://vue-meta.nuxtjs.org/api/#metainfo-properties).

### Balises meta personnalisées pour une page

Plus d'informations à propos de la méthode `head` dans [la partie Configuration de l'API sur `head`](/api/configuration-head).
