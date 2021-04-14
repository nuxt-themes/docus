export interface DocusMakrdownNode {
  type: string
  tag?: string
  value?: string
  props?: {
    [key: string]: any
  }
  content?: any
  children?: DocusMakrdownNode[]
}

export interface DocusMakrdownHtmlNode extends DocusMakrdownNode {
  type: 'html'
  value: string
}

export interface DocusRootNode {
  type: 'root'
  children: DocusMakrdownNode[]
}
