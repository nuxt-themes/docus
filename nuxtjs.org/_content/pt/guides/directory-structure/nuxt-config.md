---
title: nuxt.config
description: Por padrão, o Nuxt.js é configurado para cobrir a maioria dos casos de uso. Esta configuração padrão pode ser substituída pelo arquivo nuxt.config.js.
position: 14
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/15_nuxt-config?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
---

Por padrão, o Nuxt.js é configurado para cobrir a maioria dos casos de uso. Esta configuração padrão pode ser substituída pelo arquivo nuxt.config.js.

## nuxt.config.js

### build

Esta opção permite definir várias configurações para a etapa `build`, incluindo `loaders`, `filenames`, a configuração do `webpack` e `transpilation`.

```js{}[nuxt.config.js]
export default {
  build: {
    /*
     ** Você pode estender a configuração do webpack aqui
     */
    extend(config, ctx) {}
  }
}
```

<base-alert type="next">

Saiba mais sobre a [propriedade build](/docs/2.x/configuration-glossary/configuration-build)

</base-alert>

### css

Esta opção permite definir os arquivos CSS, módulos e bibliotecas que deseja incluir globalmente (em todas as páginas).

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main.css', '~/assets/css/animations.scss']
}
```

Você pode omitir a extensão do arquivo para arquivos CSS/SCSS/Postcss/Less/Stylus/... listados no array css em seu arquivo de configuração do nuxt.

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main', '~/assets/css/animations']
}
```

Ao omitir a extensão, se você tiver um arquivo css e decidir mudar para usar sass, por exemplo, você não terá que atualizar seu nuxt.config, pois ele usará a nova extensão assim que o nome do arquivo permanecer o mesmo.

<base-alert type="next">

Saiba mais sobre a [propriedade css](/docs/2.x/configuration-glossary/configuration-css)

</base-alert>

### dev

Esta opção permite definir o modo de `desenvolvimento` ou `produção` do Nuxt.js (importante quando você usa o Nuxt.js programaticamente).

```js{}[nuxt.config.js]
export default {
  dev: process.env.NODE_ENV !== 'production'
}
```

<base-alert type="next">

Saiba mais sobre a [propriedade dev](/docs/2.x/configuration-glossary/configuration-dev)

</base-alert>

### env

Esta opção permite definir variáveis ​​de ambiente que estão disponíveis para o cliente e servidor.

```js{}[nuxt.config.js]
export default {
  env: {
    baseUrl: process.env.BASE_URL || baseUrl
  }
}
```

<base-alert type="next">

Saiba mais sobre a [propriedade env](/docs/2.x/configuration-glossary/configuration-env)

</base-alert>

### generate

Esta opção permite configurar valores de parâmetro para cada rota dinâmica, em sua aplicação, que será transformada em arquivos HTML pelo Nuxt.js.

```js{}[nuxt.config.js]
export default {
  generate: {
    dir: 'gh_pages', // gh_pages/ invés de dist/
    subFolders: false // Os arquivos HTML são gerados de acordo com o caminho da rota
  }
}
```

<base-alert type="next">

Saiba mais sobre a [propriedade generate](/docs/2.x/configuration-glossary/configuration-generate)

</base-alert>

### head

```js{}[nuxt.config.js]
export default {
  head: {
    title: 'my title',
    meta: [
      { charset: 'utf-8' },
      .....
    ]
  }
}
```

Esta opção permite definir todas as metatags padrão para sua aplicação.

<base-alert type="next">

Saiba mais em [integração da head](/docs/2.x/configuration-glossary/configuration-head)

</base-alert>

### loading

Esta opção permite personalizar o componente de carregamento que o Nuxt.js usa por padrão.

```js{}[nuxt.config.js]
export default {
  loading: {
    color: '#fff'
  }
}
```

<base-alert type="next">

Saiba mais em [integração do loading](/docs/2.x/configuration-glossary/configuration-loading)

</base-alert>

### modules

Com esta opção, você pode adicionar módulos Nuxt.js ao seu projeto.

```js{}[nuxt.config.js]
export default {
  modules: ['@nuxtjs/axios']
}
```

<base-alert type="next">

Saiba mais sobre a [propriedade modules](/docs/2.x/configuration-glossary/configuration-modules)

</base-alert>

### modulesDir

A propriedade modulesDir é usada para definir os diretórios dos módulos para resolução de caminho. Por exemplo: resolveLoading do Webpack, nodeExternals e postcss. O caminho de configuração é relativo a `options.rootDir` (padrão: process.cwd()).

```js{}[nuxt.config.js]
export default {
  modulesDir: ['../../node_modules']
}
```

A configuração deste campo pode ser necessária se o seu projeto for organizado como um mono-repositório no estilo de área de trabalho do Yarn.

<base-alert type="next">

Saiba mais sobre a [propriedade modulesDir](/docs/2.x/configuration-glossary/configuration-modulesdir)

</base-alert>

### plugins

Esta opção permite definir plugins JavaScript que devem ser executados antes de instanciar o aplicativo raiz Vue.js.

```js{}[nuxt.config.js]
export default {
  plugins: ['~/plugins/url-helpers.js']
}
```

<base-alert type="next">

Saiba mais sobre a [propriedade plugins](/docs/2.x/configuration-glossary/configuration-plugins)

</base-alert>

### router

Com a opção `router`, você pode sobrescrever a configuração padrão do Vue Router do Nuxt.js.

```js{}[nuxt.config.js]
export default {
  router: {
    linkExactActiveClass: 'text-primary'
  }
}
```

<base-alert type="next">

Saiba mais sobre a [propriedade router](/docs/2.x/configuration-glossary/configuration-router)

</base-alert>

### server

Esta opção permite configurar as variáveis ​​de conexão para a instância do servidor da sua aplicação Nuxt.js.

```js{}[nuxt.config.js]
import path from 'path'
import fs from 'fs'

export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    }
  }
}
```

<base-alert type="next">

Saiba mais sobre a [propriedade server](/docs/2.x/configuration-glossary/configuration-server)

</base-alert>

### srcDir

Esta opção permite definir o diretório de origem de sua aplicação Nuxt.js.

```js{}[nuxt.config.js]
export default {
  srcDir: 'client/'
}
```

Exemplo de estrutura de projeto com sua aplicaçao Nuxt.js no diretório `source`.

```bash
**-| app/
---| node_modules/
---| nuxt.config.js
---| package.json
---| client/
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/**
```

### dir

Esta opção permite definir nomes personalizados de seus diretórios Nuxt.js.

```js{}[nuxt.config.js]
export default {
  pages: 'views' // O Nuxt procurará pelo diretório views/ em vez de pages/
}
```

<base-alert type="next">

Saiba mais na [propriedade dir](/docs/2.x/configuration-glossary/configuration-dir)

</base-alert>

### pageTransition

Esta opção permite definir as propriedades padrão das transições de página.

```js{}[nuxt.config.js]
export default {
  pageTransition: 'page'
}
```

<base-alert type="next">

Saiba mais sobre a [propriedade transition](/docs/2.x/configuration-glossary/configuration-transition)

</base-alert>

## Outros arquivos de configuração

Além do `nuxt.config.js`, podem haver outros arquivos de configuração na raiz do seu projeto, como [.eslintrc](https://eslint.org/), [prettier.config.json](https://prettier.io/) ou [.gitignore](https://git-scm.com/docs/gitignore). Eles são usados ​​para configurar outras ferramentas como seu linter, formatador de código ou seu repositório git e são separados do `nuxt.config.js`.

### .gitignore

Em seu arquivo .gitignore, você precisará adicionar o seguinte para que sejam ignorados e não adicionados ao controle de versão. `node_modules` que é onde estão todos os seus módulos instalados. A pasta `nuxt` que é criada durante a execução dos comandos dev ou build. A pasta `dist` é a pasta criada ao executar o comando generate.

```markdown{}[.gitignore]
node_modules .nuxt dist
```

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

### O que vem em seguida

<base-alert type="next">

Confira o [glossário de configurações](/docs/2.x/configuration-glossary/configuration-build)

</base-alert>
