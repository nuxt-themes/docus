---
title: 'API: La propriété rootDir'
description: Définissez l'espace de travail de l'application Nuxt.js
menu: rootDir
category: configuration
position: 123
---

- Type: `String`
- Par défaut: `process.cwd()`

> Définissez l'espace de travail de l'application Nuxt.js.

Cette propriété sera remplacée par les [commandes nuxt](/guide/commands) si un argument leur est transmis. Par exemple, exécuter `nuxt ./My-app/` placera `rootDir` sur le chemin absolu de `./My-app/` à partir du répertoire courant de travail.

De ce fait, il n'est normalement pas nécessaire de configurer cette option, sauf si vous utiliserez [Nuxt.js par programmation](/api/nuxt).

<div class="Alert Alert--blue">

Les deux `rootDir` en tant que racine du package contenant le répertoire `node_modules` doivent se trouver dans la même arborescence de répertoires pour pouvoir [résoudre les dépendances](https://nodejs.org/api/modules.html#modules_all_together). Voir [l'option `srcDir`](/api/configuration-srcdir) pour des exemples de structure de répertoires quand ce n'est pas le cas

</div>
