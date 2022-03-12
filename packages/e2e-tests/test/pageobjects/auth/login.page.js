import Page from '../page'

class LoginPage extends Page {
  get title() {
    return $('h4')
  }

  get registerLink() {
    return $('a[href="/auth/register"]')
  }

  get fieldEmailAddress() {
    return {
      input: $('#email-address'),
      error: $('#email-address-helper-text'),
    }
  }

  get fieldPassword() {
    return {
      input: $('#password'),
      error: $('#password-helper-text'),
    }
  }

  get buttonLogin() {
    return $('button[type="submit"]')
  }

  async login(email, password) {
    await this.fieldEmailAddress.input.setValue(email)
    await this.fieldPassword.input.setValue(password)
    await this.buttonLogin.click()
  }

  open() {
    return super.open('/auth/login')
  }
}

export default new LoginPage()
