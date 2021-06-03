---
title: Roteamento do Sistema de Arquivos
description: O Nuxt.js gera automaticamente a configuração do vue-router com base na sua árvore de arquivos Vue dentro do diretório pages. Ao criar um arquivo .vue no diretório pages, você terá um roteamento básico funcionando sem a necessidade de configuração extra.
position: 3
category: features
questions:
  - question: Qual é o nome do componente que você usa para navegar entre as páginas?
    answers:
      - '<a>'
      - '<NuxtLink>'
      - '<Nuxt>'
    correctAnswer: '<NuxtLink>'
  - question: O que você precisa fazer para gerar uma configuração automática do router?
    answers:
      - adicionar um arquivo .vue ao diretório pages
      - criar um arquivo router.config
      - 'adicionar um <NuxtLink> à sua página'
    correctAnswer: adicionar um arquivo .vue ao diretório pages
  - question: Qual das opções a seguir não criará uma rota dinâmica?
    answers:
      - dynamic.vue
      - _slug.vue
      - _slug/index.vue
    correctAnswer: dynamic.vue
  - question: As rotas dinâmicas são ignoradas pelo comando nuxt generate?
    answers:
      - True
      - False
    correctAnswer: False
  - question: Como você acessa os parâmetros de rota de uma página dinâmica, como users/_id.vue?
    answers:
      - $route.params.id
      - $route.id
      - $route.params.users.id
    correctAnswer: $route.params.id
  - question: Como você define o componente pai de uma rota aninhada?
    answers:
      - crie um arquivo Vue chamado pai dentro do diretório que contém as views filhas
      - crie um arquivo Vue com um nome diferente do diretório que contém as views filhas
      - crie um arquivo Vue com o mesmo nome do diretório que contém as views filhas
    correctAnswer: crie um arquivo Vue com o mesmo nome do diretório que contém as visualizações filhas
  - question: Se você disconhece a profundidade de sua estrutura de URL, pode usar qual arquivo para corresponder dinamicamente a caminhos aninhados?
    answers:
      - _.vue
      - _index.vue
      - _id.vue
    correctAnswer: _.vue
  - question: Quais componentes você pode usar para renderizar views nomeadas?
    answers:
      - '<Nuxt> e <Child>'
      - '<Nuxt> e <NuxtChild>'
      - '<NuxtChild> e <NuxtLink>'
    correctAnswer: '<Nuxt> e <NuxtChild>'
  - question: No Nuxt.js, qual arquivo você pode criar para forçar a posição do scroll para o topo de cada rota?
    answers:
      - app/router.scrollBehavior.js
      - app/scrollBehavior.js
      - app/router.js
    correctAnswer: app/router.scrollBehavior.js
  - question: No Nuxt.js, você pode adicionar barras no final da URL que serão anexadas a cada rota?
    answers:
      - true
      - false
    correctAnswer: true
---

O Nuxt.js gera automaticamente a configuração do vue-router com base na sua árvore de arquivos Vue dentro do diretório pages. Ao criar um arquivo .vue no diretório pages, você terá um roteamento básico funcionando sem a necessidade de configuração extra.

Às vezes, você pode precisar criar rotas dinâmicas ou aninhadas ou pode precisar configurar mais a propriedade router. Este capítulo explicará tudo o que você precisa saber para obter o melhor do seu router.

<base-alert type="info">

Nuxt.js oferece code splitting automático para suas rotas, nenhuma configuração é necessária

</base-alert>

<base-alert type="info">

Use o [componente NuxtLink](/docs/2.x/features/nuxt-components#the-nuxtlink-component) para navegar entre páginas

</base-alert>

```html
<template>
  <nuxt-link to="/">Página Inicial</nuxt-link>
</template>
```

## Rotas Básicas

Esta árvore de arquivos:

```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

gerará automaticamente:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

## Rotas dinâmicas

Às vezes, não é possível saber o nome da rota, como quando fazemos uma chamada para uma api para obter uma lista de usuários ou postagens de blog. Chamamos essas rotas dinâmicas. Para criar uma rota dinâmica, você precisa adicionar um sublinhado antes do nome do arquivo .vue ou antes do nome do diretório. Você pode nomear o arquivo ou diretório como quiser, mas deve prefixá-lo com um sublinhado.

Esta árvore de arquivos:

```
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

gerará automaticamente:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

<base-alert type="info">

Como você pode ver a rota chamada `users-id` tem o caminho `:id?`, o que o torna opcional, se você quiser torná-lo obrigatório, crie um arquivo `index.vue` no diretório `users/_id` .

</base-alert>

<base-alert type="info">

A partir do Nuxt >= v2.13, há um rastreador (crawler) instalado que rastreará suas tags de link e gerará suas rotas dinâmicas com base nesses links. No entanto, se você tiver páginas que não estão vinculadas, como uma página secreta, precisará gerar manualmente essas rotas dinâmicas.

</base-alert>

<base-alert type="next">

[Gerar rotas dinâmicas](/docs/2.x/concepts/static-site-generation) para sites estáticos

</base-alert>

### Acessando localmente Parâmetros de Rota

Você pode acessar os parâmetros da rota atual em sua página ou componente local referenciando `this.$route.params.{parameterName}`. Por exemplo, se você tem uma página dinâmica de usuários (`users/_id.vue`) e deseja acessar o parâmetro `id` para carregar as informações do usuário ou do processo, você pode acessar a variável assim: `this.$route.params.id`.

## Rotas Aninhadas

O Nuxt.js permite criar rotas aninhadas usando as rotas filhas do vue-router. Para definir o componente pai de uma rota aninhada, você precisa criar um arquivo Vue com o mesmo nome do diretório que contém as views filhas.

<base-alert>

Não esqueça de incluir o [componente NuxtChild](/docs/2.x/features/nuxt-components#the-nuxtchild-component) dentro do componente pai (arquivo `.vue`).

</base-alert>

Esta árvore de arquivos:

```
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

gerará automaticamente:

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

## Rotas Aninhadas Dinâmicas

Este não é um cenário muito comum, mas com o Nuxt.js é possível ter filhos dinâmicos dentro de pais dinâmicos.

Esta árvore de arquivos:

```
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue
```

gerará automaticamente:

```js
router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```

## Rotas Aninhadas Dinâmicas Desconhecidas

Se você não conhece a profundidade de sua estrutura URL, pode usar `_.vue` para corresponder as rotas dinamicas aninhadas desconhecidas. Isso tratará requests que não correspondem a uma request _mais específica_.

Esta árvore de arquivos:

```
pages/
--| people/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue
```

Tratará requests como esta:

```
/ -> index.vue
/people -> people/index.vue
/people/123 -> people/_id.vue
/about -> _.vue
/about/careers -> _.vue
/about/careers/chicago -> _.vue
```

<base-alert type="info">

O tratamento de páginas 404 agora depende da lógica da página `_.vue`.

</base-alert>

## Estendendo o router

Existem várias maneiras de estender o router com Nuxt:

- [router-extras-module](https://github.com/nuxt-community/router-extras-module) personalizar os parâmetros da rota na página
- componente [@nuxtjs/router](https://github.com/nuxt-community/router-module) para sobrescrever o router do Nuxt e escrever seu próprio arquivo `router.js`
- Usar a propriedade [router.extendRoutes](/docs/2.x/configuration-glossary/configuration-router#extendroutes) no seu `nuxt.config.js`

## A Propriedade router

A propriedade router permite personalizar o router do Nuxt.js (vue-router).

```js{}[nuxt.config.js]
export default {
  router: {
    // personalize o router do Nuxt.js
  }
}
```

### Base:

O URL base da aplicação. Por exemplo, se todo a aplicação de página única é servida em `/app/`, então o base deve usar o valor `'/app/'`.

<base-alert type="next">

[Propriedade Base do Router](/docs/2.x/configuration-glossary/configuration-router#base)

</base-alert>

### extendRoutes

Você pode querer estender as rotas criadas pelo Nuxt.js. Pode fazer isso via a opção `extendRoutes`.

Exemplo de adição de uma rota personalizada:

```js{}[nuxt.config.js]
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  }
}
```

Se você quiser ordenar suas rotas, você pode usar a função `sortRoutes(rotas)` do `@nuxt/utils`:

```js{}[nuxt.config.js]
import { sortRoutes } from '@nuxt/utils'
export default {
  router: {
    extendRoutes(routes, resolve) {
      // Adicione algumas rotas aqui ...

      // e então as ordene
      sortRoutes(routes)
    }
  }
}
```

<base-alert>

O schema deve respeitar o schema do [vue-router](https://router.vuejs.org/en/).

</base-alert>

<base-alert>

Ao adicionar rotas que usam [Views Nomeadas](https://nuxtjs.org/docs/2.x/features/file-system-routing#named-views), não se esqueça de adicionar os `chunkNames` correspondentes dos `componentes` nomeados.

</base-alert>

```js{}[nuxt.config.js]
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/users/:id',
        components: {
          default: resolve(__dirname, 'pages/users'), // ou routes[index].component
          modal: resolve(__dirname, 'components/modal.vue')
        },
        chunkNames: {
          modal: 'components/modal'
        }
      })
    }
  }
}
```

<base-alert type="next">

[A propriedade extendRoutes](/docs/2.x/configuration-glossary/configuration-router#extendroutes)

</base-alert>

### fallback

Controla se o roteador deve retornar ao modo hash quando o navegador não oferece suporte a history.pushState, mas o mode está definido como history.

<base-alert type="next">

[A Propriedade fallback](/docs/2.x/configuration-glossary/configuration-router#fallback)

</base-alert>

### mode

Configure o mode do router, não é recomendado alterá-lo devido à renderização no servidor.

<base-alert type="next">

[A Propriedade mode](/docs/2.x/configuration-glossary/configuration-router#mode)

</base-alert>

### parseQuery / stringifyQuery

Fornece funções personalizadas para fazer o parse / stringify a consulta.

<base-alert type="next">

[As propriedades parseQuery / stringifyQuery](/docs/2.x/configuration-glossary/configuration-router#parsequery--stringifyquery)

</base-alert>

### routeNameSplitter

Você pode querer alterar o separador entre os nomes das rotas que o Nuxt.js usa. Você pode fazer isso através da opção `routeNameSplitter` em seu arquivo de configuração. Imagine que temos o arquivo de página `pages/posts/_id.vue`. O Nuxt.js irá gerar o nome da rota programaticamente, neste caso `posts-id`. Mudando a configuração `routeNameSplitter` para `/` o nome mudará para `posts/id`.

```js{}[nuxt.config.js]
export default {
  router: {
    routeNameSplitter: '/'
  }
}
```

### scrollBehavior

A opção `scrollBehavior` permite definir um comportamento personalizado para a posição de rolagem entre as rotas. Este método é chamado sempre que uma página é renderizada.

<base-alert type="next">

Para saber mais sobre isso veja [a documentação do scrollBehavior do vue-router](https://router.vuejs.org/guide/advanced/scroll-behavior.html). </base-alert>

Disponível desde: v2.9.0:

No Nuxt.js, você pode usar um arquivo para sobrescrever o scrollBehavior do router. Este arquivo deve ser colocado em uma pasta chamada app.

`~/app/router.scrollBehavior.js`.

Exemplo de como forçar a posição de rolagem para o topo de cada rota:

```js{}[app/router.scrollBehavior.js]
export default function (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

<base-alert type="next">

[O arquivo `router.scrollBehavior.js` padrão do Nuxt.js.](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/router.scrollBehavior.js)

</base-alert>

<base-alert type="next">

[A propriedade scrollBehavior](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior)

</base-alert>

### trailingSlash

Disponível desde: v2.10

Se esta opção for definida como true, as barras finais serão anexadas a cada rota. Se definido como false, eles serão removidos.

```js{}[nuxt.config.js]
export default {
  router: {
    trailingSlash: true
  }
}
```

<base-alert>

Esta opção não deve ser definida sem preparação e deve ser testada exaustivamente. Ao definir o `router.trailingSlash` para algo diferente de `undefined` (que é o valor padrão), a rota oposta irá parar de funcionar. Assim, os redirecionamentos de 301 devem estar preparadops e seu _link interno_ deve ser adaptado corretamente. Se você definir `trailingSlash` como `true`, então apenas `example.com/abc/` funcionará, mas não `example.com/abc`. Em false, é o contrário.

</base-alert>

<base-alert type="next">

[A Propriedade trailingSlash](/docs/2.x/configuration-glossary/configuration-router#trailingslash)

</base-alert>

<quiz :questions="questions"></quiz>
