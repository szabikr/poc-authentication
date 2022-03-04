import Page from './page'

class WelcomePage extends Page {
  get title() {
    return $('h2')
  }

  get createYourAccountLink() {
    return $('a[href="/auth/register"]')
  }

  open() {
    return super.open('')
  }
}

export default new WelcomePage()
