const url = '<%= options.baseUrl %>'

export default function ({ route, app }) {
  if (!route.matched[0]) {
    return
  }

  app.head.meta = Array.isArray(app.head.meta) ? app.head.meta : []
  if (app.head.meta.findIndex(l => l.property === 'og:image') < 0) {
    app.head.meta.push({
      hid: 'og:image',
      property: 'og:image',
      content: url + generateName(route.path)
    })
  }
  if (app.head.meta.findIndex(l => l.name === 'twitter:image') < 0) {
    app.head.meta.push({
      hid: 'twitter:image',
      name: 'twitter:image',
      content: url + generateName(route.path)
    })
  }
}

function generateName (route) {
  const fileName = route.replace(/^\//, '').replace(/[/]/g, '-') || 'home-page'
  return '/<%= options.outDir %>/' + fileName + '.jpeg'
}
