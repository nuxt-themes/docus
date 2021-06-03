---
title: 'A propriedade key'
description: Defina a propriedade `key` do componente interno `<router-view>`
menu: Key Property
category: components-glossary
position: 0
---

> Defina a propriedade `key` do componente interno `<router-view>`

- **Tipo:** `String` ou `Function`

A propriedade `key` é propagada para `<router-view>`, o que é útil para fazer transições dentro de uma página dinâmica e uma rota diferente. Chaves diferentes resultam na re-renderização dos componentes da página.

Existem várias maneiras de definir a key. Para obter mais detalhes, consulte a prop `nuxtChildKey` no [componente nuxt](/docs/2.x/features/nuxt-components).

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```
