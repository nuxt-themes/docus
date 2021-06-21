---
title: 'API: La propriété mode'
description: Changer le mode nuxt par défaut
menu: mode
category: configuration
position: 117
---

- Type: `string`
  - Par défaut: `universal`
  - Valeurs possibles:
    - `'spa'`: Pas de rendu côté serveur (uniquement navigation côté client)
    - `'universal'`: Application isomorphe (rendu côté serveur + navigation côté client)

> Vous pouvez utiliser cette option pour changer le mode nuxt par défaut pour votre projet en utilisant `nuxt.config.js`
