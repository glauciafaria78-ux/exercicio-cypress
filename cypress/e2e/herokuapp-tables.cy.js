describe('Herokuapp Tables', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/tables')
  })

  afterEach(function () {
    cy.screenshot(`herokuapp-tables/${this.currentTest.title}`, {
      capture: 'fullPage',
    })
  })

  it('primeira tabela possui quatro linhas com os sobrenomes esperados', () => {
    cy.get('#table1 tbody tr').should(($rows) => {
      expect($rows).to.have.length(4)

      const lastNames = [...$rows].map((row) => row.cells[0].innerText.trim())
      expect(lastNames).to.deep.equal(['Smith', 'Bach', 'Doe', 'Conway'])
    })
  })

  it('ordena a primeira tabela pela coluna do titulo clicado', () => {
    cy.get('#table1').contains('th', 'Last Name').click()

    cy.get('#table1 tbody tr').should(($rows) => {
      const lastNames = [...$rows].map((row) => row.cells[0].innerText.trim())
      expect(lastNames).to.deep.equal(['Bach', 'Conway', 'Doe', 'Smith'])
    })
  })
})