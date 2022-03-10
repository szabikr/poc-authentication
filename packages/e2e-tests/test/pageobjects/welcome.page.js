import Page from './page'

class WelcomePage extends Page {
  get title() {
    return $('h2')
  }

  get createYourAccountLink() {
    return $('#create-your-account-button')
  }

  get registerLink() {
    return $('a[href="/auth/register"]')
  }

  get loginLink() {
    return $('a[href="/auth/login"]')
  }

  open() {
    return super.open('')
  }
}

export default new WelcomePage()
