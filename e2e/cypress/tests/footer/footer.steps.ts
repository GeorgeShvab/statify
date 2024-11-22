import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I see footer", () => {
  cy.getById("footer").should("be.visible");
});

Then("I should see copyrights", () => {
  cy.getById("footer-copyrights").should("be.visible");
});
