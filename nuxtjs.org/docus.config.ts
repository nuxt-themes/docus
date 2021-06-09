export default {
  title: 'NuxtJS',
  description: '',
  url: 'https://nuxtjs.org',
  template: 'docs',
  credits: true,
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
      'body-bg': 'bg-white dark:bg-secondary-dark',
      'bg-header': 'bg-white bg-opacity-80 dark:bg-secondary-dark dark:bg-opacity-80',
      'border-header': 'border-none'
    }
  }
}
