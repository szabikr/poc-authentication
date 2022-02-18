const { isPasswordComplex } = require('../validation')

describe('Validation', () => {
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
})
