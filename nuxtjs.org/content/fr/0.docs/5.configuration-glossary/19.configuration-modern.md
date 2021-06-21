---
title: La propriété modern
description: Build et sert un bundle moderne
menu: modern
category: configuration-glossary
position: 18
---

> Cette fonctionnalité est inspirée du mode `modern` de [vue-cli](https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode).

- Type: `String` ou `Boolean`
  - Par défaut: `false`
  - Valeurs possibles:
    - `'client'`: Sert les deux scripts, le bundle moderne `<script type="module">` et le bundle legacy `<script nomodule>`, fournit aussi un `<link rel="modulepreload">` pour le bundle moderne. Chaque navigateur qui comprend le type `module` chargera le bundle moderne pendant que les navigateurs plus anciens utiliseront le bundle legacy de secours (ce dernier sera transpilé).
    - `'server'` ou `true`: Le serveur Node.js va vérifier la version du navigateur grâce au _user agent_ et servira le bundle moderne ou de secours en fonction.
    - `false`: désactive le build moderne.

Les deux bundles possibles sont:

1. Bundle moderne: vise les navigateurs modernes qui supportent les _ES modules_
2. Bundle legacy (de secours): vise les navigateurs plus anciens en fonction de la configuration de Babel (compatible IE9 par défaut).

**Info**:

- On peut utiliser la commande `[--modern | -m]=[mode]` pour build/démarrer les bundles modernes:

```json{}[package.json]
{
  "scripts": {
    "build:modern": "nuxt build --modern=server",
    "start:modern": "nuxt start --modern=server"
  }
}
```

**Information à propos de _nuxt generate_**: La propriété `modern` marche aussi avec la commande `nuxt generate`, mais dans ce cas là, seulement l'option `client` est honorée et sera sélectionnée lors de l'exécution de la commande `nuxt generate --modern` sans fournir d'autres valeurs.

- Nuxt.js va automatiquement détecter le build `moderne` dans `nuxt start` lorsque `modern` n'est pas spécifié, le mode d'auto-détection est le suivant:

| Mode      | Modern Mode |
| --------- | :---------: |
| universal |   server    |
| spa       |   client    |

- Le mode `moderne` pour `nuxt generate` ne peut être que `client`
- Il faut utiliser [`render.crossorigin`](/docs/2.x/configuration-glossary/configuration-render#crossorigin) pour définir l'attribut `crossorigin` dans `<link>` et `<script>`.

> Se réferer à l'excellent post de [Phillip Walton](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) sur les builds modernes.
