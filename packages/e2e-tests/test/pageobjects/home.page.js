import Page from './page'

class HomePage extends Page {
  get title() {
    return $('h1')
  }

  open() {
    return super.open('')
  }
}

export default new HomePage()
