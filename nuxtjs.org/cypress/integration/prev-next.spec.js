describe('It checks to see if prev and next work for the guides ', () => {
  beforeEach(() => {
    cy.visit('/docs/2.x/get-started/routing/')
  })
  it('checks the previous link', () => {
    cy.get('[data-cy="prev"]').click()
    cy.url().should('include', '/docs/2.x/get-started/installation')
    cy.go(-1)
  })
  it('checks the next link', () => {
    cy.get('[data-cy="next"]').click()
    cy.url().should('include', '/docs/2.x/get-started/directory-structure')
    cy.go(1)
  })
})
