---
title: Cargando
description: De fábrica, Nuxt.js te ofrece su propio componente de barra de progreso de carga que se muestra entre rutas. Puedes personalizarlo, desactivarlo o incluso crear tu propio componente de carga.
position: 8
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/08_loading?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: In order for the Nuxt.js loading progress bar to work what do you have to do?
    answers:
      - Nothing, it just works
      - set loading to true in the nuxt.config.js file
      - create a loading component
    correctAnswer: Nothing, it just works
  - question: Where can you modify the styles for the default progress bar?
    answers:
      - layout component
      - page component
      - nuxt.config.js
    correctAnswer: layout component
  - question: In which property do you set the styles for the progress bar in the nuxt.config.js file?
    answers:
      - progress
      - loading
      - loadingBar
    correctAnswer: loading
  - question: What do you add in the nuxt.config.js file to disable loading?
    answers:
      - 'loadingBar: false'
      - "loading: 'none'"
      - 'loading: false'
    correctAnswer: 'loading: false'
  - question: You can disable the loading on specific pages?
    answers:
      - true
      - false
    correctAnswer: true
  - question: What do you use to programmatically start the loading bar?
    answers:
      - $nuxt.loading.start()
      - $nuxt.loading()
      - $loading.start()
    correctAnswer: $nuxt.loading.start()
  - question: Which property do you use to make your progress bar continuous for when the loading takes longer than the duration?
    answers:
      - "duration: 'continuous'"
      - "loading: 'continuous'"
      - 'continuous: true'
    correctAnswer: 'continuous: true'
  - question: Which two methods are required when creating a custom loading component?
    answers:
      - start() and fail()
      - start() and finish()
      - loading() and finish()
    correctAnswer: start() and finish()
  - question: Once you have created your new loading.vue component how do you use it?
    answers:
      - import it into the layouts page
      - add it in the nuxt.config.js under the loading property
      - add it to the nuxt.config.js under the plugins property
    correctAnswer: add it in the nuxt.config.js under the loading property
  - question: To add a circle spinner when Nuxt.js is in SPA mode what do you add to the loading property?
    answers:
      - 'circle: true'
      - 'spinner: circle'
      - 'name: circle'
    correctAnswer: 'name: circle'
---

De fábrica, Nuxt.js te ofrece su propio componente de barra de progreso de carga que se muestra entre rutas. Puedes personalizarlo, desactivarlo o incluso crear tu propio componente de carga.

## Personalizando la barra de progreso

Entre otras propiedades, el color, tamaño, duracion y dirección de la barra de progreso pueden ser personalizadas para adaptarse a las necesidades de tu aplicación. Esto es logrado actualizando la propiedad `loading` del archivo `nuxt.config.js` con las propiedades correspondientes.

Por ejemplo, para establecer una barra de progreso azul con una altura de 5px, actualizamos `nuxt.config.js` a lo siguiente:

```js
export default {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

Lista de propiedades para personalizar la barra de progreso.

| Llave       | Tipo    | Valor predeterminado | Descripción                                                                                                                                 |     |
| ----------- | ------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| color       | String  | 'black'              | Color CSS de la barra de progreso                                                                                                           |     |
| failedColor | String  | 'red'                | Color CSS de la barra de progreso cuando se agrega un error mientras se renderiza la ruta (Si data o fetch devuelven un error por ejemplo). |     |
| height      | String  | '2px'                | Altura de la barra de progreso (Usado en la propiedad style de la barra de progreso)                                                        |     |
| throttle    | Number  | 200                  | En ms, espera el tiempo especificado antes de mostrar la barra de progreso. Util para prevenir que la barra parpadee.                       |     |
| duration    | Number  | 5000                 | En ms, la duración máxima de la barra de progreso, Nuxt.js asume que la ruta será renderizada antes de 5 segundos.                          |     |
| continuous  | Boolean | false                | Sigue animando la barra de progreso cuando la carga tome más tiempo que la duración.                                                        |     |
| css         | Boolean | true                 | Establecer en falso para eliminar los estilos por defecto de la barra de progreso (Y añadir los propios).                                   |     |
| rtl         | Boolean | false                | Establecer la dirección de la barra de progreso de derecha a izquierda.                                                                     |     |

## Desactivar la barra de progreso

Si no deseas mostrar la barra de progreso entre rutas agrega `loading: false` en tu archivo `nuxt.config.js`:

```js{}[nuxt.config.js]
export default {
  loading: false
}
```

La propiedad loading te ofrece la opción de deshabilitar la barra de progreso de carga predeterminada en una página específica.

```html{}[pages/index.vue]
<template>
  <h1>My page</h1>
</template>

<script>
  export default {
    loading: false
  }
</script>
```

## Iniciando la barra de carga programáticamente

la barra de carga también se puede iniciar programáticamente en tus componentes llamando `this.$nuxt.$loading.start()` para iniciar la barra de carga y para finalizar la `this.$nuxt.$loading.finish()`.

Durante el proceso de montaje del componente de tu página, la propiedad `$loading` puede no estar disponible inmediatamente para acceder a ella. Para evitar esto, si deseas iniciar el cargador en el método `mounted`, asegúrate de envolver tu las llamadas al método `$loading` dentro de `this.$nextTick` como se muestra debajo.

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

## Internos de la barra de progreso

Desafortunadamente, no es posible que el componente Loading sepa de antemano cuánto tiempo tardará la carga de una nueva página. Por lo tanto, no es posible animar con precisión la barra de progreso al 100% del tiempo de carga.

El componente de carga de Nuxt resuelve parcialmente esto al permitirte establecer la `duration`, este debe ser establecido en una estimación de cuando tiempo tardará el proceso de carga. A menos que uses un componente de carga personalizado, la barra de progreso siempre se moverá de 0% a 100% en tiempo `duration` (Independientemente de la progresión actual). Cuando la carga tarda más que el tiempo de `duration`, la barra de progreso permanecerá en 100% hasta que finalice la carga.

Puedes cambiar el comportamiento predeterminado cambiando `continuous` a true, después de alcanzar 100% la barra de progreso comenzará a reducirse al 0% de nuevo en el tiempo especificado en `duration`. Cuando la carga aun no este terminada después de alcanzar el 0% comenzará a crecer de 0% a 100% de nuevo. Esto se repite hasta que finalice la carga.

```js
export default {
  loading: {
    continuous: true
  }
}
```

_Ejemplo de una barra de progreso continua:_

![https://nuxtjs.org/api-continuous-loading.gif](https://nuxtjs.org/api-continuous-loading.gif)

## Usando un componente de carga personalizado

También puedes crear tu propio componente que Nuxt.js llamara en lugar del componente de carga por defecto. Para ello, debes proveer una ruta a tu componente en la opción `loading`. Entonces, tu componente será llamado directamente por Nuxt.js.

Tu componente tiene que exponer algunos de estos métodos:

| Método        | Requerido | Descripción                                                                                  |
| ------------- | --------- | -------------------------------------------------------------------------------------------- |
| start()       | Requerido | Llamado cuando una ruta cambia, aquí es donde tú muestras tu componente.                     |
| finish()      | Requerido | Llamado cuando una ruta es cargada (y datos obtenidos), aquí es donde ocultas tu componente. |
| fail(error)   | Opcional  | Llamado cuando una ruta no pudo ser cargada (por ejemplo no pudo obtener datos).             |
| increase(num) | Opcional  | Llamado durante la carga del componente de ruta, num es un entero < 100.                     |

Puedes crear tu componente personalizado en `components/LoadingBar.vue`:

```html{}[components/LoadingBar.vue]
<template>
  <div v-if="loading" class="loading-page">
    <p>Loading...</p>
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

Luego, actualizas tu `nuxt.config.js` para decirle a Nuxt.js que use tu componente:

```js{}[nuxt.config.js]
export default {
  loading: '~/components/LoadingBar.vue'
}
```

## La propiedad loading indicator

Al ejecutar Nuxt.js en modo SPA, no hay contenido del lado del servidor en la primera carga de página. Por lo tanto, en lugar de mostrar una página en blanco mientras la página se carga, Nuxt.js te da un spinner que puedes personalizar para agregar tus propios colores o fondos e incluso cambiar el indicador.

```js{}[nuxt.config.js]
export default {
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  }
}
```

## Indicadores incorporados

Estos indicadores son importados del asombroso proyecto [Spinkit](http://tobiasahlin.com/spinkit). Puedes consultar su página de demostración para obtener una vista previa de los. Con el fin de utilizar uno de estos spinners, todo lo que tienes que hacer agregar su nombre a la propiedad name. No hay necesidad de importar o instalar nada. Aquí hay una lista de indicadores incorporados que puedes utilizar.

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

Los indicadores incorporados admiten las opciones `color` y `background`.

## Indicadores personalizados

Si necesitas tu propio indicador especial, un valor de cadena o una llave Nombre también puede ser una ruta a una plantilla HTML del código fuente del indicador! Todas las opciones también se pasan a la plantilla.

El [código fuente](https://github.com/nuxt/nuxt.js/tree/dev/packages/vue-app/template/views/loading) de incorporados esta tambien disponible si necesitas una base!

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
