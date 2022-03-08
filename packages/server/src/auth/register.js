const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const { readUser, createUser } = require('./users-collection')
const { validateRegister } = require('./validation')

async function register(req, res) {
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

module.exports = register
