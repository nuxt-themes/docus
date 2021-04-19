import visit from 'unist-util-visit'
import h from 'hastscript'


export default function htmlDirectives({ directives }) {
  return async (tree, { data: pageData }) => {
    const jobs = [];
    visit( tree, ['textDirective', 'leafDirective', 'containerDirective'], visitor )
  
    function visitor(node) {
      const directive = directives[node.name]
      const data = node.data || (node.data = {})
      const hast = h(node.name, node.attributes)
      data.hName = hast.tagName
      data.hProperties = hast.properties

      if (directive) {
        jobs.push(
          directive(node, pageData)
        )
      }
    }
  
    await Promise.all( jobs );
    return tree;
  }
}


