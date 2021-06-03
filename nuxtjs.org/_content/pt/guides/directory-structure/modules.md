---
title: modules
description: Nuxt.js fornece um sistema de módulo de alta ordem que torna possível estender o seu núcleo. Módulos são funções chamadas sequencialmente durante a inicialização do Nuxt.js.
position: 9
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/10_modules?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/modules.svg
imgAlt: modules-in-nuxt-js
questions:
  - question: Quando os módulos são chamados?
    answers:
      - antes do Nuxt.js incializar
      - quando o Nuxt.js estiver rodando
      - depois do Nuxt.js incializar
    correctAnswer: antes do Nuxt.js incializar
  - question: Módulos Nuxt.js podem ser incorporados em pacotes npm
    answers:
      - true
      - false
    correctAnswer: true
  - question: Em seu arquivo nuxt.config.js, em que propriedade você adiciona seus módulos?
    answers:
      - nuxtModules
      - modules
      - plugins
    correctAnswer: modules
  - question: A ordem em que você adiciona seus módulos ao arquivo nuxt.config.js é importante
    answers:
      - true
      - false
    correctAnswer: true
  - question: Onde você deve adicionar seus módulos que são necessários apenas durante o desenvolvimento e tempo de construção?
    answers:
      - modules
      - build
      - buildModules
    correctAnswer: buildModules
  - question: O que exatamente são módulos?
    answers:
      - arrays
      - functions
      - plugins
    correctAnswer: functions
  - question: O que usamos quando queremos fazer coisas apenas em condições específicas e não somente durante a inicialização do Nuxt.js?
    answers:
      - plugins
      - hooks
      - asyncData
    correctAnswer: hooks
  - question: Módulos podem
    answers:
      - ser usado apenas como pacotes npm
      - só podem ser incluídos diretamente no código-fonte do seu projeto
      - ambos
    correctAnswer: ambos
  - question: Qual linha é necessária se você estiver publicando seu módulo como um pacote npm?
    answers:
      - module.exports
      - module.exports.meta
      - module.exports.module
    correctAnswer: module.exports.meta
  - question: Você pode dizer ao Nuxt.js para carregar módulos com parâmetros opcionais como opções
    answers:
      - true
      - false
    correctAnswer: true
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

Ao desenvolver aplicações de nível de produção com Nuxt.js, você pode descobrir que o núcleo de funcionalidades do framework não é suficiente. O Nuxt.js pode ser estendido com opções de configuração e plugins, mas manter essas personalizações em vários projetos é tedioso, repetitivo e demorado. Por outro lado, dar suporte às necessidades de cada projeto, por padrão, tornaria o Nuxt.js muito complexo e difícil de usar.

Este é um dos motivos pelos quais o Nuxt.js fornece um sistema de módulo de alta ordem que torna possível estender o núcleo. Módulos são funções chamadas sequencialmente durante a inicialização do Nuxt.js. O framework aguarda a conclusão de cada módulo antes de continuar. Desta forma, os módulos podem personalizar quase qualquer aspecto do seu projeto. Graças ao design modular do Nuxt.js (baseado no [Tapable](https://github.com/webpack/tapable) do webpack), os módulos podem facilmente registrar hooks para certos pontos de entrada, como a inicialização do construtor (builder). Os módulos também podem substituir templates, configurar loaders de webpack, adicionar bibliotecas CSS e realizar muitas outras tarefas úteis.

O melhor de tudo é que os módulos do Nuxt.js podem ser incorporados aos pacotes npm. Isso torna possível reutilizar em projetos e compartilhar com a comunidade, ajudando a criar um ecossistema de add-ons de alta qualidade.

## A propriedade modules

Os módulos são extensões do Nuxt.js que podem estender as funcionalidades do núcleo do framework e adicionar integrações infinitas. Depois de instalar os módulos, você pode adicioná-los ao arquivo nuxt.config.js, na propriedade modules.

```js{}[nuxt.config.js]
export default {
  modules: [
    // Usando o nome do pacote
    '@nuxtjs/axios',

    // Relativo ao seu projeto srcDir
    '~/modules/awesome.js',

    // Fornecendo opções
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // Definição inline
    function () {}
  ]
}
```

<base-alert type="info">

Os desenvolvedores de módulos geralmente fornecem etapas e detalhes adicionais necessários para uso.

</base-alert>

Nuxt.js tenta resolver cada item no array de módulos usando o require do node (em `node_modules`) e então será resolvido a partir `srcDir` do projeto, se `@` alias for usado.

<base-alert>

Os módulos são executados sequencialmente, portanto a ordem é importante.

</base-alert>

Os módulos devem exportar uma função para aprimorar o tempo de construção (build)/execução (runtime) e, opcionalmente, retornar uma promise até que seu trabalho seja concluído. Observe que eles são importados no tempo de execução, portanto, já devem ter sido transpilados se estiverem usando recursos ES6 modernos.

## Escreva seu próprio módulo

Módulos são funções. Eles podem ser empacotados como módulos npm ou incluídos diretamente no código-fonte do projeto.

```js{}[nuxt.config.js]
export default {
  exampleMsg: 'Olá',
  modules: [
    // Uso simples
    '~/modules/simple',
    // Passando opções diretamente
    ['~/modules/simple', { token: '123' }]
  ]
}
```

```js{}[modules/example.js]
export default function ExampleModule(opcoesDoModulo) {
  console.log(opcoesDoModulo.token) // '123'
  console.log(this.options.exampleMsg) // 'Olá'

  this.nuxt.hook('ready', async nuxt => {
    console.log('Nuxt is ready')
  })
}

// OBRIGATÓRIO se publicar o módulo como pacote npm
module.exports.meta = require('./package.json')
```

## 1) opcoesDoModulo

`opcoesDoModulo`: Este é o objeto passado, pelo usuário, usando o array `modules`. Podemos usá-lo para personalizar seu comportamento.

### Opções de alto nível

Às vezes é mais conveniente se pudermos usar opções de alto nível ao registrar os módulos em `nuxt.config.js`. Isso nos permite combinar várias fontes de opções.

```js{}[nuxt.config.js]
export default {
  modules: [['@nuxtjs/axios', { outraOpcao: true }]],

  // módulo axios está ciente disso usando `this.options.axios`
  axios: {
    opcao1,
    opcao2
  }
}
```

## 2) this.options

`this.options`: Você pode acessar diretamente as opções do Nuxt.js usando esta referência. Este é o conteúdo do `nuxt.config.js` do usuário, com todas as opções padrão atribuídas a ele. Ele pode ser usado para opções compartilhadas entre os módulos.

```js{}[meuModulo.js]
export default function (opcoesDoModulo) {
  // `options` conterá opcao1, opcao2 e outraOpcao
  const options = Object.assign({}, this.options.axios, opcoesDoModulo)

  // ...
}
```

### Adiciona uma biblioteca CSS

Se o seu módulo fornecer uma biblioteca CSS, certifique-se de verificar se o usuário já incluiu a biblioteca para evitar duplicatas e adicione uma opção para desativar a biblioteca CSS no módulo.

```js{}[meuModulo.js]
export default function (opcoesDoModulo) {
  if (opcoesDoModulo.fontAwesome !== false) {
    // Adicionar fontawesome
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```

### Emite assets

Podemos registrar plug-ins do webpack para emitir assets durante o build.

```js{}[meuModulo.js]
export default function (opcoesDoModulo) {
  const info = 'Construído por módulo incrível - 1.3 alfa em' + Date.now()

  this.options.build.plugins.push({
    apply(compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        // Isso gerará `.nuxt/dist/info.txt' com o conteúdo da variável info.
        // A fonte também pode ser um buffer
        compilation.assets['info.txt'] = {
          source: () => info,
          size: () => info.length
        }

        cb()
      })
    }
  })
}
```

## 3) this.nuxt

`this.nuxt`: Esta é uma referência à instância Nuxt.js atual. Podemos registrar hooks em certos eventos do ciclo de vida.

- **Ready**: Nuxt está pronto para funcionar (ModuleContainer e Renderer prontos).

```js
nuxt.hook('ready', async nuxt => {
  // Seu código personalizado aqui
})
```

- **Error**: Um erro não tratado ao chamar os hooks.

```js
nuxt.hook('error', async error => {
  // Seu código personalizado aqui
})
```

- **Close**: A instância Nuxt está fechando normalmente.

```js
nuxt.hook('close', async nuxt => {
  // Seu código personalizado aqui
})
```

- **Listen**: O servidor interno do Nuxt começa a escutar. (Usando nuxt start ou nuxt dev)

```js
nuxt.hook('listen', async (server, { host, port })) => {
  // Seu código personalizado aqui
})
```

`this`: Contexto dos módulos. Todos os módulos serão chamados dentro do contexto da instância ModuleContainer.

Consulte a documentação da classe [ModuleContainer](/docs/2.x/internals-glossary/internals-module-container) para ver os métodos disponíveis.

### Executa tarefas em hooks específicos

Seu módulo pode precisar fazer coisas apenas em condições específicas e não somente durante a inicialização do Nuxt.js. Podemos usar os poderosos hooks do Nuxt.js para fazer tarefas em eventos específicos (baseado no [Hookable](https://github.com/nuxt-contrib/hookable)). Nuxt.js esperará por sua função se ela retornar uma promise ou for definida como `async`.

Aqui estão alguns exemplos básicos:

```js{}[modules/meuModulo.js]
export default function meuModulo() {
  this.nuxt.hook('modules:done', moduleContainer => {
    // Isso será chamado quando todos os módulos terminarem de carregar
  })

  this.nuxt.hook('render:before', renderer => {
    // Chamado depois que o renderizador (renderer) for criado
  })

  this.nuxt.hook('build:compile', async ({ name, compiler }) => {
    // Chamado antes do compilador (padrão: webpack) iniciar
  })

  this.nuxt.hook('generate:before', async generator => {
    // Isso será chamado antes do Nuxt gerar suas páginas
  })
}
```

### Fornece plugins

É comum que os módulos forneçam um ou mais plugins quando adicionados. Por exemplo, o módulo [bootstrap-vue](https://bootstrap-vue.js.org/) precisaria se registrar no Vue. Em tais situações, podemos usar o método auxiliar `this.addPlugin`.

```js{}[plugin.js]
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```

```js{}[meuModulo.js]
import path from 'path'

export default function nuxtBootstrapVue(opcoesDoModulo) {
  // Registrar o template `plugin.js`
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

### Template plugins

Os templates e plugins registrados podem aproveitar os [modelos de lodash](https://lodash.com/docs/4.17.4#template) para alterar condicionalmente a saída dos plugins registrados.

```js{}[plugin.js]
// Definir UA do Google Analytics
ga('create', '<%= options.ua %>', 'auto')

<% if (options.debug) { %>
// código do desenvolvedor
<% } %>
```

```js{}[meuModulo.js]
import path from 'path'

export default function nuxtGoogleAnalytics(opcoesDoModulo) {
  // Registrar o template `plugin.js`
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      // Nuxt substituirá `options.ua` por` 123` ao copiar o plugin para o projeto
      ua: 123,

      // partes condicionais com dev serão retiradas do código do plugin nas compilações de produção
      debug: this.options.dev
    }
  })
}
```

### Registre loaders personalizados do webpack

Podemos fazer o mesmo que o `build.extend` em `nuxt.config.js` usando `this.extendBuild`.

```js{}[meuModulo.js]
export default function (opcoesDoModulo) {
    this.extendBuild((config, { isClient, isServer }) => {
      // Loader `.foo`
      config.module.rules.push({
        test: /\.foo$/,
        use: [...]
      })

      // Personalize loaders existentes
      // Consulte o código-fonte para os internals do Nuxt:
      // https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```

## Módulos assíncronos

Nem todos os módulos farão tudo de forma síncrona. Por exemplo, você pode querer desenvolver um módulo que precisa buscar alguma API ou fazer uma operação assíncrona. Para isso, o Nuxt.js suporta módulos assíncronos que podem retornar uma promise ou chamar um callback.

### Usando async/await

```js
import fse from 'fs-extra'

export default async function moduloAsync() {
  // Você pode fazer trabalho assíncrono aqui usando `async`/`await`
  const pages = await fse.readJson('./pages.json')
}
```

### Retornando uma promise

```js
export default function moduloAsync($http) {
  return $http
    .get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      // Faça algo estendendo as rotas Nuxt
    })
}
```

<base-alert type="info">

Existem muito mais hooks e possibilidades para módulos. Por favor, Leia sobre os [Internals do Nuxt](/docs/2.x/internals-glossary/internals) para saber mais sobre a API nuxt-internal.

</base-alert>

## Publicando seu módulo

`module.exports.meta`: Esta linha é necessária se você estiver publicando o módulo como um pacote npm. Nuxt usa internamente meta para funcionar melhor com seu pacote.

```js{}[modules/meuModulo.js]
module.exports.meta = require('./package.json')
```

## buildModules

Alguns módulos são importados apenas durante o desenvolvimento e em tempo de construção. Usar `buildModules` ajuda a tornar a inicialização da produção mais rápida e também diminui significativamente o tamanho de seus `node_modules` para implementações de produção. Por favor, consulte a documentação de cada módulo para ver se é recomendado usar `modules` ou `buildModules`.

A diferença de uso é:

- Em vez de adicionar em `modules`, dentro de `nuxt.config.js`, use `buildModules`

```js{}[nuxt.config.js]
export default {
  buildModules: ['@nuxtjs/eslint-module']
}
```

- Em vez de adicionar a `dependecies` dentro de `package.json`, use `devDependencies`

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D @nuxtjs/eslint-module
```

  </code-block>
  <code-block label="npm">

```bash
npm install --save-dev @nuxtjs/eslint-module
```

  </code-block>
</code-group>

<base-alert type="info">

Se você é um autor de módulo, é altamente recomendado sugerir aos usuários que instalem seu pacote como ym `devDependency` e usem `buildModules` ao invés de `modules` em `nuxt.config.js`.

</base-alert>

Seu módulo é um `buildModule`, a menos que:

- Está fornecendo um serverMiddleware
- Tem que registrar um hook Node.js em tempo de execução (como sentry)
- Está afetando o comportamento do vue-renderer ou usando um gancho do namespace `server:` ou `vue-renderer:`
- Qualquer outra coisa que esteja fora do escopo do webpack (dica: plugins e templates são compilados e estão no escopo do webpack)

<base-alert> 

Se você sugerir utilizar o `buildModules`, por favor mencione que este recurso está disponível apenas a partir do Nuxt v2.9. Usuários mais antigos devem atualizar o Nuxt ou usar a seção `modules`.

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
