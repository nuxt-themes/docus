export interface DocusRootNode {
    children: DocusMakrdownNode[]
}
export interface DocusMakrdownNode {
    type: string
    tag?: string
    value?: string
    children?: DocusMakrdownNode[]
}

export interface DocusMakrdownHtmlNode extends DocusMakrdownNode {
    type: 'html',
    value: string
}