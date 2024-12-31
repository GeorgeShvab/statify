import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

const criteriaUrlParamMap = {
  id: "id",
  name: "name",
  geocode: "geoCode",
  iso2code: "iso2Code",
  datapoint: "datapoints",
  "date of update": "updatedAt",
};

const statusLabelParamMap = {
  "all statuses": "all",
  visible: "visible",
  hidden: "hidden",
};

Given("I am on the countries dashboard page", () => {
  cy.login();
  cy.visit(
    "/admin/dashboard/countries?status=all&sort=id&type=all&sortDirection=asc"
  );
});

When("the countries dashboard page has finished loading", () => {
  cy.getById("admin-dashboard-header").should("exist");
  cy.getById("admin-dashboard-table").should("exist");
});

Then("I should see countries sorted by {string} rows", (criteria: string) => {
  cy.url().should("include", `sort=${criteriaUrlParamMap[criteria]}`);
  cy.get("body").contains(`sort by ${criteria}`, { matchCase: false });
});

Then(
  "I should see countries containing {string} in a name or description",
  (value: string) => {
    const searchedUrl = new URLSearchParams(`?search=${value}`);

    cy.getById("admin-dashboard-table").contains(value, { matchCase: false });
    cy.url().should("include", `${searchedUrl.toString()}`);
  }
);

When("I refresh countries table data", () => {
  cy.intercept(
    /admin\/dashboard\/countries\?status=all&sort=id&type=all&sortDirection=asc&_rsc/
  ).as("refresh-request");
  cy.getById("admin-dashboard-refresh-button").click();
});

Given("I already applied some filters for countries", () => {
  cy.visit(
    "/admin/dashboard/countries?status=visible&sort=name&type=country&sortDirection=desc"
  );
});

Then("I should see only initial filters for countries being applied", () => {
  cy.url().should("match", /admin\/dashboard\/countries$/);
});

When("I open new country form", () => {
  cy.getById("admin-dashboard-add-button").click();
});

When("I fill in needed country values", () => {
  cy.getByName("id").type("TEST_COUNTRY_ID");
  cy.getByName("name").type("TEST_COUNTRY_NAME");
});

Then("I should see a new country in a table", () => {
  cy.get("body").contains("TEST_COUNTRY_ID");
});

When("I fill in only country name", () => {
  cy.getByName("name").type("TEST_COUNTRY_NAME");
});

Then(
  "country id input should be highlighted indicating failed validation",
  () => {
    cy.getByName("id").should("have.class", "error");
  }
);

When("I switch visibility of the first country", () => {
  cy.intercept("PATCH", /api\/admin\/countries/).as(
    "visibility-change-request"
  );
  cy.getById("switch").first().click();
});

Then("visibility of the first country should be changed", () => {
  cy.wait("@visibility-change-request");
  cy.getByData("checked", "true").should("exist");
});

When("I open first country options dropdown", () => {
  cy.getById("country-options-button").first().click();
});

Then("I should see full country information", () => {
  cy.getById("country-modal-id").should("exist").should("be.visible");

  cy.getById("country-modal-iso2code").should("exist").should("be.visible");
  cy.getById("country-modal-geocode").should("exist").should("be.visible");
  cy.getById("country-modal-name").should("exist").should("be.visible");
  cy.getById("country-modal-type").should("exist").should("be.visible");
  cy.getById("country-modal-updatedAt").should("exist").should("be.visible");
  cy.getById("country-modal-createdAt").should("exist").should("be.visible");

  cy.getById("country-modal-tags")
    .scrollIntoView()
    .should("exist")
    .should("be.visible");

  cy.getById("country-modal-edit-button")
    .scrollIntoView()
    .should("exist")
    .should("be.visible");
});

When("I open edit country modal", () => {
  cy.getById("dropdown").contains("edit country", { matchCase: false }).click();
});

When("I fill in new country name", () => {
  cy.getByName("name").clear().type("EDITED_COUNTRY_NAME");
});

Then("I should see changed country", () => {
  cy.get("body").contains("EDITED_COUNTRY_NAME");
  cy.get("body").contains("Country was updated successffully");
});

When("I click delete country", () => {
  cy.getById("table-row").its("length").as("rows");
  cy.getById("dropdown")
    .contains("delete country", { matchCase: false })
    .click();
  cy.intercept("DELETE", /api\/admin\/countries/).as(
    "delete-countries-request"
  );
});

Then("deleted country should not be displayed in a table", () => {
  cy.wait("@delete-countries-request");
  cy.get("@rows").should("not.eq", cy.getById("table-row").its("length"));
});

When("I select country", () => {
  cy.getById("select-button").first().click();
});

When("I unselect country", () => {
  cy.getById("select-button").first().click();
});

Then("country should not be selected", () => {
  cy.getById("table-row").should("not.have.class", "selected");
});

When("I select {int} first countries", (countriesToSelect: number) => {
  for (let i = 0; i < countriesToSelect; i++) {
    cy.getById("select-button").eq(i).click();
  }
});

When("I click unselect 3 countries", () => {
  cy.getById("dropdown")
    .contains("clear selection", { matchCase: false })
    .click();
});

Then("no countries should be selected", () => {
  cy.getById("admin-dashboard-table").get(".selected").should("not.exist");
});

When("I click delete selected countries", () => {
  cy.getById("table-row").its("length").as("rows");
  cy.getById("dropdown")
    .contains("delete selected", { matchCase: false })
    .click();

  cy.intercept("DELETE", /api\/admin\/countries/).as(
    "delete-countries-request"
  );
});

Then("deleted countries should not be displayed", () => {
  cy.wait("@delete-countries-request");
  cy.get("@rows").should("not.eq", cy.getById("table-row").its("length"));
});

When("I click hide selected countries", () => {
  cy.intercept("PATCH", /api\/admin\/countries/).as(
    "visibility-change-request"
  );
  cy.getById("dropdown")
    .contains("hide all selected", { matchCase: false })
    .click();
});

Then("selected countries should be hidden", () => {
  cy.wait("@visibility-change-request");
  cy.getById("switch").eq(0).find("[data-checked=true]").should("exist");
  cy.getById("switch").eq(1).find("[data-checked=true]").should("exist");
  cy.getById("switch").eq(2).find("[data-checked=true]").should("exist");
});

When("I click expose selected countries", () => {
  cy.intercept("PATCH", /api\/admin\/countries/).as(
    "visibility-change-request"
  );
  cy.getById("dropdown")
    .contains("expose all selected", { matchCase: false })
    .click();
});

When("I select all the hidden countries", () => {
  cy.getByData("checked", "true").each((el) => {
    cy.wrap(el)
      .getParentById("table-row")
      .getChildById("select-button")
      .click();
  });
});

Then("selected countries should be exposed", () => {
  cy.wait("@visibility-change-request");
  cy.getByData("checked", "true").should("not.exist");
});

Then("I should see {string} countries", (status: string) => {
  cy.url().should("include", `status=${statusLabelParamMap[status]}`);
  cy.get("body").contains(status, { matchCase: false });
});

// Refactor code. Check scenarious for imperativity, move common steps, check for right copying from indicator to country
