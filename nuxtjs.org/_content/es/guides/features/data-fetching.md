---
title: Obtener Datos
description: En In Nuxt.js tenemos 2 maneras de obtener datos de una api. Podemos usar el método fetch o el método asyncData.
position: 4
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/04_data_fetching?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Where can you use the Nuxt.js fetch hook?
    answers:
      - pages and components
      - only in pages
      - only in components
    correctAnswer: pages and components
  - question: You have access to this when you use the Nuxt.js fetch hook
    answers:
      - true
      - false
    correctAnswer: true
  - question: When is the Nuxt.js fetch hook is called?
    answers:
      - after the component instance
      - before the component instance
      - during the component instance
    correctAnswer: after the component instance
  - question: Which allows you to display a placeholder when `fetch` is being called *on client-side?*
    answers:
      - $fetchState.timestamp
      - $fetchState.error
      - $fetchState.pending
    correctAnswer: $fetchState.pending
  - question: How do you save fetch calls on pages you have already visited?
    answers:
      - keep-alive
      - save-fetch
      - cache-fetch
    correctAnswer: keep-alive
  - question: In the activated hook which property do you use to add a 30 second cache to fetch?
    answers:
      - $fetchState.pending
      - $fetchState.timestamp
      - $fetchState.cache
    correctAnswer: $fetchState.timestamp
  - question: When is `asyncData` called?
    answers:
      - after loading the page component
      - during loading the page component
      - before loading the page component
    correctAnswer: before loading the page component
  - question: You have access to `this` inside asyncData
    answers:
      - true
      - false
    correctAnswer: false
  - question: With asyncData you can use the `context` parameter to access dynamic route data
    answers:
      - true
      - false
    correctAnswer: true
  - question: You have access to the error statusCode in asyncData
    answers:
      - true
      - false
    correctAnswer: true
---

En Nuxt.js tenemos 2 maneras de obtener datos de una api. Podemos usar el método fetch o el método asyncData.

## El hook fetch

<base-alert type="info">

Este hook está disponible solo para Nuxt `2.12+`.

</base-alert>

El hook `fetch` de Nuxt.js es llamado después que la instancia del componente es creada en el servidor: `this` esta disponible dentro.

```js
export default {
  async fetch() {
    console.log(this)
  }
}
```

<base-alert>

`fetch(context)` ha sido deprecado, en lugar puedes usar un [middleware anonimo](/docs/2.x/directory-structure/middleware#anonymous-middleware) en tu página: `middleware(context)`

</base-alert>

### ¿Cuando usar fetch?

Cada vez que necesites obtener datos asincrónicos. 'fetch' se llama en el lado del servidor al renderizar la ruta y en el lado del cliente al navegar.

Este expone '\$fetchState' en el nivel de componente con las siguientes propiedades:

- 'pending' es un 'Boolean', le permite mostrar un marcador de posición cuando 'fetch' es llamado _en el lado del cliente_.
- 'error' es 'null' o 'Error' y te permite mostrar un mensaje de error
- 'timestamp' es un timestamp de la última llamada fetch, útil para [caching con 'keep-alive'](#caching)

También tienes acceso a `this.$fetch()`, de gran ayuda si quieres llamar al hook `fetch`in tu componente.

```html{}[components/NuxtMountains.vue]
<template>
  <p v-if="$fetchState.pending">Fetching mountains...</p>
  <p v-else-if="$fetchState.error">An error occured :(</p>
  <div v-else>
    <h1>Nuxt Mountains</h1>
    <ul v-for="mountain of mountains">
      <li>{{ mountain.title }}</li>
    </ul>
    <button @click="$fetch">Refresh</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mountains: []
      }
    },
    async fetch() {
      this.mountains = await fetch(
        'https://api.nuxtjs.dev/mountains'
      ).then(res => res.json())
    }
  }
</script>
```

<base-alert type="info">

Puedes acceder a Nuxt [context](/docs/2.x/concepts/context-helpers) dentro del hook fetch usando `this.$nuxt.context`.

</base-alert>

### Opciones

`fetchOnServer`: `Boolean` or `Function` (default: `true`), llama a `fetch()` cuando se renderiza la página en el servidor.

`fetchDelay`: `Integer` (default: `200`), establece el tiempo mínimo de ejecución en milisegundos (para evitar parpadeos rápidos)

Cuando `fetchOnServer` es falso (`false` o devuelve `false`), `fetch` se llamará sólo en el lado del cliente y `$fetchState.pending` devolverá `true` al renderizar el componente en el servidor.

```js
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
  },
  // call fetch only on client-side
  fetchOnServer: false
}
```

### Escuchando cambios en query string

El hook `fetch` no se llama en los cambios de query string por defecto. Para observar los de la query, puedes agregar un observador en `$route.query` y llamar a `$fetch`:

```js
export default {
  watch: {
    '$route.query': '$fetch'
  },
  async fetch() {
    // Called also on query changes
  }
}
```

### Caching

Puedes usar la directiva `keep-alive` en los componentes `<nuxt/>` y `<nuxt-child/>` para guardar llamadas `fetch` en páginas que ya has visitado:

```html{}[layouts/default.vue]
<template>
  <nuxt keep-alive />
</template>
```

Puedes también especificar las [propiedades](https://vuejs.org/v2/api/#keep-alive) pasadas a `<keep-alive>` pasando una propiedad `keep-alive-props` al componente `<nuxt>`.

```html{}[layouts/default.vue]
<nuxt keep-alive :keep-alive-props="{ max: 10 }" />
```

Mantiene solo 10 paginas de componentes en memoria.

### Usando el hook `activated` hook

Nuxt directamente va a llenar `this.$fetchState.timestamp`  (timestamp) de la ultima llamada `fetch` (ssr incluido). Puedes usar esta propiedad combinada con el hook `activated` para agregar 30 segundos de cache a `fetch`:

```html{}[pages/posts/_id.vue]
<template> ... </template>

<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    activated() {
      // Call fetch again if last fetch more than 30 sec ago
      if (this.$fetchState.timestamp <= Date.now() - 30000) {
        this.$fetch()
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

La navegación a la misma page no llamara a `fetch` si la última llamada `fetch` fue hace 30 segundos.

## Async Data

<base-alert>

`asyncData` solamente está disponible para [paginas](/docs/2.x/directory-structure/pages) y no tienes acceso a `this` dentro de este hook.

</base-alert>

La principal diferencia con `fetch` es que no tienes que manejar ningún estado pendiendo o de error. Nuxt va a esperar por el hook `asyncData` para ser terminado antes de navegar a la página siguiente o mostrar la [pagina de error](/docs/2.x/directory-structure/layouts#error-page))

Este hook recibe [el contexto](/docs/2.x/concepts/context-helpers) como primer argumento. Puedes usarlo para obtener algunos datos y Nuxt.js automáticamente combinara el objeto devuelto con los datos del componente.

```html{}[pages/index.vue]
<template>
  <h1>{{ project }}</h1>
</template>

<script>
  export default {
    async asyncData(context) {
      return {
        project: 'nuxt'
      }
    }
  }
</script>
```

En los próximos ejemplos, estamos usando [@nuxt/http](https://http.nuxtjs.org/) el cual recomendamos para obtener datos de una API.

Primero, necesitamos instalarlo:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @nuxt/http
```

  </code-block>
  <code-block label="npm">

```bash
npm install @nuxt/http
```

  </code-block>
</code-group>

Despues, añadirlo a nuestra section `modules` de nuestro archivo `nuxt.config.js`:

```js{}[nuxt.config.js]
export default {
  modules: ['@nuxt/http']
}
```

```html{}[pages/posts/_id.vue]
<template>
  <div>
    <h1>{{ post.title }</h1>
    <p>{{ post.description }}</p>
  </div>
</template>

<script>
  export default {
    async asyncData({ params, $http }) {
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
      return { post }
    }
  }
</script>
```

### Escuchando cambios query string

El método `asyncData` no es llamado en cambios de query por defecto. Si quieres cambiar este comportamiento, por ejemplo cuando estás construyendo un componente de paginación, puedes establecer parámetros que deben ser escuchados con la propiedad `watchQuery` de la página de tu componente.

<base-alert type="next">

Lee mas acerca de la [propiedad watchQuery](/docs/2.x/components-glossary/pages-watchquery) y mira la lista de [llaves en contexto](/docs/2.x/concepts/context-helpers) disponibles.

</base-alert>

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
