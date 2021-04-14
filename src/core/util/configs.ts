import { r } from './path'

export const contentConfig = {
  markdown: {
    prism: {
      theme: ''
    },
    remarkPlugins: [
      [
        r('core/parser/markdown/plugin/remark-prose'),
        {
          proseClass: 'prose dark:prose-dark'
        }
      ],
      [r('core/parser/markdown/plugin/remark-vue'), {}]
    ],
    remarkAutolinkHeadings: {
      behavior: 'wrap'
    }
  }
}
