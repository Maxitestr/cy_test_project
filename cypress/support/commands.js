import { intercepts } from './intercepts'

Cypress.Commands.add('setIntercept', (alias, options = {}) => {
  const { method, url, times } = intercepts[alias]
  const routeMatcher = { method, url, times }

  if (options.fixture) {
    cy.intercept(routeMatcher, { fixture: options.fixture }).as(alias)
  } else {
    cy.intercept(routeMatcher).as(alias)
  }
})

Cypress.Commands.add('waitForResponse', (alias) => {
  cy.wait(`@${alias}`, { timeout: 10000 }).its('response.statusCode').should('eq', 200)
})