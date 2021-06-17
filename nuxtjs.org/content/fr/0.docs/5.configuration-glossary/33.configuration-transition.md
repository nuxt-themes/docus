---
title: 'Les propriétés de transition'
description: Définissez les propriétés par défaut de la page et des transitions de mise en page.
menu: transition
category: configuration-glossary
position: 31
---

## La propriété pageTransition

> Nuxt v2.7.0 introduit la clé "pageTransition" en faveur de la clé "transition" pour consolider le nommage avec les clés de transition de mise en page.

- Type: `String` ou `Object`

> Utilisé pour définir les propriétés par défaut des transitions de page.

Par défaut :

```js
{
  name: 'page',
  mode: 'out-in'
}
```

```js{}[nuxt.config.js]
export default {
  pageTransition: 'page'
  // ou
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Before enter...');
    }
  }
}
```

La clé de transition dans `nuxt.config.js` est utilisée pour définir les propriétés par défaut des transitions de page. Pour en savoir plus sur les clés disponibles, voir la [propriété de transition des pages](/docs/2.x/features/transitions).

## La propriété layoutTransition

- Type: `String` ou `Object`

> Utilisé pour définir les propriétés par défaut des transitions de la mise en page. La valeur fournie dans l'option `name` est configurée pour fonctionner avec le nom fourni dans `layout` de notre répertoire `layouts`.

Par défaut :

```js
{
  name: 'layout',
  mode: 'out-in'
}
```

```js{}[nuxt.config.js]
export default {
  layoutTransition: 'layout'
  // ou
  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  }
}
```

```css{}[assets/main.css]
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s;
}
.layout-enter,
.layout-leave-active {
  opacity: 0;
}
```
