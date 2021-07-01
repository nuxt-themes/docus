import { createApp } from 'h3'
import contentHandler from './functions/content'
import previewHandler from './functions/preview'
import staticHandler from './functions/static'
import componentsHandler from './functions/components'
import configHandler from './functions/config'

const app = createApp()

app.useAsync('/content', contentHandler)
app.useAsync('/preview', previewHandler)
app.useAsync('/static', staticHandler)
app.useAsync('/components', componentsHandler)
app.useAsync('/config', configHandler)

export default app._handle
