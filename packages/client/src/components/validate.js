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

  return {
    hasError:
      emailError !== '' || passwordError !== '' || confirmPasswordError !== '',
    emailError,
    passwordError,
    confirmPasswordError,
  }
}
