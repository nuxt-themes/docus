---
title: 'The Generator Class'
description: Nuxt Generator Class
menu: Generator
category: internals-glossary
---

- Source: **[generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)**

## Hooks

`generate:` hooks:

| Hook                    | Arguments                    | When                                                                                                                                          |
| ----------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `generate:before`       | (generator, generateOptions) | Hook on before generation                                                                                                                     |
| `generate:distRemoved`  | (generator)                  | Hook on destination folder cleaned                                                                                                            |
| `generate:distCopied`   | (generator)                  | Hook on copy static and built files                                                                                                           |
| `generate:route`        | ({ route, setPayload })      | Hook before generating the page, useful for dynamic payload, see [#7422](https://github.com/nuxt/nuxt.js/pull/7422), available for Nuxt 2.13+ |
| `generate:page`         | ({ route, path, html })      | Hook to let user update the path & html after generation                                                                                      |
| `generate:routeCreated` | ({ route, path, errors })    | Hook on saving generated page success                                                                                                         |
| `generate:extendRoutes` | (routes)                     | Hook to let user update the routes to generate                                                                                                |
| `generate:routeFailed`  | ({ route, errors })          | Hook on saving generated page failure                                                                                                         |
| `generate:done`         | (generator, errors)          | Hook on generation finished                                                                                                                   |
