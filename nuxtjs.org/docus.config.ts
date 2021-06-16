export default {
  title: 'NuxtJS',
  description: '',
  url: 'https://nuxtjs.org',
  template: 'docs',
  credits: true,
  socialImage: false,
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
      'd-secondary-text': 'text-gray-500 dark:text-cloud-light',
      'd-secondary-text-hover': 'text-gray-700 dark:text-cloud-lightest',
      'd-secondary-text-active': 'text-gray-900 dark:text-cloud-surface',
      'd-prose-code-inline-bg': 'bg-gray-100 dark:bg-secondary-darkest',
      'd-bg-header': 'bg-white bg-opacity-80 dark:bg-secondary-black dark:bg-opacity-80',
      'd-border-header': 'border-none'
    }
  }
}
