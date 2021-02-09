export function resolveProjectAlias (path) {
  return path.replace(/^(@|~)\//, '$1$1/')
}

export function processUserConfig (config) {
  config.css = (config.css || []).map(resolveProjectAlias)

  config.plugins = (config.plugins || []).map((plugin) => {
    if (typeof plugin === 'string') {
      return resolveProjectAlias(plugin)
    }
    if (typeof plugin === 'object') {
      plugin.src = resolveProjectAlias(plugin.src)
    }
    return plugin
  })

  config.modules = (config.modules || []).map((module) => {
    if (typeof module === 'string') {
      return resolveProjectAlias(module)
    }
    if (Array.isArray(module)) {
      module[0] = resolveProjectAlias(module[0])
    }
    return module
  })

  return config
}
