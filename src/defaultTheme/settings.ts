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
    'd-secondary-bg': 'bg-gray-500 dark:bg-gray-400',
    'd-secondary-text': 'text-gray-500 dark:text-gray-400',
    'd-secondary-text-hover': 'text-primary-500 dark:text-primary-400',
    'd-tertiary-text': 'text-gray-400 dark:text-gray-500',
    'd-primary-text-hover': 'text-gray-600 dark:text-gray-400',
    'd-secondary-text-active': 'text-gray-900 dark:text-gray-300',
    'd-prose-code-inline-bg': 'bg-gray-100 dark:bg-gray-800',
    'd-prose-code-bg': 'bg-gray-100 dark:bg-gray-800',
    'd-prose-thead-border': 'border-b border-gray-200 dark:border-gray-700',
    'd-prose-tr-border': 'border-b border-gray-100 dark:border-gray-800',
    'd-prose-blockquote-border': 'border-l-2 border-gray-200 dark:border-gray-700',
    'd-prose-blockquote-text': 'd-secondary-text',
    'd-prose-a-text': 'text-primary-500',
    'd-prose-a-border': 'border-b border-transparent',
    'd-prose-a-border-hover': 'border-b border-primary-500',
    'd-prose-a-headline-border': 'border-b border-dashed border-gray-900 dark:border-gray-100',
    // Primary
    'd-text-primary': 'text-primary-500 dark:text-primary-400',
    'd-border-primary': 'border-primary-500 dark:border-primary-400',
    'd-bg-primary': 'bg-primary-500 dark:bg-primary-400',
    'd-page-mobile-toc-bg': 'bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80',
    'd-aside-header-bg': 'bg-gray-50 dark:bg-gray-800',
    'd-active-aside-navigation-item-bg': 'bg-primary-50 dark:bg-primary-900',
    'd-active-aside-navigation-item-text': 'text-primary-500 dark:text-primary-400 ',
    'd-code-group-header-bg': 'bg-gray-200 dark:bg-gray-800',
    'd-code-group-tab': 'bg-gray-300 dark:bg-gray-700',
    'd-prose-code-filename-bg': 'bg-gray-100 dark:bg-gray-800',
    'd-prose-code-filename-text': 'text-gray-600 dark:text-gray-400',
    // Icons
    'd-text-icon': 'd-secondary-text hover:d-secondary-text-hover',
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
    'd-border': ' light:border-gray-200 light:border-opacity-50 dark:border-secondary-darker',
    'd-border-hover': 'border-primary-200 dark:border-secondary-dark',
    'd-border-header': 'border-b border-gray-200 dark:border-gray-800 border-opacity-50',
    'd-header': 'sticky w-full top-0 z-50 d-bg-header d-border-header d-blur-header h-header'
  }
}

export default defaultThemeSettings
