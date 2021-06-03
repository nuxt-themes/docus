---
title: Componentes Nuxt
description: O Nuxt.js vem com alguns componentes importantes incluídos, que serão úteis ao construir seu aplicativo.
position: 9
category: features
csb_link_nuxt_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/09_components_nuxt-link?fontsize=14&hidenavigation=1&theme=dark
csb_link_nuxt: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/09_components_nuxt?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Qual componente você usa para exibir os componentes da sua página?
    answers:
      - '<Nuxt>'
      - '<Page>'
      - '<Views>'
    correctAnswer: '<Nuxt>'
  - question: O componente `<Nuxt>` pode ser usado em?
    answers:
      - components
      - pages
      - layouts
    correctAnswer: layouts
  - question: Qual componente é usado para exibir os componentes filhos em uma rota aninhada?
    answers:
      - '<Nuxt>'
      - '<NuxtChild>'
      - '<Children>'
    correctAnswer: '<NuxtChild>'
  - question: Onde você insere o componente `<NuxtChild>`?
    answers:
      - pages/filho.vue
      - pages/pai.vue
      - layouts/pai.vue
    correctAnswer: pages/pai.vue
  - question: '`keep-alive` pode ser usado em'
    answers:
      - 'apenas no componente <Nuxt>'
      - 'nos componentes <Nuxt> e <NuxtChild>'
      - 'apenas no componente <NuxtChild>'
    correctAnswer: 'nos componentes <Nuxt> e <NuxtChild>'
  - question: Qual componente usamos para fazer um link para páginas internas?
    answers:
      - '<NuxtLink>'
      - '<RouterLink>'
      - '<a>'
    correctAnswer: '<NuxtLink>'
  - question: 'Como você faz um link para a página Sobre Mim, em sua aplicação, usando <NuxtLink>?'
    answers:
      - to="/about"
      - href="/about"
      - link="/about"
    correctAnswer: to="/about"
  - question: Qual chave você usa para desativar o prefetch para certas páginas?
    answers:
      - no-prefetch
      - :prefetch="false"
      - no-prefetch e :prefetch="false"
    correctAnswer: no-prefetch e :prefetch="false"
  - question: Qual é a classe padrão que você pode usar para adicionar estilos para links ativos?
    answers:
      - nuxt-link-active
      - link-active
      - router-link-active
    correctAnswer: nuxt-link-active
  - question: Qual é a classe padrão que você pode usar para adicionar estilos para links ativos exatos?
    answers:
      - nuxt-link-exact-active
      - link-exact-active
      - nuxt-exact-active-link
    correctAnswer: nuxt-link-exact-active
  - question: No Nuxt ≥ 2.9.0 qual componente você usa para que seu componente seja renderizado apenas no lado do cliente?
    answers:
      - '<client-only>'
      - '<no-ssr>'
      - '<client>'
    correctAnswer: '<client-only>'
---

O Nuxt.js vem com alguns componentes importantes incluídos, que serão úteis ao construir sua aplicação. Os componentes estão disponíveis globalmente, o que significa que você não precisa importá-los para usá-los.

Nos parágrafos a seguir, explicamos sobre cada um deles.

## O Componente Nuxt

O componente `<Nuxt>` é o componente que você usa para exibir os componentes da página. Basicamente, este componente é substituído pelo que está dentro dos componentes da sua página, dependendo da página que está sendo exibida. Portanto, é importante que você adicione o componente `<Nuxt>` aos seus layouts.

```html{}[layouts/default.vue]
<template>
  <div>
    <div>Minha barra de navegação</div>
    <Nuxt />
    <div>Meu rodapé</div>
  </div>
</template>
```

<base-alert>

O componente `<Nuxt>` só pode ser usado dentro de [layouts](/docs/2.x/concepts/views#layouts).

</base-alert>

O componente `<Nuxt>` pode receber a prop `nuxt-child-key`. Esta prop será passada para o `<RouterView>` para que suas transições funcionem corretamente dentro das páginas dinâmicas.

Existem 2 maneiras de lidar com a prop `key` interna do `<RouterView>`.

1. Use a prop `nuxtChildKey` em seu componente `<Nuxt>`

```html{}[layouts/default.vue]
<template>
  <div>
    <Nuxt :nuxt-child-key="someKey" />
  </div>
</template>
```

2. Adicione a opção `key` em componentes _page_ passando uma `string` ou `função`

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```

## O Componente NuxtChild

Este componente é usado para exibir os componentes filhos em uma rota aninhada.

Exemplo:

```
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

Esta árvore de arquivos irá gerar estas rotas:

```js
;[
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~/pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```

Para exibir o componente `child.vue`, você deve inserir o componente `<NuxtChild>` dentro de `pages/parent.vue`:

```html{}[pages/parent.vue]
<template>
  <div>
    <h1>Eu sou a view pai</h1>
    <NuxtChild :foobar="123" />
  </div>
</template>
```

## keep-alive

Ambos, o componente `<Nuxt>` e o componente `<NuxtChild />`, aceitam `keep-alive` e `keep-alive-props`.

<base-alert type="info">

Para saber mais sobre keep-alive e keep-alive-props, consulte a [documentação do vue](https://vuejs.org/v2/api/#keep-alive)

</base-alert>

```html{}[layouts/default.vue]
<template>
  <div>
    <Nuxt keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- será convertido em algo assim -->
<div>
  <KeepAlive :exclude="['modal']">
    <RouterView />
  </KeepAlive>
</div>
```

```html{}[pages/parent.vue]
<template>
  <div>
    <NuxtChild keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- será convertido em algo assim -->
<div>
  <KeepAlive :exclude="['modal']">
    <RouterView />
  </KeepAlive>
</div>
```

Os componentes `<NuxtChild>` também podem receber propriedades como um componente Vue normal.

```html
<template>
  <div>
    <NuxtChild :key="$route.params.id" />
  </div>
</template>
```

Para ver um exemplo, dê uma olhada no [exemplo de rotas aninhadas](/examples/nested-routes).

<app-modal>
  <code-sandbox  :src="csb_link_nuxt"></code-sandbox>
</app-modal>

## O Componente NuxtLink

Para navegar entre as páginas da sua aplicação, você deve usar o componente `<NuxtLink>`. Este componente está incluído no Nuxt.js e, portanto, você não precisa importá-lo como faz com outros componentes. É semelhante à tag HTML `<a>` exceto que em vez de usar `href="/about"` você usa `to="/about"`. Se você já usou `vue-router` antes, pode pensar em `<NuxtLink>` como uma substituição de `<RouterLink>`.

Um link simples para a página `index.vue` em sua pasta `pages`:

```html
<template>
  <NuxtLink to="/">Página Inicial</NuxtLink>
</template>
```

O componente `<NuxtLink>` deve ser usado para todos os links internos. Isso significa que em todos os links para as páginas de seu site, você deve usar `<NuxtLink>`. A tag `<a>` deve ser usada para todos os links externos. Isso significa que se você tem links para outros sites, deve usar a tag `<a>` para eles.

```html
<template>
  <div>
    <h1>Página Inicial</h1>
    <NuxtLink to="/about"
      >Sobre Mim (link interno que pertence a aplicação Nuxt)</NuxtLink
    >
    <a href="https://nuxtjs.org">Link externo para outra página</a>
  </div>
</template>
```

<base-alert type="info">

Se você quiser saber mais sobre `<RouterLink>`, sinta-se à vontade para ler a [documentação do Vue Router](https://router.vuejs.org/api/#router-link) para mais informações.

</base-alert>

<base-alert type="info">

`<NuxtLink>` também vem com [prefetching inteligente](/docs/2.x/features/nuxt-components#the-nuxtlink-component) ativado.

</base-alert>

## prefetchLinks

O Nuxt.js inclui automaticamente o prefetch inteligente. Isso significa que ele detecta quando um link está visível, seja no viewport ou quando tiver rolando a página (scrolling), e faz prefetch do JavaScript para essas páginas para que estejam prontas quando o usuário clicar no link. O Nuxt.js carrega os recursos apenas quando o navegador não está ocupado e pula o prefetch se você estiver offline ou se você tiver apenas uma conexão 2g.

### Desativar o prefetch para links específicos

No entanto, às vezes você pode querer desabilitar o prefetch em alguns links se sua página tiver muito JavaScript ou se você tiver muitas páginas diferentes que seriam feito o prefetch ou se tiver muitos scripts de terceiros que precisam ser carregados. Para desativar o prefetch em um link específico, você pode usar a prop `no-prefetch`. Desde Nuxt.js v2.10.0, você também pode usar a prop `prefetch` definido como `false`.

```html
<NuxtLink to="/about" no-prefetch
  >Página Sobre Mim que não foi feito o prefetch</NuxtLink
>
<NuxtLink to="/about" :prefetch="false"
  >Página Sobre Mim que não foi feito o prefetch</NuxtLink
>
```

### Desativar prefetch globalmente

Para desativar o prefetch em todos os links, defina `prefetchLinks` como `false`:

```js{}[nuxt.config.js]
export default {
  router: {
    prefetchLinks: false
  }
}
```

Desde Nuxt.js v2.10.0, se você definiu `prefetchLinks` como `false`, mas deseja fazer o prefetch em um link específico, você pode usar a prop `prefetch`:

```html
<NuxtLink to="/about" prefetch
  >Página Sobre Mim que foi feito o prefetch</NuxtLink
>
```

## linkActiveClass

O `linkActiveClass` funciona da mesma forma que a classe do `vue-router` para links ativos. Se quisermos mostrar quais links estão ativos, tudo o que você precisa fazer é criar alguns css para a classe `nuxt-link-active`.

```css
.nuxt-link-active {
  color: red;
}
```

<base-alert>

Este css pode ser adicionado ao componente de navegação ou para uma página ou layout específico ou em seu arquivo main.css.

</base-alert>

Se desejar, você também pode dar outro nome a essa classe. Você pode fazer isso modificando o `linkActiveClass` na propriedade do roteador em seu arquivo `nuxt.config.js`.

```js
export default {
  router: {
    linkActiveClass: 'my-custom-active-link'
  }
}
```

<base-alert type="info">

Esta opção é fornecida diretamente ao linkActiveClass do `vue-router`. Veja a [documentação do vue-router](https://router.vuejs.org/api/#active-class) para mais informações.

</base-alert>

## linkExactActiveClass

O `linkExactActiveClass` funciona da mesma forma que a classe do `vue-router` para links ativos exatos. Se quisermos mostrar quais links estão ativos com uma correspondência exata, tudo o que você precisa fazer é criar alguns css para a classe `nuxt-link-exact-active`.

```css
.nuxt-link-exact-active {
  color: green;
}
```

<base-alert type="info">

Este css pode ser adicionado ao componente de navegação ou para uma página ou layout específico ou em seu arquivo main.css.

</base-alert>

Se desejar, você também pode dar outro nome a essa classe. Você pode fazer isso modificando o `linkExactActiveClass` na propriedade do roteador em seu arquivo `nuxt.config.js`.

```js{}[nuxt.config.js]
export default {
  router: {
    linkExactActiveClass: 'my-custom-exact-active-link'
  }
}
```

<base-alert type="info">

Esta opção é fornecida diretamente ao linkExactActiveClass do `vue-router`. Veja a [documentação](https://router.vuejs.org/api/#exact-active-class) do [vue-router](https://router.vuejs.org/api/#active-class) para mais informações

</base-alert>

## linkPrefetchedClass

O linkPrefetchedClass permitirá que você adicione estilos para todos os links que foram feito prefetch. Isso é ótimo para testar quais links estão sendo feito o prefetch após a modificação do comportamento padrão. O linkPrefetchedClass é desabilitado por padrão. Se você deseja habilitá-lo, você precisa adicioná-lo à propriedade do router no seu arquivo `nuxt-config.js`.

```js{}[nuxt.config.js]
export default {
  router: {
    linkPrefetchedClass: 'nuxt-link-prefetched'
  }
}
```

Em seguida, você pode adicionar os estilos para essa classe.

```css
.nuxt-link-prefetched {
  color: orangeRed;
}
```

<base-alert type="info">

Neste exemplo, usamos a classe `nuxt-link-prefetched`, mas você pode nomeá-la como quiser

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link_nuxt_link"></code-sandbox>
</app-modal>

## O Componente client-only

Este componente é usado para renderizar propositadamente um componente apenas no lado do cliente. Para importar um componente apenas no cliente, registre o componente em um plugin específico do lado do cliente.

```html{}[pages/example.vue]
<template>
  <div>
    <sidebar />
    <client-only placeholder="Loading...">
      <!-- este componente só será renderizado no lado do cliente -->
      <comments />
    </client-only>
  </div>
</template>
```

Use um slot como placeholder até que `<client-only />` seja montado no lado do cliente.

```html{}[pages/example.vue]
<template>
  <div>
    <sidebar />
    <client-only>
      <!-- este componente só será renderizado no lado do cliente -->
      <comments />

      <!-- indicador de carregamento, renderizado no lado do servidor -->
      <comments-placeholder slot="placeholder" />
    </client-only>
  </div>
</template>
```

<base-alert>

Se você estiver usando uma versão do Nuxt < v2.9.0, use `<no-ssr>` em vez de `<client-only>`

</base-alert>

<quiz :questions="questions"></quiz>
