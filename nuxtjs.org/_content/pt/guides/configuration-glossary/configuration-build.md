---
title: 'A propriedade build'
description: O Nuxt.js permite que você personalize a configuração do webpack para buildar sua aplicação web da forma como desejar.
menu: build
category: configuration-glossary
position: 1
---

> O Nuxt.js permite que você personalize a configuração do webpack para buildar sua aplicação web da forma como desejar.

## analyze

> Nuxt.js usa [webpack-bundle-analyser](https://github.com/webpack-contrib/webpack-bundle-analyzer) para possibiliar que você visualize e otimize seus pacotes.

- Tipo: `Boolean` ou `Object`
- Padrão: `false`

Se for um objeto, consulte as propriedades disponíveis [aqui](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin).

```js{}[nuxt.config.js]
export default {
  build: {
    analyze: true,
    // ou
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<base-alert type="info">

**Info:** você pode usar o comando `yarn nuxt build --analyze` ou `yarn nuxt build -a` para buildar sua aplicação e iniciar o analisador de pacote em [http://localhost:8888](http://localhost:8888). Se você não está usando `yarn`, pode executar o comando com `npx`.

</base-alert>

## corejs

> A partir do [Nuxt@2.14](https://github.com/nuxt/nuxt.js/releases/tag/v2.14.0), o Nuxt detecta automaticamente a versão atual do `core-js` em seu projeto. Você também pode especificar qual versão deseja usar.

- Tipo: `number` | `string` (Valores válidos são `'auto'`, `2` e `3`)
- Padrão: `'auto'`

## babel

> Personalize a configuração do Babel para arquivos JavaScript e Vue. `.babelrc` é ignorado por padrão.

- Tipo: `Object`
- Veja as [opções](https://github.com/babel/babel-loader#options) do `babel-loader` e as [opções](https://babeljs.io/docs/en/options) do `babel`
- Padrão:

  ```js
  {
    babelrc: false,
    cacheDirectory: undefined,
    presets: ['@nuxt/babel-preset-app']
  }
  ```

Os targets padrão do [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/blob/dev/packages/babel-preset-app/src/index.js) são `ie: '9'` no build do `client`, e `node: 'current'` no build do `server`.

### presets

- Tipo: `Function`
- Argumentos:
  1. `Object`: { isServer: true | false }
  2. `Array`:
     - nome do preset `@nuxt/babel-preset-app`
     - [`opções`](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app#options) do `@nuxt/babel-preset-app`

**Nota**: Os presets configurados em `build.babel.presets` serão aplicados tanto ao cliente quanto ao servidor. O target será definido pelo Nuxt de acordo (cliente/servidor). Se você quiser configurar o preset de forma diferente para o cliente ou para o build do servidor, use `presets` como uma função:

> Nós **recomendamos enfaticamente** a usar o preset padrão em vez da personalização abaixo

```js
export default {
  build: {
    babel: {
      presets({ isServer }, [ preset, options ]) {
        // altera as opções diretamente
        options.targets = isServer ? ... :  ...
        options.corejs = ...
        // não retorna nada
      }
    }
  }
}
```

Ou substitua o valor padrão retornando toda a lista de presets:

```js
export default {
  build: {
    babel: {
      presets({ isServer }, [preset, options]) {
        return [
          [
            preset,
            {
              targets: isServer ? ... :  ...,
              ...options
            }
          ],
          [
            // Outros presets
          ]
        ]
      }
    }
  }
}
```

## cache

- Tipo: `Boolean`
- Padrão: `false`
- ⚠️ Experimental

> Habilite o cache do [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin#options) e [cache-loader](https://github.com/webpack-contrib/cache-loader#cache-loader)

## cssSourceMap

- Tipo: `boolean`
- Padrão: `true` para desenvolvimento and `false` para produção.

> Ativa o suporte ao source-map do CSS

## devMiddleware

- Tipo: `Object`

Veja [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) para as opções disponíveis.

## devtools

- Tipo: `boolean`
- Padrão: `false`

Configure se deseja permitir a inspeção do [vue-devtools](https://github.com/vuejs/vue-devtools).

Se você já ativou por meio de nuxt.config.js ou de outra forma, devtools ativará independentemente do sinalizador.

## extend

> Estenda a configuração do webpack manualmente para os pacotes de cliente e servidor.

- Tipo: `Function`

A extensão é chamada duas vezes, uma vez para o pacote do servidor e uma vez para o pacote do cliente. Os argumentos do método são:

1. O objeto de configuração do Webpack,
2. Um objeto com as seguintes propriedades (todas booleanas, exceto `loaders`): `isDev`, `isClient`, `isServer`, `loaders`.

<base-alert>

**Aviso:** As propriedades `isClient` e `isServer` são separadas das propriedades disponíveis no [`contexto`](/docs/2.x/internals-glossary/context). Elas **não** estão obsoletos. Não use `process.client` e `process.server` aqui, pois serão `undefined`.

</base-alert>

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isClient }) {
      // Estende apenas a configuração do webpack para o pacote do cliente
      if (isClient) {
        config.devtool = 'source-map'
      }
    }
  }
}
```

Se você quiser saber mais sobre a configuração padrão do webpack, dê uma olhada em nosso [diretório do webpack](https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config).

### loaders no extend

`loaders` tem a mesma estrutura de objeto que [build.loaders](#loaders), então você pode alterar as suas opções dentro do `extend`.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isClient, loaders: { vue } }) {
      // Estende apenas a configuração do webpack para o pacote do cliente
      if (isClient) {
        vue.transformAssetUrls.video = ['src', 'poster']
      }
    }
  }
}
```

## extractCSS

> Ativa a extração de CSS comum usando as [diretrizes](https://ssr.vuejs.org/en/css.html) do Vue Server Renderer.

- Tipo: `Boolean` ou `Object`
- Padrão: `false`

Usando [`extract-css-chunks-webpack-plugin`](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin/) por debaixo dos panos, todo o CSS será extraído em arquivos separados, geralmente um por componente. Isso permite armazenar em cache seu CSS e JavaScript separadamente e vale a pena tentar, caso você tenha muito CSS global ou compartilhado.

Exemplo (`nuxt.config.js`):

```js
export default {
  build: {
    extractCSS: true,
    // ou
    extractCSS: {
      ignoreOrder: true
    }
  }
}
```

<base-alert type="info">

**Nota:** Havia um bug nas versões do Vue anteriores a 2.5.18, no qual removia as importações de CSS críticas ao usar essas opções.

</base-alert>

Você pode querer extrair todo o seu CSS para um único arquivo. Existe uma solução alternativa para isso:

<base-alert>

Não é recomendável extrair tudo em um único arquivo. Extrair em vários arquivos css é melhor para armazenamento em cache e isolamento de preload. Ele também pode melhorar o desempenho da página baixando e resolvendo apenas os recursos necessários.

</base-alert>

```js
export default {
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  }
}
```

## filenames

> Personalize os nomes dos arquivos do pacote.

- Tipo: `Object`
- Padrão:

  ```js
  {
    app: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
    chunk: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
    css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash:7].css',
    img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name].[contenthash:7].[ext]',
    font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[name].[contenthash:7].[ext]',
    video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[name].[contenthash:7].[ext]'
  }
  ```

Este exemplo altera nomes sofisticados de blocos para IDs numéricos:

```js{}[nuxt.config.js]
export default {
  build: {
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
    }
  }
}
```

Para entender um pouco mais sobre o uso de manifestos, dê uma olhada nesta [documentação do webpack](https://webpack.js.org/guides/code-splitting/).

<base-alert>

Tenha cuidado ao usar nomes de arquivos não baseados em hash em produção, pois a maioria dos navegadores cacheará o asset e não detectará as mudanças no primeiro carregamento.

</base-alert>

## friendlyErrors

- Tipo: `Boolean`
- Padrão: `true` (Sobreposição ativada)

Ativa ou desativa a sobreposição fornecida por [FriendlyErrorsWebpackPlugin](https://github.com/nuxt/friendly-errors-webpack-plugin).

## hardSource

- Tipo: `Boolean`
- Padrão: `false`
- ⚠️ Experimental

Ativa o [HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin) para cache aprimorado.

## hotMiddleware

- Tipo: `Object`

Veja [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) para as opções disponíveis.

## html.minify

- Tipo: `Object`
- Padrão:

```js
{
  collapseBooleanAttributes: true,
  decodeEntities: true,
  minifyCSS: true,
  minifyJS: true,
  processConditionalComments: true,
  removeEmptyAttributes: true,
  removeRedundantAttributes: true,
  trimCustomFragments: true,
  useShortDoctype: true
}
```

**Atenção:** Se você fizer alterações em `html.minify`, elas não serão mescladas com os padrões!

Configuração para o plugin [html-minifier](https://github.com/kangax/html-minifier) ​​usado para minificar arquivos HTML criados durante o processo de build (será aplicado para _todos os modos_).

## indicator

> Exibir indicador de build para hot module replacement em desenvolvimento (disponível em `v2.8.0+`).

- Tipo: `Boolean`
- Padrão: `true`

![nuxt-build-indicator](https://user-images.githubusercontent.com/5158436/58500509-93ba0f80-8197-11e9-8524-e115c6d32571.gif)

## loaders

> Personalize as opções dos loader do webpack integrados no Nuxt.js.

- Tipo: `Object`
- Padrão:

```js
{
  file: {},
  fontUrl: { limit: 1000 },
  imgUrl: { limit: 1000 },
  pugPlain: {},
  vue: {
    transformAssetUrls: {
      video: 'src',
      source: 'src',
      object: 'src',
      embed: 'src'
    }
  },
  css: {},
  cssModules: {
    localIdentName: '[local]_[hash:base64:5]'
  },
  less: {},
  sass: {
    indentedSyntax: true
  },
  scss: {},
  stylus: {},
  vueStyle: {}
}
```

> **Nota**: Além de especificar as configurações em `nuxt.config.js`, ele também pode ser modificado no [build.extend](#extend)

### loaders.file

> Mais detalhes nas [opções do file-loader](https://github.com/webpack-contrib/file-loader#options).

### loaders.fontUrl e loaders.imgUrl

> Mais detalhes nas [opções do url-loader](https://github.com/webpack-contrib/url-loader#options).

### loaders.pugPlain

> Mais detalhes em [pug-plain-loader](https://github.com/yyx990803/pug-plain-loader) ou [opções do compilador Pug](https://pugjs.org/api/reference.html#opções).

### loaders.vue

> Mais detalhes nas [opções do vue-loader](https://vue-loader.vuejs.org/options.html).

### loaders.css e loaders.cssModules

> Mais detalhes nas [opções do css-loader](https://github.com/webpack-contrib/css-loader#options). **Nota**: o cssModules é a opção do loader para utilizar [Módulos CSS](https://vue-loader.vuejs.org/guide/css-modules.html#css-modules)

### loaders.less

> Você pode passar qualquer opção específica do Less para o `less-loader` via `loaders.less`. Consulte a [documentação do Less](http://lesscss.org/usage/#command-line-usage-options) para todas as opções disponíveis.

### loaders.sass e loaders.scss

> Veja a [documentação do Sass](https://github.com/sass/dart-sass#javascript-api) para todas as opções Sass disponíveis. Nota: `loaders.sass` é para [Sintaxe Indentada do Sass](http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html)

### loaders.vueStyle

> Mais detalhes nas [opções do vue-style-loader](https://github.com/vuejs/vue-style-loader#options).

## optimization

- Tipo: `Object`
- Padrão:

  ```js
  {
    minimize: true,
    minimizer: [
      // terser-webpack-plugin
      // optimize-css-assets-webpack-plugin
    ],
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      name: undefined,
      cacheGroups: {}
    }
  }
  ```

O valor padrão de `splitChunks.name` é `true` no modo `dev` ou `analyze`.

Você pode definir `minimizer` como um array personalizado de plug-ins ou definir `minimize` para `false` para desabilitar todos os minimizadores. (`minimize` está sendo desabilitado por padrão em modo de desenvolvimento)

Veja [Webpack Optimization](https://webpack.js.org/configuration/optimization).

## optimizeCSS

- Tipo: `Object` ou `Boolean`
- Padrão:
  - `false`
  - `{}` quando o extractCSS está ativado

Opções do plugin OptimizeCSSAssets.

Veja [NMFR/optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin).

## parallel

- Tipo: `Boolean`
- Padrão: `false`
- ⚠️ Experimental

> Ativa o [thread-loader](https://github.com/webpack-contrib/thread-loader#thread-loader) no build do webpack

## plugins

> Adicionar plugins webpack

- Tipo: `Array`
- Padrão: `[]`

```js{}[nuxt.config.js]
import webpack from 'webpack'
import { version } from './package.json'
export default {
  build: {
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': version
      })
    ]
  }
}
```

## postcss

> Personalize os plugins do [PostCSS Loader](https://github.com/postcss/postcss-loader#usage).

- Tipo: `Array` (legado, substituirá os padrões), `Object` (recomendado), `Function` ou `Boolean`

  **Nota:** Nuxt.js aplicou [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env). Por padrão, ele habilita os [recursos do Estágio 2](https://cssdb.org/) e o [Autoprefixer](https://github.com/postcss/autoprefixer). Você pode usar `build.postcss.preset` para configurá-lo .

- Padrão:

  ```js{}[nuxt.config.js]
  {
    plugins: {
      'postcss-import': {},
      'postcss-url': {},
      'postcss-preset-env': this.preset,
      'cssnano': { preset: 'default' } // desabilitado no modo dev
    },
    order: 'presetEnvAndCssnanoLast',
    preset: {
      stage: 2
    }
  }
  ```

Suas configurações personalizadas de plugin serão mescladas com os plugins padrão (a menos que você esteja usando um `Array` em vez de um `Objeto`).

```js{}[nuxt.config.js]
export default {
  build: {
    postcss: {
      plugins: {
        // Desabilita `postcss-url`
        'postcss-url': false,
        // Adiciona alguns plugins
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        autoprefixer: {
          grid: true
        }
      }
    }
  }
}
```

Se a configuração postcss for um `Object`, `order` pode ser usado para definir a ordem do plugin:

- Tipo: `Array` (nomes de plugins ordenados), `String` (nome do preset da ordenação), `Function`
- Padrão: `cssnanoLast` (coloca `cssnano` em último)

```js{}[nuxt.config.js]
export default {
  build: {
    postcss: {
      // nome do preset
      order: 'cssnanoLast',
      // nomes de plugins ordenados
      order: ['postcss-import', 'postcss-preset-env', 'cssnano']
      // Funlção para calcular a ordem dos plugins
      order: (names, presets) => presets.cssnanoLast(names)
    }
  }
}
```

### postcss plugins & nuxt-tailwindcss

Se você deseja aplicar um plugin postcss (por exemplo, postcss-pxtorem) na configuração do nuxt-tailwindcss, você deve alterar a ordem e carregar primeiro o tailwindcss.

**Esta configuração não tem impacto no nuxt-purgecss.**

```js{}[nuxt.config.js]
import { join } from 'path'

export default {
  // ...
  build: {
    postcss: {
      plugins: {
        tailwindcss: join(__dirname, 'tailwind.config.js'),
        'postcss-pxtorem': {
          propList: ['*', '!border*']
        }
      }
    }
  }
}
```

## profile

- Tipo: `Boolean`
- Padrão: ativado pelo argumento de linha de comando `--profile`

> Habilite o gerador de perfil em [WebpackBar](https://github.com/nuxt/webpackbar#profile)

## publicPath

> O Nuxt.js permite que você envie seus arquivos dist para seu CDN para obter o máximo de desempenho, simplesmente defina o `publicPath` para seu CDN.

- Tipo: `String`
- Padrão: `'/_nuxt/'`

```js{}[nuxt.config.js]
export default {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

Então, ao lançar `nuxt build`, carregue o conteúdo do diretório`.nuxt/dist/client` para seu CDN e voilà!

## quiet

> Suprime a maior parte do log de saída do build

- Tipo: `Boolean`
- Padrão: Ativado quando os ambientes de `CI` ou `test` são detectados pelo [std-env](https://github.com/blindmedia/std-env)

## splitChunks

- Tipo: `Object`
- Padrão:

  ```js{}[nuxt.config.js]
  export default {
    build: {
      splitChunks: {
        layouts: false,
        pages: true,
        commons: true
      }
    }
  }
  ```

Divide os códigos para `layout`, `pages` e `commons` (bibliotecas comuns: vue | vue-loader | vue-router | vuex ...).

## ssr

> Cria pacote um webpack especial para o renderizador de SSR.

- Tipo: `Boolean`
- Padrão: `true` para o modo universal e `false` para o modo spa

Esta opção é definida automaticamente com base no valor do `mode`, se não for fornecida.

## styleResources

- Tipo: `Object`
- Padrão: `{}`

<base-alert>

**Aviso:** Esta propriedade está obsoleta. Por favor, use o [style-resources-module](https://github.com/nuxt-community/style-resources-module/) para melhor desempenho e melhor DX!

</base-alert>

Isso é útil quando você precisa injetar algumas variáveis ​​e mixins em suas páginas sem ter que importá-los todas as vezes.

Nuxt.js usa https://github.com/yenshih/style-resources-loader para adquirir esse comportamento.

Você precisa especificar os padrões/caminhos que deseja incluir para os pré-processadores fornecidos: `less`, `sass`, `scss` ou `stylus`

Você não pode usar aliases de caminho aqui (`~` e `@`). Você precisa usar caminhos relativos ou absolutos.

```js{}[nuxt.config.js]
{
  build: {
    styleResources: {
      scss: './assets/variables.scss',
      less: './assets/*.less',
      // sass: ...,
      // scss: ...
      options: {
        // Veja https://github.com/yenshih/style-resources-loader#options
        // Exceto a propriedade `patterns`
      }
    }
  }
}
```

## templates

> O Nuxt.js permite que você forneça seus próprios templates que serão renderizados com base na configuração do Nuxt. Este recurso é especialmente útil para usar com [módulos](/docs/2.x/directory-structure/modules).

- Tipo: `Array`

```js{}[nuxt.config.js]
export default {
  build: {
    templates: [
      {
        src: '~/modules/support/plugin.js', // `src` pode ser absoluto ou relativo
        dst: 'support.js', // `dst` é relativo ao diretório `.nuxt` do projeto
        options: {
          // Options são fornecidas para o template como a propriedade `options`
          live_chat: false
        }
      }
    ]
  }
}
```

Os templates são renderizados usando [`lodash.template`](https://lodash.com/docs/#template). Você pode aprender mais sobre como usá-los [aqui](https://github.com/learn-co-students/javascript-lodash-templates-lab-v-000).

## terser

- Tipo: `Object` ou `Boolean`
- Padrão:

```js{}[nuxt.config.js]
{
  parallel: true,
  cache: false,
  sourceMap: false,
  extractComments: {
    filename: 'LICENSES'
  },
  terserOptions: {
    output: {
      comments: /^\**!|@preserve|@license|@cc_on/
    }
  }
}
```

Opções do plugin Terser. Defina como `false` para desativar este plugin.

`sourceMap` será habilitado quando webpack `config.devtool` corresponder a `source-?map`

Veja [webpack-contrib/terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin).

## transpile

- Tipo: `Array<String | RegExp | Function>`
- Padrão: `[]`

Se você quiser transpilar dependências específicas com o Babel, você pode adicioná-las em `build.transpile`. Cada item no transpile pode ser um nome de pacote, uma string ou objeto regex que corresponda ao nome do arquivo da dependência.

A partir da versão `v2.9.0`, você também pode usar uma função para transpilar condicionalmente. A função receberá um objeto (`{ isDev, isServer, isClient, isModern, isLegacy }`):

```js{}[nuxt.config.js]
{
  build: {
    transpile: [({ isLegacy }) => isLegacy && 'ky']
  }
}
```

## vueLoader

> Nota: Esta configuração foi removida desde o Nuxt 2.0. Por favor, use [`build.loaders.vue`](#loaders).

- Tipo: `Object`
- Padrão:

  ```js{}[nuxt.config.js]
  {
    productionMode: !this.options.dev,
    transformAssetUrls: {
      video: 'src',
      source: 'src',
      object: 'src',
      embed: 'src'
    }
  }
  ```

> Especifica as [Opções do Vue Loader](https://vue-loader.vuejs.org/options.html).

## watch

> Você pode fornecer seus arquivos personalizados para observar e regenerar após as alterações. Este recurso é especialmente útil para usar com [módulos](/docs/2.x/directory-structure/modules).

- Tipo: `Array<String>`

```js{}[nuxt.config.js]
export default {
  build: {
    watch: ['~/.nuxt/support.js']
  }
}
```

## followSymlinks

> Por padrão, o processo de build não verifica arquivos dentro de links simbólicos. Este booleano os inclui, permitindo assim o uso de links simbólicos dentro de pastas como a pasta "pages", por exemplo.

- Tipo: `Boolean`

```js{}[nuxt.config.js]
export default {
  build: {
    followSymlinks: true
  }
}
```
