---
title: Instalação
description: Aqui você encontrará informações sobre como configurar e executar um projeto Nuxt.js em 4 etapas.
position: 1
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/01_installation?fontsize=14&hidenavigation=1&theme=dark
---

## Pré-requisitos

Aqui você encontrará informações sobre como configurar e executar um projeto Nuxt.js em 4 etapas.

<base-alert type="info">

Outra forma de começar a usar o Nuxt.js é utilizar o [CodeSandbox](https://template.nuxtjs.org), que é uma ótima maneira de brincar com o Nuxt.js de forma rápida e/ou compartilhar seu código com outras pessoas.

</base-alert>

### Node

[node](https://nodejs.org/en/download/) - versão v8.9.0+

_Recomendamos que você tenha a versão mais recente instalada._

### Editor de Texto

Use qual você quiser, mas recomendamos [VSCode](https://code.visualstudio.com/).

### Terminal

Use qual você quiser, mas recomendamos o uso do [terminal integrado](https://code.visualstudio.com/docs/editor/integrated-terminal) do VSCode.

## Começando do zero

Criar um projeto Nuxt.js do zero requer apenas um arquivo e um diretório.

Neste exemplo específico, usaremos o terminal para criar os diretórios e arquivos, mas fique à vontade para criá-los usando o editor de sua escolha.

### Configure seu projeto

Para começar, crie um diretório vazio com o nome do seu projeto e navegue até ele:

```bash
mkdir <nome-do-projeto>
cd <nome-do-projeto>
```

_Substitua `<nome-do-projeto>` com o nome do seu projeto._

Em seguida, crie um arquivo chamado `package.json`:

```bash
touch package.json
```

Abra o arquivo package.json em seu editor de código favorito e preencha-o com este conteúdo JSON:

```json{}[package.json]
{
  "name": "minha-aplicação",
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "start": "nuxt start"
  }
}
```

`scripts` define os comandos do Nuxt.js que serão iniciados com o comando `npm run <command>`.

#### **O que é um arquivo package.json?**

O `package.json` é como um cartão de identificação do seu projeto. Se você não sabe o que é o arquivo `package.json`, recomendamos que você dê uma lida rápida na [documentação do npm](https://docs.npmjs.com/creating-a-package-json-file).

### Instale nuxt

Uma vez criado o arquivo `package.json`, adicione `nuxt` ao seu projeto utilizando `npm` ou `yarn`, como mostra a seguir:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add nuxt
```

  </code-block>
  <code-block label="npm">

```bash
npm install nuxt
```

  </code-block>
</code-group>

Esse comando adicionará o `nuxt` como uma dependência ao seu projeto e irá adicioná-lo automáticamente ao seu `package.json`. O diretório `node_modules` também será criado, no qual todos os seus pacotes instalados e suas dependências são armazenados.

<base-alert type="info">

Um arquivo `yarn.lock` ou `package-lock.json` também será criado, o que garante uma instalação consistente e dependências compatíveis dos pacotes instalados em seu projeto.

</base-alert>

### Crie sua primeira página

Nuxt.js transforma cada arquivo `*.vue` dentro do diretório `pages` como uma rota na aplicação.

Crie o diretório `pages` em seu projeto:

```bash
mkdir pages
```

Em seguida, crie um arquivo `index.vue` dentro do diretório `pages`:

```bash
touch pages/index.vue
```

É importante que esta página seja chamada `index.vue`, pois esta será a página padrão que o Nuxt mostra quando a aplicação inicia. É a página inicial e deve ser chamada de index.

Abra o arquivo `index.vue` em seu editor e adicione o seguinte conteúdo:

```html{}[pages/index.vue]
<template>
  <h1>Olá, mundo!</h1>
</template>
```

### Inicie o projeto

Execute seu projeto digitando um dos seguintes comandos em seu terminal:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn dev
```

  </code-block>
  <code-block label="npm">

```bash
npm run dev
```

  </code-block>
</code-group>

<base-alert type="info">

Usamos o comando dev para executar nossa aplicação no modo de desenvolvimento.

</base-alert>

A aplicação agora está sendo executada em **[http://localhost:3000](http://localhost:3000/).**

Abra-o em seu navegador clicando no link em seu terminal e você deverá ver o texto "Hello World" que copiamos na etapa anterior.

<base-alert type="info">

Ao iniciar o Nuxt.js no modo de desenvolvimento, ele ouvirá as alterações de arquivos na maioria dos diretórios, portanto, não há necessidade de reiniciar a aplicação quando, por exemplo, adicionarmos novas páginas.

</base-alert>

<base-alert type="warning">

Quando você executa o comando dev, ele cria uma pasta .nuxt. Esta pasta deve ser ignorada no controle de versão. Você pode ignorar arquivos criando um arquivo .gitignore a nível de raiz e adicionando o .nuxt.

</base-alert>

### Etapa bônus

Crie uma página chamada `fun.vue` no diretório `pages`.

Adicione um `<template></template>` e inclua um título com uma frase engraçada dentro.

Em seguida, vá para o seu navegador e veja sua nova página em **[http://localhost:3000/fun](http://localhost:3000/fun).**

<base-alert type="info">

Crie um diretório com o nome `more-fun` e coloque um arquivo `index.vue` nele. Isso dará o mesmo resultado que criar um arquivo `more-fun.vue`.

</base-alert>

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

## Utilizando o create-nuxt-app

Para iniciar rapidamente, você pode utilizar o [create-nuxt-app](https://github.com/nuxt/create-nuxt-app).

Certifique-se de ter o npx instalado (npx é fornecido por padrão desde o npm 5.2.0) ou npm v6.1 ou yarn.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn create nuxt-app <nome-do-projeto>
```

  </code-block>
  <code-block label="npx">

```bash
npx create-nuxt-app <nome-do-projeto>
```

  </code-block>
    <code-block label="npm">

```bash
npm init nuxt-app <nome-do-projeto>
```

  </code-block>

</code-group>

Ele fará algumas perguntas (nome, opções do Nuxt, framework UI, TypeScript, linter, framework de testes, etc.), quando respondidas, instalará todas as dependências. A próxima etapa é navegar até a pasta do projeto e iniciá-lo:

<code-group>
  <code-block label="Yarn" active>

```bash
cd <nome-do-projeto>
yarn dev
```

  </code-block>
  <code-block label="npm">

```bash
cd <nome-do-projeto>
npm run dev
```

  </code-block>
</code-group>

A aplicação está rodando no [http://localhost:3000](http://localhost:3000) agora. Parabéns!
