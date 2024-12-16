import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the signin page", () => {
  cy.visit("/admin/signin");
});

When("I type {word} email", (value: string) => {
  cy.getById("signin-email-input").type(value);
});

When("I type {word} password", (value: string) => {
  cy.getById("signin-password-input").type(value);
});

Then("Invalid credentails message should be displayed", () => {
  cy.contains("Incorrect password or email");
});

Then("I should be logged in", () => {
  cy.getCookie("next-auth.session-token").should("exist");
});
