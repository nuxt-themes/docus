---
title: 'Propiedades RuntimeConfig'
description: RuntimeConfig permite pasar variables dinámicas de configuración y de entorno al contexto nuxt
menu: runtimeConfig
category: configuration-glossary
position: 25
---

La configuración en tiempo de ejecución permite pasar variables dinámicas de configuración y de entorno al contexto de nuxt. Para más información de uso, consulta [runtime config guide](/docs/2.x/configuration-glossary/configuration-runtime-config).

## `publicRuntimeConfig`

- Tipo: `Object`

El valor de este objeto es **accesible tanto desde el cliente como desde el servidor** usando `$config`.

## `privateRuntimeConfig`

- Tipo: `Object`

El valor de este objeto es accesible **solo desde el servidor** usando `$config`. Anula `publicRuntimeConfig` para el servidor.
