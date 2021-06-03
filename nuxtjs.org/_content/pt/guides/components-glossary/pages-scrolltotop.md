---
title: 'A propriedade scrollToTop'
description: A propriedade `scrollToTop` permite que você diga ao Nuxt.js para rolar para o topo antes de renderizar a página.
menu: scrollToTop Property
category: components-glossary
position: 0
---

> A propriedade `scrollToTop` permite que você diga ao Nuxt.js para rolar para o topo antes de renderizar a página.

- **Tipo:** `Boolean` (padrão: `false`)

Por padrão, o Nuxt.js rola para o topo quando você vai para outra página, mas com as rotas secundárias, o Nuxt.js mantém a posição de rolagem. Se você quiser dizer ao Nuxt.js para rolar para o topo ao renderizar sua rota secundária, defina `scrollToTop` como `true`:

```html
<template>
  <h1>Meu componente filho</h1>
</template>

<script>
  export default {
    scrollToTop: true
  }
</script>
```

Por outro lado, você pode definir manualmente `scrollToTop` como `false` nas rotas principais também.

Se você deseja sobrescrever o comportamento de rolagem padrão do Nuxt.js, dê uma olhada na [opção scrollBehavior](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior).
