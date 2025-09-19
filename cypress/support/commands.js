// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  const longText = 'Teste do Teste para motivos de Teste'.repeat(10)
  cy.get('#firstName').type('Pedro')
  cy.get('#lastName').type('Medeiros')
  cy.get('#email').type('pedro@pedro.com')
  cy.get('#open-text-area').type(longText, { delay: 0 })
  //cy.get('.button[type="submit"').click()
  cy.contains('button','Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitv2', (cliente = {
    firstName: "Pedro",
    lastName: "Medeiros",
    email: "pedro@pedro.com"
}) => {
  const longText = 'Teste do Teste para motivos de Teste'.repeat(10)
  cy.get('#firstName').type(cliente.firstName)
  cy.get('#lastName').type(cliente.lastName)
  cy.get('#email').type(cliente.email)
  cy.get('#open-text-area').type(longText, { delay: 0 })
  //cy.get('.button[type="submit"').click()
  cy.contains('button','Enviar').click()
})