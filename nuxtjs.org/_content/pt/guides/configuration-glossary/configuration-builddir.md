---
title: 'A propriedade buildDir'
description: Defina o diretório dist para sua aplicação Nuxt.js
menu: buildDir
category: configuration-glossary
position: 2
---

- Tipo: `String`
- Padrão: `.nuxt`

> Defina o diretório dist para sua aplicação Nuxt.js

```js{}[nuxt.config.js]
export default {
  buildDir: 'nuxt-dist'
}
```

Por padrão, muitas ferramentas assumem que `.nuxt` é um diretório oculto, porque seu nome começa com um ponto. Você pode usar esta opção para evitar isso.
