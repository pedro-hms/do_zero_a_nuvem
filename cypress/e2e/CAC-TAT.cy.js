describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    // Configuração inicial antes de cada teste
    cy.visit('./src/index.html')
  })

  it('consulta o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = 'Teste do Teste para motivos de Teste'.repeat(10)
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Medeiros')
    cy.get('#email').type('pedro@pedro.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    //cy.get('.button[type="submit"').click()
    cy.contains('button','Enviar').click()

    cy.get('.success').should('be.visible') //consulta se a mensagem de sucesso está visível
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = 'Teste do Teste para motivos de Teste'.repeat(10)
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Medeiros')
    cy.get('#email').type('pedro@pedro,com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    //cy.get('.button[type="submit"').click()
    cy.contains('button','Enviar').click()

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
    //cy.get('.button[type="submit"').click()
    cy.contains('button','Enviar').click()

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
    //cy.get('.button[type="submit"').click()
    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')
  })
  
  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado - padrão', () => {
    cy.fillMandatoryFieldsAndSubmitv2()

    cy.get('.success').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado - objeto', () => {
    const cliente = {
      firstName: "Pedro",
      lastName: "Medeiros",
      email: "pedro@pedro.com"
    }
    cy.fillMandatoryFieldsAndSubmitv2(cliente)

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback')
    .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(($radio) => {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked') //consulta se ambos estão marcados
    .last()
    .uncheck()
    .should('not.be.checked') //consulta se o último está desmarcado
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(($input) => {
      expect($input[0].files[0].name).to.equal('example.json')  //teste de asserção
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
    .should(($input) => {
      expect($input[0].files[0].name).to.equal('example.json')  //teste de asserção
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile') //cria um alias para o arquivo
    cy.get('input[type="file"]#file-upload') //seleciona o input
    .should('not.have.value') //verifica se o input não tem valor
    .selectFile('@sampleFile') //usa o alias para selecionar o arquivo
    .should(($input) => {
      expect($input[0].files[0].name).to.equal('example.json')  //teste de asserção
    })
  })  

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank') //verifica se o atributo target é _blank
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
    .invoke('removeAttr', 'target') //remove o atributo target
    .click()
    cy.contains('Talking About Testing').should('be.visible') //verifica se o texto está visível
  })

})
