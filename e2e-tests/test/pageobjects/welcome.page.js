import Page from './page'

class WelcomePage extends Page {
  get title() {
    return $('h2')
  }

  open() {
    return browser.url('/')
  }
}

export default new WelcomePage()
