---
title: 'A Classe Renderer'
description: A classe Renderer do Nuxt
menu: Renderer
category: internals-glossary
position: 5
---

- Fonte: **[vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)**

Esta classe está exportando um middleware connect que trata e atende a todas as requisições de SSR e assets.

## Hooks

Podemos registrar hooks em certos eventos do ciclo de vida.

| Hook                     | Argumentos                   | Quando                                                                                                                                                                                                                                             |
| ------------------------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `render:before`          | (renderer, opcoes)           | Antes de configurar o middleware e recursos para a classe Renderer. Útil para sobrecarregar alguns métodos ou opções.                                                                                                                              |
| `render:setupMiddleware` | (app) _instância do connect_ | Antes do Nuxt adicionar sua pilha de middleware. Podemos usá-lo para registrar um middleware personalizado no lado do servidor.                                                                                                                    |
| `render:errorMiddleware` | (app) _instância do connect_ | Antes de adicionar o middleware de erro do Nuxt. Útil para adicionar seu próprio middleware antes de usar o do Nuxt. Veja o [módulo Sentry](https://github.com/nuxt-community/sentry-module/blob/v4.0.3/lib/module.js#L151) para mais informações. |
| `render:resourcesLoaded` | (recursos)                   | Chamado depois que os recursos do Renderer são carregados (manifesto do cliente, pacote do servidor, etc).                                                                                                                                         |
| `render:done`            | (renderer)                   | Middleware de SSR e todos os recursos estão prontos (Renderer pronto).                                                                                                                                                                             |
| `render:routeContext`    | (context.nuxt)               | _Toda vez que uma rota é renderizada pelo servidor e antes do hook `render:route`_. Chamado antes de serializar o contexto Nuxt em `window.__NUXT__`. Útil para adicionar alguns dados que você pode buscar no lado do cliente.                    |
| `render:route`           | (url, resultado, contexto)   | _Toda vez que uma rota é renderizada pelo servidor_. Chamado antes de enviar de voltar a requisição ao navegador.                                                                                                                                  |
| `render:routeDone`       | (url, resultado, contexto)   | _Toda vez que uma rota é renderizada pelo servidor_. Chamado depois que a resposta foi enviada ao navegador.                                                                                                                                       |
