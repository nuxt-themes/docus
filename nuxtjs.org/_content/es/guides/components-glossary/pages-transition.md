---
title: 'Propiedad de "Transición entre paginas"'
description: Nuxt.js usa el componente `<transition>` para crear y aplicar increíbles transiciones/animaciones mientras navega entre sus páginas.
menu: Propiedad Transición entre paginas
category: components-glossary
position: 0
---

> Nuxt.js usa el componente [`<transition>`](https://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) para crear y aplicar increíbles transiciones y animaciones mientras navega entre sus páginas.

- **Typo:** `String` o `Object` o `Function`

Para definir una transición personalizada en una ruta específica, simplemente agregue la clave `transition` al componente de la página.

```js
export default {
  // Puede ser un string
  transition: ''
  // un Objeto
  transition: {}
  // o una Función
  transition (to, from) {}
}
```

## String

Si la clave de `transition` se establece como un string, se utilizará como `transition.name`.

```js
export default {
  transition: 'test'
}
```

Nuxt.js usará esta configuracion para el componente de la siguiente manera:

```html
<transition name="test"></transition>
```

## Objeto

Si la key de `transition` se establece como un objeto:

```js
export default {
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

Nuxt.js usará esta configuracion para el componente de la siguiente manera:

```html
<transition name="test" mode="out-in"></transition>
```

El objeto `transition` puede tener las siguientes propiedades:

| key                | Tipo      | Default    | definición                                                                                                                                                                                                                                                         |
| ------------------ | --------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`             | `String`  | `"page"`   | El Nombre de la transición se aplica a todas las transiciones de ruta.                                                                                                                                                                                             |
| `mode`             | `String`  | `"out-in"` | El Modo de transición se aplica a todas las rutas, consulta la [documentación de Vue.js](https://vuejs.org/v2/guide/transitions.html#Transition-Modes).                                                                                                            |
| `css`              | `Boolean` | `true`     | Si aplica clases de transición tienes que usar CSS. El valor predeterminado es `true`. Si se establece en `false`, solo activará los enlaces de JavaScript registrados a través de eventos de componentes.                                                         |
| `duration`         | `Integer` | n/a        | La Duración (en milisegundos) aplicada en la transición, consulta la [documentación de Vue.js](https://vuejs.org/v2/guide/transitions.html#Explicit-Transition-Durations).                                                                                         |
| `type`             | `String`  | n/a        | Especifica el tipo de eventos de transición a esperar para determinar el tiempo de finalización de la transición. Los valores disponibles son `transition` y `animation`. De forma predeterminada, detectará automáticamente el tipo que tiene una mayor duración. |
| `enterClass`       | `String`  | n/a        | El estado inicial de la clase de transición. Consulte la [documentación de Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                                         |
| `enterToClass`     | `String`  | n/a        | El estado final de la transición. Ver [documentación de Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                                                            |
| `enterActiveClass` | `String`  | n/a        | La clase aplicada durante toda la duración de la transición. Ver [documentación de Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                                 |
| `leaveClass`       | `String`  | n/a        | El estado inicial de la clase de transición. Consulte la [documentación de Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                                         |
| `leaveToClass`     | `String`  | n/a        | El estado final de la transición. Ver [documentación de Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                                                            |
| `leaveActiveClass` | `String`  | n/a        | La clase aplicada durante toda la duración de la transición. Ver [documentación de Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                                 |

También puedes definir métodos en la propiedad `transition` de la página , estos son para los [hooks de JavaScript](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks):

- `beforeEnter(el)`
- `enter(el, done)`
- `afterEnter(el)`
- `enterCancelled(el)`
- `beforeLeave(el)`
- `leave(el, done)`
- `afterLeave(el)`
- `leaveCancelled(el)`

```js
export default {
  transition: {
    afterLeave(el) {
      console.log('afterLeave', el)
    }
  }
}
```

_Nota: También es una buena idea agregar explícitamente `css: false` para transiciones solo de JavaScript, para que Vue pueda omitir la detección de CSS. Esto también evita que las reglas CSS interfieran accidentalmente con la transición._

### Modo de transición

**El modo de transición predeterminado para las páginas difiere del modo predeterminado en Vue.js**. El modo de `transition` está configurado por defecto en `out-in`. Si desea ejecutar las transiciones de entrada y salida simultáneamente, debe configurar el modo en la cadena vacía `mode: ''`.

```js
export default {
  transition: {
    name: 'test',
    mode: ''
  }
}
```

## Función

Si la key de `transition` está configurada como función:

```js
export default {
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
```

Transiciones aplicadas a la navegación:

- `/` a `/posts` => `slide-left`,
- `/posts` a `/posts?page=3` => `slide-left`,
- `/posts?page=3` a `/posts?page=2` => `slide-right`.
