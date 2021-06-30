import { resolve, dirname, join } from 'path'
import fs from 'fs'
import { ApiMiddleware } from 'windicss-analysis'
import sirv from 'sirv'
import Connect from 'connect'

export default function (srcDir: string): Connect.NextHandleFunction {
  const analysisRoot = dirname(resolve(require.resolve('windicss-analysis/package.json')))

  // TODO: resue the utils instance from `nuxt-windicss`, awaiting for:
  // https://github.com/windicss/nuxt-windicss-module/pull/106
  const api = ApiMiddleware({
    root: srcDir
  })
  const serve = sirv(join(analysisRoot, 'dist/app'), {
    dev: true,
    single: true
  })

  return (req, res, next) => {
    if (req.url === '/') {
      const index = fs.readFileSync(join(analysisRoot, 'dist/app/index.html'), 'utf-8')
      res.end(index.replace(/="\//g, '="/admin/windicss/'))
    } else if (req.url.startsWith('/api/')) {
      req.url = req.url.slice(4)
      console.log(req.url)
      api(req, res, next)
    } else {
      serve(req, res, next)
    }
  }
}
