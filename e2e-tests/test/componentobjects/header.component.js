class HeaderComponent {
  get linkWelcome() {
    return $('a[href="/"]')
  }
}

export default new HeaderComponent()
