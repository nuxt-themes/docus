---
title: 'API: La propiedad plugins'
description: 'Usa los plugins de vue.js con la opción plugins de Nuxt.js.'
menu: plugins
category: configuration-glossary
position: 21
---

**Nota**: Desde Nuxt.js 2.4, `mode` se ha introducido como opción de `plugins` para especificar el tipo de plugin, los posibles valores son: `client` o `server`. `ssr: false` se adaptará a `mode: 'client'` y quedará obsoleto en la próxima versión.

- Tipo: `Array`
  - Items: `String` o `Object`

Si el item es un objeto, las propiedades son:

- src: `String` (ruta del archivo)
- mode: `String` (puede ser `client` o `server`) _Si está definido, el archivo se incluirá sólo en el lado respectivo (cliente o servidor)._

**Nota**: Antigua versión

- Tipo: `Array`
  - Items: `String` o `Object`

Si el item es un objeto, las propiedades son:

- src: `String` (ruta del archivo)
- ssr: `Boolean` (por defecto a `true`) _Si es falso, el archivo se incluirá sólo en el lado del cliente._

> La propiedad plugins te permite añadir plugins de vue.js facilmente en tu aplicación principal.

```js{}[nuxt.config.js]
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' },
    { src: '~/plugins/server-only.js', mode: 'server' }
  ]
}
```

```js{}[nuxt.config.js]
export default {
  plugins: ['@/plugins/ant-design-vue']
}
```

```js{}[plugins/ant-design-vue.js]
import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' // Por la documentación de Ant Design's

Vue.use(Antd)
```

Ten en cuenta que el css fue importado tal y cómo especifica [la documentación de Ant Design](https://vue.ant.design/docs/vue/getting-started/#3.-Use-antd's-Components 'External tip relevant to building plugins')

Todas las rutas definidas en la propiedad `plugins` serán **importadas** antes de inicializar la aplicación principal.
