const jwt = require('jsonwebtoken')

const ACCESS_DENIED_ERROR = 'Access Denied Error'
const TOKEN_EXPIRED_ERROR = 'Token Expired Error'

module.exports = function verifyAuthToken(req, res, next) {
  const token = req.header('auth-token')

  if (!token) {
    return res.status(401).json({ error: ACCESS_DENIED_ERROR })
  }

  try {
    const result = jwt.verify(token, process.env.AUTH_TOKEN_SECRET)
    req.user = result.user
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: TOKEN_EXPIRED_ERROR })
    }

    console.log('JWT Verification Error:')
    console.log(JSON.stringify(err, null, 2))

    return res.status(401).json({ error: ACCESS_DENIED_ERROR })
  }

  return next()
}
