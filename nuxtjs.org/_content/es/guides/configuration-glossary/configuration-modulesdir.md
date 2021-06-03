---
title: 'La propiedad modulesDir'
description: Define la carpeta modules para tu aplicación Nuxt.js
menu: modulesDir
category: configuration-glossary
position: 20
---

- Tipo: `Array`
- Por defecto: `['node_modules']`

> Se utiliza para configurar los directorios de los módulos (modules) para la resolución de rutas, por ejemplo: Webpack's `resolveLoading`, `nodeExternals` y `postcss`. La ruta de configuración es relativa a [options.rootDir](/docs/2.x/configuration-glossary/configuration-rootdir) (por defecto: `process.cwd()`).

```js{}[nuxt.config.js]
export default {
  modulesDir: ['../../node_modules']
}
```

Configurar este campo puede ser necesario si tu proyecto está organizado como un espacio de trabajo mono-repositorio de Yarn.
