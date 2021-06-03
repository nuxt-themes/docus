---
title: Generación Estática de Sitio
description: Con generación estática de sitio puedes renderizar tu aplicación durante la fase de build y desplegarlo a cualquier servicio de hosting de sitios estáticos como Netlify, GitHub pages, Vercel etc.
position: 4
category: concepts
questions:
  - question: Necesitas un server para hospedar tu sitio estático ?
    answers:
      - True
      - False
    correctAnswer: False
  - question: Qué comando usas para generar tu sitio estático ?
    answers:
      - nuxt build
      - nuxt prerender
      - nuxt generate
    correctAnswer: nuxt generate
  - question: Cuándo es llamada tu API ?
    answers:
      - Cada vez que navegas a la página con el contenido del API
      - Cuando generas tu sitio
      - Cuando generas tu sitio y cada vez que navegas a la página con el contenido del API
    correctAnswer: Cuando generas tu sitio
  - question: Que páginas alternarán a single page application mode ?
    answers:
      - La página de error
      - Las páginas excluidas del proceso de generación con generate.excludes
      - Todas páginas en navegación
    correctAnswer: Las páginas excluidas del proceso de generación con generate.excludes
  - question: Cómo actualizas el contenido de tu sitio ?
    answers:
      - Es actualizado automáticamente
      - Es necesario regenerar el sitio
    correctAnswer: Es necesario regenerar el sitio
---

Con generación estática de sitio puedes renderizar tu aplicación durante la fase de build y desplegarlo a cualquier servicio de hosting de sitios estáticos como Netlify, GitHub pages, Vercel etc. Esto implica que no es necesario un server para desplegar tu aplicación.

### Generando tu sitio

Cuando despliegues tu sitio con [target:static](/docs/2.x/features/deployment-targets#static-hosting) todas tus páginas `.vue` serán generadas a archivos HTML y JS. Todas las llamadas a APIs serán echas y cacheadas en una carpeta llamada static dentro de tu contenido generado, de forma que no serán necesarias llamadas a tu API en la navegación del cliente.

### Paso 1: Navegador a CDN

Cuando el navegador envíe el request inicial, lo recibirá el CDN.

### Paso 2: CDN a Navegador

El CDN enviará los previamente generados HTML, JavaScript y activos de static al navegador.
El contenido será mostrado y la hidratación de Vue.js entrará en acción, haciéndolo reactivo. Después de este proceso, la página será interactiva.

### Paso 3: Navegador a Navegador

La navegación entre rutas con [`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component) es realizada en el cliente, no será necesario acceder al CDN nuevamente, todas las llamadas a la API serán cargadas desde el caché de la carpeta static, incluso si refrescas el navegador.

### Alternando a SPA

Las páginas que han sido excluidas del proceso de generación usando la propiedad `generate.exclude` alternarán a single page application. Estas páginas no existirán en el CDN y serán renderizadas en el cliente una vez el usuario navegue a ellas.

<base-alert type="next">

Para aprender más sobre [generate property](/docs/2.x/configuration-glossary/configuration-generate#exclude)

</base-alert>

### Actualizando tu contenido

Con el fin de obtener nuevo contenido desde tu API solo es necesario regenerar tu sitio nuevamente. En la mayoría de los proveedores de hosting estático puedes hacer esto con un push con los cambios al master branch mediante el comando de git o haciendo un pull request.

### Modo de vista previa

Modo de vista previa llamará a tu API o tu CMS para que veas los cambios antes de desplegar. Ver el [preview mode](/docs/2.x/features/live-preview) sobre como activar esta funcionalidad.

<quiz :questions="questions"></quiz>
