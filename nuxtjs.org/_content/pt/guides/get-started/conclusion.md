---
title: Conclusão
description: Parabéns, agora você criou seu primeiro aplicativo Nuxt.js e agora pode se considerar um Nuxter. Mas há muito mais para aprender e muito mais que você pode fazer com o Nuxt.js. Aqui estão algumas recomendações.
position: 4
category: get-started
questions:
  - question: Qual é o nome do diretório que você precisa ter para que o Nuxt.js funcione?
    answers:
      - nuxt
      - pages
      - index
    correctAnswer: pages
  - question: Qual é o nome do arquivo de identificação do seu projeto?
    answers:
      - package.vue
      - package.json
      - package.js
    correctAnswer: package.json
  - question: Qual é o comando que você digita no terminal para iniciar seu projeto Nuxt.js?
    answers:
      - npm dev
      - npm run dev
      - nuxt dev
    correctAnswer: npm run dev
  - question: Qual é o endereço no navegador onde você pode ver sua página no modo de desenvolvimento?
    answers:
      - http://localhost:3000/
      - http://localhost:3000/project-name:3000
      - http://localhost:3000/nuxt:3000/
    correctAnswer: http://localhost:3000/
  - question: Onde você coloca sua configuração?
    answers:
      - nuxt.config.json
      - config.js
      - nuxt.config.js
    correctAnswer: nuxt.config.js
  - question: Qual diretório não é adequado para arquivos `.vue`?
    answers:
      - pages
      - static
      - components
    correctAnswer: static
  - question: Em qual diretório você coloca seus estilos?
    answers:
      - styles
      - components
      - assets
    correctAnswer: assets
  - question: Em qual diretório colocamos o robots.txt ou o favicon?
    answers:
      - assets
      - components
      - static
    correctAnswer: static
  - question: Qual componente usamos para navegar entre as páginas?
    answers:
      - '<Nuxt>'
      - '<RouterLink>'
      - '<NuxtLink>'
    correctAnswer: '<NuxtLink>'
  - question: '`<NuxtLink>` é usado para links internos que pertencem a aplicação Nuxt.js?'
    answers:
      - True
      - False
    correctAnswer: True
---

Parabéns, agora você criou seu primeiro aplicativo Nuxt.js e agora pode se considerar um Nuxter, mas há muito mais para aprender e muito mais que você pode fazer com o Nuxt.js. Aqui estão algumas recomendações.

<base-alert type="next">

Check out the [livro de Conceitos](../concepts/views)

</base-alert>

<base-alert type="next">

Working with [asyncData](/docs/2.x/features/data-fetching#async-data)

</base-alert>

<base-alert type="next">

Escolher entre diferentes [modos de Renderização](/docs/2.x/features/rendering-modes)

</base-alert>

<base-alert type="star">

Você gostou do Nuxt.js até agora? Não se esqueça de [dar uma estrela ao nosso projeto](https://github.com/nuxt/nuxt.js) no GitHub

</base-alert>

<quiz :questions="questions"></quiz>
