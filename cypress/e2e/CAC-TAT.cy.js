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

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = 'Teste do Teste para motivos de Teste'.repeat(10)
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Medeiros')
    cy.get('#email').type('pedro@pedro,com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('.button[type="submit"').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone')
    .type('abcdefghij')
    .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const longText = 'Teste do Teste para motivos de Teste'.repeat(10)
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Medeiros')
    cy.get('#email').type('pedro@pedro.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('.button[type="submit"').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .type('Pedro')
    .should('have.value', 'Pedro')
    .clear()
    .should('have.value', '')
    cy.get('#lastName')
    .type('Medeiros')
    .should('have.value', 'Medeiros')
    .clear()
    .should('have.value', '')
    cy.get('#email')
    .type('pedro.@pedro.com')
    .should('have.value', 'pedro.@pedro.com')
    .clear()
    .should('have.value', '')
    cy.get('#phone')
    .type('1234567890')
    .should('have.value', '1234567890')
    .clear()
    .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('.button[type="submit"').click()
    cy.get('.error').should('be.visible')
  })
  
})
