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

  it('should error when email address is invalid', () => {
    const password = 'Password123!'
    const confirmPassword = 'Password123!'

    let result = null
    result = validate('invalid email', password, confirmPassword)
    expect(result.hasError).toBe(true)
    expect(result.emailError).toBe('Email must be valid')

    result = validate('my@', password, confirmPassword)
    expect(result.hasError).toBe(true)
    expect(result.emailError).toBe('Email must be valid')

    result = validate('my@email', password, confirmPassword)
    expect(result.hasError).toBe(true)
    expect(result.emailError).toBe('Email must be valid')

    result = validate('my@email.', password, confirmPassword)
    expect(result.hasError).toBe(true)
    expect(result.emailError).toBe('Email must be valid')

    result = validate('my@email@again.com', password, confirmPassword)
    expect(result.hasError).toBe(true)
    expect(result.emailError).toBe('Email must be valid')
  })

  it('should error when password and confirmPassword do not match', () => {
    const email = 'my@email.com'
    const password = 'password'
    const confirmPassword = 'not the same password'

    const result = validate(email, password, confirmPassword)

    expect(result.hasError).toBe(true)
    expect(result.confirmPasswordError).toBe('Passwords must match')
  })

  it('should error when password length is less than 8 characters', () => {
    const email = 'my@email.com'
    const password = 'Pa55!'
    const confirmPassword = 'Pa55!'

    const result = validate(email, password, confirmPassword)

    expect(result.hasError).toBe(true)
    expect(result.passwordError).toBe(
      'Password must be 8-32 characters with one lowecase, uppercase, number and symbol character',
    )
  })

  it('should error when password does not have lowercase characters', () => {
    const email = 'my@email.com'
    const password = 'PASSWORD55!'
    const confirmPassword = 'PASSWROD55!'

    const result = validate(email, password, confirmPassword)

    expect(result.hasError).toBe(true)
    expect(result.passwordError).toBe(
      'Password must be 8-32 characters with one lowecase, uppercase, number and symbol character',
    )
  })

  it('should error when password does not have upercase characters', () => {
    const email = 'my@email.com'
    const password = 'password55!'
    const confirmPassword = 'password55!'

    const result = validate(email, password, confirmPassword)

    expect(result.hasError).toBe(true)
    expect(result.passwordError).toBe(
      'Password must be 8-32 characters with one lowecase, uppercase, number and symbol character',
    )
  })

  it('should error when password does not have number characters', () => {
    const email = 'my@email.com'
    const password = 'Password!'
    const confirmPassword = 'Password!'

    const result = validate(email, password, confirmPassword)

    expect(result.hasError).toBe(true)
    expect(result.passwordError).toBe(
      'Password must be 8-32 characters with one lowecase, uppercase, number and symbol character',
    )
  })

  it('should error when password does not have symbol characters', () => {
    const email = 'my@email.com'
    const password = 'Password55'
    const confirmPassword = 'Password55'

    const result = validate(email, password, confirmPassword)

    expect(result.hasError).toBe(true)
    expect(result.passwordError).toBe(
      'Password must be 8-32 characters with one lowecase, uppercase, number and symbol character',
    )
  })

  it('should error when password is longer than 32 characters', () => {
    const email = 'my@email.com'
    const password = 'Password1!Password1!Password1!123'
    const confirmPassword = 'Password1!Password1!Password1!123'

    const result = validate(email, password, confirmPassword)

    expect(result.hasError).toBe(true)
    expect(result.passwordError).toBe(
      'Password must be 8-32 characters with one lowecase, uppercase, number and symbol character',
    )
  })
})
