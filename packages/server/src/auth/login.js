const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { readUser } = require('./users-collection')
const { validateLogin } = require('./validation')
const { createRefreshToken } = require('./refresh-tokens-collection')

async function login(req, res) {
  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).end('Invalid Request Body')
  }

  const validation = validateLogin(req.body.email, req.body.password)
  if (validation.hasError) {
    return res.status(422).json({ ...validation })
  }

  const result = await readUser(req.body.email)

  if (result.hasError) {
    return res
      .status(500)
      .json({ message: 'Internal server error, try again later' })
  }

  const user = result.document
  if (!user) {
    return res.status(200).json({
      hasError: true,
      errorMessage: 'Username or password is incorrect',
    })
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password)

  if (!isMatch) {
    return res.status(200).json({
      hasError: true,
      errorMessage: 'Username or password is incorrect',
    })
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

  createRefreshToken({
    value: refreshToken,
    userId: user.id,
    expiresAt: Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN, 10),
    createdAt: Date.now(),
  })

  return res.header('auth-token', accessToken).status(200).json({
    access_token: accessToken,
    refresh_token: refreshToken,
  })
}

module.exports = login
