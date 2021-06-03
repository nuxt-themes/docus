---
title: 'A Classe Builder'
description: A classe `Builder` do Nuxt
menu: Builder
category: internals-glossary
position: 7
---

- Fonte: **[builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)**

## Hooks

Podemos registrar hooks em certos eventos do ciclo de vida.

```js
// Adicionar hook para o build
this.nuxt.hook('build:done', (builder) => {
  ...
})
```

| Hook                    | Argumentos                                  | Quando                                                                                                                                                           |
| ----------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build:before`          | (nuxt, buildOptions)                        | Antes de iniciar o build do Nuxt                                                                                                                                 |
| `builder:prepared`      | (nuxt, buildOptions)                        | Os diretórios de build foram criados                                                                                                                             |
| `builder:extendPlugins` | (plugins)                                   | Gerando plugins                                                                                                                                                  |
| `build:templates`       | ({ templatesFiles, templateVars, resolve }) | Gerando arquivos de template `.nuxt`                                                                                                                             |
| `build:extendRoutes`    | (routes, resolve)                           | Gerando rotas                                                                                                                                                    |
| `webpack:config`        | (webpackConfigs)                            | Antes da configuração dos compiladores                                                                                                                           |
| `build:compile`         | ({ name, compiler })                        | Antes da compilação do webpack (o compilador é uma instância do webpack `Compiler`). Se no modo universal, chamado duas vezes com o nome `'client'` e `'server'` |
| `build:compiled`        | ({ name, compiler, stats })                 | Build do webpack concluído                                                                                                                                       |
| `build:done`            | (nuxt)                                      | Buidl do Nuxt concluído                                                                                                                                          |
