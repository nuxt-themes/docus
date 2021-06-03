---
title: 'A propriedade env'
description: Compartilhe variáveis ​​de ambiente entre cliente e servidor.
menu: env
category: configuration-glossary
position: 8
---

- Tipo: `Object`

> Nuxt.js permite criar variáveis ​​de ambiente do lado do cliente e para serem compartilhadas do lado do servidor.

A propriedade env define as variáveis ​​de ambiente que devem estar disponíveis no lado do cliente. Eles podem ser atribuídos usando variáveis ​​de ambiente do lado do servidor, o [módulo dotenv](https://github.com/nuxt-community/dotenv-module) ou semelhantes.

**Certifique-se de ler sobre `process.env` e `process.env == {}` abaixo para uma melhor solução de problemas.**

```js{}[nuxt.config.js]
export default {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

Isso permite criar a propriedade `baseUrl` que será igual à variável de ambiente do lado do servidor `BASE_URL` se disponível ou definida. Caso contrário, `baseUrl` no lado do cliente será igual a `'http://localhost:3000'`. A variável do lado do servidor BASE_URL é, portanto, copiada para o lado do cliente através da propriedade `env` no `nuxt.config.js`. Como alternativa, o outro valor é definido (http://localhost:3000).

Então, posso acessar minha variável `baseUrl` de 2 maneiras:

1. Via `process.env.baseUrl`.
2. Via `context.env.baseUrl`, veja a [API do contexto](/docs/2.x/internals-glossary/context).

Você pode usar a propriedade `env` para fornecer um token público, por exemplo.

Para o exemplo acima, podemos usá-lo para configurar [axios](https://github.com/mzabriskie/axios).

```js{}[plugins/axios.js]
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

Então, em suas páginas, você pode importar axios como este: `import axios from '~/plugins/axios'`

## Injeção automática de variáveis ​​de ambiente

Se você definir variáveis ​​de ambiente começando com `NUXT_ENV_` na fase de build (por exemplo,`NUXT_ENV_PALAVRA_LEGAL = congelando nuxt build`, elas serão injetadas automaticamente no ambiente de processo. Esteja ciente de que elas, potencialmente, terão precedência sobre as variáveis ​​definidas em seu `nuxt.config.js` com o mesmo nome.

## process.env == {}

Observe que o Nuxt usa `definePlugin` do webpack para definir a variável de ambiente. Isso significa que o `process` ou `process.env` real do Node.js não está disponível nem definido. Cada uma das propriedades `env` definidas em nuxt.config.js é mapeada individualmente para `process.env.xxxx` e convertida durante a compilação.

Significando, `console.log(process.env)` exibirá `{}` mas `console.log (process.env.sua_variavel)` ainda exibirá seu valor. Quando o webpack compila seu código, ele substitui todas as instâncias de `process.env.sua_variavel` para o valor que você definiu. ou seja: `env.teste = 'testando123'`. Se você usar `process.env.teste` em seu código em algum lugar, na verdade ele é traduzido para 'testing123'.

antes

```js
if (process.env.test == 'testing123')
```

depois

```js
if ('testing123' == 'testing123')
```

## serverMiddleware

Como o [serverMiddleware](/docs/2.x/configuration-glossary/configuration-servermiddleware) é desacoplado do build principal do Nuxt, as variáveis ​​`env` definidas em `nuxt.config.js` não estão disponíveis lá.
