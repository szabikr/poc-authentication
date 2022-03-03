import WelcomePage from '../pageobjects/welcome.page'

describe('Welcom Page', () => {
  it('should display title', async () => {
    await WelcomePage.open()

    await expect(WelcomePage.title).toBeExisting()
    const titleText = await WelcomePage.title.getText()

    await expect(titleText).toBe('Move to Done')
  })
})
