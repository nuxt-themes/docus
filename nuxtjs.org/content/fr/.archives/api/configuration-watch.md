---
title: 'API: La propriété watch'
description: La propriété watch vous permet de regarder des fichiers personnalisés pour redémarrer le serveur.
menu: watch
category: configuration
position: 133
---

- Type: `Object`
- Par défaut: `[]`

> La propriété watch vous permet de regarder des fichiers personnalisés pour redémarrer le serveur.

```js
watch: ['~/custom/*.js']
```

[chokidar](https://github.com/paulmillr/chokidar) est utilisé pour configurer les observateurs. Pour en savoir plus sur les options de modèle de chokidar, consultez [chokidar API](https://github.com/paulmillr/chokidar#api).
