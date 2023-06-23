[![Docus](https://user-images.githubusercontent.com/904724/194751054-9a267ea6-be9d-420b-9935-c76bf30baaf3.png)](https://docus.dev)

## Docus

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]
[![Nuxt Studio][nuxt-studio-src]][nuxt-studio-href]
[![Volta][volta-src]][volta-href]

Docus is the fastest way to create document-driven websites with Vue & Markdown.

- [📄 Documentation](https://docus.dev)
- [⚡️ Play on StackBlitz](https://stackblitz.com/github/nuxt-themes/docus-starter)

## Start a project with Docus

You can use [this template](https://github.com/nuxt-themes/docus-starter) to create a new project.

If you want to add Docus to an existing codebase, you can do so with:

- Install the dependency:

```bash
npm install @nuxt-themes/docus
```

- Add it to your extends key in `nuxt.config`:

```ts
defineNuxtConfig({
  extends: '@nuxt-themes/docus'
})
```

## Features ✨

- **+50 Components** ready to build rich pages
- **Article**, **Docs** and **Blog** layouts
- Start from a `README`, scale to a framework documentation
- Table of contents support
- Configurable design system integration
- Replace, extend, customize any component in a breeze
- Leverages [**@nuxt-themes/typography**](https://github.com/nuxt-themes/typography)
- Used on [Content Documentation](https://content.nuxtjs.org)

## They are using it 🎨

- [nuxt/http](https://github.com/nuxt/http)
- [nuxt/content](https://github.com/nuxt/content)
- [nuxt/image](https://github.com/nuxt/image)
- [nuxt-modules/tailwindcss](https://github.com/nuxt-modules/tailwindcss)
- [nuxt-modules/strapi](https://github.com/nuxt-modules/strapi)
- [nuxt-modules/sanity](https://github.com/nuxt-modules/sanity)
- [nuxt-modules/i18n](https://github.com/nuxt-modules/i18n)
- [nuxt-modules/color-mode](https://github.com/nuxt-modules/color-mode)
- [nuxt-modules/apollo](https://github.com/nuxt-modules/apollo)
- [nuxt-community/ackee-module](https://github.com/nuxt-community/ackee-module)
- [hubble-exchange/docs](https://github.com/hubble-exchange/docs)
- [sidebase](https://sidebase.io)
- [haraka](https://github.com/haraka/haraka.github.io)
- [pinia-orm](https://github.com/CodeDredd/pinia-orm)
- [nuxt-typed-router](https://github.com/victorgarciaesgi/nuxt-typed-router)
- [Do you use Docus? Get listed here!](https://github.com/nuxt-themes/docus/issues/713)

## Contributing 🙏

1. Clone this repository
2. Install dependencies using `pnpm install --frozen-lockfile`
3. Run `pnpm run prepare` to generate type stubs.
4. Update the `extends` key in `.starters/default` to `../../` in order to use the local version of Docus.
5. Use `pnpm run dev` to start [default starter](./.starters/default)
6. Do not commit any change in `.starters/default` since its your playground.

## License 📎

[MIT License](./LICENSE)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxt-themes/docus/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@nuxt-themes/docus

[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxt-themes/docus.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@nuxt-themes/docus

[license-src]: https://img.shields.io/github/license/nuxt-themes/docus.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://github.com/nuxt-themes/docus/blob/main/LICENSE

[nuxt-studio-src]: https://img.shields.io/badge/Open%20in%20Nuxt%20Studio-18181B?&logo=nuxt.js&logoColor=3BB5EC
[nuxt-studio-href]: https://nuxt.studio/themes/docus

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?&logo=nuxt.js
[nuxt-href]: https://nuxt.com

[volta-src]: https://user-images.githubusercontent.com/904724/209143798-32345f6c-3cf8-4e06-9659-f4ace4a6acde.svg
[volta-href]: https://volta.net/nuxt-themes/docus?utm_source=readme_docus
