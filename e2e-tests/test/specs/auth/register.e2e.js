import { v4 as uuid } from 'uuid'
import { BASE_URL } from '../../constants'
import RegisterPage from '../../pageobjects/auth/register.page'

describe('Auth - Register Page', () => {
  it('should display title', async () => {
    await RegisterPage.open()

    await expect(RegisterPage.title).toBeExisting()

    const titleText = await RegisterPage.title.getText()
    await expect(titleText).toBe('Create your account')
  })

  it('should register successfuly', async () => {
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

    const registerSuccessTitle = $('h1')

    await expect(registerSuccessTitle).toBeExisting()

    const registerSuccessTitleText = await registerSuccessTitle.getText()
    expect(registerSuccessTitleText).toBe('Registration was successful')
  })
})
