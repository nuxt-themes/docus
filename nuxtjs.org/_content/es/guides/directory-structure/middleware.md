---
title: middleware
description: El directorio de `middleware` contiene el middleware de la aplicación. El middleware te permite definir funciones customizadas que pueden ejecutarse antes que se muestre alguna página o grupos de páginas (layout).
position: 8
category: directory-structure
csb_link_anonymous: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/09_middleware_anonymous?fontsize=14&hidenavigation=1&theme=dark
csb_link_named: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/09_middleware_named?fontsize=14&hidenavigation=1&theme=dark
csb_link_router: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/09_middleware_router?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Middleware te permite definir funciones que pueden ejecutarse
      - antes de mostrar una página
      - mientras se muestra una página
      - luego de mostrar una página
    correctAnswer: antes de mostrar una página
  - question: ¿En qué directorio podemos poner los middlewares?
    answers:
      - middleware
      - shared-middleware
      - shared
    correctAnswer: middleware
  - question: ¿Qué argumento `middleware` puede recibir como primer argumento?
    answers:
      - req
      - res
      - context
    correctAnswer:
  - question: ¿En modo universal, cuándo se ejecuta el middleware?
    answers:
      - en el lado del servidor (server side) durante el primer llamado, y en el lado del servidor mientras navegas entre páginas
      - en el lado del cliente (client side) durante el primer llamado, y en el lado del cliente mientras navegas entre páginas
      - en el lado del servidor (server side) durante el primer llamado, y en el lado del cliente mientras navegas entre páginas
    correctAnswer: en el lado del servidor (server side) durante el primer llamado, y en el lado del cliente mientras navegas entre páginas
  - question: ¿En modo SPA, cuando se ejecuta el middleware?
    answers:
      - en el lado del servidor (server side) durante el primer llamado, y en el lado del servidor mientras navegas entre páginas
        - en el lado del cliente (client side) durante el primer llamado, y en el lado del cliente mientras navegas entre páginas
        - en el lado del servidor (server side) durante el primer llamado, y en el lado del cliente mientras navegas entre páginas
    correctAnswer: en el lado del cliente (client side) durante el primer llamado, y en el lado del cliente mientras navegas entre páginas
  - question: ¿En qué orden se ejecuta el middleware?
    answers:
      - matched pages ⇒  matched layouts ⇒ nuxt.config.js
      - nuxt.config.js ⇒ matched layouts ⇒ matched pages
      - matched layouts ⇒ matched pages ⇒ nuxt.config.js
    correctAnswer: nuxt.config.js ⇒ matched layouts ⇒ matched pages
  - question: ¿Qué valor podemos usar para añadir el middleware a cada ruta?
    answers:
      - middleware.router
      - router.middleware
      - routes.middleware
    correctAnswer: router.middleware
  - question: ¿Es posible añadir varios middleware a una página o layout?
    answers:
      - cierto
      - falso
    correctAnswer: cierto
  - question: ¿Cómo puedes añadir este middleware a tu página (`middleware/authenticated.js`)?
    answers:
      - 'middleware: authenticated'
      - 'middleware: true'
      - "middleware: 'authenticated'"
    correctAnswer: "middleware: 'authenticated'"
  - question: ¿Cómo puedes usar middleware anónimo, sólo para una página específica?
    answers:
      - creando un middleware con nombre y grabándolo en el directorio de middleware
      - creando una función de middleware en el componente de página
      - añadiendo un archivo `_.vue` en el directorio de middleware
    correctAnswer: creando una función de middleware en el componente de página
---

El directorio de `middleware` contiene el middleware de la aplicación. El middleware te permite definir funciones customizadas que pueden ejecutarse antes que se muestre alguna página o grupos de páginas (layout).

El middleware compartido debería estar localizado en el directorio de `middleware/`. El nombre del archivo será el nombre del middleware (`middleware/auth.js` será `auth` middleware). También puedes definir middleware específico para una página usando una función directa, lee más sobre esto en [anonymous middleware](/docs/2.x/components-glossary/pages-middleware#anonymous-middleware).

Un middleware recibe [el context](/docs/2.x/internals-glossary/context) como primer argumento.

```js{}[middleware/user-agent.js]
export default function (context) {
  // Añade la propiedad de userAgent dentro del contexto `context`
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

En modo universal, los middlewares se ejecutan una sola vez, desde el lado del servidor `client side` (cuando accesas la página por primera vez o cuando refrescas el navegador). En el lado del cliente `client-side` se ejecuta cuando navegas a diferentes rutas. Mientras que en modo SPA, el middleware se ejecuta en el lado del cliente en ambas situaciones.

El middleware será ejecutado en este orden:

1. `nuxt.config.js` (en el orden que está dentro del archivo)
2. Layouts que coincidan (matched layouts)
3. Páginas que coincidan (matched pages)

## Middleware de Rutas

Un middleware puede ser asíncrono. Para hacer esto, debes retornar una promesa (promise) o usar async/await.

```js{}[middleware/stats.js]
import http from 'http'

export default function ({ route }) {
  return http.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

Luego, en tu `nuxt.config.js`, usa el valor `router.middleware`.

```js{}[nuxt.config.js]
export default {
  router: {
    middleware: 'stats'
  }
}
```

Ahora el middleware de `stats`, será ejecutado cada vez que cambie exista un cambio de ruta.

Puedes añadir el middleware (hasta varios middlewares) a un layout o página.

```js{}[pages/index.vue / layouts/default.vue]
export default {
  middleware: ['auth', 'stats']
}
```

<app-modal>
  <code-sandbox  :src="csb_link_router"></code-sandbox>
</app-modal>

## Middleware nombrado

You can create named middleware by creating a file inside the  `middleware/` directory, the file name will be the middleware name.

Puedes crear middleware nombrados si creas un archivo dentro de `middleware/`, el nombre del archivo sería el middleware.

```js{}[middleware/authenticated.js]
export default function ({ store, redirect }) {
  // Si el usuario está autenticado
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

```html{}[pages/secret.vue]
<template>
  <h1>En hora buena! Has descubierto una página secreta.</h1>
</template>

<script>
  export default {
    middleware: 'authenticated'
  }
</script>
```

<app-modal>
  <code-sandbox  :src="csb_link_named"></code-sandbox>
</app-modal>

## Middleware anónimo

Si en algún momento necesitas usar un middleware solamente para una página en específica, puedes usar una función directamente, o un arreglo de funciones:

```html{}[pages/secret.vue]
<template>
  <h1>Página secreta</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      // Si el usuario no está autenticado
      if (!store.state.authenticated) {
        return redirect('/login')
      }
    }
  }
</script>
```

<app-modal>
  <code-sandbox  :src="csb_link_anonymous"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
