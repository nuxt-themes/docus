---
title: 'API: La propriété server'
description: Nuxt.js vous permet de définir les variables de connexion au serveur pour votre application dans `nuxt.config.js`.
menu: server
category: configuration
position: 126
---

- Type: `Object`

> Nuxt.js vous permet de définir les variables de connexion au serveur pour votre application dans `nuxt.config.js`.

## Exemple basique (`nuxt.config.js`):

```js
export default {
  server: {
    port: 8000, // par défaut: 3000
    host: '0.0.0.0', // par défaut: localhost,
    timing: false
  }
}
```

Cela vous permet de spécifier [l'hôte et le port](/docs/2.x/features/configuration#edit-host-and-port) pour votre instance de serveur Nuxt.js.

## Exemple d'utilisation de configuration HTTPS

`nuxt.config.js`

```js
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

Vous pouvez trouver des informations supplémentaires sur la création de clés de serveur et de certificats sur `localhost` dans l'article de [certificats pour localhost](https://letsencrypt.org/docs/certificates-for-localhost/).

## Exemple d'utilisation de configuration des sockets

```js
export default {
  server: {
    socket: '/tmp/nuxt.socket'
  }
}
```

## timing

- Type: `Object` ou `Boolean`
- Par défaut: `false`

L'activation de l'option `server.timing` ajoute un middleware pour mesurer le temps écoulé pendant le rendu côté serveur et l'ajoute aux en-têtes comme 'Server-Timing'

### Exemple d'utilisation de configuration de synchronisation

`server.timing` peut être un objet pour fournir des options. Actuellement, seul `total` est pris en charge (qui suit directement tout le temps passé sur le rendu côté serveur)

```js
export default {
  server: {
    timing: {
      total: true
    }
  }
}
```

### Utilisation de l'API de synchronisation

L'API `timing` est également injectée dans la `response` côté serveur lorsque `server.time` est activé.

#### Syntaxe

```js
res.timing.start(name, description)
res.timing.end(name)
```

#### Exemple d'utilisation de synchronisation dans le servermiddleware

```js
export default function (req, res, next) {
  res.timing.start('midd', 'Middleware timing description')
  // opération côté serveur..
  // ...
  res.timing.end('midd')
  next()
}
```

Ensuite, `server-timing` sera incluse dans l'en-tête de réponse comme:

```bash
Server-Timing: midd;desc="Middleware timing description";dur=2.4
```

Veuillez vous reporter à [Server-Timing MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing) pour plus d'informations.
