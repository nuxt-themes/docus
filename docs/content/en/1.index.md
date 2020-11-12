---
title: Getting Started
category: Docs Theme
subtitle: 'Create a beautiful documentation like this website in seconds ✨'
description: 'Create your documentation with @nuxt/content docs theme in seconds!'
position: 1
---

  <alert type="info">

  Checkout the [live example](/examples/docs-theme)

  </alert>

To get started quickly you can use the [create-nuxt-content-docs](https://github.com/nuxt/content/tree/dev/packages/create-nuxt-content-docs) package.

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn create nuxt-content-docs <project-name>
  ```

  </code-block>
  <code-block label="NPX">

  ```bash
  # Make sure you have npx installed (npx is shipped by default since NPM 5.2.0) or npm v6.1 or yarn.
  npx create-nuxt-content-docs <project-name>
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  # Starting with npm v6.1 you can do:
  npm init nuxt-content-docs <project-name>
  ```

  </code-block>
</code-group>

It will ask you some questions (name, title, url, repository, etc.), when answered the dependencies will be installed. The next step is to navigate to the project folder and launch it:

<code-group>
  <code-block label="Yarn" active>

  ```bash
  cd <project-name>
  yarn dev
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  cd <project-name>
  npm run dev
  ```

  </code-block>
</code-group>

The application is now running on [http://localhost:3000](http://localhost:3000). Well done!

