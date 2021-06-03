---
title: 'A Classe Generator'
description: A classe Generator do Nuxt
menu: Generator
category: internals-glossary
position: 8
---

- Fonte: **[generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)**

## Hooks

hooks `generate`:

| Hook                    | Argumentos                   | Quando                                                                                                                                       |
| ----------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `generate:before`       | (generator, generateOptions) | Antes da geração                                                                                                                             |
| `generate:distRemoved`  | (generator)                  | Diretório de destino limpo                                                                                                                   |
| `generate:distCopied`   | (generator)                  | Arquivos estáticos e de build copiados                                                                                                       |
| `generate:route`        | ({ route, setPayload })      | Antes de gerar a página. Útil para payload dinâmico. Consulte [#7422](https://github.com/nuxt/nuxt.js/pull/7422). Disponível para Nuxt 2.13+ |
| `generate:page`         | ({ route, path, html })      | Permitir que o usuário atualize o caminho e html após a geração                                                                              |
| `generate:routeCreated` | ({ route, path, errors })    | Sucesso ao salvar a página gerada                                                                                                            |
| `generate:extendRoutes` | (routes)                     | Deixa o usuário atualizar as rotas para gerar                                                                                                |
| `generate:routeFailed`  | ({ route, errors })          | Erro ao salvar a página gerada                                                                                                               |
| `generate:done`         | (generator, errors)          | Geração finalizada                                                                                                                           |
