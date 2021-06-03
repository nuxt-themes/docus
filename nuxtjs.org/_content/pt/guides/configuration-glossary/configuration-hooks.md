---
title: 'A propriedade hooks'
description: Hooks são listeners de eventos Nuxt que são normalmente usados ​​em módulos do Nuxt, mas também estão disponíveis em `nuxt.config.js`.
menu: hooks
category: configuration-glossary
position: 13
---

- Tipo: `Object`

> Hooks são [listeners de eventos Nuxt](/docs/2.x/internals-glossary/internals) que são normalmente usados ​​em módulos do Nuxt, mas também estão disponíveis em `nuxt.config.js`.

```js{}[nuxt.config.js]
import fs from 'fs'
import path from 'path'

export default {
  hooks: {
    build: {
      done(builder) {
        const extraFilePath = path.join(
          builder.nuxt.options.buildDir,
          'extra-file'
        )
        fs.writeFileSync(extraFilePath, 'Algo extra')
      }
    }
  }
}
```

Internamente, os hooks seguem um padrão de nomenclatura usando dois pontos (por exemplo, `build:done`). Para facilitar a configuração, você pode estruturá-los como um objeto hierárquico ao usar `nuxt.config.js` (como exemplificado acima) para definir seus próprios hooks. Veja [Nuxt Internals](/docs/2.x/internals-glossary/internals) para informações mais detalhadas sobre como eles funcionam.

## Lista de hooks

- [Hooks do Nuxt](/docs/2.x/internals-glossary/internals-nuxt#hooks)
- [Hooks do Renderer](/docs/2.x/internals-glossary/internals-renderer#hooks)
- [Hooks do ModulesContainer](/docs/2.x/internals-glossary/internals-module-container#hooks)
- [Hooks do Builder](/docs/2.x/internals-glossary/internals-builder#hooks)
- [Hooks do Generator](/docs/2.x/internals-glossary/internals-generator#hooks)

## Exemplos

### Redirecionar para router.base quando não estiver na raiz

Digamos que você queira servir as páginas como `/portal` em vez de `/`.

Este é talvez um caso extremo, e o ponto de _nuxt.config.js_’ `router.base` é quando um servidor Web servirá Nuxt em outro lugar que não a raiz do domínio.

Mas quando em desenvolvimento local, pressionando _localhost_, quando router.base não é/retorna um 404. Para evitar isso, você pode configurar um Hook.

Talvez o redirecionamento não seja o melhor caso de uso para um site de produção, mas isso o ajudará a aproveitar os Hooks.

Para começar, você [pode alterar o `router.base`](/docs/2.x/configuration-glossary/configuration-router#base); Atualize seu `nuxt.config.js`:

```js{}[nuxt.config.js]
import hooks from './hooks'
export default {
  router: {
    base: '/portal'
  }
  hooks: hooks(this)
}
```

Em seguida, crie alguns arquivos;

1. `hooks/index.js`, módulo de hooks

   ```js{}[hooks/index.js]
   import render from './render'

   export default nuxtConfig => ({
     render: render(nuxtConfig)
   })
   ```

2. `hooks/render.js`, hook do Render

   ```js{}[hooks/render.js]
   import redirectRootToPortal from './route-redirect-portal'

   export default nuxtConfig => {
     const router = Reflect.has(nuxtConfig, 'router') ? nuxtConfig.router : {}
     const base = Reflect.has(router, 'base') ? router.base : '/portal'

     return {
       /**
        * 'render:setupMiddleware'
        * {@link node_modules/nuxt/lib/core/renderer.js}
        */
       setupMiddleware(app) {
         app.use('/', redirectRootToPortal(base))
       }
     }
   }
   ```

3. `hooks/route-redirect-portal.js`, o middleware

   ```js{}[hooks/route-redirect-portal.js]
   /**
    * O hook do middleware Nuxt para redirecionar de / para /portal (ou o que quer que definamos em nuxt.config.js router.base)
    *
    * Deve ser a mesma versão do connect
    * {@link node_modules/connect/package.json}
    */
   import parseurl from 'parseurl'

   /**
    * Conecte o middleware para lidar com o redirecionamento para a Raiz de contexto da aplicação Web desejada.
    *
    * Observe que a documentação do Nuxt não explica como usar ganchos.
    * Este é um exemplo de roteador para ajudar a explicar.
    *
    * Veja uma boa implementação para inspiração:
    * - https://github.com/nuxt/nuxt.js/blob/dev/examples/with-cookies/plugins/cookies.js
    * - https://github.com/yyx990803/launch-editor/blob/master/packages/launch-editor-middleware/index.js
    *
    * [http_class_http_clientrequest]: https://nodejs.org/api/http.html#http_class_http_clientrequest
    * [http_class_http_serverresponse]: https://nodejs.org/api/http.html#http_class_http_serverresponse
    *
    * @param {http.ClientRequest} req Objeto interno Node.js para requisição do cliente [http_class_http_clientrequest]
    * @param {http.ServerResponse} res Resposta interna do Node.js[http_class_http_serverresponse]
    * @param {Function} next middleware callback
    */
   export default desiredContextRoot =>
     function projectHooksRouteRedirectPortal(req, res, next) {
       const desiredContextRootRegExp = new RegExp(`^${desiredContextRoot}`)
       const _parsedUrl = Reflect.has(req, '_parsedUrl') ? req._parsedUrl : null
       const url = _parsedUrl !== null ? _parsedUrl : parseurl(req)
       const startsWithDesired = desiredContextRootRegExp.test(url.pathname)
       const isNotProperContextRoot = desiredContextRoot !== url.pathname
       if (isNotProperContextRoot && startsWithDesired === false) {
         const pathname = url.pathname === null ? '' : url.pathname
         const search = url.search === null ? '' : url.search
         const Location = desiredContextRoot + pathname + search
         res.writeHead(302, {
           Location
         })
         res.end()
       }
       next()
     }
   ```

Então, sempre que um colega de desenvolvimento acidentalmente clicar em `/` para acessar o serviço de desenvolvimento web de desenvolvimento, o Nuxt irá redirecionar automaticamente para `/portal`.
