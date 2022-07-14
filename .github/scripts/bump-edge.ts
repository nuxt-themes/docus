import { promises as fsp } from 'fs'
import { resolve } from 'path'
import { execSync } from 'child_process'

const loadPackage = async (dir: string) => {
  const pkgPath = resolve(dir, 'package.json')

  const data = JSON.parse(await fsp.readFile(pkgPath, 'utf-8').catch(() => '{}'))

  const save = () => fsp.writeFile(pkgPath, `${JSON.stringify(data, null, 2)}\n`)

  return {
    dir,
    data,
    save,
  }
}

const main = async () => {
  const path = process.argv[2]

  const pkg = await loadPackage(path)

  const commit = execSync('git rev-parse --short HEAD').toString('utf-8').trim()

  const version = `${pkg.data.version}-${commit}`

  if (!pkg.data.name.includes('-edge')) pkg.data.name = `${pkg.data.name}-edge`

  if (!pkg.data.version.includes(commit)) pkg.data.version = version

  pkg.save()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
