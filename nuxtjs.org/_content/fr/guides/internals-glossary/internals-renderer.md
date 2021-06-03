---
title: La classe `Renderer`
description: Classe Renderer Nuxt
menu: Rendu
category: internals-glossary
position: 5
---

- Source: **[vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)**

Cette classe exporte un middleware de connexion qui traite et sert toutes les reqûetes des ressources et SSR.

## Hooks

Nous pouvons enregistrer des hooks sur certains événements du cycle de vie.

| Hook                     | Arguments                | Quand                                                                                                                                                                                                                                                        |
| ------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `render:before`          | (renderer, options)      | Avant de mettre en place un middleware et des ressources pour la classe Renderer, utile pour surcharger certaines méthodes ou options.                                                                                                                       |
| `render:setupMiddleware` | (app) _connect instance_ | Avant que Nuxt n'ajoute sa pile de middleware. Nous pouvons l'utiliser pour enregistrer le rendu personnalisés côté serveur (SSR).                                                                                                                           |
| `render:errorMiddleware` | (app) _connect instance_ | Avant d'ajouter le middleware d'erreur de Nuxt, utile pour ajouter votre propre middleware avant d'utiliser celui de Nuxt. Voir le [module Sentry](https://github.com/nuxt-community/sentry-module/blob/v4.0.3/lib/module.js#L151) pour plus d'informations. |
| `render:resourcesLoaded` | (resources)              | Appelé après le chargement des ressources pour le moteur de rendu (client manifest, server bundle, etc).                                                                                                                                                     |
| `render:done`            | (renderer)               | SSR Middleware et toutes les ressources sont prêtes (Renderer ready).                                                                                                                                                                                        |
| `render:routeContext`    | (context.nuxt)           | _Chaque fois qu'une route est rendue par le serveur et avant le hook `render:route`_. Appelé avant la sérialisation du contexte Nuxt dans `window.__NUXT__`, utile pour ajouter des données que vous pouvez récupérer côté client.                           |
| `render:route`           | (url, result, context)   | _Chaque fois qu'une route est rendue par le serveur_. Appelé avant de renvoyer la requête au navigateur.                                                                                                                                                     |
| `render:routeDone`       | (url, result, context)   | _Chaque fois qu'une route est rendue par le serveur_. Appelé après que la réponse a été envoyée au navigateur.                                                                                                                                               |
