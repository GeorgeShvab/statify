import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the indicator page", () => {
  cy.visit("/indicator/NY.GDP.MKTP.CD");
});

When("the indicator page has finished loading", () => {
  cy.getById("indicator-data-section").should("exist");
  cy.getById("indicator-chart-section").should("exist");
});

Then("I should see indicator title", () => {
  cy.getById("indicator-title").should("exist").should("be.visible");
});

Then("I should see indicator description", () => {
  cy.getById("indicator-description").should("exist").should("be.visible");
});

Then("I should chart", () => {
  cy.getById("indicator-chart").should("exist").should("be.visible");
});

Then("I should see table", () => {
  cy.getById("table").should("exist").should("be.visible");
});

When(
  "I choose sorting by {word} in {word} order",
  (criteria: string, direction: string) => {
    // initial state is criteria = 'country', direction = 'asc'. That is why conditions are needed

    const btnId = criteria === "country" ? "sort-by-region" : "sort-by-value";

    if (criteria === "value") {
      cy.getById(btnId).click();
    }

    if (direction === "desc") {
      cy.getById(btnId).click();
    }
  }
);

Then("I should see data sorted by {word}", (criteria: string) => {
  cy.getByData("current-sort", criteria).should("exist").should("be.visible");
});

Then("the data should be sorted in {word} order", (direction: string) => {
  cy.getByData("current-sort-direction", direction)
    .should("exist")
    .should("be.visible");
});

When("I open chart manager", () => {
  cy.getById("indicator-chart-manager-button").click();
});

When("I add {string} to the chart", (region: string) => {
  cy.getById("modal")
    .contains(region, { matchCase: false })
    .scrollIntoView()
    .click();
});

When("I remove {string} from the chart", (region: string) => {
  cy.getById("modal")
    .contains(region, { matchCase: false })
    .scrollIntoView()
    .click();
});

When("I close chart manager", () => {
  cy.getById("modal-backdrop").click({ force: true });
});

Then("{string} should be added to the chart", (region: string) => {
  cy.getById("chart-legend-item").contains(region);
});

Then("{string} should not be added to the chart", (region: string) => {
  cy.getById("chart-legend-item").should("not.include.text", region);
});

When("I type {word} in a searchbar", (value: string) => {
  cy.getById("chart-manager-search-field").type(value);
});

Then("I should see {word} among results", (region: string) => {
  cy.getById("modal").contains(region, { matchCase: false });
  cy.getById("chart-manager-region").should("have.length", 1);
});

When("I set min range to {int}", (year: number) => {
  cy.getById("indicator-chart-range-slider").contains(year).click();
});

When("I set max range to {int}", (year: number) => {
  cy.getById("indicator-chart-range-slider").contains(year).click();
});

Then("min range should be {int}", (year: number) => {
  cy.getByData("current-min-range", year).should("exist");
});

Then("max range should be {int}", (year: number) => {
  cy.getByData("current-max-range", year).should("exist");
});

When("I open indicator actions", () => {
  cy.getById("indicator-actions-button").click();
});

When("I download dataset in {word} format", (format: string) => {
  cy.getById("dropdown")
    .contains(`download as ${format}`, {
      matchCase: false,
    })
    .click();
});

Then(
  "{string} dataset should be downloaded in {word} format",
  (name: string, format: string) => {
    cy.verifyFileDownload(`${name}.${format}`);
  }
);
