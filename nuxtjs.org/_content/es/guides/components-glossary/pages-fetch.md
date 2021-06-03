---
title: 'El método Fetch'
description: El método `fetch` se usa para llenar la `store` antes de renderizar la página, es como el método` asyncData` excepto que no establece los datos del componente.
menu: Método Fetch
category: components-glossary
position: 0
---

## Nuxt >= 2.12

Nuxt.js `v2.12` introduce un nuevo _hook_ llamado `fetch`(traer) **en cualquiera de tus componentes de Vue**.

<base-alert>

`fetch(context)` ha quedado obsoleto, en su lugar puede utilizar un [middleware anónimo](/docs/2.x/components-glossary/pages-middleware#anonymous-middleware) en vuestra pagina: `middleware(context)`

</base-alert>

### ¿Cuándo usar fetch?

Cada vez que necesite obtener datos **asincrónicos**. `fetch` se llama en el lado del servidor cuando se renderiza la ruta y en el lado del cliente cuando se navega.

Expone `$fetchState` a nivel de componente:

- `$fetchState.pending`: `Boolean`, permite mostrar un _placeholder_ cuando se llama a `fetch` _en el lado del cliente_.
- `$fetchState.error`: `null` o `Error`, permite mostrar un mensaje de error
- `$fetchState.timestamp`: `Integer`, es una marca de tiempo de la última recuperación, útil para almacenar en caché con `keep-alive`

Si desea llamar al hook `fetch` de su plantilla, use:

```html
<button @click="$fetch">Actualizar</button>
```

O en el método de componente:

```javascript
// de los métodos de componentes en la sección de script
export default {
  methods: {
    refresh() {
      this.$fetch()
    }
  }
}
```

Puede acceder el [contexto](/docs/2.x/internals-glossary/context) de Nuxt dentro del hook de recuperación usando `this.$nuxt.context`.

### Options

- `fetchOnServer`: `Boolean` or `Function` (default: `true`), llama `fetch()` al renderizar la página en el servidor
- `fetchDelay`: `Integer` (default: `200`), establecer el tiempo mínimo de ejecución en milisegundos (para evitar destellos rápidos)

<div class="Alert Alert--green">

Cuando `fetchOnServer` es falso (`false` o retorna `false`), `fetch` se llamará solo en el lado del cliente y `$fetchState.pending` devolverá `true` cuando el servidor renderice el componente.

</div>

```html
<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    async fetch() {
      this.posts = await this.$http.$get(
        'https://jsonplaceholder.typicode.com/posts'
      )
    },
    fetchOnServer: false
  }
</script>
```
