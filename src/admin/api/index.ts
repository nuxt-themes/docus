import { createApp } from 'h3'
import pagesHandler from './functions/pages'
import previewHandler from './functions/preview'
import staticHandler from './functions/static'

const app = createApp()

app.useAsync('/pages', pagesHandler)
app.useAsync('/preview', previewHandler)
app.useAsync('/static', staticHandler)

export default app._handle
