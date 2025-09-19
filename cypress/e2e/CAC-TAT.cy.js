describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    // Configuração inicial antes de cada teste
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Medeiros')
    cy.get('#email').type('pedro@pedro.com')
    cy.get('#open-text-area').type('Teste do teste para fins de teste')
    cy.get('.button[type="submit"').click()
    
    cy.get('.success').should('be.visible')
  })

})
