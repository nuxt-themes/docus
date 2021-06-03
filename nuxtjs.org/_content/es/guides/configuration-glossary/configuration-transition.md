---
title: 'Propiedades de transición'
description: Establezca las propiedades predeterminadas de la página y las transiciones de diseño.
menu: transición
category: configuration-glossary
position: 31
---

## La propiedad pageTransition

> Nuxt v2.7.0 introduce la clave "pageTransition" a favor de la clave "transition" para consolidar el nombre con claves de transición de diseño.

- Tipo: `String` o `Object`

> Se utiliza para establecer las propiedades predeterminadas de las transiciones de página.

Por defecto:

```js
{
  name: 'page',
  mode: 'out-in'
}
```

```js{}[nuxt.config.js]
export default {
  pageTransition: 'page'
  // o
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Before enter...');
    }
  }
}
```

La clave de transición en `nuxt.config.js` se usa para establecer las propiedades predeterminadas para las transiciones de página. Para obtener más información sobre las claves disponibles cuando la clave `transition` es un objeto, consulte la [propiedad de transición de páginas](/docs/2.x/features/transitions).

## La propiedad layoutTransition

- Tipo: `String` o `Object`

> Se utiliza para establecer las propiedades predeterminadas de las transiciones de diseño. El valor proporcionado en la opción `name` está configurado para trabajar con el nombre proporcionado en `layout` de la carpeta `layouts`.

Por defecto:

```js
{
  name: 'layout',
  mode: 'out-in'
}
```

```js{}[nuxt.config.js]
export default {
  layoutTransition: 'layout'
  // o
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
