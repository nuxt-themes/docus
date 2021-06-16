export default {
  title: 'NuxtJS',
  description: '',
  url: 'https://nuxtjs.org',
  template: 'docs',
  credits: true,
  socialImage: false,
  algolia: {
    apiKey: 'd8bb34f345ca54362176cf78fcf4ed9d',
    indexName: 'docus'
  },
  theme: {
    header: {
      logo: {
        dark: '/img/header/dark/logo.svg',
        light: '/img/header/light/logo.svg'
      },
      title: false
    },
    colors: {
      primary: '#00DC82'
    },
    shortcuts: {
      'd-body-bg': 'bg-white dark:bg-secondary-black',
      'd-body-text-color': 'text-secondary-darker dark:text-white', // text-secondary dark:text-white
      'd-secondary-bg': 'bg-gray-500 dark:bg-cloud-light',
      'd-secondary-text': 'text-gray-500 dark:text-cloud-light',
      'd-secondary-text-hover': 'text-gray-700 dark:text-cloud-lightest',
      'd-secondary-text-active': 'text-gray-900 dark:text-cloud-surface',
      'd-primary-text-hover': 'text-gray-600 dark:text-cloud-lighter',
      'd-prose-code-inline-bg': 'bg-gray-100 dark:bg-secondary-darkest',
      'd-bg-header': 'bg-white bg-opacity-80 dark:bg-secondary-black dark:bg-opacity-80',
      'd-border-header': 'border-none',
      'd-page-mobile-toc-bg': 'd-body-bg bg-opacity-80 dark:bg-opacity-80',
      'd-aside-header-bg': 'bg-gray-50 dark:bg-secondary-darkest',
      'd-active-aside-navigation-item-bg': 'bg-primary-50 dark:bg-secondary-darkest',
      'd-active-aside-navigation-item-text': 'text-primary-500 dark:text-primary-400 '
    }
  }
}
