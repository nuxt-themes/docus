---
title: Deploy on Azure Static Web Apps
description: How to deploy a Nuxt.js application on Azure Static Web Apps?
menu: Azure Static Web Apps
target: Static
category: deployment
position: 103
---

You can now deploy your static sites to Azure using Azure static web apps. You will need to have your app in GitHub as Azure static web apps leverages GitHub actions which allow you to re-build your static site on every git push.

There are 2 things you need to configure in order to deploy your app to Azure static web apps. The first one is to modify the build command as Azure reads the build command from your package.json and for static sites we need to use the generate command.

`package.json`

```json
build: "nuxt generate"
```

The second one is to add a routes.json file which is important for catching custom 404 pages and spa fallback pages.

`static/routes.json`

```jsx
{
 "routes": [],
 "platformErrorOverrides": [
   {
    "errorType": "NotFound",
    "serve": "/200.html",
    "statusCode": 200
   }
 ]
}
```

If you want to test out deploying to Azure static web apps, we have created a small demo application that is all setup and configured. You will just need to clone it and add it to your GitHub repo. You can then follow the steps on - Deploying your app with Azure Static Web Apps.

[Clone the demo app](https://github.com/debs-obrien/nuxtjs-azure-static-app)

## Deploying your app with Azure Static Web Apps

### Step 1: **Create Azure static web apps**

1. Navigate to the [Azure Portal](https://portal.azure.com/).
2. Click **Create a Resource** then search for **Static App** and select it.
3. Select a subscription from the *Subscription* drop-down list or use the default one.
4. Click the **New** link below the *Resource group* dropdown. In *New resource group name*, type **nuxt** and click **OK**
5. Provide a globally unique name for your app in the **Name** text box. Valid characters include `a-z`, `A-Z`, `0-9`, and `-`. The app name is used to identify the app in your list of resources therefore it is a good idea to name your app using the name of your repository.
6. In the *Region* dropdown, choose a region closest to you.

![Azure Portal resource and app setup](https://user-images.githubusercontent.com/13063165/82118135-71891b00-9775-11ea-8284-aa94d17a3bc3.png)

### Step 2: **Add a GitHub repository**

Azure App Service Static App needs access to the repository where your Nuxt.js app lives so it can automatically deploy commits:

1. Click the **Sign in with GitHub button**
2. Select the **Organization** under which you created the repo for your Nuxt.js project. It can also be your GitHub username.
3. Find the name of the repository you created earlier and select it.
4. Choose **master** as the branch from the *Branch* dropdown.

![how to add github](https://user-images.githubusercontent.com/13063165/82118359-38ea4100-9777-11ea-9c5e-7ba5c4da708e.png)

### Step 3: **Configure the build process**

There are few things that Azure App Service Static App can assume - things like automatically installing npm modules and running `npm run build`. There are also few you have to be explicit about, like what folder will the static app be copied to after build so the static site can be served from there.

1. Click on the **Build** tab to configure the static output folder.
2. Type **dist** in the *App artifact location* text box.

![Azure portal configure build](https://user-images.githubusercontent.com/13063165/82118277-71d5e600-9776-11ea-88ad-48cf0793905d.png)

### Step 4: **Review and create**

1. Click the **Review + Create** button to verify the details are all correct.
2. Click **Create** to start the creation of the resource and also provision a GitHub Action for deployment.
3. Once the deployment is completed, click **Go to resource**

![azure portal deployment complete message](https://user-images.githubusercontent.com/13063165/82118390-67681c00-9777-11ea-9778-671dc768393e.png)

4. On the resource screen, click the *URL* link to open your deployed application.

![resource screen with url to your deployed app](https://user-images.githubusercontent.com/13063165/82118042-d001c980-9774-11ea-94f5-57d995aa5391.png)

Congrats your static site is now hosted on Azure static web apps.

## Rebuild your static app and monitoring deployment

Now all you have to do is modify your code and push your changes. Pushing your changes will activate a GitHub action and your new site will automatically rebuild. You can monitor the workflow by clicking on the actions tab in your GitHub repo and you can inspect even further by selecting the last commit you made. You can then watch to see when the deploy is finished or inspect the log if you have any deployment errors.

![GitHub actions screen](https://user-images.githubusercontent.com/13063165/82118249-34715880-9776-11ea-92e2-dbd21bbf7cb6.png)

## Did you know?

### **How to handle dynamic routes**

If you are working with dynamic pages such as `_id.vue` then you you will need to add these routes to the generate property in your nuxt config.

[See the documentation on how to handle dynamic routes.](/docs/configuration-glossary/configuration-generate#routes)

<div class="Alert">
If you are using Nuxt 2.13+ then you won't have to worry about this as there is a built in crawler which will crawl all dynamics by crawling the links in your site.
</div>

### How to add an error page

In order to not have the default 404 page you can create an `error.vue` file in your layouts folder.

### How to add SPA fallback

If you would like some pages to not be generated but act as a single page application you can do so using the generate.excludes property in your nuxt.config file.

[See the documentation on spa fallback](/docs/configuration-glossary/configuration-generate#exclude)
