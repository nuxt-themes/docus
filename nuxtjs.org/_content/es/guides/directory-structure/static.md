---
title: static
description: El directorio de `static` está relacionado directamente con el root del servidor () y contiene archivos que pocas veces van a ser modificados. Todos los archivos incluidos van a ser servidos automáticamente por Nuxt y serán accesibles desde el URL root del proyecto.
position: 12
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/13_static?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: ¿En qué directorio deberías poner archivos que no serán modificados, archivos como el favicon o robots.txt?
    answers:
      - assets
      - static
      - src
    correctAnswer: static
  - question: Este directorio se puede renombrar facilmente sin ninguna configuración.
    answers:
      - cierto
      - falso
    correctAnswer: falso
  - question: ¿Dónde deberías poner las imágenes, si quieres que Webpack se encargue de hacer el bundle?
    answers:
      - static
      - assets
      - src
    correctAnswer: assets
  - question: Cualquier cosa dentro del directorio `static` es relativo al directorio root del proyecto
    answers:
      - cierto
      - falso
    correctAnswer: cierto
  - question: Puedes configurar el comportamiento del directorio `static` en nuxt.config.js
    answers:
      - cierto
      - falso
    correctAnswer: cierto
---

El directorio de `static` está relacionado directamente con el root del servidor () y contiene archivos que pocas veces van a ser modificados. Todos los archivos incluidos van a ser servidos automáticamente por Nuxt y serán accesibles desde el URL root del proyecto.

`/static/robots.txt` estará disponible en `http://localhost:3000/robots.txt`

`/static/favicon.ico` estará disponible en  `localhost:3000/favicon.ico`

Esta opción es bien util para archivos como `robots.txt`, `sitemap.xml` o `CNAME` (que son importantes para hacer deployment con GitHub Pages).

<base-alert>

_Este directorio no puede ser renombrado sin configuraciones adicionales._

</base-alert>

## Recursos estáticos

Si no deseas usar los recursos de Webpack desde el directorio de `assets`, puedes añadir las imágenes al directorio de `static`.

Luego en el código puedes referirte a esos archivos, relativos al root del proyecto (`/`):

```html
<!-- Imagen estática localizada en el directorio `static` -->
<img src="/mi-imagen.png" />

<!-- Imagen de Webpack localizada en el directorio de `assets` -->
<img src="@/assets/mi-imagen-2.png" />
```

## Configuración de directorio estático

Si deseas puedes configurar el comportamiento del directorio de `static/` en el archivo`nuxt.config.js`.

### Prefijo en recursos estáticos

Si publicas Nuxt.js en un sub-directorio, por ejemplo, `/blog/`, la ruta base se añadirá a la dirección de los archivos estáticos por defecto. Si quieres disabilitar esta funcionalidad, puedes configurar `static.prefix` que sea falso en `nuxt.config.js`.

```js
export default {
  static: {
    prefix: false
  }
}
```

Defecto: `/blog/mi-imagen.png`

Con `static.prefix` disabilitado: `/mi-imagen.png`

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
