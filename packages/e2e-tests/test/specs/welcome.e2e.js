import { BASE_URL } from '../constants'
import WelcomePage from '../pageobjects/welcome.page'

describe('Welcome Page', () => {
  it('should display title', async () => {
    await WelcomePage.open()

    await expect(WelcomePage.title).toBeExisting()

    const titleText = await WelcomePage.title.getText()
    expect(titleText).toBe('Move to Done')
  })

  it('should navigate to register screen when create your account button is clicked', async () => {
    await WelcomePage.open()

    const createYourAccountLink = WelcomePage.createYourAccountLink
    await createYourAccountLink.click()

    const url = await browser.getUrl()

    expect(url).toBe(`${BASE_URL}/auth/register`)
  })
})
