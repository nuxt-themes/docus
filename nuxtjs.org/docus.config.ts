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
      // test: 'red'
    },
    shortcuts: {
      'body-bg': 'bg-white dark:bg-secondary-black',
      'docus-body-text-color': 'text-secondary-darker dark:text-white', // text-secondary dark:text-white
      'docus-muted-text': 'text-cloud dark:text-cloud-light',
      'docus-muted-text-hover': 'hover:text-cloud-darker dark:hover:text-cloud-lightest',
      'bg-header': 'bg-white bg-opacity-80 dark:bg-secondary-black dark:bg-opacity-80',
      'border-header': 'border-none'
    }
  }
}
