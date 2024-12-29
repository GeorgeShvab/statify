import { Given, When } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the indicator country page", () => {
  cy.visit("/indicator/NY.GDP.MKTP.CD/USA");
});

When("the indicator country page has finished loading", () => {
  cy.getById("indicator-data-section").should("exist");
  cy.getById("indicator-chart-section").should("exist");
});
