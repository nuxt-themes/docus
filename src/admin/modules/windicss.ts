import { resolve, dirname, join } from 'path'
import fs from 'fs'
import { ApiMiddleware } from 'windicss-analysis'
import sirv from 'sirv'
import Connect from 'connect'

export default function (nuxt: any): Connect.NextHandleFunction {
  const analysisRoot = dirname(resolve(require.resolve('windicss-analysis/package.json')))

  let utils: any
  nuxt.hook('windicss:utils', _utils => {
    utils = _utils
  })

  const api = ApiMiddleware(
    {
      root: nuxt.options.srcDir
    },
    {
      // reuse the utils instance from `nuxt-windicss`
      get utils() {
        return utils
      }
    }
  )
  const serve = sirv(join(analysisRoot, 'dist/app'), {
    dev: true,
    single: true
  })

  return (req, res, next) => {
    if (req.url === '/') {
      const index = fs.readFileSync(join(analysisRoot, 'dist/app/index.html'), 'utf-8')
      res.end(index.replace(/="\//g, '="/admin/__windicss/'))
    } else if (req.url.startsWith('/api/')) {
      req.url = req.url.slice(4)
      console.log(req.url)
      api(req, res, next)
    } else {
      serve(req, res, next)
    }
  }
}
