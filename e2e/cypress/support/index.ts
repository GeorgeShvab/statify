import "@cypress/support/commands";
import "cypress-commands";

declare global {
  namespace Cypress {
    interface Chainable {
      getById(id: string): Chainable<JQuery<HTMLElement>>;
      getParentById(id: string): Chainable<JQuery<HTMLElement>>;
      getChildById(id: string): Chainable<JQuery<HTMLElement>>;
      getByData(name: string, value: string): Chainable<JQuery<HTMLElement>>;
      getByName(name: string): Chainable<JQuery<HTMLElement>>;
      login(): void;
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
