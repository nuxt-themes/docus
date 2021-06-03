---
title: Configuração
description: Por padrão, o Nuxt.js é configurado para cobrir a maioria dos casos de uso. Esta configuração padrão pode ser substituída pelo arquivo nuxt.config.js.
position: 7
category: features
csb_link_host_port: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/07_configuration_host_port?fontsize=14&hidenavigation=1&theme=dark
csb_link_pre-processors: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/07_configuration_pre-processors?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Você pode usar o axios-module no nuxt.config.js?
    answers:
      - true
      - false
    correctAnswer: false
  - question: Qual é o host padrão do servidor de desenvolvimento do Nuxt.js?
    answers:
      - localhost
      - 3000
      - '0'
    correctAnswer: localhost
  - question: Qual atributo você usa em sua tag de estilo para usar SCSS?
    answers:
      - lang="scss"
      - language="scss"
      - style="scss"
    correctAnswer: lang="scss"
  - question: Qual é a porta padrão do servidor de desenvolvimento do Nuxt.js?
    answers:
      - 8000
      - 3000
      - localhost
    correctAnswer: 3000
  - question: No nuxt.config.js, qual propriedade você usa para adicionar arquivos CSS globais?
    answers:
      - styles
      - css
      - globalCss
    correctAnswer: css
  - question: Você pode usar JSX em sua aplicação Nuxt.js?
    answers:
      - True
      - False
    correctAnswer: True
  - question: No nuxt.config.js, qual propriedade você usa para adicionar arquivos CSS globais?
    answers:
      - styles
      - css
      - global-css
    correctAnswer: css
  - question: No nuxt.config.js, qual propriedade você usa para estender a configuração do webpack?
    answers:
      - webpack.extend
      - build.extend
      - extend.build
    correctAnswer: build.extend
  - question: Qual é o nome do arquivo para ignorar arquivos em seu aplicativo Nuxt.js?
    answers:
      - .ignore
      - .nuxtignore
      - .ignorenuxt
    correctAnswer: .nuxtignore
  - question: Se você quiser ignorar o arquivo About na sua aplicação Nuxt.js, que prefixo você usaria?
    answers:
      - _about.vue
      - -about.vue
      - __about.vue
    correctAnswer: -about.vue
---

Por padrão, o Nuxt.js é configurado para cobrir a maioria dos casos de uso. Esta configuração padrão pode ser substituída pelo arquivo nuxt.config.js.

## A propriedade css

O Nuxt.js permite estabelecer os arquivos/módulos/bibliotecas CSS que você deseja definir globalmente (incluídos em todas as páginas).

<base-alert>

Caso queira usar `sass`, certifique-se de ter instalado os pacotes `sass` e `sass-loader`.

</base-alert>

Em `nuxt.config.js`, adicione os recursos de CSS:

```js{}[nuxt.config.js]
export default {
  css: [
    // Carregue um módulo Nodej.s diretamente (aqui é arquivo Sass)
    'bulma',
    // Arquivo CSS no projeto
    '~/assets/css/main.css',
    // Arquivo SCSS no projeto
    '~/assets/css/main.scss'
  ]
}
```

<base-alert>

O Nuxt.js adivinhará automaticamente o tipo de arquivo por sua extensão e usará o loader de pré-processador apropriado para webpack. Você ainda precisará instalar o loader necessário se precisar usá-los.

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link_pre-processors"></code-sandbox>
</app-modal>

## Pré-processadores

Graças ao [Vue Loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html), você pode usar qualquer tipo de pré-processador para o seu `<template>` ou `<style>`: use o atributo `lang`.

Exemplo do nosso `pages/index.vue` usando [Pug](https://github.com/pugjs/pug) e [Sass](http://sass-lang.com/):

```html{}[pages/index.vue]
<template lang="pug"> h1.red Hello {{ name }}! </template>

<style lang="scss">
  .red {
    color: red;
  }
</style>
```

Para usar esses pré-processadores, precisamos instalar seus loaders de webpack:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D pug pug-plain-loader
yarn add -D sass sass-loader@10 fibers
```

  </code-block>
  <code-block label="npm">

```bash
npm install --save-dev pug pug-plain-loader
npm install --save-dev sass sass-loader@10 fibers
```

  </code-block>
</code-group>

## JSX

Nuxt.js usa [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app), que se baseia na configuração padrão [@vue/babel-preset-app](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app) para o babel, para que você possa utilizar o JSX nos seus componentes.

Você também pode usar JSX no método `render` de seus componentes:

```js
<script>
export default {
  data () {
    return { name: 'World' }
  },
  render (h) {
    return <h1 class="red">{this.name}</h1>
  }
}
</script>
```

Criar um atalho para `createElement` chamado `h` é uma convenção comum que você verá no ecossistema Vue, mas é opcional para JSX, uma vez que [injeta automaticamente](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection) `const h = this.$createElement` em qualquer método e getter (não funções ou arrow functions) declarado na sintaxe ES2015 que tem JSX para que você possa descartar o parâmetro (h).

Você pode aprender mais sobre como usá-lo na [seção de JSX](https://vuejs.org/v2/guide/render-function.html#JSX) da documentação do Vue.js.

## Ignorando arquivos

### .nuxtignore

Você pode usar um arquivo `.nuxtignore` para permitir que o Nuxt.js ignore os arquivos de `layout`, `pages`, `store` e `middleware` no diretório raiz do seu projeto (`rootDir`) durante a fase de build. O arquivo `.nuxtignore` está sujeito às mesmas especificações dos arquivos `.gitignore` e `.eslintignore`, em que cada linha é um padrão glob indicando quais arquivos devem ser ignorados.

```markdown{}[.nuxtignore]
# ignorar layout foo.vue

layouts/foo.vue

# ignorar arquivos de layout cujo nome terminam em -ignore.vue

layouts/\*-ignore.vue

# ignorar pages bar.vue

pages/bar.vue

# ignorar pages dentro do diretório ignore

pages/ignore/\*.vue

# ignorar store baz.js

store/baz.js

# ignorar arquivos store que sejam _.test._

store/ignore/_.test._

# ignorar arquivos de middleware dentro do diretório foo, exceto foo/bar.js

middleware/foo/\*.js !middleware/foo/bar.js
```

### A propriede ignorePrefix

Qualquer arquivo em pages/, layout/, middleware/ ou store/ será ignorado durante o build se o nome do arquivo começar com o prefixo especificado por ignorePrefix.

Por padrão, todos os arquivos que começam com `-` serão ignorados, como `store/-foo.js` e `pages/-bar.vue`. Isso permite a co-localização de testes, utilitários e componentes com seus invocadores sem que sejam convertidos em rotas, lojas, etc.

### A propriedade ignore

Mais personalizável do que ignorePrefix: todos os arquivos correspondentes aos padrões glob especificados em ignore serão ignorados durante o build.

```js{}[nuxt.config.js]
export default {
  ignore: 'pages/bar.vue'
}
```

### ignoreOptions

`nuxtignore` está usando `node-ignore` pode debaixo dos panos, `ignoreOptions` pode ser configurado como `options` de `node-ignore`.

```js{}[nuxt.config.js]
export default {
  ignoreOptions: {
    ignorecase: false
  }
}
```

## Estender as configurações do webpack

Você pode estender a configuração do webpack do nuxt através da opção `extend` em seu `nuxt.config.js`. A opção `extend` da propriedade `build` é um método que aceita dois argumentos. O primeiro argumento é o objeto `config` exportado da configuração do webpack do nuxt. O segundo parâmetro é o objeto de contexto com as seguintes propriedades booleanas: `{ isDev, isClient, isServer, loaders }`.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isDev, isClient }) {
      // ..
      config.module.rules.push({
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      })
      // Define o modo do webpack para desenvolvimento se `isDev` for verdadeiro.
      if (isDev) {
        config.mode = 'development'
      }
    }
  }
}
```

O método `extend` é chamado duas vezes - uma para o pacote do cliente e outra para o pacote do servidor.

### Personalize a configuração de chunks

Você pode querer ajustar a [configuração de otimização](/docs/2.x/configuration-glossary/configuration-build#optimization) um pouco, evitando reescrever o objeto padrão.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.optimization.splitChunks.maxSize = 200000
      }
    }
  }
}
```

### Execute ESLint a cada build do webpack no ambiente dev

Para estar ciente dos erros de estilo de código, você pode querer executar [ESLint](https://github.com/webpack-contrib/eslint-loader) em cada build no ambiente de desenvolvimento.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
```

## Editar host e port

Por padrão, o host do servidor de desenvolvimento do Nuxt.js é `localhost`, que só pode ser acessado de dentro da sua máquina. Para visualizar sua aplicação em outro dispositivo, você precisa modificar o host. Você pode modificá-lo em seu arquivo nuxt.config.js.

O host `'0.0.0.0'` é designado para dizer ao Nuxt.js para resolver um endereço de host, que é acessível para conexões _fora_ da máquina host (por exemplo, LAN). Se o host recebe o valor da string `'0'` (não 0, que é falso) ou `'0.0.0.0'`, seu endereço IP local será atribuído ao seu aplicativo Nuxt.js.

```js{}[nuxt.config.js]
export default {
  server: {
    host: '0' // padrão: localhost
  }
}
```

Você também pode alterar o número da porta da porta padrão 3000.

```js{}[nuxt.config.js]
export default {
  server: {
    port: 8000 // default: 3000
  }
}
```

<base-alert type="info">

Se a porta for atribuída ao valor da string `'0'` (não 0, o que é falso), um número de porta aleatório será atribuído a sua aplicação Nuxt.js.

</base-alert>

Embora você possa modificar isso no arquivo nuxt.config.js, não é aconselhável, pois pode causar problemas ao hospedar seu site. É muito melhor modificar o host e a porta diretamente no comando dev.

```bash
HOST=0 PORT=8000 npm run dev
```

ou crie um script em seu package.json

```json
"scripts": {
  "dev:host": "nuxt --hostname '0' --port 8000"
}
```

<app-modal>
  <code-sandbox  :src="csb_link_host_port"></code-sandbox>
</app-modal>

## Configuração Assíncrona

Embora seja melhor usar a configuração normal `export default {}` você pode ter uma configuração assíncrona exportando uma função assíncrona que retorna o objeto de configuração.

```js{}[nuxt.config.js]
import axios from 'axios'

export default async () => {
  const data = await axios.get('https://api.nuxtjs.dev/posts')
  return {
    head: {
      title: data.title
      //... resto das configurações
    }
  }
}
```

<base-alert>

O módulo do axios não pode ser usado em `nuxt.config.js`. Você precisará importar axios e configurá-lo novamente.

</base-alert>

## Configurações adicionais

O `nuxt.config.js` tem muito mais opções de personalização e configuração! Confira todas as propriedades no glossário.

<quiz :questions="questions"></quiz>
