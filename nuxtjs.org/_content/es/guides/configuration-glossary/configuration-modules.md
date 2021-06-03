---
title: 'La propiedad modules'
description: Los módulos son extensiones de Nuxt.js que pueden ampliar su funcionalidad principal y añadir un sinfín de integraciones.
menu: modules
category: configuration-glossary
position: 19
---

- Tipo: `Array`

> Los módulos son extensiones de Nuxt.js que pueden ampliar su funcionalidad principal y añadir un sinfín de integraciones. [Aprende más](/docs/2.x/directory-structure/modules)

Ejemplo (`nuxt.config.js`):

```js
export default {
  modules: [
    // Usando el nombre del paquete
    '@nuxtjs/axios',

    // Relativo al srcDir de tu proyecto
    '~/modules/awesome.js',

    // Proporcionando opciones
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // Definición en línea
    function () {}
  ]
}
```

Los desarrolladores de módulos (modules) suelen proporcionar los pasos y detalles adicionales necesarios para su uso.

Nuxt.js trata de resolver cada elemento del array modules usando la ruta requerida por node (en `node_modules`) y luego será resuelto desde el proyecto `srcDir` si se usa el alias: `~`. Los módulos se ejecutan secuencialmente por lo que el orden es importante.

Los módulos deben exportar una función para mejorar nuxt build/runtime y, opcionalmente, devolver una promesa hasta que su trabajo haya terminado. Ten en cuenta que son necesarios en tiempo de ejecución (runtime), por lo que deberían estar ya transpuestos si dependen de las modernas características de ES6.

Por favor échale un vistazo a la [Guía de módulos](/docs/2.x/directory-structure/modules) para más información sobre como trabajan o si te apetece desarrollar tu propio módulo. Además, hemos proporcionado una sección [Modules](https://github.com/nuxt-community/awesome-nuxt#modules) oficial enumerando docenas de módulos listos para usar hechos por la Comunidad de Nuxt.

## `buildModules`

<div class="Alert Alert--info">

Esta funcionalidad está disponible desde Nuxt v2.9

</div>

Algunos módulos sólo se requieren durante el tiempo de desarrollo (development) y construcción (build). El uso de `buildModules` ayuda a hacer más rápido el inicio de nuestro sitio en producción y también disminuye significativamente el tamaño de `node_modules` en los despliegues a producción. Por favor, consulta la documentación de cada módulo para ver si se recomienda utilizar `modules` o `buildModules`.

La diferencia de uso es:

- En lugar de añadir `modules` dentro de `nuxt.config.js`, usa `buildModules`
- En lugar de añadir `dependencies` dentro de `package.json`, usa `devDependencies` (`yarn add --dev` o `npm install --save-dev`)
