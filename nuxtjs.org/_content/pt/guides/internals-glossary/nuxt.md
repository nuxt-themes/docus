---
title: 'Utilizado Nuxt.js Programaticamente'
description: Você pode usar o Nuxt.js programaticamente para usá-lo como um middleware, dando a você a liberdade de criar seu próprio servidor para renderizar seus aplicativos da web.
menu: Using Nuxt Programmatically
category: internals-glossary
position: 9
---

Você pode querer usar seu próprio servidor com seu middleware e sua API. É por isso que você pode usar o Nuxt.js programaticamente.

## Construtor do Nuxt

Para ver a lista de opções para dar ao Nuxt.js, consulte a seção de configuração.

```js
const { loadNuxt, build } = require('nuxt')

// Verifique se precisamos executar o Nuxt no modo de desenvolvimento
const isDev = process.env.NODE_ENV !== 'production'

// Prepare-se para usar a instância Nuxt
const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

// Habilitar compilação e recarregamento instantâneo no dev
if (isDev) {
  build(nuxt)
}

// Podemos usar `nuxt.render(req, res)` ou `nuxt.renderRoute(rota, contexto)`
```

Você pode dar uma olhada nos templates [nuxt-express](https://github.com/nuxt/express) e [adonuxt](https://github.com/nuxt/adonuxt) para começar rapidamente.

### Depurar os logs

Se você deseja exibir os logs do Nuxt.js, pode adicionar o seguinte ao início do seu arquivo:

```js
process.env.DEBUG = 'nuxt:*'
```
