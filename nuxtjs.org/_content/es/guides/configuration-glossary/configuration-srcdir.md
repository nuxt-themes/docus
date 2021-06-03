---
title: 'La propiedad srcDir'
description: Defina el directorio de origen de tu aplicación Nuxt.js
menu: srcDir
category: configuration-glossary
position: 28
---

- Tipo: `String`
- Por defecto: [rootDir value](/docs/2.x/configuration-glossary/configuration-rootdir)

> Define el directorio de origen de tu aplicación Nuxt.js

Si se especifica una ruta relativa, será relativa al `rootDir`.

Ejemplo 1: Prerrequisitos:

```js{}[nuxt.config.js]
export default {
  srcDir: 'client/'
}
```

```js{}[package.json]
  "script": {
    "dev": "yarn nuxt"
  }
```

funciona con la siguiente estructura de carpetas (ten en cuenta que nuxt.config aparece en el directorio de la aplicación)

```bash
-| app/
---| node_modules/
---| nuxt.config.js
---| package.json
---| client/
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/
```

Ejemplo 2:

En lugar del ejemplo 1, también puedes mover nuxt.config a tu carpeta `src`. En este caso solo necesitas especificar el cliente como el `rootDir` y puedes dejar el `srcDir` vacío:

Prerrequisitos:

```js{}[nuxt.config.js]
export default {
  srcDir: '' // o simplemente quítalo
}
```

```js{}[package.json]
  "script": {
    "dev": "yarn nuxt client" // Esto establece al cliente como rootDir
  }
```

funciona con la siguiente estructura de carpetas (ten en cuenta que nuxt.config aparece en el directorio del cliente)

```bash
-| app/
---| node_modules/
---| package.json
---| client/
------| nuxt.config.js
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/
```
