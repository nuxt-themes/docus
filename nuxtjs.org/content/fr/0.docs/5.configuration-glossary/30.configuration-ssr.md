---
title: 'La propriété ssr'
description: Modifier la valeur par défaut `ssr` de nuxt
menu: ssr
category: configuration-glossary
position: 28.1
---

- Type: `boolean`
  - Par défaut : `true`
  - Valeurs possibles :
    - `false`: Pas de rendu côté serveur (seulement rendu côté client)

> Vous devez définir cette option lorsque vous travaillez avec une application web monopage

```js{}[nuxt.config.js]
export default {
  ssr: false // for SPA's
}
```

<base-alert type="next">

Auparavant, le `mode` était utilisé pour désactiver ou activer le rendu côté serveur. Voici la [documentation de `mode'](/docs/2.x/configuration-glossary/configuration-mode).

</base-alert>
