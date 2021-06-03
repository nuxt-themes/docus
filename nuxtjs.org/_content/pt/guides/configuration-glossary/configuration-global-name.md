---
title: 'A propriedade globalName'
description: O Nuxt.js permite que você personalize o ID global usado no template HTML principal, bem como o nome da instância Vue principal e outras opções.
menu: globalName
category: configuration-glossary
position: 11
---

> O Nuxt.js permite que você personalize o ID global usado no template HTML principal, bem como o nome da instância Vue principal e outras opções.

- Tipo: `String`
- Padrão: `nuxt`

```js{}[nuxt.config.js]
{
  globalName: 'meuNomePersonalizado'
}
```

<base-alert>

O `globalName` precisa ser um identificador JavaScript válido e alterá-lo pode interromper o suporte para certos plugins que dependem de funções nomeadas pelo Nuxt. Se você deseja apenas alterar o ID HTML `__nuxt` visível, use a propriedade `globals`.

</base-alert>

## A propriedade globals

> Personaliza nomes globais específicos que são baseados em `globalName` por padrão.

- Tipo: `Object`
- Padrão:

```js{}[nuxt.config.js]
globals: {
  id: globalName => `__${globalName}`,
  nuxt: globalName => `$${globalName}`,
  context: globalName => `__${globalName.toUpperCase()}__`,
  pluginPrefix: globalName => globalName,
  readyCallback: globalName => `on${_.capitalize(globalName)}Ready`,
  loadedCallback: globalName => `_on${_.capitalize(globalName)}Loaded`
},
```
