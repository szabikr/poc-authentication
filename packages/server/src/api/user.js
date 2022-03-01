const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { createUser, readUser } = require('../db/users-collection')
const { validateRegister, validateLogin } = require('./validation')

async function postUserRegister(req, res) {
  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).end('Invalid Request Body')
  }

  const validation = validateRegister(req.body.email, req.body.password)
  if (validation.hasError) {
    return res.status(422).json({ ...validation })
  }

  const result = await readUser(req.body.email)

  if (result.hasError) {
    return res
      .status(500)
      .json({ message: 'Internal server error, try again later' })
  }

  const emailExists = result.document
  if (emailExists) {
    return res.status(409).json({
      message: 'Email address already exists',
    })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = {
    id: uuidv4(),
    username: req.body.email,
    email: req.body.email,
    password: hashedPassword,
  }

  const success = await createUser(user)

  if (!success) {
    return res
      .status(500)
      .json({ message: 'Internal server error, try again later' })
  }

  return res.status(201).json({
    email: user.email,
    username: user.username,
  })
}

async function postUserLogin(req, res) {
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

  const authToken = jwt.sign(
    {
      user: { id: user.id },
    },
    process.env.AUTH_TOKEN_SECRET,
  )

  return res
    .header('auth-token', authToken)
    .status(200)
    .json({ username: user.username, authToken })
}

module.exports = {
  postUserRegister,
  postUserLogin,
}
