---
title: 'API: A propriedade plugins'
description: 'Use plugins vue.js com a opção de plugins do Nuxt.js.'
menu: plugins
category: configuration-glossary
position: 21
---

**Nota**: Desde Nuxt.js 2.4, `mode` foi introduzido como opção de `plugins` para especificar o tipo de plugin, os valores possíveis são: `client` ou `server`. `ssr: false` será adaptado para `mode: 'client'` e obsoleto na próxima versão principal.

- Tipo: `Array`
  - Itens: `String` ou `Object`

Se o item for um objeto, as propriedades são:

- src: `String` (caminho do arquivo)
- mode: `String` (pode ser `client` ou `server`) _Se definido, o arquivo será incluído apenas no respectivo lado (cliente ou servidor)._

**Note**: Versão antiga

- Tipo: `Array`
  - Itens: `String` ou `Object`

Se o item for um objeto, as propriedades são:

- src: `String` (caminho do arquivo)
- ssr: `Boolean` (padrão para `true`) _Se falso, o arquivo será incluído apenas no lado do cliente._

> A propriedade plugins permite adicionar plugins vue.js facilmente a sua aplicação principal.

```js{}[nuxt.config.js]
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' },
    { src: '~/plugins/server-only.js', mode: 'server' }
  ]
}
```

```js{}[nuxt.config.js]
export default {
  plugins: ['@/plugins/ant-design-vue']
}
```

```js{}[plugins/ant-design-vue.js]
import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' // Documentos por Ant Design

Vue.use(Antd)
```

Observe que o css foi [importado de acordo com a Documentação de design do Ant](https://vue.ant.design/docs/vue/getting-started/#3.-Use-antd's-Components 'Dica externa relevante para a construção de plug-ins').

Todos os caminhos definidos na propriedade `plugins` serão **importados** antes de inicializar a aplicação principal.
