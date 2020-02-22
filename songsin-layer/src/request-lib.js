const { match } = require('ffp-js')
exports.convertEvent2Data = (event) =>
  match(event)
    .case(e => e.pathParameters != null)(e => e.pathParameters)
    .case(e => e.queryStringParameters != null)(e => e.queryStringParameters)
    .case(e => e.body)(e => JSON.parse(e.body))
    .else(_ => false)
