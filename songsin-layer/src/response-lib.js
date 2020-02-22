const buildResponse  = (statusCode, body) => ({
  statusCode: statusCode,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: JSON.stringify(body)
})

exports.success = body => buildResponse(200, body)
exports.failure = body => buildResponse(500, body)
