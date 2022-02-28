import validate from '../validate'

describe('Login Form Validation', () => {
  it('should not error when values are correct', () => {
    const email = 'my@email.com'
    const password = 'Password123!'

    const result = validate(email, password)

    expect(result.hasError).toBe(false)
    expect(result.emailError).toBe('')
    expect(result.passwordError).toBe('')
  })

  it('should error when values are empty', () => {
    const email = ''
    const password = ''

    const result = validate(email, password)

    expect(result.hasError).toBe(true)
    expect(result.emailError).toBe('Enter your email address')
    expect(result.passwordError).toBe('Enter your password')
  })

  it('should error when email address is invalid', () => {
    const password = 'Password123!'

    let result = null
    result = validate('invalid email', password)
    expect(result.hasError).toBe(true)
    expect(result.emailError).toBe('Email address must be valid')

    result = validate('my@', password)
    expect(result.hasError).toBe(true)
    expect(result.emailError).toBe('Email address must be valid')

    result = validate('my@email', password)
    expect(result.hasError).toBe(true)
    expect(result.emailError).toBe('Email address must be valid')

    result = validate('my@email.', password)
    expect(result.hasError).toBe(true)
    expect(result.emailError).toBe('Email address must be valid')

    result = validate('my@email@again.com', password)
    expect(result.hasError).toBe(true)
    expect(result.emailError).toBe('Email address must be valid')
  })
})
