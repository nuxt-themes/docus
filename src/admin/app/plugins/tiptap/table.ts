import { mergeAttributes, Node } from '@tiptap/core'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'

export default [
  Table.extend({
    renderHTML({ HTMLAttributes }) {
      return ['table', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    }
  }),
  TableRow,
  TableCell,
  TableHeader,
  Node.create({
    name: 'tableHead',
    content: 'tableRow+',
    group: 'block',
    parseHTML: () => [{ tag: 'thead' }],
    renderHTML: ({ HTMLAttributes }) => ['thead', HTMLAttributes, 0]
  }),
  Node.create({
    name: 'tableBody',
    content: 'tableRow+',
    group: 'block',
    parseHTML: () => [{ tag: 'tbody' }],
    renderHTML: ({ HTMLAttributes }) => ['tbody', HTMLAttributes, 0]
  })
]
