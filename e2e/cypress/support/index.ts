import "@cypress/support/commands";
import "cypress-commands";

declare global {
  namespace Cypress {
    interface Chainable {
      getById(id: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

before(() => {
  cy.task("clearTestDatabase").then(() => {
    cy.task("populateTestDatabase");
  });
});

after(() => {
  cy.task("clearTestDatabase");
});
