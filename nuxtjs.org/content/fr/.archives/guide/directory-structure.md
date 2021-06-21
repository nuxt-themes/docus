---
title: Structure des répertoires
description: La structure par défaut d'une application Nuxt.js est destinée à fournir un excellent point de départ pour les petites et grandes applications. Bien sûr, vous êtes libre d'organiser votre application comme vous le souhaitez.
category: getting-started
position: 102
---

> La structure par défaut d'une application Nuxt.js est destinée à fournir un excellent point de départ pour les petites et grandes applications. Bien sûr, vous êtes libre d'organiser votre application comme vous le souhaitez.

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/guided-nuxtjs-project-tour?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Visionner un cours gratuit sur <strong>la structure de répertoire de Nuxt.js</strong> sur Vue School (EN)
    </p>
  </a>
</div>

## Répertoires

<br />

### Le répertoire des ressources

Le répertoire `assets` contient vos ressources non compilées tels que vos fichiers Stylus ou Sass, des images et des polices.

[Consultez la documentation à propos de l'intégration des ressources](/guide/assets)

### Le répertoire des composants

Le répertoire `components` contient vos composants Vue.js. Vous ne pouvez pas utiliser les méthodes `asyncData` ou `fetch` sur ces composants.

### Le répertoire des mises en page

Le répertoire `layouts` contient les mises en page de votre application. Les mises en page sont utilisées pour changer l'aspect de votre page (par exemple en incluant une barre latérale).

[Consultez la documentation à propos de l'intégration des mises en page](/guide/views#layouts)

_Ce répertoire ne peut pas être renommé sans configuration supplémentaire._

### Le répertoire des middlewares

Le répertoire `middleware` contient vos middlewares. Un middleware vous permet de définir une fonction qui sera exécutée avant de faire le rendu d'une mise en page ou d'un groupe de mises en page.

[Consultez la documentation à propos de l'intégration des middlewares](/guide/routing#middleware)

### Le répertoire des pages

Le répertoire `pages` contient vos vues et routes de l'application. Le framework lit tous vos fichiers `.vue` au sein de ce répertoire et crée automatiquement le routage de votre application.

_Ce répertoire ne peut pas être renommé sans configuration supplémentaire._

[Consultez la documentation à propos de l'intégration des pages](/guide/views)

### Le répertoire des plugins

Le répertoire `plugins` contient les plugins JavaScript que vous désirez exécuter avant d'instancier l'application Vue.js racine. C'est le bon endroit pour abonner des composants globaux et injecter des fonctions ou constantes.

[Consultez la documentation à propos de l'intégration des plugins](/guide/plugins)

### Le répertoire des fichiers statiques

Le répertoire `static` est directement relié au chemin racine du serveur (`/static/robots.txt` est accessible à l'adresse `http://localhost:3000/robots.txt`) et contient des fichiers que vous ne voudrez jamais modifier (par ex. le favicon)

**Exemple :** `/static/robots.txt` est mappé à `/robots.txt`

_Ce répertoire ne peut pas être renommé sans configuration supplémentaire._

[Consultez la documentation à propos de l'intégration des fichiers statiques](/guide/assets#static)

### Le répertoire des stores

Le répertoire `store` contient vos fichiers de [store Vuex](https://vuex.vuejs.org/fr/). Les stores Vuex sont implémentés de manière optionnelle dans le framework Nuxt.js. La création d'un fichier `index.js` dans ce répertoire active automatiquement l'option dans le framework.

_Ce répertoire ne peut pas être renommé sans configuration supplémentaire._

[Consultez la documentation à propos de l'intégration des stores Vuex](/guide/vuex-store)

### Le fichier nuxt.config.js

Le fichier `nuxt.config.js` contient vos configurations personnalisées concernant Nuxt.js.

_Ce fichier ne peut pas être renommé sans configuration supplémentaire._

[Consultez la documentation à propos de l'intégration de `nuxt.config.js`](/guide/configuration)

### Le fichier package.json

Le fichier `package.json` contient les dépendances et scripts de votre application.

_Ce fichier ne peut pas être renommé._

## Alias

| Alias        | Répertoire                            |
| ------------ | ------------------------------------- |
| `~` or `@`   | [srcDir](/api/configuration-srcdir)   |
| `~~` or `@@` | [rootDir](/api/configuration-rootdir) |

Par défaut, `srcDir` est le même répertoire que `rootDir`.

<div class="Alert Alert--nuxt-green">

<b>Info :</b> à l'intérieur de vos templates `vue`, si vous avez besoin de faire référence à vos répertoires `assets` ou `static`, utilisez par ex. `~/assets/votre_image.png` et `~/static/votre_image.png`.

</div>
