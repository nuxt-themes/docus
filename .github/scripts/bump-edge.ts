import { promises as fsp } from 'fs'
import { resolve } from 'path'
import { execSync } from 'child_process'

const packages = {
  '@docus/base': 'npm:@docus/base-edge@',
  '@docus/docs-theme': 'npm:@docus/docs-theme-edge@',
}

async function loadPackage(dir: string) {
  const pkgPath = resolve(dir, 'package.json')

  const data = JSON.parse(await fsp.readFile(pkgPath, 'utf-8').catch(() => '{}'))

  const save = () => fsp.writeFile(pkgPath, `${JSON.stringify(data, null, 2)}\n`)

  return {
    dir,
    data,
    save,
  }
}

function replaceWithEdge(pkg: any, commit: string, version: string) {
  ;[pkg.data.dependencies || {}, pkg.data.devDependencies || {}, pkg.data.peerDependencies || {}].forEach((deps) => {
    Object.entries(deps).forEach(([key, value]: any) => {
      if (value.includes(commit)) return

      if (packages[key]) pkg.data.dependencies[key] = packages[key] + version
    })
  })
}

async function main() {
  const path = process.argv[2]

  const pkg = await loadPackage(path)

  const commit = execSync('git rev-parse --short HEAD').toString('utf-8').trim()

  const version = `${pkg.data.version}-${commit}`

  if (!pkg.data.name.includes('-edge')) pkg.data.name = `${pkg.data.name}-edge`

  if (!pkg.data.version.includes(commit)) pkg.data.version = version

  replaceWithEdge(pkg, commit, version)

  pkg.save()
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
