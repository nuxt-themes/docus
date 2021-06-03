---
title: 'La clase Renderer'
description: Clase Renderer de Nuxt
menu: Renderer
category: internals-glossary
position: 5
---

- Source: **[vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)**

Esta clase está exportando un middleware de conexión que maneja y sirve todas las solicitudes de activos y SSR.

## Hooks

Podemos registrar los _hooks_ en ciertos eventos del ciclo de vida.

| Hook                     | Argumentos               | Cuando                                                                                                                                                                                                                                   |
| ------------------------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `render:before`          | (renderer, options)      | Antes de configurar el middleware y los recursos para la clase Renderer, útil para sobrecargar algunos métodos u opciones.                                                                                                               |
| `render:setupMiddleware` | (app) _connect instance_ | Antes de que Nuxt agregue su pila de middleware. Podemos usarlo para registrar un middleware del lado del servidor personalizado.                                                                                                        |
| `render:errorMiddleware` | (app) _connect instance_ | Antes de agregar el middleware de errores de Nuxt, es útil agregar tu propio middleware antes de usar Nuxt. Ver el [módulo Sentry](https://github.com/nuxt-community/sentry-module/blob/v4.0.3/lib/module.js#L151) para más información. |
| `render:resourcesLoaded` | (resources)              | Se llama después de que se cargan los recursos para el renderizador (manifiesto del cliente, paquete del servidor, etc.).                                                                                                                |
| `render:done`            | (renderer)               | Middleware para SSR y todos los recursos están listos (Renderer listo)                                                                                                                                                                   |
| `render:routeContext`    | (context.nuxt)           | _Cada vez que una ruta es renderizada por el servidor y antes de `render:route` hook_. Se llama antes de serializar el contexto de Nuxt en `window.__NUXT__`, útil para agregar algunos datos y obtenerlos en el lado del cliente.       |
| `render:route`           | (url, result, context)   | _Cada vez que se procesa una ruta en el servidor_. Se llama antes de devolver la solicitud al navegador.                                                                                                                                 |
| `render:routeDone`       | (url, result, context)   | _Cada vez que se procesa una ruta en el servidor_. Llamado después de que la respuesta se haya enviado al navegador.                                                                                                                     |
