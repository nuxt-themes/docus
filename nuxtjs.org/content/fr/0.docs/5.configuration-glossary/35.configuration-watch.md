---
title: 'La propriété watch'
description: La propriété watch vous permet de surveiller des fichiers personnalisés pour le redémarrage du serveur.
menu: watch
category: configuration-glossary
position: 33
---

- Type : `Object`
- Par défaut : `[]`

> La propriété watch vous permet de surveiller des fichiers personnalisés pour le redémarrage du serveur.

```js
watch: ['~/custom/*.js']
```

[chokidar](https://github.com/paulmillr/chokidar) est utilisée pour mettre en place les surveillants. Pour en savoir plus sur les options de chokidar, voir l'[API chokidar](https://github.com/paulmillr/chokidar#api).
