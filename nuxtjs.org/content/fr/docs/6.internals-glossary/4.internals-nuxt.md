---
title: La classe Nuxt
description: Nuxt Core Class
menu: La classe Nuxt
category: internals-glossary
position: 4
---

- Source: **[core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)**

C'est le conteneur central qui permet à tous les modules et à toutes les classes de communiquer entre eux. Tous les modules ont accès à l'instance Nuxt en utilisant `this.nuxt`.

## Hooks

Nous pouvons enregistrer des hooks sur certains événements du cycle de vie.

```js
nuxt.hook('ready', async nuxt => {
  // Votre code personnalisé ici
})
```

| Plugin   | Arguments              | Quand                                                                                  |
| -------- | ---------------------- | -------------------------------------------------------------------------------------- |
| `ready`  | (nuxt)                 | Nuxt est prêt à travailler (`ModuleContainer` et `Renderer` prêt).                     |
| `error`  | (error)                | Une erreur non gérée lors de l'appel de hooks.                                         |
| `close`  | (nuxt)                 | La dernière instance se termine en douceur.                                            |
| `listen` | (server, {host, port}) | Le serveur Nuxt **interne** commence à écouter. (Utilisez `nuxt start` ou `nuxt dev`). |
