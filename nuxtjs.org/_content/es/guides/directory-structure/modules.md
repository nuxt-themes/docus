---
title: modules
description: Nuxt.js provides a higher-order module system that makes it possible to extend the core. Modules are functions that are called sequentially when booting Nuxt.js.
position: 9
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/10_modules?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/modules.svg
imgAlt: modules-in-nuxt-js
questions:
  - question: ¿Cuándo se llaman los módulos?
    answers:
      - antes de que Nuxt.js inicie
      - mientras Nuxt.js se ejecuta
      - después de que Nuxt.js inicia
    correctAnswer: antes de que Nuxt.js inicie
  - question: Los módulos Nuxt.js pueden ser incluidos en paquetes npm
    answers:
      - verdadero
      - falso
    correctAnswer: verdadero
  - question: Dentro de qué propiedad en nuxt.config.js se agregan los módulos?
    answers:
      - nuxtModules
      - modules
      - plugins
    correctAnswer: modules
  - question: El orden en que se agregan los módulos al fichero nuxt.config.js es imporante
    answers:
      - verdadero
      - falso
    correctAnswer: verdadero
  - question: ¿Dónde se deben agregar los módulos que solo se requieren durante el desarrollo y el tiempo de compilación?
    answers:
      - modules
      - build
      - buildModules
    correctAnswer: buildModules
  - question: ¿Qué son los módulos exactamente?
    answers:
      - arrays
      - funciones
      - plugins
    correctAnswer: funciones
  - question: ¿Qué usamos cuando queremos hacer cosas solo en condiciones específicas y no solo durante la inicialización de Nuxt.js?
    answers:
      - plugins
      - hooks
      - asyncData
    correctAnswer: hooks
  - question: Los módulos pueden
    answers:
      - solo ser usados como paquetes npm
      - solo ser incluidos en el código fuente del proyecto
      - ambos
    correctAnswer: ambos
  - question: ¿Qué línea es necesaria si vas a publicar tu módulo como un paquete npm?
    answers:
      - module.exports
      - module.exports.meta
      - module.exports.module
    correctAnswer: module.exports.meta
  - question: Puedes decirle a Nuxt.js que cargue módulos con parámetros opcionales como opciones
    answers:
      - verdadero
      - falso
    correctAnswer: verdadero
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

Al desarrollar aplicaciones de nivel de producción con Nuxt.js, es posible que la funcionalidad principal del framework no sea suficiente. Nuxt.js se puede ampliar con opciones de configuración y plugins, pero mantener estas personalizaciones en varios proyectos es tedioso, repetitivo y requiere mucho tiempo. Por otro lado, respaldar las necesidades de cada proyecto desde el núcleo de Nuxt.js haría que este fuera muy complejo y difícil de usar.

Esta es una de las razones por las que Nuxt.js proporciona un sistema de módulos de orden superior que permite ampliar el núcleo. Los módulos son funciones que se llaman secuencialmente al arrancar Nuxt.js. Luego espera a que finalice cada módulo antes de continuar. De esta forma, los módulos pueden personalizar casi cualquier aspecto de su proyecto. Gracias al diseño modular de Nuxt.js (basado en [Tapable](https://github.com/webpack/tapable) webpack), los módulos pueden registrar fácilmente hooks para ciertos puntos de entrada como la inicialización del constructor. Los módulos también pueden sobrescribir plantillas, configurar cargadores de webpacks, agregar bibliotecas CSS y realizar muchas otras tareas útiles.

Lo mejor de todo es que los módulos Nuxt.js se pueden incorporar en paquetes npm. Esto hace posible la reutilización entre proyectos y compartir con la comunidad, lo que ayuda a crear un ecosistema de complementos de alta calidad.

## La propiedad modules

Los módulos permiten extender las funcionalidades del núcleo de Nuxt.js e incluir nuevas integraciones. Una vez instalados los módulos, debes agregarlos al fichero nuxt.config.js dentro de la propiedad modules.

```js{}[nuxt.config.js]
export default {
  modules: [
    // Using package name
    '@nuxtjs/axios',

    // Relative to your project srcDir
    '~/modules/awesome.js',

    // Providing options
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // Inline definition
    function () {}
  ]
}
```

<base-alert type="info">

Los desarrolladores de módulos suelen proporcionar pasos y detalles adicionales necesarios para su uso.

</base-alert>

Nuxt.js trata de encontrar cada elemento en la propiedad modules buscando en `node_modules` y luego en el `srcDir` del proyecto si se usó un alias (`@`).

<base-alert>

Los módulos se ejecutan secuencialmente, por lo que el orden es importante.

</base-alert>

Los módulos deben exportar una función para mejorar la compilación / tiempo de ejecución y, opcionalmente, devolver un Promise hasta que finalice su trabajo. Ten en cuenta que los módulos se importan en tiempo de ejecución, por lo que ya deberían haber sido transpilados si se utilizan las funciones modernas de ES6.

## Escribe tu propio Módulo

Los módulos son funciones. Se pueden empaquetar como módulos npm o incluirse directamente en el código fuente del proyecto.

```js{}[nuxt.config.js]
export default {
  exampleMsg: 'hello',
  modules: [
    // Simple usage
    '~/modules/simple',
    // Passing options directly
    ['~/modules/simple', { token: '123' }]
  ]
}
```

```js{}[modules/example.js]
export default function ExampleModule(moduleOptions) {
  console.log(moduleOptions.token) // '123'
  console.log(this.options.exampleMsg) // 'hello'

  this.nuxt.hook('ready', async nuxt => {
    console.log('Nuxt is ready')
  })
}

// REQUIRED if publishing the module as npm package
module.exports.meta = require('./package.json')
```

## 1) ModuleOptions

`moduleOptions`: Este es el objeto que el usuario pasa usando el array `modules`. Podemos usarlo para personalizar su comportamiento.

### Opciones de primer nivel

A veces es más conveniente si podemos usar opciones de nivel superior mientras registramos módulos en `nuxt.config.js`. Esto nos permite combinar opciones de múltiples fuentes.

```js{}[nuxt.config.js]
export default {
  modules: [['@nuxtjs/axios', { anotherOption: true }]],

  // axios module is aware of this by using `this.options.axios`
  axios: {
    option1,
    option2
  }
}
```

## 2) this.options

`this.options`: Puedes acceder directamente a las optiones de Nuxt.js usando esta referencia. Este es el contenido del  `nuxt.config.js` del usuario con las opciones por defecto asignadas. Puede ser usado para compartir opciones entre módulos.

```js{}[module.js]
export default function (moduleOptions) {
  // `options` will contain option1, option2 and anotherOption
  const options = Object.assign({}, this.options.axios, moduleOptions)

  // ...
}
```

### Agregar una biblioteca CSS

Si tu módulo contiene una bibloteca CSS, asegúrate de comprobar si el usuario ya la agregó por su cuenta para evitar duplicados, y agrega una opción para desactivar la inclusión de la biblioteca CSS en el módulo.

```js{}[module.js]
export default function (moduleOptions) {
  if (moduleOptions.fontAwesome !== false) {
    // Add Font Awesome
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```

### Emitir assets

Podemos registrar plugins webpack para emitir assets durante la construcción.

```js{}[module.js]
export default function (moduleOptions) {
  const info = 'Built by awesome module - 1.3 alpha on ' + Date.now()

  this.options.build.plugins.push({
    apply(compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        // This will generate `.nuxt/dist/info.txt' with contents of info variable.
        // Source can be buffer too
        compilation.assets['info.txt'] = {
          source: () => info,
          size: () => info.length
        }

        cb()
      })
    }
  })
}
```

## 3) this.nuxt

`this.nuxt`: Referencia a la instancia actual de Nuxt.js. Podemos registrar hooks en los diferentes eventos del ciclo de vida.

- **Ready** : Nuxt está listo para trabajar (ModuleContainer y Renderer listos).

```js
nuxt.hook('ready', async nuxt => {
  // Your custom code here
})
```

- **Error**: Un error que no han sido manejado al invocar hooks.

```js
nuxt.hook('error', async error => {
  // Your custom code here
})
```

- **Close**: La instancia de Nuxt se está cerrando correctamente.

```js
nuxt.hook('close', async nuxt => {
  // Your custom code here
})
```

- **Listen**: El servidor interno de Nuxt ha comenzado a escuchar. (Usando nuxt start o nuxt dev)

```js
nuxt.hook('listen', async (server, {host, port})) => {
  // Your custom code here
})
```

`this`: Contexto de los módulos. Todos los módulos en el contexto de la instancia de ModuleContainer.

Mira la documentación de la clases [ModuleContainer](/docs/2.x/internals-glossary/internals-module-container) para ver los métodos disponibles.

### Ejecutar tareas en hooks específicos

Es posible que tu módulo deba hacer cosas solo en condiciones específicas y no solo durante la inicialización de Nuxt.js. Podemos usar los poderosos hooks de Nuxt.js para realizar tareas en eventos específicos (basados en [Hookable](https://github.com/nuxt-contrib/hookable)). Nuxt.js esperará a que la función termine si esta devuelve un Promise o si está definida como `async`.

Algunos ejemplos básicos:

```js{}[modules/myModule.js]
export default function myModule() {
  this.nuxt.hook('modules:done', moduleContainer => {
    // This will be called when all modules finished loading
  })

  this.nuxt.hook('render:before', renderer => {
    // Called after the renderer was created
  })

  this.nuxt.hook('build:compile', async ({ name, compiler }) => {
    // Called before the compiler (default: webpack) starts
  })

  this.nuxt.hook('generate:before', async generator => {
    // This will be called before Nuxt generates your pages
  })
}
```

### Proveer plugins

Es común que los módulos provean plugins cuando son agregados a la aplicación. Por ejemplo, el módulo [bootstrap-vue](https://bootstrap-vue.js.org/) tratará de registrarse a si mismo en Vue. En esas situaciones podemos utilizar el helper `this.addPlugin`.

```js{}[plugin.js]
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```

```js{}[module.js]
import path from 'path'

export default function nuxtBootstrapVue(moduleOptions) {
  // Register `plugin.js` template
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

### Plantillas de plugins

Registered templates and plugins can leverage [lodash templates](https://lodash.com/docs/4.17.4#template) to conditionally change registered plugins output.

```js{}[plugin.js]
// Set Google Analytics UA
ga('create', '<%= options.ua %>', 'auto')

<% if (options.debug) { %>
// Dev only code
<% } %>
```

```js{}[module.js]
import path from 'path'

export default function nuxtGoogleAnalytics(moduleOptions) {
  // Register `plugin.js` template
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      // Nuxt will replace `options.ua` with `123` when copying plugin to project
      ua: 123,

      // conditional parts with dev will be stripped from plugin code on production builds
      debug: this.options.dev
    }
  })
}
```

### Registra cargadores personalizados de webpack

Podemos hacer los mismo como  `build.extend`  en  `nuxt.config.js`  utilizando  `this.extendBuild`.

```js{}[module.js]
export default function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
      // `.foo` Loader
      config.module.rules.push({
        test: /\.foo$/,
        use: [...]
      })

      // Customize existing loaders
      // Refer to source code for Nuxt internals:
      // https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```

## Módulos Async

No todos los módulos hacer las operaciones de forma síncrona. Por ejemplo, pudieras querer desarrollar un módulo que obtiene información de alguna API or hace otra operación asíncrona. Para esto, Nuxt.js soporta módulos async que devuelven un Promise or llaman a un callback.

### Usa async/await

```js
import fse from 'fs-extra'

export default async function asyncModule() {
  // You can do async work here using `async`/`await`
  const pages = await fse.readJson('./pages.json')
}
```

### Devuelve un Promise

```js
export default function asyncModule($http) {
  return $http
    .get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      // Do something by extending Nuxt routes
    })
}
```

<base-alert type="info">

Hay muchos mas hooks y posibilidades para los módulos. Consula [Interioridades de Nuxt](/docs/2.x/internals-glossary/internals) para conocer más de la API nuxt-internal.

</base-alert>

## Publicando tu módulo

`module.exports.meta`: Esta línea es requerida si vas a publicar el módulo como un paquete npm. Nuxt internamente utiliza meta para trabajar mejor con el módulo.

```js{}[modules/myModule.js]
module.exports.meta = require('./package.json')
```

## buildModules

Algunos módulos se importan solamente durante el desarrollo y la construcción del proyecto. Utilizar `buildModules` ayuda a aceler el inicio de la versión de producción y disminuye considerablemente el tamaño del directorio `node_modules` para despliegues de producción. Refiérete a la documentación de cada módulo para conocer si es recomendado agregarlos como `modules` o `buildModules`.

La diferencia en el uso es:

- En lugar de agregarlo a `modules` dentro de `nuxt.config.js`, hazlo en `buildModules`

```js{}[nuxt.config.js]
export default {
  buildModules: ['@nuxtjs/eslint-module']
}
```

- En lugar de agregarlo a `dependencies` en `package.json`, hazlo en `devDependencies`

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D @nuxtjs/eslint-module
```

  </code-block>
  <code-block label="npm">

```bash
npm install --save-dev @nuxtjs/eslint-module
```

  </code-block>
</code-group>

<base-alert type="info">

Si eres el autor de un módulo, es altamente recomendado sugerir a los usuarios instalar los módulos com `devDependency` y usar  `buildModules` en lugar de  `modules` para `nuxt.config.js`.

</base-alert>

Tu módulo es un `buildModule` a menos que:

- Provee un serverMiddleware
- Tiene que registrar un Node.js runtime hook (Como sentry)
- Está afectado el comportamiento de vue-renderer o usando un hook de los namespaces `server:` o `vue-renderer:`
- Cualquier cosa fuera del alcance de webpack (Hint: plugins y plantillas que son compiladas y en el alcance de webpack)

<base-alert> 

Si vas a ofrecer el uso de  `buildModules` menciona que esto solo está disponible a partir de Nuxt v2.9. Los usuarios de versiones anteriores de Nuxt deben actualizarlo o utilizar la sección `modules`.

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
