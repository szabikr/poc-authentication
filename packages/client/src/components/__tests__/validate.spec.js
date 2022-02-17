import validate from '../validate'

describe('Register Form Validation', () => {
  it('should not error when values are correct', () => {
    const email = 'my@email.com'
    const password = 'Password123!'
    const confirmPassword = 'Password123!'

    const result = validate(email, password, confirmPassword)

    expect(result.hasError).toBe(false)
    expect(result.emailError).toBe('')
    expect(result.passwordError).toBe('')
    expect(result.confirmPasswordError).toBe('')
  })

  it('should error when values are empty', () => {
    const email = ''
    const password = ''
    const confirmPassword = ''

    const result = validate(email, password, confirmPassword)

    expect(result.hasError).toBe(true)
    expect(result.emailError).toBe('Enter your email address')
    expect(result.passwordError).toBe('Enter your password')
    expect(result.confirmPasswordError).toBe('Confirm your password')
  })

  it('should error when password and confirmPassword do not match', () => {
    const email = 'my@email.com'
    const password = 'password'
    const confirmPassword = 'not the same password'

    const result = validate(email, password, confirmPassword)

    expect(result.hasError).toBe(true)
    expect(result.confirmPasswordError).toBe('Passwords must match')
  })
})
