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

function validate(email, password) {
  let emailError = ''
  let passwordError = ''
  if (!isEmailValid(email)) {
    emailError = 'Email must be valid'
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

module.exports = {
  isEmailValid,
  isPasswordComplex,
  validate,
}
