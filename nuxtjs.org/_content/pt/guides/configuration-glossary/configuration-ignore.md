---
title: 'A propriedade ignore'
description: Defina os arquivos para sua aplicação Nuxt.js ignorar.
menu: ignore
category: configuration-glossary
position: 14
---

## .nuxtignore

Você pode usar um arquivo `.nuxtignore` para permitir que o Nuxt.js ignore os arquivos de `layout`, `page`, `store` e `middleware` no diretório raiz do seu projeto (`rootDir`) durante a fase de build. O arquivo `.nuxtignore` está sujeito às mesmas especificações dos arquivos `.gitignore` e `.eslintignore`, em que cada linha é um padrão glob indicando quais arquivos devem ser ignorados.

Por exemplo:

```
# ignorar layout foo.vue
layouts/foo.vue
# ignorar arquivos de layout cujo nome terminam em -ignore.vue
layouts/*-ignore.vue

# ignorar pages bar.vue
pages/bar.vue
# ignorar pages dentro do diretório ignore
pages/ignore/*.vue

# ignorar store baz.js
store/baz.js
# ignorar arquivos store que sejam *.test.*
store/ignore/*.test.*

# ignorar arquivos de middleware dentro do diretório foo, exceto foo/bar.js
middleware/foo/*.js
!middleware/foo/bar.js
```

> More details about the spec are in [gitignore doc](https://git-scm.com/docs/gitignore)

### A propriede ignorePrefix

- Tipo: `String`
- Padrão: `'-'`

> Qualquer arquivo em pages/, layout/, middleware/ ou store/ será ignorado durante o build se o nome do arquivo começar com o prefixo especificado por `ignorePrefix`.

Por padrão, todos os arquivos que começam com `-` serão ignorados, como `store/-foo.js` e `pages/-bar.vue`. Isso permite a co-localização de testes, utilitários e componentes com seus invocadores sem que sejam convertidos em rotas, lojas, etc.

### A propriedade ignore

- Tipo: `Array`
- Padrão: `['**/*.test.*']`

> Mais personalizável do que `ignorePrefix`: todos os arquivos correspondentes aos padrões glob especificados em `ignore` serão ignorados durante o build.

## ignoreOptions

`nuxtignore` está usando `node-ignore` pode debaixo dos panos, `ignoreOptions` pode ser configurado como `options` de `node-ignore`.

```js{}[nuxt.config.js]
export default {
  ignoreOptions: {
    ignorecase: false
  }
}
```
