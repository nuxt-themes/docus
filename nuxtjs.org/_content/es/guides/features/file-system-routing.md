---
title: Sistema de enrutamiento
description: Nuxt.js genera automáticamente la configuración del vue-router en función del árbol de archivos de Vue dentro de la carpeta pages. Cuando crees un archivo .vue en el directorio pages tendrás un enrutamiento básico que funciona sin necesidad de configuración adicional.
position: 3
category: features
questions:
  - question: What is the name of the component you use to navigate between pages?
    answers:
      - '<a>'
      - '<NuxtLink>'
      - '<Nuxt>'
    correctAnswer: '<NuxtLink>'
  - question: What do you need to do to generate an automatic router configuration?
    answers:
      - add a .vue file to the pages directory
      - create a router.config file
      - 'add a <NuxtLink> to your page'
    correctAnswer: add a .vue file to the pages directory
  - question: Which of the following will not create a dynamic route?
    answers:
      - dynamic.vue
      - _slug.vue
      - _slug/index.vue
    correctAnswer: dynamic.vue
  - question: Dynamic routes are ignored by the nuxt generate command?
    answers:
      - True
      - False
    correctAnswer: False
  - question: How do you access the route params for a dynamic page such as users/_id.vue?
    answers:
      - $route.params.id
      - $route.id
      - $route.params.users.id
    correctAnswer: $route.params.id
  - question: How do you define the parent component of a nested route?
    answers:
      - create a Vue file called parent inside the directory which contains the children views
      - create a Vue file with a different name as the directory which contains the children views
      - create a Vue file with the same name as the directory which contains the children views
    correctAnswer: create a Vue file with the same name as the directory which contains the children views
  - question: If you do not know the depth of your URL structure, you can use which file to dynamically match nested paths?
    answers:
      - _.vue
      - _index.vue
      - _id.vue
    correctAnswer: _.vue
  - question: Which components can you use to render named views?
    answers:
      - '<Nuxt> and <Child>'
      - '<Nuxt> and <NuxtChild>'
      - '<NuxtChild> and <NuxtLink>'
    correctAnswer: '<Nuxt> and <NuxtChild>'
  - question: In Nuxt.js which file can you create to force the scroll position to the top for every route?
    answers:
      - app/router.scrollBehavior.js
      - app/scrollBehavior.js
      - app/router.js
    correctAnswer: app/router.scrollBehavior.js
  - question: In Nuxt.js you can add trailing slashes which will be appended to every route?
    answers:
      - true
      - false
    correctAnswer: true
---

Nuxt.js genera automáticamente la configuración del vue-router en función del árbol de archivos de Vue dentro de la carpeta pages. Cuando crees un archivo .vue en el directorio pages tendrás un enrutamiento básico que funciona sin necesidad de configuración adicional.

A Veces puede que necesites crear una ruta dinámica o ruta anidada or quizas necesites configurar un poco más la propiedad router. Este capítulo te mostrará todo lo que necesitas saber para sacar el máximo partido de tu router.

<base-alert type="info">

Nuxt.js provee división de código automático para tus rutas, no se necesita configuración.

</base-alert>

<base-alert type="info">

Usa el [NuxtLink component](/docs/2.x/features/nuxt-components#the-nuxtlink-component) para navegar entre paginas.

</base-alert>

```html
<template>
  <nuxt-link to="/">Home page</nuxt-link>
</template>
```

## Rutas básicas

Este árbol de archivos:

```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

Automaticamente generara:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

## Rutas dinamicas

A veces no es posible conocer el nombre de la ruta, como cuando realizamos una llamada a una api para obtener una lista de usuarios o entradas de blog. Llamamos a estas, rutas dinamicas. Para crear una ruta dinámica necesitas añadir un guion bajo antes del nombre del archivo .vue o antes del nombre del directorio. Puedes nombrar el archivo o el directorio como desees pero tienes que anteponer un guión bajo.

Este árbol de archivos:

```
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

Automaticamente generara:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

<base-alert type="info">

Como puedes ver, la ruta llamada `users-id` tiene `:id?` que lo convierte en opcional, si deseas hacer lo requerido, crea un archivo `index.vue` en el directorio `users/_id` en su lugar.

</base-alert>

<base-alert type="info">

A partir de Nuxt >= v2.13 hay un rastreador instalado que ahora rastreará tus etiquetas de enlace y generará tus rutas dinámicas basadas en esos enlaces. Sin embargo, si tienes páginas que no están vinculadas como una página secreta, luego tendrás que generar esas rutas dinámicas manualmente .

</base-alert>

<base-alert type="next">

[Crear rutas dinámicas](/docs/2.x/concepts/static-site-generation) para sitios estaticos

</base-alert>

### Acceso local a los parámetros de ruta

Puedes acceder a los parámetros de ruta dentro de su página o componente haciendo referencia a `this.$route.params.{parameterName}`. Por ejemplo, Si tuvieras una página de usuarios dinámica (`users/_id.vue`) y quisieras acceder al parámetro `id` para cargar el usuario o procesar información, podrias acceder a la variable de la siguiente manera: `this.$route.params.id`.

## Rutas anidadas

Nuxt.js te permite crear rutas anidadas usando las rutas hijo del vue-router. Para definir el componente principal de una ruta anidada, necesitas crear un archivo Vue con el mismo nombre que contiene el directorio de tus vistas hijas.

<base-alert>

No olvides incluir el componente [NuxtChild](/docs/2.x/features/nuxt-components#the-nuxtchild-component) dentro del componente principal (archivo `.vue`).

</base-alert>

Este árbol de archivos:

```
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

Automaticamente generara:

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

## Rutas anidadas dinámicas

Este escenario no debería ocurrir a menudo, pero es posible con Nuxt.js tener hijos dinámicos dentro de padres dinámicos.

Este árbol de archivos:

```
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue
```

Automaticamente generara:

```js
router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```

## Rutas anidadas dinámicas desconocidas

Si no conoces la profundidad de tu estructura URL, puedes utilizar `_.vue` para hacer coincidir dinámicamente las rutas anidadas. Esto controlara las solicitudes que no coinciden con una solicitud _más específica_.

Este árbol de archivos:

```
pages/
--| people/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue
```

Controlará peticiones así:

```
/ -> index.vue
/people -> people/index.vue
/people/123 -> people/_id.vue
/about -> _.vue
/about/careers -> _.vue
/about/careers/chicago -> _.vue
```

<base-alert type="info">

El manejo de páginas 404 ahora depende de la lógica de la página `_.vue`.

</base-alert>

## Extendiendo el enrutador

Hay varias formas de extender el enrutador con Nuxt:

- [router-extras-module](https://github.com/nuxt-community/router-extras-module) para personalizar los parámetros de ruta en la página.
- component[@nuxtjs/router](https://github.com/nuxt-community/router-module) para reemplazar el router Nuxt y escribir tu propio archivo `router.js`
- Usa la propiedad [router.extendRoutes](/docs/2.x/configuration-glossary/configuration-router#extendroutes) en tu `nuxt.config.js`

## La propiedad router

La propiedad router te permite personalizar el router Nuxt.js (vue-router).

```js{}[nuxt.config.js]
export default {
  router: {
    // personaliza el Nuxt.js router
  }
}
```

### Base:

La dirección URL de la aplicación. Por ejemplo, si toda la aplicación es servida debajo `/app/`, entonces la base tiene que usar el valor `'/app/'`.

<base-alert type="next">

[Propiedad Base del Router](/docs/2.x/configuration-glossary/configuration-router#base)

</base-alert>

### extendRoutes

Es posibles que quieras extender las rutas creadas por Nuxt.js. Puedes hacerlos a través de la opción `extendRoutes`.

Ejemplo de añadir una ruta personalizada:

```js{}[nuxt.config.js]
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  }
}
```

Si quieres ordenar tus rutas, puedes usar la función `sortRoutes(routes)` desde `@nuxt/utils`:

```js{}[nuxt.config.js]
import { sortRoutes } from '@nuxt/utils'
export default {
  router: {
    extendRoutes(routes, resolve) {
      // Añade algunas rutas aqui ...

      // y luego ordenálas
      sortRoutes(routes)
    }
  }
}
```

<base-alert>

El esquema de la ruta debe respetar el esquema del [vue-router](https://router.vuejs.org/en/).

</base-alert>

<base-alert>

Al añadir rutas que utilizan [Vistas con nombre](https://nuxtjs.org/docs/2.x/features/file-system-routing#named-views), no olvides agregar el correspondiente `chunkNames` de los `components` nombrados.

</base-alert>

```js{}[nuxt.config.js]
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/users/:id',
        components: {
          default: resolve(__dirname, 'pages/users'), // or routes[index].component
          modal: resolve(__dirname, 'components/modal.vue')
        },
        chunkNames: {
          modal: 'components/modal'
        }
      })
    }
  }
}
```

<base-alert type="next">

[Propiedad extendRoutes](/docs/2.x/configuration-glossary/configuration-router#extendroutes)

</base-alert>

### fallback

Controla si el router debe volver al modo hash cuando el navegador no admite history.pushState pero el modo está establecido en history.

<base-alert type="next">

[Propiedad fallback](/docs/2.x/configuration-glossary/configuration-router#fallback)

</base-alert>

### mode

Configurar el modo del enrutador, no es recomendado cambiarlo debido al renderizado del lado del servidor.

<base-alert type="next">

[Propiedad mode](/docs/2.x/configuration-glossary/configuration-router#mode)

</base-alert>

### parseQuery / stringifyQuery

Provide custom query string parse / stringify functions.

<base-alert type="next">

[parseQuery / stringifyQuery Property](/docs/2.x/configuration-glossary/configuration-router#parsequery--stringifyquery)

</base-alert>

### routeNameSplitter

Es posible que quieras cambiar el separador entre los nombres de ruta que utiliza Nuxt.js. Puedes hacerlo a través de la opción `routeNameSplitter` en tu archivo de configuración. Imagina que tenemos el archivo de página `pages/posts/_id.vue`. Nuxt.js generará el nombre de ruta programáticamente, en este caso `posts-id`. Por lo tanto, cambiar la configuración `routeNameSplitter` a `/` el nombre cambiara a `posts/id`.

```js{}[nuxt.config.js]
export default {
  router: {
    routeNameSplitter: '/'
  }
}
```

### scrollBehavior

La opción `scrollBehavior` te permite definir un comportamiento personalizado para la posición del scroll entre rutas. Este método es llamado cada vez que una página es renderizada.

<base-alert type="next">

Para aprender al respecto, ver [documentación vue-router scrollBehavior](https://router.vuejs.org/guide/advanced/scroll-behavior.html).

</base-alert>

Disponible desde: v2.9.0:

En Nuxt.js puedes usar un archivo para sobreescribir el scrollBehavior del router. Este archivo debe colocarse en una carpeta llamada app.

`~/app/router.scrollBehavior.js`.

Ejemplo de forzar la posición de la posición del scroll a la parte superior para cada ruta:

```js{}[app/router.scrollBehavior.js]
export default function (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

<base-alert type="next">

[Nuxt.js default `router.scrollBehavior.js` file.](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/router.scrollBehavior.js)

</base-alert>

<base-alert type="next">

[Propiedad scrollBehavior](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior)

</base-alert>

### trailingSlash

Disponible desde: v2.10

Si esta opción es establecida en true, las barras diagonales finales se anexarán a cada ruta. Si se establece en false, se eliminarán.

```js{}[nuxt.config.js]
export default {
  router: {
    trailingSlash: true
  }
}
```

<base-alert>

Esta opción no debe ser establecerse sin preparación y debe probarse profundamente. Cuando seteamos `router.trailingSlash` en otra cosa que no sea `undefined` (que es el valor por defecto), la ruta opuesta dejará de funcionar. Por los tanto, las redirecciones 301 deben estar en su lugar y tu _enlace interno_ tiene que ser adaptado correctamente. Si tu fijas el valor de `trailingSlash` a true, entonces solo funcionará `example.com/abc/` pero no `example.com/abc`. En false, es viceversa.

</base-alert>

<base-alert type="next">

[Propiedad trailingSlash](/docs/2.x/configuration-glossary/configuration-router#trailingslash)

</base-alert>

<quiz :questions="questions"></quiz>
