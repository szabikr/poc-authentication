import { BASE_URL } from '../constants'
import WelcomePage from '../pageobjects/welcome.page'
import RegisterPage from '../pageobjects/auth/register.page'
import LoginPage from '../pageobjects/auth/login.page'

describe('Welcome Page', () => {
  it('should display title', async () => {
    await WelcomePage.open()

    await expect(WelcomePage.title).toBeExisting()

    const titleText = await WelcomePage.title.getText()
    expect(titleText).toBe('Move to Done')
  })

  it('should navigate to register page when create your account button is clicked', async () => {
    await WelcomePage.open()

    const createYourAccountLink = WelcomePage.createYourAccountLink
    await createYourAccountLink.click()

    const url = await browser.getUrl()

    expect(url).toBe(`${BASE_URL}/auth/register`)
    expect(await RegisterPage.title).toBeExisting()
  })

  it('should navigate to register page when Register Nav link is clicked', async () => {
    await WelcomePage.open()

    const registerLink = WelcomePage.registerLink
    await registerLink.click()

    const url = await browser.getUrl()

    expect(url).toBe(`${BASE_URL}/auth/register`)
    expect(await RegisterPage.title).toBeExisting()
  })

  it('should navigate to login page when Login Nav link is clicked', async () => {
    await WelcomePage.open()

    const loginLink = WelcomePage.loginLink
    await loginLink.click()

    const url = await browser.getUrl()

    expect(url).toBe(`${BASE_URL}/auth/login`)
    expect(await LoginPage.title).toBeExisting()
  })
})
