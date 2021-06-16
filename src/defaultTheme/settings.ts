const defaultThemeSettings = {
  header: {
    logo: false,
    title: true
  },
  colors: {
    primary: '#3073F1',
    prism: {
      foreground: 'inherit',
      background: '#fbfbfb dark:#1e1e1e',
      class: '#9807af dark:#E879F9',
      builtin: '#9807af dark:#E879F9',
      function: '#9807af dark:#E879F9',
      keyword: '#096d7c dark:#22D3EE',
      string: '#679c0d dark:#BEF264',
      number: '#679c0d dark:#BEF264',
      selector: '#679c0d dark:#BEF264',
      boolean: '#679c0d dark:#BEF264',
      property: '#078ce5 dark:#E0F2FE',
      punctuation: '#078ce5 dark:#E0F2FE',
      comment: '#758575 dark:#a0ada0',
      literal: '#429988 dark:#2f8a89',
      variable: 'inherit',
      constant: '#9807af dark:#E879F9',
      deleted: '#a14f55 #a14f55',
      namespace: '#9807af dark:#E879F9',
      decorator: '#9807af dark:#E879F9',
      regex: '#679c0d dark:#BEF264',
      'json-property': '#078ce5 dark:#22D3EE',
      'line-number': '#888888',
      'line-number-gutter': '#eeeeee',
      'line-highlight-background': '#444444',
      'selection-background': '#444444'
    }
  },
  shortcuts: {
    'd-body-bg': 'bg-white dark:bg-gray-900',
    'd-body-text-color': 'text-gray-900 dark:text-gray-50',
    'd-secondary-text': 'text-gray-500 dark:text-gray-400',
    'd-secondary-text-hover': 'text-primary-500 dark:text-primary-400',
    'd-secondary-text-active': 'text-gray-900 dark:text-gray-300',
    'd-prose-code-inline-bg': 'bg-gray-100 dark:bg-gray-800',
    // Primary
    'd-text-primary': 'text-primary-500 dark:text-primary-400',
    'd-border-primary': 'border-primary-500 dark:border-primary-400',
    'd-bg-primary': 'bg-primary-500 dark:bg-primary-400',
    // Icons
    'd-text-icon': 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-400',
    'd-icon': 'd-text-icon focus:outline-none',
    // Images utils
    'light-img': 'dark:hidden',
    'dark-img': 'light:hidden',
    // Container
    'd-max-w-container': 'max-w-7xl',
    'd-px-container': 'px-4 sm:px-6',
    'd-container': 'd-max-w-container mx-auto',
    'd-container-content': 'd-container d-px-container',
    // Header
    'd-blur-header': 'blur-12',
    'd-bg-header': 'bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80',
    'd-border-header': 'border-b border-gray-200 dark:border-gray-800 border-opacity-50',
    'd-header': 'sticky w-full top-0 z-50 d-bg-header d-border-header d-blur-header h-header'
  }
}

export default defaultThemeSettings
