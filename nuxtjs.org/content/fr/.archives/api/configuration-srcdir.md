---
title: 'API: La propriété srcDir'
description: Définissez le répertoire source de votre application Nuxt.js
menu: srcDir
category: configuration
position: 128
---

- Type: `String`
- Par défaut: [valeur rootDir](/api/configuration-rootdir)

> Définissez le répertoire source de votre application Nuxt.js

Si un chemin relatif est spécifié, il sera relatif au rootDir

Exemple 1: Conditions préalables:

```js
// nuxt.config.js
export default {
  srcDir: 'client/'
}

// package.json
  "script": {
    "dev": "yarn nuxt"
  }
```

fonctionne avec la structure de dossiers suivante (notez que nuxt.config est répertorié dans le répertoire de l'application)

```bash
-| app/
---| node_modules/
---| nuxt.config.js
---| package.json
---| client/
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/
```

Exemple 2:

Contrairement à l'exemple 1, vous pouvez également déplacer le nuxt.config dans votre dossier src. Dans ce cas, il vous suffit de spécifier le client comme rootDir et vous pouvez laisser srcDir vide:

Conditions préalables:

```js
// nuxt.config.js
export default {
  srcDir: '' // ou simplement le retirer
}

// package.json
  "script": {
    "dev": "yarn nuxt client" // cela définit le client comme rootDir
  }
```

fonctionne avec la structure de dossiers suivante (notez que nuxt.config est répertorié dans le répertoire client)

```bash
-| app/
---| node_modules/
---| package.json
---| client/
------| nuxt.config.js
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/
```
