---
title: 'La clase ModuleContainer'
description: Clase ModuleContainer de Nuxt
menu: Module Container
category: internals-glossary
position: 6
---

- Source: **[core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/module.js)**

Todos los [módulos](/docs/2.x/directory-structure/modules) serán llamados en el contexto de la instancia `ModuleContainer`.

## Plugins Tapables

Podemos registrar los _hooks_ en ciertos eventos del ciclo de vida.

```js
nuxt.moduleContainer.plugin('ready', async moduleContainer => {
  // Haz esto después de que todos los módulos se encuentren listos
})
```

Dentro del contexto de [modulos](/docs/2.x/directory-structure/modules) podemos usar esto en su lugar:

```js
this.plugin('ready', async moduleContainer => {
  // Haz esto después de que todos los módulos se encuentren listos
})
```

| Plugin  | Argumentos      | Cuando                                                       |
| ------- | --------------- | ------------------------------------------------------------ |
| `ready` | moduleContainer | Todos los módulos en `nuxt.config.js` han sido inicializados |

## Métodos

### addVendor (vendor)

**`vendor` Está obsoleta y no se utiliza más**

Agrega a `options.build.vendor` y aplica un único filtro.

### addTemplate (template)

- **template**: `String` o `Object`
  - `src`
  - `options`
  - `fileName`

Representa la plantilla dada usando [lodash template](https://lodash.com/docs/4.17.4#template) durante el _build_ en el proyecto `buildDir` (`.nuxt`).

Si `fileName` no se proporciona o `template` es una string, el nombre de archivo de destino predeterminado es `[dirName].[fileName].[pathHash].[ext]`.

Este método devuelve final `{ dst, src, options }` object.

### addPlugin (template)

Registra un plugin usando `addTemplate` y lo añade como primera opción dentro de `plugins[]`.

Puedes usar `template.ssr: false` para deshabilitar el plugin incluido en en el paquete SSR.

### addServerMiddleware (middleware)

Inserta middleware en [options.serverMiddleware](/docs/2.x/configuration-glossary/configuration-servermiddleware).

### extendBuild (fn)

Permite extender fácilmente webpack build config mediante la función de encadenamiento [options.build.extend](/docs/2.x/configuration-glossary/configuration-build#extend).

### extendRoutes (fn)

Permite extender fácilmente rutas mediante la función de encadenamiento [options.build.extendRoutes](/docs/2.x/configuration-glossary/configuration-router#extendroutes).

### extendPlugins (fn)

Permite extender fácilmente plugins mediante la función de encadenamiento [options.extendPlugins](/docs/2.x/configuration-glossary/configuration-extend-plugins).

### addModule (moduleOpts, requireOnce)

_Async function_

Registra un módulo. `moduleOpts` puede ser una string o un array (`[src, options]`). Si `requireOnce` es `true` y el módulo resuelto exporta `meta`, evita registrar el mismo módulo dos veces.

### requireModule (moduleOpts)

_Async function_

Es un atajo para `addModule(moduleOpts, true)`

## Hooks

Podemos registrar los _hooks_ en ciertos eventos del ciclo de vida.

| Hook             | Argumentos                 | Cuando                                                                                        |
| ---------------- | -------------------------- | --------------------------------------------------------------------------------------------- |
| `modules:before` | (moduleContainer, options) | Es llamado antes de crear la clase ModuleContainer, útil para sobrecargar métodos y opciones. |
| `modules:done`   | (moduleContainer)          | Llamado cuando todos los módulos han sido cargados.                                           |
