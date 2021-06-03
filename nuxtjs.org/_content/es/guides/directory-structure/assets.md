---
title: recursos
description: El directorio de `assets` (recursos), contiene recursos sin compilar, como imágenes, fuentes de texto o archivos de Sass y Stylus.
position: 2
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/02_assets?fontsize=14&hidenavigation=1&theme=dark
videoScript:
  - assets-video.md
questions:
  - question: ¿Qué directorios contienen los archivos sin compilar, Stylus o Sass, imágenes, o fuentes?
    answers:
      - static
      - assets
      - pages
    correctAnswer: assets
  - question: ¿Cómo puedes referenciar el directorio de recursos (`assets`) dentro de los Vue templates?
    answers:
      - '/assets/tu_imagen.png'
      - '@assets/tu_imagen.png'
      - '@/assets/tu_imagen.png'
    correctAnswer: '@/assets/tu_imagen.png'
  - question: ¿Cómo puedes referenciar el directorio de recursos dentro (`assets`) de archivos CSS?
    answers:
      - url("@assets/banner.svg")
      - url("assets/banner.svg")
      - url("@/assets/banner.svg")
    correctAnswer: url("@assets/banner.svg")
  - question: ¿Dónde se incluyen estilos css globales?
    answers:
      - En tu archivo index.vue
      - En el archivo nuxt.config.js
      - En el archivo de `layout` por defecto
    correctAnswer: En el archivo nuxt.config.js
  - question: ¿Qué propiedad css se usa para importar fuentes globales?
    answers:
      - font
      - head
      - css
    correctAnswer: head
  - question: ¿Cuál loader te permite añadir un archivo como base-64 data URL?
    answers:
      - file-loader
      - url-loader
      - image-loader
    correctAnswer: url-loader
  - question: ¿Cuáles son los aliases para el directorio del source (srcDir)?
    answers:
      - '@'
      - '@@'
      - '^'
    correctAnswer: '@'
  - question: ¿Cuáles son los aliases para el directorio del root (rootDir)?
    answers:
      - '@'
      - '@@'
      - '@root'
    correctAnswer: '@@'
---

El directorio de `assets` (recursos), contiene recursos sin compilar, como imágenes, fuentes de texto o archivos de Sass y Stylus.

## Imágenes

Si deseas incluir algún recurso dentro del directorio de `assets` en los templates de `vue` puedes hacerlo usando `~/assets/tu_imagen.png` con una barra antes de `assets`.

```html
<template>
  <img src="~/assets/tu_imagen.png" />
</template>
```

Si necesitar referir algún recurso dentro de `assets` en tu css, puedes hacerlo asi: `~assets/tu_imagen.png` (sin una barra antes de la palabra `assets`).

```css
background: url('~assets/banner.svg');
```

Si deseas trabajar con imágenes dinámicas, tienes que usar `require`.

```html
<img :src="require(`~/assets/img/${imagen}.jpg`)" />
```

<base-alert type="next">

Conoce más sobre [webpack Assets](/docs/2.x/directory-structure/assets#webpack-assets)

</base-alert>

## Estilos

Nuxt.js te permite definir cualquier archivo css, módulos, o librerías que desees configurar globalmente (incluido en cada página). Puedes añadir tus estilos fácilmente desde el `nuxt.config`

```js{}[nuxt.config.js]
export default {
  css: [
    // Carga un módulo de Node.js directamente (en este caso es un archivo de Sass)
    'bulma',
    // Un archivo css dentro del proyecto
    '~/assets/css/main.css',
    // Un archivo SCSS dentro del proyecto
    '~/assets/css/main.scss'
  ]
}
```

<base-alert type="info">

Si deseas usar `sass` asegúrate de que tengas los paquetes de `sass` y `sass-loader` instalados.

</base-alert>

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D sass sass-loader@10 fibers
```

  </code-block>
  <code-block label="npm">

```bash
npm install --save-dev sass sass-loader@10 fibers
```

  </code-block>
</code-group>

Nuxt.js va a saber automáticamente que tipo de archivo tienes y usará el pre-procesador apropiado de webpack. Comoquiera tendrás que instalar los loaders requeridos si quieres usarlos.

## Fuentes

Puedes usar las fuentes locales si las añades dentro del directorio de `assets`. Cuando ya las hayas añadido, puedes usarlas en tu css con `@font-face`.

```
-| assets
----| fonts
------| DMSans-Regular.ttf
------| DMSans-Bold.ttf
```

```css{}[assets/main.css]
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  /* Accesando el archivo de fuentes dentro del directorio de assets */
  src: url('~assets/fonts/DMSans-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('~assets/fonts/DMSans-Bold.ttf') format('truetype');
}
```

<base-alert type="next">

Aprende cómo añadir fuentes externas (como las fuentes de Google Fonts), en el [capítulo de Meta Tags y SEO](/docs/2.x/features/meta-tags-seo#external-resources)

</base-alert>

## Recursos de Webpack

Nuxt usa `vue-loader`, `file-loader` y `url-loader` por defecto para servir los recursos del proyecto. También puedes usar el directorio de `static` para recursos que no deberían correr con Webpack.

## Webpack

[vue-loader](http://vue-loader.vuejs.org/) procesa automáticamente los archivos de estilos y templates con `css-loader` y el compilador de Vue template sin ningun tipo de configuración adicional. En este proceso de compilación, todos los URLs de los recursos, `<img src="...">`, `background: url(...)`y CSS `@import` se resuelven como dependencias de módulos.

Por ejemplo, tenemos este arbol de archivos:

```
-| assets/
----| imagen.png
-| pages/
----| index.vue
```

Si usas `url('~assets/imagen.png')` dentro de tu CSS, se traducirá automaticamente a  `require('~/assets/imagen.png')`.

<base-alert>

Importante notar que el alias de `~/` no será resuelto correctamente dentro de tu CSS. Tienes que usar `~assets` (**sin la barra**) en el `url` o referencias en el CSS, ejemplo: `background: url("~assets/banner.svg")`

</base-alert>

Si referencias esa imagen en `pages/index.vue`:

```html{}[pages/index.vue]
<template>
  <img src="~/assets/imagen.png" />
</template>
```

Será compilada a:

```js
createElement('img', { attrs: { src: require('~/assets/imagen.png') } })
```

Nuxt sabe que `.png` no es un archivo de Javascript, automáticamente configura webpack para que use [file-loader](https://github.com/webpack/file-loader) y [url-loader](https://github.com/webpack/url-loader) y los maneje por ti.

Los beneficios de estos loaders son:

`file-loader` te permite determinar donde deberia copiar y pegar el archivo, y como se debería nombrar usando hash de version para mejor manejo del cache. En producción, esto te permitirá usar long-term caching por defecto.

`url-loader` te permite incluir un recurso como base-64 data URL si son más pequeños que el límite provisto. Esto reduce significativamente el número de solicitudes HTTP para archivos triviales. Si el archivo es mayor que el límite, automáticamente vuelve a usar `file-loader`.

La configuración inicial para estos loaders es la siguiente:

```js
// https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L297-L316
;[
  {
    test: /\.(png|jpe?g|gif|svg|webp)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

Esto significa que cada archivo con menos de 1KB va a ser incluido como base-64 data URL. De lo contrario, la imagen o fuente, será copiada en el directorio correspondiente (dentro del directorio de `.nuxt`) con un nombre que contiene la versión para el cache.

Cuando publiques tu aplicación con `nuxt` el template dentro de `pages/index.vue`:

```html{}[pages/index.vue]
<template>
  <img src="@/assets/ut_imagen.png" />
</template>
```

Será transformado en:

```html
<img src="/_nuxt/img/tu_imagen.0c61159.png" />
```

Si quieres cambiar las configuraciones del loader, puedes usar [build.extend](/docs/2.x/configuration-glossary/configuration-build#extend)

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

## Aliases

Por defecto el directorio de fuente (srcDir) y el directorio del proyecto (rootDir) son lo mismo. Puedes usar el alias de `~` para el directorio fuente. En vez de escribir direcciones relativas como `../assets/tu_imagen.png` puedes usar `~/assets/tu_imagen.png`.

Ambos resultan en lo mismo.

```html{}[components/Avatar.vue]
<template>
  <div>
    <img src="../assets/tu_imagen.png" />
    <img src="~/assets/tu_imagen.png" />
  </div>
</template>
```

Recomendamos que uses `~` como alias. `@` se puede usar pero no funcionará en todos los casos, casos como imágenes de background dentro del css por ejemplo.

Puedes usar el alias de `~~` o `@@` para accesar el directorio del proyecto (rootDir).

<base-alert type="info">

Tip: en un teclado español puedes accesar `~` with (`Option` + `ñ`) en Mac OS

</base-alert>

<quiz :questions="questions"></quiz>
