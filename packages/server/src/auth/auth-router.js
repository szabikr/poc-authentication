const express = require('express')
const login = require('./login')
const register = require('./register')

const router = express.Router()

router.use((req, res, next) => {
  console.log('auth router called')
  next()
})

router.post('/register', register)
router.post('/login', login)

module.exports = router
