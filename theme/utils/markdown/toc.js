import { flattenNode, flattenNodeText } from './utils'

export default function generateToc (body, options) {
  const { tocTags } = options

  const children = flattenNode(body, 2)

  return children.filter(node => tocTags.includes(node.tag)).map((node) => {
    const id = node.props.id

    const depth = ({
      h2: 2,
      h3: 3,
      h4: 4,
      h5: 5,
      h6: 6
    })[node.tag]

    const text = flattenNodeText(node)

    return {
      id,
      depth,
      text
    }
  })
}
