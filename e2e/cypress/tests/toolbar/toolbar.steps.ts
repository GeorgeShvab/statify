import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the search page", () => {
  cy.visit("/search");
});
