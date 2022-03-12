import { v4 as uuid } from 'uuid'
import LoginPage from '../../pageobjects/auth/login.page'
import RegisterPage from '../../pageobjects/auth/register.page'
import { BASE_URL } from '../../constants'
import HeaderComponent from '../../componentobjects/header.component'
import WelcomePage from '../../pageobjects/welcome.page'
import FooterComponent from '../../componentobjects/footer.component'
import HomePage from '../../pageobjects/home.page'

describe('Auth - Login Page', () => {
  const registeredUserEmail = `e2e-test.${uuid().slice(0, 8)}@address.com`
  const registeredUserPassword = 'Password123!'

  before(async () => {
    async function registerUser(email, password) {
      await RegisterPage.open()

      const confirmPassword = password
      await RegisterPage.register(email, password, confirmPassword)

      await browser.waitUntil(
        async () =>
          (await browser.getUrl()) === `${BASE_URL}/auth/register/success`,
        {
          timeout: 5000,
          timeoutMsg: 'expected to navigate to Register Success page after 5s',
        },
      )
    }

    await registerUser(registeredUserEmail, registeredUserPassword)
  })

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
    it('should login successfully', async () => {
      await LoginPage.open()

      await LoginPage.login(registeredUserEmail, registeredUserPassword)

      await browser.waitUntil(
        async () => (await browser.getUrl()) === `${BASE_URL}/home`,
      )

      await expect(HomePage.title).toBeExisting()
    })
  })

  describe('Error Paths', () => {
    it('should indicate that all fields are mandatory', async () => {
      await LoginPage.open()

      const email = ''
      const password = ''
      await LoginPage.login(email, password)

      await expect(LoginPage.fieldEmailAddress.error).toBeExisting()
      expect(await LoginPage.fieldEmailAddress.error.getText()).toBe(
        'Enter your email address',
      )

      await expect(LoginPage.fieldPassword.error).toBeExisting()
      expect(await LoginPage.fieldPassword.error.getText()).toBe(
        'Enter your password',
      )
    })

    it('should validate Login Form fields', async () => {
      await LoginPage.open()

      const email = 'invalid email'
      const password = 'week password'
      await LoginPage.login(email, password)

      await expect(LoginPage.fieldEmailAddress.error).toBeExisting()
      expect(await LoginPage.fieldEmailAddress.error.getText()).toBe(
        'Email address must be valid',
      )
    })

    it('should not allow to login with incorrect username', async () => {
      await LoginPage.open()

      const email = 'not@registered.email'
      const password = registeredUserPassword
      await LoginPage.login(email, password)

      await expect(LoginPage.loginErrorMsg).toBeExisting()
      expect(await LoginPage.loginErrorMsg.getText()).toBe(
        'Username or password is incorrect',
      )
    })

    it('should not allow to login with incorrect password', async () => {
      await LoginPage.open()

      const email = registeredUserEmail
      const password = 'incorrect password'
      await LoginPage.login(email, password)

      await expect(LoginPage.loginErrorMsg).toBeExisting()
      expect(await LoginPage.loginErrorMsg.getText()).toBe(
        'Username or password is incorrect',
      )
    })
  })
})
