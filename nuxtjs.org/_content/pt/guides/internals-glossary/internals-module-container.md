---
title: 'A Classe ModuleContainer'
description: A classe ModuleContainer do Nuxt
menu: Module Container
category: internals-glossary
position: 6
---

- Fonte: **[core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/module.js)**

Todos os [módulos](/docs/2.x/directory-structure/modules) serão chamados dentro do contexto da instância do `ModuleContainer`.

## Plugins Tapable

Podemos registrar hooks em certos eventos do ciclo de vida.

```js
nuxt.moduleContainer.plugin('ready', async moduleContainer => {
  // Faça isso depois que todos os módulos estiverem prontos
})
```

Dentro do contexto dos [módulos](/docs/2.x/directory-structure/modules), podemos usar isso:

```js
this.plugin('ready', async moduleContainer => {
  // Faça isso depois que todos os módulos estiverem prontos
})
```

| Plugin  | Argumentos      | Quando                                                   |
| ------- | --------------- | -------------------------------------------------------- |
| `ready` | moduleContainer | Todos os módulos em `nuxt.config.js` foram inicializados |

## Métodos

### addVendor (vendor)

**Obsoleto porque `vendor` não é mais usado**

Adiciona ao `options.build.vendor` e aplica um filtro único.

### addTemplate (template)

- **template**: `String` ou `Objeto`
  - `src`
  - `options`
  - `fileName`

Renderiza o template fornecido usando o [template lodash](https://lodash.com/docs/4.17.4#template) durante o build no `buildDir` (`.nuxt`) do projeto.

Se o `fileName` não é passado ou o `template` é uma string, o nome do arquivo alvo será, por padrão, `[dirName].[fileName].[pathHash].[ext]`.

Este método retorna o objeto final `{ dst, src, options }`.

### addPlugin (template)

Registra um plugin usando `addTemplate` e adiciona-o ao início da opção `plugins[]`.

Você pode usar `template.ssr: false` para desabilitar o plugin, incluindo o pacote SSR.

### addServerMiddleware (middleware)

Adiciona o middleware em [options.serverMiddleware](/docs/2.x/configuration-glossary/configuration-servermiddleware).

### extendBuild (fn)

Permite estender facilmente a configuração de compilação do webpack ao encadear a função [options.build.extend](/docs/2.x/configuration-glossary/configuration-build#extend).

### extendRoutes (fn)

Permite estender facilmente as rotas encadeando a função [options.build.extendRoutes](/docs/2.x/configuration-glossary/configuration-router#extendroutes).

### extendPlugins (fn)

Permite estender facilmente os plugins encadeando a função [options.extendPlugins](/docs/2.x/configuration-glossary/configuration-extend-plugins) .

### addModule (moduleOpts, requireOnce)

_Função Assíncrona_

Registra um módulo. `moduleOpts` pode ser uma string ou um array (`[src, options]`). Se `requireOnce` for `true` e o módulo resolvido exportar `meta`, ele impede o registro do mesmo módulo duas vezes.

### requireModule (moduleOpts)

_Função Assíncrona_

É um atalho para `addModule(moduleOpts, true)`

## Hooks

Podemos registrar hooks em certos eventos do ciclo de vida.

| Hook             | Argumentos                 | Quando                                                                                     |
| ---------------- | -------------------------- | ------------------------------------------------------------------------------------------ |
| `modules:before` | (moduleContainer, options) | Chamado antes de criar a classe ModuleContainer. Útil para sobrecarregar métodos e opções. |
| `modules:done`   | (moduleContainer)          | Chamado quando todos os módulos foram carregados.                                          |
