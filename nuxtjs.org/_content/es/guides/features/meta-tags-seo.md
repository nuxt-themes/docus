---
title: Etiquetas Meta y SEO
description: Nuxt.js te permite definir todas las etiquetas por defecto `<meta>` para tu aplicación dentro del archivo nuxt.config.js usando la propiedad head. Esto es muy útil para agregar un título predeterminado y una etiqueta de descripción para SEO o para configurar el viewport o para agregar el favicon.
position: 6
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/06_meta_tags_seo?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Where do you set the title and meta descriptions globally?
    answers:
      - in the page component
      - in the nuxt.config.js
      - in the package.json
    correctAnswer: in the nuxt.config.js
  - question: Where do you set the title and meta descriptions locally?
    answers:
      - in the page component
      - in the nuxt.config.js
      - in the seo component
    correctAnswer: in the page component
  - question: In pages, to get access to your data in your title or meta description you use the
    answers:
      - meta function
      - head function
      - seo function
    correctAnswer: head function
  - question: You can load external resources only in the nuxt.config.js
    answers:
      - true
      - false
    correctAnswer: false
  - question: To include scripts before the closing body tag use
    answers:
      - 'body: true'
      - 'body: false'
      - 'scripts: true'
    correctAnswer: 'body: true'
---

Nuxt.js te provee 3 formas diferentes para agregar metadatos a tu aplicación:

1. Globalmente usando el archivo nuxt.config.js
2. Localmente usando el head como un objeto
3. Localmente usando el head como una función para que tengas acceso a data y computed properties.

### Configuración Global

Nuxt.js te permite definir todas las etiquetas por defecto `<meta>` para tu aplicación dentro del archivo nuxt.config.js usando la propiedad head. Esto es muy util para agregar un título predeterminado y una etiqueta de descripción para SEO o para configurar el viewport o para agregar el favicon.

```js{}[nuxt.config.js]
export default {
  head: {
    title: 'my website title',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'my website description'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  }
}
```

<base-alert type="info">

Esto te dara el mismo título y descripción en cada página

</base-alert>

### Local Settings

También puedes agregar títulos y metas para cada página usando el método `head` dentro de tu script tag en cada página.

```js{}[pages/index.vue]
<script>
export default {
  head: {
    title: 'Home page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Home page description'
      }
    ],
  }
}
</script>
```

<base-alert type="info">

Usa `head` como un objeto para establecer un título y descripción solo para la página de inicio

</base-alert>

```html{}[pages/index.vue]
<template>
  <h1>{{ title }}</h1>
</template>
<script>
  export default {
    data() {
      return {
        title: 'Home page'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Home page description'
          }
        ]
      }
    }
  }
</script>
```

<base-alert type="info">

Usa `head` como una función para establecer un título y una descripción solo para la página de inicio. Usando una función tienes acceso a las propiedades data y computed properties

</base-alert>

Nuxt.js usa [vue-meta](https://vue-meta.nuxtjs.org/) para actualizar el head del documento y los atributos meta de tu aplicación.

<base-alert>

Para evitar cualquier duplicación cuando se utiliza en componentes hijos, por favor proporcione un identificador único con la key `hid` a la descripción meta. De esta manera `vue-meta` sabrá que tiene que sobrescribir la etiqueta predeterminada.

</base-alert>

<base-alert type="next">

Aprende más sobre las opciones disponibles para `head` en la [documentacion vue-meta](https://vue-meta.nuxtjs.org/api/#metainfo-properties).

</base-alert>

## External Resources

Puedes incluir recursos externos como scripts y fuentes agregandolos globalmente al archivo `nuxt.config.js` o localmente en el objeto o función `head`.

<base-alert type="info">

También puedes pasar a cada recurso un `body: true` opcional para incluir el recurso antes de la etiqueta `</body>`.

</base-alert>

### Configuraciones Globales

```js{}[nuxt.config.js]
export default {
  head: {
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
      }
    ]
  }
}
```

### Configuraciones locales

```html{}[pages/index.vue]
<template>
  <h1>About page with jQuery and Roboto font</h1>
</template>

<script>
  export default {
    head() {
      return {
        script: [
          {
            src:
              'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
          }
        ],
        link: [
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-family: Roboto, sans-serif;
  }
</style>
```

## Sugerencias de recursos

Agrega links prefetch y preload para un tiempo de carga de página inicial más rápido.

Es posible que quieras solo deshabilitar esta opción si tienes muchas paginas y rutas.

<base-alert type="next">

[Resource Hints](/docs/2.x/configuration-glossary/configuration-render#resourcehints)

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
