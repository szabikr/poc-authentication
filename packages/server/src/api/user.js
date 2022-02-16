const bcrypt = require('bcryptjs')
const { createUser } = require('../db/users-collection')

async function postUserRegister(req, res) {
  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).end('Invalid Request Body')
  }

  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(req.body.password, salt)

  const user = {
    username: req.body.email,
    email: req.body.email,
    password: hashedPassword,
  }

  const success = await createUser(user)

  if (!success) {
    return res.status(500).end('Internal server error')
  }

  return res.status(200).send(`user: ${req.body.email} has been registered`)
}

module.exports = {
  postUserRegister,
}
