---
title: Meta Tags e SEO
description: Nuxt.js permite que você defina todas as tags `<meta>` padrão para sua aplicação dentro do arquivo nuxt.config.js usando a propriedade head. Isso é muito útil para adicionar um título e uma tag de descrição padrão para fins de SEO ou para definir a viewport ou adicionar o favicon.
position: 6
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/06_meta_tags_seo?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Onde você define o título e as meta descrições globalmente?
    answers:
      - no componente de página
      - no nuxt.config.js
      - no package.json
    correctAnswer: no nuxt.config.js
  - question: Onde você define o título e as meta descrições localmente?
    answers:
      - no componente de página
      - no nuxt.config.js
      - no componente seo
    correctAnswer: no componente de página
  - question: Em pages, para obter acesso ao data em seu título ou descrição meta, você usa a
    answers:
      - função meta
      - função head
      - função seo
    correctAnswer: função head
  - question: Você pode carregar recursos externos apenas no nuxt.config.js?
    answers:
      - true
      - false
    correctAnswer: false
  - question: Para incluir scripts antes da tag de fechamento do body, use
    answers:
      - 'body: true'
      - 'body: false'
      - 'scripts: true'
    correctAnswer: 'body: true'
---

O Nuxt.js oferece três maneiras diferentes de adicionar metadados ao seu aplicativo:

1. Globalmente utilizando o nuxt.config.js
2. Localmente utilizando a head como um objeto
3. Localmente utilizando a head como uma função para que você tenha acesso as propriedades data e computed.

### Configuração Global

Nuxt.js permite que você defina todas as tags `<meta>` padrão para sua aplicação dentro do arquivo nuxt.config.js usando a propriedade head. Isso é muito útil para adicionar um título e uma tag de descrição padrão para fins de SEO ou para definir a viewport ou adicionar o favicon.

```js{}[nuxt.config.js]
export default {
  head: {
    title: 'título do meu site',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'descrição do meu site'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  }
}
```

<base-alert type="info">

Isso lhe dará o mesmo título e descrição em todas as páginas

</base-alert>

### Configuração Local

Você também pode adicionar títulos e meta para cada página usando o método `head` dentro de sua tag de script em cada página.

```js{}[pages/index.vue]
<script>
export default {
  head: {
    title: 'Página Inicial',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Descrição da Página Inicial'
      }
    ],
  }
}
</script>
```

<base-alert type="info">

Use `head` como um objeto para definir um título e uma descrição apenas para a página inicial

</base-alert>

```html{}[pages/index.vue]
<template>
  <h1>{{ title }}</h1>
</template>
<script>
  export default {
    data() {
      return {
        title: 'Página Inicial'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Description da Página Inicial'
          }
        ]
      }
    }
  }
</script>
```

<base-alert type="info">

Use `head` como uma função para definir um título e uma descrição apenas para a página inicial. Ao usar uma função, você tem acesso as propriedades data e computed

</base-alert>

O Nuxt.js usa [vue-meta](https://vue-meta.nuxtjs.org/) para atualizar a head do documento e os atributos meta da sua aplicação.

<base-alert>

Para evitar qualquer duplicação quando usado em componentes filhos, forneça um identificador único com a chave `hid` para a descrição meta. Desta forma, `vue-meta` saberá que deve sobrescrever a tag padrão.

</base-alert>

<base-alert type="next">

Saiba mais sobre as opções disponíveis para`head`na [documentação do vue-meta](https://vue-meta.nuxtjs.org/api/#metainfo-properties).

</base-alert>

## Recursos Externos

Você pode incluir recursos externos, como scripts e fontes, adicionando-os globalmente ao `nuxt.config.js` ou localmente no objeto ou função `head`.

<base-alert type="info">

Você também pode passar para cada recurso uma opção `body: true` opcional para incluir o recurso antes da tag de fechamento `</body>`.

</base-alert>

### Configurações Globais

```js{}[nuxt.config.js]
export default {
  head: {
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
      }
    ]
  }
}
```

### Configurações Locais

```html{}[pages/index.vue]
<template>
  <h1>Página Sobre Mim com jQuery e fonte Roboto</h1>
</template>

<script>
  export default {
    head() {
      return {
        script: [
          {
            src:
              'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
          }
        ],
        link: [
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-family: Roboto, sans-serif;
  }
</style>
```

## Resource Hints

Adiciona links de prefetch e preload para um carregamento mais rápido da página inicial.

Você pode querer desativar esta opção se tiver muitas páginas e rotas.

<base-alert type="next">

[Resource Hints](/docs/2.x/configuration-glossary/configuration-render#resourcehints)

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
