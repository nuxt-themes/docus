import { resolve } from 'path'

const r = path => resolve(__dirname, path)

const config = {
  baseUrl: ({ $docus }) => ($docus && $docus.settings && $docus.settings.url) || '',
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      file: r('./languages/en-US.js'),
      name: 'English'
    }
  ],
  defaultLocale: 'en',
  parsePages: false,
  lazy: true,
  seo: false,
  vueI18n: {
    fallbackLocale: 'en',
    dateTimeFormats: {
      en: {
        long: {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          weekday: 'short'
        }
      },
      fr: {
        long: {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'short'
        }
      }
    }
  }
}

export default function docusI18n() {
  const { requireModule, addPlugin } = this

  requireModule(['nuxt-i18n', config])
  addPlugin({
    src: r('./runtime/plugin.js'),
    filename: 'docus-i18n.js'
  })
}
