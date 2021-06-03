---
title: Generación del lado del servidor
description: La generación del lado del servidor (SSR) es la capacidad de una aplicación para generar la página web en el servidor en lugar de en el navegador.
position: 3
category: concepts
questions:
  - question: ¿Qué tipo de servidor necesitas para hacer SSR?
    answers:
      - Servidor PHP
      - Servidor JavaScript
      - Servidor Node.js
    correctAnswer: Servidor Node.js
  - question: ¿Qué utilizas para extender y controlar el servidor?
    answers:
      - Middleware
      - ServerMiddleware
      - No es posible controlar el servidor
    correctAnswer: ServerMiddleware
  - question: Puedes alojar una aplicación generada del lado del servidor en un proveedor de alojamiento serverless
    answers:
      - verdadero
      - falso
    correctAnswer: falso
  - question: ¿Tenemos acceso al objeto document del lado del servidor?
    answers:
      - Si, siempre está disponible
      - No, El objeto document pertenece al navegador y no está disponible en el servidor
    correctAnswer: No, El objeto document pertenece al navegador y no está disponible en el servidor
  - question: ¿Cuándo la página se vuelve interactiva?
    answers:
      - Cuando el nevagador recibe el HTML generado en el servidor
      - Cuando se ejecuta el hydrate de Vue.js
      - Cuando se envía la petición inicial
    correctAnswer: Cuando se ejecuta el hydrate de Vue.js
  - question: La navegación entre páginas con <NuxtLink> se ejecuta
    answers:
      - En el lado del cliente
      - En el lado del servidor
    correctAnswer: En el lado del cliente
  - question: ¿Cuáles son los pasos correctos?
    answers:
      - navegador → servidor, servidor → navegador, navegador → navegador
      - servidor → navegador, navegador → servidor, servidor → servidor
      - navegador → servidor, servidor → navegador, navegador → servidor
    correctAnswer: navegador → servidor, servidor → navegador, navegador → navegador
---

La generación del lado del servidor (SSR) es la capacidad de una aplicación para generar la página web en el servidor en lugar de en el navegador. El servidor envía la página completamente generada al cliente; el paquete JavaScript toma el control lo cual le permite a la aplicación Vue.js hacer el [hydrate](https://ssr.vuejs.org/guide/hydration.html).

## Un servidor Node.js es requerido

Se requiere un entorno JavaScript para generar la página.

Se necesita configurar un servidor Node.js para ejecutar la aplicación Vue.js.

## Extensión y control del servidor

Puedes extender el servidor con serverMiddleware y controlar las rutas con middleware.

```js{}[server-middleware/logger.js]
export default function (req, res, next) {
  console.log(req.url)
  next()
}
```

```js{}[nuxt.config.js]
export default {
  serverMiddleware: ['~/server-middleware/logger']
}
```

Si tu middleware del servidor consiste en una lista de funciones mapeadas contra rutas:

## Entorno del Servidor vs. Navegador

Ya que estamos en un entorno Node.js debes poder acceder a objetos como `req` y `res`. No necesitas acceso a los objetos `window` o `document` ya que estos pertenecen al entorno del navegador. De todas formas puedes usar `window` o `document` mediantes los hooks `beforeMount` o `mounted`.

```js
beforeMount{
  window.alert('hello');
}
mounted{
  window.alert('hello');
}
```

## Pasos para generar del lado del servidor con Nuxt.js

### Paso 1: Navegador al servidor

Cuando un navegador envía la solicitud inicial, llegará al servidor interno de Node.js. Nuxt.js generará el HTML y lo enviará de vuelta al navegador con los resultados de las funciones ejecutadas, p. Ej. `asyncData`,` nuxtServerInit` o `fetch`. Los hooks también se ejecutan.

### Paso 2: Servidor al navegador

El navegador recibe la página renderizada del servidor con el HTML generado. El contenido se muestra y el hydrate de Vue.js entra en acción, haciéndolo reactivo. Después de este proceso, la página es interactiva.

### Paso 3: Navegador a navegador

La navegación entre páginas con [`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component) e realiza en el lado del cliente para que no vuelva a acceder al servidor a menos que refresque el navegador.

<quiz :questions="questions"></quiz>
