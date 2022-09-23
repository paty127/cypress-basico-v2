Cypress .Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Patricia')
    cy.get('#lastName').type('Ferreira')
    cy.get('#email').type('paty@exemplo.com')
    cy.get('#open-text-area').type('test')
    cy.contains('button', 'Enviar').click()
})