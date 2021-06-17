---
title: La classe Generator
description: La classe Generator de Nuxt
menu: Générateur
category: internals-glossary
position: 8
---

- Source: **[generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)**

## Hooks

`generate:` hooks:

| Hook                    | Arguments                    | Quand                                                                                                                                                    |
| ----------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generate:before`       | (generator, generateOptions) | Hook avant la génération de la page                                                                                                                      |
| `generate:distRemoved`  | (generator)                  | Hook sur le répertoire de destination nettoyé                                                                                                            |
| `generate:distCopied`   | (generator)                  | Hook sur la copie des fichiers statiques et du build                                                                                                     |
| `generate:route`        | ({ route, setPayload })      | Hook avant de générer la page, utile pour la charge utile dynamique, voir [#7422](https://github.com/nuxt/nuxt.js/pull/7422), disponible pour Nuxt 2.13+ |
| `generate:page`         | ({ route, path, html })      | Hook pour permettre à l'utilisateur de mettre à jour le chemin et l'html après la génération                                                             |
| `generate:routeCreated` | ({ route, path, errors })    | Hook sur la sauvegarde du succès des pages générées                                                                                                      |
| `generate:extendRoutes` | (routes)                     | Hook pour permettre à l'utilisateur de mettre à jour les routes à générer                                                                                |
| `generate:routeFailed`  | ({ route, errors })          | Hook sur l'enregistrement de l'échec de la page générée                                                                                                  |
| `generate:done`         | (generator, errors)          | Hook sur la génération terminée                                                                                                                          |
