---
title: Déploiement sur Google App Engine
description: Comment déployer une application Nuxt.js sur Google App Engine ?
menu: Usage
category: deployment
position: 201
---

Déployer sur [Google App Engine](https://cloud.google.com/appengine/) est une solution rapide et facile pour héberger vos applications universelles Nuxt sur le service de Cloud Google.

Dans ce guide, nous construisons l'application localement puis nous envoyons simplement l'intégralité du répertoire du projet vers Google App Engine. Après l'envoi, Google App Engine démarrera automatiquement le script `start` de votre fichier package.json et votre application sera disponible immédiatement.

## Pour commencer

Vérifiez que vous avez un compte Google Cloud, un projet et une application Google App Engine vierge définie sur [Google App Engine](https://cloud.google.com/appengine/). De plus, assurez-vous de télécharger et d'installer Cloud SDK (CLI) depuis Google comme expliqué [ici](https://cloud.google.com/sdk/) et connectez-vous à vote compte Google Cloud.

## Configurer votre application

Tout ce que vous avez besoin d'ajouter à votre application universelle Nuxt pour la déployer sur le Moteur d'Application est un fichier appelé `app.yaml`. Créez un nouveau fichier avec ce nom dans votre dossier racine et ajoutez le contenu suivant :

```yaml
runtime: nodejs10

instance_class: F2

handlers:
  - url: /_nuxt
    static_dir: .nuxt/dist/client
    secure: always

  - url: /(.*\.(gif|png|jpg|ico|txt))$
    static_files: static/\1
    upload: static/.*\.(gif|png|jpg|ico|txt)$
    secure: always

  - url: /.*
    script: auto
    secure: always

env_variables:
  HOST: '0.0.0.0'
  NODE_ENV: 'production'
```

ou pour un environnement plus flexible la configuration minimale est :

```yaml
runtime: nodejs
env: flex
```

## Construire et déployer l'application

Maintenant, construisez votre application avec `npm run build`.

À cet instant, votre application est prête à être envoyée au Moteur d'Application Google. Maintenant lancer la commande suivante :

```
gcloud app deploy app.yaml --project [project-id]
```

Voilà ! Votre application Nuxt.js est maintenant hébergée le me Moteur d'Application Google !

## Pour plus d'information

- L'attribut `instance_class` dans votre fichier app.yaml définit la classe d'instance d'application. Instance F2 n'est pas complètement libre, mais possède le minimum de mémoire nécessaire pour exécuter une application Nuxt.

Assurez-vous de renseigner le `project-id` et non pas le `project-name` dans la commande de déploiement. Ce sont deux choses différentes - mais facile à confondre.
