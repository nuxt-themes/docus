---
title: Commandes et déploiement
description: Nuxt.js est livré avec un ensemble de commandes utiles, tant pour le développement que pour la production.
category: getting-started
position: 113
---

> Nuxt.js est livré avec un ensemble de commandes utiles, tant pour le développement que pour la production.

## Liste des commandes

| Commande      | Description                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| nuxt          | Lancer un serveur de développement sur localhost:3000 avec du rechargement à chaud.                               |
| nuxt build    | Créez votre application avec webpack et minifiez les JS & CSS (pour la production).                               |
| nuxt start    | Démarrez le serveur en mode production (après avoir exécuté `nuxt build`).                                        |
| nuxt generate | Créez l'application et générez toutes les routes en tant que fichiers HTML (utilisé pour l'hébergement statique). |

#### Arguments

Vous pouvez utiliser `--help` avec n'importe quelle commande pour obtenir des détails d'utilisation. Les arguments communs sont :

- **`--config-file` ou `-c`:** spécifie le chemin vers le fichier `nuxt.config.js`.
- **`--spa` ou `-s`:** lance la commande en mode application monopage et désactive le rendu côté serveur.
- **`--unix-socket` ou `-n`:** Spécifie le chemin d'un socket UNIX.

#### Utiliser un fichier package.json

Vous devriez ajouter ces commandes au `package.json` :

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

Ensuite, vous pouvez lancer vos commandes via `npm run <command>` (exemple : `npm run dev`).

<div class="Alert Alert--nuxt-green">

<b>Astuce :</b> pour passer des arguments à une commande npm, vous devez utiliser un <code>--</code> supplémentaire après le nom du script (exemple : <code>npm run dev -- --spa</code>).

</div>

## Environnement de développement

Pour lancer Nuxt dans le mode de développement avec le rechargement à chaud :

```bash
nuxt
// OU
npm run dev
```

## Déploiement en production

Nuxt.js vous permet de choisir entre trois modes de déploiement pour votre application : rendu côté serveur, application monopage ou généré de manière statique.

### Déploiement pour un rendu côté serveur (universelle)

Pour déployer, au lieu d'exécuter `nuxt`, vous voulez probablement faire d'abord la construction. Par conséquent, la construction et le démarrage sont des commandes distinctes :

```bash
nuxt build
nuxt start
```

Vous pouvez aussi définir `server.https` dans votre fichier `nuxt.config.js` avec le même ensemble d'options passé à [`https.createServer`](https://nodejs.org/api/https.html), si vous décidez de servir Nuxt.js en mode HTTPS. Les sockets Unix sont aussi disponibles si vous spécifiez l'option `server.socket` dans `nuxt.config.js` (ou `-n` dans [CLI](https://nuxtjs.org/guide/commands#list-of-commands)). Si vous utilisez les [sockets Unix](https://en.wikipedia.org/wiki/Berkeley_sockets), assurez-vous de laisser les paramètres `host` et `port` vides, sinon le paramètre `socket` sera ignoré.

Le fichier `package.json` suivant est recommandé :

```json
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```

Note : nous recommandons d'ajouter `.nuxt` dans `.npmignore` ou `.gitignore`.

### Déploiement pour une génération statique (pré-rendue)

Nuxt.js vous offre la possibilité d'héberger votre application web sur tout hébergement statique.

Pour générer votre application web en fichiers statiques :

```bash
npm run generate
```

Il créera un dossier `dist` avec tout à l'intérieur prêt à être déployé sur un hébergement de site statique.

Si vous avez un projet avec des [routes dynamiques](/guide/routing#dynamic-routes), regardez la [configuration de la commande generate](/api/configuration-generate) afin de dire à Nuxt.js comment générer ces routes dynamiques.

<div class="Alert">

Lors de la génération de votre application web avec `nuxt generate`, [le contexte](/api/context) donné à [asyncData](/guide/async-data) et [fetch](/guide/vuex-store#la-m-thode-fetch) n'aura pas de `req` et `res`.

</div>

### Déploiement pour une application monopage (SPA)

`nuxt generate` a toujours besoin du moteur SSR pendant la génération afin de pré-rendre toutes les pages, et d'avoir du contenu solide pour la SEO et un chargement de page rapide. Le contenu est généré lors de la _phase de build_. Il ne faut pas l'utiliser, par exemple, pour les applications où le contenu dépend de l'authentification de l'utilisateur ou pour une API en temps réel (du moins pour le premier chargement).

L'idée de l'application monopage est simple ! Quand le mode SPA est activé en utilisant `mode: 'spa'` ou l'option `--spa`, et que nous lançons la construction, la génération se lance automatiquement après la construction. Cette génération contient les meta, ressources et liens communs, mais sans contenu de page.

Donc pour un déploiement en mode SPA, vous devez :

- Changez le `mode` dans `nuxt.config.js` pour `spa`.
- Lancez `npm run build`.
- Déployez le dossier `dist/` créé sur votre hébergement statique comme Surge, GitHub Pages ou nginx.

Une autre possibilité de déploiement est d'utiliser Nuxt comme un middleware dans des frameworks si le mode est `spa`. Ceci aide à réduire le temps de chargement et à utiliser Nuxt dans des projets ou le SSR n'est pas possible.

<div class="Alert">

Consultez les [Questions fréquentes](/faq) et trouvez des exemples astucieux de déploiements sur des hôtes populaires.

</div>
