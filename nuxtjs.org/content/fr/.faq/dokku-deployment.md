---
title: Comment déployer sur Dokku ?
description: Comment déployer une application Nuxt.js sur Dokku ?
menu: Deploy on Dokku
category: deployment
position: 304
---

Nous vous recommandons de lire la [documentation de la prise en main de Dokku](http://dokku.viewdocs.io/dokku/getting-started/installation/) et [Déploiement d'une application Node.js sur Digital Ocean en utilisant Dokku](http://jakeklassen.com/post/deploying-a-node-app-on-digital-ocean-using-dokku/).

Pour l'exemple, nous allons appeler notre application Nuxt.js `my-nuxt-app`.

Demandons à Dokku d'installer les `devDependencies` de notre projet (afin de pouvoir exécuter `npm run build`) :

```bash
// sur le serveur Dokku
dokku config:set my-nuxt-app NPM_CONFIG_PRODUCTION=false
```

Nous voulons également que notre application écoute le port `0.0.0.0` et s'exécute en mode production :

```bash
// sur le serveur Dokku
dokku config:set my-nuxt-app HOST=0.0.0.0 NODE_ENV=production
```

Vous devriez voir ces trois lignes quand vous tapez `dokku config my-nuxt-app`

![nuxt config vars Dokku](https://i.imgur.com/9FNsaoQ.png)

Puis nous pouvons demander à Dokku d'exécuter `npm run build` via le script `scripts.dokku.predeploy` dans `app.json` :

`créez un fichier nommé app.json dans le répertoire racine de votre projet`

```js
{
  "scripts": {
    "dokku": {
      "predeploy": "npm run build"
    }
  }
}
```

Pour lancer l'application nous utilisons `npm run start` avec le [Procfile](http://dokku.viewdocs.io/dokku/deployment/methods/dockerfiles/#procfiles-and-multiple-processes):

```
web: npm run start
```

Pour finir, nous pouvons déployer notre application sur Dokku :

```bash
// actez vos changements avant de les pousser.
git remote add dokku dokku@yourServer:my-nuxt-app
git push dokku master
```

Voilà ! Votre application Nuxt.js est hébergée sur Dokku !
