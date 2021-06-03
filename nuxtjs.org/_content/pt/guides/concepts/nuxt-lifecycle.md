---
title: Ciclo de Vida do Nuxt
description: Não importa qual ferramenta você use, você sempre se sentirá mais confiante ao compreender como a ferramenta funciona por debaixo dos panos. O mesmo se aplica ao Nuxt.js.
position: 5
category: concepts
img: /docs/2.x/nuxt-lifecycle.svg
imgAlt: understanding-nuxt-2-12-lifecycle-hooks
questions:
  - question: Quando o ciclo de vida do Nuxt.js começa?
    answers:
      - Quando a resposta for enviada ao cliente
      - Após o build
      - Ao executar o nuxt dev
    correctAnswer: Após o build
  - question: De quais fatores principais depende o conteúdo do ciclo de vida?
    answers:
      - Qual hora e data temos ao iniciar o servidor
      - Se a renderização do lado do servidor estiver ativada e, se sim, qual tipo é usado
      - Em que tipo de sistema operacional o aplicativo Nuxt.js está sendo executado
    correctAnswer: Se a renderização do lado do servidor estiver ativada e, se sim, qual tipo é usado
  - question: Quando o nuxtServerInit é chamado?
    answers:
      - Do lado do servidor e do do cliente
      - Após a Hidratação do Vue
      - Apenas no lado do servidor
    correctAnswer: Apenas no lado do servidor
  - question: Quais são os três tipos de middleware?
    answers:
      - Global, Layout, Route
      - Global, Layout, Page
      - Global, Group, Route
    correctAnswer: Global, Layout, Route
  - question: Qual etapa só pode acontecer no lado do cliente?
    answers:
      - Hidratação do Vue
      - Execução do middleware
      - Chamando a função fetch
    correctAnswer: Hidratação do Vue
  - question: Qual etapa nunca acontece no lado do cliente?
    answers:
      - Execução do asyncData
      - Execução do serverMiddleware
      - Execução do fetch
    correctAnswer: Execução do serverMiddleware
  - question: Quais métodos Vue são chamados tanto do lado do servidor quanto do cliente?
    answers:
      - mounted e beforeMount
      - beforeDestroy e destroyed
      - created e beforeCreate
    correctAnswer: created e beforeCreate
  - question: Qual etapa não acontece após navegar via <NuxtLink>?
    answers:
      - Chamar o fetch
      - Executar os plugins Nuxt.js do lado do cliente
      - Chamar o beforeCreate
    correctAnswer: Executar os plugins Nuxt.js do lado do cliente
  - question: Qual é a diferença especial entre asyncData e fetch após navegar por <NuxtLink>?
    answers:
      - asyncData é mais rápido do que buscar
      - asyncData é chamado após fetch
      - asyncData bloqueia, enquanto o fetch não bloqueia
    correctAnswer: asyncData bloqueia, enquanto o fetch não bloqueia
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

Não importa qual ferramenta você use, você sempre se sentirá mais confiante ao compreender como a ferramenta funciona por debaixo dos panos. O mesmo se aplica ao Nuxt.js. O objetivo deste capítulo é fornecer uma visão geral, de alto nível, das diferentes partes do framework, sua ordem de execução e como funcionam juntas.

O ciclo de vida do Nuxt.js descreve o que acontece após o build, onde seu aplicativo é empacotado (bundled), fragmentado (chunked) e reduzido (minified). O que acontece após esta fase depende se você tem a renderização no servidor habilitada ou não. E se tiver, dependerá do tipo de renderização no servidor que você escolheu:

SSR dinâmico (`nuxt start`)

ou Geração de Site Estático (`nuxt generate`).

## Ciclo de Vida

### Servidor

Para SSR, essas etapas serão executadas para cada request inicial à sua aplicação

- O servidor inicia (`nuxt start`)

Ao usar a geração de site estático, as etapas do servidor serão executadas apenas no build, porém uma vez para cada página que será gerada

- O processo de geração começa (`nuxt generate`)

- hooks do Nuxt
- serverMiddleware
- Plugins Nuxt do lado do servidor
  - na ordem definida em nuxt.config.js
- nuxtServerInit
  - Action do Vuex que é chamada apenas no lado do servidor para pré-popular a store
  - O primeiro argumento é o **contexto do Vuex**, o segundo argumento é o **contexto do Nuxt.js**
    - Despacha outras ações a partir daqui → apenas os "pontos de entrada" para actions da store subsequentes no lado do servidor
  - só pode ser definido em `store/index.js`
- Middleware
  - Middleware Global
  - Middleware do Layout
  - Middleware do Route
- asyncData
- beforeCreate (método do ciclo de vida do Vue)
- created (método do ciclo de vida do Vue)
- O novo método fetch (de cima para baixo, irmãos = paralelo)
- Serialização de state (`render:routeContext`, hook do Nuxt.js)

- A renderização de HTML acontece (`render:route`, hook do Nuxt.js)

- `render:routeDone` hook executado quando o HTML foi enviado para o navegador

- `generate:before`, hook do Nuxt.js
- Arquivos HTML são gerados
  - **Geração estática total (full)**
    - por exemplo. payloads estáticos são extraídos
  - `generate:page` (HTML editable)
  - `generate:routeCreated` (Route gerado)
- `generate:done` quando todos os arquivos HTML forem gerados

### Cliente

Esta parte do ciclo de vida é totalmente executada no navegador, independentemente do modo Nuxt.js que você escolheu.

- Recebe o HTML
- Carrega os assets (por exemplo, Javascript)
- Hidratação Vue
- Middleware
  - Middleware Global
  - Middleware do Layout
  - Middleware do Route
- asyncData (gera bloqueio)
- Plugins Nuxt do lado do cliente
  - na ordem definida em nuxt.config.js
- beforeCreate (método do ciclo de vida do Vue)
- created (método do ciclo de vida do Vue)
- O novo método fetch (de cima para baixo, irmãos = paralelo) (não gera bloqueio)
- beforeMount (método do ciclo de vida do Vue)
- mounted (método do ciclo de vida do Vue)

### Navegue usando o componente NuxtLink

Da mesma forma que a parte do _cliente_, tudo está acontecendo no navegador, mas apenas ao navegar via `<NuxtLink>`. Além disso, nenhum conteúdo da página é exibido até que todas as tarefas de _bloqueio_ sejam finalizadas.

<base-alert type="info">

Confira o capítulo de componentes para ver mais informações sobre o [`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component)

</base-alert>

- Middleware (gera bloqueio)
  - Middleware Global
  - Middleware do Layout
  - Middleware do Route
- asyncData (gera bloqueio)
- asyncData (gera bloqueio) [ou carregamento total do payload static]
- beforeCreate & created (métodos do ciclo de vida do Vue)
- fetch (não gera bloqueio)
- beforeMount & mounted (métodos do ciclo de vida do Vue)

### O que vem em seguida

<base-alert type="next">

Confira o [livro de Funcionalidades](/docs/2.x/features/rendering-modes)

</base-alert>

<quiz :questions="questions"></quiz>
