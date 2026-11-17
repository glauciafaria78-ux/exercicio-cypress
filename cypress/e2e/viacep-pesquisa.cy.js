const renderResponse = (response) => {
  cy.document().then((document) => {
    const output = document.createElement('pre')
    output.textContent = JSON.stringify(response.body, null, 2)
    output.style.cssText = 'margin: 0; padding: 24px; font: 14px/1.5 monospace; white-space: pre-wrap;'
    document.body.replaceChildren(output)
  })
}

describe('Pesquisa de CEP na API ViaCEP', () => {
  afterEach(function () {
    cy.screenshot(`viacep/${this.currentTest.title}`, {
      capture: 'fullPage',
    })
  })

  it('retorna o endereco para um CEP valido e existente', () => {
    const url = 'https://viacep.com.br/ws/20040007/json/'

    cy.request(url).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.include({
        cep: '20040-007',
        localidade: 'Rio de Janeiro',
        uf: 'RJ',
      })
      expect(response.body).not.to.have.property('erro')
      renderResponse(response)
    })
  })

  it('indica erro para um CEP invalido ou inexistente', () => {
    const url = 'https://viacep.com.br/ws/00000000/json/'

    cy.request(url).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('erro', 'true')
      renderResponse(response)
    })
  })
})