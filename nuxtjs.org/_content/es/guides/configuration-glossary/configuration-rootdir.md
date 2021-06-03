---
title: 'La propiedad rootDir'
description: Define el espacio de trabajo de la aplicación Nuxt.js
menu: rootDir
category: configuration-glossary
position: 23
---

- Tipo: `String`
- Por defecto: `process.cwd()`

> Define el directorio del espacio de trabajo de tu aplicación Nuxt.js.

Esta propiedad será sobrescrita por los comandos de nuxt (nuxt start, nuxt build etc) si se les pasa un argumento. Por ejemplo, ejecutar `nuxt ./my-app/` establecerá el `rootDir` a la ruta absoluta de `./my-app/` desde el directorio de trabajo actual.

Por eso, normalmente no es necesario configurar esta opción a menos que utilice [Nuxt.js mediante programación](/docs/2.x/internals-glossary/nuxt).

<base-alert type="info">

Tanto `rootDir` como la raíz del paquete que contiene el directorio `node_modules` deben estar dentro del mismo árbol de directorios para poder [resolver las dependencias](https://nodejs.org/api/modules.html#modules_all_together). Consulta la <NuxtLink to="/docs/2.x/configuration-glossary/configuration-srcdir">opción `srcDir`</NuxtLink> para ejemplos de estructura de directorios cuando ese no es el caso.

</base-alert>
