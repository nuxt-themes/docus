---
title: 'A propriedade render'
description: Nuxt.js permite personalizar opções do runtime para renderizar as páginas
menu: render
category: configuration-glossary
position: 22
---

> Nuxt.js permite personalizar opções do runtime para renderizar as páginas

## bundleRenderer

- Tipo: `Object`

> Use esta opção para personalizar o renderizador de pacotes SSR do vue. Esta opção é ignorada para o modo spa.

```js{}[nuxt.config.js]
export default {
  render: {
    bundleRenderer: {
      directives: {
        custom1(el, dir) {
          // alguma coisa ...
        }
      }
    }
  }
}
```

Saiba mais sobre as opções disponíveis na [API de referência do Vue SSR](https://ssr.vuejs.org/en/api.html#renderer-options). Recomenda-se não usar essa opção, pois o Nuxt.js já está fornecendo os melhores padrões de SSR e a configuração incorreta pode levar a problemas de SSR.

## etag

- Tipo: `Object`
  - Padrão: `{ weak: true }`

Para desativar etag para páginas, defina `etag: false`.

Consulte a documentação do [etag](https://www.npmjs.com/package/etag) para as opções disponíveis.

Você pode usar sua própria função hash especificando `etag.hash`:

```js{}[nuxt.config.js]
import { murmurHash128 } from 'murmurhash-native'

export default {
  render: {
    etag: {
      hash: html => murmurHash128(html)
    }
  }
}
```

Neste caso, usamos [murmurhash-native](https://github.com/royaltm/node-murmurhash-native), que é mais rápido para body de HTML maiores. Observe que a opção `weak` é ignorada ao especificar sua própria função hash.

## compressor

- Tipo `Object`
  - Padrão: `{ threshold: 0 }`

Ao fornecer um objeto, o middleware [compression](https://www.npmjs.com/package/compression) será usado (com as respectivas opções).

Se você deseja usar seu próprio middleware de compactação, pode referenciá-lo diretamente (por exemplo, `outroComp({ minhasOpcoes: 'exemplo' })`).

Para desabilitar a compressão, use `compressor: false`.

## fallback

- Tipo `Object`
  - Padrão: `{ dist: {}, static: { skipUnknown: true } }`

> Opções para o middleware [serve-placeholder](https://github.com/nuxt/serve-placeholder).

Se você deseja desabilitar um deles ou ambos, você pode passar um valor falso.

## http2

- Tipo `Object`
  - Padrão: `{ push: false, pushAssets: null }`

> Ative cabeçalhos HTTP2 de envio.

Você pode controlar quais links enviar usando a função `pushAssets`.

Exemplo:

```js
pushAssets: (req, res, publicPath, preloadFiles) =>
  preloadFiles
    .filter(f => f.asType === 'script' && f.file === 'runtime.js')
    .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
```

Você também pode adicionar seus próprios assets ao array. Usando `req` e `res` você pode decidir quais links enviar com base nos cabeçalhos de requisição, por exemplo, usando o cookie com a versão da aplicação.

Os assets serão unidos com `,` e passados ​​como um único cabeçalho `Link`.

## injectScripts

- Tipo: `Boolean`
  - Padrão: `true`

> Adiciona o `<script>` para pacotes Nuxt. Defina-o como `false` para renderizar HTML puro sem JS (disponível com`2.8.0+`)

## resourceHints

- Tipo: `Boolean`
  - Padrão: `true`

> Adiciona links `prefetch` e `preload` para o carregamento da página inicial mais rápido.

Você pode querer desabilitar esta opção apenas se tiver muitas páginas e rotas.

## ssr

- Tipo: `Boolean`
  - Padrão: `true` no modo universal e `false` no modo spa

> Ativa a renderização SSR

Esta opção é definida automaticamente com base no valor `mode`, se não for fornecida. Isso pode ser útil para ativar/desativar o SSR dinamicamente no tempo de execução, após a criação de imagens (com docker, por exemplo).

## crossorigin

- Tipo: `String`
- Padrão: `undefined`

  Configure o atributo `crossorigin` nas tags `<link rel="stylesheet">`e`<script>` no HTML gerado.

  Mais informações: [Atributos de configurações CORS](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes)

## ssrLog

- Tipo: `Boolean` | `String`
  - Padrão: `true` no modo dev e `false` em produção

> Encaminha os logs do lado do servidor para o navegador para melhor depuração (disponível apenas em desenvolvimento)

Para recolher os logs, use o valor `'collapsed'`.

## static

- Tipo: `Object`
  - Padrão: `{}`

> Configure o comportamento do diretório `static/`

Consulte a documentação do [serve-static](https://www.npmjs.com/package/serve-static) para as opções disponíveis.

Além deles, introduzimos uma opção `prefix`, cujo padrão é `true`. Isso adicionará a base do roteador aos seus assets estáticos.

**Exemplo:**

- Assets: `favicon.ico`
- base Router: `/t`
- Com `prefix: true` (padrão): `/t/favicon.ico`
- Com `prefix: false`: `/favicon.ico`

**Caveats:**

Algumas reescritas de URL podem não respeitar o prefixo.

## dist

- Tipo: `Object`
  - Padrão: `{ maxAge: '1y', index: false }`

> Opções usadas para servir arquivos de distribuição. Aplicável apenas em produção.

Consulte a documentação [serve-static](https://www.npmjs.com/package/serve-static) para as possíveis opções.

## csp

- Tipo: `Boolean` ou `Object`
  - Padrão: `false`

> Use para configurar o carregamento de recursos externos da Política de Segurança de Conteúdo

Observe que os hashes CSP não serão adicionados se a política `script-src` contiver `'unsafe-inline'`. Isso ocorre devido ao navegador ignorar `'unsafe-inline'` se hashes estiverem presentes. Defina a opção `unsafeInlineCompatibility` para`true` se você quiser hashes e `'unsafe-inline'` para compatibilidade com CSPv1.

Para adicionar [`<meta http-equiv="Content-Security-Policy"/>`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) com todos as políticas CSP, você precisa definir `csp.addMeta` para `true`.

```js{}[nuxt.config.js]
export default {
  render: {
    csp: true
  }
}

// OU

export default {
  render: {
    csp: {
      hashAlgorithm: 'sha256',
      policies: {
        'script-src': [
          'https://www.google-analytics.com',
          'https://name.example.com'
        ],
        'report-uri': ['https://report.example.com/report-csp-violations']
      },
      addMeta: true
    }
  }
}

// OU
/*
  O exemplo a seguir permite o Google Analytics, LogRocket.io e Sentry.io
  para registro (logging) e rastreamento analítico (analytic tracking).

  Revise este blog em Sentry.io
  https://blog.sentry.io/2018/09/04/how-sentry-captures-csp-violations

  Para saber qual link de rastreamento você deve usar.
*/
const PRIMARY_HOSTS = `loc.example-website.com`
export default {
  render: {
    csp: {
      reportOnly: true,
      hashAlgorithm: 'sha256',
      policies: {
        'default-src': ["'self'"],
        'img-src': ['https:', '*.google-analytics.com'],
        'worker-src': ["'self'", `blob:`, PRIMARY_HOSTS, '*.logrocket.io'],
        'style-src': ["'self'", "'unsafe-inline'", PRIMARY_HOSTS],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          PRIMARY_HOSTS,
          'sentry.io',
          '*.sentry-cdn.com',
          '*.google-analytics.com',
          '*.logrocket.io'
        ],
        'connect-src': [PRIMARY_HOSTS, 'sentry.io', '*.google-analytics.com'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
        'object-src': ["'none'"],
        'base-uri': [PRIMARY_HOSTS],
        'report-uri': [
          `https://sentry.io/api/<project>/security/?sentry_key=<key>`
        ]
      }
    }
  }
}
```
