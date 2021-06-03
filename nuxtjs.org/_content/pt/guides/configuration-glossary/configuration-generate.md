---
title: 'A propriedade generate'
description: Configure a geração da sua aplicação web universal para uma aplicação web estática.
menu: generate
category: configuration-glossary
position: 10
---

- Tipo: `Object`

> Configure a geração da sua aplicação web universal para uma aplicação web estática.

Ao chamar `nuxt.generate()`, o Nuxt.js usará a configuração definida na propriedade `generate`.

```js{}[nuxt.config.js]
export default {
  generate: {
    ...
  }
}
```

## cache

> Introduzida em v2.14.0

- Tipo: `Object` ou `false`

Esta opção é usada por `nuxt generate` com o [target static](/docs/2.x/features/deployment-targets#static-hosting) para evitar a reconstrução quando nenhum arquivo rastreado foi alterado.

Padrões:

```js
{
  ignore: [
    '.nuxt', // buildDir
    'static', // dir.static
    'dist', // generate.dir
    'node_modules',
    '.**/*',
    '.*',
    'README.md'
  ]
}
```

Se você quiser evitar a reconstrução ao alterar um arquivo de configuração, basta adicioná-lo à lista fornecendo a opção `cache.ignore`:

```js{}[nuxt.config.js]
export default {
  generate: {
    cache: {
      ignore: ['renovate.json'] // ignora as alterações aplicadas a este arquivo
    }
  }
}
```

## concurrency

- Tipo: `Number`
- Padrão: `500`

A geração de rotas é simultânea, `generate.concurrency` especifica a quantidade de rotas que rodam em uma thread.

## crawler

- Tipo: `boolean`
- Padrão: true

A partir do Nuxt >= v2.13, o Nuxt.js vem com um rastreador (crawler) instalado que rastreará seus links relativos e gerará seus links dinâmicos com base neles. Se você deseja desativar este recurso, você pode definir o valor como `false`.

```js
export default {
  generate: {
    crawler: false
  }
}
```

## dir

- Tipo: `String`
- Padrão: `'dist'`

Nome do diretório criado ao construir a aplicação web em modo estático com `nuxt generate` ou no modo SPA com `nuxt build`.

## devtools

- Tipo: `boolean`
- Padrão: `false`

Configure se deseja permitir a inspeção [vue-devtools](https://github.com/vuejs/vue-devtools).

Se você já ativou por meio de nuxt.config.js ou de outra forma, devtools ativará independentemente do sinalizador.

## exclude

- Tipo: `Array`
  - Itens: `String` ou `RegExp`

Ele aceita um array de strings ou expressões regulares e evita a geração de rotas correspondentes. As rotas ainda estarão acessíveis quando `generate.fallback` for usado.

Tomando estes exemplos de estrutura:

```bash
-| pages/
---| index.vue
---| admin/
-----| about.vue
-----| index.vue
```

Por padrão, executando `nuxt generate`, um arquivo será criado para cada rota.

```bash
-| dist/
---| index.html
---| admin/
-----| about.html
-----| item.html
```

Ao adicionar uma expressão regular que corresponda a todas as rotas com "ignore", impedirá a geração dessas rotas.

```js{}[nuxt.config.js]
export default {
  generate: {
    exclude: [
      /^\/admin/ // caminho inicia com /admin
    ]
  }
}
```

```bash
-| dist/
---| index.html
```

Você também pode excluir uma rota específica fornecendo uma string:

```js{}[nuxt.config.js]
export default {
  generate: {
    exclude: ['/my-secret-page']
  }
}
```

## fallback

- Tipo: `String` ou `Boolean`
- Padrão: `200.html`

```js{}[nuxt.config.js]
export default {
  generate: {
    fallback: '404.html'
  }
}
```

O caminho para o arquivo HTML substituto. Deve ser definido como a página de erro, de modo que rotas desconhecidas também sejam renderizadas via Nuxt. Se não estiver definido ou tiver um valor falso, o nome do arquivo HTML substituto será `200.html`. Se definido como `true`, o nome do arquivo será `404.html`. Se você fornecer uma string como valor, ela será usada em seu lugar.

Ao executar um SPA é mais idiomático usar um `200.html`, pois é o único arquivo necessário, já que nenhuma outra rota será gerada.

```{}[nuxt.config.js]
fallback: false;
```

Se estiver trabalhando com páginas geradas estaticamente, é recomendável usar um `404.html` para páginas de erro e para aquelas abrangidas pelo [excludes](/docs/2.x/configuration-glossary/#exclude) (os arquivos que você não deseja gerar como páginas estáticas).

```js{}[nuxt.config.js]
fallback: true
```

No entanto, o Nuxt permite que você configure qualquer página de sua preferência, então se você não quiser usar o `200.html` ou `404.html`, você pode adicionar uma string e então só precisa ter certeza de redirecionar para essa página. Obviamente, isso não é necessário e é melhor redirecionar para `200.html`/`404.html`.

```js{}[nuxt.config.js]
fallback: 'fallbackPage.html'
```

_Obs: vários serviços (por exemplo, Netlify) detectam o arquivo `404.html` automaticamente. Se você configurar seu servidor web por conta própria, consulte sua documentação para descobrir como configurar uma página de erro (e configurá-la para o arquivo `404.html`)_

## interval

- Tipo: `Number`
- Padrão: `0`

Intervalo entre dois ciclos de renderização para evitar inundar a API com requisições de API vindas da aplicação web.

## minify

- **Depreciado!**
- Use [build.html.minify](/docs/2.x/configuration-glossary/configuration-build#htmlminify) no seu lugar

## routes

- Tipo: `Array`

<base-alert type="info">

A partir do Nuxt v2.13, há um rastreador instalado que rastreará suas tags de link e gerará suas rotas ao executar `nuxt generate`.

Se você tem páginas desvinculadas (como páginas secretas) e deseja que elas também sejam geradas, você pode usar a propriedade `generate.routes`.

</base-alert>

<base-alert>

Rotas dinâmicas são ignoradas pelo comando `generate` ao usar `Nuxt <= v2.12`

</base-alert>

Example:

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

Apenas a rota `/` será gerada pelo Nuxt.js.

Se você deseja que o Nuxt.js gere rotas com parâmetros dinâmicos, você precisa definir a propriedade `generate.routes` para um array de rotas dinâmicas.

Adicionamos as rotas para `/users/:id`:

```js{}[nuxt.config.js]
export default {
  generate: {
    routes: ['/users/1', '/users/2', '/users/3']
  }
}
```

Então, quando lançamos `nuxt generate`:

```bash
[nuxt] Generating...
[...]
nuxt:render Rendering url / +154ms
nuxt:render Rendering url /users/1 +12ms
nuxt:render Rendering url /users/2 +33ms
nuxt:render Rendering url /users/3 +7ms
nuxt:generate Generate file: /index.html +21ms
nuxt:generate Generate file: /users/1/index.html +31ms
nuxt:generate Generate file: /users/2/index.html +15ms
nuxt:generate Generate file: /users/3/index.html +23ms
nuxt:generate HTML Files generated in 7.6s +6ms
[nuxt] Generate done
```

Ótimo, mas e se tivermos **parâmetros dinâmicos**?

1. Use uma `Função` que retorna uma `Promise`.
2. Use uma `Function` com o `callback(err, params)`.

### Função que retorna uma Promise

```js{}[nuxt.config.js]
import axios from 'axios'

export default {
  generate: {
    routes() {
      return axios.get('https://my-api/users').then(res => {
        return res.data.map(user => {
          return '/users/' + user.id
        })
      })
    }
  }
}
```

### Função com callback

```js{}[nuxt.config.js]
import axios from 'axios'

export default {
  generate: {
    routes(callback) {
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => {
            return '/users/' + user.id
          })
          callback(null, routes)
        })
        .catch(callback)
    }
  }
}
```

### Acelerando a geração de rotas dinâmicas com `payload`

No exemplo acima, estamos usando o `user.id` do servidor para gerar as rotas, mas descartando o resto dos dados. Normalmente, precisamos fazer o fetch novamente de dentro de `/users/_id.vue`. Embora possamos fazer isso, provavelmente precisaremos definir o `generate.interval` para algo como `100` para não inundar o servidor com requisições. Como isso aumentará o tempo de execução do script de geração, seria preferível passar todo o objeto `user` para o contexto em `_id.vue`. Fazemos isso modificando o código acima para:

```js{}[nuxt.config.js]
import axios from 'axios'

export default {
  generate: {
    routes() {
      return axios.get('https://my-api/users').then(res => {
        return res.data.map(user => {
          return {
            route: '/users/' + user.id,
            payload: user
          }
        })
      })
    }
  }
}
```

Agora podemos acessar o `payload` de `/users/_id.vue` assim:

```js
async asyncData ({ params, error, payload }) {
  if (payload) return { user: payload }
  else return { user: await backend.fetchUser(params.id) }
}
```

## subFolders

- Tipo: `Boolean`
- Padrão: `true`

Por padrão, ao executar `nuxt generate`, Nuxt.js criará um diretório para cada rota e servir um arquivo `index.html`.

Exemplo:

```bash
-| dist/
---| index.html
---| about/
-----| index.html
---| products/
-----| item/
-------| index.html
```

Quando definido como falso, os arquivos HTML são gerados de acordo com o caminho da rota:

```js{}[nuxt.config.js]
export default {
  generate: {
    subFolders: false
  }
}
```

```bash
-| dist/
---| index.html
---| about.html
---| products/
-----| item.html
```
