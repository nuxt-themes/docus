---
title: 'La propiedad generate'
description: Configure la generación de su aplicación web universal a una aplicación web estática.
menu: generate
category: configuration-glossary
position: 10
---

- Tipo: `Object`

> Configure la generación de su aplicación web universal a una aplicación web estática.

Al llamar a `nuxt.generate ()`, Nuxt.js usará la configuración definida en la propiedad `generate`.

```js{}[nuxt.config.js]
export default {
  generate: {
    ...
  }
}
```

## cache

> Introducido en la v2.14.0

- Tipo: `Object` o `false`

Esta opción es utilizada por `nuxt generate` con [static target](/docs/2.x/features/deployment-targets#static-hosting) para evitar la reconstrucción cuando no se ha cambiado ningún archivo de seguimiento.

Valores predeterminados:

```js
{
  ignore: [
    '.nuxt', // buildDir
    'static', // dir.static
    'dist', // generate.dir
    'node_modules',
    '.**/*',
    '.*',
    'README.md'
  ]
}
```

Si desea evitar la reconstrucción al cambiar un archivo de configuración, simplemente agréguelo a la lista proporcionando la opción `cache.ignore`:

```js{}[nuxt.config.js]
export default {
  generate: {
    cache: {
      ignore: ['renovate.json'] // ignorar los cambios aplicados en este archivo
    }
  }
}
```

## concurrency

- Tipo: `Number`
- Por defecto: `500`

La generación de rutas es concurrente, `generate.concurrency` especifica la cantidad de rutas que se ejecutan en un hilo.

## crawler

- Tipo: `boolean`
- Por defecto: true

A partir de Nuxt> = v2.13, Nuxt.js viene con un rastreador instalado que rastreará sus enlaces relativos y generará enlaces dinámicos basados en estos enlaces. Si desea deshabilitar esta función, puede establecer el valor en `false`

```js
export default {
  generate: {
    crawler: false
  }
}
```

## dir

- Tipo: `String`
- Por defecto: `'dist'`

Nombre de directorio creado al construir la aplicación web en modo estático con `nuxt generate` o en modo SPA con `nuxt build`.

## devtools

- Tipo: `boolean`
- Por defecto: `false`

Configure si desea permitir la inspección de [vue-devtools](https://github.com/vuejs/vue-devtools).

Si ya lo activó a través de nuxt.config.js o de otra manera, devtools se habilita independientemente de la bandera.

## exclude

- Tipo: `Array`
  - Items: `String` or `RegExp`

Acepta una matriz de strings o expresiones regulares y evitará la generación de rutas que las coincidan. Las rutas seguirán siendo accesibles cuando se use `generate.fallback`.

Tomando estos ejemplos de estructura:

```bash
-| pages/
---| index.vue
---| admin/
-----| about.vue
-----| index.vue
```

De forma predeterminada, al ejecutar `nuxt generate` se creará un archivo para cada ruta.

```bash
-| dist/
---| index.html
---| admin/
-----| about.html
-----| item.html
```

Al agregar una expresión regular que coincida con todas las rutas con "ignorar", evitará la generación de estas rutas.

```js{}[nuxt.config.js]
export default {
  generate: {
    exclude: [
      /^\/admin/ // path starts with /admin
    ]
  }
}
```

```bash
-| dist/
---| index.html
```

También puede excluir una ruta específica dando una string:

```js{}[nuxt.config.js]
export default {
  generate: {
    exclude: ['/my-secret-page']
  }
}
```

## fallback

- Tipo: `String` o `Boolean`
- Por defecto: `200.html`

```js{}[nuxt.config.js]
export default {
  generate: {
    fallback: '404.html'
  }
}
```

La ruta al archivo HTML de respaldo. Debe establecerse como página de error, de modo que también se representen las rutas desconocidas a través de Nuxt. Si no se establece o se establece en un valor falso, el nombre del archivo HTML de respaldo será `200.html`. Si se establece en `true`, el nombre del archivo será `404.html`. Si proporciona una cadena como valor, se utilizará en su lugar.

Cuando se ejecuta un SPA, es más idiomático usar un `200.html`, ya que es el único archivo necesario ya que no se generan otras rutas.

```{}[nuxt.config.js]
fallback: false;
```

Si trabaja con páginas generadas estáticamente, se recomienda utilizar un `404.html` para las páginas de error y para aquellas cubiertas por [excludes](/docs/2.x/configuration-glossary/#exclude) (los archivos que no desea que se generen como páginas estáticas).

```js{}[nuxt.config.js]
fallback: true
```

Sin embargo, Nuxt le permite configurar cualquier página que desee, por lo que si no desea utilizar `200.html` o `404.html`, puede agregar una string y luego debe asegurarse de redirigir a esa página. en lugar. Por supuesto, esto no es necesario y es mejor redireccionarlo a `200.html`/`404.html`.

```js{}[nuxt.config.js]
fallback: 'fallbackPage.html'
```

_Nota: Varios servicios (por ejemplo, Netlify) detectan un `404.html` automáticamente. Si configura su servidor web por su cuenta, consulte su documentación para averiguar cómo configurar una página de error (y configurarla en el archivo `404.html`)_

## interval

- Tipo: `Number`
- Por defecto: `0`

Intervalo entre dos ciclos de renderizado para evitar inundar una API potencial con llamadas a API desde la aplicación web.

## minify

- **Obsoleto!**
- Use [build.html.minify](/docs/2.x/configuration-glossary/configuration-build#htmlminify) en su lugar

## routes

- Tipo: `Array`

<base-alert type="info">

A partir de Nuxt v2.13, hay un rastreador instalado que rastreará las etiquetas de sus enlaces y generará sus rutas cuando ejecute `nuxt generate`.

Si tiene páginas no vinculadas (como páginas secretas) y desea que también se generen, puede utilizar la propiedad `generate.routes`.

</base-alert>

<base-alert>

Las rutas dinámicas son ignoradas por el comando `generate` cuando se usa `Nuxt <= v2.12`

</base-alert>

Ejemplo:

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

Solo la ruta `/` será generada por Nuxt.js.

Si desea que Nuxt.js genere rutas con parámetros dinámicos, debe establecer la propiedad `generate.routes` en una matriz de rutas dinámicas.

Agregamos rutas para `/users/:id`:

```js{}[nuxt.config.js]
export default {
  generate: {
    routes: ['/users/1', '/users/2', '/users/3']
  }
}
```

Luego, cuando lanzamos `nuxt generate`:

```bash
[nuxt] Generating...
[...]
nuxt:render Rendering url / +154ms
nuxt:render Rendering url /users/1 +12ms
nuxt:render Rendering url /users/2 +33ms
nuxt:render Rendering url /users/3 +7ms
nuxt:generate Generate file: /index.html +21ms
nuxt:generate Generate file: /users/1/index.html +31ms
nuxt:generate Generate file: /users/2/index.html +15ms
nuxt:generate Generate file: /users/3/index.html +23ms
nuxt:generate HTML Files generated in 7.6s +6ms
[nuxt] Generate done
```

Genial, pero ¿y si tenemos **parámetros dinámicos**?

1. Use una `Función` que devuelva una `Promesa`.
2. Use una `Función` con un `callback(err, params)`.

### Función que devuelve una Promesa

```js{}[nuxt.config.js]
import axios from 'axios'

export default {
  generate: {
    routes() {
      return axios.get('https://my-api/users').then(res => {
        return res.data.map(user => {
          return '/users/' + user.id
        })
      })
    }
  }
}
```

### Función con un callback

```js{}[nuxt.config.js]
import axios from 'axios'

export default {
  generate: {
    routes(callback) {
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => {
            return '/users/' + user.id
          })
          callback(null, routes)
        })
        .catch(callback)
    }
  }
}
```

### Acelerar la generación de rutas dinámicas con `payload`

En el ejemplo anterior, estamos usando el `user.id` del servidor para generar las rutas, pero desechando el resto de los datos. Por lo general, necesitamos recuperarlo desde dentro de `/users/_id.vue`. Si bien podemos hacer eso, probablemente necesitemos establecer el `generate.interval` en algo como `100` para no inundar el servidor con llamadas. Debido a que esto aumentará el tiempo de ejecución del script de generación, sería preferible pasar todo el objeto `user` al contexto en `_id.vue`. Lo hacemos modificando el código anterior a esto:

```js{}[nuxt.config.js]
import axios from 'axios'

export default {
  generate: {
    routes() {
      return axios.get('https://my-api/users').then(res => {
        return res.data.map(user => {
          return {
            route: '/users/' + user.id,
            payload: user
          }
        })
      })
    }
  }
}
```

Ahora podemos acceder al `payload` desde `/users/_id.vue` así:

```js
async asyncData ({ params, error, payload }) {
  if (payload) return { user: payload }
  else return { user: await backend.fetchUser(params.id) }
}
```

## subFolders

- Tipo: `Boolean`
- Por defecto: `true`

De forma predeterminada, cuando se ejecuta `nuxt generate`, Nuxt.js creará un directorio para cada ruta y proporcionará un archivo `index.html`.

Ejemplo:

```bash
-| dist/
---| index.html
---| about/
-----| index.html
---| products/
-----| item/
-------| index.html
```

Cuando se establece en falso, los archivos HTML se generan de acuerdo con la ruta de la ruta:

```js{}[nuxt.config.js]
export default {
  generate: {
    subFolders: false
  }
}
```

```bash
-| dist/
---| index.html
---| about.html
---| products/
-----| item.html
```
