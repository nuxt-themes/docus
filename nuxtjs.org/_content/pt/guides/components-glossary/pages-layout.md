---
title: 'A propriedade layout'
description: Cada arquivo (primeiro nível) no diretório `layouts` criará um layout personalizado acessível com a propriedade de layout no componente de página.
menu: Layout Property
category: components-glossary
position: 0
---

> Cada arquivo (primeiro nível) no diretório de layouts criará um layout personalizado acessível com a propriedade de layout no componente de página.

- **Tipo:** `String` ou `Function` (padrão: `'default'`)

Use a propriedade `layout` nos componentes de suas páginas para definir qual layout usar:

```js
export default {
  layout: 'blog',
  // OU
  layout(context) {
    return 'blog'
  }
}
```
