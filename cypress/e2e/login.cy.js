describe('Login Sauce Demo', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  afterEach(function () {
    cy.screenshot(`login/${this.currentTest.title}`, {
      capture: 'fullPage',
    })
  })

  it('login-valido', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.url().should('include', '/inventory.html')
    cy.get('#inventory_container').should('be.visible')
  })

  it('senha-incorreta', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('senha_incorreta')
    cy.get('#login-button').click()

    cy.get('#login_button_container')
      .should('be.visible')
      .and('contain', 'Username and password do not match any user in this service')
  })

  it('usuario-bloqueado', () => {
    cy.get('#user-name').type('locked_out_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.get('#login_button_container')
      .should('be.visible')
      .and('contain', 'Sorry, this user has been locked out.')
  })
})