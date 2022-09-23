/// <reference types="cypress" />


describe('Central de Atendimento so cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html');
    })
    it('verifica titulo da aplicação', function () {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })
    it('Preenche os campos obrigatórios e envia o formulario', function () {
        const longText = 'loremipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut   labore et dolore magna aliqua. Ut enim adipiscingg'
        cy.get('#firstName').type('Patricia')
        cy.get('#lastName').type('Ferreira')
        cy.get('#email').type('paty@exemplo.com')
        cy.get('#open-text-area').type(longText, {
            delay: 0
        })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

    })
    it('exibe mensagem de erro  ao submeter o formulario com um email com formatação inválida ', function () {
        cy.get('#firstName').type('Patricia')
        cy.get('#lastName').type('Ferreira')
        cy.get('#email').type('paty@exemplo,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })
    it('campo de telefone continua vazio quando preenchido com valor não numerico', function () {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')

    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.get('#firstName').type('Patricia')
        cy.get('#lastName').type('Ferreira')
        cy.get('#email').type('paty@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('prenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Patricia')
            .should('have.value', 'Patricia')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Ferreira')
            .should('have.value', 'Ferreira')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('paty@exemplo.com')
            .should('have.value', 'paty@exemplo.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('123456')
            .should('have.value', '123456')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('teste')
            .should('have.value', 'teste')
            .clear()
            .should('have.value', '')



    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })
    it('envia o formuário com sucesso usando um comando customizado', function () {

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')


    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')

    })
    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')


    })
    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')

    })
    it('marca cada tipo de Atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio)
                    .check()
                cy.wrap($radio).should('be.checked')

            })

    })
    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')

    })
    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })
    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {
                action: 'drag-drop'
            })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')

            })

    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')

            })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () { 
        cy.get('#privacy a').should('have.attr','target', '_blank' )
    })
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function() { 
       cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('Talking About Testing').should('be.visible')

    })
   
})