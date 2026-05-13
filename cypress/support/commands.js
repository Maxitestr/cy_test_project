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
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... }

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