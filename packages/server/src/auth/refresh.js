const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const {
  readRefreshToken,
  createRefreshToken,
  setRefreshTokenReplacedBy,
} = require('./refresh-tokens-collection')
const { readUserById } = require('./users-collection')

async function refresh(req, res) {
  if (!req.body || !req.body.refresh_token) {
    return res.status(400).end('Invalid Request Body')
  }

  console.log('refresh_token is', req.body.refresh_token)

  const result = await readRefreshToken(req.body.refresh_token)

  if (result.hasError) {
    return res
      .status(500)
      .json({ message: 'Internal server error, try again later' })
  }

  const currentRefreshToken = result.document

  if (!currentRefreshToken) {
    console.log('refresh token is incorrect')
    return res.status(401).end('Access Denied')
  }

  if (currentRefreshToken.replacedBy) {
    console.log(
      'should revoke all access tokens and refresh tokens cuz somebody tried to get a refresh token outside of the apps authorization flow',
    )
    return res.status(401).end('Access Denied')
  }

  if (currentRefreshToken.expiresAt < Date.now()) {
    console.log('refresh token is expired')
    return res.status(401).end('Access Denied')
  }

  const userResult = await readUserById(currentRefreshToken.userId)

  if (userResult.hasError) {
    return res
      .status(500)
      .json({ message: 'Internal server error, try again later' })
  }

  const user = userResult.document

  if (!user) {
    return res.status(401).end('Access Denied')
  }

  const payload = {
    user: {
      id: user.id,
      username: user.username,
    },
  }
  const accessToken = jwt.sign(payload, process.env.AUTH_TOKEN_SECRET, {
    expiresIn: '1h',
  })

  const refreshToken = crypto.randomBytes(32).toString('hex')

  createRefreshToken({
    value: refreshToken,
    userId: user.id,
    expiresAt: Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN, 10),
    createdAt: Date.now(),
  })

  setRefreshTokenReplacedBy(currentRefreshToken.value, refreshToken)

  return res.status(200).json({
    access_token: accessToken,
    refresh_token: refreshToken,
  })
}

module.exports = refresh