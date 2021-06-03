describe('The Home Page links', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('checks to see if the get started button links to guides', () => {
    cy.get('a[data-cy="get-started"]')
      .click()
    cy.url().should('include', '/docs/2.x/get-started/installation')
    cy.visit('/docs/2.x/get-started/installation/')
  })

  it('github stars links to the right page', () => {
    cy.get('a[data-cy="github-stars"]')
      .should('have.attr', 'href', 'https://github.com/nuxt/nuxt.js')
  })

  it('checks the newsletter message links to newsletter signup', () => {
    cy.get('[data-cy="newsletter-link"]').within(() => {
      cy.get('a').click()
      cy.url().should('include', 'subscribe-to-newsletter')
    })

  })

  it('checks the video is there', () => {
    cy.get('[data-cy="video"]').within(() => {
      cy.get('iframe').should('have.attr', 'src', 'https://player.vimeo.com/video/311756540')
    })
  })

  it('checks to see if the try Nuxtjs button links to codesandbox', () => {
    cy.get('a[data-cy="why"]')
    .should('have.attr', 'href', 'https://template.nuxtjs.org')
  })

  it('checks to see if the sponsor button links to the sponsor page', () => {
    cy.get('a[data-cy="sponsors"]').click()
    cy.url().should('include', '/sponsor-nuxtjs')
    cy.visit('/sponsor-nuxtjs/')
  })


})
