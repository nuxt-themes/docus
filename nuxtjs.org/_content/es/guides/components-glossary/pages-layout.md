---
title: 'La propiedad de layout'
description: Cada archivo (primer nivel) en la carpeta `layouts` creará un layout personalizado accesible con la propiedad layout en el componente de página.
menu: Propiedad Layout
category: components-glossary
position: 0
---

> Cada archivo (primer nivel) en la carpeta `layouts` creará un layout personalizado accesible con la propiedad layout en el componente de página.

- **Tipo:** `String` or `Function` (predeterminado: `'default'`)

Utilice la clave `layout` en sus componentes de página para definir a qué layout corresponde:

```js
export default {
  layout: 'blog',
  // OR
  layout(context) {
    return 'blog'
  }
}
```
