---
title: 'La propriété server'
description: Nuxt.js vous permet de définir les variables de connexion au serveur pour votre application dans `nuxt.config.js`.
menu: server
category: configuration-glossary
position: 26
---

- Type: `Object`

> Nuxt.js vous permet de définir les variables de connexion au serveur pour votre application dans `nuxt.config.js`.

## Exemple de base :

```js{}[nuxt.config.js]
export default {
  server: {
    port: 8000, // par défaut : 3000
    host: '0.0.0.0', // par défaut : localhost,
    timing: false
  }
}
```

Cela vous permet de spécifier l'[hôte et le port](/docs/2.x/features/configuration#edit-host-and-port) pour votre instance de serveur Nuxt.js.

## Exemple utilisant la configuration HTTPS

```js{}[nuxt.config.js]
import path from 'path'
import fs from 'fs'

export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    }
  }
}
```

Vous pouvez trouver des informations supplémentaires sur la création de clés de serveur et de certificats sur l'article `localhost` de [certificats pour localhost](https://letsencrypt.org/docs/certificates-for-localhost/).

## Exemple d'utilisation de la configuration des sockets

```js{}[nuxt.config.js]
export default {
  server: {
    socket: '/tmp/nuxt.socket'
  }
}
```

## timing

- Type : `Object` ou `Boolean`
- Par défaut : `false`

L'activation de l'option `server.timing` ajoute un middleware pour mesurer le temps écoulé lors du rendu côté serveur et l'ajoute aux en-têtes sous le nom de `Server-Timing`.

### Exemple d'utilisation de la configuration timing

`server.timing` peut être un objet pour fournir des options. Actuellement, seul `total` est supporté (qui enregistre le temps passé sur le rendu côté serveur)

```js{}[nuxt.config.js]
export default {
  server: {
    timing: {
      total: true
    }
  }
}
```

### Utilisation de l'api timing

L'api `timing` est également injectée dans la `response` côté serveur lorsque `server.time` est activé.

#### Syntaxe

```js
res.timing.start(name, description)
res.timing.end(name)
```

#### Exemple d'utilisation de timing dans le servermiddleware

```js
export default function (req, res, next) {
  res.timing.start('midd', 'Middleware timing description')
  // fonctionnement côté serveur..
  // ...
  res.timing.end('midd')
  next()
}
```

Ensuite, `server-timing` sera inclus dans l'en-tête de la réponse comme :

```bash
Server-Timing: midd;desc="Middleware timing description";dur=2.4
```

Veuillez consulter [Server-Timing MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing) pour plus de détails.
