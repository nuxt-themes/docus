---
title: 'API : la classe Generator'
description: La classe `Generator` de Nuxt
menu: Generator
category: internals
position: 306
---

- Source : **[generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)**

## Point d'ancrage

Nous pouvons enregistrer des points d'ancrage sur certains évènements du cycle de vie.

| Point d'ancrage         | Arguments               | Quand                                                                          |
| ----------------------- | ----------------------- | ------------------------------------------------------------------------------ |
| `generate:before`       | (nuxt, generateOptions) | Point d'ancrage avant génération                                               |
| `generate:distRemoved`  | (nuxt)                  | Point d'ancrage sur le vidage du dossier de destination                        |
| `generate:distCopied`   | (nuxt)                  | Point d'ancrage sur le build et la copie des fichiers statiques                |
| `generate:page`         | ({route, path, html})   | Point d'ancrage pour laisser l'utilisateur mettre à jour le `path` & `html`    |
| `generate:routeCreated` | (route, path, errors)   | Point d'ancrage à la sauvegarde d'une page générée avec succès                 |
| `generate:extendRoutes` | (routes)                | Point d'ancrage pour laisser l'utilisateur mettre à jours les routes à générer |
| `generate:routeFailed`  | (route, errors)         | Point d'ancrage sur la sauvegarde d'une page générée en échec                  |
| `generate:done`         | (nuxt, errors)          | Point d'ancrage à la fin de la génération                                      |
