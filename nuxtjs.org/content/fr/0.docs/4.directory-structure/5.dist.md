---
title: dist
description: Le répertoire `dist`, abréviation de *distribution*, est généré dynamiquement lors de l'utilisation de la commande `nuxt generate` et contient les fichiers HTML prêts pour la production ainsi que les ressources nécessaires au déploiement et à l'exécution de votre application Nuxt.js.
position: 5
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/05_dist?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Quelle est la commande permettant de générer le répertoire `dist` ?
    answers:
      - nuxt build
      - nuxt start
      - nuxt generate
    correctAnswer: nuxt generate
  - question: C'est le répertoire que vous devez charger pour votre hébergement de site statique
    answers:
      - vrai
      - faux
    correctAnswer: vrai
  - question: Quelle est la propriété à modifier pour changer le répertoire `dist` ?
    answers:
      - dist
      - dir
      - buildDir
    correctAnswer: dir
  - question: Quelle est la propriété à utiliser pour ne pas avoir toutes vos pages générées dans un répertoire ?
    answers:
      - 'folders: false'
      - 'subFolders: false'
      - 'pages: true'
    correctAnswer: 'subFolders: false'
  - question: Quelle est la valeur par défaut de la propriété fallback ?
    answers:
      - "'200.html'"
      - "'404.html'"
      - 'false'
    correctAnswer: "'200.html'"
  - question: Lorsque vous travaillez avec des pages générées statiquement, il est recommandé d'utiliser quel fichier pour les pages d'erreur ?
    answers:
      - "'200.html'"
      - "'404.html'"
      - false
    correctAnswer: "'404.html'"
  - question: Quelle propriété pouvez-vous utiliser pour ignorer certains fichiers afin qu'ils ne soient pas générés statiquement ?
    answers:
      - ignore
      - exclude
      - fallback
    correctAnswer: exclude
---

Le répertoire `dist`, abréviation de _distribution_, est généré dynamiquement lors de l'utilisation de la commande `nuxt generate` et contient les fichiers HTML prêts pour la production ainsi que les ressources nécessaires au déploiement et à l'exécution de votre application Nuxt.js.

### Déploiement

C'est le répertoire que vous devez **télécharger pour l'hébergement statique** car il contient vos fichiers HTML prêts à la production et vos ressources

<base-alert>

Le répertoire `dist` ne doit pas être livré à votre système de contrôle de version et doit être ignoré par votre `.gitignore` car il sera généré automatiquement à chaque fois que vous lancez la commande `nuxt generate`.

</base-alert>

### La propriété 'dir'

Le répertoire dist est nommé dist par défaut mais peut être configuré dans votre fichier nuxt.config.

```js{}[nuxt.config.js]
generate: {
  dir: 'mon-site'
}
```

<base-alert>

Si vous changez votre répertoire dist, vous devrez l'ajouter à votre contrôle de version pour que git l'ignore.

</base-alert>

### La propriété subFolders

Nuxt.js place par défaut toutes nos pages générées dans un répertoire, cependant nous pouvons changer cela si on le souhaite en modifiant le fichier `nuxt.config.js` et en changeant la propriété des sous-répertoires pour qu'ils soient `false`.

```js{}[nuxt.config.js]
generate: {
  subFolders: false
}
```

### La propriété fallback

Lors du déploiement de votre site, vous devrez vous assurer que le chemin html de repli est correctement défini. Il doit être défini comme page d'erreur afin que les routes inconnues soient rendues via Nuxt. S'il n'est pas défini, Nuxt.js utilisera la valeur par défaut qui est la page 200.html.

Lors de l'exécution d'une application à page unique, il est plus logique d'utiliser 200.html car c'est le seul fichier nécessaire puisque aucune autre route n'est générée.

Lorsque vous travaillez avec des pages générées statiquement, il est recommandé d'utiliser un fichier 404.html pour les pages d'erreur.

<base-alert>

Selon l'endroit où vous hébergez votre site, vous devez utiliser un fichier 200.html ou 404.html. Veuillez vérifier auprès de votre fournisseur d'hébergement. Netlify, par exemple, utilise 404.html.

</base-alert>

```js{}[nuxt.config.js]
export default {
  generate: {
    fallback: '404.html'
  }
}
```

### La propriété exclude

Vous pouvez exclure des pages de la génération en utilisant la propriété `generate exclude`. Au lieu d'être générée en tant que page statique, elle deviendra une page d'application unique et ne sera rendue que du côté client.

```js{}[nuxt.config.js]
generate: {
  exclude: [/admin/]
}
```

<base-alert type="info">

Vous pouvez également utiliser une expression réguliaire ici pour exclure les pages commençant ou se terminant par un mot en particulier.

</base-alert>

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
