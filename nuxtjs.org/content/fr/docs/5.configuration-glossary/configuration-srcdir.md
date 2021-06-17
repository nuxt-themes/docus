---
title: 'La propriété srcDir'
description: Défini le répertoire source de votre application Nuxt.js
menu: srcDir
category: configuration-glossary
position: 28
---

- Type: `String`
- Par défaut : [rootDir value](/docs/2.x/configuration-glossary/configuration-rootdir)

> Défini le répertoire source de votre application Nuxt.js

Si un chemin relatif est spécifié, il sera relatif au `rootDir`.

Exemple 1 : Prérequis :

```js{}[nuxt.config.js]
export default {
  srcDir: 'client/'
}
```

```js{}[package.json]
  "script": {
    "dev": "yarn nuxt"
  }
```

fonctionne avec la structure de répertoires suivante (notez que nuxt.config est listé dans le répertoire app)

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

Au lieu de l'exemple 1, vous pouvez également déplacer le fichier nuxt.config dans notre répertoire `src`. Dans ce cas, il vous suffit de spécifier le client comme `rootDir` et vous pouvez laisser `srcDir` vide :

Prérequis:

```js{}[nuxt.config.js]
export default {
  srcDir: '' // ou simplement la supprimer
}
```

```js{}[package.json]
  "script": {
    "dev": "yarn nuxt client" // cela définit le client comme le rootDir
  }
```

fonctionne avec la structure de répertoires suivante (notez que `nuxt.config.js` est listé dans le répertoire client)

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
