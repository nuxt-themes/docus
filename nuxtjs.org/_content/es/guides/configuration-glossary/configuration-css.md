---
title: 'La propiedad css'
description: Nuxt.js te permite definir los archivos/módulos/bibliotecas CSS que desea configurar globalmente (incluidos en cada página).
menu: css
category: configuration-glossary
position: 4
---

> Nuxt.js te permite definir los archivos/módulos/bibliotecas CSS que desea configurar globalmente (incluidos en cada página).

En caso de que desee utilizar `sass` asegúrese de haber instalado los paquetes `sass` y `sass-loader`. Si no solo

```sh
npm install --save-dev sass sass-loader@10 fibers
```

- Tipo: `Array`
  - Items: `string`

```js{}[nuxt.config.js]
export default {
  css: [
    // Cargue un módulo Node.js directamente (aquí es un archivo Sass)
    'bulma',
    // Archivo CSS en el proyecto
    '@/assets/css/main.css',
    // Archivo SCSS en el proyecto
    '@/assets/css/main.scss'
  ]
}
```

Nuxt.js adivinará automáticamente el tipo de archivo por su extensión y usará el cargador de preprocesador apropiado para webpack. Aún necesitará instalar el cargador requerido si necesita usarlos.

### Extensiones de estilo

Puede omitir la extensión de archivo para los archivos CSS/SCSS/Postcss/Less/Stylus/... enumerados en el array css en su archivo de configuración nuxt.

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main', '~/assets/css/animations']
}
```

<base-alert>

Si tiene dos archivos con el mismo nombre, por ejemplo. `main.scss` y `main.css`, y no especifique una extensión en la entrada del array css, por ejemplo. `css: ['~/assets/css/main']`, entonces solo se cargará un archivo dependiendo del orden de `styleExtensions`. En este caso, solo se cargará el archivo `css` y se ignorará el archivo `scss` porque `css` es lo primero en el array `styleExtension` predeterminado.

</base-alert>

Orden predeterminado: `['css', 'pcss', 'postcss', 'styl', 'stylus', 'scss', 'sass', 'less']`
