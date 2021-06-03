---
title: 'A propriedade dev'
description: Defina o modo de desenvolvimento ou produção.
menu: dev
category: configuration-glossary
position: 6
---

- Tipo: `Boolean`
- Padrão: `true`

> Defina o modo de desenvolvimento ou produção do Nuxt.js.

Esta propriedade é substituída pelos comandos nuxt:

- `dev` é forçado a `true` com `nuxt`
- `dev` é forçado a `false` com `nuxt build`, `nuxt start` e `nuxt generate`

Esta propriedade deve ser utilizada ao usar [Nuxt.js programaticamente](/docs/2.x/internals-glossary/nuxt):

```js{}[nuxt.config.js]
export default {
  dev: process.env.NODE_ENV !== 'production'
}
```

```js{}[server.js]
const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

// Instanciamos o Nuxt.js com as opções
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Biuld apenas no modo dev
if (config.dev) {
  new Builder(nuxt).build()
}

// Escutar o servidor
app.listen(port, '0.0.0.0').then(() => {
  console.log(`O servidor está escutando na porta: ${port}`)
})
```

```json{}[package.json]
{
  "scripts": {
    "dev": "node server.js",
    "build": "nuxt build",
    "start": "NODE_ENV=production node server.js"
  }
}
```
