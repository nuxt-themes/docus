---
title: 'La clase Builder'
description: Clase `Builder` de Nuxt
menu: Builder
category: internals-glossary
position: 7
---

- Source: **[builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)**

## Hooks

Podemos registrar hooks en ciertos eventos del ciclo de vida.

```js
// Añadir hook para build
this.nuxt.hook('build:done', (builder) => {
  ...
})
```

| Hook                    | Argumentos                                  | Cuando                                                                                                                                                              |
| ----------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build:before`          | (nuxt, buildOptions)                        | Antes de iniciar el Nuxt build                                                                                                                                      |
| `builder:prepared`      | (nuxt, buildOptions)                        | Los directorios de build han sido creados                                                                                                                           |
| `builder:extendPlugins` | (plugins)                                   | Se generan complementos                                                                                                                                             |
| `build:templates`       | ({ templatesFiles, templateVars, resolve }) | Se generando plantillas `.nuxt`                                                                                                                                     |
| `build:extendRoutes`    | (routes, resolve)                           | Se generan rutas                                                                                                                                                    |
| `webpack:config`        | (webpackConfigs)                            | Antes de configurar los compiladores                                                                                                                                |
| `build:compile`         | ({ name, compiler })                        | Antes de compilar webpack (compiler es una instancia `Compiler` de webpack), si es en modo universal, debe llamarse dos veces con el nombre `'client'` y `'server'` |
| `build:compiled`        | ({ name, compiler, stats })                 | El build de webpack ha terminado                                                                                                                                    |
| `build:done`            | (nuxt)                                      | El build de Nuxt ha terminado                                                                                                                                       |
