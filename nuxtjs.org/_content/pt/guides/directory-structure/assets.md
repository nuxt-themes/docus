---
title: assets
description: O diretório `assets` contém seus assets não compilados, como arquivos Stylus ou Sass, imagens ou fontes.
position: 2
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/02_assets?fontsize=14&hidenavigation=1&theme=dark
videoScript:
  - assets-video.md
questions:
  - question: Qual diretório contém seus assets não compilados, como arquivos Stylus ou Sass, imagens ou fontes?
    answers:
      - static
      - assets
      - pages
    correctAnswer: assets
  - question: O que você usa se precisar referenciar seu diretório de assets dentro de seus templates vue?
    answers:
      - '/assets/your_image.png'
      - '@assets/your_image.png'
      - '@/assets/your_image.png'
    correctAnswer: '@/assets/your_image.png'
  - question: O que você usa se precisar fazer referência ao diretório de recursos dentro de seus arquivos css?
    answers:
      - url("@assets/banner.svg")
      - url("assets/banner.svg")
      - url("@/assets/banner.svg")
    correctAnswer: url("@assets/banner.svg")
  - question: Onde você importa suas folhas de estilo css globais?
    answers:
      - no seu arquivo index.vue
      - no arquivo nuxt.config.js
      - no arquivo layout padrão
    correctAnswer: no arquivo nuxt.config.js
  - question: Em qual propriedade você importa uma fonte global?
    answers:
      - font
      - head
      - css
    correctAnswer: head
  - question: Qual loader permite embutir um arquivo como URL de dados de base 64?
    answers:
      - file-loader
      - url-loader
      - image-loader
    correctAnswer: url-loader
  - question: Qual é o alias para o diretório de origem?
    answers:
      - '@'
      - '@@'
      - '^'
    correctAnswer: '@'
  - question: Qual é o alias do diretório raiz?
    answers:
      - '@'
      - '@@'
      - '@root'
    correctAnswer: '@@'
---

O diretório `assets` contém seus assets não compilados, como arquivos Stylus ou Sass, imagens ou fontes.

## Imagens:

Dentro de seu template `vue`, se você precisar referenciar seu diretório `assets`, use `~/assets/your_image.png` com uma barra antes de assets.

```html
<template>
  <img src="~/assets/your_image.png" />
</template>
```

Dentro de seus arquivos `css`, se você precisar referenciar seu diretório `assets`, use `~assets/your_image.png` (sem barra).

```css
background: url('~assets/banner.svg');
```

Ao trabalhar com imagens dinâmicas, você precisará usar require.

```html
<img :src="require(`~/assets/img/${image}.jpg`)" />
```

<base-alert type="next">

Saiba mais sobre [assets webpack](/docs/2.x/directory-structure/assets#webpack-assets)

</base-alert>

## Styles:

O Nuxt.js permite definir os arquivos/módulos/bibliotecas CSS que você deseja incluir globalmente (incluídos em todas as páginas). No nuxt.config você pode adicionar facilmente seus estilos usando a propriedade CSS.

```js{}[nuxt.config.js]
export default {
  css: [
    // Carregar um módulo Node.js diretamente (aqui é um arquivo Sass)
    'bulma',
    // Arquivo CSS no projeto
    '~/assets/css/main.css',
    // Arquivo SCSS no projeto
    '~/assets/css/main.scss'
  ]
}
```

<base-alert type="info">

Caso você queira usar `sass`, certifique-se de ter instalado os pacotes `sass` e `sass-loader`.

</base-alert>

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D sass sass-loader@10 fibers
```

  </code-block>
  <code-block label="npm">

```bash
npm install --save-dev sass sass-loader@10 fibers
```

  </code-block>
</code-group>

O Nuxt.js identificará o tipo de arquivo por sua extensão e usará o loader do pré-processador apropriado para webpack. Você ainda precisará instalar o loader necessário se precisar usá-los.

## Fontes:

Você pode usar fontes locais adicionando-as à sua pasta assets. Depois de adicioná-los, você pode acessá-los por meio de seu css usando @font-face.

```
-| assets
----| fonts
------| DMSans-Regular.ttf
------| DMSans-Bold.ttf
```

```css{}[assets/main.css]
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('~assets/fonts/DMSans-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('~assets/fonts/DMSans-Bold.ttf') format('truetype');
}
```

<base-alert type="next">

Para adicionar fontes externas, como google fonts, confira o [capítulo Meta Tags e SEO](/docs/2.x/features/meta-tags-seo#external-resources)

</base-alert>

## Assets Webpack

Por padrão, Nuxt usa vue-loader, file-loader e url-loader do webpack para servir seus assets. Você também pode usar o diretório static para assets que não devem ser executados por meio do webpack.

## Webpack

O [vue-loader](http://vue-loader.vuejs.org/) processa automaticamente seus arquivos de estilo e template com `css-loader` e o compilador de template do Vue. Neste processo de compilação, todos os URLs de assets como `<img src="...">`, `background: url(...)` e CSS `@import` são resolvidos como dependências de módulo.

Por exemplo, temos esta árvore de arquivos:

```
-| assets/
----| image.png
-| pages/
----| index.vue
```

Se você usar `url('~assets/image.png')` em seu CSS, ele será traduzido para `require('~/assets/image.png')`.

<base-alert>

O alias `~/` não será resolvido corretamente em seus arquivos CSS. Você deve usar `~assets` (**sem barra**) na referência CSS, `url`, ou seja, `background: url("~assets/banner.svg")`

</base-alert>

Se você quiser referenciar essa imagem em `pages/index.vue`:

```html{}[pages/index.vue]
<template>
  <img src="~/assets/image.png" />
</template>
```

Ele será compilado em:

```js
createElement('img', { attrs: { src: require('~/assets/image.png') } })
```

Como `.png` não é um arquivo JavaScript, o Nuxt.js configura o webpack para usar [file-loader](https://github.com/webpack/file-loader) e [url-loader](https://github.com/webpack/url-loader) para lidar com eles para você.

Os benefícios desses loaders são:

O `file-loader` permite designar onde copiar e colocar o arquivo do assets, e como nomeá-los usando hashes de versão para melhor armazenamento em cache. Em produção, você se beneficiará do cache de longo prazo por padrão!

O `url-loader` permite que você inclua condicionalmente um arquivo como uma URL de dados de base 64 se eles forem menores que um determinado limite. Isso pode reduzir o número de solicitações HTTP para arquivos triviais. Se o arquivo for maior do que o limite, ele volta automaticamente para o file-loader.

Para esses dois loader, a configuração padrão é:

```js
// https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L297-L316
;[
  {
    test: /\.(png|jpe?g|gif|svg|webp)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

O que significa que cada arquivo abaixo de 1 KB será embutido como URL de dados de base 64. Caso contrário, a imagem/fonte será copiada em sua pasta correspondente (dentro do diretório `.nuxt`) com um nome contendo uma hash de versão para melhor armazenamento em cache.

Ao iniciar sua aplicação com `nuxt`, seu template em `pages/index.vue`:

```html{}[pages/index.vue]
<template>
  <img src="@/assets/your_image.png" />
</template>
```

Será transformado em:

```html
<img src="/_nuxt/img/your_image.0c61159.png" />
```

Se você deseja alterar as configurações do loader, use [build.extend](/docs/2.x/configuration-glossary/configuration-build#extend).

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

## Aliases

Por padrão, o diretório de origem (srcDir) e o diretório raiz (rootDir) são iguais. Você pode usar o alias de `~` para o diretório de origem. Em vez de escrever caminhos relativos como `../assets/your_image.png`, você pode usar `~/assets/your_image.png`.

Ambos alcançarão os mesmos resultados.

```html{}[components/Avatar.vue]
<template>
  <div>
    <img src="../assets/your_image.png" />
    <img src="~/assets/your_image.png" />
  </div>
</template>
```

Recomendamos usar o `~` como alias. `@` ainda é compatível, mas não funcionará em todos os casos, como com imagens de fundo em seu css.

Você pode usar o alias de `~~` ou `@@` para o diretório raiz.

<base-alert type="info">

Dica: no teclado espanhol, você pode acessar `~` com (`Option` +`ñ`) no Mac OS

</base-alert>

<quiz :questions="questions"></quiz>
