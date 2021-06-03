---
title: 'La propiedad loading'
description: Nuxt.js usa un componente propio para mostrar una barra de progreso entre rutas. Puedes personalizarla, deshabilitarla o crear tu propio componente.
menu: loading
category: configuration-glossary
position: 15
---

- Tipo: `Boolean` o `Object` o `String`

> Nuxt.js dispone de su propio componente de barra de progreso, que se muestra entre rutas. Puedes personalizarla, deshabilitarla o crear tu propio componente.

```javascript
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

## Deshabilitar la barra de progreso

- Type: `Boolean`

```js{}[nuxt.config.js]
export default {
  loading: false
}
```

## Personalizar la barra de progreso

- Type: `Object`

```js
export default {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

Lista de propiedades para personalizar la barra de progreso.

| Clave         | Tipo    | Defecto   | Descripción                                                                                                                         |
| ------------- | ------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `color`       | String  | `'black'` | Color CSS de la barra                                                                                                               |
| `failedColor` | String  | `'red'`   | Color CSS de la barra cuando se produjo un error durante el renderizado de la ruta (si `data` o `fetch` dieron error, por ejemplo). |
| `height`      | String  | `'2px'`   | Altura de la barra (se usa en la propiedad `style` de la barra)                                                                     |
| `throttle`    | Number  | `200`     | En ms, indica la espera antes de mostrar la barra. Útil para prevenir el parpadeo de la misma.                                      |
| `duration`    | Number  | `5000`    | En ms, indica la duración máxima de la barra. Nuxt.js supone que la ruta será renderizada antes de 5 segundos.                      |
| `continuous`  | Boolean | `false`   | Seguir animando la barra cuando la carga tarda más de `duration`.                                                                   |
| `css`         | Boolean | `true`    | Poner a false para eliminar los estilos por defecto de la barra (y añadir los tuyos propios).                                       |
| `rtl`         | Boolean | `false`   | Definir la dirección de la barra de derecha a izquierda.                                                                            |

## Usar un componente propio

- Tipo: `String`

**Tu componente tiene que exponer alguno de estos métodos:**

| Método          | Requerido  | Descripción                                                                                    |
| --------------- | ---------- | ---------------------------------------------------------------------------------------------- |
| `start()`       | Requerido  | Llamado cuando una ruta cambia, aquí es donde muestras tu componente.                          |
| `finish()`      | Requerido  | Llamado cuando una ruta es cargada (y se obtienen datos), aquí es donde ocultas tu componente. |
| `fail(error)`   | _Opcional_ | Llamado cuando una ruta no pudo ser cargada (no se pudo obtener datos, por ejemplo).           |
| `increase(num)` | _Opcional_ | Llamado durante la carga del componete route, `num` es un entero < 100.                        |

```html{}[components/loading.vue]
<template lang="html">
  <div class="loading-page" v-if="loading">
    <p>Cargando...</p>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
  }
</style>
```

```js{}[nuxt.config.js]
export default {
  loading: '~/components/loading.vue'
}
```
