---
title: Setup
subtitle: 'Setting up a beautiful documentation with Docus is one command away 🤙'
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

<alert type="warning">

`npx docus init` is not ready yet, please use the [manual setup](#manual-setup) instructions.

</alert>

Bootsrap the documentation in the current directory:

```bash
npx docus init
```

Start docus in development mode:

```bash
yarn dev
```

The development server will listen on [http://localhost:4000](http://localhost:4000)

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
