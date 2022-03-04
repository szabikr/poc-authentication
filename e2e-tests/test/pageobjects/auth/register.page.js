import Page from '../page'

class RegisterPage extends Page {
  get title() {
    return $('h4')
  }

  get inputEmailAddress() {
    return $('#email-address')
  }

  get inputPassword() {
    return $('#password')
  }

  get inputConfirmPassword() {
    return $('#confirm-password')
  }

  get buttonRegister() {
    return $('button[type="submit"]')
  }

  async register(email, password, confirmPassword) {
    await this.inputEmailAddress.setValue(email)
    await this.inputPassword.setValue(password)
    await this.inputConfirmPassword.setValue(confirmPassword)
    await this.buttonRegister.click()
  }

  open() {
    return super.open('/auth/register')
  }
}

export default new RegisterPage()
