import "@cypress/support/commands";
import "cypress-commands";

declare global {
  namespace Cypress {
    interface Chainable {
      getById(id: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
