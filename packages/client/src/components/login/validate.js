function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validate(email, password) {
  let emailError = ''
  let passwordError = ''

  if (email === '') {
    emailError = 'Enter your email address'
  }

  if (emailError === '' && !isValidEmail(email)) {
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

export default validate
