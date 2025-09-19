describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    // Configuração inicial antes de cada teste
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = 'Teste do Teste para motivos de Teste'.repeat(10)
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Medeiros')
    cy.get('#email').type('pedro@pedro.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('.button[type="submit"').click()
    
    cy.get('.success').should('be.visible')
  })

})
