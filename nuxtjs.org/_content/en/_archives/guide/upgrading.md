---
title: Upgrading
description: Upgrading Nuxt.js is quick, but more involved than updating your package.json
category: prologue
position: 4
---

> Upgrading Nuxt.js is quick, but more involved than updating your package.json

## Getting Started

1. Check the [release notes](/guide/release-notes) for the version you wish to upgrade to see if there are any additional instructions for that particular release.
2. Update the version specified for the `nuxt` package in your `package.json` file.

After this step instructions vary depending upon whether you are using Yarn or npm. _[Yarn](https://yarnpkg.com/en/docs/usage) is the preferred package manager for working with Nuxt as it is the development tool which tests have been written against._

## Yarn

3. remove `yarn.lock` file
4. remove `node_modules` directory
5. Run the `yarn` command
6. After installation has completed and you have run your tests consider upgrading other dependencies as well. The `yarn outdated` command can be used.

## npm

3. remove `package-lock.json` file
4. remove `node_modules` directory
5. Run the `npm install` command
6. After installation has completed and you have run your tests consider upgrading other dependencies as well. The `npm outdated` command can be used.
