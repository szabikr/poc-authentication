const loggerMiddleware = (req, res, next) => {
  if (process.env.LOG_LEVEL === 'OFF') {
    return next()
  }

  console.log()
  console.log('Request Logs')
  console.log('------------')

  console.log(`Protocol: ${req.protocol}`)
  console.log(`Method: ${req.method}`)
  console.log(`Path: ${req.path}`)
  console.log(`Params: ${JSON.stringify(req.params, null, 2)}`)
  console.log(`Query: ${JSON.stringify(req.query, null, 2)}`)
  console.log(`Body: ${JSON.stringify(req.body, null, 2)}`)

  return next()
}

module.exports = loggerMiddleware
