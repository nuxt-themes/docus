---
title: Déployer sur GitHub Pages
description: Comment déployer une application Nuxt.js sur GitHub Pages
menu: Deploy on Github
category: deployment
position: 305
---

Nuxt.js vous offre la possibilité d'héberger votre application web sur n'importe quel hébergeur statique tel que [GitHub Pages](https://pages.github.com/) par exemple.

Pour déployer sur GitHub Pages, vous devez générer votre application web de manière statique :

```bash
npm run generate
```

Cette commande crée un répertoire `dist` contenant l'intégralité de l'application prête à être déployée sur GitHub Pages. Cela sur la branche `gh-pages` pour un dépôt de projet OU sur la branche `master` pour le site d'un utilisateur ou d'une organisation.

<div class="Alert Alert--nuxt-green">

<b>Info :</b> si vous utilisez un nom de domaine personnalisé pour GitHub Pages à l'aide d'un fichier `CNAME`, il est recommandé de placer ce fichier dans le répertoire `static`. [Plus d'informations](/docs/2.x/directory-structure/assets) à ce propos.

</div>

## Déploiement d'un dépôt sur GitHub Pages

Si vous avez créer un système GitHub Pages pour un dépôt spécifique et que vous n'avez pas de domaine personnalisé, l'URL de la page sera de au format suivant `http://<utilisateur>.github.io/<nom-du-depot>`.

Si vous déployez le dossier `dist` sans ajouter une [base du router](/docs/2.x/configuration-glossary/configuration-router#base), quand vous visiterez le site déployé, les ressources de celui-ci seront indisponibles. Cela est du au fait que la base du site est `/` alors que dans le cas de GitHub Pages cette base est `/<repository-name>`.

Pour régler ce problème nous devons ajouter la configuration d'une [base au router](/docs/2.x/configuration-glossary/configuration-router#base) dans `nuxt.config.js` :

```js
export default {
  router: {
    base: '/<nom-du-depot>/'
  }
}
```

De cette manière, tous les chemins aux ressources seront préfixés avec `/<nom-du-depot>/` et le prochain déploiement de code sur GitHub Pages ferra que votre site fonctionnera.

Il existe un inconvénient à ajouter un `router.base` par défaut dans `nuxt.config.js` cependant. Quand vous lancez `npm run dev`, cela ne fonctionnera plus puisque le chemin a changé. Pour résoudre ce problème, nous allons créer une condition pour `router.base` qui incluera le `<nom-du-depot>` :

```js
/* nuxt.config.js */
// ajouter seulement `router.base = '/<nom-du-depot>/'` si `DEPLOY_ENV` est `GH_PAGES`
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/<nom-du-depot>/'
        }
      }
    : {}

export default {
  ...routerBase
}
```

et maintenant nous avons juste besoin de mettre `DEPLOY_ENV='GH_PAGES'` pour créer le site pour GitHub Pages :

```js
/* package.json */
"scripts": {
  "build:gh-pages": "DEPLOY_ENV=GH_PAGES nuxt build",
  "generate:gh-pages": "DEPLOY_ENV=GH_PAGES nuxt generate"
},
```

Pour les utilisateurs Windows, vous voudrez peut-être installer [cross-env](https://github.com/kentcdodds/cross-env) si vous n'utilisez pas `bash`.

```sh
npm install cross-env --save-dev
```

puis l'utiliser de cette manière :

```js
  "build:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt build",
  "generate:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt generate"
```

## Déploiement en ligne de commande

Vous pouvez également utiliser le package [push-dir](https://github.com/L33T-KR3W/push-dir):

Installez-le via npm :

```bash
npm install push-dir --save-dev
```

Ajoutez une commande `deploy` à votre `package.json` avec la branche `gh-pages` pour un dépôt de projet OU avec la branche `master` pour le site d'un utilisateur ou d'une organisation.

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate",
  "deploy": "push-dir --dir=dist --branch=gh-pages --cleanup"
},
```

Puis générez et déployez votre application statique :

```bash
npm run generate
npm run deploy
```

## Build server deployment

You can take deployment one step further and rather than having to manually compile and deploy the files from your local install, you can make use of a build server to monitor your GitHub repository for new commits and then checkout, compile and deploy everything for you automatically.

Before you configure the build server, you'll first need to [generate a GitHub personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/#creating-a-token) in order to grant the build server permission to perform tasks on your behalf. Once you have created your token, keep a copy of it safe ready to use a little later on.

### Travis CI

To deploy with [Travis CI](https://travis-ci.org/), a free for open source projects build server, sign in via your GitHub account, granting Travis access to view your repositories, and then enable the build server for your repository by toggling the switch next to your repositories name in the list displayed.

![Travis Builder Server Enable](/github_pages_travis_01.png)

Next, click the cog icon beside your repository name to configure the general settings of the build sever and enable the 'Build only if .travis.yml is present' feature by toggling the switch.

![Travis Builder Server Settings](/github_pages_travis_02.png)

On the same screen, scroll down to the Environment Variables section and create a new variables named `GITHUB_ACCESS_TOKEN` and in the value field paste a copy of the GitHub personal access token your created earlier and click the 'Add' button.

![Travis Builder Server Environment Variables](/github_pages_travis_03.png)

Finally, create a `.travis.yml` configuration file in the root of your repository with the following contents

```yaml
language: node_js
node_js:
  - '12'

cache:
  directories:
    - 'node_modules'

branches:
  only:
    - master

install:
  - npm install
  - npm run generate

script:
  - echo "Skipping tests"

deploy:
  provider: pages
  skip-cleanup: true
  github-token: $GITHUB_ACCESS_TOKEN # Set in travis-ci.org dashboard, marked secure https://docs.travis-ci.com/user/deployment/pages/#Setting-the-GitHub-token
  target-branch: gh-pages
  local-dir: dist
  on:
    branch: master
```

and then commit this to your repository

```bash
git add .travis.yml
git commit -m "Adding travis deploy configuration"
git push origin
```

Now, whenever you commit any changes to your repository, from within Travis, you'll see a new build start up

![Travis Builder Server Output](/github_pages_travis_04.png)

and on completion, you'll see your GitHub pages site automatically updated.

### Appveyor

To deploy via [Appveyor](https://www.appveyor.com), another free for open source projects build server, sign up for a new account choosing the GitHub authentication option to sign in using your GitHub account.

Once signed in, click the 'New project' link and then click the 'Add' button beside your repository name in the list displayed to enable the build server on your repository.

![Appveyor Builder Server Enable](/github_pages_appveyor_01.png)

Next, in the root of your repository, create an `appveyor.yml` configuration file with the following contents

```yaml
environment:
  # Nuxt requires node v12 minimum
  nodejs_version: '12'
  # Encrypt sensitive data (https://ci.appveyor.com/tools/encrypt)
  github_access_token:
    secure: ENCRYPTED_GITHUB_ACCESS_TOKEN
  github_email:
    secure: ENCRYPTED_GITHUB_EMAIL

# Only run on master branch
branches:
  only:
    - master

# Install scripts. (runs after repo cloning)
install:
  # switch nodejs version
  - ps: Install-Product node $env:nodejs_version
  # install modules
  - npm install
  # generate static files
  - npm run generate
  # configure global git credentials store (https://www.appveyor.com/docs/how-to/git-push/)
  - git config --global credential.helper store
  - ps: Add-Content "$env:USERPROFILE\.git-credentials" "https://$($env:github_access_token):x-oauth-basic@github.com`n"
  - git config --global user.email $env:github_email
  # deploy to GitHub pages
  - npm run deploy

# No tests to run
test: off

# Don't actually build.
build: off
```

**_NB_** This configuration assumes you've configured your `package.json` file as per the [Command line deployment](#command-line-deployment) instructions

Before you commit this file however, you'll need to change the `ENCRYPTED_GITHUB_ACCESS_TOKEN` and `ENCRYPTED_GITHUB_EMAIL` variables with your GitHub personal access token from earlier and your GitHub email address, encrypted using the [Appveyor encryption tool](https://ci.appveyor.com/tools/encrypt).

Once updated, commit the file to your repository

```bash
git add appveyor.yml
git commit -m "Adding appveyor deploy configuration"
git push origin
```

Now, whenever you commit any changes to your repository, from within Appveyor, you'll see a new build start up

![Appveyor Builder Server Output](/github_pages_appveyor_02.png)

and on completion, you'll see your GitHub pages site automatically updated.
