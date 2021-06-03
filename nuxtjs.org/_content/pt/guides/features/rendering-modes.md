---
title: Modos de Renderização
description: Modos de Renderização
position: 1
category: features
---

## Universal

`mode: 'universal'`: aplicação isomórfica (renderização pelo servidor ou sites estáticos).

O modo universal é utilizado tanto para a renderização no lado do servidor (SSR), quanto a geração de sites estáticos.

Sites estáticos são bem similares a aplicações renderizadas no lado do servidor, com a diferença principal sendo que eles são renderizados em tempo de construção (build time), portanto não é necessário um servidor. A navegação de uma página à outra é feita no lado do cliente.

Sites renderizados no lado do servidor são renderizados no servidor toda vez que o usuário solicitar uma página, portanto é necessário um servidor para servir a página ao cliente a cada requisição.

Veja [targets de deploy](/docs/2.x/features/deployment-targets) para mais informações sobre hospedagem estática e por servidor.

```js{}[nuxt.config.js]
export default {
  mode: 'universal' // padrão: universal
}
```

<base-alert type="info">
Você não precisa adicionar isso à sua configuração nuxt para que o modo universal seja aplicado, já que o modo padrão é universal.
</base-alert>

## SPA

`mode: 'spa'`: Sem renderização pelo servidor, é apenas renderizado no lado do cliente.

Em Aplicações de Página Única, não existe renderização no lado do servidor, apenas renderização no lado do cliente. Isso significa que o contéudo será renderizado no navegador, utilizando JavaScript. Em vez de obter todo o conteúdo do HTML, obtemos apenas um documento HTML básico com um arquivo JavaScript que renderizará o restante do site usando o navegador.

```js{}[nuxt.config.js]
export default {
  mode: 'spa'
}
```

<base-alert type="next">

[A propriedade mode](/docs/2.x/configuration-glossary/configuration-mode)

</base-alert>
