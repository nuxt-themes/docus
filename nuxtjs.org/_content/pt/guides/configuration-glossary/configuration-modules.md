---
title: 'A propriedade modules'
description: Módulos são extensões Nuxt.js que podem estender sua funcionalidade principal e adicionar integrações infinitas.
menu: modules
category: configuration-glossary
position: 19
---

- Type: `Array`

> Módulos são extensões Nuxt.js que podem estender sua funcionalidade principal e adicionar integrações infinitas. [Saiba mais](/docs/2.x/directory-structure/modules)

Exemplo (`nuxt.config.js`):

```js
export default {
  modules: [
    // Usando o nome do pacote
    '@nuxtjs/axios',

    // Relativo ao seu projeto srcDir
    '~/modules/awesome.js',

    // Fornecendo opções
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // Definição inline
    function () {}
  ]
}
```

Os desenvolvedores de módulo geralmente fornecem etapas e detalhes adicionais necessários para uso.

O Nuxt.js tenta resolver cada item no array de módulos usando o require do Node (em `node_modules`) e então será resolvido a partir do projeto `srcDir` se `~` alias for usado. Os módulos são executados sequencialmente, portanto a ordem é importante.

Os módulos devem exportar uma função para aprimorar o build/runtime do nuxt e, opcionalmente, retornar uma promise até que seu trabalho seja concluído. Observe que eles são necessários em tempo de execução, portanto, já devem ser transpilados se depender de recursos ES6 modernos.

Consulte o [Guia de Módulos](/docs/2.x/directory-structure/modules) para obter informações mais detalhadas sobre como eles funcionam ou se estiver interessado em desenvolver seu próprio módulo. Também fornecemos uma seção oficial sobre [Módulos](https://github.com/nuxt-community/awesome-nuxt#modules) listando dezenas de módulos prontos para produção feitos pela Comunidade Nuxt.

## `buildModules`

<div class="Alert Alert--info">

Este recurso está disponível desde o Nuxt v2.9

</div>

Alguns módulos são necessários apenas durante o desenvolvimento e o tempo de construção. Usar `buildModules` ajuda a tornar a inicialização da produção mais rápida e também diminui significativamente o tamanho de `node_modules` para implantações de produção. Por favor, consulte a documentação de cada módulo para ver se é recomendado usar `modules` ou `buildModules`.

A diferença de uso é:

- Em vez de adicionar `módulos` dentro de `nuxt.config.js`, use `buildModules`
- Em vez de adicionar `dependencies` dentro de `package.json`, use `devDependencies` (`yarn add --dev` ou `npm install --save-dev`)
