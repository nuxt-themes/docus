---
title: 'O método fetch'
description: O método `fetch` é usado para popular a store antes de renderizar a página. É como o método `asyncData`, exceto que não define os dados do componente.
menu: Fetch Method
category: components-glossary
position: 0
---

## Nuxt >= 2.12

Nuxt.js `v2.12` introduz um novo hook chamado `fetch` **em qualquer um dos seus componentes Vue**.

<base-alert>

`fetch(contexto)` tornou-se obsoleto, em vez disso você pode usar um [middleware anônimo](/docs/2.x/components-glossary/pages-middleware#anonymous-middleware) em sua página: `middleware(contexto)`

</base-alert>

### Quando usar fetch?

Sempre que você precisa obter dados **assíncronos**. `fetch` é chamado no lado do servidor ao renderizar a rota e no lado do cliente ao navegar.

Ele expõe `$fetchState` no nível do componente:

- `$fetchState.pending`: `Boolean`, permite que você exiba um placeholder quando `fetch` está sendo chamado _no lado do cliente_.
- `$fetchState.error`: `null` ou `Error`, permite que você exiba uma mensagem de erro
- `$fetchState.timestamp`: `Integer`, é um carimbo de data/hora do último fetch, útil para armazenamento em cache com `keep-alive`

Se você quiser chamar o hook `fetch` no seu template, use:

```html
<button @click="$fetch">Recarregar</button>
```

ou como método de componente:

```javascript
// dos métodos de componente na seção de script
export default {
  methods: {
    recarregar() {
      this.$fetch()
    }
  }
}
```

Você pode acessar o [contexto](/docs/2.x/internals-glossary/context) do Nuxt dentro do hook fetch usando `this.$nuxt.context`.

### Opções

- `fetchOnServer`: `Boolean` ou `Function` (padrão: `true`), chame `fetch()` ao renderizar a página pelo servidor
- `fetchDelay`: `Integer` (padrão: `200`), defina o tempo mínimo de execução em milissegundos (para evitar flashes rápidos)

<div class="Alert Alert--green">

Quando `fetchOnServer` é falso (`false` ou retorna `false`), `fetch` será chamado apenas no lado do cliente e `$fetchState.pending` retornará `true` quando o servidor renderizar o componente.

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
