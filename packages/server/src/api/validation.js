function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isPasswordComplex(password) {
  const hasCorrectLength = password.length >= 8 && password.length <= 32
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasNonalphas = /\W/.test(password)

  return (
    hasCorrectLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasNonalphas
  )
}

function validateRegister(email, password) {
  let emailError = ''
  let passwordError = ''
  if (!isEmailValid(email)) {
    emailError = 'Email address must be valid'
  }

  if (!isPasswordComplex(password)) {
    passwordError =
      'Password must be 8-32 characters with one lowecase, uppercase, number and symbol character'
  }

  return {
    hasError: emailError !== '' || passwordError !== '',
    emailError,
    passwordError,
  }
}

function validateLogin(email, password) {
  let emailError = ''
  let passwordError = ''

  if (email === '') {
    emailError = 'Enter your email address'
  }

  if (emailError === '' && !isEmailValid(email)) {
    emailError = 'Email address must be valid'
  }

  if (password === '') {
    passwordError = 'Enter your password'
  }

  return {
    hasError: emailError !== '' || passwordError !== '',
    emailError,
    passwordError,
  }
}

module.exports = {
  isEmailValid,
  isPasswordComplex,
  validateRegister,
  validateLogin,
}
