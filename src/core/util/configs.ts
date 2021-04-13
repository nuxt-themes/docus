import { resolve } from 'path'
import { DocusSettings } from 'types'

const r = (...args: string[]) => resolve(__dirname, ...args)

export const contentConfig = {
  markdown: {
    prism: {
      theme: ''
    },
    remarkPlugins: [
      [
        r('../lib/remark-prose'),
        {
          proseClass: 'prose dark:prose-dark'
        }
      ],
      [r('../lib/remark-vue'), {}]
    ],
    remarkAutolinkHeadings: {
      behavior: 'wrap'
    }
  }
}

export const DEFAULT_THEME_SETTINGS = {
  colors: {
    primary: '#3073F1',
    code: {
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
  }
}

export const DEFAULT_SETTINGS: DocusSettings = {
  title: 'Docus',
  description: '',
  template: 'docs',
  logo: "",
  url: '',
  github: {
    repo: '',
    branch: '',
    url: 'https://github.com',
    apiUrl: 'https://api.github.com/repos',
    dir: '',
    releases: true
  },
  header: {
    logo: false,
    title: true
  },
  layout: "",
  credits: true
}
