---
title: 'Usando Nuxt.js mediante programación'
description: Puedes usar Nuxt.js mediante programación para usarlo como middleware, lo que le brinda la libertad de crear su propio servidor para representar sus aplicaciones web.
menu: Usando Nuxt.js mediante programación
category: internals-glossary
position: 9
---

Es posible que desee utilizar su propio servidor con su middleware y su API. Es por eso que puede usar Nuxt.js mediante programación.

## Constructor Nuxt

Para ver la lista de opciones para dar a Nuxt.js, consulte la sección de configuración.

```js
const { loadNuxt, build } = require('nuxt')

// Compruebe si necesitamos ejecutar Nuxt en modo de desarrollo
const isDev = process.env.NODE_ENV !== 'production'

// Prepara una instancia de Nuxt lista para usar
const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

// Habilita la compilación y recarga en vivo en el desarrollador
if (isDev) {
  build(nuxt)
}

// Podemos usar `nuxt.render(req, res)` o `nuxt.renderRoute(route, context)`
```

Puedes echar un vistazo a las guías de inico rapido de [nuxt-express](https://github.com/nuxt/express) y [adonuxt](https://github.com/nuxt/adonuxt).

### Registros de depuración

Si desea mostrar los registros de Nuxt.js, puede agregar lo siguiente en la parte superior de su archivo:

```js
process.env.DEBUG = 'nuxt:*'
```
