---
title: Propriétés RuntimeConfig
description: RuntimeConfig permet de passer des variables d'environnement et de la configuration dynamique au contexte de Nuxt.js.
menu: runtimeConfig
category: configuration-glossary
position: 25
---

RuntimeConfig permet de passer des variables d'environnement et de la configuration dynamique au contexte de Nuxt.js. Pour plus d'informations sur l'utilisation, se référer au guide du [runtime config](/docs/2.x/runtime-config).

## `publicRuntimeConfig`

- Type: `Object`

La valeur de cet objet est **accessible du côté client et du côté serveur** en utilisant `$config`.

## `privateRuntimeConfig`

- Type: `Object`

La valeur de cet objet est accessible du **côté serveur seulement** en utilisant `$config`. Cela écrase `publicRuntimeConfig` pour le serveur.
