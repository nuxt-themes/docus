describe('Checks if the accept cookies works', function() {
  it('Successfully accepts the cookies', function() {
    cy.visit('/')
    cy.get('[data-cy="cookie-box"]').within(() => {
      cy.get('button').click()
    })
  })
})
