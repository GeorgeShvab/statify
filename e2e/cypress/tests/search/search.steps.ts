import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on a search page", () => {
  cy.visit("/search");
});

Then("I should see at least one result", () => {
  cy.getById("indicator-card").should("have.length.gte", 1);
});

When("I click on the first indicator of the results", () => {
  cy.getById("indicator-card").first().click();
});
