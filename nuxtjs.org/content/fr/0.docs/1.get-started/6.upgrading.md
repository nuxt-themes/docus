---
title: Mise à jour
description: La mise à jour de Nuxt.js est rapide, mais plus complexe que celle de notre package.json
position: 5
category: get-started
---

> La mise à jour de Nuxt.js est rapide, mais plus complexe que celle de notre package.json

Si nous effectuons une mise à niveau vers Nuxt v2.14 et que nous souhaitons utiliser un hébergement statique, nous devrons ajouter [target:static](/docs/2.x/features/deployment-targets#static-hosting) dans notre fichier `nuxt.config.js` pour que la commande `generate` fonctionne correctement.

```js{}[nuxt.config.js]
export default {
  target: 'static'
}
```

## Commencer

1. Vérifier les [notes de publication](/docs/2.x/release-notes) pour la version que nous souhaitons mettre à niveau pour savoir s'il existe des instructions supplémentaires pour cette version en particulier.
2. Mettre à jour la version spécifiée pour le package `nuxt` dans notre fichier `package.json`.

Après cette étape, les instructions varient en fonction de notre gestionnaire de paquets (Yarn ou npm). _[Yarn](https://yarnpkg.com/en/docs/usage) est l'outil de développement préféré pour travailler avec Nuxt car c'est celui qui a été utilisé lors de l'écriture des tests._

## Yarn

3. Supprimer le fichier `yarn.lock`
4. Supprimer le répertoire `node_modules`
5. Lancer la commande `yarn`
6. Une fois l'installation terminée et les tests exécutés, nous devrions également envisager de mettre à jour d'autres dépendances. La commande `yarn outdated` peut être utilisée.

## npm

3. Supprimer le fichier `package-lock.json`
4. Supprimer le répertoire `node_modules`
5. Lancer la commande `npm install`
6. Une fois l'installation terminée et les tests exécutés, nous devrions également envisager de mettre à jour d'autres dépendances. La commande `npm outdated` peut être utilisée.
