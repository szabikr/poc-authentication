import add from '../service'

describe('service', () => {
  it('should add two numbers together, 2 + 3 = 5', () => {
    const result = add(2, 3)
    expect(result).toBe(5)
  })
})
