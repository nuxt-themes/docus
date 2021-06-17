---
title: Structure des répertoires
description: La structure par défaut d'une application Nuxt.js est destinée à fournir un excellent point de départ pour les applications plus ou moins grandes. Nous sommes libres d'organiser notre application comme on le souhaite et nous pouvons créer d'autres répertoires au fur et à mesure que nous en avons besoin.
position: 3
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/03_directory_structure?fontsize=14&hidenavigation=1&theme=dark
---

La structure par défaut d'une application Nuxt.js est destinée à fournir un excellent point de départ pour les applications plus ou moins grandes. Nous sommes libres d'organiser notre application comme on le souhaite et nous pouvons créer d'autres répertoires au fur et à mesure que nous en avons besoin.

Créons les répertoires et les fichiers qui n'existent pas encore dans notre projet :

```bash
mkdir components assets static
touch nuxt.config.js
```

Ce sont les principaux répertoires et fichiers que nous utilisons lors de la construction d'une application Nuxt.js. Nous pouvons trouver une explication de chacun d'entre eux ci-dessous.

<base-alert type="info">

La création de répertoires avec ces noms active les fonctionnalités de votre projet Nuxt.js.

</base-alert>

## Répertoires

### Le répertoire `pages`

Le répertoire `pages` contient les vues et les routes de notre application. Comme nous l'avons appris dans [l'étape précédente](/docs/2.x/get-started/routing), Nuxt.js lit tous les fichiers `.vue` dans ce répertoire et les utilise pour créer le routeur de l'application.

<base-alert type="next">

En savoir plus sur le [répertoire pages](/docs/2.x/directory-structure/pages)

</base-alert>

### Le répertoire `components`

Le répertoire `components` est l'endroit où nous plaçons tous nos composants Vue.js qui sont ensuite importés dans les pages.

Avec Nuxt.js, nous pouvons créer nos composants et les importer automatiquement dans les fichiers `.vue`, ce qui signifie qu'il n'est pas nécessaire de les importer manuellement dans la section script. Nuxt.js les analysera et les importera automatiquement pour nous une fois que nous aurons activé cette fonctionnalité dans le fichier de configuration `nuxt.config.js`.

<base-alert type="next">

En savoir plus sur le [répertoire des composants](/docs/2.x/directory-structure/components)

</base-alert>

### Le répertoire `assets`

Le répertoire `assets` contient nos fichiers non compilés tels que les styles, images ou polices de caractères.

<base-alert type="next">

En savoir plus sur le [répertoire assets](/docs/2.x/directory-structure/assets)

</base-alert>

### Le répertoire `static`

Le répertoire `static` est directement servi à la racine du serveur et contient des fichiers qui doivent conserver leur nom (comme `robots.txt`) _ou_ qui ne changeront probablement pas (comme le favicon).

<base-alert type="next">

En savoir plus sur le [répertoire static](/docs/2.x/directory-structure/static)

</base-alert>

### Le fichier `nuxt.config.js`

Le fichier `nuxt.config.js` est le point unique de configuration pour Nuxt.js. Si nous souhaitons ajouter des modules ou remplacer les paramètres par défaut, c'est ce fichier qu'il faudra modifier.

<base-alert type="next">

En savoir plus sur le [fichier nuxt.config.js](/docs/2.x/directory-structure/nuxt-config)

</base-alert>

### Le fichier `package.json`

Le fichier `package.json` contient toutes les dépendances et scripts de notre application.

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

## En savoir plus sur la structure du projet

Il existe d'autres répertoires et fichiers utiles, comme [content](/docs/2.x/directory-structure/content), [layouts](/docs/2.x/directory-structure/layouts), [middleware](/docs/2.x/directory-structure/middleware), [modules](/docs/2.x/directory-structure/modules), [plugins](/docs/2.x/directory-structure/plugins) et [store](/docs/2.x/directory-structure/store). Comme ils ne sont pas nécessaires pour les petites applications, ils ne sont pas traités ici.

<base-alert type="next">

Pour en savoir plus sur tous les répertoires en détail, il ne faut pas hésiter à lire le [guide sur la structure des répertoires](/docs/2.x/directory-structure/nuxt).

</base-alert>
