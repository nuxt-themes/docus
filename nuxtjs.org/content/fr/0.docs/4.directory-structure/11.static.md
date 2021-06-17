---
title: static
description: Le répertoire `static` est directement relié à la racine du serveur () et contient des fichiers qui ne seront probablement pas modifiés. Tous les fichiers inclus sont automatiquement servis par Nuxt et accessibles via l'URL racine de votre projet.
position: 12
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/13_static?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Dans quel répertoire devez-vous placer vos fichiers qui ne seront probablement pas modifiés comme par exemple la favicon ou le robots.txt ?
    answers:
      - assets
      - static
      - src
    correctAnswer: static
  - question: Ce répertoire peut être facilement renommé sans aucune configuration
    answers:
      - vrai
      - faux
    correctAnswer: faux
  - question: Où devez-vous mettre vos images si vous voulez que webpack les rassemble ?
    answers:
      - static
      - assets
      - src
    correctAnswer: assets
  - question: Tout ce qui se trouve dans le répertoire `static` est relatif au répertoire racine
    answers:
      - vrai
      - faux
    correctAnswer: vrai
  - question: Vous pouvez configurer le comportement du répertoire `static` dans le fichier nuxt.config.js
    answers:
      - vrai
      - faux
    correctAnswer: vrai
---

Le répertoire `static` est directement relié à la racine du serveur () et contient des fichiers qui ne seront probablement pas modifiés. Tous les fichiers inclus sont automatiquement servis par Nuxt et accessibles via l'URL racine de votre projet.

`/static/robots.txt` sera disponible à l'adresse `http://localhost:3000/robots.txt`

`/static/favicon.ico` sera disponible à l'adresse `http://localhost:3000/favicon.ico`

Cette option est utile pour les fichiers tels que `robots.txt`, `sitemap.xml` ou `CNAME` (qui est important pour le déploiement des pages sur GitHub).

<base-alert>

_Ce répertoire ne peut pas être renommé sans configuration supplémentaire._

</base-alert>

## Ressources statique

Si vous ne souhaitez pas utiliser les ressources Webpack du répertoire `assets`, vous pouvez ajouter les images dans le répertoire `static`.

Dans votre code, vous pouvez alors référencer ces fichiers par rapport à la racine (`/`) :

```html
<!-- Image statique du répertoire `static` -->
<img src="/mon-image.png" />

<!-- Image webpacked du répertoire `assets` -->
<img src="@/assets/mon-image-2.png" />
```

## Configuration du répertoire `static`

Si vous en avez besoin, vous pouvez configurer le comportement du répertoire `static/` dans le fichier `nuxt.config.js`.

### Préfixe des ressources statique

Si nous déployons Nuxt.js dans un sous-répertoire, par exemple `/blog/`, la base du routeur sera ajoutée par défaut au chemin de la ressource statique. Si nous voulons désactiver ce comportement, vous pouvez mettre `static.prefix` à `false` dans le `nuxt.config.js`.

```js
export default {
  static: {
    prefix: false
  }
}
```

Par défaut : `/blog/mon-image.png`

Avec `static.prefix` désactivé : `/mon-image.png`

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
