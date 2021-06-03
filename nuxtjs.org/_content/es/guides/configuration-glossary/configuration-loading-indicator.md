---
title: 'La propiedad loading indicator'
description: ¡Muestra un indicador de carga atractivo mientras se carga la SPA!
menu: loadingIndicator
category: configuration-glossary
position: 16
---

> ¡Muestra un indicador de carga atractivo mientras se carga la SPA!

Al ejecutar Nuxt.js en modo SPA, no existe contenido del lado del servidor en la carga de la primera página. Por lo tanto, en vez de mostrar una página en blanco mientras se carga la página, podemos mostrar un _spinner_.

Esta propiedad puede ser de 3 tipos diferentes: `string` o `false` o `object`. Si se recibe una cadena, ésta es convertida a objeto.

El valor por defecto es:

```js
loadingIndicator: {
  name: 'circle',
  color: '#3B8070',
  background: 'white'
}
```

## Indicadores integrados

Estos indicadores son importados del increíble proyecto [Spinkit](http://tobiasahlin.com/spinkit). Puedes usar su demo para previsualizar _spinners_.

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

Los indicadores integrados soportan las opciones `color` y `background`.

## Indicadores propios

Si necesitas usar tu propio indicador, una valor String o una clave Name también pueden ser la ruta a una plantilla html con el código de tu indicador! Y todas las opciones son trasladadas a la plantilla.

El [código integrado de Nuxt](https://github.com/nuxt/nuxt.js/tree/dev/packages/vue-app/template/views/loading) también está disponible si necesitas una base!
