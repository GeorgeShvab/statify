import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { httpMethod } from "@cypress/support/constants";

When("I click {string}", (label: string) => {
  cy.contains(label).click();
});

When("submit form", () => {
  cy.get('button[type="submit"]:visible').click();
});

Then("I should be navigated to {string} page", (urlSubstring: string) => {
  if (urlSubstring === "home") {
    cy.url().should("equal", "http://localhost:3000/");
  } else {
    cy.url().should("include", urlSubstring);
  }
});

When("I type {string} in the searchbar", (value: string) => {
  cy.intercept(
    httpMethod.get,
    new RegExp(
      `api/public/indicators/autocomplete/search\\?query=${value}`,
      "i"
    ),
    { fixture: "search-suggestions-data" }
  ).as("search-suggestions-request");
  cy.getById("searchbar-input").type(value);
});

When("clear input value", () => {
  cy.getById("searchbar-clear-button").click();
});