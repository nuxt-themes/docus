---
title: 'A Classe Nuxt'
description: A classe princial do Nuxt
menu: Nuxt Class
category: internals-glossary
position: 4
---

- Fonte: **[core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)**

Este é o contêiner principal que permite que todos os módulos e classes se comuniquem entre si. Todos os módulos têm acesso à instância do Nuxt usando `this.nuxt`.

## Hooks

Podemos registrar hooks em certos eventos do ciclo de vida.

```js
nuxt.hook('ready', async nuxt => {
  // Seu código personalizado aqui
})
```

| Plugin   | Argumentos               | Quando                                                                                |
| -------- | ------------------------ | ------------------------------------------------------------------------------------- |
| `ready`  | (nuxt)                   | Nuxt está pronto para funcionar (`ModuleContainer` e `Renderer` prontos).             |
| `error`  | (error)                  | Um erro não tratado ao chamar hooks.                                                  |
| `close`  | (nuxt)                   | A instância Nuxt está fechando normalmente.                                           |
| `listen` | (server, { host, port }) | O servidor **interno** do Nuxt começa a escutar. (Usando `nuxt start` ou `nuxt dev`). |
