---
title: 'La clase Generator'
description: La clase Generator de Nuxt
menu: Generator
category: internals-glossary
position: 8
---

- Source: **[generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)**

## Hooks

`generate:` hooks:

| Hook                    | Argumentos                   | Cuando                                                                                                                                                |
| ----------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generate:before`       | (generator, generateOptions) | Hook antes de la generación                                                                                                                           |
| `generate:distRemoved`  | (generator)                  | Hook en la carpeta de destino borrada                                                                                                                 |
| `generate:distCopied`   | (generator)                  | Hook al copiar achivos estáticos y de compilación                                                                                                     |
| `generate:route`        | ({ route, setPayload })      | Hook antes de generar la página, útil para la carga dinámica, consulte [#7422](https://github.com/nuxt/nuxt.js/pull/7422), disponible para Nuxt 2.13+ |
| `generate:page`         | ({ route, path, html })      | Hook para permitir al usuario actualizar la ruta y el html después de la generación                                                                   |
| `generate:routeCreated` | ({ route, path, errors })    | Hook para guardar el éxito de la página generada                                                                                                      |
| `generate:extendRoutes` | (routes)                     | Hook para permitir al usuario actualizar las rutas por generar                                                                                        |
| `generate:routeFailed`  | ({ route, errors })          | Hook para guardar el fallo de la página generada                                                                                                      |
| `generate:done`         | (generator, errors)          | Hook en la generación finalizada                                                                                                                      |
