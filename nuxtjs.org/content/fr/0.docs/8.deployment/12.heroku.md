---
title: Deploy Nuxt on Heroku
description: How to deploy Nuxt.js on Heroku?
menu: Heroku
target: Server
category: deployment
position: 109
---

We recommend you read the [Heroku documentation for Node.js](https://devcenter.heroku.com/articles/nodejs-support).

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/how-to-deploy-nuxtjs-to-heroku?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Watch a free lesson on <strong>How to deploy Nuxt.js to Heroku</strong> on Vue School 
    </p>
  </a>
</div>

First, we want our application to listen on the host `0.0.0.0` and run in production mode:

```bash
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production
```

You should see this in your Heroku dashboard (Settings section):

![nuxt config vars Heroku](https://i.imgur.com/EEKl6aS.png)

Heroku uses a [Procfile](https://devcenter.heroku.com/articles/procfile) (name the file `Procfile` with no file extension) that specifies the commands that are executed by the apps dynos. To start the Procfile will be very simple, and needs to contain the following line:

```
web: nuxt start
```

This will instruct run the `nuxt start` command and tell Heroku to direct external HTTP traffic to it.

Finally, we can push the app on Heroku with:

```bash
git push heroku master
```

To deploy a non-master branch to Heroku use:

```bash
git push heroku develop:master
```

where `develop` is the name of your branch.

Voilà! Your Nuxt.js application is now hosted on Heroku!
