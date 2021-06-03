---
title: 'La propiedad Loading'
description: La propiedad `loading` te da la opción de deshabilitar la barra de progreso de carga predeterminada en una página específica.
menu: Propiedad Loading
category: components-glossary
position: 0
---

> La propiedad loading te da la opción de deshabilitar la barra de progreso de carga predeterminada en una página específica.

- **Type:** `Boolean` (default: `true`)

De forma predeterminada, Nuxt.js usa su propio componente para mostrar una barra de progreso de carga entre las rutas.

Puedes deshabilitarlo o personalizarlo globalmente a través de la [opción de loading de la configuración](/docs/2.x/configuration-glossary/configuration-loading), pero también puedes deshabilitarlo para páginas específicas estableciendo la propiedad `loading` en` false`:

```html
<template>
  <h1>Mi pagina</h1>
</template>

<script>
  export default {
    loading: false
  }
</script>
```
