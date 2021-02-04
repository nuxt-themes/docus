---
title: Setup
description: 'Setting up a beautiful documentation with Docus is one command away 🤙'
category: Getting Started
position: 2
---

Docus is a pre-configured [Nuxt](https://nuxtjs.org) application, with [TailwindCSS](https://tailwindcss.com) and [Nuxt Content](https://content.nuxtjs.org).

The directory structure of a minimal Docus project is the following:

```bash
content/
  en/
    index.md
nuxt.config.js
package.json
```

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

## Manual setup

### Install the dependencies

Create a `package.json` with the following content:

```json[package.json]
{
  "name": "my-docs",
  "version": "1.0.0",
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt generate",
    "start": "nuxt start"
  },
  "dependencies": {
    "docus": "latest",
    "nuxt": "latest"
  }
}
```

Then install the depencies:

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn install
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install
  ```

  </code-block>
</code-group>


### Import docus

Create a `nuxt.config.js` and use `docus`:

```ts [nuxt.config.js]
import { withDocus } from 'docus'

export default withDocus({
  // Additional nuxt configuration
})
```

`docus` exports a function to setup the `nuxt.config.js` and allows you to add / override the [Nuxt config](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build).

Checkout the [Nuxt configuration](/configuration#nuxt-config) section to learn more.

### Create the index page

Your first page need to live into `content/en/index.md`, create this file with the following content:

```md [content/en/index.md]
---
title: Introduction
category: Getting Started
---

Welcome to my documentation with [Docus](https://docus.dev)!
```

To learn more about writing into the `content/` directory, checkout the [content usage](/content).


### Start docus

To start the development server with hot module replacement, run the following command:

```bash
npm run dev
```

The docus server will be listening on [http://localhost:4000]([http://localhost:4000]).
