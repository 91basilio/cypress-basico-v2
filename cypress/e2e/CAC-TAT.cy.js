/// <reference types="Cypress" /> 

describe('Teste em Central de Atendimento CAC-TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('Verificar o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Verificar digitar texto no campo e clicar em enviar' , () => {

    cy.get('#firstName').type('Basílio', {Delay:0})

    cy.get('#lastName').type('Santos', {Delay:0} )

    cy.get('#email').type('queirozbasso@gmail.com', {Delay:0} )

    cy.get('#phone').type('(81) 99999-0027', {Delay:0} )

    cy.get('#open-text-area').type('Teste', {Delay:0} )

    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })
  it('Verificar se o campo telefone só aceita valor numério', () => {
    cy.get('#phone')
    .type('Texto de !@#$%%@', {Delay:0} ) 
    .should('have.text', '') 
})

it('Verificar mensagem de erro', () =>{ 
 
  cy.get('#lastName').type('Santos', {Delay:0} )

  cy.get('#email').type('queirozbasso@gmail.com', {Delay:0} )

  cy.get('#phone').type('(81) 99999-0027', {Delay:0} )

  cy.get('#open-text-area').type('Teste', {Delay:0} )

  cy.get('button[type="submit"]').click()

  cy.get('.error').should('be.visible')
})

it('Verificar preencher e limpar campos', ()=>{
  
  cy.get('#firstName')
  .type('Basílio', {Delay:0})
  .should('have.value', 'Basílio')
  .clear()
  .should('have.value', '')

  cy.get('#lastName')
  .type('Santos', {Delay:0} )
  .should('have.value', 'Santos')
  .clear()
  .should('have.value', '')


  cy.get('#email')
  .type('queirozbasso@gmail.com', {Delay:0} )
  .should('have.value', 'queirozbasso@gmail.com')
  .clear()
  .should('have.value', '')

  cy.get('#phone')
  .type('999990027', {Delay:0} )
  .should('have.value', '999990027')
  .clear()
  .should('have.value', '')

  cy.get('#open-text-area')
  .type('Teste', {Delay:0} )
  .should('have.value', 'Teste')
  .clear()
  .should('have.value', '')

  })

  it('Verificar adicionar arquivo', ()=>{
  cy.get('input[type="file"]#file-upload') // pegar o botão de input
  .should('not.have.value') // Verifica se não tem nenhum valor
  .selectFile('./cypress/fixtures/example.json') // seleciona um arquivo
  .should(($input) => {
    // console.log($input)  // Verifica se o arquivo é colocado nas propriedades do input 
    expect($input[0].files[0].name).to.equal('example.json')

  })

})

 it('Verificar selecioar Drag-Drop', () => {
  cy.get('input[type="file"]#file-upload')
  .should('not.have.value')
  .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
  .should(($input) => {
    // console.log($input)
    expect($input[0].files[0].name).to.equal('example.json')

  })
 })

 it('Verificar passar um arquivo com alias', () => {
  cy.fixture('example.json').as('simpleFile')
  cy.get('input[type="file"]#file-upload')
  .selectFile('@simpleFile', {action:'drag-drop'})
  .should(($input) => {
    // console.log($input)
    expect($input[0].files[0].name).to.equal('example.json')

  })
  
})

// Verificando que o comportamento padrão é que um link no Href será aberto quando tem no target _blank
it.only('Verificar que o link abre em outra página sem clicar', () => {
  cy.get('#privacy a').should('have.attr', 'target', '_blank') 

})

// Clicando no link sem mudar de página. Tirando o atributo target
  it.only('Verificar clicar no link sem sair da página', () => {
    cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()
    cy.contains('Talking About Testing').should('be.visible')
    })

})
