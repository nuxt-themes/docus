---
title: .nuxt
description: El directorio de `.nuxt` se le llama *el directorio de construcción* (build directory). Es dinámicamente generado y escondido por defecto. Dentro de este directorio encontrarás archivos generados automaticamente cuando usas `nuxt dev` o los artefactos del proyecto cuando usas `nuxt build`.
position: 1
category: directory-structure
questions:
  - question: ¿Qué comando generan el directorio .nuxt?
    answers:
      - nuxt start
      - nuxt generate
      - nuxt build or nuxt dev
    correctAnswer: nuxt build or nuxt dev
  - question: ¿Qué propiedad usas para renombrar el archivo nuxt?
    answers:
      - dir
      - build
      - buildDir
    correctAnswer: buildDir
  - question: ¿En que archivo puedes encontrar las rutas generadas?
    answers:
      - pages.js
      - router.js
      - views.js
    correctAnswer: router.js
  - question: ¿Que puedes encontrar en el directorio de componentes?
    answers:
      - nuxt components
      - custom components
      - global components
    correctAnswer: nuxt components
  - question: Necesitas el directorio de .nuxt lo necesitas para publicar websites estáticos.
    answers:
      - cierto
      - falso
    correctAnswer: falso
---

El directorio de `.nuxt` se le llama _el directorio de construcción_ (_build directory_). Es dinámicamente generado y escondido por defecto. Dentro de este directorio encontrarás archivos generados automaticamente cuando usas `nuxt dev` o los artefactos del proyecto cuando usas `nuxt build`.

<base-alert>

El directorio `.nuxt` no deberia ser añadido en tu sistema de control de versión, y debería ser ignorado con `.gitignore`, ya que es generado automáticamente cuando ejecutas `nuxt dev` or `nuxt build`.

</base-alert>

### La propiedad de buildDir

Por defecto, muchas herramientas web, asumen que `.nuxt` es un directorio escondido, esto se debe a que el nombre del archivo comienza con un punto. Tu puedes usar la opción del _buildDir_ para prevenir eso. Si llegas a cambiar el nombre, recuerda añadir el nombre nuevo al archivo `.gitignore`

```js{}[nuxt.config.js]
export default {
  buildDir: 'nuxt-dist'
}
```

### Dentro del directorio .nuxt:

- El router.js es un archivo de rutas y se genera automáticamente cuando añades archivos `.vue` dentro del directorio de páginas. Puedes usar este archivo para hacer _debugging_ cuando necesitas buscar cuales rutas estan siendo generadas por el `vue-router` y ver los nombres de alguna ruta específica.
- El router.scrollBehavior.js, que es el comportamiento de tu router
- El directorio de los componentes, contiene todos tus componentes de Nuxt, NuxtChild y NuxtLink. Tambíen contiene el indicador de _builds_ que es la pagina que vemos cuando la aplicación se está construyendo en el browser. Adicional a eso, vas a encotrar la página de error, que contiene el error por defecto de Nuxt.
- El directorio de `mixins`, que contiene los archivos necesarios para el método `$fetch` de Nuxt.
- El directorio de `views` contiene el template de la aplicación y la página de error del servidor.
- El `app.js`, que es el archivo principal de la aplicación.
- El `client.js`, el archivo requerido por el client (browser), que se necesita para todo lo que sucede en el _client side_.
- El archivo vacío es intencional, reservado para _noop aliases_
- El `index.js` inicia tu aplicación.
- El `loading.html` es el archivo que se usa cuando la página esta cargando.
- El archivo de `middleware` es donde los scripts del middleware.
- El `server.js` es todo el codigo que se corre en el servidor.
- El archivo de utilidades _utilities_, que Nuxt necesita para que funcione.

### Publicando la aplicación

El directorio de `.nuxt` es parte de los archivos necesarios para publicar la aplicación con SSR. No se necesita para publicar un app de Nuxt estático, ya que en este caso se usa el archivo `dist`.

<quiz :questions="questions"></quiz>
