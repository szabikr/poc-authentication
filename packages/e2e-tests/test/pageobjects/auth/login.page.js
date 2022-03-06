import Page from '../page'

class LoginPage extends Page {
  get title() {
    return $('h4')
  }

  open() {
    return super.open('/auth/login')
  }
}

export default new LoginPage()
