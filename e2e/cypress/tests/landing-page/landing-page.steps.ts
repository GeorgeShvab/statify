import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { httpMethod } from "@cypress/support/constants";

Given("I am on the landing page", () => {
  cy.visit("/");
});

When("the landing page has finished loading", () => {
  cy.getById("searchbar").should("exist");
  cy.getById("landing-page-heading").should("exist");
  cy.getById("landing-page-description").should("exist");
});

Then("I should see a heading", () => {
  cy.getById("landing-page-heading").should("be.visible");
});

Then("I should see a description", () => {
  cy.getById("landing-page-description").should("be.visible");
});

Then("I should see a searchbar", () => {
  cy.getById("searchbar").should("be.visible");
});

Then("I should see a list of suggested indicators", () => {
  cy.wait("@search-suggestions-request");
  cy.getById("searchbar-autocomplete").should("be.visible");
});

Then("I should see empty search input", () => {
  cy.getById("searchbar-input").should("have.value", "");
});
