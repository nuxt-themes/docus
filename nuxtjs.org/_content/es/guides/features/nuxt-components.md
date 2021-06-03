---
title: Componentes de Nuxt
description: Nuxt.js posee una serie de componentes importantes integrados que resultarán de mucha utilidad para construir tu aplicación.
position: 9
category: features
csb_link_nuxt_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/09_components_nuxt-link?fontsize=14&hidenavigation=1&theme=dark
csb_link_nuxt: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/09_components_nuxt?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: ¿Qué componente se utiliza para desplegar los componentes de tu página?
    answers:
      - '<Nuxt>'
      - '<Page>'
      - '<Views>'
    correctAnswer: '<Nuxt>'
  - question: ¿Dónde se puede utilizar el componente `<Nuxt>`?
    answers:
      - componentes
      - páginas
      - layouts
    correctAnswer: layouts
  - question: ¿Qué componente se utiliza para desplegar los componentes 'hijos' de una ruta anidada?
    answers:
      - '<Nuxt>'
      - '<NuxtChild>'
      - '<Children>'
    correctAnswer: '<NuxtChild>'
  - question: ¿Dónde se debe insertar el componente `<NuxtChild>`?
    answers:
      - pages/child.vue
      - pages/parent.vue
      - layouts/parent.vue
    correctAnswer: pages/parent.vue
  - question: '`keep-alive` se puede utilizar en'
    answers:
      - 'El componente <Nuxt> solamente'
      - 'El componente <Nuxt> y <NuxtChild>'
      - 'El componente <NuxtChild> solamente'
    correctAnswer: '<Nuxt> and <NuxtChild> component'
  - question: ¿Qué componente se utiliza para vincular con páginas internas?
    answers:
      - '<NuxtLink>'
      - '<RouterLink>'
      - '<a>'
    correctAnswer: '<NuxtLink>'
  - question: '¿De qué manera se puede establecer un vínculo con la página *about* de tu aplicación mediante <NuxtLink>?'
    answers:
      - to="/about"
      - href="/about"
      - link="/about"
    correctAnswer: to="/about"
  - question: ¿Qué código se puede utilizar para deshabilitar el *prefetching* en determinadas páginas?
    answers:
      - no-prefetch
      - :prefetch="false"
      - no-prefetch and :prefetch="false"
    correctAnswer: no-prefetch and :prefetch="false"
  - question: ¿Qué clase se utiliza por defecto para agregar estilos a links activos?
    answers:
      - nuxt-link-active
      - link-active
      - router-link-active
    correctAnswer: nuxt-link-active
  - question: ¿Qué clase se utiliza por defecto para agregar estilos a links activos exactos?
    answers:
      - nuxt-link-exact-active
      - link-exact-active
      - nuxt-exact-active-link
    correctAnswer: nuxt-link-exact-active
  - question: En Nuxt ≥ 2.9.0 ¿qué componente se utiliza para que tu componente se despliegue solamente en el cliente?
    answers:
      - '<client-only>'
      - '<no-ssr>'
      - '<client>'
    correctAnswer: '<client-only>'
---

Nuxt.js posee una serie de componentes importantes ya integrados que te serán de utilidad para construir tu aplicación. Los componentes están disponibles globalmente, lo cual significa que no necesitas importarlos para poder utilizarlos.

A continuación se explican cada uno de los componentes que vienen incluidos.

## El componente Nuxt

El componente `<Nuxt>` se utiliza para desplegar los componentes de tu página. Básicamente, este componente se reemplaza por lo que está dentro de los mismos, dependiendo de la página que se esté mostrando. Por este motivo es importante que agregues el componente `<Nuxt>` a tus layouts.

```html{}[layouts/default.vue]
<template>
  <div>
    <div>My nav bar</div>
    <Nuxt />
    <div>My footer</div>
  </div>
</template>
```

<base-alert>

El componente `<Nuxt>` solamente se puede utilizar dentro de [layouts](/docs/2.x/concepts/views#layouts).

</base-alert>

El componente `<Nuxt>` puede tomar la propiedad de `nuxt-child-key`. Esta propiedad se pasa a `<RouterView>` para que tus transiciones funcionen correctamente dentro de páginas dinámicas.

Existen 2 maneras de manejar la propiedad interna `key` de `<RouterView>`.

1. Mediante una propiedad `nuxtChildKey` en tu componente `<Nuxt>`

```html{}[layouts/default.vue]
<template>
  <div>
    <Nuxt :nuxt-child-key="someKey" />
  </div>
</template>
```

2. Agregando la opción `key` en _page_ components como `string` o como `function`

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```

## El componente NuxtChild

Este componente se utiliza para desplegar los componentes hijos en rutas anidadas.

Ejemplo:

```
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

Este archivo va a generar las siguientes rutas:

```js
;[
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~/pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```

Para desplegar el componente `child.vue`, debes insertar el componente `<NuxtChild>` dentro de `pages/parent.vue`:

```html{}[pages/parent.vue]
<template>
  <div>
    <h1>Soy la vista padre</h1>
    <NuxtChild :foobar="123" />
  </div>
</template>
```

## keep-alive

Tanto el componente `<Nuxt>` como el componente `<NuxtChild/>` aceptan `keep-alive` y `keep-alive-props.`

<base-alert type="info">

Para aprender más sobre `keep-alive` y `keep-alive-props`, consultar [vue docs](https://vuejs.org/v2/api/#keep-alive)

</base-alert>

```html{}[layouts/default.vue]
<template>
  <div>
    <Nuxt keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- se convertirá en algo similar a esto -->
<div>
  <KeepAlive :exclude="['modal']">
    <RouterView />
  </KeepAlive>
</div>
```

```html{}[pages/parent.vue]
<template>
  <div>
    <NuxtChild keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- se convertirá en algo similar a esto -->
<div>
  <KeepAlive :exclude="['modal']">
    <RouterView />
  </KeepAlive>
</div>
```

Al igual que cualquier componente normal de Vue, los componentes `<NuxtChild>` también pueden recibir propiedades.

```html
<template>
  <div>
    <NuxtChild :key="$route.params.id" />
  </div>
</template>
```

Si deseas ver un ejemplo, consulta aquí: [ejemplo nested-routes](/examples/nested-routes).

<app-modal>
  <code-sandbox  :src="csb_link_nuxt"></code-sandbox>
</app-modal>

## El Componente NuxtLink

Puedes utilizar el componente `<NuxtLink>` para navegar por las páginas de tu aplicación. Este componente viene incluido en Nuxt.js, por lo tanto no es necesario que lo importes, como haces con otros componentes. Es similar a la etiqueta de HTML `<a>`, excepto que en lugar de utilizar un `href="/about"` tienes que usar `to="/about"`. Si ya has utilizado `vue-router` antes, puedes asumir que `<NuxtLink>` reemplaza a `<RouterLink>`

Hipervínculo sencillo hacia la página `index.vue` de tu directorio `pages`:

```html
<template>
  <NuxtLink to="/">Home page</NuxtLink>
</template>
```

El componente `<NuxtLink>` se debe utilizar para todos los links internos. Esto significa que debes utilizar `<NuxtLink>` para todos los links que dirigen hacia las páginas de tu sitio. La etiqueta `<a>` se debe utilizar para todos los links externos. Ello significa que si tienes links que dirigen hacia otros sitios web, debes utilizar la etiqueta `<a>`.

```html
<template>
  <div>
    <h1>Home page</h1>
    <NuxtLink to="/about"
      >About (hipervínculo interno que pertenece a la aplicación de
      Nuxt)</NuxtLink
    >
    <a href="https://nuxtjs.org">Hipervínculo externo hacia otra página</a>
  </div>
</template>
```

<base-alert type="info">

Para aprender más sobre `<RouterLink>`, consulta la [Documentación sobre Vue Router](https://router.vuejs.org/api/#router-link) para obtener mayor información.

</base-alert>

<base-alert type="info">
  
`<NuxtLink>` posee [*smart prefetching*](/docs/2.x/features/nuxt-components#the-nuxtlink-component) integrado.

</base-alert>

## prefetchLinks

Nuxt.js incluye _smart prefetching_ de forma automática. Esto significa que detecta cuando un hipervínculo es visible, ya sea en el viewport o al desplazarse y realiza el _prefetching_ en el JavaScript para todas aquellas páginas, para que estén listas cuando el usuario da clic al hipervínculo. Nuxt.js solamente carga los recursos cuando el navegador no se encuentra ocupado y no realiza el _prefetching_ si tu conexión está offline(fuera de línea) o si solamente tienes conexión 2g.

### Desactivar el _prefetching_ de links específicos

Sin embargo, en ciertas circunstancias es probable que desees desactivar el _prefetching_ de algunos links, por ejemplo, si tu página tiene mucho JavaScript, si tienes muchas páginas diferentes en las cuales se realizaría el _prefetching_ o si tienes que cargar múltiples scripts de terceros. Para desactivar el _prefetching_ en un hipervínculo en particular puedes utilizar la propiedad `no-prefetch`. A partir de Nuxt.js v2.10.0, puedes fijar la propiedad `prefetch` en `false`

```html
<NuxtLink to="/about" no-prefetch>Página About sin prefetching</NuxtLink>
<NuxtLink to="/about" :prefetch="false">Página About sin prefetching</NuxtLink>
```

### Desactivar el _prefetching_ globalmente

Para desactivar el _prefetching_ en todos los links, fija los `prefetchLinks` en `false`:

```js{}[nuxt.config.js]
export default {
  router: {
    prefetchLinks: false
  }
}
```

A partir de Nuxt.js v2.10.0, si has fijado el valor de `prefetchLinks` en `false` (falso) pero deseas hacer _prefetching_ a un link en particular, puedes utilizar la propiedad `prefetch`.

```html
<NuxtLink to="/about" prefetch>Página About con prefetching</NuxtLink>
```

## linkActiveClass

`linkActiveClass` funciona igual que la clase `vue-router` para vínculos activos. Si deseas mostrar cuáles links están activos, lo único que tienes que hacer es crear algo de css para la clase `nuxt-link-active` .

```css
.nuxt-link-active {
  color: red;
}
```

<base-alert>

Este código css se puede agregar ya sea al componente de navegación, a una página/layout en particular, o a tu archivo main.css .

</base-alert>

Si deseas, también puedes configurar para que el nombre de la clase sea distinto. Puedes hacerlo modificando la `linkActiveClass` en la propiedad router de tu archivo `nuxt.config.js`.

```js
export default {
  router: {
    linkActiveClass: 'my-custom-active-link'
  }
}
```

<base-alert type="info">

Esta opción se le da directamente a la linkActiveClass de `vue-router` . Consulta en [docs vue-router](https://router.vuejs.org/api/#active-class) para obtener mayor información al respecto.

</base-alert>

## linkExactActiveClass

`linkExactActiveClass` funciona igual que la clase `vue-router` en links activos exactos. Si deseamos mostrar de forma precisa los links que se encuentran activos, lo único que debes hacer es agregar algo de css a la clase `nuxt-link-exact-active` .

```css
.nuxt-link-exact-active {
  color: green;
}
```

<base-alert type="info">

Puedes agregar este código en css al componente de navegación, a alguna página o layout en particular, o a tu archivo main.css .

</base-alert>

Si lo deseas, también puedes colocar un nombre de clase distinto. Puedes lograrlo modificando la `linkActiveClass` en la propiedad router de tu archivo `nuxt.config.js`.

```js{}[nuxt.config.js]
export default {
  router: {
    linkExactActiveClass: 'my-custom-exact-active-link'
  }
}
```

<base-alert type="info">

Esta opción se le da directamente a la linkExactActiveClass de `vue-router`. Consulta [vue-router](https://router.vuejs.org/api/#active-class) [docs](https://router.vuejs.org/api/#exact-active-class) para obtener mayor información al respecto

</base-alert>

## linkPrefetchedClass

La opción `linkPrefetchedClass` permite añadir estilos a todos los links a que se les haya realizado _prefetching_. Esto resulta fabuloso para probar a cuáles links se les ha realizado _prefetching_ luego de haber modificado su comportamiento por defecto. Por defecto la opción `linkPrefetchedClass` viene desactivada. Si deseas activarla necesitas agregarla a la propiedad router de tu archivo `nuxt-config.js`.

```js{}[nuxt.config.js]
export default {
  router: {
    linkPrefetchedClass: 'nuxt-link-prefetched'
  }
}
```

Y luego puedes agregar los estilos para esa clase.

```css
.nuxt-link-prefetched {
  color: orangeRed;
}
```

<base-alert type="info">

En este ejemplo hemos usado `nuxt-link-prefetched` como nombre de la clase, pero puedes utilizar cualquier nombre de tu preferencia.

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link_nuxt_link"></code-sandbox>
</app-modal>

## El componente client-only

Este componente se usa para desplegar un componente del lado del cliente únicamente. Para importar un componente, registra el componente en un _plugin_ que funcione únicamente del lado del cliente.

```html{}[pages/example.vue]
<template>
  <div>
    <sidebar />
    <client-only placeholder="Loading...">
      <!-- este componente se va a desplegar solamente en el cliente -->
      <comments />
    </client-only>
  </div>
</template>
```

Deje un espacio reservado (placeholder) hasta que `<client-only />` quede montado en el cliente.

```html{}[pages/example.vue]
<template>
  <div>
    <sidebar />
    <client-only>
      <!-- este componente se va a desplegar solamente en el cliente -->
      <comments />

      <!-- indicador de carga, se despliega en el servidor -->
      <comments-placeholder slot="placeholder" />
    </client-only>
  </div>
</template>
```

<base-alert>

Si estás usando una versión de Nuxt < v2.9.0, utiliza `<no-ssr>` en lugar de `<client-only>`

</base-alert>

<quiz :questions="questions"></quiz>
