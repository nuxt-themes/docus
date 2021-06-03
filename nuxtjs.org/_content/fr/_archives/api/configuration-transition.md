---
title: 'API: Les propriétés transition'
description: Définissez les propriétés par défaut des transitions de page et de mise en page.
menu: transition
category: configuration
position: 131
---

## La propriété pageTransition

> Nuxt v2.7.0 introduit la clé "pageTransition" en faveur de la clé "transition" pour consolider la dénomination avec les clés de transition de mise en page.

- Type: `String` ou `Object`

> Utilisé pour définir les propriétés par défaut des transitions de page.

Par défaut:

```js
{
  name: 'page',
  mode: 'out-in'
}
```

Exemple (`nuxt.config.js`):

```js
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

La clé de transition dans `nuxt.config.js` est utilisée pour définir les propriétés par défaut des transitions de page. Pour en savoir plus sur les clés disponibles lorsque la clé `transition` est un objet, consultez la [propriété de transition des pages](/api/pages-transition#object).

## La propriété layoutTransition

- Type: `String` ou `Object`

> Utilisé pour définir les propriétés par défaut des transitions de mise en page. Les configurations sont les mêmes que `layout`

Par défaut:

```js
{
  name: 'layout',
  mode: 'out-in'
}
```

Exemple (`nuxt.config.js`):

```js
export default {
  layoutTransition: 'layout'
  // ou
  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  }
}
```

Exemple global `css`:

```css
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s;
}
.layout-enter,
.layout-leave-active {
  opacity: 0;
}
```
