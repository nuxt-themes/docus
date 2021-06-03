---
title: 'A propriedade srcDir'
description: Defina o diretório de origem da sua aplicação Nuxt.js.
menu: srcDir
category: configuration-glossary
position: 28
---

- Tipo: `String`
- Padrão: [valor do rootDir](/docs/2.x/configuration-glossary/configuration-rootdir)

> Defina o diretório de origem da sua aplicação Nuxt.js.

Se um caminho relativo for especificado, ele será relativo ao rootDir.

Exemplo 1: Pré-requisitos:

```js{}[nuxt.config.js]
export default {
  srcDir: 'client/'
}
```

```js{}[package.json]
  "script": {
    "dev": "yarn nuxt"
  }
```

funciona com a seguinte estrutura de pastas (observe que nuxt.config está listado no diretório da aplicação)

```bash
-| app/
---| node_modules/
---| nuxt.config.js
---| package.json
---| client/
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/
```

Exemplo 2:

Em vez do exemplo 1, você também pode mover o nuxt.config para a pasta src. Nesse caso, você só precisa especificar o cliente como rootDir e pode deixar srcDir vazio:

Prerequisites:

```js{}[nuxt.config.js]
export default {
  srcDir: '' // ou apenas remova-o
}
```

```js{}[package.json]
  "script": {
    "dev": "yarn nuxt client" // isso define o cliente como rootDir
  }
```

funciona com a seguinte estrutura de pastas (observe que nuxt.config está listado no diretório do cliente)

```bash
-| app/
---| node_modules/
---| package.json
---| client/
------| nuxt.config.js
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/
```
