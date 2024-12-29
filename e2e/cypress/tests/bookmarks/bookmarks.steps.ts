import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the bookmarks page", () => {
  cy.visit("/bookmarks");
});

When("I bookmark indicator", () => {
  cy.getById("dropdown").contains("bookmark", { matchCase: false }).click();
});

When("I navigate back to bookmarks page", () => {
  cy.visit("/bookmarks");
});

Then("new bookmark should be there", () => {
  cy.getById("indicator-card").contains("GDP").should("exist");
});

When("the bookmarks page has finished loading", () => {
  cy.getById("indicators-list-view").should("exist");
});

Then("I should see title", () => {
  cy.getById("indicators-list-title").should("exist").should("be.visible");
});

Then("I should see bookmark", () => {
  cy.getById("indicator-card")
    .contains("population", { matchCase: false })
    .should("exist");
});

When("I unbookmark the indicator", () => {
  cy.getById("dropdown").contains("unbookmark", { matchCase: false }).click();
});

Then("indicator should not be bookmarked", () => {
  cy.getById("indicator-card").should("not.exist");
});

When("I navigate to {string} indicator page", (indicator: string) => {
  cy.getById("indicator-card").contains(indicator).click();
});

Given(
  "I am on the {word} indicator page of {word} country",
  (indicatorId: string, countryId: string) => {
    if (countryId === "null") {
      cy.visit(`/indicator/${indicatorId}`);
    } else {
      cy.visit(`/indicator/${indicatorId}/${countryId}`);
    }
  }
);

Then("indicator {string} should be bookmarked", (indicatorId: string) => {
  cy.getById("indicators-list-view").contains(indicatorId).should("exist");
});

Then("indicator {string} should not be bookmarked", (indicatorId: string) => {
  cy.getById("indicators-list-view").contains(indicatorId).should("not.exist");
});
