---
title: La propriété loading indicator
description: Affiche des indications de chargement originaux lorsque la page SPA est en train de charger !
menu: loadingIndicator
category: configuration-glossary
position: 16
---

> Affiche des indications de chargement originaux lorsque la page SPA est en train de charger !

Lorsque l'on exécute Nuxt.js en mode SPA, il n'y a pas de contenu du côté serveur lors du chargement initial de la page. Donc, au lieu d'afficher une page blanche lorsque l'application charge, on pourrait afficher un spinner.

Cette propriété peut prendre 3 types différents: `string` ou `false` ou `object`. Si une chaîne de caractères est fournie, elle sera convertie en objet.

La valeur par défaut est:

```js
loadingIndicator: {
  name: 'circle',
  color: '#3B8070',
  background: 'white'
}
```

## Indicateurs embarqués

Ces indicateurs sont importés depuis le projet génial qu'est [Spinkit](http://tobiasahlin.com/spinkit). On peut se référer à sa page de démo pour prévisualiser les spinners.

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

Built-in indicators support `color` and `background` options.

## Indicateurs personnalisés

Si vous avez besoin de votre propre indicateur spécial, une chaîne de caractères ou un nom de clé peut aussi être le chemin vers le code source d'un template HTML. Toutes les options seront aussi passées au template.

Le [code source](https://github.com/nuxt/nuxt.js/tree/dev/packages/vue-app/template/views/loading) de celui de Nuxt.js est aussi disponible si l'on souhaite avoir une base !
