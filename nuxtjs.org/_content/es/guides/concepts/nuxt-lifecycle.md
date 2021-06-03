---
title: Ciclo de Vida de Nuxt
description: No importa qué herramienta utilices, siempre te sentirás más confiado cuando entiendas en profundidad cómo es que funciona. Lo mismo sucede con Nuxt.js.
position: 5
category: concepts
img: /docs/2.x/nuxt-lifecycle.svg
imgAlt: understanding-nuxt-2-12-lifecycle-hooks
questions:
  - question: ¿Cuándo empieza el ciclo de vida de Nuxt.js?
    answers:
      - Cuando la respuesta está por ser enviada al cliente
      - Luego de la fase de construcción
      - Al correr nuxt dev
    correctAnswer: Luego de la fase de construcción
  - question: ¿De qué factores depende el contenido del ciclo de vida?
    answers:
      - De la hora y fecha en la que iniciamos el servidor
      - De si el renderizado del lado del servidor está habilitado y si lo está, qué tipo se está usando
      - Bajo qué OS está corriendo la aplicación Nuxt.js
    correctAnswer: De si el renderizado del lado del servidor está habilitado y si lo está, qué tipo se está usando
  - question: Cuándo es llamado nuxtServerInit?
    answers:
      - Server-side y client-side
      - Luego de la hidratación de Vue
      - Sólo del lado del servidor
    correctAnswer: Sólo del lado del servidor
  - question: ¿Cuáles son los tres tipos de middlewares?
    answers:
      - Global, Layout, Route
      - Global, Layout, Page
      - Global, Group, Route
    correctAnswer: Global, Layout, Route
  - question: ¿Qué paso sólo puede ocurrir del lado cliente?
    answers:
      - Hidratación de Vue
      - Ejecución de Middleware
      - Llamado a la función fetch
    correctAnswer: Hidratación de Vue
  - question: ¿Qué paso nunca ocurre del lado cliente?
    answers:
      - Ejecución de asyncData
      - Ejecución de serverMiddleware
      - Ejecución de fetch
    correctAnswer: Ejecución de serverMiddleware
  - question: ¿Cuáles métodos de Vue son llamados en ambos lados, cliente y servidor?
    answers:
      - mounted y beforeMount
      - beforeDestroy y destroyed
      - created y beforeCreate
    correctAnswer: created y beforeCreate
  - question: ¿Qué paso nunca ocurre al navegar a través de <NuxtLink>?
    answers:
      - Llamada a fetch
      - Ejecución de plugins Nuxt.js del lado cliente
      - Llamada a beforeCreate
    correctAnswer: Ejecución de plugins Nuxt.js del lado cliente
  - question: ¿Qué diferencia especial hay entre asyncData y fetch al navegar por <NuxtLink>?
    answers:
      - asyncData es más rápido que fetch
      - asyncData es llamado luego de fetch
      - asyncData está bloqueado mientras que fetch no
    correctAnswer: asyncData está bloqueado mientras que fetch no
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

No importa qué herramienta utilices, siempre te sentirás más confiado cuando entiendas en profundidad cómo es que funciona. Lo mismo sucede con Nuxt.js. El objetivo de este capítulo es dar un repaso de las diferentes partes del framework, su orden de ejecución y cómo funcionan en conjunto.

El ciclo de vida de Nuxt.js describe qué ocurre después de la fase de construcción, donde tu aplicación se levanta, se troza y minifica. Lo que sucede luego de esta fase, depende de si tienes habilitado el renderizado del lado del servidor o no. Si es así, también dependerá de qué tipo de renderizado hayas elegido:

SSR Dinámico (`nuxt start`)

o Generación de Sitio Estático (`nuxt generate`)

## Ciclo de Vida

### Servidor

Para SSR, los siguientes pasos serán ejectuados en cada solicitud inicial de tu aplicación

- El servidor inicia (`nuxt start`)

Cuando usas generación de sitio estático, los pasos del servidor solo se ejecutan en tiempo de construcción, pero una sola vez por página generada

- El proceso de generación inicia (`nuxt generate`)

- Ganchos de Nuxt
- serverMiddleware
- Plugins de Nuxt del lado servidor
  - en el orden que se encuentren definidos en nuxt.config.js
- nuxtServerInit
  - Acción de Vuex que sea llamada solo del lado del servidor para pre cargar el store
  - El primer argumento es el **Contexto Vue** y en segundo lugar el **Contexto Nuxt.js**
    - El dispatch de otras acciones desde aquí -> solo "punto de entrada" para las acciones subsiguientes del store del lado servidor
  - solo puede ser definido en `store/index.js`
- Middleware
  - Global middleware
  - Layout middleware
  - Route middleware
- asyncData
- beforeCreate (método de ciclo de vida de Vue)
- created (método de cliclo de vida de Vue)
- El nuevo fetch (arriba hacia abajo, hermano = paralelo)
- Serialización del state (gancho de Nuxt.js `render:routeContext`)

- renderizado de HTML (gancho de Nuxt.js `render:route`)

- gancho `render:routeDone` cuando el HTML es enviado al servidor

- gancho de Nuxt.js `generate:before`
- archivos HTML son generados
  - **Generación estática completa**
    - ej.: se extraen la cargas útiles estáticas
  - `generate:page` (HTML editable)
  - `generate:routeCreated` (Ruta generada)
- `generate:done` cuando todos los archivos HTML son generados

### Cliente

Esta parte del ciclo de vida es totalmente ejecutada en el navegador, no importa el modo de Nuxt.js que hayas elegido.

- Recepción del HTML
- Carga de assets (ej.: Javascript)
- Hidratación de Vue
- Middleware
  - Global middleware
  - Layout middleware
  - Route middleware
- asyncData (bloqueado)
- plugin Nuxt.js del lado cliente
  - en el orden que se encuentren definidos en nuxt.config.js
- beforeCreate (método de ciclo de vida de Vue)
- created (método de ciclo de vida de Vue)
- El nuevo fetch (arriba hacia abajot, hermanos = paralelo) (sin bloquear)
- beforeMount (método de ciclo de vida de Vue)
- mounted (método de ciclo de vida de Vue)

### Navegar usando el componente NuxtLink

Igual que para la parte _cliente_, todo ocurre en el navegador pero sólo cuando se navega a través de `<NuxtLink>`. Además, el contenido de página no se muestra hasta que todas las tareas _bloaqueadas_ sean completadas.

<base-alert type="info">

Revisa el capítulo sobre componente para ver más info de [`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component)

</base-alert>

- middleware (bloqueado)
  - Global middleware
  - Layout middleware
  - Route middleware
- asyncData (bloqueado)
- asyncData (bloqueado) [o carga útil estática completa cargando]
- beforeCreate & created (método de ciclo de vida de Vue)
- fetch (sin bloquear)
- beforeMount & mounted

### Qué sigue

<base-alert type="next">

Héchale un vistazo a [libro de Características](/docs/2.x/features/rendering-modes)

</base-alert>

<quiz :questions="questions"></quiz>
