---
title: Loading
description: Pronto para uso, o Nuxt.js oferece seu próprio componente de barra de progresso de carregamento que é mostrado entre as rotas. Você pode personalizá-lo, desativá-lo ou até mesmo criar seu próprio componente de carregamento.
position: 8
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/08_loading?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Para que a barra de progresso de carregamento do Nuxt.js funcione, o que você precisa fazer?
    answers:
      - Nada, simplesmente funciona
      - defina o loading como true no arquivo nuxt.config.js
      - criar um componente de carregamento
    correctAnswer: Nada, simplesmente funciona
  - question: Onde você pode modificar os estilos da barra de progresso padrão?
    answers:
      - componente de layout
      - componente da página
      - nuxt.config.js
    correctAnswer: componente de layout
  - question: Em qual propriedade você define os estilos da barra de progresso no arquivo nuxt.config.js?
    answers:
      - progress
      - loading
      - loadingBar
    correctAnswer: loading
  - question: O que você adiciona no arquivo nuxt.config.js para desativar o loading?
    answers:
      - 'loadingBar: false'
      - "loading: 'none'"
      - 'loading: false'
    correctAnswer: 'loading: false'
  - question: Você pode desativar o loading em páginas específicas?
    answers:
      - true
      - false
    correctAnswer: true
  - question: O que você usa para iniciar programaticamente a barra de loading?
    answers:
      - $nuxt.loading.start()
      - $nuxt.loading()
      - $loading.start()
    correctAnswer: $nuxt.loading.start()
  - question: Qual propriedade você usa para tornar sua barra de progresso contínua para quando o loading demorar mais do que a duração?
    answers:
      - "duration: 'continuous'"
      - "loading: 'continuous'"
      - 'continuous: true'
    correctAnswer: 'continuous: true'
  - question: Quais são os dois métodos necessários ao criar um componente de loading personalizado?
    answers:
      - start() e fail()
      - start() e finish()
      - loading() e finish()
    correctAnswer: start() e finish()
  - question: Depois de criar seu novo componente loading.vue, como você o usa?
    answers:
      - importe-o para a página de layouts
      - adicione-o no nuxt.config.js, na propriedade de loading
      - adicione-o ao nuxt.config.js, na propriedade plugins
    correctAnswer: adicione-o no nuxt.config.js, na propriedade de loading
  - question: Para adicionar um spinner circular quando o Nuxt.js está no modo SPA, o que você adiciona à propriedade de loading?
    answers:
      - 'circle: true'
      - 'spinner: circle'
      - 'name: circle'
    correctAnswer: 'name: circle'
---

Sem precisar instalar nada, o Nuxt.js oferece seu próprio componente de barra de progresso de carregamento que é mostrado entre as rotas. Você pode personalizá-lo, desativá-lo ou até mesmo criar seu próprio componente de carregamento.

## Personalizando a Barra de Progresso

Entre outras propriedades, a cor, tamanho, duração e direção da barra de progresso podem ser personalizados para atender às necessidades de seu aplicativo. Isso é feito atualizando a propriedade `loading` do `nuxt.config.js` com as propriedades correspondentes.

Por exemplo, para definir uma barra de progresso azul com uma altura de 5px, atualizamos o `nuxt.config.js` para o seguinte:

```js
export default {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

Lista de propriedades para personalizar a barra de progresso.

| Propriedade | Tipo    | Padrão  | Descrição                                                                                                                                                 |     |
| ----------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| color       | String  | 'black' | Cor CSS da barra de progresso                                                                                                                             |     |
| failedColor | String  | 'red'   | Cor CSS da barra de progresso quando um erro é acrescentado durante a renderização da rota (se os dados ou busca enviarem de volta um erro, por exemplo). |     |
| height      | String  | '2px'   | Altura da barra de progresso (usada na propriedade de estilo da barra de progresso)                                                                       |     |
| throttle    | Number  | 200     | Em ms, aguarde o tempo especificado antes de exibir a barra de progresso. Útil para evitar que a barra pisque.                                            |     |
| duration    | Number  | 5000    | Em ms, a duração máxima da barra de progresso, o Nuxt.js assume que a rota será renderizada antes de 5 segundos.                                          |     |
| continuous  | Boolean | false   | Continue animando a barra de progresso quando o carregamento demorar mais do que a duração.                                                               |     |
| css         | Boolean | true    | Defina como false para remover estilos de barra de progresso padrão (e adicionar seus próprios).                                                          |     |
| rtl         | Boolean | false   | Defina a direção da barra de progresso da direita para a esquerda.                                                                                        |     |

## Desativar a Barra de Progresso

Se você não quiser exibir a barra de progresso entre as rotas, adicione `loading: false` em seu arquivo `nuxt.config.js`:

```js{}[nuxt.config.js]
export default {
  loading: false
}
```

A propriedade loading oferece a opção de desativar a barra de progresso de loading padrão em uma página específica.

```html{}[pages/index.vue]
<template>
  <h1>Minha página</h1>
</template>

<script>
  export default {
    loading: false
  }
</script>
```

## Iniciando programaticamente a Barra de Loading

A barra de loading também pode ser iniciada programaticamente em seus componentes chamando `this.$nuxt.$loading.start()` para iniciar a barra de loading e `this.$nuxt.$loading.finish()` para finalizá-la.

Durante o processo de montagem do componente de página, a propriedade `$loading` pode não estar imediatamente disponível para acesso. Para contornar isso, se você deseja iniciar o carregador no método `mounted`, certifique-se de envolver as chamadas do método `$loading` dentro de `this.$nextTick` como mostrado abaixo.

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

## Internals da Barra de Progresso

Infelizmente, não é possível para o componente de loading saber com antecedência quanto tempo levará para carregar uma nova página. Portanto, não é possível animar com precisão a barra de progresso em 100% do tempo de carregamento.

O componente de loading do Nuxt resolve isso parcialmente, permitindo que você defina a `duration`, que deve ser definida como uma estimativa de quanto tempo o processo de loading levará. A menos que você use um componente de loading personalizado, a barra de progresso sempre se moverá de 0% a 100% no tempo de `duration` (independentemente da progressão real). Quando o loading demora mais do que o tempo de `duration`, a barra de progresso permanecerá em 100% até que o loading termine.

Você pode alterar o comportamento padrão definindo `continuous` como true e, depois de atingir 100%, a barra de progresso começará a diminuir para 0% novamente no tempo de `duração`. Quando o carregamento ainda não estiver concluído após atingir 0%, começará a crescer de 0% a 100% novamente, isso se repete até que o carregamento termine.

```js
export default {
  loading: {
    continuous: true
  }
}
```

_Exemplo de uma barra de progresso contínua:_

![https://nuxtjs.org/api-continuous-loading.gif](https://nuxtjs.org/api-continuous-loading.gif)

## Usando um componente de Loading personalizado

Você também pode criar seu próprio componente que o Nuxt.js chamará, em vez do componente padrão da barra de progresso de loading. Para fazer isso, você precisa fornecer um caminho para o seu componente na opção `loading`. Então, seu componente será chamado diretamente pelo Nuxt.js.

Seu componente deve expor alguns destes métodos:

| Método        | Obrigatoriedade | Descrição                                                                                      |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------- |
| start()       | Obrigatório     | Chamado quando uma rota é alterada, é onde você exibe seu componente.                          |
| finish()      | Obrigatório     | Chamado quando uma rota é carregada (e dados buscados), é aqui que você oculta seu componente. |
| fail(error)   | Opcional        | Chamado quando uma rota não pôde ser carregada (falha ao buscar dados, por exemplo).           |
| increase(num) | Opcional        | Chamado durante o carregamento do componente de rota, num é um número inteiro < 100.           |

Você pode criar seu componente personalizado em `components/LoadingBar.vue`:

```html{}[components/LoadingBar.vue]
<template>
  <div v-if="loading" class="loading-page">
    <p>Carregando...</p>
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

Então, você atualiza seu `nuxt.config.js` para dizer ao Nuxt.js para usar o seu componente:

```js{}[nuxt.config.js]
export default {
  loading: '~/components/LoadingBar.vue'
}
```

## A propriedade do Indicador de Loading

Ao executar o Nuxt.js no modo SPA, não há conteúdo do lado do servidor no primeiro carregamento da página. Portanto, em vez de mostrar uma página em branco enquanto a página carrega, o Nuxt.js oferece um botão giratório que você pode personalizar para adicionar suas próprias cores ou background e até mesmo alterar o indicador.

```js{}[nuxt.config.js]
export default {
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  }
}
```

## Indicadores integrados

Esses indicadores são importados do incrível projeto [Spinkit](http://tobiasahlin.com/spinkit). Você pode verificar sua página de demonstração para visualizar os spinners. Para usar um desses spinners, tudo o que você precisa fazer é adicionar seu nome à propriedade name. Não há necessidade de importar ou instalar nada. Aqui está uma lista de indicadores integrados que você pode usar.

- circle
- cube-grid
- fading-circle
- folding-cube
- chasing-dots
- nuxt
- pulse
- rectangle-bounce
- rotating-plane
- three-bounce
- wandering-cubes

Os indicadores integrados suportam as opções `color` e `background`.

## Indicadores personalizados

Se você precisa de seu próprio indicador especial, pode passar uma string, a propriedade Name ou também pode ser um caminho para um template html do código-fonte do indicador! Todas as opções são passadas para o template também.

O [código-fonte](https://github.com/nuxt/nuxt.js/tree/dev/packages/vue-app/template/views/loading) integrado do indicador do Nuxt também está disponível se você precisar de uma base!

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
