---
title: 'La propiedad router'
description: La propiedad del enrutador le permite personalizar el enrutador Nuxt.js.
menu: router
category: configuration-glossary
position: 24
---

> La propiedad del enrutador le permite personalizar el enrutador Nuxt.js ([vue-router](https://router.vuejs.org/en/)).

## base

- Tipo: `String`
- Por defecto: `'/'`

La URL base de la aplicación. Por ejemplo, si la aplicación completa de una sola página se sirve en `/app/`, entonces la base debe usar el valor `'/app/'`.

Esto puede resultar útil si necesita servir Nuxt como una raíz de contexto diferente, desde un sitio web más grande. Tenga en cuenta que puede configurar o no un servidor web proxy frontal.

Si desea tener una redirección a `router.base`, puede hacerlo [usando un Hook, consulte _Redirect to router.base when not in root _](/docs/2.x/configuration-glossary/configuration-hooks#redirect-to-routerbase-when-not-on-root).

```js{}[nuxt.config.js]
export default {
  router: {
    base: '/app/'
  }
}
```

<div class="Alert Alert-blue">

Cuando se establece `base`, Nuxt.js también agregará en el encabezado del documento`<base href="{{router.base}}"/>`.

</div>

> Esta opción se proporciona directamente al vue-router [base](https://router.vuejs.org/api/#base).

## routeNameSplitter

- Tipo: `String`
- Por defecto: `'-'`

Es posible que desee cambiar el separador entre los nombres de ruta que usa Nuxt.js. Puede hacerlo a través de la opción `routeNameSplitter` en su archivo de configuración. Imagina que tenemos el archivo de página `pages/posts/_id.vue`. Nuxt generará el nombre de la ruta mediante programación, en este caso, `posts-id`. Al cambiar la configuración de `routeNameSplitter` a `/`, el nombre cambiará a `posts/id`.

```js{}[nuxt.config.js]
export default {
  router: {
    routeNameSplitter: '/'
  }
}
```

## extendRoutes

- Tipo: `Function`

Es posible que desee ampliar las rutas creadas por Nuxt.js. Puede hacerlo a través de la opción `extendRoutes`.

```js{}[nuxt.config.js]
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  }
}
```

Si desea ordenar sus rutas, puede usar la función `sortRoutes(routes)` de `@nuxt/utils`:

```js{}[nuxt.config.js]
import { sortRoutes } from '@nuxt/utils'
export default {
  router: {
    extendRoutes(routes, resolve) {
      // Agrega algunas rutas aquí ...

      // Y luego ordenalas
      sortRoutes(routes)
    }
  }
}
```

El esquema de la ruta debe respetar el esquema [vue-router](https://router.vuejs.org/en/).

<base-alert>

Cuando agregue rutas que usen Vistas nombradas, no olvide agregar los `chunkNames` correspondientes de los `components` nombrados.

</base-alert>

```js{}[nuxt.config.js]
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/users/:id',
        components: {
          default: resolve(__dirname, 'pages/users'), // o routes[index].component
          modal: resolve(__dirname, 'components/modal.vue')
        },
        chunkNames: {
          modal: 'components/modal'
        }
      })
    }
  }
}
```

## fallback

- Tipo: `boolean`
- Por defecto: `false`

Controla si el enrutador debe volver al modo hash cuando el navegador no admite history.pushState pero el modo está configurado en history.

Establecer esto en falso esencialmente hace que cada navegación de enlace de enrutador sea una actualización de página completa en IE9. Esto es útil cuando la aplicación está renderizada por el servidor y necesita funcionar en IE9, porque una URL en modo hash no funciona con SSR.

> Esta opción se proporciona directamente al vue-router [fallback](https://router.vuejs.org/api/#fallback).

## linkActiveClass

- Tipo: `String`
- Por defecto: `'nuxt-link-active'`

Configure globalmente [`<nuxt-link>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component) clase activa predeterminada.

```js{}[nuxt.config.js]
export default {
  router: {
    linkActiveClass: 'active-link'
  }
}
```

> Esta opción se proporciona directamente al vue-router [linkactiveclass](https://router.vuejs.org/api/#linkactiveclass).

## linkExactActiveClass

- Tipo: `String`
- Por defecto: `'nuxt-link-exact-active'`

Configure globalmente [`<nuxt-link>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component) clase activa predeterminada.

```js{}[nuxt.config.js]
export default {
  router: {
    linkExactActiveClass: 'exact-active-link'
  }
}
```

> Esta opción se proporciona directamente al vue-router [linkexactactiveclass](https://router.vuejs.org/api/#linkexactactiveclass).

## linkPrefetchedClass

- Tipo: `String`
- Por defecto: `false`

Configure globalmente [`<nuxt-link>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component) clase de _prefetch_ predeterminada (característica deshabilitada de manera predeterminada)

```js{}[nuxt.config.js]
export default {
  router: {
    linkPrefetchedClass: 'nuxt-link-prefetched'
  }
}
```

## middleware

- Tipo: `String` o `Array`
  - Items: `String`

Establezca el middleware predeterminado para cada página de la aplicación.

```js{}[nuxt.config.js]
export default {
  router: {
    // Ejecute el middleware / user-agent.js en cada página
    middleware: 'user-agent'
  }
}
```

```js{}[middleware/user-agent.js]
export default function (context) {
  // Agregue la propiedad userAgent en el contexto (disponible en `asyncData` y` fetch`)
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

Para obtener más información sobre el middleware, consulte la [guía de middleware](/docs/2.x/directory-structure/middleware#router-middleware).

## mode

- Tipo: `String`
- Por defecto: `'history'`

Configure el modo de enrutador, no se recomienda cambiarlo debido a la representación del lado del servidor.

```js{}[nuxt.config.js]
export default {
  router: {
    mode: 'hash'
  }
}
```

> Esta opción se da directamente al vue-router [mode](https://router.vuejs.org/api/#mode).

## parseQuery / stringifyQuery

- Tipo: `Function`

Proporcione funciones personalizadas de análisis / procesamiento de cadenas de cadenas de consulta. Reemplaza el predeterminado.

> Esta opción se da directamente al vue-router [parseQuery / stringifyQuery](https://router.vuejs.org/api/#parsequery-stringifyquery).

## prefetchLinks

> Añadido con Nuxt v2.4.0

- Tipo: `Boolean`
- Por defecto: `true`

Configure `<nuxt-link>` para obtener previamente la página _code-splitted_ cuando se detecte dentro de la ventana gráfica. Requiere que [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) sea compatible (consulte [CanIUse](https://caniuse.com/#feat=intersectionobserver)) .

Recomendamos rellenar condicionalmente esta función con un servicio como [Polyfill.io](https://polyfill.io):

```js{}[nuxt.config.js]
export default {
  head: {
    script: [
      {
        src:
          'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver',
        body: true
      }
    ]
  }
}
```

Para deshabilitar _prefetching_ en un enlace específico, puede usar la opción `no-prefetch`. Desde Nuxt.js v2.10.0, también puede usar el conjunto de accesorios `prefetch` en `false`:

```html
<nuxt-link to="/about" no-prefetch>About page not pre-fetched</nuxt-link>
<nuxt-link to="/about" :prefetch="false">About page not pre-fetched</nuxt-link>
```

Para deshabilitar _prefetching_ en todos los enlaces, configure el `prefetchLinks` to `false`:

```js{}[nuxt.config.js]
export default {
  router: {
    prefetchLinks: false
  }
}
```

Desde Nuxt.js v2.10.0, si ha establecido `prefetchLinks` en `false` pero desea obtener un enlace específico, puede usar la opción `prefetch`:

```html
<nuxt-link to="/about" prefetch>About page pre-fetched</nuxt-link>
```

## prefetchPayloads

> Agregado con v2.13.0, solo disponible para [objetivos estáticos](/docs/2.x/features/deployment-targets#static-hosting).

- Tipo: `Boolean`
- Por defecto: `true`

Al usar `nuxt generate` con `target: 'static'`, Nuxt generará un `payload.js` para cada página.

Con esta opción habilitada, Nuxt buscará automáticamente la carga útil de la página vinculada cuando el `<nuxt-link>` esté visible en la ventana gráfica, haciendo **navegación instantánea**.

<base-alert type="info">

Esta opción depende de la opción [prefetchLinks](#prefetchlinks) que se habilitará.

</base-alert>

Puede deshabilitar este comportamiento configurando `prefetchPaylods` en `false`:

```js{}[nuxt.config.js]
export default {
  router: {
    prefetchPayloads: false
  }
}
```

## scrollBehavior

- Tipo: `Function`

La opción `scrollBehavior` te permite definir un comportamiento personalizado para la posición de desplazamiento entre las rutas. Este método se llama cada vez que se representa una página. Para obtener más información al respecto, consulte [documentación de comportamiento de desplazamiento del enrutador vue](https://router.vuejs.org/guide/advanced/scroll-behavior.html).

<div class="Alert Alert-blue">

A partir de v2.9.0, puede usar un archivo para sobrescribir el scrollBehavior del enrutador, este archivo debe colocarse en `~/app/router.scrollBehavior.js` (nota: el nombre del archivo distingue entre mayúsculas y minúsculas si se ejecuta en Windows).

</div>

Puede ver el archivo predeterminado `router.scrollBehavior.js` de Nuxt aquí: [packages/vue-app/template/router.scrollBehavior.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/router.scrollBehavior.js).

Ejemplo de forzar la posición de desplazamiento hacia la parte superior para cada ruta:

`app/router.scrollBehavior.js`

```js{}[app/router.scrollBehavior.js]
export default function (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

## trailingSlash

- Tipo: `Boolean` o `undefined`
- Por defecto: `undefined`
- Disponible desde: v2.10

Si esta opción se establece en verdadera, se agregarán barras diagonales finales a cada ruta. Si se establece en falso, se eliminarán.

**Atención**: esta opción no debe configurarse sin preparación y debe probarse a fondo. Al configurar `router.trailingSlash` en algo diferente a `undefined`, la ruta opuesta dejará de funcionar. Por lo tanto, las redirecciones 301 deben estar en su lugar y su _internal linking_ debe adaptarse correctamente. Si establece `trailingSlash` en `true`, solo funcionará `example.com / abc /` pero no `example.com / abc`. En falso, es al revés
