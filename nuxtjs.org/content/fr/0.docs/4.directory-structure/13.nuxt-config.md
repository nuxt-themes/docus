---
title: nuxt.config
description: Par défaut, Nuxt.js est configuré de sorte à pouvoir couvrir la plupart des cas. Cette configuration peut être écrasée grâce au fichier nuxt.config.js.
position: 14
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/15_nuxt-config?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
---

Par défaut, Nuxt.js est configuré de sorte à pouvoir couvrir la plupart des cas. Cette configuration peut être écrasée grâce au fichier nuxt.config.js.

## nuxt.config.js

### build

Cette option permet de configurer différents paramètres lors de l'étape de build, cela inclus les `loaders`, les `noms de fichiers`, la `configuration Webpack` ainsi que la `transpilation`.

```js{}[nuxt.config.js]
export default {
  build: {
    /*
     ** On peut personnaliser la configuration de Webpack ici
     */
    extend(config, ctx) {}
  }
}
```

<base-alert type="next">

Se référer à la propriété [build](/docs/2.x/configuration-glossary/configuration-build).

</base-alert>

### css

Cette option permet de définir les fichiers CSS, les modules et les librairies que l'on veut inclure globalement (sur chaque page).

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main.css', '~/assets/css/animations.scss']
}
```

On peut omettre l'extension pour les fichiers CSS/SCSS/Postcss/Less/Stylus/... listés dans le tableau css du fichier `nuxt.config.js`.

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main', '~/assets/css/animations']
}
```

En omettant l'extension, cela nous permet de ne pas avoir à renommer le fichier si jamais on décide de le passer du CSS au SASS.

<base-alert type="next">

Se référer à la propriété [css](/docs/2.x/configuration-glossary/configuration-css).

</base-alert>

### dev

Cette option permet de définir le mode `development` ou `production` de Nuxt.js (utile lorsque l'on veut utiliser Nuxt.js de façon programmatique).

```js{}[nuxt.config.js]
export default {
  dev: process.env.NODE_ENV !== 'production'
}
```

<base-alert type="next">

Se référer à la propriété [dev](/docs/2.x/configuration-glossary/configuration-dev).

</base-alert>

### env

Cette option permet de définir des variables d'environment qui seront disponibles côté client mais aussi serveur.

```js{}[nuxt.config.js]
export default {
  env: {
    baseUrl: process.env.BASE_URL || baseUrl
  }
}
```

<base-alert type="next">

Se référer à la propriété [env](/docs/2.x/configuration-glossary/configuration-env).

</base-alert>

### generate

Cette option permet de définir les paramètres pour chaque route dynamique de l'application, ces derniers seront transformés en fichiers HTML par Nuxt.js.

```js{}[nuxt.config.js]
export default {
  generate: {
    dir: 'gh_pages', // gh_pages/ au lieu de dist/
    subFolders: false // les fichiers HTML sont générés en fonction du chemin de la route
  }
}
```

<base-alert type="next">

Se référer à la propriété [generate](/docs/2.x/configuration-glossary/configuration-generate).

</base-alert>

### head

```js{}[nuxt.config.js]
export default {
	head: {
    title: 'my title',
    meta: [
      { charset: 'utf-8' },
			.....
		]
	}
}
```

Cette option permet de définir toutes les balises méta par défaut pour l'application.

<base-alert type="next">

Se référer à la propriété [head](/docs/2.x/configuration-glossary/configuration-head).

</base-alert>

### loading

Cette option permet de personnaliser le composant de chargement que Nuxt.js utilise par défaut.

```js{}[nuxt.config.js]
export default {
  loading: {
    color: '#fff'
  }
}
```

<base-alert type="next">

Se référer à l'intégration du [chargement](/docs/2.x/configuration-glossary/configuration-loading).

</base-alert>

### modules

Cette option permet d'ajouter des modules Nuxt.js au projet.

```js{}[nuxt.config.js]
export default {
  modules: ['@nuxtjs/axios']
}
```

<base-alert type="next">

Se référer à la propriété [modules](/docs/2.x/configuration-glossary/configuration-modules).

</base-alert>

### modulesDir

Cette propriété est utilisée pour définir les répertoires des modules afin de déterminer le chemin de résolution. Par ex: le `resolveLoading`, ` nodeExternals` et `postcss` de Webpack. Le chemin de la configuration est relatif par rapport à `options.rootDir` (par défaut: process.cwd()).

```js{}[nuxt.config.js]
export default {
  modulesDir: ['../../node_modules']
}
```

Adapter cet emplacement peut être nécessaire si le projet est organisé en tant que workspace Yarn avec un mono-repo.

<base-alert type="next">

Se référer à la propriété [modulesDir](/docs/2.x/configuration-glossary/configuration-modulesdir).

</base-alert>

### plugins

Cette option permet de définir les plugins JavaScript qui devraient s'exécuter avant l'instanciation de l'application Vue.js principale.

```js{}[nuxt.config.js]
export default {
  plugins: ['~/plugins/url-helpers.js']
}
```

<base-alert type="next">

Se référer à la propriété [plugins](/docs/2.x/configuration-glossary/configuration-plugins).

</base-alert>

### router

Avec l'option `router`, on peut écraser la configuration de Nuxt.js par défaut pour le routeur de Vue.js.

```js{}[nuxt.config.js]
export default {
  router: {
    linkExactActiveClass: 'text-primary'
  }
}
```

<base-alert type="next">

Se référer à la propriété [router](/docs/2.x/configuration-glossary/configuration-router).

</base-alert>

### server

Cette option permet de configurer des variables de connexion pour l'instance du serveur de l'application Nuxt.js.

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

<base-alert type="next">

Se référer à la propriété [server](/docs/2.x/configuration-glossary/configuration-server).

</base-alert>

### srcDir

Cette option permet de définir le répertoire source de l'application Nuxt.js.

```js{}[nuxt.config.js]
export default {
  srcDir: 'client/'
}
```

Exemple de la structure du projet de l'application Nuxt.js avec le répertoire `client`:

```bash
**-| app/
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
------| store/**
```

### dir

Cette option permet de définir des noms personnalisés pour les répertoires de l'application Nuxt.js.

```js{}[nuxt.config.js]
export default {
  pages: 'views' // Nuxt.js va chercher les pages dans le répertoire views/ et non pages/
}
```

<base-alert type="next">

Se référer à la propriété [dir](/docs/2.x/configuration-glossary/configuration-dir).

</base-alert>

### pageTransition

Cette option permet de définir les propriétés par défaut pour les transitions de page.

```js{}[nuxt.config.js]
export default {
  pageTransition: 'page'
}
```

<base-alert type="next">

Se référer à la propriété [transition](/docs/2.x/configuration-glossary/configuration-transition).

</base-alert>

## Autres fichiers de configuration

Outre le fichier `nuxt.config.js`, il peut y avoir d'autres fichiers de configuration à la racine du projet, tels que [.eslintrc](https://eslint.org/), [prettier.config.json](https://prettier.io/) ou [.gitignore](https://git-scm.com/docs/gitignore). Ces derniers sont utilisés pour configurer des outils tels que le linter, le formateur de code ou votre repository Git, ils sont donc décorrélés du fichier `nuxt.config.js`.

### .gitignore

Dans le fichier `.gitignore`, il faudra ajouter les entrées qui suivent afin qu'elles soient ignorées du système de contrôle de version. `node_modules` où tous les modules sont installés. Le répertoire `nuxt` qui est créé lorsque l'on lance les commandes `dev` ou `build`. Le répertoire `dist` qui est créé lorsque l'on lance la commande `generate`.

```markdown{}[.gitignore]
node_modules .nuxt dist
```

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

### Et maintenant ?

<base-alert type="next">

Se référer au [glossaire de configuration](/docs/2.x/configuration-glossary/configuration-build).

</base-alert>
