import { v4 as uuid } from 'uuid'
import { BASE_URL } from '../../constants'
import RegisterPage from '../../pageobjects/auth/register.page'
import LoginPage from '../../pageobjects/auth/login.page'

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

  xit('should register successfuly', async () => {
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

  describe('Error Paths', () => {
    it('should indicate the all fields are mandatory', async () => {
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
  })
})
