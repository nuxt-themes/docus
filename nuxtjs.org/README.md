# nuxtjs.org

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/nuxt/nuxtjs.org)

Universal Vue.js Application built with [Nuxt.js](https://github.com/nuxt/nuxt.js).

## Setup

```bash
git clone https://github.com/nuxt/nuxtjs.org.git
cd nuxtjs.org/
yarn
```

## Content and Translations

The markdown files are stored in the content folder.

- The new docs are in the folder called `guides`.
- The i18n folder contains the locale file for each language
- The navigation is created from the markdown files using the `menu` if it exits and if not the `title` which are found in the yaml of each file (You can add a `menu` key if you need one if there isn't one already there).

### When working on a new language you will need to:

- Create a new branch
- Create the 18n locale file in the i18n folder by copying the en version and modifying it to the new language.
- Add your language to the nuxt.config file in the i18n property by copying the en version and modifying it to the new language
- In the content directory create a folder for your language using your countries locale and then copy the `en/guides` folder into it.
- You can then start translating your files.
- Once finished push your changes and then create a pull request.

## Contribute to Nuxtjs.org Persian translation

If you are interested in contributing to the Persian translation of Nuxtjs.org please follow the issue below for further information on how the work is going on:

[https://github.com/nuxt/nuxtjs.org/issues/555](https://github.com/nuxt/nuxtjs.org/issues/555)

## Development

Start the dev server on [http://localhost:3000](http://localhost:3000)

```bash
yarn dev
```

To change the locale, create a `.env` file with the locale you want to use. An example .env file has been provided which you can copy it's contents to your `.env` file and change the language to the one you want to see the site in.

```bash
NUXT_LOCALE=fr
```

or add the local in the command line.

```bash
# start the documentation in french
NUXT_LOCALE=fr yarn dev
```

<base-alert type="info">

As we are using the content module you can double click on the page in the browser and modify your text directly there which will save your changes just like when you edit in your browser.

</base-alert>

## Production

<base-alert>

If working with a language other than English you will not be able to see the language when running the generate command as for production builds we will only show the English version of the new guides until the guides are almost fully translated. You can still see your translated pages when using the dev command.

</base-alert>

```bash
yarn generate
yarn start
# Checkout http://localhost:3000
```

## Blog

For those invited to contribute to the NuxtJS blog you can use the command `yarn new blog` which will create your post for you with some example content.
