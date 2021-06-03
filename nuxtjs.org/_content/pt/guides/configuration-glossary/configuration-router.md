---
title: 'A propriedade router'
description: A propriedade router permite personalizar o roteador Nuxt.js.
menu: router
category: configuration-glossary
position: 24
---

> A propriedade router permite personalizar o roteador Nuxt.js ([vue-router](https://router.vuejs.org/en/)).

## base

- Tipo: `String`
- Padrão: `'/'`

A URL base da aplicação. Por exemplo, se todo a aplicação de página única é servida em `/app/`, então o base deve usar o valor `'/app/'`.

Isso pode ser útil se você precisar servir o Nuxt com uma raiz de contexto diferente, em um site maior. Observe que você pode ou não configurar um Servidor Web Proxy Frontal.

Se você quiser ter um redirecionamento para `router.base`, você pode fazer isso [usando um hook. Consulte _Redirecionar para router.base quando não estiver em root_](/docs/2.x/configuration-glossary/configuration-hooks#redirect-to-routerbase-when-not-on-root).

```js{}[nuxt.config.js]
export Padrão {
  router: {
    base: '/app/'
  }
}
```

<div class="Alert Alert-blue">

Quando `base` é definido, o Nuxt.js também adiciona no cabeçalho do documento `<base href="{{router.base}}" />`.

</div>

> Esta opção é fornecida diretamente ao [base](https://router.vuejs.org/api/#base) do vue-router.

## routeNameSplitter

- Tipo: `String`
- Padrão: `'-'`

Você pode querer alterar o separador entre os nomes das rotas que o Nuxt.js usa. Você pode fazer isso através da opção `routeNameSplitter` em seu arquivo de configuração. Imagine que temos o arquivo de página `pages/posts/_id.vue`. O Nuxt gerará o nome da rota programaticamente, neste caso `posts-id`. Mudando a configuração `routeNameSplitter` para `/` o nome mudará para `posts/id`.

```js{}[nuxt.config.js]
export Padrão {
  router: {
    routeNameSplitter: '/'
  }
}
```

## extendRoutes

- Tipo: `Function`

Você pode querer estender as rotas criadas pelo Nuxt.js. Você pode fazer isso através da opção `extendRoutes`.

```js{}[nuxt.config.js]
export Padrão {
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
export Padrão {
  router: {
    extendRoutes(routes, resolve) {
      // Adicione algumas rotas aqui ...

      // e, em seguida, ordene-as
      sortRoutes(routes)
    }
  }
}
```

O esquema da rota deve respeitar o esquema do [vue-router](https://router.vuejs.org/en/).

<base-alert>

Ao adicionar rotas que usam Views Nomeadas, não se esqueça de adicionar os `chunkNames` correspondentes dos `componentes` nomeados.

</base-alert>

```js{}[nuxt.config.js]
export Padrão {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/users/:id',
        components: {
          Padrão: resolve(__dirname, 'pages/users'), // ou routes[index].component
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

## fallback

- Tipo: `boolean`
- Padrão: `false`

Controla se o roteador deve retornar ao modo hash quando o navegador não oferece suporte a history.pushState, mas o modo está definido como history.

Definir isso como falso, essencialmente, torna cada navegação do router-link um recarregamento completo da página no IE9. Isso é útil quando a aplicação é renderizada pelo servidor e precisa funcionar no IE9, porque um URL de modo hash não funciona com SSR.

> Esta opção é fornecida diretamente ao [fallback](https://router.vuejs.org/api/#fallback) do vue-router .

## linkActiveClass

- Tipo: `String`
- Padrão: `'nuxt-link-active'`

Configure globalmente a classe active padrão [`<nuxt-link>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component).

```js{}[nuxt.config.js]
export Padrão {
  router: {
    linkActiveClass: 'active-link'
  }
}
```

> Esta opção é fornecida diretamente ao [linkactiveclass](https://router.vuejs.org/api/#linkactiveclass) do vue-router.

## linkExactActiveClass

- Tipo: `String`
- Padrão: `'nuxt-link-exact-active'`

Configure globalmente a classe exact ative padrão do [`<nuxt-link>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component).

```js{}[nuxt.config.js]
export Padrão {
  router: {
    linkExactActiveClass: 'exact-active-link'
  }
}
```

> Esta opção é fornecida diretamente ao [linkexactactiveclass](https://router.vuejs.org/api/#linkexactactiveclass) do vue-router.

## linkPrefetchedClass

- Tipo: `String`
- Padrão: `false`

Configure globalmente a classe prefetch padrão do [`<nuxt-link>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component) (recurso desabilitado por padrão).

```js{}[nuxt.config.js]
export Padrão {
  router: {
    linkPrefetchedClass: 'nuxt-link-prefetched'
  }
}
```

## middleware

- Tipo: `String` ou `Array`
  - Itens: `String`

Defina o(s) middleware(s) padrão(ões) para cada página da aplicação.

```js{}[nuxt.config.js]
export Padrão {
  router: {
    // Execute o middleware/user-agent.js em cada página
    middleware: 'user-agent'
  }
}
```

```js{}[middleware/user-agent.js]
export Padrão function (context) {
  // Adicione a propriedade userAgent no contexto (disponível em `asyncData` e `fetch`)
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

Para saber mais sobre o middleware, consulte o [guia de middleware](/docs/2.x/directory-structure/middleware#router-middleware).

## mode

- Tipo: `String`
- Padrão: `'history'`

Configure o modo do roteador. Não é recomendável alterá-lo devido à renderização do lado do servidor.

```js{}[nuxt.config.js]
export Padrão {
  router: {
    mode: 'hash'
  }
}
```

> Esta opção é fornecida diretamente ao [mode](https://router.vuejs.org/api/#mode) do vue-router.

## parseQuery / stringifyQuery

- Tipo: `Function`

Fornece funções personalizadas as funções de parse / stringify. Substitui o Padrão.

> Esta opção é fornecida diretamente ao [parseQuery / stringifyQuery](https://router.vuejs.org/api/#parsequery-stringifyquery) do vue-router.

## prefetchLinks

> Adicionado com Nuxt v2.4.0

- Tipo: `Boolean`
- Padrão: `true`

Configure `<nuxt-link>` para o prefetch da página _com código dividido (code-splitted)_ quando detectada na viewport. Requer [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) para ser suportado (consulte [CanIUse](https://caniuse.com/#feat=intersectionobserver)) .

Recomendamos o polyfilling condicional deste recurso com um serviço como [Polyfill.io](https://polyfill.io):

```js{}[nuxt.config.js]
export Padrão {
  head: {
    script: [
      {
        src:
          'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver',
        body: true
      }
    ]
  }
}
```

Para desabilitar o prefetch em um link específico, você pode usar a prop `no-prefetch`. Desde Nuxt.js v2.10.0, você também pode usar o prop `prefetch` definido como `false`:

```html
<nuxt-link to="/about" no-prefetch
  >Página Sobre Mim que não foi feito o prefetch<nuxt-link>
    <nuxt-link to="/about" :prefetch="false"
      >Página Sobre Mim que não foi feito o prefetch</nuxt-link
    ></nuxt-link
  ></nuxt-link
>
```

Para desativar o prefetch em todos os links, defina `prefetchLinks` como `false`:

```js{}[nuxt.config.js]
export Padrão {
  router: {
    prefetchLinks: false
  }
}
```

Desde o Nuxt.js v2.10.0, se você definiu `prefetchLinks` como `false`, mas deseja fazer o prefetch de um link específico, você pode usar oa prop `prefetch`:

```html
<nuxt-link to="/about" prefetch
  >Página Sobre Mim que foi feito prefetch</nuxt-link
>
```

## prefetchPayloads

> Adicionado com v2.13.0, disponível apenas para [target static](/docs/2.x/features/deployment-targets#static-hosting).

- Tipo: `Boolean`
- Padrão: `true`

Ao usar `nuxt generate` com `target: 'static'`, Nuxt gerará um `payload.js` para cada página.

Com esta opção habilitada, o Nuxt fará o prefetch automaticamente do payload da página vinculada quando o `<nuxt-link>` estiver visível na viewport, tornando a **navegação instantânea**.

<base-alert Tipo="info">

Esta opção depende a opção [prefetchLinks](#prefetchlinks) habilitada.

</base-alert>

Você pode desativar esse comportamento definindo `prefetchPaylods` como `false`:

```js{}[nuxt.config.js]
export Padrão {
  router: {
    prefetchPayloads: false
  }
}
```

## scrollBehavior

- Tipo: `Function`

A opção `scrollBehavior` permite definir um comportamento personalizado para a posição de rolagem entre as rotas. Este método é chamado sempre que uma página é renderizada. Para saber mais sobre isso, consulte a [documentação do scrollBehavior do vue-router](https://router.vuejs.org/guide/advanced/scroll-behavior.html).

<div class="Alert Alert-blue">

A partir da v2.9.0, você pode usar um arquivo para sobrescrever o scrollBehavior do roteador. Esse arquivo deve ser colocado em `~/app/router.scrollBehavior.js` (nota: o nome do arquivo diferencia maiúsculas de minúsculas se for executado no Windows).

</div>

Você pode ver o arquivo do `router.scrollBehavior.js` padrão do Nuxt aqui: [packages/vue-app/template/router.scrollBehavior.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/router.scrollBehavior.js).

Exemplo de como forçar a posição de rolagem para o topo de todas as rotas:

`app/router.scrollBehavior.js`

```js{}[app/router.scrollBehavior.js]
export Padrão function (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

## trailingSlash

- Tipo: `Boolean` or `undefined`
- Padrão: `undefined`
- Disponível desde: v2.10

Se esta opção for definida como verdadeira, barras finais serão anexadas a cada rota. Se definido como falso, elas serão removidas.

**Atenção**: Esta opção não deve ser definida sem preparação e deve ser testada exaustivamente. Ao definir `router.trailingSlash` para algo diferente de `undefined`, a rota oposta irá parar de funcionar. Portanto, os redirecionamentos 301 devem estar em vigor e seus _links internos_ devem ser adaptados corretamente. Se você definir `trailingSlash` como `true`, então apenas `example.com/abc/` funcionará, mas não `example.com/abc`. Em falso, é vice-versa
