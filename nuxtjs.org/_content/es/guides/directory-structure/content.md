---
title: content
description: Potencia tu aplicación Nuxt.js con el módulo `@nuxt/content` donde puedes escribir en un directorio `content/` y extraer tus archivos Markdown, JSON, YAML y CSV a través de una API tipo MongoDB, actuando como **CMS _Headless_ basado en Git**.
position: 4
category: directory-structure
img: /docs/2.x/nuxt-content.svg
imgAlt: nuxt content module
questions:
  - question: ¿Cuál es el nombre por defecto del directorio donde agregas tus archivos de markdown?
    answers:
      - markdown
      - content
      - pages
    correctAnswer: content
  - question: ¿Qué componente utilizas en tu plantilla para mostrar el cuerpo de tu página markdown?
    answers:
      - <markdown>
      - <nuxt>
      - <nuxt-content>
    correctAnswer: <nuxt-content>
  - question: ¿Qué clase se añade automáticamente para que puedas dar estilo a tu markdown?
    answers:
      - .content
      - .nuxt-content
      - .markdown
    correctAnswer: .nuxt-content
  - question: El módulo de contenido puede manejar archivos markdown, csv, yaml y json
    answers:
      - cierto
      - falso
    correctAnswer: cierto
  - question: Puedes añadir componentes de vue a tus archivos markdown
    answers:
      - cierto
      - falso
    correctAnswer: cierto
  - question: ¿Cuál opción utilizas para listar, filtrar y buscar tu contenido?
    answers:
      - $nuxt-content()
      - $content()
      - $nuxt()
    correctAnswer: $content()
  - question: ¿Qué usas para obtener artículos anteriores y siguientes?
    answers:
      - .surround(slug)
      - .prev-next(slug)
      - .slug()
    correctAnswer: .surround(slug)
  - question: ¿Las clases de PrismJS se aplican a bloques de código de forma predeterminada?
    answers:
      - cierto
      - falso
    correctAnswer: cierto
  - question: ¿Cuál es la URL predeterminada que se utiliza para acceder a la API para ver tu JSON?
    answers:
      - http://localhost:3000/content
      - http://localhost:3000/_content
      - http://localhost:3000/api
    correctAnswer: http://localhost:3000/_content
  - question: ¿Qué etiquetas de encabezado se utilizan para crear la tabla de contenido?
    answers:
      - h1 y h2
      - h2 y h3
      - h1 y h2 y h3
    correctAnswer: h2 y h3
  - question: Se puede utilizar el módulo de contenido con la generación de sitio estático
    answers:
      - cierto
      - falso
    correctAnswer: cierto
---

Potencia tu aplicación Nuxt.js con el módulo `@nuxt/content` donde puedes escribir en un directorio `content/` y extraer tus archivos Markdown, JSON, YAML y CSV a través de una API tipo MongoDB, actuando como **CMS _Headless_ basado en Git**.

<app-modal :src="img" :alt="imgAlt"></app-modal>

### _Hot Reload_ en desarrollo

El módulo de contenido es increíblemente rápido cuando se trata de _hot reload_ en desarrollo debido a que no tiene que pasar por el paquete web cuando realiza cambios en tus archivos markdown. También puedes escuchar el evento `content:update` y crear un _plugin_ para que cada vez que actualice un archivo en tu directorio de contenido, envíe un método fetchCategories, por ejemplo.

<base-alert type="next">

Consulta la [documentación del módulo de contenido](https://content.nuxtjs.org/advanced#handling-hot-reload) para más detalles.

</base-alert>

### Visualización del contenido

Puedes usar el componente `<nuxt-content>` directamente en tu plantilla para mostrar el cuerpo de la página.

```html{}[pages/blog/_slug.vue]
<template>
  <article>
    <nuxt-content :document="article" />
  </article>
</template>
```

<base-alert type="next">

Consulta la [documentación del módulo content](https://content.nuxtjs.org/displaying#component) para más detalles.

</base-alert>

### Estilando tu contenido

Dependiendo de lo que estés usando para diseñar tu aplicación, es posible que debas escribir algún estilo para mostrar correctamente el markdown.

El componente `<nuxt-content>` agregará automáticamente la clase `.nuxt-content`, puedes usarla para personalizar tus estilos.

```html
<style>
  .nuxt-content h2 {
    font-weight: bold;
    font-size: 28px;
  }
  .nuxt-content p {
    margin-bottom: 20px;
  }
</style>
```

<base-alert type="next">

Consulta la [documentación del módulo content](https://content.nuxtjs.org/displaying#style) para más detalles.

</base-alert>

### Maneja Markdown, CSV, YAML, JSON(5)

Este módulo convierte tus archivos `.md` en una estructura de árbol JSON AST, almacenada en una variable `body`. Puedes agregar un bloque de front matter YAML a tus archivos markdown o un archivo `.yaml` que se inyectará en el documento. También puedes agregar un archivo json/json5 que también se puede inyectar en el mismo. Puedes usar también un archivo `.csv` donde las filas se asignarán a la variable `body`.

```md
---
title: Mi primera publicación de blog
description: Aprendiendo como usar @nuxt/content para crear un blog
---
```

<base-alert type="next">

Consulta la [documentación del módulo content](https://content.nuxtjs.org/writing#markdown) para más detalles.

</base-alert>

### Componentes de Vue en Markdown

Puedes usar componentes de Vue directamente en tus archivos markdown. Sin embargo, deberás utilizar tus componentes con notación _kebab_ y no podrás usar etiquetas que se autocierren.

```html{}[components/global/InfoBox.vue]
<template>
  <div class="bg-blue-500 text-white p-4 mb-4">
    <p><slot name="info-box">Predeterminado</slot></p>
  </div>
</template>
```

```html{}[content/articles/my-first-blog-post.md]
<info-box>
  <template #info-box>
    Este es un componente de vue dentro del markdown usando slots
  </template>
</info-box>
```

<base-alert type="next">

Consulta la [documentación del módulo content](https://content.nuxtjs.org/writing#vue-components) para más detalles.

</base-alert>

### API de búsqueda completa

Puedes utilizar `$content()` para listar, filtrar y buscar tu contenido fácilmente.

```html{}[pages/blog/index.vue]
<script>
  export default {
    async asyncData({ $content, params }) {
      const articles = await $content('articles', params.slug)
        .only(['title', 'description', 'img', 'slug', 'author'])
        .sortBy('createdAt', 'asc')
        .fetch()

      return {
        articles
      }
    }
  }
</script>
```

<base-alert type="next">

Consulta la [documentación del módulo content](https://content.nuxtjs.org/fetching#methods) para más detalles.

</base-alert>

### Artículos anteriores y siguientes

El módulo content incluye un `.surround(slug)` para que pueda acceder fácilmente a los artículos anteriores y siguientes.

```js
async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      prev,
      next
    }
  },
```

```html
<prev-next :prev="prev" :next="next" />
```

<base-alert type="next">

Consulta la [documentación del módulo content](https://content.nuxtjs.org/fetching#surroundslug-options) para más detalles.

</base-alert>

### Búsqueda de texto completo

El módulo _content_ viene con una búsqueda de texto completo para que puedas buscar fácilmente en tus archivos markdown sin tener que instalar nada adicional.

```html{}[components/AppSearchInput.vue]
<script>
  export default {
    data() {
      return {
        searchQuery: '',
        articles: []
      }
    },
    watch: {
      async searchQuery(searchQuery) {
        if (!searchQuery) {
          this.articles = []
          return
        }
        this.articles = await this.$content('articles')
          .limit(6)
          .search(searchQuery)
          .fetch()
      }
    }
  }
</script>
```

<base-alert type="next">

Consulta la [documentación del módulo content](https://content.nuxtjs.org/fetching#searchfield-value) para más detalles.

</base-alert>

### Resaltado de sintaxis

Este módulo envuelve automáticamente bloques de código y aplica clases [PrismJS](https://prismjs.com/). También puedes agregar un tema PrismJS diferente o deshabilitarlo por completo.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add prism-themes
```

  </code-block>
  <code-block label="npm">

```bash
npm install prism-themes
```

  </code-block>
</code-group>

```js{}[nuxt.config.js]
content: {
  markdown: {
    prism: {
      theme: 'prism-themes/themes/prism-material-oceanic.css'
    }
  }
}
```

<base-alert type="next">

Consulta la [documentación del módulo content](https://content.nuxtjs.org/writing#syntax-highlighting) para más detalles.

</base-alert>

### Ampliar el análisis de Markdown

Originalmente, Markdown no soporta el resaltado líneas dentro de bloques de código ni nombres de archivos. El módulo de contenido lo permite con su propia sintaxis personalizada. Los números de línea se agregan a la etiqueta `pre` en los atributos de datos en línea y el nombre del archivo se convertirá a un `span` con una clase `filename`, para que puedas darle estilo.

<base-alert type="next">

Consulta la [documentación del módulo content](https://content.nuxtjs.org/writing#codeblocks) para más detalles.

</base-alert>

### Generación de tabla de contenido

Se inyectará una propiedad _array_ `toc` (tabla de contenido) en tu documento, listando todos los encabezados con sus títulos e identificadores, para que puedas vincularlos.

```html{}[pages/blog/_slug.vue]
<nav>
  <ul>
    <li v-for="link of article.toc" :key="link.id">
      <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
    </li>
  </ul>
</nav>
```

<base-alert type="next">

Consulta la [documentación del módulo content](https://content.nuxtjs.org/writing#table-of-contents) para más detalles.

</base-alert>

### Potente API de QueryBuilder (como MongoDB)

El módulo de contenido viene con una poderosa API QueryBuilder similar a MongoDB que te permite ver fácilmente el JSON de cada directorio en `http://localhost:3000/_content/`. El _endpoint_ es accesible en solicitudes GET y POST, por lo que puedes usar los parámetros de consulta.

`http://localhost:3000/_content/articles?only=title&only=description&limit=10`

<base-alert type="next">

Consulta la [documentación del módulo content](https://content.nuxtjs.org/advanced/#api-endpoint) para más detalles.

</base-alert>

### Extender con _hooks_

Puede utilizar _hooks_ para ampliar el módulo de modo que puedes agregar datos a un documento antes de que se almacene.

<base-alert type="next">

Consulta la [documentación del módulo content](https://content.nuxtjs.org/advanced#hooks) para más detalles.

</base-alert>

### Integración con @nuxtjs/feed

En el caso de los artículos, el contenido se puede utilizar para generar fuentes de noticias utilizando el módulo [@nuxtjs/feed](https://www.npmjs.com/package/@nuxtjs/feed).

<base-alert type="next">

Consulta la [documentación del módulo content](https://content.nuxtjs.org/integrations/#nuxtjsfeed) para más detalles.

</base-alert>

### Soporte a la generación de sitios estáticos

El módulo de contenido trabaja con la generación de sitios estáticos usando `nuxt generate`. Todas las rutas se generarán automáticamente gracias a la función de rastreo de nuxt.

<base-alert>

Si usas Nuxt <2.13 y necesitas especificar las rutas dinámicas, puedes hacerlo usando la propiedad generate y @nuxt/content mediante programación.

</base-alert>

<base-alert type="next">

Consulta la [documentación del módulo content](https://content.nuxtjs.org/advanced#programmatic-usage) para más detalles.

</base-alert>

<base-alert type="next">

Ver la [documentación completa del módulo content](https://content.nuxtjs.org/)

</base-alert>

<quiz :questions="questions"></quiz>
