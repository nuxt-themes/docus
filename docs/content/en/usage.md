---
title: Usage
description: 'Learn how to use Docus, one simple directory structure and one command 👌'
category: Getting Started
position: 3
---

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

## Developement server

Start docus in development mode:

```bash
yarn dev
```

The development server will listen on [http://localhost:4000](http://localhost:4000)

Checkout the [Deployment](/deployment) section when you are ready to publish your documentation.
