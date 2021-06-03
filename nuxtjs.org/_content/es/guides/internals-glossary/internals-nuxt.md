---
title: 'La clase Nuxt'
description: Clase principal de Nuxt
menu: Clase Nuxt
category: internals-glossary
position: 4
---

- Source: **[core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)**

Este es el contenedor principal que permite que todos los módulos y clases se comuniquen entre sí. Todos los módulos tienen acceso a la instancia de Nuxt usando `this.nuxt`.

## Hooks

Podemos registrar los _hooks_ en ciertos eventos del ciclo de vida.

```js
nuxt.hook('ready', async nuxt => {
  // Tu código personalizado aquí
})
```

| Plugin   | Argumentos             | Cuando                                                                                |
| -------- | ---------------------- | ------------------------------------------------------------------------------------- |
| `ready`  | (nuxt)                 | Nuxt está listo para trabajar (`ModuleContainer` y `Renderer` listos).                |
| `error`  | (error)                | Se da un error no controlado al llamar a hooks.                                       |
| `close`  | (nuxt)                 | La instancia de Nuxt se está cerrando con gracia.                                     |
| `listen` | (server, {host, port}) | El servidor Nuxt **interno** comienza a escuchar. (Usando `nuxt start` o `nuxt dev`). |
