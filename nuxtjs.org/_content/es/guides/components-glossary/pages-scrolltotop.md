---
title: 'La propiedad scrollTop'
description: The `scrollToTop` property lets you tell Nuxt.js to scroll to the top before rendering the page.
menu: Propiedad scrollTop
category: components-glossary
position: 0
---

> La propiedad scrollToTop te permite decirle a Nuxt.js que se desplace hacia la parte superior antes de renderizar la página.

- **Tipo:** `Boolean` (default: `false`)

De forma predeterminada, Nuxt.js se desplaza hacia la parte superior cuando va a otra página, pero con rutas hacia los hijos, Nuxt.js mantiene la posición de desplazamiento. Si desea decirle a Nuxt.js que se desplace hacia la parte superior al renderizar la ruta de un hijo, configure `scrollToTop` en` true`:

```html
<template>
  <h1>Mi componente hijo</h1>
</template>

<script>
  export default {
    scrollToTop: true
  }
</script>
```

Por el contrario, también puedes configurar manualmente `scrollToTop` en` false` en las rutas principales.

Si deseas sobrescribir el comportamiento de desplazamiento predeterminado de Nuxt.js, revisa la [opción scrollBehavior](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior).
