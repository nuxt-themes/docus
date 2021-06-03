---
title: 'A propriedade modulesDir'
description: Defina o diretório de módulos para sua aplicação Nuxt.js
menu: modulesDir
category: configuration-glossary
position: 20
---

- Tipo: `Array`
- Padrão: `['node_modules']`

> Usado para definir os diretórios dos módulos para resolução de caminhos, por exemplo: `resolveLoading`, `nodeExternals` e `postcss` do Webpack. O caminho de configuração é relativo a [options.rootDir](/docs/2.x/configuration-glossary/configuration-rootdir) (padrão: `process.cwd()`).

```js{}[nuxt.config.js]
export default {
  modulesDir: ['../../node_modules']
}
```

A configuração deste campo pode ser necessária se o seu projeto for organizado como um mono-repositório no estilo de área de trabalho do Yarn.
