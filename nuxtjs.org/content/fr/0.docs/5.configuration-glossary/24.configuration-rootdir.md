---
title: La propriété rootDir
description: Définit le répertoire de travail de l'application Nuxt.js
menu: rootDir
category: configuration-glossary
position: 23
---

- Type: `String`
- Par défaut: `process.cwd()`

> Définit le répertoire de travail de l'application Nuxt.js

Cette propriété sera écrasée par les commandes Nuxt (`nuxt start`, `nuxt build`, etc...) si un argument leur est passé.

Exemple: lancer `nuxt ./my-app/` va définir `rootDir` au chemin absolu `./my-app/` à partir du répertoire courant.

À cause de cela, il n'est normalement pas nécessaire de configurer cette option à moins que l'on souhaite utiliser [Nuxt.js de manière programmatique](/docs/2.x/internals-glossary/nuxt).

<base-alert type="info">

`rootDir` doit être au même niveau que le répertoire `node_modules` afin de pouvoir [résoudre les dépendances](https://nodejs.org/api/modules.html#modules_all_together). Se référer à l'[option `srcDir`](/docs/2.x/configuration-glossary/configuration-srcdir) pour des exemples de structure de répertoire lorsque ce n'est pas le cas.

</base-alert>
