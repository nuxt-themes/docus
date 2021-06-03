---
title: 'A propriedade loading indicator'
description: Mostrar indicador de carregamento sofisticado enquanto a página SPA está carregando!
menu: loadingIndicator
category: configuration-glossary
position: 16
---

> Mostrar indicador de carregamento sofisticado enquanto a página SPA está carregando!

Ao executar o Nuxt.js no modo SPA, não há conteúdo do lado do servidor no primeiro carregamento da página. Portanto, em vez de mostrar uma página em branco enquanto a página carrega, podemos mostrar um botão giratório.

Esta propriedade pode ser de 3 tipos diferentes: `string` ou `false` ou `object`. Se um valor de string for fornecido, ele será convertido em estilo de objeto.

O valor padrão é:

```js
loadingIndicator: {
  name: 'circle',
  color: '#3B8070',
  background: 'white'
}
```

## Indicadores integrados

Esses indicadores são importados do incrível projeto [Spinkit](http://tobiasahlin.com/spinkit). Você pode usar sua página de demonstração para visualizar os spinners.

- circle
- cube-grid
- fading-circle
- folding-cube
- chasing-dots
- nuxt
- pulse
- rectangle-bounce
- rotating-plane
- three-bounce
- wandering-cubes

Os indicadores integrados suportam as opções `color` e `background`.

## Indicadores personalizados

Se você precisar de seu próprio indicador especial, um valor String ou uma chave de nome também pode ser um caminho para um template html do código-fonte do indicador! Todas as opções são passadas para o template também.

O [código-fonte](https://github.com/nuxt/nuxt.js/tree/dev/packages/vue-app/template/views/loading) integrado do Nuxt também está disponível se você precisar de uma base.
