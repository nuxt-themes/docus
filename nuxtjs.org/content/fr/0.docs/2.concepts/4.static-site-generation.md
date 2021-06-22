---
title: Génération de site statique
description: Avec la génération statique nous pouvons générer notre application durant la phase de build et déployer notre site sur n'importe quel hébergeur tel que Netlify, Github pages, Vercel etc...
position: 4
category: concepts
questions:
  - question: Nous avons besoin d'un serveur pour héberger notre site statique
    answers:
      - vrai
      - faux
    correctAnswer: faux
  - question: Quelle commande utilisons-nous pour générer notre site statique ?
    answers:
      - nuxt build
      - nuxt prerender
      - nuxt generate
    correctAnswer: nuxt generate
  - question: Quand appelons-nous notre API ?
    answers:
      - À chaque fois que nous naviguons sur une page avec du contenu qui provient de notre API
      - Quand nous générons notre site
      - Quand nous générons notre site et à chaque fois que nous naviguons sur une page avec du contenu qui provient de notre API
    correctAnswer: Quand nous générons notre site
  - question: Quelles pages vont se rabattre sur le mode de Single Page App ?
    answers:
      - La page d'erreur
      - Celles qui sont exclues de la génération avec generate.excludes
      - Toutes les pages de la navigation
    correctAnswer: Celles qui sont exclues de la génération avec generate.excludes
  - question: Comment mettons-nous à jour le contenu de notre site ?
    answers:
      - Il se met à jour automatiquement
      - Nous avons besoin de régénérer notre site
    correctAnswer: Nous avons besoin de régénérer notre site
---

Avec la génération statique nous pouvons générer notre application durant la phase de build et déployer notre site sur n'importe quel hébergeur tel que Netlify, Github pages, Vercel etc... Ce qui veut dire qu'il n'y a pas besoin de serveur pour pouvoir déployer notre application.

### Générer notre site

Lorsque nous déployons notre site avec [target:static](/docs/2.x/features/deployment-targets#static-hosting), toutes nos pages `.vue` seront générées dans des fichiers HTML et JavaScript. Tous les calls aux API seront faits et mis en cache dans un répertoire nommé `static` à l'intérieur de notre contenu généré pour le côté client, ainsi il n'y aura pas besoin de faire d'appels à notre API par la suite.

### Étape 1: Du navigateur au CDN

Lorsqu'un navigateur enverra la requête initiale, il va accéder au CDN.

### Étape 2: du CDN au navigateur

Le CDN va envoyer le HTML préalablement généré, ainsi que le JavaScript et toutes les ressources statiques au navigateur. Le contenu sera affiché et l'hydratation de Vue.js commencera à faire effet afin de rendre le tout réactif. À la suite de ce processus, la page sera interactive.

### Étape 3: du navigateur au navigateur

Naviguer entre les pages à l'aide de [`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component) est fait du côté client afin que nous n'ayons pas besoin de refaire une requête au CDN et les appels à l'API seront chargés à partir du répertoire des ressources mis en cache et ce même si nous rafraîchissez manuellement notre page.

### Solution de secours: la SPA

Les pages qui auront été exclues de la génération en utilisant la propriété `generate.exclude` se rabattront sur la version SPA de notre application. Ces pages n'existeront donc pas sur le CDN et seront régénérées sur le client (dans le navigateur) à chaque fois qu'un utilisateur naviguera sur ces pages.

<base-alert type="next">

Pour en savoir davantage sur la [propriété `generate`](/docs/2.x/configuration-glossary/configuration-generate#exclude)

</base-alert>

### Mettre à jour notre contenu

Afin de récupérer le nouveau contenu sur notre site à partir de l'API, nous aurons besoin de régénérer le site à nouveau. Avec la plupart des services d'hébergement, nous pouvons parvenir à cela en poussant nos modifications sur la branche `master` avec git ou via une pull request.

### Mode de prévisualisation

Le mode de prévisualisation va appeler notre API ou notre CMS afin que nous puissions voir les changements en live avant de déployer. Se référer au [mode de prévisualisation](/docs/2.x/features/live-preview) pour activer cette fonctionnalité.

<quiz :questions="questions"></quiz>
