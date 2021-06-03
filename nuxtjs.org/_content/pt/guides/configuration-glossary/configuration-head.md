---
title: 'A propriedade head'
description: O Nuxt.js permite que você defina todos os meta padrão para sua aplicação dentro do nuxt.config.js.
menu: head
category: configuration-glossary
position: 12
---

> O Nuxt.js permite que você defina todos os meta padrão para sua aplicação dentro do nuxt.config.js, use a mesma propriedade `head`.

- Tipo: `Object` ou `Function`

```js{}[nuxt.config.js]
export default {
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid é usado como identificador único. Não use `vmid` para isso, pois não funcionará
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
```

Para saber a lista de opções que você pode dar ao `head`, dê uma olhada na [documentação do vue-meta](https://vue-meta.nuxtjs.org/api/#metainfo-properties).

Você também pode usar o `head` como uma função em seus componentes para acessar os dados do componente através de `this` ([leia mais](/docs/2.x/components-glossary/pages-head)).

<base-alert type="info">

<b>Info:</b> Para evitar meta tags duplicadas quando usadas em componente filho, configure um identificador único com a chave `hid` para seus elementos meta ([leia mais](https://vue-meta.nuxtjs.org/api/#tagidkeyname)).

</base-alert>
