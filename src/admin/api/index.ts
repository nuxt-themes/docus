import { promises as fs } from 'fs'
import { resolve, join, extname } from 'path'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dirTree from 'directory-tree'

const app = express()

app.use(cors())
app.use(bodyParser.json())

const r = (...paths: string[]) => resolve(process.options.srcDir, ...paths)

const normalizeFiles = (files, rootPath) => {
  for (const file of files) {
    file.path = file.path.replace(rootPath, '')
    if (file.children) {
      file.children = normalizeFiles(file.children, rootPath)
    }
  }

  files.sort((f1: any, f2: any) => f2.type.length - f1.type.length)

  return files
}

app.get('/preview', function (_, res) {
  const url = process.previewUrl

  res.json({ url })
})

app.get('/static', function (_, res) {
  const tree = dirTree(process.options.dir.static)

  res.json(normalizeFiles(tree.children, process.options.dir.static))
})

app.get('/static/*', async function (req, res) {
  const path = join(process.options.dir.static, req.path.replace(/^\/static/, ''))

  try {
    const data = await fs.readFile(path, 'utf-8')

    res.json({
      path: path.replace(process.options.dir.static, ''),
      extension: extname(path),
      data
    })
  } catch (err) {
    res.status(404).send({ message: 'File not found' })
  }
})

app.get('/pages', function (_, res) {
  const tree = dirTree(r('pages'))

  res.json(normalizeFiles(tree.children, r('pages')))
})

app.get('/pages/*', async function (req, res) {
  const path = join(r('pages'), req.path.replace(/^\/pages/, ''))
  try {
    const data = await fs.readFile(path, 'utf-8')

    res.json({
      path: path.replace(r('pages'), ''),
      extension: extname(path),
      data
    })
  } catch (err) {
    res.status(404).send({ message: 'File not found' })
  }
})

app.put('/pages/*', async function (req, res) {
  if (!req.body.data) {
    return res.status(400).json({ message: 'data key missing' })
  }

  const path = join(r('pages'), req.path.replace(/^\/pages/, ''))

  try {
    // @ts-ignore
    await fs.stat(path, 'utf-8')
    await fs.writeFile(path, req.body.data)

    res.json({ ok: true })
  } catch (err) {
    res.status(404).send({ message: 'File not found' })
  }
})

export default app
