---
title: Targets de Deploy
description: Targets de Deploy
position: 2
category: features
---

## Hospedagem Estática

Para hospedagem estática, você pode escolher entre hospedar uma aplicação de página única ou de múltiplas páginas, também conhecida como sites estáticos. Nesse tipo de hospedagem não é necessário um servidor, o que significa que a sua SPA ou site estático podem ser hospedados em qualquer hospedagem sem servidor (serverless) ou em uma CDN gratuita. Nesse caso, o target `static` precisa ser adicionado ao arquivo nuxt.config.

```js{}[nuxt.config.js]
export default {
  target: 'static' // padrão: 'server'
}
```

### SPA

Aplicações de página única são páginas que são renderizadas apenas no lado do cliente, sem a necessidade de um servidor. Para fazer o deploy de uma SPA, defina o [modo para `spa`](/docs/2.x/features/rendering-modes#spa) e então rode o comando `build` para buildar a sua aplicação.

```js{}[nuxt.config.js]
export default {
  target: 'static' // padrão: 'server'
  mode: 'spa'
}
```

### Sites Estáticos

Como o Nuxt.js também funciona como um gerador de site estático, você pode, portanto, gerar a sua aplicação como um site estático. Renderize estaticamente sua aplicação Nuxt.js e obtenha todos os benefícios de uma aplicação universal sem um servidor. O comando nuxt `generate` gerará uma versão completamente estática do seu site. Ele gerará HTML para cada uma de suas rotas e o colocará dentro de seu próprio arquivo na pasta `dist`. Basicamente, qualquer arquivo `.vue` colocado dentro do diretório pages será gerado como uma página html estática. Isso melhora o desempenho, bem como o SEO e melhor suporte offline.

<base-alert type="info">

Sites estáticos trabalham no [modo universal](/docs/2.x/features/rendering-modes#universal), que é o modo padrão definido.

</base-alert>

**Executando o nuxt dev com o target static melhorará a experiência do desenvolvedor:**

Executar nuxt dev com o target static melhorará a experiência do desenvolvedor:

- Remove req & res do contexto
- Fallback para renderização pelo cliente em 404, erros e redirecionamentos (consulte fallback do SPA)
- `$route.query` sempre será igual a {} na renderização pelo servidor
- process.static é true

<base-alert type="info">

Também estamos expondo process.target para que os autores de módulos adicionem lógica, dependendo do target do usuário.

</base-alert>

## Hospedagem de Servidor

Hospedagem de servidor é a hospedagem que requer um servidor e se destina a aplicativos SSR. A renderização do lado do servidor, também conhecida como SSR, significa que sua página é renderizada no servidor quando solicitada pelo usuário. Quando o usuário abre sua página em um navegador, o navegador envia uma solicitação ao servidor pedindo essa página. A página é renderizada no servidor e enviada de volta ao navegador com todo o seu conteúdo.

Para a hospedagem de servidor, o target `server` é utilizado, que é o valor padrão. Utilize o comando `build` para buildar a sua aplicação.

```js{}[nuxt.config.js]
export default {
  target: 'server'
}
```

<base-alert type="info">

Sites estáticos trabalham no [modo universal](/docs/2.x/features/rendering-modes#universal), que é o modo padrão definido.

</base-alert>
