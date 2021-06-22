---
title: 'API: La propriété render'
description: Nuxt.js vous permet de personnaliser les options d'exécution pour le rendu des pages
menu: render
category: configuration
position: 122
---

> Nuxt.js vous permet de personnaliser les options d'exécution pour le rendu des pages

## bundleRenderer

- Type: `Object`

> Utilisez cette option pour personnaliser le rendu du bundle vue SSR. Cette option est ignorée pour le mode spa.

```js
export default {
  render: {
    bundleRenderer: {
      directives: {
        custom1(el, dir) {
          // quelque chose ...
        }
      }
    }
  }
}
```

En savoir plus sur les options disponibles dans [Référence de l'API Vue SSR](https://ssr.vuejs.org/en/api.html#renderer-options). Il est recommandé de ne pas utiliser cette option car Nuxt.js fournit déjà les meilleurs paramètres par défaut SSR et une mauvaise configuration peut entraîner des problèmes SSR.

## etag

- Type: `Object`
  - Par défaut: `{ weak: true }`

Pour désactiver etag sur l'ensemble de pages `etag: false`

Voir la documentation [etag](https://www.npmjs.com/package/etag) pour les options possibles.

Vous pouvez utiliser votre propre fonction de hachage en spécifiant `etag.hash`:

`nuxt.config.js`

```js
import { murmurHash128 } from 'murmurhash-native'

export default {
  render: {
    etag: {
      hash: html => murmurHash128(html)
    }
  }
}
```

Dans ce cas, nous utilisons [murmurhash-native](https://github.com/royaltm/node-murmurhash-native), ce qui est plus rapide pour les grandes tailles de corps html. Notez que l'option `weak` est ignorée lors de la spécification de votre propre fonction de hachage.

## compressor

- Type `Object`
  - Par défaut: `{ threshold: 0 }`

Lors de la fourniture d'un objet, le middleware de [compression](https://www.npmjs.com/package/compression) sera utilisé (avec les options respectives).

Si vous souhaitez utiliser votre propre middleware de compression, vous pouvez le référencer directement (cf: `otherComp({ myOptions: 'example' })`).

Pour désactiver la compression, utilisez `compressor: false`.

## fallback

- Type `Object`
  - Par défaut: `{ dist: {}, static: { skipUnknown: true } }`

> Les options de middleware pour [serve-placeholder](https://github.com/nuxt/serve-placeholder).

Si vous souhaitez désactiver l'un d'entre eux ou les deux, vous pouvez transmettre une valeur falsifiée.

## http2

- Type `Object`
  - Par défaut: `{ push: false, pushAssets: null }`

> Activez les en-têtes push HTTP2.

Vous pouvez contrôler les liens à pousser en utilisant la fonction `pushAssets`.

Exemple:

```js
pushAssets: (req, res, publicPath, preloadFiles) =>
  preloadFiles
    .filter(f => f.asType === 'script' && f.file === 'runtime.js')
    .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
```

Vous pouvez également ajouter vos propres ressources au tableau. En utilisant `req` et `res` vous pouvez décider quels liens poussés en fonction des requêtes d'en-têtes, par exemple en utilisant le cookie avec la version de l'application.

Les ressources seront jointes ensemble avec `,` et transmises comme un seul en-tête `Link`.

## injectScripts

- Type: `Boolean`
  - Par défaut: `true`

> Ajoute le `<script>` pour les bundles Nuxt, définissez-le sur `false` pour rendre le HTML pur sans JS (disponible avec `2.8.0+`)

## resourceHints

- Type: `Boolean`
  - Par défaut: `true`

> Ajoute des liens `prefetch` et `preload` pour accélérer le temps de chargement initial de la page.

Vous souhaiterez peut-être désactiver cette option uniquement si vous avez plusieurs pages et chemins.

## ssr

- Type: `Boolean`
  - Par défaut: `true` on universal mode and `false` on spa mode

> Activer le rendu SSR

Cette option est automatiquement définie en fonction de la valeur de `mode` si elle n'est pas fournie. Cela peut être utile pour activer/désactiver dynamiquement le rendu SSR lors de l'exécution après la génération d'images (avec docker par exemple).

## ssrLog

- Type: `Boolean` | `String`
  - Par défaut: `true` in dev mode and `false` in production

> Transférer les journaux côté serveur vers le navigateur pour un meilleur débogage (uniquement disponible en développement)

Pour réduire les journaux, utilisez la valeur `'collapsed'`.

## static

- Type: `Object`
  - Par défaut: `{}`

> Configurer le comportement du répertoire `static/`

Voir la documentation [serve-static](https://www.npmjs.com/package/serve-static) pour les options possibles.

En plus de cela, nous avons introduit une option `prefix` qui par défaut est `true`. Il ajoutera la base du routeur à vos ressources statiques.

**Exemple:**

- Ressource: `favicon.ico`
- Chemin: `/t`
- Avec `prefix: true` (par défaut): `/t/favicon.ico`
- Avec `prefix: false`: `/favicon.ico`

**Avertissements:**

Certaines réécritures d'URL peuvent ne pas respecter le préfixe.

## dist

- Type: `Object`
  - Par défaut: `{ maxAge: '1y', index: false }`

> Options utilisées pour servir les fichiers de distribution. Uniquement applicable en production.

Voir la documentation [serve-static](https://www.npmjs.com/package/serve-static) pour les options possibles.

## csp

- Type: `Boolean` or `Object`
  - Par défaut: `false`

> Utilisez ceci pour configurer le chargement des ressources externes de Content-Security-Policy

Notez que les hachages CSP ne seront pas ajoutés si la politique `script-src` contient `'unsafe-inline'`. Cela est dû au fait que le navigateur ignore `'unsafe-inline'` si des hachages sont présents. Définissez l'option `unsafeInlineCompatibility` sur `true` si vous voulez à la fois les hachages et `'unsafe-inline'` pour la compatibilité CSPv1.

Afin d'ajouter [`<meta http-equiv="Content-Security-Policy"/>`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) vous devez définir `csp.addMeta` sur `true`.

Exemple (`nuxt.config.js`)

```js
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
  L'exemple suivant autorise Google Analytics, LogRocket.io et Sentry.io pour
  la journalisation et le suivi analytique.

  Consulter ce blog sur Sentry.io
  https://blog.sentry.io/2018/09/04/how-sentry-captures-csp-violations

  Pour savoir quel lien de suivi vous devez utiliser.
*/
const PRIMARY_HOSTS = `loc.example-website.com`
export default {
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
```
