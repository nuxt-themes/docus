---
title: 'La propiedad head'
description: Nuxt.js te permite definir todas las etiquetas meta por defecto de tu aplicación dentro de nuxt.config.js.
menu: head
category: configuration-glossary
position: 12
---

> Nuxt.js te permite definir todas las etiquetas meta por defecto de tu aplicación dentro de `nuxt.config.js`, usando la misma propiedad `head`

- Tipo: `Object` o `Function`

```js{}[nuxt.config.js]
export default {
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
```

Para saber la lista de opciones que puedes dar a la propiedad `head`, echa un vistazo a la [documentación de vue-meta](https://vue-meta.nuxtjs.org/api/#metainfo-properties).

También puedes usar `head` como una función en tus componentes para acceder a los datos del componente a través de `this` ([leer más](/docs/2.x/components-glossary/pages-head)).

<base-alert type="info">

<b>Info:</b> Para evitar la duplicación de etiquetas meta cuando se utiliza en un componente hijo, añade un identificador único con la clave `hid` para tus metas ([leer más](https://vue-meta.nuxtjs.org/api/#tagidkeyname)).

</base-alert>
