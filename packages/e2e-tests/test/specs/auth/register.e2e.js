import { v4 as uuid } from 'uuid'
import { BASE_URL } from '../../constants'
import RegisterPage from '../../pageobjects/auth/register.page'
import LoginPage from '../../pageobjects/auth/login.page'
import WelcomePage from '../../pageobjects/welcome.page'
import HeaderComponent from '../../componentobjects/header.component'
import FooterComponent from '../../componentobjects/footer.component'

describe('Auth - Register Page', () => {
  it('should display title', async () => {
    await RegisterPage.open()

    await expect(RegisterPage.title).toBeExisting()

    const titleText = await RegisterPage.title.getText()
    await expect(titleText).toBe('Create your account')
  })

  it('should have a link that navigates to the Login page', async () => {
    await RegisterPage.open()

    const loginLink = RegisterPage.loginLink
    await loginLink.click()

    const url = await browser.getUrl()

    expect(url).toBe(`${BASE_URL}/auth/login`)

    await expect(LoginPage.title).toBeExisting()
  })

  describe('Happy Path', () => {
    it('should register successfully', async () => {
      await RegisterPage.open()

      const email = `e2e-test.${uuid().slice(0, 8)}@address.com`
      const password = 'Password123!'
      const confirmPassword = 'Password123!'
      await RegisterPage.register(email, password, confirmPassword)

      await browser.waitUntil(
        async () =>
          (await browser.getUrl()) === `${BASE_URL}/auth/register/success`,
        {
          timeout: 5000,
          timeoutMsg: 'expected to navigate to Register Success page after 5s',
        },
      )

      // TODO: Change this part of the test once the proper authentication flow is figured out

      const registerSuccessTitle = $('h1')

      await expect(registerSuccessTitle).toBeExisting()

      const registerSuccessTitleText = await registerSuccessTitle.getText()
      expect(registerSuccessTitleText).toBe('Registration was successful')
    })
  })

  describe('Error Paths', () => {
    it('should indicate that all fields are mandatory', async () => {
      await RegisterPage.open()

      const email = ''
      const password = ''
      const confirmPassword = ''
      await RegisterPage.register(email, password, confirmPassword)

      await expect(RegisterPage.fieldEmailAddress.error).toBeExisting()
      expect(await RegisterPage.fieldEmailAddress.error.getText()).toBe(
        'Enter your email address',
      )

      await expect(RegisterPage.fieldPassword.error).toBeExisting()
      expect(await RegisterPage.fieldPassword.error.getText()).toBe(
        'Enter your password',
      )

      await expect(RegisterPage.fieldConfirmPassword.error).toBeExisting()
      expect(await RegisterPage.fieldConfirmPassword.error.getText()).toBe(
        'Confirm your password',
      )
    })

    it('should validate Register Form fields', async () => {
      await RegisterPage.open()

      const email = 'invalid email'
      const password = 'week password'
      const confirmPassword = 'other password'
      await RegisterPage.register(email, password, confirmPassword)

      await expect(RegisterPage.fieldEmailAddress.error).toBeExisting()
      expect(await RegisterPage.fieldEmailAddress.error.getText()).toBe(
        'Email address must be valid',
      )

      await expect(RegisterPage.fieldPassword.error).toBeExisting()
      expect(await RegisterPage.fieldPassword.error.getText()).toBe(
        'Password must be 8-32 characters with one lowecase, uppercase, number and symbol character',
      )

      await expect(RegisterPage.fieldConfirmPassword.error).toBeExisting()
      expect(await RegisterPage.fieldConfirmPassword.error.getText()).toBe(
        'Passwords must match',
      )
    })

    it('should not allow to register with an already existing email address', async () => {
      await RegisterPage.open()

      const email = `e2e-test.${uuid().slice(0, 8)}@address.com`
      const password = 'Password123!'
      const confirmPassword = 'Password123!'

      await RegisterPage.register(email, password, confirmPassword)

      await browser.waitUntil(
        async () =>
          (await browser.getUrl()) === `${BASE_URL}/auth/register/success`,
        {
          timeout: 5000,
          timeoutMsg: 'expected to navigate to Register Success page after 5s',
        },
      )

      await RegisterPage.open()

      await RegisterPage.register(email, password, confirmPassword)

      await expect(RegisterPage.fieldEmailAddress.error).toBeExisting()
      expect(await RegisterPage.fieldEmailAddress.error.getText()).toBe(
        'Email address already exists',
      )
    })
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
        timeoutMsg: 'expected to navigate to Welcome page after 2s',
      },
    )

    await expect(WelcomePage.title).toBeExisting()
  })

  it('should include footer content', async () => {
    await RegisterPage.open()

    await expect(FooterComponent.content).toBeExisting()
  })
})
