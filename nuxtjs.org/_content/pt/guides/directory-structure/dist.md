---
title: dist
description: O diretório `dist`, abreviação de *Distribution*, é gerado dinamicamente ao usar os comandos `nuxt generate` e inclui os arquivos HTML prontos para produção e assets que são necessários para fazer deploy e executar seu aplicativo Nuxt.js gerado estaticamente.
position: 5
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/05_dist?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Com qual comando você gera a pasta dist?
    answers:
      - nuxt build
      - nuxt start
      - nuxt generate
    correctAnswer: nuxt generate
  - question: Esta é a pasta que você precisa para fazer upload à hospedagem de seu site estático
    answers:
      - true
      - false
    correctAnswer: true
  - question: Qual propriedade você usa para alterar o nome da pasta dist?
    answers:
      - dist
      - dir
      - buildDir
    correctAnswer: dir
  - question: Qual propriedade você usa para não ter todas as páginas geradas em uma pasta?
    answers:
      - 'folders: false'
      - 'subFolders: false'
      - 'pages: true'
    correctAnswer: 'subFolders: false'
  - question: Qual é o valor padrão do Nuxt.js para a propriedade de fallback?
    answers:
      - "'200.html'"
      - "'404.html'"
      - 'false'
    correctAnswer: "'200.html'"
  - question: Ao trabalhar com páginas geradas estaticamente, é recomendável usar qual arquivo para as páginas de erro?
    answers:
      - "'200.html'"
      - "'404.html'"
      - false
    correctAnswer: "'404.html'"
  - question: Qual propriedade você pode usar para ignorar certos arquivos para que eles não sejam gerados estaticamente?
    answers:
      - ignore
      - exclude
      - fallback
    correctAnswer: exclude
---

O diretório `dist`, abreviação de _distribution_, é gerado dinamicamente ao usar o comando `nuxt generate` e inclui os arquivos HTML e assets prontos para produção que são necessários para fazer deploy e executar sua aplicação Nuxt.js gerada estaticamente.

### Fazendo Deploy

Este é o diretório que você precisa **fazer upload para hospedagem estática**, pois contém seus arquivos e recursos HTML prontos para produção.

<base-alert>

O diretório `dist` não deve ser submetido ao seu sistema de controle de versão e deve ser ignorado através do seu `.gitignore`, pois será gerado automaticamente toda vez que você executar o `nuxt generate`.

</base-alert>

### A propriedade dir

A pasta dist é nomeada assim por padrão, mas pode ser configurada em seu arquivo nuxt.config.

```js{}[nuxt.config.js]
generate: {
  dir: 'meu-site'
}
```

<base-alert>

Se você mudar sua pasta dist, você precisará adicioná-la ao seu controle de versão para que o git a ignore.

</base-alert>

### A propriedade subFolders

O Nuxt.js coloca todas as suas páginas geradas dentro de uma pasta por padrão, no entanto, você pode alterar isso se desejar, modificando o nuxt.config e alterando as subFolders para falso.

```js{}[nuxt.config.js]
generate: {
  subFolders: false
}
```

### A propriedade fallback

Ao fazer o deploy do seu site, você precisará se certificar de que o caminho HTML substituto (fallback) está definido corretamente. Deve ser definido como uma página de erro para que as rotas desconhecidas sejam processadas pelo Nuxt. Se não estiver definido, o Nuxt.js usará o valor padrão que é 200.html.

Ao executar uma aplicação de página única, faz mais sentido usar 200.html, pois é o único arquivo necessário, já que nenhuma outra rota é gerada.

Ao trabalhar com páginas geradas estaticamente, é recomendável usar um 404.html para páginas de erro.

<base-alert>

Dependendo de onde você está hospedando seu site, você deve usar 200.html ou 404.html. Verifique com seu provedor de hospedagem. Netlify, por exemplo, usa 404.html.

</base-alert>

```js{}[nuxt.config.js]
export default {
  generate: {
    fallback: '404.html'
  }
}
```

### A propriedade exclude

Você pode impedir que páginas sejam geradas usando a propriedade generate exclude. Em vez de ser gerada como uma página estática, ela voltará a ser uma página de aplicação de página única e só será renderizada no lado do cliente.

```js{}[nuxt.config.js]
generate: {
  exclude: [/admin/]
}
```

<base-alert type="info">

Você também pode usar uma expressão regex aqui para excluir páginas que começam ou terminam com uma palavra específica

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
