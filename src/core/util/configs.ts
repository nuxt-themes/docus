import { resolve } from 'path'

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
