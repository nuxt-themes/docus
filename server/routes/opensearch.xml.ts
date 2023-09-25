import {defineEventHandler} from 'h3'

export default defineEventHandler(async () => {
  const config = useAppConfig()
  return '<?xml version="1.0"?>\n' +
    '<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">\n' +
    '  <ShortName>' + config?.docus?.title + '</ShortName>\n' +
    '  <Description>' + config?.docus?.description + '</Description>\n' +
    '  <Image width="16" height="16" type="image/x-icon">' + config?.docus?.url + '/favicon.ico</Image>\n' +
    '  <Url type="text/html" template="' + config?.docus?.url + '">\n' +
    '    <Param name="q" value="{searchTerms}"/>\n' +
    '  </Url>\n' +
    '</OpenSearchDescription>'
})
