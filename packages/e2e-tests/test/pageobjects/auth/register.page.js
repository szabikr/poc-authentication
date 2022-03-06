import Page from '../page'

class RegisterPage extends Page {
  get title() {
    return $('h4')
  }

  get loginLink() {
    return $('a[href="/auth/login"')
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

  get fieldConfirmPassword() {
    return {
      input: $('#confirm-password'),
      error: $('#confirm-password-helper-text'),
    }
  }

  get buttonRegister() {
    return $('button[type="submit"]')
  }

  async register(email, password, confirmPassword) {
    await this.fieldEmailAddress.input.setValue(email)
    await this.fieldPassword.input.setValue(password)
    await this.fieldConfirmPassword.input.setValue(confirmPassword)
    await this.buttonRegister.click()
  }

  open() {
    return super.open('/auth/register')
  }
}

export default new RegisterPage()
