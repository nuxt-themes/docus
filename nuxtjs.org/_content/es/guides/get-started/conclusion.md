---
title: Conclusión
description: Enhorabuena, ya has creado tu primera aplicación Nuxt.js y puedes considerarte un Nuxter. Pero aún hay mucho más por aprender y muchísimo más que puedes hacer con Nuxt.js. Aquí tienes algunas recomendaciones.
position: 4
category: get-started
questions:
  - question: ¿Cuál es el nombre del directorio que necesitas para que Nuxt.js funcione?
    answers:
      - nuxt
      - pages
      - index
    correctAnswer: pages
  - question: ¿Cuál es el nombre del archivo ID de tu proyecto?
    answers:
      - package.vue
      - package.json
      - package.js
    correctAnswer: package.json
  - question: ¿Cuál es el comando que tecleas en el terminal para ejecutar tu proyecto Nuxt.js?
    answers:
      - npm dev
      - npm run dev
      - nuxt dev
    correctAnswer: npm run dev
  - question: ¿En qué dirección del navegador puedes ver tu página en modo desarrollo?
    answers:
      - http://localhost:3000/
      - http://localhost:3000/project-name:3000
      - http://localhost:3000/nuxt:3000/
    correctAnswer: http://localhost:3000/
  - question: ¿Dónde pones tu configuración?
    answers:
      - nuxt.config.json
      - config.js
      - nuxt.config.js
    correctAnswer: nuxt.config.js
  - question: ¿Qué directorio no es adecuado para archivos `.vue`?
    answers:
      - pages
      - static
      - components
    correctAnswer: static
  - question: ¿En qué directorio pones tus estilos?
    answers:
      - styles
      - components
      - assets
    correctAnswer: assets
  - question: ¿En qué directorio ponemos un archivo robots.txt o favicon?
    answers:
      - assets
      - components
      - static
    correctAnswer: static
  - question: ¿Qué componente usamos para navegar entre páginas?
    answers:
      - '<Nuxt>'
      - '<RouterLink>'
      - '<NuxtLink>'
    correctAnswer: '<NuxtLink>'
  - question: ¿Se utiliza `<NuxtLink>` para los enlaces internos que pertenecen a la aplicación Nuxt.js?
    answers:
      - True
      - False
    correctAnswer: True
---

¡Enhorabuena! Ya has creado tu primera aplicación Nuxt.js y puedes considerarte un Nuxter, pero aún hay mucho más por aprender y muchísimo más que puedes hacer con Nuxt.js. Aquí tienes algunas recomendaciones:

<base-alert type="next">

Echa un vistazo al [libro de Conceptos](../concepts/views)

</base-alert>

<base-alert type="next">

Trabajar con [asyncData](/docs/2.x/features/data-fetching#async-data)

</base-alert>

<base-alert type="next">

Eligiendo entre diferentes [modos de Renderizado](/docs/2.x/features/rendering-modes)

</base-alert>

<base-alert type="star">

¿Te ha gustado Nuxt.js? No te olvides de [darle una estrella a nuestro proyecto](https://github.com/nuxt/nuxt.js) en GitHub

</base-alert>

<quiz :questions="questions"></quiz>
