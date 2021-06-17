---
title: .nuxt
description: Le répertoire `.nuxt` est le répertoire de build. Il est dynamiquement généré et caché du système de fichier par défaut. À l'intérieur du répertoire nous pouvons trouver des fichiers générés automatiquement en utilisant la commande `nuxt dev` ou bien nos artefacts de construction lorsque nous utilisons `nuxt build`.
position: 1
category: directory-structure
questions:
  - question: Quelle(s) commande(s) permet(tent) de générer le répertoire .nuxt ?
    answers:
      - nuxt start
      - nuxt generate
      - nuxt build or nuxt dev
    correctAnswer: nuxt build ou nuxt dev
  - question: Quelle propriété devons nous utiliser pour renommer le répertoire nuxt ?
    answers:
      - dir
      - build
      - buildDir
    correctAnswer: buildDir
  - question: Dans quel fichier pouvons nous trouver les routes générées ?
    answers:
      - pages.js
      - router.js
      - views.js
    correctAnswer: router.js
  - question: Que pouvons-nous trouver dans le répertoire des composants ?
    answers:
      - nuxt components
      - custom components
      - global components
    correctAnswer: nuxt components
  - question: Le répertoire `.nuxt` est le répertoire qui doit être mis en ligne lorsque nous déployons des sites statiques ?
    answers:
      - vrai
      - faux
    correctAnswer: faux
---

Le répertoire `.nuxt` est le répertoire de build. Il est dynamiquement généré et caché du système de fichier par défaut. À l'intérieur du répertoire nous pouvons trouver des fichiers générés automatiquement en utilisant la commande `nuxt dev` ou bien nos artefacts de construction lorsque nous utilisons `nuxt build`. La modification de ces fichiers est idéale pour le débogage mais rappelons-nous qu'il s'agit de fichiers générés et qu'une fois que nous exécuterons à nouveau la commande `dev` ou `build`, tout ce qui a été modifié ici sera écrasé.

<base-alert>

Le répertoire `.nuxt` ne doit pas être versionné par le système de contrôle de version (ex: git) et doit être ignoré via le `.gitignore` car il sera généré automatiquement lors de l'exécution de `nuxt dev` ou de `nuxt build`.

</base-alert>

### La propriété buildDir:

Par défaut, de nombreux outils supposent que `.nuxt` est un répertoire caché car son nom commence par un point. Nous pouvons utiliser l'option buildDir dans `nuxt.config.js` pour éviter cela. Si nous changeons le nom n'oubliez pas d'ajouter le nouveau nom au fichier `.gitignore`.

```js{}[nuxt.config.js]
export default {
  buildDir: 'nuxt-dist'
}
```

### À l'intérieur du répertoire `.nuxt`:

- Le fichier router.js est le fichier de routeur généré que Nuxt.js génère pour nous lorsque nous plaçons les fichiers `.vue` dans le répertoire pages. Nous pouvons utiliser ce fichier pour le débogage lorsque nous souhaitons rechercher les routes générées par `vue-router` et connaître les noms d'une route spécifique.
- Le fichier router.scrollBehavior.js qui est notre `Router ScrollBehavior`
- Le répertoire `components` contient tous les composants Nuxt tels que `NuxtChild` et `NuxtLink`. Il contient également l'indicateur `nuxt-build-indicator` qui est la page que nous voyons lorsque notre application est en cours de construction et `nuxt-loading` qui est notre composant de chargement qui est vu lorsque nous attendons le chargement de la page. Nous trouverons également la page d'erreur par défaut de Nuxt.js.
- Le répertoire `mixins` contient les fichiers nécessaires à la méthode Nuxt `$ fetch`.
- Le répertoire `views` contient notre modèle d'application et la page d'erreur du serveur.
- Le fichier `app.js` est le principal fichier de l'application.
- Le fichier `client.js` est le fichier nécessaire pour que tout ce qui se passe bien côté client.
- Le fichier vide est volontairement laissé vide pour les _noop aliases_.
- Le fichier `index.js` amorce notre application.
- Le `loading.html` est le fichier qui est utilisé lors du chargement de la page.
- Le fichier `middleware` est l'endroit où notre middleware est conservé.
- Le fichier `server.js` est tout le code exécuté sur le serveur.
- les _utilities_ contiennent les utilitaires dont Nuxt a besoin pour fonctionner.

### Déploiement

Le répertoire `.nuxt` fait partie des fichiers nécessaires au déploiement de notre application SSR. Cela n'est pas nécessaire pour déployer notre application statique Nuxt.js car nous utilisons le répertoire `dist` pour cela.

<quiz :questions="questions"></quiz>
