---
title: 'A propriedade loading'
description: A propriedade `loading` oferece a opção de desabilitar a barra de progresso de carregamento padrão em uma página específica.
menu: Loading Property
category: components-glossary
position: 0
---

> A propriedade de loading oferece a opção de desativar a barra de progresso de carregamento padrão em uma página específica.

- **Tipo:** `Boolean` (padrão: `true`)

Por padrão, o Nuxt.js usa seu próprio componente para mostrar uma barra de progresso entre as rotas.

Você pode desabilitá-lo ou personalizá-lo globalmente por meio da [opção de configuração de loading](/docs/2.x/configuration-glossary/configuration-loading), mas também desabilitá-lo para páginas específicas definindo a propriedade `loading` como `false`:

```html
<template>
  <h1>Minha Página</h1>
</template>

<script>
  export default {
    loading: false
  }
</script>
```
