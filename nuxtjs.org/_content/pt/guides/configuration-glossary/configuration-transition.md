---
title: 'As propriedades transition'
description: Defina as propriedades padrão das transições de página e layout.
menu: transition
category: configuration-glossary
position: 31
---

## A propriedade pageTransition

> Nuxt v2.7.0 introduz a propriedade "pageTransition" no lugar da propriedade "transition" para consolidar a nomenclatura com propriedades de transição de layout.

- Tipo: `String` ou `Object`

> Usado para definir as propriedades padrão das transições de página.

Padrão:

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

A propriedade transition em `nuxt.config.js` é usada para definir as propriedades padrão para as transições de página. Para saber mais sobre as opções disponíveis quando a propriedade `transition` é um objeto, consulte a [propriedade de transição de páginas](/docs/2.x/features/transitions).

## A propriedade layoutTransition

- Tipo: `String` ou `Object`

> Usado para definir as propriedades padrão das transições de layout. O valor fornecido na opção `name` é configurado para funcionar com o nome fornecido no `layout` do seu diretório `layouts`.

Padrão:

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
