---
title: dist
description: El directorio de `dist` es una abreviación de directorio de *distribución*. Se genera dinámicamente cuando ejecutas el comando `nuxt generate` e incluye los archivos generados y optimizados para producción, necesarios para publicar y correr tu aplicación de Nuxt estática.
position: 5
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/05_dist?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: ¿Con qué comandos puedes generar el directorio de `dist?
    answers:
      - nuxt build
      - nuxt start
      - nuxt generate
    correctAnswer: nuxt generate
  - question: Éste es el directorio que necesitas subir en tu hosting de websites estáticos
    answers:
      - cierto
      - falso
    correctAnswer: cierto
  - question: ¿Cuál propiedad puedes usar para cambiar el nombre del directorio `dist`?
    answers:
      - dist
      - dir
      - buildDir
    correctAnswer: dir
  - question: ¿Cuál propiedad puedes usar para evitar tener todos los archivos generados dentro de un directorio?
    answers:
      - 'folders: false'
      - 'subFolders: false'
      - 'pages: true'
    correctAnswer: 'subFolders: false'
  - question: ¿Cuál es el valor por defecto de Nuxt.js para la propiedad de retroceder (fallback)?
    answers:
      - "'200.html'"
      - "'404.html'"
      - 'false'
    correctAnswer: "'200.html'"
  - question: ¿Cuál archivo se recomienda usar para los errores de una página generada estáticamente?
    answers:
      - "'200.html'"
      - "'404.html'"
      - false
    correctAnswer: "'404.html'"
  - question: ¿Cuál propiedad puedes usar para ignorar algunos archivos para que no sean generados estáticamente?
    answers:
      - ignore
      - exclude
      - fallback
    correctAnswer: exclude
---

El directorio de `dist` es una abreviación de directorio de _distribución_. Se genera dinámicamente cuando ejecutas el comando `nuxt generate` e incluye los archivos generados y optimizados para producción, necesarios para publicar y correr tu aplicación Nuxt generada estáticamente.

### Publicando

Este es el directorio que necesitas para **subir a tu hosting de páginas estáticas**, ya que contiene todos los archivos y recursos que son generados y listos para producción.

<base-alert>

El directorio de `dist` no debe ser incluido a tu sistema de control de versión ya que se genera automáticamente cuando ejecutas `nuxt generate`. Para evitar esto, añádelo al `.gitignore`.

</base-alert>

### La propiedad `dir`

Por defecto el directorio de distribución se llama dist, pero puedes configurar otro nombre en el archivo de configuración de Nuxt (nuxt.config).

```js{}[nuxt.config.js]
generate: {
  dir: 'mi-hermosa-pagina-sin-errores'
}
```

<base-alert>

Si cambias el nombre del directorio de distribución debes añadirlo al `.gitignore` para evitar que se incluya en el sistema de control de versión.

</base-alert>

### La Propiedad de subFolders

Por defecto, Nuxt.js añade todos los archivos generados dentro de un directorio. Puedes cambiar esto si deseas, en el archivo de `nuxt.config`, si asignas el valor de falso a la propiedad.

```js{}[nuxt.config.js]
generate: {
  subFolders: false
}
```

### La Propiedad de Retroceder (fallback)

Cuado vayas a publicar tu website, tienes que asegurarte de que la localización de fallback del html sea correcta. Debería estar configurada como página de error para que las rutas que no existan, se puedan mostrar con Nuxt. Si no esta configurado, Nuxt.js usara el valor por defecto que es 200.html.

Hace mas sentido usar 200.html cuando ejecutamos un SPA (single page application) por que es el único archivo necesario, ya que no se genera ninguna otra ruta.

Cuando trabajamos con páginas estáticas se recomienda que usemos 404.html para los erorres de página.

<base-alert>

Vas a usar 200.html o 404.html dependiendo en el hosting donde esté tu website. Verifica tu proveedor de hosting para más información. Por ejemplo, Netlify usa 404.html

</base-alert>

```js{}[nuxt.config.js]
export default {
  generate: {
    fallback: '404.html'
  }
}
```

### La propiedad de exclusión (excludes)

Puedes usar la propiedad de `excludes` para evitar que algunas páginas sean generadas. En vez de ser generadas como páginas estáticas, va a caer en la categoría de SPA y se mostrará sólo del lado del cliente (client-side).

```js{}[nuxt.config.js]
generate: {
  exclude: [/admin/]
}
```

<base-alert type="info">

También puedes usar expresiones regulares (regex) para incluir páginas que comiencen o terminen en una palabra en particular.

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
