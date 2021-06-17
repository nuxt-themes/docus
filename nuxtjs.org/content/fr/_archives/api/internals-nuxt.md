---
title: 'API : la classe Nuxt'
description: La classe cœur Nuxt
menu: Nuxt
category: internals
position: 302
---

- Source : **[core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)**

C'est le conteneur cœur qui permet à tous les modules et classes de communiquer les uns avec les autres. Tous les modules ont accès à l'instance de Nuxt en utilisant `this.nuxt`.

## Points d'ancrage

Nous pouvons enregistrer des points d'ancrage sur certains évènements du cycle de vie.

```js
nuxt.hook('ready', async nuxt => {
  // Votre code personnalisé ici
})
```

| Plugin   | Arguments              | Quand                                                                                        |
| -------- | ---------------------- | -------------------------------------------------------------------------------------------- |
| `ready`  | (nuxt)                 | Nuxt est prèt à fonctionner (`ModuleContainer` et `Renderer` sont prèt).                     |
| `error`  | (error)                | Une erreur non gérée quand un point d'ancrage est appelé.                                    |
| `close`  | (nuxt)                 | L'instance de Nuxt est gracieusement fermée.                                                 |
| `listen` | (server, {host, port}) | Les mécanismes serveur **internes** commencent à écouter. (Avec `nuxt start` ou `nuxt dev`). |
