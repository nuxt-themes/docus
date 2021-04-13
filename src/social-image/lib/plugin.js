const url = '<%= options.baseUrl %>/<%= options.outDir %>/'

const findMeta = (meta, key) => meta.find(item => item.hid === key || item.name === key || item.property === key)

const generateName = route => (route.replace(/^\//, '').replace(/[/]/g, '-') || 'home-page') + '.jpeg'

export default function ({ route, app, ssrContext }) {
  if (!route.matched[0]) {
    return
  }
  const { options } = route.matched[0].components.default
  const imageName = generateName(route.path)

  app.head.meta = Array.isArray(app.head.meta) ? app.head.meta : []
  if (findMeta(app.head.meta, 'og:image')) {
    app.head.meta.push({
      hid: 'og:image',
      property: 'og:image',
      content: url + imageName
    })
  }
  if (findMeta(app.head.meta, 'twitter:image')) {
    app.head.meta.push({
      hid: 'twitter:image',
      name: 'twitter:image',
      content: url + imageName
    })
  }

  if (ssrContext && ssrContext.addSocialImage) {
    options.__pageHead = options.__pageHead || options.head
    options.head = createCustomHead({
      options,
      addSocialImage: ssrContext.addSocialImage,
      imageName,
      route: route.path
    })
  }
}

const createCustomHead = ({ options, addSocialImage, imageName, route }) =>
  function socialImageCustomHead() {
    let head
    switch (typeof options.__pageHead) {
      case 'function':
        head = options.__pageHead.call(this)
        break
      case 'object':
        head = { ...options.__pageHead }
        break
      default:
        head = {}
    }
    if (head.title) {
      const metaDescription = findMeta(head.meta || [], 'description')
      addSocialImage({
        title: head.title,
        description: metaDescription ? metaDescription.content : '',
        imageName,
        route
      })
    }
    return head
  }
