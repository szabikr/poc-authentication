const jwt = require('jsonwebtoken')

module.exports = function verifyAuthToken(req, res, next) {
  const token = req.header('auth-token')

  if (!token) {
    return res.status(401).end('Access Denied')
  }

  try {
    const result = jwt.verify(token, process.env.AUTH_TOKEN_SECRET)
    req.user = result.user
  } catch (err) {
    return res.status(401).end('Access Denied')
  }

  return next()
}
