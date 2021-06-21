---
title: Comment modifier l'hôte et le port ?
description: Comment modifier l'hôte et le port avec Nuxt.js ?
category: configuration
position: 7
---

Par défaut, l'hôte du serveur de développement Nuxt est `localhost` (accessible uniquement depuis la machine hôte).

Pour indiquer à Nuxt qu'il doit rendre accessible l'hôte depuis des connexions _extérieures_ à celui-ci (par exemple, sur un LAN), vous pouvez utiliser l'hôte `0.0.0.0`.

Vous pouvez configurer les variables de connexion de plusieurs façons. Ces dernières sont listées **de la plus grande priorité à la plus petite**.

> **Remarque:** Si vous assignez à la variable `port` la chaîne de caractères `'0'` (et non `0`, qui est incorrect), un port aléatoire sera attribué à votre application Nuxt.

## En utilisant des arguments directs

```sh
nuxt --hostname votrehote --port 3333
```

Ou

```js
"scripts": {
  "dev": "nuxt --hostname votrehote --port 3333"
}
```

## Configurer dans `nuxt.config.js` :

Dans votre `nuxt.config.js` :

```js
export default {
  server: {
    port: 8000, // par défaut : 3000
    host: '0.0.0.0' // par défaut : localhost
  }
  // autres configurations
}
```

## En utilisant les variables d'environnement NUXT_HOST et NUXT_PORT

Similaires à HOST et PORT, mais plus spécifiques, au cas où vous auriez besoin de celles-ci pour autre chose.

```js
"scripts": {
  "dev": "NUXT_HOST=0.0.0.0 NUXT_PORT=3333 nuxt"
}
```

**Remarque**: pour une meilleure compatibilité lors d'un développement multiplateforme, vous pouvez utiliser le paquet [cross-env](https://www.npmjs.com/package/cross-env).

Installation :

```bash
npm install --save-dev cross-env
```

```js
"scripts": {
  "dev": "cross-env NUXT_HOST=0.0.0.0 NUXT_PORT=3333 nuxt"
}
```

## En utilisant les variables d'environnement HOST et PORT

```js
"scripts": {
  "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```

## Via la configuration `nuxt` dans `package.json` :

Dans votre `package.json` :

```json
"config": {
  "nuxt": {
    "host": "0.0.0.0",
    "port": "3333"
  }
},
"scripts": {
  "dev": "nuxt"
}
```
