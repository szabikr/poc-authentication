const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { invalidateRefreshTokenChain } = require('./invalidate-refresh-tokens')
const {
  readRefreshToken,
  createRefreshToken,
  setRefreshTokenReplacedBy,
} = require('./refresh-tokens-collection')
const { readUserById } = require('./users-collection')

async function refresh(req, res) {
  if (!req.body || !req.body.refresh_token) {
    return res.status(400).json({ message: 'Invalid Request Body' })
  }

  const result = await readRefreshToken(req.body.refresh_token)

  if (result.hasError) {
    return res
      .status(500)
      .json({ message: 'Internal server error, try again later' })
  }

  const currentRefreshToken = result.document

  if (!currentRefreshToken) {
    console.log('refresh token is incorrect')
    return res.status(401).json({ message: 'Access Denied' })
  }

  if (currentRefreshToken.replacedBy) {
    invalidateRefreshTokenChain(currentRefreshToken)
    return res.status(401).json({ message: 'Access Denied' })
  }

  if (currentRefreshToken.expiresAt < Date.now()) {
    console.log('refresh token has expired')
    return res.status(401).json({ message: 'Access Denied' })
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
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  })

  const refreshToken = crypto.randomBytes(32).toString('hex')

  await createRefreshToken({
    value: refreshToken,
    userId: user.id,
    expiresAt: currentRefreshToken.expiresAt,
    createdAt: Date.now(),
  })

  await setRefreshTokenReplacedBy(currentRefreshToken.value, refreshToken)

  return res.status(200).json({
    access_token: accessToken,
    refresh_token: refreshToken,
  })
}

module.exports = refresh
