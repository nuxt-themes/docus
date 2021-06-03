---
title: Contexto y Ayudantes
description: El contexto provee información *adicional* y a menudo opcional sobre la solicitud actual de la aplicación.
position: 2
category: concepts
csb_link_context: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-context?fontsize=14&hidenavigation=1&theme=dark
csb_link_helpers: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-helpers?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/context.svg
imgAlt: nuxt-js-context-keys
questions:
  - question: Cuál es la razón de ser del contexto?
    answers:
      - SSR
      - Poseer un estado global
      - Laziness
    correctAnswer: SSR
  - question: Qué clave no se encuentra en el contexto?
    answers:
      - env
      - isDev
      - $store
    correctAnswer: $store
  - question: Qué clave se encuentra disponible sólo del lado del servidor?
    answers:
      - from
      - app
      - req
    correctAnswer: req
  - question: Qué clave se encuentra disponible sólo del lado del cliente?
    answers:
      - from
      - res
      - app
    correctAnswer: from
  - question: Qué es lo que el ayudante `$nuxt` no puede hacer?
    answers:
      - Mostrar la versión de Nuxt
      - Proveer información sobre el estado de conexión a Internet de los usuarios
      - Acceder a funciones expuestas de módulos
    correctAnswer: Mostrar la versión de Nuxt
  - question: Cuáles son los nombres de los ayudantes del proceso?
    answers:
      - global, client y server
      - server, client y static
      - ssr, spa y static
    correctAnswer: server, client and static
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

El objeto `context` se encuentra disponible en funciones específicas de Nuxt como [asyncData](/docs/2.x/features/data-fetching#async-data), [plugins](/docs/2.x/directory-structure/plugins), [middleware](/docs/2.x/directory-structure/middleware) y [nuxtServerInit](/docs/2.x/directory-structure/store#the-nuxtserverinit-action). Provee información _adicional_ y a menudo opcional sobre la solicitud actual de la aplicación.

Primero y principal, el contexto es usado para proveer acceso a otras partes de la aplicación Nuxt.js, ej. el `store` de Vuex o la instancia subyacente de `connect`. Así, tenemos los objetos `req` y `res` en el contexto disponibles del lado del servidor y el `store` siempre disponible. Pero con el tiempo, el contexto fue ampliado con muchas otras variables de ayuda y atajos. Ahora tenemos acceso a funcionalidades HMR en modo `development`, el actual `route`, page `params` y `query`, como tambien la opción de acceder a las variables de entorno a través del contexto. Además, funciones de módulos y ayudantes pueden ser expuestas a través del contexto para estar disponibles en ambos lados - el del cliente y el del servidor -

**Claves de contexto predeterminadas**

```js
function (context) { // Could be asyncData, nuxtServerInit, ...
  // Always available
  const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error,
    $config
  } = context

  // Only available on the Server-side
  if (process.server) {
    const { req, res, beforeNuxtRender } = context
  }

  // Only available on the Client-side
  if (process.client) {
    const { from, nuxtState } = context
  }
}
```

<base-alert>

El _contexto_ al que nos referimos aquí no debe confundirse con el objeto `context` disponible en [Acciones de Vuex](https://vuex.vuejs.org/guide/actions.html) o aquel disponible en la función `build.extend` del archivo `nuxt.config.js`. Ninguno de ellos se encuentra relacionado!

</base-alert>

Aprende más sobre las diferentes claves del contexto in nuestro [Glosario Interno](/docs/2.x/internals-glossary/context)

## Ejemplos

### Usa los parámetros de página con tu API de consulta

El contexto expone directamente posibles parámetros dinámicos de la ruta a través de `context.params`. En el siguiente ejemplo, llamamos una API a través del módulo `nuxt/http` usando un parámetro dinámico de página como parte de la URL. Módulos, como [nuxt/http](https://http.nuxtjs.org/) pueden exponer sus propias funciones, lo cual las hace disponibles a través del objeto [context.app](http://context.app)

```js{}[pages/posts/_id.vue]
export default {
  async asyncData(context) {
    const id = context.params.id
    try {
      // Using the nuxtjs/http module here exposed via context.app
      const post = await context.app.$http.$get(
        `https://api.nuxtjs.dev/posts/${id}`
      )
      return { post }
    } catch (e) {
      context.error(e) // Show the nuxt error page with the thrown error
    }
  }
}
```

Con [ES6](https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/) puede usar esta sintaxis para destructurar tu objeto `context`. Pasando los objetos a los cuales desea acceder para luego referenciarlos en el código sin usar la palabra `context`.

```js{}[pages/posts/_id.vue]
export default {
  async asyncData({ params, $http, error }) {
    const id = params.id

    try {
      // Using the nuxtjs/http module here exposed via context.app
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${id}`)
      return { post }
    } catch (e) {
      error(e) // Show the nuxt error page with the thrown error
    }
  }
}
```

Le gustaría usar parámetros query en su lugar? Entonces vea [context.query.id](/docs/2.x/internals-glossary/context#query)

### Redireccionando usuarios & accediendo al store

Acceder al store de Vuex (cuando está configurado a través del directorio `store`) es también posible a través del contexto. Éste provee un objeto `store` el cual puede ser tratado como `this.$store` en los componentes Vue. Adicionalmente, usamos el método `redirect`, un ayudante expuesto en el contexto, para redireccionar al usuario en caso de que el estado de `authenticated` sea falso.

```js
export default {
  middleware({ store, redirect }) {
    // retrieving keys via object destructuring
    const isAuthenticated = store.state.authenticated
    if (!isAuthenticated) {
      return redirect('/login')
    }
  }
}
```

<app-modal>
  <code-sandbox  :src="csb_link_context"></code-sandbox>
</app-modal>

## Ayudantes

Además de atajos, en el contexto también existen otros pequeños ayudantes en su aplicación Nuxt.js

## `$nuxt`: El ayudante Nuxt.js

`$nuxt` es un ayudante designado a mejorar la experiencia de usuario y a ser una vía de escape en algunas situaciones. Es accesible a través de `this.$nuxt` en los componentes Vue y por otra parte, a través de `window.$nuxt` del lado cliente.

### Comprobador de conexión

El ayudante `$nuxt` brinda una forma rápida de averiguar si la conexión a Internet de un usuario está presente o no. Exponiendo los valores buleanos de `isOffline` e `isOnline`. Podemos usarlos para mostrar un mensaje tan pronto como el usuario esté offline (por ejemplo).

```html{}[layouts/default.vue]
<template>
  <div>
    <div v-if="$nuxt.isOffline">You are offline</div>
    <Nuxt />
  </div>
</template>
```

### Acceder a la instancia root

Además de brindar características DX/UX, el ayudante `$nuxt` también provee un atajo a la instancia root de tu aplicación para cada componente. Pero eso no es todo - también puedes acceder al ayudante `$nuxt` a través de `window.$nuxt` lo cual permite su uso como vía de escape para ganar acceso los métodos del módulo como `$axios` por fuera del componente Vue. Esto debe usarse con prudencia y **sólo como último recurso**

### Actualizar datos de la página

Cuando quieras actualizar los datos de la página actual para el usuario, no querrás recargarla por completo haciendo una nueva llamada al servidor y re-inicializando toda la aplicación Nuxt.js. En cambio, podrías refrescar sólo los datos, provistos por `asyncData` o `fetch`.

Puedes hacerlo utilizando `this.$nuxt.refresh()`!

```html
<template>
  <div>
    <div>{{ content }}</div>
    <button @click="refresh">Refresh</button>
  </div>
</template>

<script>
  export default {
    asyncData() {
      return { content: 'Created at: ' + new Date() }
    },
    methods: {
      refresh() {
        this.$nuxt.refresh()
      }
    }
  }
</script>
```

### Controlando la barra de progreso

Con `$nuxt`, puedes también controlar la barra de progreso de carga de programáticamente a través de `this.$nuxt.$loading`.

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

Aprende más en el [capítulo característica de carga](../features/loading)

## Ayudante onNuxtReady

Si quieres correr algunas scripts _despues_ de que tu aplicación Nuxt.js se haya cargado completamente, puedes usar la función `window.onNuxtReady`. Esto puede resultar útil cuando lo que quieres es ejecutar una función del lado cliente sin estirar el tiempo necesario para interactuar con tu sitio.

```js
window.onNuxtReady(() => {
  console.log('Nuxt.js is ready and mounted')
})
```

## Ayudantes de proceso

Nuxt.js inyecta tres valores buleanos dentro del objeto global `process`. Lo cual te ayudará a determinar si tu aplicación se renderizó en el servidor o completamente en el cliente, además de comprobar la generacion de sitio estático. Estos ayudantes se encuentran disponibles en tu aplicación y se usan comúnmente en el código de `asyncData`.

```html{}[pages/about.vue]
<template>
  <h1>Estor renderizado del lado del {{ renderedOn }}</h1>
</template>

<script>
  export default {
    asyncData() {
      return { renderedOn: process.client ? 'cliente' : 'servidor' }
    }
  }
</script>
```

En el ejemplo, `renderedOn` evaluará `'server'` cuando se esté usuando SSR y un usuario acceda directamente a la página. Cuando el usuario llegue a la página desde otra parte de la aplicación, ej.: cliqueando en un `<NuxtLink>`, el cliente es quien será evaluado.

<app-modal>
  <code-sandbox  :src="csb_link_helpers"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
