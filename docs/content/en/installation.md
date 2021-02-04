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

Once your repository setup done, checkout the [Usage](/usage) section 👌

### Download locally

You can download the starter locally using [degit](https://github.com/Rich-Harris/degit), this allows you to add the documentation inside your existing repository.

```
npx degit nuxtlabs/docus-starter#main docs
```

This command will create a new folder named `docs/` and download the Docus starter inside.

Next, checkout the [Usage](/usage) section 👌

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
