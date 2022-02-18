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

module.exports = {
  isPasswordComplex,
}
