import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

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
