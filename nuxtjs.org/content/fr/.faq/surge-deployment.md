---
title: Déployer avec Surge
description: Comment déployer une application Nuxt.js avec Surge ?
category: deployment
position: 311
---

Nuxt.js vous donne la possibilité d'héberger votre application web sur n'importe quel hébergeur statique tel que [Surge](https://surge.sh/) par exemple.

Pour déployer sur Surge, installez `surge` sur votre ordinateur :

```bash
npm install -g surge
```

Puis demander à Nuxt.js de générer votre application web :

```bash
npm run generate
```

Cela créera un répertoire `dist` contenant les fichiers prêts à être déployés sur un hébergement statique.

Nous pouvons alors déployer sur Surge :

```bash
surge dist/
```

Tadaaa :)

Si vous avez un projet avec des [routes dynamiques](/docs/2.x/directory-structure/pages#dynamic-pages), consultez la [configuration de `generate`](/docs/2.x/configuration-glossary) afin d'expliquer à Nuxt.js comment générer ces routes dynamiques.

<div class="Alert">

Quand vous générez votre application web via `nuxt generate`, [le contexte](/api) passé à [`asyncData`](/docs/2.x/features/data-fetching#async-data) et [`fetch`](/docs/2.x/directory-structure/store) ne disposent pas de `req` ni de `res`.

</div>
