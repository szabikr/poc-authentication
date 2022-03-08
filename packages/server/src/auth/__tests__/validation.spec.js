const {
  isEmailValid,
  isPasswordComplex,
  validateRegister,
  validateLogin,
} = require('../validation')

describe('Validation', () => {
  describe('isEmailValid', () => {
    it('should return true when email is valide', () => {
      expect(isEmailValid('my@email.com')).toBe(true)
    })

    it('should return false when email is invalid', () => {
      expect(isEmailValid('invalid email')).toBe(false)
      expect(isEmailValid('my@')).toBe(false)
      expect(isEmailValid('my@email')).toBe(false)
      expect(isEmailValid('my@email.')).toBe(false)
      expect(isEmailValid('my@email@again.com')).toBe(false)
    })
  })

  describe('isPasswordComplex', () => {
    it('should return true when password matches required complexity', () => {
      const password = 'Password123!'
      const result = isPasswordComplex(password)
      expect(result).toBe(true)
    })

    it('should return false when password length is less than 8 characters', () => {
      const password = 'Pa55!'
      const result = isPasswordComplex(password)
      expect(result).toBe(false)
    })

    it('should return false when password does not have lowercase characters', () => {
      const password = 'PASSWORD55!'
      const result = isPasswordComplex(password)
      expect(result).toBe(false)
    })

    it('should return false when password does not have uppercase characters', () => {
      const password = 'password55!'
      const result = isPasswordComplex(password)
      expect(result).toBe(false)
    })

    it('should return false when password does not have number characters', () => {
      const password = 'Password!'
      const result = isPasswordComplex(password)
      expect(result).toBe(false)
    })

    it('should return false when password does not have symbol characters', () => {
      const password = 'Password55'
      const result = isPasswordComplex(password)
      expect(result).toBe(false)
    })

    it('should return false when password is longer than 32 characters', () => {
      const password = 'Password1!Password1!Password1!123'
      const result = isPasswordComplex(password)
      expect(result).toBe(false)
    })
  })

  describe('validateRegister', () => {
    it('should have no error when inputs are correct', () => {
      const email = 'my@email.com'
      const password = 'Password123!'
      const result = validateRegister(email, password)
      expect(result.hasError).toBe(false)
      expect(result.emailError).toBe('')
      expect(result.passwordError).toBe('')
    })

    it('should have error when inputs are incorrect', () => {
      const email = 'invalid email'
      const password = 'invalid password'
      const result = validateRegister(email, password)
      expect(result.hasError).toBe(true)
      expect(result.emailError).toBe('Email address must be valid')
      expect(result.passwordError).toBe(
        'Password must be 8-32 characters with one lowecase, uppercase, number and symbol character',
      )
    })
  })

  describe('validateLogin', () => {
    it('should have no error when inputs are correct', () => {
      const email = 'my@email.com'
      const password = 'Password123!'
      const result = validateLogin(email, password)
      expect(result.hasError).toBe(false)
      expect(result.emailError).toBe('')
      expect(result.passwordError).toBe('')
    })

    it('should have error when inputs are empty', () => {
      const email = ''
      const password = ''
      const result = validateLogin(email, password)
      expect(result.hasError).toBe(true)
      expect(result.emailError).toBe('Enter your email address')
      expect(result.passwordError).toBe('Enter your password')
    })

    it('should have error when email address is invalid', () => {
      const email = 'invalid email address'
      const password = 'Password123!'
      const result = validateLogin(email, password)
      expect(result.hasError).toBe(true)
      expect(result.emailError).toBe('Email address must be valid')
    })
  })
})
