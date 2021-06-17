---
title: "API: Propriété de l'indicateur de chargement"
description: Afficher un indicateur de fantaisie pendant le chargement de la page SPA!
menu: loadingIndicator
category: configuration
position: 116
---

> Afficher un indicateur de fantaisie pendant le chargement de la page SPA!

Lors de l'exécution de Nuxt.js en mode SPA, il n'y a pas de contenu côté serveur lors du premier chargement de page. Ainsi, au lieu d'afficher une page vierge pendant le chargement de la page, nous pouvons afficher un spinner.

Cette propriété peut avoir 3 types différents: `string` ou `false` ou `object`. Si une valeur de chaîne est fournie, elle est convertie en style d'objet.

La valeur par défaut est:

```js
{
  name: 'circle',
  color: '#3B8070',
  background: 'white'
}
```

## Indicateurs intégrés

Ces indicateurs sont portés à partir du projet génial de [Spinkit](http://tobiasahlin.com/spinkit). Vous pouvez utiliser sa page de démonstration pour prévisualiser les loaders.

- circle
- cube-grid
- fading-circle
- folding-cube
- chasing-dots
- nuxt
- pulse
- rectangle-bounce
- rotating-plane
- three-bounce
- wandering-cubes

Les indicateurs intégrés supportent les options `color` et `background`.

## Indicateurs personnalisés

Si vous avez besoin de votre propre indicateur spécial, une valeur de chaîne ou un nom de clé peut également être un chemin vers un modèle html de code source d'indicateur! Toutes les options sont également transmises au modèle.

Le [code source](https://github.com/nuxt/nuxt.js/tree/dev/packages/vue-app/template/views/loading) fonction intégrée de Nuxt est également disponible si vous avez besoin d'une base!
