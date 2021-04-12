import { resolve } from 'path'

const r = (...args) => resolve(__dirname, ...args)

export const contentConfig = {
  markdown: {
    prism: {
      theme: ''
    },
    remarkPlugins: [
      [
        r('remark-prose'),
        {
          proseClass: 'prose dark:prose-dark'
        }
      ],
      [r('remark-vue'), {}]
    ],
    remarkAutolinkHeadings: {
      behavior: 'wrap'
    }
  }
}
