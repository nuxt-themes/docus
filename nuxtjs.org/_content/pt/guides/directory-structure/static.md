---
title: static
description: O diretório `static` é diretamente mapeado para a raiz do servidor e contém arquivos que provavelmente não serão alterados. Todos os arquivos incluídos serão servidos automaticamente pelo Nuxt e podem ser acessados ​​por meio da URL raiz do projeto.
position: 12
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/13_static?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Em qual diretório você deve colocar seus arquivos que provavelmente não serão alterados, como seu favicon ou robots.txt?
    answers:
      - assets
      - static
      - src
    correctAnswer: static
  - question: Este diretório pode ser facilmente renomeado sem qualquer configuração
    answers:
      - true
      - false
    correctAnswer: false
  - question: Onde você deve colocar suas imagens se quiser que elas passem pelo webpack?
    answers:
      - static
      - assets
      - src
    correctAnswer: assets
  - question: Qualquer coisa no diretório static é relativo ao diretório raiz
    answers:
      - true
      - false
    correctAnswer: true
  - question: Você pode configurar o comportamento do diretório estático no nuxt.config.js
    answers:
      - true
      - false
    correctAnswer: true
---

O diretório `static` é diretamente mapeado para a raiz do servidor e contém arquivos que provavelmente não serão alterados. Todos os arquivos incluídos serão servidos automaticamente pelo Nuxt e podem ser acessados ​​por meio da URL raiz do projeto.

`/static/robots.txt` estará disponível em `http://localhost:3000/robots.txt`.

`/static/favicon.ico` estará disponível em `localhost:3000/favicon.ico`.

Esta opção é útil para arquivos como `robots.txt`, `sitemap.xml` ou `CNAME` (que é importante para fazer deploy do GitHub Pages).

<base-alert>

_Este diretório não pode ser renomeado sem configuração extra._

</base-alert>

## Assets estáticos

Se você não quiser usar os assets Webpack do diretório `assets`, você pode adicionar as imagens ao diretório static.

Em seu código, você pode fazer referência a esses arquivos em relação à raiz (`/`):

```html
<!-- Imagem estática do diretório static -->
<img src="/my-image.png" />

<!-- imagem do diretório de assets, que passará pelo webpack -->
<img src="@/assets/my-image-2.png" />
```

## Configuração do diretório Static

Se precisar, você pode configurar o comportamento do diretório `static/` no arquivo `nuxt.config.js`.

### Prefixo do asset estático

Se você fizer o deploy do Nuxt.js em uma subpasta, por exemplo, `/blog/`, a base do roteador será adicionada ao caminho do asset estático por padrão. Se você quiser desabilitar este comportamento, você pode definir `static.prefix` como falso no `nuxt.config.js`.

```js
export default {
  static: {
    prefix: false
  }
}
```

Padrão: `/blog/my-image.png`

Com `static.prefix` desabilitado: `/my-image.png`

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
