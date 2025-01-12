import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

const criteriaUrlParamMap = {
  id: "id",
  "indicator id": "indicatorId",
  "country id": "countryId",
  "date of update": "updatedAt",
};

const indicatorUrlParamMap = {
  population: "SP.POP.TOTL",
  gdp: "NY.GDP.MKTP.CD",
  "all indicators": "all",
};

const countryUrlParamMap = {
  "united kingdom": "GBR",
  france: "FRA",
  "all countries": "all",
};

Given("I am on values dashboard page", () => {
  cy.login();
  cy.visit(
    "/admin/dashboard/values?indicator=all&country=all&sort=id&sortDirection=asc"
  );
});

When("the values dashboard page has finished loading", () => {
  cy.getById("admin-dashboard-header").should("exist");
  cy.getById("admin-dashboard-table").should("exist");
});

Then("I should see values sorted by {string}", (criteria: string) => {
  cy.wait("@sort-requrest");
  cy.url().should("include", `sort=${criteriaUrlParamMap[criteria]}`);
  cy.get("body").contains(`sort by ${criteria}`, { matchCase: false });
});

When("I open indicator dropdown", () => {
  cy.getById("admin-dashboard-indicator-select").click();
});

Then(
  "I should see only values associated with {string} indicator",
  (indicator: string) => {
    cy.url().should("include", `indicator=${indicatorUrlParamMap[indicator]}`);
    cy.get("body").contains(indicator, { matchCase: false });
  }
);

When("I open country dropdown", () => {
  cy.getById("admin-dashboard-country-select").click();
});

Then(
  "I should see only values associated with {string} country",
  (indicator: string) => {
    cy.url().should("include", `country=${countryUrlParamMap[indicator]}`);
    cy.get("body").contains(indicator, { matchCase: false });
  }
);

When("I type {string} in country select search field", (value: string) => {
  cy.getById("select").getById("input").type(value);
});

Then(
  "{int} options should be displayed in opened select dropdown",
  (numberOfOptions: number) => {
    cy.getById("select")
      .getById("option")
      .should("have.length", numberOfOptions);
  }
);

When("I type {string} in indicator select search field", (value: string) => {
  cy.getById("select").getById("input").type(value);
});

When("I refresh values table data", () => {
  cy.intercept(
    /admin\/dashboard\/values\?indicator=all&country=all&sort=id&sortDirection=asc&_rsc/
  ).as("refresh-request");
  cy.getById("admin-dashboard-refresh-button").click();
});

Given("I already applied some value filters", () => {
  cy.visit(
    "/admin/dashboard/values?indicator=NY.GDP.MKTP.CD&country=GBR&sort=updatedAt&sortDirection=desc"
  );
});

Then("I should see only initial value filters being applied", () => {
  cy.url().should("match", /admin\/dashboard\/values$/);
});

When("I open new value form", () => {
  cy.getById("admin-dashboard-add-button").click();
});

When("I fill in needed for a new value data", () => {
  cy.getByName("countryId").type("FRA");
  cy.getByName("indicatorId").type("SP.POP.TOTL");
  cy.getByName("value").type("111555111");
  cy.getByName("year").type("555111555");
});

Then("new value should be created", () => {
  cy.get("body").contains("Value was created successffully");
});

When("I open first value options dropdown", () => {
  cy.getById("value-options-button").first().click();
});

When("I open edit value modal", () => {
  cy.getById("dropdown")
    .contains("edit value", { matchCase: false })
    .click({ scrollBehavior: "center" });
});

When("I fill in new year", () => {
  cy.getByName("year").clear().type("1000");
});

Then("I should see changed value", () => {
  cy.get("body").contains("1 000");
  cy.get("body").contains("Value was updated successffully");
});

Then("I should see full value information", () => {
  cy.getById("value-modal-id").should("exist").should("be.visible");
  cy.getById("value-modal-indicator-id").should("exist").should("be.visible");
  cy.getById("value-modal-country-id").should("exist").should("be.visible");
  cy.getById("value-modal-country-value").should("exist").should("be.visible");
  cy.getById("value-modal-country-year").should("exist").should("be.visible");
  cy.getById("value-modal-updatedAt").should("exist").should("be.visible");
  cy.getById("value-modal-createdAt").should("exist").should("be.visible");
  cy.getById("value-modal-edit-button").should("exist").should("be.visible");
});

When("I click delete value", () => {
  cy.getById("table-row").its("length").as("rows");
  cy.getById("dropdown")
    .contains("delete value", { matchCase: false })
    .click({ scrollBehavior: "center" });
  cy.intercept("DELETE", /api\/admin\/values/).as("delete-values-request");
});

Then("deleted value should not be displayed in a table", () => {
  cy.wait("@delete-values-request");
  cy.get("@rows").should("not.eq", cy.getById("table-row").its("length"));
});

When("I select value sorting by {string}", (criteria: string) => {
  cy.intercept("GET", new RegExp("sort=" + criteriaUrlParamMap[criteria])).as(
    "sort-requrest"
  );
  cy.getById("select").contains(criteria, { matchCase: false }).click();
});

When("I select value", () => {
  cy.getById("select-button").first().click();
});

When("I unselect value", () => {
  cy.getById("select-button").first().click();
});

Then("value should not be selected", () => {
  cy.getById("table-row").should("not.have.class", "selected");
});

When("I select {int} first values", (valuesToSelect: number) => {
  for (let i = 0; i < valuesToSelect; i++) {
    cy.getById("select-button").eq(i).click({ waitForAnimations: false });
  }
});

When("I click unselect all values", () => {
  cy.getById("dropdown")
    .contains("clear selection", { matchCase: false })
    .click({ scrollBehavior: "center" });
});

Then("no values should be selected", () => {
  cy.getById("admin-dashboard-table").get(".selected").should("not.exist");
});

When("I click delete selected values", () => {
  cy.getById("table-row").its("length").as("rows");
  cy.getById("dropdown")
    .contains("delete selected", { matchCase: false })
    .click({ scrollBehavior: "center" });

  cy.intercept("DELETE", /api\/admin\/values/).as("delete-values-request");
});

Then("deleted values should not be displayed", () => {
  cy.wait("@delete-values-request");
  cy.get("@rows").should("not.eq", cy.getById("table-row").its("length"));
});

When("I fill in only year", () => {
  cy.getByName("year").type("2015");
});

Then("value inputs should be highlighted indicating failed validation", () => {
  cy.getByName("value").should("have.class", "error");
  cy.getByName("countryId").should("have.class", "error");
  cy.getByName("indicatorId").should("have.class", "error");
});
