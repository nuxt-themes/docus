---
title: layouts
description: Los layouts o estructura de diseño, proveen una manera simple de cambiar el aspecto visual de tu aplicación. Es particularmente útil cuando necesitas incluir una barra de navegación o aplicar estructuras especificas para móvil o desktop.
position: 7
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/07_layouts?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Puedes renombrar layouts fácilmente sin ninguna configuración adicional.
    answers:
      - cierto
      - falso
    correctAnswer: falso
  - question: Cómo se llama el layout defecto.
    answers:
      - layout.vue
      - default.vue
      - defaultLayout.vue
    correctAnswer: default.vue
  - question: ¿Qué componentes tienes que incluir en todos los layouts?
    answers:
      - <Nuxt />
      - <NuxtLink />
      - <RouterView />
    correctAnswer: <Nuxt />
  - question: Puedes añadir cualquier otro componente a los layouts.
    answers:
      - cierto
      - falso
    correctAnswer: cierto
  - question: Para añadir un layout customizado, crea un archivo `.vue` y añádelo al directorio de
    answers:
      - layout
      - layouts
      - page
    correctAnswer: layouts
  - question: ¿Cómo puedes hacer que una página use un layout de blog?
    answers:
      - "layout: 'blog'"
      - "name: 'blog'"
      - 'blog: true'
    correctAnswer: "layout: 'blog'"
  - question: ¿En cuál directorio se añade una página de error?
    answers:
      - pages
      - layouts
      - errors
    correctAnswer: layouts
  - question: ¿Deberías añadir el componente de `<Nuxt>` a la página de error?
    answers:
      - cierto
      - falso
    correctAnswer: falso
  - question: Puedes configurar un layout customizado para la página de error.
    answers:
      - cierto
      - falso
    correctAnswer: cierto
  - question: ¿La página de error se muestra cuando un error ocurre cuando el servidor esta rendering?
    answers:
      - cierto
      - falso
    correctAnswer: falso
---

Los layouts o estructuras de diseño, proveen una manera simple de cambiar el aspecto visual de tu aplicación. Es particularmente útil cuando necesitas incluir una barra de navegación o aplicar estructuras especificas para móvil o desktop.

<base-alert>

_Este directorio no puede ser renombrado sin configuraciones adicionales._

</base-alert>

## Layout defecto

Puedes extender el layout principal si añades un archivo llamado `layouts/default.vue`. Esto te permitirá usarlo para todas las páginas que no tenga un layout especificado. Asegúrate de añadir el componente `<Nuxt>` cuando creas un layout nuevo, de esta manera Nuxt sabe que contenido incluir en la página.

Lo único que necesitas en tu layout son tres lineas de código, que permitirán que el contenido se muestre.

```html{}[layouts/default.vue]
<template>
  <Nuxt />
</template>
```

<base-alert type="info">

Puedes añadir mas componentes aquí, componentes como, Navegación, el encabezado (Header), pie de página (Footer), etc. Necesitarás incluirlos dentro del template para poder usarlos.

</base-alert>

## Layouts customizados

Todo archivo de nivel superior (_top-level_) en el directorio de `layouts` va a crear un layout customizado, accesible mediante la propiedad de `layout` en las páginas.

Digamos que queremos crear un layout de un blog y salvarlo en `layouts/blog.vue`:

```html{}[layouts/blog.vue]
<template>
  <div>
    <div>La barra de navegación para el blog aquí</div>
    <Nuxt />
  </div>
</template>
```

Luego tienes que especificar el layout dentro de la página para poder usarlo.

```js{}[pages/posts.vue]
<script>
export default {
  layout: 'blog',
  // OR
  layout (context) {
    return 'blog'
  }
}
</script>
```

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

## Página de error

La página de error es un **componente de página** que se presenta siempre que ocurra un error (siempre y cuando no venga del lado del servidor / server-side).

<base-alert>

Aunque este archivo se coloca en el directorio de `layouts`, debe tratarse como una página.

</base-alert>

Como mencionamos anteriormente, este layout es especial, y no deberías incluir `<Nuxt>` dentro del template. Debes ver este layout como un componente que se muestra cuando ocurre algún error (`404`, `500`, etc.). Similar a otras páginas, puedes configurar un layout customizado para la página de error.

Puedes customizarla, añadiendo un archivo `layouts/error.vue`:

```js{}[layouts/error.vue]
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">No hemos encontrado la página que has solicitado.</h1>
    <h1 v-else>Oops, ha ocurrido un error</h1>
    <NuxtLink to="/">Volver al inicio</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // Aquí puedes configurar un layout customizado para la página de error
}
</script>
```

<base-alert type="info">

El código fuente del error por defecto está [disponible en GitHub](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt-error.vue).

</base-alert>

<quiz :questions="questions"></quiz>
