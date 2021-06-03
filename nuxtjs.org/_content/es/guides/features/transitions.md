---
title: Transiciones
description: Nuxt.js usa el componente `<transition>` para que puedas crear transiciones/animaciones increíbles entre tus rutas.
position: 10
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/05_transitions?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: To define a custom transition for a specific route what key do you add to your page?
    answers:
      - pageTransition
      - transition
      - layoutTransition
    correctAnswer: transition
  - question: What is the default transition mode in Nuxt.js?
    answers:
      - in-out
      - out-in
      - none
    correctAnswer: out-in
  - question: What is the default transition name for transitions on pages?
    answers:
      - .page
      - .pages
      - .page-transition
    correctAnswer: .page
  - question: Where is the best place to add your CSS transition classes so you have global transitions on all routes?
    answers:
      - index.vue
      - A global css file
      - layouts/default.vue
    correctAnswer: A global css file
  - question: In which array in the nuxt.config.js file do you add your global stylesheet?
    answers:
      - 'css: []'
      - 'styles: []'
      - 'transitions: []'
    correctAnswer: 'css: []'
  - question: What is the default css class for layout transitions?
    answers:
      - layout
      - layout-transition
      - transition
    correctAnswer: layout
  - question: In the nuxt.config.js file what is the property you use to configure the default settings for layout transitions?
    answers:
      - layout
      - layoutTransition
      - layoutTransitions
    correctAnswer: layoutTransition
  - question: If you change the default layout to be called 'my-layout' what class do you use to create the css transitions?
    answers:
      - layout
      - my-layout
      - myLayout
    correctAnswer: my-layout
  - question: In the nuxt.config.js file what is the property you use to configure the default settings for page transitions?
    answers:
      - page
      - pageTransition
      - layoutTransition
    correctAnswer: pageTransition
  - question: Where do you modify the default settings for your page transitions?
    answers:
      - main.css
      - pages.vue
      - nuxt.config.js
    correctAnswer: nuxt.config.js
---

Nuxt.js usa el [componente transición](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) para que puedas crear transiciones/animaciones increíbles entre tus rutas.

Para definir una transición personalizada para una ruta específica, agrega la llave `transition` al componente de la página.

```js{}[pages/index.vue]
export default {
  // Can be a String
  transition: ''
  // Or an Object
  transition: {}
  // or a Function
  transition (to, from) {}
}
```

## String

Si la llave `transition` es establecida como un string, sera usada como `transition.name`.

```js{}[pages/index.vue]
export default {
  transition: 'home'
}
```

Nuxt.js usará estas configuraciones para establecer el componente de la siguiente manera:

```html{}[pages/index.vue]
<transition name="home"></transition>
```

<base-alert>

Esto es automaticamente hecho para ti y no necesitas añadir el componente `<transition>` a tus paginas o layouts.

</base-alert>

Ahora todo lo que tienes que hacer es crear la nueva clase para tu transición.

```html{}[pages/index.vue]
<styles>
  .home-enter-active, .home-leave-active { transition: opacity .5s; }
  .home-enter, .home-leave-active { opacity: 0; }
</styles>
```

## Objeto

Si la llave `transition` es establecida como un objeto:

```js{}[pages/index.vue]
export default {
  transition: {
    name: 'home',
    mode: 'out-in'
  }
}
```

Nuxt.js usará estas configuraciones para establecer el componente de la siguiente manera:

```html{}[pages/index.vue]
<transition name="test" mode="out-in"></transition>
```

El objeto `transition` puede tener muchas propiedades como name, mode, css, duration y muchas otras. Por favor ver la documentación de vue para más información.

También puedes definir métodos en la propiedad `transition` de la página, para más información sobre los [JavaScript hooks](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks) ver la documentación de vue.

```js
export default {
  transition: {
    afterLeave(el) {
      console.log('afterLeave', el)
    }
  }
}
```

### Modo de transición

<base-alert>

El modo de transición predeterminado para las páginas difiere del modo predeterminado en Vue.js. El modo `transition` es por defecto establecido en `out-in`. Si tu quieres correr transiciones de salida y entrada simultáneamente, tienes que establecer el modo a una cadena vacía `mode: ''`.

</base-alert>

```js{}[pages/index.vue]
export default {
  transition: {
    name: 'home',
    mode: ''
  }
}
```

## Función

Si la llave `transition` es establecida como una función:

```js{}[pages/index.vue]
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

`/` a `/posts` => `slide-left`,`/posts` a `/posts?page=3` => `slide-left`,`/posts?page=3` a `/posts?page=2` => `slide-right`.

## Configuraciones globales

El nombre de la transición global de Nuxt.js es `"page"`. Para añadir una transición fade a cada página de tu aplicación, todo lo que necesitas es un archivo CSS que es compartido a lo largo de todas tus rutas.

Nuestro css global en `assets/main.css`:

```css{}[assets/main.css]
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
```

Luego añadimos su ruta al array `css`en nuestro archivo `nuxt.config.js`:
Then we add its path to the `css` array in our `nuxt.config.js` file:

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/main.css']
}
```

## Ajustes de configuración

## La propiedad layoutTransition

La transición de layout es usada para establecer las propiedades predeterminadas de las transiciones del layout.

Las configuraciones predeterminadas para las transiciones de layout son:

```js
{
  name: 'layout',
  mode: 'out-in'
}
```

```js{}[assets/main.css]
.layout-enter-active, .layout-leave-active {
  transition: opacity .5s
}
.layout-enter, .layout-leave-active {
  opacity: 0
}
```

Si quieres cambiar la configuración predeterminada para tus transiciones de layout puedes hacerlo en el archivo nuxt.config.js.

```js{}[nuxt.config.js]
export default {
  layoutTransition: 'my-layouts'
  // or
  layoutTransition: {
    name: 'my-layouts',
    mode: 'out-in'
  }
}
```

```css{}[assets/main.css]
.my-layouts-enter-active,
.my-layouts-leave-active {
  transition: opacity 0.5s;
}
.my-layouts-enter,
.my-layouts-leave-active {
  opacity: 0;
}
```

## La propiedad pageTransition

La configuración predeterminada para transiciones de página son:

```js
{
  name: 'page',
  mode: 'out-in'
}
```

Si deseas modificar la configuración por predeterminada, puedes hacerlo en nuxt.config.js

```js{}[nuxt.config.js]
export default {
  pageTransition: 'my-page'
  // or
  pageTransition: {
    name: 'my-page',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Before enter...');
    }
  }
}
```

Si modificas el nombre de la Transición de la página, tambien tendras que renombrar la clase css.

```css{}[assets/main.css]
.my-page-enter-active,
.my-page-leave-active {
  transition: opacity 0.5s;
}
.my-page-enter,
.my-page-leave-to {
  opacity: 0;
}
```

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
