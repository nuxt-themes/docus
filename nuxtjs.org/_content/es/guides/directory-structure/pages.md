---
title: páginas
description: El directorio de `pages` (páginas) contiene las vistas y rutas de la aplicación. Nuxt.js se encarga de leer todos los archivos de `.vue` dentro de este directorio, y automáticamente crea la configuración de las rutas por ti.
position: 10
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/11_pages?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: ¿En cuál directorio puedes poner un componente de página?
    answers:
      - views
      - pages
      - vues
    correctAnswer: pages
  - question: Para crear rutas manualmente, necesitas configurar el archivo router.js.
    answers:
      - cierto
      - falso
    correctAnswer:
  - question: Puedes crear rutas de archivos con la extensión `.js` o `.ts`.
    answers:
      - cierto
      - falso
    correctAnswer: cierto
  - question: ¿Cuándo se llama la propiedad asyncData?
    answers:
      - Antes de cargar el componente
      - Mientras se carga el componente
      - Luego de cargar el componente
    correctAnswer: Antes de cargar el componente
  - question: ¿En qué propiedad se añaden los meta tags?
    answers:
      - head
      - meta
      - metaTags
    correctAnswer: head
  - question: ¿Cuál propiedad se usa para añadir un layout diferente a una página?
    answers:
      - layouts
      - page
      - layout
    correctAnswer: layout
  - question: ¿Cómo puedes configurar la propiedad de scrollTop si quieres que Nuxt.js desplace al tope de la página cuando muestra la ruta hijo?
    answers:
      - "scrollToTop: 'scroll'"
      - 'scrollToTop: true'
      - "scroll: 'top'"
    correctAnswer: 'scrollToTop: true'
  - question: ¿Cómo puedes añadir el middleware/auth.js a tu página?
    answers:
      - 'middleware: true'
      - "middleware: 'auth'"
      - "import auth from 'middleware/auth.js'"
    correctAnswer: "middleware: 'auth'"
  - question: ¿Qué propiedad se usa para configurar un visualizador (watcher), para los `query strings`?
    answers:
      - watcher
      - queryWatcher
      - watchQuery
    correctAnswer: watchQuery
  - question: Visualizar (watching) está deshabilitado por defecto.
    answers:
      - cierto
      - falso
    correctAnswer: cierto
---

El directorio de `pages` (páginas) contiene las vistas y rutas de la aplicación. Nuxt.js se encarga de leer todos los archivos de `.vue` dentro de este directorio, y automáticamente crea la configuración de las rutas por ti.

<base-alert type="info">

También puedes crear rutas de archivos con la extensión `.js` o `.ts`.

</base-alert>

Every Page component is a Vue component but Nuxt.js adds special attributes and functions to make the development of your universal application as easy as possible.

Cada componente de página es un componente de Vue, pero Nuxt.js añade atributos especiales y funciones para hacer que el desarrollo de tu aplicación universal sea más fácil.

```html{}[pages
<template>
  <h1 class="red">Hola {{ name }}!</h1>
</template>

<script>
  export default {
    // Las propiedades de la página van aquí
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

## Páginas Dinámicas

Puedes crear páginas dinámicas cuando no sabes el nombre de la página si viene desde un API o no quieres crear la misma página una y otra vez. Para crear una página dinámica, tienes que añadir un _underscore_ (`_`) antes del nombre del archivo `.vue` o luego del nombre del directorio, si quieres que el directorio sea dinámico. Puedes nombrar ambos como quieras, pero asegúrate de que le pongas el _underscore_ de prefijo.

Si defines un archivo llamado `_slug.vue` en tu directorio de `pages`, puedes accesar el valor usando el `context` con `params.slug`

```html{}[pages/_slug.vue]
<template>
  <h1>{{ this.slug }}</h1>
</template>

<script>
  export default {
    async asyncData({ params }) {
      const slug = params.slug // Cuando llamas /abc, el slug va a ser "abc"
      return { slug }
    }
  }
</script>
```

Si defines un archivo llamado \_slug.vue dentro de un directorio llamado \_book.vue puedes accesar el valor valor usando el `context` con `params.slug` y `params.book`

```html{}[pages/_book/_slug.vue]
<template>
  <h1>{{ this.book }} / {{ this.slug }}</h1>
</template>

<script>
  export default {
    async asyncData({ params }) {
      const book = params.book
      const slug = params.slug
      return { book, slug }
    }
  }
</script>
```

## Propiedades

### asyncData

AsyncData se ejecuta antes de cargar el componente. Puede ser asincrono, y recibe el contexto como argumento. El objeto que retorna será unido con el objeto de la data.

```js{}[pages/index.vue]
export default {
  asyncData (context) {
    return { name: 'World' }
  }
```

<base-alert type="next">

Aprende mas de cómo funciona asyncData en nuestro capítulo de [Data Fetching](/docs/2.x/features/data-fetching#async-data)

</base-alert>

### fetch

Cada vez que necesites buscar data asincrona, puedes usar `fetch`. Fetch se ejecuta en el lado del servidor cuando se muestran las rutas, y en el lado del cliente (client-side) cuando el usuario navega la aplicación.

```html
<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    async fetch() {
      this.posts = await fetch('https://api.nuxtjs.dev/posts').then(res =>
        res.json()
      )
    }
  }
</script>
```

<base-alert type="next">

Conoce más sobre cómo `fetch` funciona en nuestro capítulo de [Data Fetching](/docs/2.x/features/data-fetching)

</base-alert>

### head

Puedes configurar un <meta> tag específico para la página actual. Nuxt.js usa `vue-meta` para actualizar el encabezado del documento y los `meta` attributes de tu aplicación.

```js{}[pages/index.vue]
export default {
  head() {
    // Configura los meta tags para esta página
  }
}
```

<base-alert type="next">

Conoce mas en nuestro capítulo de [Meta Tags y SEO](/docs/2.x/features/meta-tags-seo).

</base-alert>

### layout

Se usa para especificar un `layout` definido en el directorio de layouts.

```js{}[pages/index.vue]
export default {
  layout: 'blog'
}
```

<base-alert type="next">

Conoce mas en nuestro capítulo de [Vistas](/docs/2.x/concepts/views#layouts).

</base-alert>

### loading

Si esta propiedad tiene un valor de `false`, previene la página de ejecutar `this.$nuxt.$loading.finish()` automáticamente cuando entras a ella y `this.$nuxt.$loading.start()` cuando te vas. Esto te permite controlar el comportamiento de la página manualmente, como se muestra en [este ejemplo](/examples/custom-loading-component).

```js{}[pages/index.vue]
export default {
  loading: false
}
```

<base-alert type="info">

Sólo aplica si `loading` está configurado también en el `nuxt.config.js`

</base-alert>

<base-alert type="next">

Conoce más sobre esto en el capítulo de [Loading](/docs/2.x/features/loading).

</base-alert>

### transition

La propiedad de transición define una transición específica para la página.

```js{}[pages/index.vue]
export default {
  transition: 'fade'
}
```

<base-alert type="next">

Conoce más sobre transiciones en el capítulo de [Transiciones](/docs/2.x/features/transitions).

</base-alert>

### scrollToTop

La propiedad de `scrollToTop` te permite decirle a Nuxt.js que se desplace hacia el tope de la página antes de que se muestre. Nuxt.js desplaza la página hacia el tope por defecto, pero en rutas internas, Nuxt.js mantiene la posición de desplazamiento (scroll position). Si deseas que Nuxt se desplaze al tope cuando muestre las rutas internas, configura `scrollToTop` a cierto (`true`).

```js{}[pages/index.vue]
export default {
  scrollToTop: true
}
```

También puedes configurar `scrollToTop` a falso manualmente en las rutas externas (parent routes), si deseas.

Si quieres sobre escribir el comportamiento de desplazamiento (scroll) de Nuxt.js, puedes navegar a [opción de scrollBehavior](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior)

### middleware

Puedes definir `middleware` para cada página. El `middleware` se ejecuta antes de que una página se muestre.

```js{}[pages/index.vue]
export default {
  middleware: 'auth'
}
```

<base-alert type="next">

Conoce más sobre este tema en el capítulo de [Middleware](/docs/2.x/directory-structure/middleware).

</base-alert>

### La propiedad de watchQuery

Esta propiedad se usa para configurar un observador para los `query strings`. Si el string definido cambia, todos los metodos de los componentes (asyncData, fetch, validate, layout, ...) se ejecutarán. El observador está disabilitado por defacto para mejorar la rapidéz de las páginas

```js{}[pages/index.vue]
export default {
  watchQuery: ['page']
}
```

<base-alert type="info">

Si quieres configurar un observador (watcher) para todos los `query strings`, establece el valor de `watchQuery` a que sea cierto (`true`).

</base-alert>

```js{}[pages/index.vue]
export default {
  watchQuery: true
}
```

También puedes usar la función de `watchQuery(newQuery, oldQuery)` para tener observadores más específicos.

```js{}[pages/index.vue]
export default {
  watchQuery(newQuery, oldQuery) {
    // Solo ejecuta métodos de los componentes si el `query string` viejo contenía `bar`
    // y el nuevo, contiene `foo`
    return newQuery.foo && oldQuery.bar
  }
}
```

<base-alert type="next">

Conóce mas sobre usar datos desde un API en este capítulo [Data Fetching](/docs/2.x/features/data-fetching).

</base-alert>

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

## Ignorando páginas

Si deseas ignorar páginas para que estas no sean incluídas en el archivo `router.js`, puedes ignorarlas poniéndole un prefijo con `-`.

Por ejemplo, `pages/-about.vue` será ignorado.

<base-alert type="next">

Conóce mas sobre éste tema en el siguiente enlace: [ignore option](/docs/2.x/configuration-glossary/configuration-ignore).

</base-alert>

## Configuración

Puedes renombrar el directorio de páginas (`pages`) a algo totalmente diferente si configuras la opción de `dir.pages`:

```js{}[nuxt.config.js]
export default {
  dir: {
    // Renombrando el directorio de `pages` a `routes`
    pages: 'routes'
  }
}
```

<base-alert type="next">

Conoce más sobre esto en el siguiente enlace: [dir option](/docs/2.x/configuration-glossary/configuration-dir).

</base-alert>

<quiz :questions="questions"></quiz>
