---
title: La propriété render
description: Nuxt.js permet de personnaliser les options au runtime pour le render des pages
menu: render
category: configuration-glossary
position: 22
---

> Nuxt.js permet de personnaliser les options au runtime pour le render des pages

## bundleRenderer

- Type: `Object`

> On peut utiliser cette option pour personnaliser le render pour le bundle de `Vue SSR`. Cette option est ignorée lorsque l'on est en mode SPA.

```js{}[nuxt.config.js]
export default {
  render: {
    bundleRenderer: {
      directives: {
        personnalise1(el, dir) {
          // quelque chose ...
        }
      }
    }
  }
}
```

Pour en savoir davantage sur les options disponibles, on peut consulter l'API de [Vue SSR](https://ssr.vuejs.org/en/api.html#renderer-options). Il est recommandé de ne pas utiliser cette option car Nuxt.js s'occupe déjà de fournir les meilleures valeurs par défaut pour le rendu côté serveur et, une mauvaise configuration pourrait mener à des problèmes de SSR.

## etag

- Type: `Object`
  - Par défaut: `{ weak: true }`

Pour désactiver `etag` pour les pages, il faut définir `etag: false`.

Se référer à la documentation de [etag](https://www.npmjs.com/package/etag) pour voir les options disponibles.

On peut utiliser notre propre fonction de hash en définissant `etag.hash`:

```js{}[nuxt.config.js]
import { murmurHash128 } from 'murmurhash-native'

export default {
  render: {
    etag: {
      hash: html => murmurHash128(html)
    }
  }
}
```

Dans ce cas, nous utilisons [murmurhash-native](https://github.com/royaltm/node-murmurhash-native), qui est plus rapide pour des body HTML plus larges. À noter que l'option `weak` est ignorée lorsque l'on spécifie notre propre fonction de hachage.

## compressor

- Type `Object`
  - Par défaut: `{ threshold: 0 }`

Lorsque l'on fournit un objet, le middleware de [compression](https://www.npmjs.com/package/compression) sera utilisé (avec les options adéquates).

Si l'on souhaite utiliser notre propre middleware de compression, on peut le désigner directement (ex: `otherComp({ myOptions: 'exemple' })`).

Pour désactiver la compression, on utilise `compressor: false`.

## fallback

- Type `Object`
  - Par défaut: `{ dist: {}, static: { skipUnknown: true } }`

> Options pour le middleware de [serve-placeholder](https://github.com/nuxt/serve-placeholder).

Si on souhaite désactiver un des deux voire les deux, il suffit de passer une valeur `falsy`.

## http2

- Type `Object`
  - Par défaut: `{ push: false, pushAssets: null }`

> Active les headers push en HTTP2.

On peut surveiller les liens que l'on pousse en utilisant la fonction `pushAssets`.

Exemple:

```js
pushAssets: (req, res, publicPath, preloadFiles) =>
  preloadFiles
    .filter(f => f.asType === 'script' && f.file === 'runtime.js')
    .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
```

On peut aussi ajouter nos propres ressources au tableau. En utilisant `req` et `res` on peut décider quels liens seront poussés en fonction des entêtes de la requête, par exemple en utilisant le cookie contenant le numéro de version de notre application.

Les ressources seront reliées entre elles par un `,` et passées en tant qu'un seul entête `Link`.

## injectScripts

- Type: `Boolean`
  - Par défaut: `true`

> Ajoute le `<script>` pour les bundles de Nuxt.js, il faut le définir à `false` pour render du HTML pur, sans JS (disponible depuis la version `2.8.0`).

## resourceHints

- Type: `Boolean`
  - Par défaut: `true`

> Ajoute des liens `prefetch` et `preload` pour un chargement de page initial plus rapide.

On pourrait souhaiter désactiver cette option seulement si l'on possède beaucoup de pages et de routes.

## ssr

- Type: `Boolean`
  - Par défaut: `true` en mode universel et `false` en mode SPA

> Active le render SSR

Si non fournie, cette option est automatiquement définie en fonction de la valeur de `mode`. Elle peut être utile pour dynamiquement activer/désactiver le SSR lors du runtime après que les builds des images soient finis (avec Docker par exemple).

## crossorigin

- Type: `String`
- Par défaut: `undefined`

> Permet de personnaliser l'attribut `crossorigin` dans les balises `<link rel="stylesheet">` et `<script>` générées dans le HTML.

Plus d'informations: [attributs des paramètres CORS](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes).

## ssrLog

- Type: `Boolean` | `String`
  - Par défaut: `true` en mode développement et `false` en production

> Transmet les logs du serveur au navigateur pour un meilleur débogage (disponible uniquement en développement).

Pour réduire (rendu visuel) les logs, on peut utiliser la valeur `'collapsed'`.

## static

- Type: `Object`
  - Par défaut: `{}`

> Permet de personnaliser le comportement du répertoire `static/`

Se référer à la documentation de [serve-static](https://www.npmjs.com/package/serve-static) pour voir les options disponibles.

En plus de celles-ci, nous avons introduit une option `prefix` qui est à `true` par défaut. Cela a pour but d'ajouter la base du routeur à nos ressources statiques.

**Exemple:**

- Ressource: `favicon.ico`
- Base du routeur: `/t`
- Avec `prefix: true` (par défaut): `/t/favicon.ico`
- Avec `prefix: false`: `/favicon.ico`

**Mise en garde**:

Certaines ré-écritures d'URL peuvent ne pas respecter le préfixe.

## dist

- Type: `Object`
  - Par défaut: `{ maxAge: '1y', index: false }`

> Options utilisées pour les fichiers distribués. Applicable seulement en production.

Se référer à la documentation de [serve-static](https://www.npmjs.com/package/serve-static) pour voir les options disponibles.

## csp

- Type: `Boolean` ou `Object`
  - Par défaut: `false`

> On peut utiliser ceci pour configurer le Content-Security-Policy afin de charger des ressources externes.

**Pré-requis**:

Ces paramètres CSP sont effectifs seulement quand on utilise Nuxt.js avec `target: 'server'` pour servir notre application SSR. Les `Policies` définies dans `csp.policies` sont ajoutées à la réponse de l'entête HTTP `Content-Security-Policy`.

**Mise à jour des paramètres**:

Ces paramètres sont lus directement par le serveur Nuxt.js à partir du fichier `nuxt.config.js`. Cela veut dire que des changements à ces paramètres prendront effet lorsque le serveur sera relancé. Il n'y a pas besoin de re-build l'application pour mettre à jour les paramètres CSP.

**Méta-balises HTML**:

Dans l'objectif d'ajouter [`<meta http-equiv="Content-Security-Policy"/>`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) au `head`, on aura besoin de passer `csp.addMeta` à `true`. À noter que cette fonctionnalité est indépendante de la configuration des `csp.policies`:

- cela ajoute seulement un `script-src` type policy
- le `script-src` policy contient seulement les hashs des balises `<script>` qui ont été inline.

Lorsque `csp.addMeta` est à `true`, la liste complète des policies définies est toujours ajoutée à l'entête de réponse HTTP.

À noter que les hashs CSP ne seront pas ajoutés en tant que `<meta>` si la policy `script-src` contient `'unsafe-inline'`. Cela est dû au fait que le navigateur ignore `'unsafe-inline'` si des hashs sont présents. Il faut passer l'option `unsafeInlineCompatibility` à `true` si on veut que les hashs et `'unsafe-inline'` soient compatibles avec CSPv1. Dans ce cas, la balise `<meta>` ne contiendra toujours que les hashs des des balises `<script>` inline, et les policies définies dans `csp.policies` seront utilisées dans l'entête de réponse HTTP.

```js{}[nuxt.config.js]
export default {
  render: {
    csp: true
  }
}

// OU

export default {
  render: {
    csp: {
      hashAlgorithm: 'sha256',
      policies: {
        'script-src': [
          'https://www.google-analytics.com',
          'https://name.example.com'
        ],
        'report-uri': ['https://report.example.com/report-csp-violations']
      },
      addMeta: true
    }
  }
}

// OU
/*
  L'exemple suivant permet à Google Analytics, LogRocket.io, et Sentry.io
  de permettre des logs ainsi qu'un tracking analytique.

  Plus d'informations sont disponibles sur cet article de Sentry.io
  afin de comprendre quel lien de tracking nous devrions utiliser.
  https://blog.sentry.io/2018/09/04/how-sentry-captures-csp-violations
*/
const PRIMARY_HOSTS = `loc.example-website.com`
export default {
  render: {
    csp: {
      reportOnly: true,
      hashAlgorithm: 'sha256',
      policies: {
        'default-src': ["'self'"],
        'img-src': ['https:', '*.google-analytics.com'],
        'worker-src': ["'self'", `blob:`, PRIMARY_HOSTS, '*.logrocket.io'],
        'style-src': ["'self'", "'unsafe-inline'", PRIMARY_HOSTS],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          PRIMARY_HOSTS,
          'sentry.io',
          '*.sentry-cdn.com',
          '*.google-analytics.com',
          '*.logrocket.io'
        ],
        'connect-src': [PRIMARY_HOSTS, 'sentry.io', '*.google-analytics.com'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
        'object-src': ["'none'"],
        'base-uri': [PRIMARY_HOSTS],
        'report-uri': [
          `https://sentry.io/api/<project>/security/?sentry_key=<key>`
        ]
      }
    }
  }
}
```
