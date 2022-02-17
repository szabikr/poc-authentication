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

export default function validate(email, password, confirmPassword) {
  let emailError = ''
  let passwordError = ''
  let confirmPasswordError = ''

  if (email === '') {
    emailError = 'Enter your email address'
  }

  if (password === '') {
    passwordError = 'Enter your password'
  }

  if (confirmPassword === '') {
    confirmPasswordError = 'Confirm your password'
  }

  if (password !== confirmPassword) {
    confirmPasswordError = 'Passwords must match'
  }

  if (!passwordError && !isPasswordComplex(password)) {
    passwordError =
      'Password must be 8-32 characters with one lowecase, uppercase, number and symbol character'
  }

  return {
    hasError:
      emailError !== '' || passwordError !== '' || confirmPasswordError !== '',
    emailError,
    passwordError,
    confirmPasswordError,
  }
}
