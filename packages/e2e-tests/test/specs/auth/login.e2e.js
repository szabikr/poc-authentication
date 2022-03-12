import { v4 as uuid } from 'uuid'
import LoginPage from '../../pageobjects/auth/login.page'
import RegisterPage from '../../pageobjects/auth/register.page'
import { BASE_URL } from '../../constants'
import HeaderComponent from '../../componentobjects/header.component'
import WelcomePage from '../../pageobjects/welcome.page'
import FooterComponent from '../../componentobjects/footer.component'
import HomePage from '../../pageobjects/home.page'

describe('Auth - Login Page', () => {
  it('should display title', async () => {
    await LoginPage.open()

    await expect(LoginPage.title).toBeExisting()

    const titleText = await LoginPage.title.getText()
    expect(titleText).toBe('Login to your account')
  })

  it('should have a link that navigates to the Register page', async () => {
    await LoginPage.open()

    const registerLink = LoginPage.registerLink
    await registerLink.click()

    const url = await browser.getUrl()

    expect(url).toBe(`${BASE_URL}/auth/register`)

    await expect(RegisterPage.title).toBeExisting()
  })

  it('should have a link to Welcome page', async () => {
    await RegisterPage.open()

    const linkWelcome = HeaderComponent.linkWelcome
    await expect(linkWelcome).toBeExisting()

    await linkWelcome.click()

    await browser.waitUntil(
      async () => (await browser.getUrl()) === `${BASE_URL}/`,
      {
        timeout: 2000,
        timoutMsg: 'expected to navigate to Welcome page after 2s',
      },
    )

    await expect(WelcomePage.title).toBeExisting()
  })

  it('should include footer content', async () => {
    await LoginPage.open()

    await expect(FooterComponent.content).toBeExisting()
  })

  describe('Happy Path', () => {
    const email = `e2e-test.${uuid().slice(0, 8)}@address.com`
    const password = 'Password123!'

    before(async () => {
      async function registerUser() {
        await RegisterPage.open()

        const confirmPassword = password
        await RegisterPage.register(email, password, confirmPassword)

        await browser.waitUntil(
          async () =>
            (await browser.getUrl()) === `${BASE_URL}/auth/register/success`,
          {
            timeout: 5000,
            timeoutMsg:
              'expected to navigate to Register Success page after 5s',
          },
        )
      }

      await registerUser()
    })

    it('should login successfully', async () => {
      await LoginPage.open()

      await LoginPage.login(email, password)

      await browser.waitUntil(
        async () => (await browser.getUrl()) === `${BASE_URL}/home`,
      )

      await expect(HomePage.title).toBeExisting()
    })
  })
})
