---
title: Installation
description: Nous pouvons découvrir ci-dessous comment créer un projet Nuxt.js fonctionnel en 4 étapes.
position: 1
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/01_installation?fontsize=14&hidenavigation=1&theme=dark
---

## Prérequis

- [node](https://nodejs.org) - au moins v10.13 _Nous vous recommandons d'installer la dernière version LTS._
- Un éditeur de texte, nous recommandons [VSCode](https://code.visualstudio.com/) avec l'extension [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) ou [WebStorm](https://www.jetbrains.com/webstorm/)
- Un terminal, nous vous recommandons d'utiliser [le terminal intégré de VSCode](https://code.visualstudio.com/docs/editor/integrated-terminal) ou le [terminal de Webstorm](https://www.jetbrains.com/help/webstorm/terminal-emulator.html).

## Utiliser create-nuxt-app

Pour créer rapidement un nouveau projet, nous pouvons utiliser [create-nuxt-app](https://github.com/nuxt/create-nuxt-app).

Il faut vérifier que `npx` est installé (npx est livré par défaut depuis npm v5.2.0) ou npm v6.1 ou yarn.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn create nuxt-app <project-name>
```

  </code-block>
  <code-block label="npx">

```bash
npx create-nuxt-app <project-name>
```

  </code-block>
    <code-block label="npm">

```bash
npm init nuxt-app <project-name>
```

  </code-block>

</code-group>

Quelques questions nous seront posées (nom, options Nuxt, framework UI, TypeScript, linter, framework de test, etc.). Pour en savoir plus sur toutes les options voir [Create Nuxt App](https://github.com/nuxt/create-nuxt-app/blob/master/README.md).

Quand on y aura répondu, toutes les dépendances seront installées. La prochaine étape est de naviguer dans le répertoire et de démarrer notre application:

<code-group>
  <code-block label="Yarn" active>

```bash
cd <project-name>
yarn dev
```

  </code-block>
  <code-block label="npm">

```bash
cd <project-name>
npm run dev
```

  </code-block>
</code-group>

Notre application est maintenant en cours d'exécution sur [http://localhost:3000](http://localhost:3000).

<base-alert type="info">

Une autre façon de démarrer avec Nuxt.js est d'utiliser [CodeSandbox](https://template.nuxtjs.org) ce qui est un excellent moyen de jouer rapidement avec Nuxt.js et/ou de partager votre code avec d'autres personnes.

</base-alert>

## Commencer de zéro

Créer un projet Nuxt.js de zéro demande seulement un répertoire et un fichier.

Dans cet exemple, nous allons utiliser le terminal pour créer les répertoires et fichiers mais nous pouvons utiliser votre éditeur pour les créer.

### Première étape : configurer votre projet

Pour commencer, il faut créer un répertoire vide avec le nom du projet et naviguer à l'intérieur de celui-ci :

```bash
mkdir <nom-du-projet>
cd <nom-du-projet>
```

_Remplacer `<nom-du-projet>` avec le nom du projet._

Puis créer un fichier nommé `package.json` :

```bash
touch package.json
```

Ouvrir le fichier `package.json` avec notre éditeur préféré et ajouter ce contenu JSON :

```json{}[package.json]
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "start": "nuxt start"
  }
}
```

`scripts` définit les commandes Nuxt.js que nous allons lancer avec la commande `npm run <commande>`.

#### **À quoi sert le fichier package.json ?**

Le fichier `package.json` est comme une carte d'identité pour notre projet. Si on ne sait pas ce qu'est le fichier `package.json`, nous vous recommandons grandement de lire la [documentation de npm](https://docs.npmjs.com/creating-a-package-json-file).

### Deuxième étape : installer nuxt

Une fois le fichier `package.json` créé, nous devons ajouter `nuxt` à votre projet avec la commande `npm` ou `yarn` comme ci-dessous :

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add nuxt
```

  </code-block>
  <code-block label="npm">

```bash
npm install nuxt
```

  </code-block>
</code-group>

Cette commande va ajouter `nuxt` comme une dépendance du projet et va automatiquement l'ajouter à notre `package.json`. Le répertoire `node_modules` va aussi être créé, c'est l'endroit où sont installés tous les packages et leurs dépendances.

<base-alert type="info">

Un fichier `yarn.lock` ou `package-lock.json` est aussi créé, ce qui assure une consistance et une compatibilité dans les dépendances installées par votre projet.

</base-alert>

### Troisième étape : créer notre première page

Nuxt.js transforme tous les fichiers `*.vue` dans le répertoire `pages` comme une route pour l'application.

Créer le répertoire `pages` dans notre projet :

```bash
mkdir pages
```

Puis, créer un fichier `index.vue` dans le répertoire `pages` :

```bash
touch pages/index.vue
```

Il est important que cette page soit appelée `index.vue` car elle sera la page par défaut quand notre application sera ouverte. C'est la page d'accueil et elle doit être appelée index.

Il faut ouvrir le fichier `index.vue` dans notre éditeur et ajouter le contenu suivant :

```html{}[pages/index.vue]
<template>
  <h1>Hello world!</h1>
</template>
```

### Étape finale : lancer le projet

On peut lancer notre projet en tapant la commande ci-dessous dans le terminal :

<code-group>
  <code-block label="Yarn" active>

```bash
yarn dev
```

  </code-block>
  <code-block label="npm">

```bash
npm run dev
```

  </code-block>
</code-group>

<base-alert type="info">

La commande `dev` est utilisée lorsque l'application est lancée en mode développement.

</base-alert>

L'application est maintenant en cours d'exécution sur **[http://localhost:3000](http://localhost:3000/).**

On peut l'ouvrir dans notre navigateur en cliquant sur le lien dans le terminal et nous devrions voir le texte "Hello World" que nous avons ajouté dans l'étape précédente.

<base-alert type="info">

Une fois Nuxt.js lancé en mode développement, il écoutera les changements de fichiers dans la plupart des répertoires, il n'est pas nécessaire de redémarrer l'application quand on édite ou ajoute une page.

</base-alert>

<base-alert type="warning">

Lorsque on lance la commande `dev`, un répertoire `.nuxt` est créé. Ce répertoire devrait être ignoré par Git (ou tout autre système de gestion de versions). On peut faire ceci en créant un fichier `.gitignore` à la racine de votre projet et en y ajoutant `.nuxt`.

</base-alert>

### Étape bonus

Créer une page nommée `fun.vue` dans le répertoire `pages`.

Ajouter un `<template></template>` et insérer un titre avec une phrase drôle à l'intérieur.

On peut ensuite aller sur le navigateur et regarder la nouvelle page sur **[http://localhost:3000/fun](http://localhost:3000/fun).**

<base-alert type="info">

Si nous créons un répertoire nommé `more-fun` et ajoutons un fichier `index.vue` à l'intérieur, cela donnera le même résultat que de créer un fichier `more-fun.vue`.

</base-alert>

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>
