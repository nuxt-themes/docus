describe('It checks to see if the toc at top of guides works ', () => {
  beforeEach(() => {
    cy.visit('/docs/2.x/get-started/installation/')
  })
  it('checks the table of contents anchor', () => {
    cy.get('[data-cy="toc"]').first().click()
    cy.url().should('contain', '#')
  })
})
