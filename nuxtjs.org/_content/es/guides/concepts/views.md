---
title: Vistas
description: La sección Vistas describe todo lo que necesitas saber para configurar los datos y las vistas para una ruta específica en tu aplicación Nuxt.js. Las vistas consisten de una plantilla de aplicación, un layout, y la página como tal.
position: 1
category: concepts
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/01_views?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: ¿Cuál es el orden en la composición de una vista en Nuxt (arriba-abajo)?
    answers:
      - Diseño → Página  → Documento
      - Página → Diseño → Documento
      - Documento → Diseño → Página
    correctAnswer: Documento → Diseño → Página
  - question: ¿Cómo se llama el diseño que se aplica por defecto?
    answers:
      - default.vue
      - layout.vue
      - defaultLayout.vue
    correctAnswer: default.vue
  - question: ¿Cómo se crea un diseño personalizado?
    answers:
      - agregar un fichero .vue a la carpeta pages
      - agregar un fichero .vue a la carpeta layouts
      - agregar un fichero .vue a la carpeta componentes
    correctAnswer: agregar un fichero .vue a la carpeta layouts
  - question: ¿Cómo activar el diseño personalizado 'blog' en una página?
    answers:
      - "layout: 'blog'"
      - "layout: 'default'"
      - "blog: 'blog'"
    correctAnswer: "layout: 'blog'"
  - question: ¿Donde colocar el fichero error.vue para crear una página de error personalizada?
    answers:
      - en la carpeta pages
      - en la carpeta errors
      - en la carpeta layouts
    correctAnswer: en la carpeta layouts
---

La sección Vistas describe todo lo que necesitas saber para configurar los datos y las vistas para una ruta específica en tu aplicación Nuxt.js. Las vistas consisten de una plantilla de aplicación, un layout, y la página como tal. Además, puedes definir metadatos específicos para el `<head>` de cada pagina los cuales son importantes para el SEO (Optimización para Motores de Búsqueda).

![Composición de una vista en Nuxt.js](/docs/2.x/views.png)

Composición de una vista en Nuxt.js

## Páginas

Cada componente de Página es un componente Vue pero Nuxt.js agrega atributos especiales y funciones para facilitar el desarrollo lo más posible.

```html{}[pages/index.vue]
<template>
  <h1 class="red">Hello World</h1>
</template>

<script>
  export default {
    head() {
      // Set Meta Tags for this Página
    }
    // ...
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

## Propiedades de un componente Página

Hay muchas propiedades del componente página como el head en el ejemplo anterior.

<base-alert type="next">

Consulta [Estructura de Directorios](/docs/2.x/directory-structure/nuxt) para ver todas las propiedades que puedes usar en tu página

</base-alert>

## Diseños (layouts)

Los diseños son de gran ayuda cuando quieres cambiar el estilo de tu aplicación Nuxt.js. Por ejemplo, si desea incluir una barra lateral o tener diseños distintos para la versión móvil y la versión de escritorio.

### Diseño predeterminado

Puedes definir un diseño agregando un fichero `default.vue` dentro de la carpeta layouts. Este será usando para todas las páginas que no tenga otro diseño especificado. Lo único que debes incluir en el diseño es el componente `<Nuxt />` que genera el contenido de la página.

```html{}[layouts/default.vue]
<template>
  <Nuxt />
</template>
```

<base-alert type="next">

Lee más sobre el [componente Nuxt](/docs/2.x/features/nuxt-components) en el capítulo componentes

</base-alert>

### Diseño por defecto

Puedes crear diseños personalizados agregando ficheros `.vue` a la carpeta layouts. Para usar un diseño personalizado debes agregar la propiedad `layout` al componente de la página donde quieras usar el diseño. El valor de la propiedad debe ser el nombre del diseño que deseas aplicar a esta página.

Para crear el diseño blog debes agregar el fichero `blog.vue` a la carpeta layouts `layouts/blog.vue`:

```html{}[layouts/blog.vue]
<template>
  <div>
    <div>My blog navigation bar here</div>
    <Nuxt />
  </div>
</template>
```

<base-alert>

Asegúrate de agregar el componente `<Nuxt/>` cuando creas un diseño para incluir el contenido de la página a la que se le asigna.

</base-alert>

Entonces asignamos 'blog' a la propiedad `layout` del componente página donde queremos que se aplique.

```html{}[pages/posts.vue]
<template>
  <!-- Your template -->
</template>
<script>
  export default {
    layout: 'blog'
    // page component definitions
  }
</script>
```

<base-alert type="info">

Si no especificas la propiedad `layout`, eg `layout: 'blog'` se usará el diseño `default.vue`.

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

### Página de Error

La página de error es un *componente página* que se muestra cuando ocurre un error (esto no ocurre cuando se usa la generación del lado del servidor).

<base-alert>

Aunque se agrega a la carpeta `layouts`, debe ser tratado como una página.

</base-alert>

Como se ha mencionado anteriormente, este diseño es especial, ya que no debes incluir el componente `<Nuxt/>`. Debes considerar este componente como la página que se muestra cuando ocurre un error (`404`, `500`, etc.). De la misma forma que ocurre con las páginas, le puedes configurar la propiedad `layout` para especificar el diseño que se utilizará para mostrarla.

Para personalizar la página de error, define el fichero `layouts/error.vue`:

```html{}[layouts/error.vue]
<template>
  <div>
    <h1 v-if="error.statusCode === 404">Página not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>
```

## Documento: App.html

La plantilla app se usa para crear el marco HTML del documento para tu aplicación Nuxt.js, el cual inyecta contenido y variables para el encabezado y cuerpo del documento. Este fichero se crea automáticamente y rara vez necesita ser modificado. Puedes personalizar la plantilla HTML utilizada por Nuxt.js para incluir scripts o clases CSS de forma condicional, creado el fichero `app.html` en la carpeta source del proyecto que por defecto es la raíz del mismo.

La plantilla por defecto usada por Nuxt.js es:

```html{}[app.html]
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

Un caso de uso de usar una plantilla de aplicación personalizada es agregar clases CSS condicionales para IE:

```html{}[app.html]
<!DOCTYPE html>
<!--[if IE 9]><html class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

<base-alert type="info">

Es posible agregar ficheros JavaScript y CSS en `app.html`, pero es recomendado utilizar `nuxt.config.js` para esto

</base-alert>

<quiz :questions="questions"></quiz>
