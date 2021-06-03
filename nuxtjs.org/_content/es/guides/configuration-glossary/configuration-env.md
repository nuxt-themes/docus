---
title: 'La propiedad env'
description: Comparte variables de entorno entre el cliente y el servidor.
menu: env
category: configuration-glossary
position: 8
---

- Tipo: `Object`

> Nuxt.js te permite crear variables de entorno en el lado del cliente, y también compartirlas en el lado del servidor.

La propiedad env define las variables de entorno que deben estar disponibles en el lado del cliente. Estas propiedades pueden ser asignadas usando variables de entorno del lado del servidor, las del [módulo dotenv](https://github.com/nuxt-community/dotenv-module) o similares.

**Asegúrate de leer sobre `process.env` y `process.env == {}` más abajo para una mejor resolución de problemas.**

```js{}[nuxt.config.js]
export default {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

Esto te permite crear una propiedad `baseUrl` que será igual a la variable de entorno del lado del servidor `BASE_URL`, si está disponible o definida. Si no, `baseUrl` en el lado del cliente será igual a 'http://localhost:3000'. La variable del lado del servidor `BASE_URL` es, por lo tanto, copiada en el lado del cliente a través de la propiedad `env` en `nuxt.config.js`. Como alternativa, se define el otro valor (http://localhost:3000).

Entonces, puedo acceder a mi variable `baseUrl` de 2 maneras:

1. A través de `process.env.baseUrl`.
2. A través de `context.env.baseUrl`, consulta [la API de contexto](/docs/2.x/internals-glossary/context).

Puedes utilizar la propiedad `env` para dar un token público, por ejemplo.

Para el ejemplo anterior, podemos utilizarla para configurar [axios](https://github.com/mzabriskie/axios).

```js{}[plugins/axios.js]
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

Entonces, en tus páginas, puedes importar axios así: `import axios from '~/plugins/axios'`

## Inyección automática de variables de entorno

Si defines las variables de entorno empezando con `NUXT_ENV_` en la fase de construcción (p.ej. `NUXT_ENV_COOL_WORD=freezing nuxt build`), se inyectarán automáticamente en el entorno del proceso. Ten en cuenta que potencialmente tendrán prioridad sobre las variables definidas con el mismo nombre en tu `nuxt.config.js`.

## process.env == {}

Ten en cuenta que Nuxt utiliza `definePlugin` de webpack para definir la variable de entorno. Esto significa que el `process` actual o `process.env` de Node.js no está disponible ni definido. Cada una de las propiedades `env` definidas en nuxt.config.js es mapeada individualmente a `process.env.xxxx` y convertida durante la compilación.

Es decir, `console.log(process.env)` emitirá `{}` pero `console.log(process.env.your_var)` seguirá emitiendo tu valor. Cuando webpack compila tu código, reemplaza todas las instancias de `process.env.your_var` al valor que tú le has dado. Por ejemplo: `env.test = 'testing123'`. Si usas `process.env.test` en tu código en algún lugar, se traduce a 'testing123'.

antes

```js
if (process.env.test == 'testing123')
```

después

```js
if ('testing123' == 'testing123')
```

## serverMiddleware

Como [serverMiddleware](/docs/2.x/configuration-glossary/configuration-servermiddleware) está desacoplado de la construcción principal de Nuxt, las variables `env` definidas en `nuxt.config.js` no están disponibles ahí.
