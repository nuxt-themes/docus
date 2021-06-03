---
title: Enrutamiento
description: La mayoría de los sitios web tienen más de una página, por ejemplo, inicio, sobre nosotros, contacto, etc. Para mostrar estas páginas necesitamos un Router.
position: 2
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/02_routing?fontsize=14&hidenavigation=1&theme=dark
---

## Rutas Automáticas

La mayoría de los sitios web tienen más de una página, por ejemplo, inicio, sobre nosotros, contacto, etc. Para mostrar estas páginas necesitamos un Router. Aquí es donde entra en acción `vue-router`. Cuando trabajas con una aplicación de Vue, tienes que crear un archivo de configuración (p.ej. `router.js`) y añadir todas las rutas manualmente. Nuxt.js genera automáticamente la configuración de `vue-router` por ti, basándose en los ficheros Vue que tengas en la carpeta `pages`. Lo que significa que ¡nunca más tendrás que escribir el archivo de configuración del enrutador! Nuxt.js también te da división de código por rutas de forma automática.

En otras palabras, todo lo que tienes que hacer para generar rutas en tu aplicación es crear archivos `.vue` en la carpeta `pages`.

<base-alert type="next">

Aprende más sobre [Enrutamiento](/docs/2.x/features/file-system-routing)

</base-alert>

## Navegación

Para ir de una página a otra en tu aplicación, debes usar el componente [NuxtLink](/docs/2.x/features/nuxt-components#the-nuxtlink-component). Este componente está incluído en Nuxt.js y por lo tanto no tienes que importarlo como haces con otros componentes. Es similar a la etiqueta `<a>` de HTML, excepto que en lugar de usar un `href="/about"` usamos `to="/about"`. Si has usado antes `vue-router`, puedes ver `<NuxtLink>` como un sustituto de `<RouterLink>`.

Un simple enlace a la página `index.vue` de tu carpeta `pages`:

```html{}[pages/index.vue]
<template>
  <NuxtLink to="/">Home page</NuxtLink>
</template>
```

Para todos los enlaces internos a las páginas de tu sitio web, usa `<NuxtLink>`. Si tienes enlaces externos a otros sitios web, usa la etiqueta `<a>`. Mira el ejemplo de abajo:

```html{}[pages/index.vue]
<template>
  <main>
    <h1>Home page</h1>
    <NuxtLink to="/about">
      About (internal link that belongs to the Nuxt App)
    </NuxtLink>
    <a href="https://nuxtjs.org">External Link to another page</a>
  </main>
</template>
```

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<base-alert type="next">

Aprende más sobre el [componente NuxtLink](/docs/2.x/features/nuxt-components#the-nuxtlink-component).

</base-alert>
