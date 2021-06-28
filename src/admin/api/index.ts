import { createApp } from 'h3'
import contentHandler from './functions/content'
import previewHandler from './functions/preview'
import staticHandler from './functions/static'
import componentsHandler from './functions/components'

const app = createApp()

app.useAsync('/content', contentHandler)
app.useAsync('/preview', previewHandler)
app.useAsync('/static', staticHandler)
app.useAsync('/components', componentsHandler)

export default app._handle
