---
title: 'El Contexto'
description: El `contexto` proporciona objetos / parámetros adicionales de Nuxt que tradicionalmente no están disponibles para los componentes de Vue. `Context` está disponible en áreas especiales del ciclo de vida de nuxt como` asyncData`, `plugins`,` middlewares`, `modules` y` store / nuxtServerInit`.
menu: El Contexto
category: internals-glossary
position: 1
---

El `contexto` proporciona objetos / parámetros adicionales de Nuxt a componentes de Vue y está disponible en áreas especiales del ciclo de vida de nuxt como [`asyncData`](/api), [`fetch`](/docs/2.x/features/data-fetching), [`plugins`](/docs/2.x/directory-structure/plugins), [`middleware`](/docs/2.x/directory-structure/middleware#router-middleware) and [`nuxtServerInit`](/docs/2.x/directory-structure/store#the-nuxtserverinit-action).

> _Nota: "El contexto" al que nos referimos aquí no debe confundirse con el objeto `context` disponible en [`Vuex Actions`](https://vuex.vuejs.org/guide/actions.html). Los dos no están relacionados._

```js
function (context) {
  // Llaves universales
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
  // Lado del servidor
  if (process.server) {
    const { req, res, beforeNuxtRender } = context
  }
  // Lado del cliente
  if (process.client) {
    const { from, nuxtState } = context
  }
}
```

## Llaves universales

Estas claves están disponibles tanto en el lado del cliente como en el lado del servidor.

### app

`app` (_NuxtAppOptions_)

Las opciones de la instancia raíz de Vue que incluye todos sus complementos. Por ejemplo, cuando se usa `i18n`, puede obtener acceso a `$i18n` a través de `context.app.i18n`.

### store

`store` ([_Vuex Store_](https://vuex.vuejs.org/api/#vuex-store-instance-properties))

Instancia de Vuex Store. **Solamente disponible si [vuex store](/docs/2.x/directory-structure/store) está definido**.

### route

`route` ([_Vue Router Route_](https://router.vuejs.org/api/#the-route-object))

Instancia de rutas de Vue Router.

### params

`params` (_Object_)

Alias de `route.params`.

### query

`query` (_Object_)

Alias de `route.query`.

### env

`env` (_Object_)

Variables de entorno definidas en `nuxt.config.js`, mira [env api](/docs/2.x/configuration-glossary/configuration-env).

### IsDev

`isDev` (_Boolean_)

Booleano para hacerle saber si está en modo de desarrollo, puede ser útil para almacenar en caché algunos datos en producción.

### isHMR

`isHMR` (_Boolean_)

Booleano para hacerle saber si se llama al método / middleware desde el reemplazo del módulo en caliente del paquete web (_true solo en el lado del cliente en modo dev_).

### redirect

`redirect` (_Function_)

Use este método para redirigir al usuario a otra ruta, el código de estado se usa en el lado del servidor, por defecto es `302`. `redirect([status,] path [, query])`.

### error

`error` (_Function_)

Utilice este método para mostrar la página de error: `error(params)`. Los `params` deben tener las propiedades `statusCode` y `message`.

### \$config

`$config` (_Object_)

La actual [configuración de tiempo de ejecución](/docs/2.x/configuration-glossary/configuration-runtime-config).

## Claves del lado del servidor

Estas claves están disponibles solo en el lado del servidor.

### req

`req` ([_http.Request_](https://nodejs.org/api/http.html#http_class_http_incomingmessage))

Solicitud del servidor de Node.js. Si Nuxt se usa como middleware, el objeto de solicitud puede ser diferente según el marco que esté usando.<br>**No está disponible con `nuxt generate`**.

### Res

`res` ([_http.Response_](https://nodejs.org/api/http.html#http_class_http_serverresponse))

Respuesta del servidor Node.js. Si Nuxt se usa como middleware, el objeto res puede ser diferente según el marco que esté usando.<br>**No está disponible con`nuxt generate`**.

### beforeNuxtRender

`beforeNuxtRender(fn)` (_Function_)

Utilice este método para actualizar la variable `__NUXT__` representada en el lado del cliente, la `fn` (puede ser asíncrona) y se llama con `{Componentes, nuxtState}`, ver [ejemplo](https://github.com/nuxt/nuxt.js/blob/cf6b0df45f678c5ac35535d49710c606ab34787d/test/fixtures/basic/pages/special-state.vue).

## Claves del lado del cliente

Estas claves están disponibles solo en el lado del cliente.

### from

`from` ([_Vue Router Route_](https://router.vuejs.org/api/#the-route-object))

La ruta navegada desde.

### nuxtState

`nuxtState` _(Object)_

Estado Nuxt, útil para complementos que usan `beforeNuxtRender` para obtener el estado nuxt en el lado del cliente antes de la hidratación.**Disponible solo en modo `universal`**.
