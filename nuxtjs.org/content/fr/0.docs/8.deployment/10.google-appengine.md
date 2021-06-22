---
title: Deploy Nuxt on Google App Engine
description: How to deploy Nuxt.js on Google App Engine?
menu: Google App Engine
target: Server
category: deployment
position: 107
---

Deploying to [Google App Engine](https://cloud.google.com/appengine/) is a fast and easy solution for hosting your universal Nuxt application on Google's Cloud Services.

In this guide, we build the application locally and then simply upload the entire project folder to Google App Engine. After the upload, Google App Engine will automatically start the `start` script in our package.json and your app will be available immediately.

## Getting Started

Make sure you have a Google Cloud Account, a project and an empty Google App Engine app set up on [Google App Engine](https://cloud.google.com/appengine/). Furthermore, make sure to download and install the Cloud SDK (CLI) from Google as explained [here](https://cloud.google.com/sdk/) and log into your Google Cloud Account.

## Configure your application

All you need to add to your universal Nuxt app for deploying it to the App Engine is a file called `app.yaml`. Create a new file with that name in your root project directory and add the following content:

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
```

or for flexible environment the minimal configuration is:

```yaml
runtime: nodejs
env: flex
```

## Build and deploy the app

Now build your app with `npm run build`.

At this point, your app is ready to be uploaded to Google App Engine. Now just run the following command:

```
gcloud app deploy app.yaml --project [project-id]
```

Voilà! Your Nuxt.js application is now hosted on Google App Engine!

## Further Information

- The `instance_class` attribute in your app.yaml file sets the class of your app instance. Instance F2 is not completely free, but has the minimum memory needed to run a Nuxt application.
- Make sure `start` in package.json is the command that you want to run after deployment. If you usually run by `start:prod` or some other command, your app will not work as expected.

Make sure to put the `project-id` and not the `project-name` in the deploy command. These are two different things but easy to mix up.
