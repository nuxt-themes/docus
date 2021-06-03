---
title: 'A propriedade loading'
description: Nuxt.js usa seu próprio componente para mostrar uma barra de progresso entre as rotas. Você pode personalizá-lo, desativá-lo ou criar seu próprio componente.
menu: loading
category: configuration-glossary
position: 15
---

- Tipo: `Boolean` ou `Object` ou `String`

> Nuxt.js usa seu próprio componente para mostrar uma barra de progresso entre as rotas. Você pode personalizá-lo, desativá-lo ou criar seu próprio componente.

```javascript
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

## Desativar a barra de progresso

- Tipo: `Boolean`

```js{}[nuxt.config.js]
export default {
  loading: false
}
```

## Personalizando a barra de progresso

- Tipo: `Object`

```js
export default {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

Lista de propriedades para personalizar a barra de progresso.

| Propriedade   | Tipo    | Padrão  | Descrição                                                                                                                                                 |     |
| ------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `color`       | String  | `black` | Cor CSS da barra de progresso                                                                                                                             |     |
| `failedColor` | String  | `red`   | Cor CSS da barra de progresso quando um erro é acrescentado durante a renderização da rota (se os dados ou busca enviarem de volta um erro, por exemplo). |     |
| `height`      | String  | `2px`   | Altura da barra de progresso (usada na propriedade de estilo da barra de progresso)                                                                       |     |
| `throttle`    | Number  | `200`   | Em ms, aguarde o tempo especificado antes de exibir a barra de progresso. Útil para evitar que a barra pisque.                                            |     |
| `duration`    | Number  | `5000`  | Em ms, a duração máxima da barra de progresso, o Nuxt.js assume que a rota será renderizada antes de 5 segundos.                                          |     |
| `continuous`  | Boolean | `false` | Continue animando a barra de progresso quando o carregamento demorar mais do que a `duração`.                                                             |     |
| `css`         | Boolean | `true`  | Defina como false para remover estilos de barra de progresso padrão (e adicionar seus próprios).                                                          |     |
| `rtl`         | Boolean | `false` | Defina a direção da barra de progresso da direita para a esquerda.                                                                                        |     |

## Usando um componente de carregamento personalizado

- Tipo: `String`

**Seu componente deve expor alguns destes métodos:**

| Método          | Obrigatoriedade | Descrição                                                                                      |
| --------------- | --------------- | ---------------------------------------------------------------------------------------------- |
| `start()`       | Obrigatório     | Chamado quando uma rota é alterada, é onde você exibe seu componente.                          |
| `finish()`      | Obrigatório     | Chamado quando uma rota é carregada (e dados buscados), é aqui que você oculta seu componente. |
| `fail(error)`   | _Opcional_      | Chamado quando uma rota não pôde ser carregada (falha ao buscar dados, por exemplo).           |
| `increase(num)` | _Opcional_      | Chamado durante o carregamento do componente de rota, `num` é um número inteiro < 100.         |

```html{}[components/loading.vue]
<template lang="html">
  <div class="loading-page" v-if="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
  }
</style>
```

```js{}[nuxt.config.js]
export default {
  loading: '~/components/loading.vue'
}
```
