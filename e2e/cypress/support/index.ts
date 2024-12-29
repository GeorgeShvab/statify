import "@cypress/support/commands";
import "cypress-commands";

declare global {
  namespace Cypress {
    interface Chainable {
      getById(id: string): Chainable<JQuery<HTMLElement>>;
      getParentById(id: string): Chainable<JQuery<HTMLElement>>;
      getChildById(id: string): Chainable<JQuery<HTMLElement>>;
      getByData(
        name: string,
        value: string | number
      ): Chainable<JQuery<HTMLElement>>;
      getByName(name: string): Chainable<JQuery<HTMLElement>>;
      login(): void;
      verifyFileDownload(name: string): void;
    }
  }
}

beforeEach(() => {
  cy.setCookie("client_id", "m0qqf9t91yatil3svh");

  cy.task("clearTestDatabase").then(() => {
    cy.task("populateTestDatabase");
  });
});

afterEach(() => {
  cy.task("clearTestDatabase");
  cy.task("clearDownloads");
});
