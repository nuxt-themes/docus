---
title: La propriété mode
description: Change le mode par défaut de Nuxt.js
menu: mode
category: configuration-glossary
position: 17
---

- Type: `string`
  - Par défaut: `universal`
  - Valeurs possibles:
    - `'spa'`: Pas de rendu côté serveur (seulement de la navigation côté client)
    - `'universal'`: Application isomorphique (rendu côté serveur + navigation côté client)

> On peut utiliser cette option pour changer le mode par défaut de Nuxt.js en utilisant le fichier `nuxt.config.js`

<base-alert type="warning">

Déprécié: il faut utiliser `ssr: false` au lieu de `mode: spa`.

</base-alert>

<base-alert type="next">

Pour en savoir davantage sur l'option `SSR`, il faut se référer à la [propriété ssr](/docs/2.x/configuration-glossary/configuration-ssr).

</base-alert>

<base-alert type="next">

Pour en savoir davantage sur l'option `mode`, il faut se référer à la section sur les [modes de render](/docs/2.x/features/rendering-modes).

</base-alert>
