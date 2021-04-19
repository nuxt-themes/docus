export interface DocusMarkdownNode {
  type: string
  tag?: string
  value?: string
  children?: DocusMarkdownNode[]
}

export interface DocusMarkdownHtmlNode extends DocusMarkdownNode {
  type: 'html'
  value: string
}

export interface DocusRootNode {
  children: DocusMarkdownNode[]
}
