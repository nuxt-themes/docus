---
title: Configuración
description: Por defecto, Nuxt.js está configurado para cubrir la mayoría de los casos de uso. Esta configuración predeterminada se puede sobreescribir con el archivo nuxt.config.js.
position: 7
category: features
csb_link_host_port: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/07_configuration_host_port?fontsize=14&hidenavigation=1&theme=dark
csb_link_pre-processors: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/07_configuration_pre-processors?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: ¿Puedes utilizar el módulo de axios en el archivo the nuxt.config.js?
    answers:
      - Verdadero
      - Falso
    correctAnswer: Falso
  - question: ¿Cual es el host predeterminado del servidor de desarrollo de Nuxt.js?
    answers:
      - localhost
      - 3000
      - '0'
    correctAnswer: localhost
  - question: ¿Qué atributo utilizas en tu etiqueta de estilo para usar SCSS?
    answers:
      - lang="scss"
      - language="scss"
      - style="scss"
    correctAnswer: lang="scss"
  - question: ¿Cuál es el puerto por defecto del servidor de desarrollo de Nuxt.js?
    answers:
      - 8000
      - 3000
      - localhost
    correctAnswer: 3000
  - question: En el archivo nuxt.config.js, ¿qué propiedad utilizas para agregar archivos globales CSS?
    answers:
      - styles
      - css
      - globalCss
    correctAnswer: css
  - question: ¿Puedes usar JSX en tu aplicación Nuxt.js?
    answers:
      - Verdadero
      - Falso
    correctAnswer: Verdadero
  - question: En el archivo nuxt.config.js, ¿qué propiedad utilizas para agregar archivos globales CSS?
    answers:
      - styles
      - css
      - global-css
    correctAnswer: css
  - question: En el archivo nuxt.config.js, ¿qué propiedad utilizas para extender la configuración de webpack?
    answers:
      - webpack.extend
      - build.extend
      - extend.build
    correctAnswer: build.extend
  - question: ¿Cuál es el archivo que es llamado para ignorar archivos en tu aplicación Nuxt.js?
    answers:
      - .ignore
      - .nuxtignore
      - .ignorenuxt
    correctAnswer: .nuxtignore
  - question: Si quieres el archivo about de tu aplicación Nuxt.js, ¿qué prefijo usarías?
    answers:
      - _about.vue
      - -about.vue
      - __about.vue
    correctAnswer: -about.vue
---

Por defecto, Nuxt.js está configurado para cubrir la mayoría de los casos de uso. Esta configuración predeterminada se puede sobreescribir con el archivo nuxt.config.js.

## La propiedad css

Nuxt.js te permite definir los archivos/módulos/librerías de CSS que quieras utilizar globalmente (incluidos en cada página).

<base-alert>

En caso de que quieras usar `sass` asegúrate de tener instalados los paquetes `sass` y `sass-loader`.

</base-alert>

En `nuxt.config.js`, agrega los recursos CSS:

```js{}[nuxt.config.js]
export default {
  css: [
    // Carga un módulo Node.js directamente (Aquí es un archivo Sass)
    'bulma',
    // Archivo CSS en el proyecto
    '~/assets/css/main.css',
    // Archivo SCSS en el proyecto
    '~/assets/css/main.scss'
  ]
}
```

<base-alert>

Nuxt.js automáticamente adivinará el tipo de archivo por su extensión y utilizará el preprocesador loader adecuado para webpack. Todavía necesitarás instalar el loader necesario si necesitas usarlos.

</base-alert>

### Extensiones de estilos

Puedes omitir la extensión de archivo para archivos CSS/SCSS/Postcss/Less/Stylus/... listados en el array css en tu archivo de configuración nuxt.

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main', '~/assets/css/animations']
}
```

<base-alert>

Si tienes dos archivos con el mismo nombre, por ejemplo: `main.scss` y `main.css`, y no especificas una extensión en la entrada array css, ejemplo: `css: ['~/assets/css/main']`, entonces solo se cargará un archivo dependiendo del orden de `styleExtensions`. En este caso sólo el archivo `css` será cargado y el archivo `scss` será ignorado porque el archivo `css` está en primer lugar en el array `styleExtension` por defecto.

</base-alert>

Orden predeterminado: `['css', 'pcss', 'postcss', 'styl', 'stylus', 'scss', 'sass', 'less']`

<app-modal>
  <code-sandbox  :src="csb_link_pre-processors"></code-sandbox>
</app-modal>

## Preprocesadores

Gracias a [Vue Loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html), puedes usar cualquier tipo de preprocesadores para tu `<template>` o `<style>`: usa el atributo `lang`.

Ejemplo de nuestro `pages/index.vue` usando [Pug](https://github.com/pugjs/pug) y [Sass](http://sass-lang.com/):

```html{}[pages/index.vue]
<template lang="pug"> h1.red Hello {{ name }}! </template>

<style lang="scss">
  .red {
    color: red;
  }
</style>
```

Para usar estos preprocesadores, necesitamos instalar sus webpack loaders:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D pug pug-plain-loader
yarn add -D sass sass-loader@10 fibers
```

  </code-block>
  <code-block label="npm">

```bash
npm install --save-dev pug pug-plain-loader
npm install --save-dev sass sass-loader@10 fibers
```

  </code-block>
</code-group>

## JSX

Nuxt.js utiliza [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app), que está basado en el paquete oficial [@vue/babel-preset-app](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app) para la configuración predeterminada de babel, por lo que puedes usar JSX en tus componentes.

También puedes usar JSX en el método `render` de tus componentes:

```js
<script>
export default {
  data () {
    return { name: 'World' }
  },
  render (h) {
    return <h1 class="red">{this.name}</h1>
  }
}
</script>
```

Definir un alias `createElement` a `h` es una convención común que verás en el ecosistema Vue pero en realidad es opcional para JSX ya que [inyecta automáticamente](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection) `const h = this.$createElement` en cualquier método y getter (no funciones o funciones arrow) declarado en la sintaxis ES2015 que tiene JSX, por lo tanto puedes borrar el parámetro (h).

Puedes aprender más acerca de cómo usarlo en la [sección JSX](https://vuejs.org/v2/guide/render-function.html#JSX) de la documentación de Vue.js.

## Ignorando archivos

### .nuxtignore

Puedes usar un archivo `.nuxtignore` para permitir que Nuxt.js ignore los archivos `layout`, `page`, `store` y `middleware` en el directorio raíz del proyecto (`rootDir`) durante la fase de compilación. El archivo `.nuxtignore` está sujeto a las mismas especificaciones que los archivos `.gitignore`  y  `.eslintignore`, en los que cada línea es un patrón global indicando qué archivos deben ignorarse.

```markdown{}[.nuxtignore]
# ignorar layout foo.vue

layouts/foo.vue

# ignorar archivos layout cuyo nombre termina con -ignore.vue

layouts/\*-ignore.vue

# ignorar la página bar.vue

pages/bar.vue

# ignorar la página dentro de la carpeta ignore

pages/ignore/\*.vue

# ignorar store baz.js

store/baz.js

# ignorar los archivos store que coincidan con _.test._

store/ignore/_.test._

# ignorar los archivos middleware debajo de la carpeta foo excepto foo/bar.js

middleware/foo/\*.js !middleware/foo/bar.js
```

### La propiedad ignorePrefix

Cualquier archivo en pages/, layout/, middleware/ o store/ será ignorado durante la compilación si su nombre de archivo empieza con el prefijo especificado por ignorePrefix.

Por defecto, todos los archivos que empiecen por `-` serán ignorados, como `store/-foo.js` y `pages/-bar.vue`. Esto permite la co-localización de textos, utilidades y componentes con sus callers sin convertirse en routes, stores, etc.

### La propiedad ignore

Mas personalizable que ignorePrefix: todos los archivos que coincidan con los patrones globales especificados dentro de ignore serán omitidos durante el proceso de compilación.

```js{}[nuxt.config.js]
export default {
  ignore: 'pages/bar.vue'
}
```

### ignoreOptions

`nuxtignore` está usando `node-ignore` por debajo, `ignoreOptions` puede ser configurado como `options` de `node-ignore`.

```js{}[nuxt.config.js]
export default {
  ignoreOptions: {
    ignorecase: false
  }
}
```

## Extender la configuración de webpack

Puedes extender la configuración de webpack a través de la opción `extend` en tu archivo `nuxt.config.js`. La opción `extend` de la propiedad `build` es un método que acepta dos argumentos. El primer argumento es el objeto `config` de webpack exportado por la configuración webpack de nuxt. El segundo parámetro es un objeto de contexto con las siguientes propiedades booleanas: `{ isDev, isClient, isServer, loaders }`.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isDev, isClient }) {
      // ..
      config.module.rules.push({
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      })
      // Establece el modo de webpack en 'desarrollo' si `isDev` es verdadero.
      if (isDev) {
        config.mode = 'development'
      }
    }
  }
}
```

El método `extend` es llamado dos veces - Una vez para el bundle del cliente y otra para el bundle del servidor.

### Personalizar la configuración de chunks

Es posible que quieras ajustar un poco la [configuración de optimización](/docs/2.x/configuration-glossary/configuration-build#optimization), evitando una sobreescritura del objeto por defecto.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.optimization.splitChunks.maxSize = 200000
      }
    }
  }
}
```

### Ejecuta ESLint en cada compilación de webpack en el entorno de desarrollo

Para tener en cuenta los errores de estilo de código, es posible que quieras ejecutar [ESLint](https://github.com/webpack-contrib/eslint-loader) en cada compilación en el entorno de desarrollo.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
```

## Editar host y port

Por defecto, el host del servidor de desarrollo es `localhost` el cual es solo accesible desde dentro del equipo host. Para ver la aplicación en otro dispositivo, debes modificar el host. Puedes modificarlo en tu archivo nuxt.config.js.

Host `'0.0.0.0'`  es designado para indicar a Nuxt.js que resuelva una dirección host, que es accesible a conexiones *fuera* de el equipo host (por ejemplo: LAN). Si el host es asignado con la cadena de valor `'0'` (no 0, que es falso), o `'0.0.0.0'` tu dirección de IP sera asignada a tu aplicación Nuxt.js.

```js{}[nuxt.config.js]
export default {
  server: {
    host: '0' // por defecto: localhost
  }
}
```

También puedes cambiar el número de puerto del puerto predeterminado 3000.

```js{}[nuxt.config.js]
export default {
  server: {
    port: 8000 // por defecto: 3000
  }
}
```

<base-alert type="info">

Si el puerto es asignado con la cadena con valor `'0'` (no 0, que es falso) un número de puerto aleatorio será asignado a tu aplicación Nuxt.js.

</base-alert>

Aunque puedes modificar esto en el archivo nuxt.config.js, no se recomienda, ya que podría causar problemas al alojar tu sitio. Es mucho mejor modificar el host y el puerto directamente en la línea de comando.

```bash
HOST=0 PORT=8000 npm run dev
```

o crear un script en tu package.json

```json
"scripts": {
  "dev:host": "nuxt --hostname '0' --port 8000"
}
```

<app-modal>
  <code-sandbox  :src="csb_link_host_port"></code-sandbox>
</app-modal>

## Configuración asincrónica

Aunque es mejor utilizar la configuración normal `export default {}` puedes tener una configuración asincrónica exportando una function async que retorna el objeto config.

```js{}[nuxt.config.js]
import axios from 'axios'

export default async () => {
  const data = await axios.get('https://api.nuxtjs.dev/posts')
  return {
    head: {
      title: data.title
      //... resto de la configuración
    }
  }
}
```

<base-alert>

El módulo axios no puede ser usado en `nuxt.config.js`. Necesitarás importar axios y configurarlo nuevamente.

</base-alert>

## Configuración adicional

<base-alert type="next">

El archivo `nuxt.config.js` tiene muchas más opciones de personalización y configuración! Echa un vistazo a todas sus keys en el [glosario de configuración](/docs/2.x/configuration-glossary/configuration-build).

</base-alert>

<quiz :questions="questions"></quiz>
