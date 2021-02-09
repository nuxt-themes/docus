---
title: Installation
description: 'Setting up a beautiful documentation with Docus is one command away 🤙'
category: Getting Started
position: 2
---

Docus is a pre-configured [Nuxt](https://nuxtjs.org) application, with [TailwindCSS](https://tailwindcss.com) and [Nuxt Content](https://content.nuxtjs.org).

## System Requirements

- Node.js [12](https://nodejs.org/en/) or later
- MacOS, Windows, and Linux are supported

## Quick start

### GitHub Template

Start your documentation in a new GitHub repository by using our [GitHub template](https://github.com/nuxtlabs/docus-starter):

<github-generate-link>Create a repo with the Docus starter</github-generate-link>

### Download locally

You can download the starter locally using [degit](https://github.com/Rich-Harris/degit), this allows you to add the documentation inside your existing repository.

```
npx degit nuxtlabs/docus-starter#main docs
```

This command will create a new folder named `docs/` and download the Docus starter inside.

### Vercel Template

Vercel let's you setup the starter to your favorite Git provider (GitHub, GitLab and Bitbucket) as well as deploying for free.

<a href="https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fnuxtlabs%2Fdocus-starter" target="_blank" rel="noopener" class="px-6 py-3 font-medium border-none rounded-md shadow-sm text-primary-500 dark:text-primary-400 bg-primary-100 dark:bg-primary-900 hover:bg-primary-200 dark:hover:bg-primary-800">Create and deploy using Vercel</a>

**See it in action**:

<video poster="https://res.cloudinary.com/nuxt/video/upload/v1612886404/docus/docus-vercel_wwaryz.jpg" loop playsinline controls class="md:w-2/3">
  <source src="https://res.cloudinary.com/nuxt/video/upload/q_auto/v1612886404/docus/docus-vercel_wwaryz.webm" type="video/webm" />
  <source src="https://res.cloudinary.com/nuxt/video/upload/q_auto/v1612886404/docus/docus-vercel_wwaryz.mp4" type="video/mp4" />
  <source src="https://res.cloudinary.com/nuxt/video/upload/q_auto/v1612886404/docus/docus-vercel_wwaryz.ogv" type="video/ogg" />
</video>

## Directory Structure

The directory structure of a minimal Docus project is the following:

```bash
| content/
---| en/
-----| index.md
---| settings.json
| static/
---| icon.png
---| preview.png
| nuxt.config.js
| package.json
```

- Configure Docus with [content/settings.json](/configuration)
- Write your documentation inside [content/{locale}](/content)
  - Use our [included components](/components)
- Manage your images ans assets in [static/](/assets)

## Start docus

Start docus in development mode:

```bash
yarn dev
```

The development server will listen on [http://localhost:4000](http://localhost:4000)

Checkout the [Deployment](/deployment) section when you are ready to publish your documentation.
