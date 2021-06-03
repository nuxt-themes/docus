---
title: componentes
description: El directorio de componentes contiene los componentes de Vue.js. Los componentes son los que crean las diferentes partes de tu página y pueden ser reusados e importados dentro de cualquier página, layout y otros componentes.
position: 3
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/03_components?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/components.png
imgAlt: nuxt components module
questions:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
---

El directorio de componentes contiene los componentes de Vue.js. Los componentes son los que crean las diferentes partes de tu página y pueden ser reusados e importados dentro de cualquier página, layout y otros componentes.

### Recuperación de Datos

Para accessar data asincrónica desde un API en los componentes, puedes usar Nuxt [`fetch()` hook](/docs/2.x/features/data-fetching#the-fetch-method).

puedes mostrar un mensaje cuando la información está por cargar. Y usando `$fetchState.error` puedes mostrar un mensaje de error si hay algun error cuando la data es llamada. Cuando usas fetch, tienes que declarar la data en la propiedad de `data`. Esto se popula con la data que viene del `fetch`.

```html{}[components/MountainsList.vue]
<template>
  <div>
    <p v-if="$fetchState.pending">Cargando....</p>
    <p v-else-if="$fetchState.error">
      Oops, hay un error buscando las montañas.
    </p>
    <ul v-else>
      <li v-for="(mountain, index) in mountains" :key="index">
        {{ mountain.title }}
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        mountains: []
      }
    },
    async fetch() {
      this.mountains = await fetch(
        'https://api.nuxtjs.dev/mountains'
      ).then(res => res.json())
    }
  }
</script>
```

<base-alert type="next">

Verifica el capítulo de [fetch()](/docs/2.x/features/data-fetching#the-fetch-method) para más detalles.

</base-alert>

## Descubrimiento de componentes

Desde Nuxt `v2.13` puedes auto-importar los componentes cuando los usas en los templates. Para activar esta funcionalidad, configura `components: true`.

```js{}[nuxt.config.js]
export default {
  components: true
}
```

Cuando creas tus componentes en el directorio de `componentes`, estarán disponibles para usarlos en las páginas.

```html
components/ TheHeader.vue TheFooter.vue
```

```html{}[layouts/default.vue]
<template>
  <TheHeader />
  <Nuxt />
  <TheFooter />
</template>
```

### Importes Dinámicos

Para importar un componente dinámicamente, también conocido como `lazy loading`, lo unico que necesitas añadir es el prefijo `lazy` en tus templates.

```html{}[layouts.default.vue]
<template>
  <TheHeader />
  <Nuxt />
  <LazyTheFooter />
</template>
```

Si usas el prefijo `lazy`, también puedes importar componentes dinámicamente, luego que un evento se active.

```html{}[pages/index.vue]
<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="showList">Show List</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    },
    methods: {
      showList() {
        this.show = true
      }
    }
  }
</script>
```

### Directorios anidados

Si tienes componentes en directorios anidados como:

```bash
components/
  base/
    Button.vue
```

El nombre del componente se basará en el nombre del archivo. Entonces, el componente será:

```html
<button />
```

Recomendamos que uses el nombre del directorio en el nombre del archivo para mejor claridad.

```bash
components/
  base/
    BaseButton.vue
```

Sin embargo, si deseas mantener el nombre del archivo como `Button.vue` entonces puedes usar la opción del prefijo en el nuxt config para añadir un prefijo a todos los componentes en un directorio en específico.

```bash
components/
  base/
   Button.vue
```

```bash{}[nuxt.config.js]
components: {
  dirs: [
    '~/components',
      {
        path: '~/components/base/',
        prefix: 'Base'
      }
  ]
}
```

Luego, en el template puedes usar el componente `BaseButton` en vez de `Button` sin tener que hacer cambios al nombre del archivo `Button.vue`.

```html{}[pages/index.vue]
<BaseButton />
```

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<base-alert type="next">

Conoce más a cerca de los [módulos de componentes](/blog/improve-your-developer-experience-with-nuxt-components)

</base-alert>
