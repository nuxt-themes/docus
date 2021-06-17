---
title: 'API: La propriété modern'
description: Créez et servez un bundle moderne
menu: modern
category: configuration
position: 118
---

> Cette fonctionnalité est inspirée du [mode moderne vue-cli](https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode)

- Type: `String` or `Boolean`
  - Par défaut: false
  - Valeurs possibles:
    - `'client'`: Servir les deux, le bundle moderne `<script type="module">` et les bundles hérités `<script nomodule>`, fournissent également un `<link rel="modulepreload">` pour le bundle moderne. Chaque navigateur qui comprend le type `module` chargera l'ensemble du bundle moderne tandis que les anciens navigateurs retomberont sur l'héritage (transpilé).
    - `'server'` ou `true`: Le serveur Node.js vérifiera la version du navigateur en fonction de l'agent utilisateur et servira le bundle moderne ou hérité correspondant.
    - `false`: Désactiver le bundle moderne

Les deux versions de bundles sont:

1. Bundle moderne: ciblant les navigateurs modernes prenant en charge les modules ES
1. Bundle hérité: ciblant les anciens navigateurs basés sur la configuration babel (compatible IE9 par défaut).

**Info:**

- Utiliser l'option de commande `[--modern | -m]=[mode]` pour construire/démarrer des bundles modernes, par exemple: dans `package.json`:

```json
{
  "scripts": {
    "build:modern": "nuxt build --modern=server",
    "start:modern": "nuxt start --modern=server"
  }
}
```

**Remarque sur _nuxt generate_:** La propriété `modern` fonctionne également avec la commande `nuxt generate`, mais dans ce cas seule l'option `client` est honorée et sélectionnée automatiquement lors du lancement de la commande `nuxt generate --modern` sans fournir de valeur.

- Nuxt détectera automatiquement la version `modern` dans`nuxt start` lorsque `modern` n'est pas spécifiée, le mode auto-détecté est:

| Mode      | Modern Mode |
| --------- | :---------: |
| universal |   server    |
| spa       |   client    |

- Le mode moderne pour `nuxt generate` peut seulement être `client`
- Utilisez [`build.crossorigin`](/api/configuration-build#crossorigin) pour modifier l'attribut `crossorigin` dans `<link>` et `<script>`

> Veuillez consulter [l'excellent article de Phillip Walton](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) pour plus de connaissances sur les constructions modernes.
