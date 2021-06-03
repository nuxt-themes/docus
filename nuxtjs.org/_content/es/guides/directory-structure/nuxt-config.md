---
title: nuxt.config
description: De forma predeterminada, Nuxt.js está configurado para cubrir la mayoría de los casos de uso. Esta configuración predeterminada se puede sobrescribir con el archivo nuxt.config.js.
position: 14
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/15_nuxt-config?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
---

De forma predeterminada, Nuxt.js está configurado para cubrir la mayoría de los casos de uso. Esta configuración predeterminada se puede sobrescribir con el archivo nuxt.config.js.

## nuxt.config.js

### build

Esta opción te permite configurar algunos ajustes para el paso `build`,  
incluyendo también las opciones `loaders`, `filename`, `webpack`, `transpilation`.

```js{}[nuxt.config.js]
export default {
  build: {
    /*
     ** Puedes extender la configuracion de webpack aqui
     */
    extend(config, ctx) {}
  }
}
```

<base-alert type="next">

Aprende más sobre [build property](/docs/2.x/configuration-glossary/configuration-build)

</base-alert>

### css

Esta opción te permite definir los archivos CSS, los módulos y las bibliotecas que desea incluir globalmente (en cada página).

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main.css', '~/assets/css/animations.scss']
}
```

No es necesario colocar la extensión para los archivos CSS, SCSS, Postcss, Less, Stylus, ... enumerados en el arreglo css en el archivo `nuxt.config`.

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main', '~/assets/css/animations']
}
```

Al omitir la extensión, si tiene un archivo css y decides cambiar para usar sass, por ejemplo, no es necesario actualizar el `nuxt.config` ya que usará la nueva extensión una vez que el nombre del archivo siga siendo el mismo.

<base-alert type="next">

Aprende más sobre [css property](/docs/2.x/configuration-glossary/configuration-css)

</base-alert>

### dev

Esta opción te permite definir el ambiente en el que se ejecutara tu aplicación  
Puede ser `development` o `production`  (importante cuando usas Nuxt.js de manera programática)

```js{}[nuxt.config.js]
export default {
  dev: process.env.NODE_ENV !== 'production'
}
```

<base-alert type="next">

Aprende más sobre [dev property](/docs/2.x/configuration-glossary/configuration-dev)

</base-alert>

### env

Esta opción te permite definir variables de entorno que estarán disponibles tanto para el cliente como para el servidor.

```js{}[nuxt.config.js]
export default {
  env: {
    baseUrl: process.env.BASE_URL || baseUrl
  }
}
```

<base-alert type="next">

Aprende más sobre [env property](/docs/2.x/configuration-glossary/configuration-env)

</base-alert>

### generate

Esta opción te permite configurar parámetros para cada ruta dinámica en tu aplicación que posteriormente Nuxt.js transformará en archivos HTML.

```js{}[nuxt.config.js]
export default {
  generate: {
    dir: 'gh_pages', // gh_pages/ instead of dist/
    subFolders: false // HTML files are generated according to the route path
  }
}
```

<base-alert type="next">

Aprende más sobre [generate property](/docs/2.x/configuration-glossary/configuration-generate)

</base-alert>

### head

Esta opción te permite definir todas las etiquetas de metadatos predeterminadas para tu aplicación.

```js{}[nuxt.config.js]
export default {
	head: {
    title: 'my title',
    meta: [
      { charset: 'utf-8' },
			.....
		]
	}
}
```

<base-alert type="next">

Aprende más en [head integration](/docs/2.x/configuration-glossary/configuration-head)

</base-alert>

### loading

Esta opción te permite personalizar el componente de carga que usa Nuxt.js de forma predeterminada.

```js{}[nuxt.config.js]
export default {
  loading: {
    color: '#fff'
  }
}
```

<base-alert type="next">

Aprende más en [loading integration](/docs/2.x/configuration-glossary/configuration-loading)

</base-alert>

### modules

Con esta opción puede agregar más módulos de Nuxt.js al proyecto.

```js{}[nuxt.config.js]
export default {
  modules: ['@nuxtjs/axios']
}
```

<base-alert type="next">

Aprende más sobre [modules property](/docs/2.x/configuration-glossary/configuration-modules)

</base-alert>

### modulesDir

La propiedad modulesDir se utiliza para establecer los directorios de los módulos para la resolución de rutas.
Por ejemplo: `resolveLoading`, `nodeExternals` y `postcss` de Webpack.  
La ruta de configuración es relativa a `options.rootDir` (predeterminado: process.cwd()).

```js{}[nuxt.config.js]
export default {
  modulesDir: ['../../node_modules']
}
```

Es posible que sea necesario configurar este campo si tu proyecto está organizado como un `workspace-styled mono-repository` de Yarn.

<base-alert type="next">

Aprende más sobre [modulesDir property](/docs/2.x/configuration-glossary/configuration-modulesdir)

</base-alert>

### plugins

Esta opcion te permite definir plugins de javascript que debe ser ejecutados antes de crear una instancia de la aplicación principal de Vue.js

```js{}[nuxt.config.js]
export default {
  plugins: ['~/plugins/url-helpers.js']
}
```

<base-alert type="next">

Aprende más sobre [plugins property](/docs/2.x/configuration-glossary/configuration-plugins)

</base-alert>

### router

Con la opción de `router`, puedes sobrescribir la configuración predeterminada de Nuxt.js de Vue Router.

```js{}[nuxt.config.js]
export default {
  router: {
    linkExactActiveClass: 'text-primary'
  }
}
```

<base-alert type="next">

Aprende más sobre [router property](/docs/2.x/configuration-glossary/configuration-router)

</base-alert>

### server

Esta opción te permite configurar las variables de conexión para la instancia del servidor de tu aplicación Nuxt.js.

```js{}[nuxt.config.js]
import path from 'path'
import fs from 'fs'

export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    }
  }
}
```

<base-alert type="next">

Aprende más sobre [server property](/docs/2.x/configuration-glossary/configuration-server)

</base-alert>

### srcDir

Esta opción te permite definir el directorio de origen de su aplicación Nuxt.js.

```js{}[nuxt.config.js]
export default {
  srcDir: 'client/'
}
```

Ejemplo de estructura de proyecto una aplicación de Nuxt.js en el directorio `source`.

```bash
**-| app/
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
------| store/**
```

### dir

Esta opción te permite definir nombres personalizados para tus directorios en Nuxt.js.

```js{}[nuxt.config.js]
export default {
  pages: 'views' // Nuxt buscará el directorio views/ en vez del directorio pages/
}
```

<base-alert type="next">

Aprende más en [dir property](/docs/2.x/configuration-glossary/configuration-dir)

</base-alert>

### pageTransition

Esta opción te permite definir las propiedades predeterminadas de las transiciones de página.

```js{}[nuxt.config.js]
export default {
  pageTransition: 'page'
}
```

<base-alert type="next">

Aprende más sobre [transition property](/docs/2.x/configuration-glossary/configuration-transition)

</base-alert>

## Otros archivos de configuración

Además de `nuxt.config.js`, puede haber otros archivos de configuración en la raíz de tu proyecto, como [.eslintrc](https://eslint.org/), [prettier.config.json](https://prettier.io/) o [.gitignore](https://git-scm.com/docs/gitignore).
Estos se utilizan para configurar otras herramientas como un linter, formateador de código o tu repositorio de git y se separan de nuxt.config.js.

### .gitignore

En tu archivo .gitignore, deberás agregar lo siguiente para que se ignoren y no se agreguen al control de versiones.

- La carpeta `node_modules` que es donde están todos los módulos instalados.
- La carpeta `.nuxt`, que es la que se crea al ejecutar los comandos dev o build.
- La carpeta `dist` es la carpeta que se crea cuando se ejecuta el comando generate.

```markdown{}[.gitignore]
node_modules
.nuxt
dist
```

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

### Que sigue!

<base-alert type="next">

Revisa también esta configuración [configuration-glossary](/docs/2.x/configuration-glossary/configuration-build)

</base-alert>
