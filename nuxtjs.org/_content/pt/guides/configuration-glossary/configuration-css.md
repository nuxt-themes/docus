---
title: 'A propriedade css'
description: O Nuxt.js permite definir os arquivos/módulos/bibliotecas CSS que você deseja definir globalmente (incluídos em todas as páginas).
menu: css
category: configuration-glossary
position: 4
---

> O Nuxt.js permite definir os arquivos/módulos/bibliotecas CSS que você deseja definir globalmente (incluídos em todas as páginas).

Caso você queira usar `sass`, certifique-se de ter instalado os pacotes `sass` e `sass-loader`.

```sh
npm install --save-dev sass sass-loader@10 fibers
```

- Tipo: `Array`
  - Items: `string`

```js{}[nuxt.config.js]
export default {
  css: [
    // Carregar um módulo Node.js diretamente (aqui é um arquivo Sass)
    'bulma',
    // Arquivo CSS no projeto
    '@/assets/css/main.css',
    // Arquivo SCSS no projeto
    '@/assets/css/main.scss'
  ]
}
```

O Nuxt.js adivinhará automaticamente o tipo de arquivo por sua extensão e usará o loader de pré-processador apropriado para webpack. Você ainda precisará instalar o loader necessário se precisar usá-los.

### Extensões de estilo

Você pode omitir a extensão do arquivo para arquivos CSS/SCSS/Postcss/Less/Stylus/... listados no array css em seu arquivo de configuração do nuxt.

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main', '~/assets/css/animations']
}
```

<base-alert>

Se você tiver dois arquivos com o mesmo nome, por exemplo. `main.scss` e `main.css`, e não especificar uma extensão na entrada do array css, por exemplo `css:['~/assets/css/main']`, então apenas um arquivo será carregado dependendo da ordem de `styleExtensions`. Neste caso, apenas o arquivo `css` será carregado e o arquivo `scss` será ignorado porque `css` vem primeiro no array `styleExtension` padrão.

</base-alert>

Ordem padrão: `['css', 'pcss', 'postcss', 'styl', 'stylus', 'scss', 'sass', 'less']`
