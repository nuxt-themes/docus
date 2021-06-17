---
title: La propriété telemetry
description: Nuxt.js collecte de la télémétrie anonyme à propos de l'usage général. Cela aide l'équipe à gauger précisément l'usage des fonctionnalités de Nuxt.js et la personnalisation répartie sur tous les utilisateurs.
menu: telemetry
category: configuration-glossary
position: 30
---

> Depuis la version 2.13.0, Nuxt.js collecte de la télémétrie **anonyme** à propos de l'usage général. Cela aide l'équipe à gauger précisément l'usage des fonctionnalités de Nuxt.js et la personnalisation répartie sur tous les utilisateurs.

- Type: `Boolean`
- Par défaut: basé sur les préférences de l'utilisateur

## Pourquoi collecter de la télémétrie ?

Nuxt.js a beaucoup grandi depuis sa [publication initiale](https://github.com/nuxt/nuxt.js/releases/tag/v0.2.0) (7 Nov 2016) et l'équipe fait toujours attention au [feedback de la communauté](https://github.com/nuxt/nuxt.js/issues) pour améliorer le framework.

Ce processus manuel récupère le feedback de seulement certains utilisateurs: ceux qui prennent le temps de remplir l'issue template et qui ont des besoins ou des utilisations différents des nôtres.

Plusieurs events sont intéressants:

- commandes invoquées (`nuxt dev`, `nuxt build`, etc)
- versions de Nuxt.js et de Node.js
- informations générales sur la machine (MacOs/Linux/Windows et le nom de la CI si la commande est executé dans ce contexte là)
- durée du build Webpack ainsi que taille moyenne de l'application, ainsi que les statistiques de la génération (lors d'un `nuxt generate`)
- quelles sont les dépendances publiques du projet (Nuxt modules)

Le code est open source et disponible ici: https://github.com/nuxt/telemetry.

## Opt out

On peut désactiver la [télémétrie](https://github.com/nuxt/telemetry) pour notre projet de plusieurs façons:

1. En utilisant `npx nuxt telemetry disable`

```bash
npx nuxt telemetry [status|enable|disable] [-g,--global] [dir]
```

2. En utilisant une variable d'environnement

```bash
NUXT_TELEMETRY_DISABLED=1
```

3. En définissant `telemetry: false` dans notre fichier `nuxt.config.js`:

```js{}[nuxt.config.js]
export default {
  telemetry: false
}
```

Pour plus d'informations sur la télémétrie de Nuxt.js et les events envoyés, voir [Nuxt Telemetry](https://github.com/nuxt/telemetry).
