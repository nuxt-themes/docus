---
title: .nuxt
description: O diretório `.nuxt` é conhecido como *diretório de build*. Ele é gerado dinamicamente e oculto por padrão. Dentro do diretório você pode encontrar arquivos gerados automaticamente ao rodar o `nuxt dev` ou seus artefatos de build ao rodar `nuxt build`.
position: 1
category: directory-structure
questions:
  - question: Em quais comandos o diretório .nuxt é gerado?
    answers:
      - nuxt start
      - nuxt generate
      - nuxt build ou nuxt dev
    correctAnswer: nuxt build ou nuxt dev
  - pergunta: qual propriedade você usa para renomear o diretório nuxt?
    answers:
      - dir
      - build
      - buildDir
    correctAnswer: buildDir
  - pergunta: Em qual arquivo você pode encontrar as rotas geradas?
    answers:
      - pages.js
      - router.js
      - views.js
    correctAnswer: router.js
  - pergunta: O que você pode encontrar no diretório components?
    answers:
      - componentes nuxt
      - componentes personalizados
      - componentes globais
    correctAnswer: componentes nuxt
  - pergunta: O diretório .nuxt é o diretório que você precisa fazer o upload ao fazer deploy de sites estáticos.
    answers:
      - true
      - false
    correctAnswer: false
---

O diretório `.nuxt` é conhecido como _diretório de build_. Ele é gerado dinamicamente e oculto por padrão. Dentro do diretório você pode encontrar arquivos gerados automaticamente ao rodar o `nuxt dev` ou seus artefatos de build ao rodar `nuxt build`. Modificar esses arquivos é ótimo para depuração (debugging), mas lembre-se de que eles são arquivos gerados e, uma vez que você execute o comando `dev` ou `build` novamente, tudo o que foi salvo aqui será regenerado.

<base-alert>

O diretório `.nuxt` não deve ser commitado ao seu sistema de controle de versão e deve ser ignorado por meio do seu `.gitignore`, pois será gerado automaticamente ao executar `nuxt dev` ou `nuxt build`.

</base-alert>

### The buildDir Property

By default, many tools assume that `.nuxt` is a hidden directory, because its name starts with a dot. You can use the buildDir option to prevent that. If you do change the name remember to add the new name to your `.gitignore` file.

```js{}[nuxt.config.js]
export default {
  buildDir: 'nuxt-dist'
}
```

### Dentro do diretório .nuxt:

- O arquivo router.js é o arquivo do router gerado que o Nuxt.js gera para você quando você coloca arquivos `.vue` dentro do diretório pages. Você pode usar este arquivo para depuração quando quiser verificar quais rotas são geradas para o vue-router e descobrir o nome de uma rota específica.
- O router.scrollBehavior.js que é o seu Router ScrollBehavior
- o diretório Componentes contém todos os seus componentes Nuxt, como NuxtChild e NuxtLink. Ele também contém o nuxt-build-indicator, que é a página que vemos quando seu aplicativo está sendo compilado, e nuxt-loading, que é o componente de loading que é visto quando estamos aguardando o carregamento da página. Você também encontrará a página nuxt-error aqui, que contém a página de erro padrão do Nuxt.
- O diretório mixins contém os arquivos necessários para o método `$fetch` do Nuxt.
- O diretório de views contém o app template e a página de erro do servidor.
- O app.js é o arquivo principal do seu aplicativo.
- O arquivo client.js é o arquivo do cliente necessário para tudo o que acontece no lado do cliente.
- O arquivo empty é deixado vazio intencionalmente para aliases noop
- O arquivo index.js inicializa seu aplicativo.
- O loading.html é o arquivo que é usado quando a página está carregando.
- O arquivo de middleware é onde fica o seu middleware
- O arquivo server.js é todo o código que é executado no servidor
- Os utilities contêm os utilitários de que o Nuxt precisa para funcionar.

### Deploying

O diretório `.nuxt` faz parte dos arquivos necessários para implantar sua aplicação SSR. Não é necessário para implantar sua aplicação Nuxt.js estática, porque usamos a pasta `dist` para isso.

<quiz :questions="questions"></quiz>
