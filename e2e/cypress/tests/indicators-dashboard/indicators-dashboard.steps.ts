import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

const criteriaUrlParamMap = {
  id: "id",
  label: "label",
  datapoints: "datapoints",
  "date of update": "updatedAt",
};

const statusLabelParamMap = {
  "all statuses": "all",
  visible: "visible",
  hidden: "hidden",
};

Given("I am on indicators dashboard page", () => {
  cy.login();
  cy.visit("/admin/dashboard/indicators?status=all&sort=id&sortDirection=asc");
});

When("the indicators dashboard page has finished loading", () => {
  cy.getById("admin-dashboard-header").should("exist");
  cy.getById("admin-dashboard-table").should("exist");
});

Then("I should see dashboard title", () => {
  cy.getById("admin-dashboard-title").should("exist").should("be.visible");
});

Then("I should see dashboard subtitle", () => {
  cy.getById("admin-dashboard-subtitle").should("exist").should("be.visible");
});

Then("I should see dashboard tools", () => {
  cy.getById("admin-dashboard-tools").should("be.visible");
});

Then("I should see dashboard table", () => {
  cy.getById("admin-dashboard-table").should("be.visible");
});

When("I open sort dropdown", () => {
  cy.getById("admin-dashboard-sort-select").click();
});

When("I select sorting by {string}", (criteria: string) => {
  cy.getById("select").contains(criteria, { matchCase: false }).click();
});

Then("I should see sorted by {string} rows", (criteria: string) => {
  cy.url().should("include", `sort=${criteriaUrlParamMap[criteria]}`);
  cy.get("body").contains(`sort by ${criteria}`, { matchCase: false });
});

When("I choose {string} sort direction", (direction: string) => {
  if (direction === "asc") {
    cy.visit(
      "/admin/dashboard/indicators?status=all&sort=id&sortDirection=desc"
    );
    cy.getById("admin-dashboard-sort-direction-button").click();
  } else {
    cy.getById("admin-dashboard-sort-direction-button").click();
  }
});

Then("I should see rows sorted in {string} order", (direction: string) => {
  cy.url().should("include", `sortDirection=${direction}`);
  cy.getByData("current-direction", direction);
});

When("I open status dropdown", () => {
  cy.getById("admin-dashboard-status-select").click();
});

When("I select {string}", (status: string) => {
  cy.getById("select").contains(status, { matchCase: false }).click();
});

Then("I should see {string} indicators", (status: string) => {
  cy.url().should("include", `status=${statusLabelParamMap[status]}`);
  cy.get("body").contains(status, { matchCase: false });
});

When("I type {string} in dashboard search input", (word: string) => {
  cy.getById("admin-dashboard-search-field").type(word);
});

When("I submit value with Enter", () => {
  cy.getById("admin-dashboard-search-field").trigger("keydown", {
    key: "Enter",
  });
});

Then(
  "I should see indicators containing {string} in a name or description",
  (value: string) => {
    cy.get("body").contains(value, { matchCase: false });
    cy.url().should("include", `search=${value}`);
  }
);

When("I refresh table data", () => {
  cy.intercept(
    /admin\/dashboard\/indicators\?status=all&sort=id&sortDirection=asc&_rsc/
  ).as("refresh-request");
  cy.getById("admin-dashboard-refresh-button").click();
});

Then("I should see refreshed data", () => {
  cy.wait("@refresh-request");
});

Given("I already applied some filters", () => {
  cy.visit(
    "/admin/dashboard/indicators?status=visible&sort=label&sortDirection=desc"
  );
});

When("I clear filters", () => {
  cy.getById("admin-dashboard-clear-filters").click();
});

Then("I should see only initial filters being applied", () => {
  cy.url().should("match", /admin\/dashboard\/indicators$/);
});

When("I open new indicator form", () => {
  cy.getById("admin-dashboard-add-button").click();
});

When("I fill in needed values", () => {
  cy.getByName("id").type("TEST_INDICATOR_ID");
  cy.getByName("label").type("TEST_INDICATOR_NAME");
  cy.getByName("source").type("TEST_INDICATOR_SOURCE");
});

Then("I should see a new indicator in a table", () => {
  cy.get("body").contains("TEST_INDICATOR_ID");
});

When("I fill in only name", () => {
  cy.getByName("label").type("TEST_INDICATOR_NAME");
});

Then("input should be highlighted indicating failed validation", () => {
  cy.getByName("id").should("have.class", "error");
  cy.getByName("source").should("have.class", "error");
});

When("I switch visibility of the first indicator", () => {
  cy.intercept("PATCH", /api\/admin\/indicators/).as(
    "visibility-change-request"
  );
  cy.getById("switch").first().click();
});

Then("visibility of the first indicator should be changed", () => {
  cy.wait("@visibility-change-request");
  cy.getByData("checked", "true").should("exist");
});

When("I open first indicator's options dropdown", () => {
  cy.getById("indicator-options-button").first().click();
});

When("I open more information modal", () => {
  cy.getById("dropdown")
    .contains("more information", { matchCase: false })
    .click();
});

Then("I should see full indicator's information", () => {
  cy.getById("indicator-modal-id").should("exist").should("be.visible");

  cy.getById("indicator-modal-name").should("exist").should("be.visible");

  cy.getById("indicator-modal-description")
    .should("exist")
    .should("be.visible");

  cy.getById("indicator-modal-tags")
    .scrollIntoView()
    .should("exist")
    .should("be.visible");

  cy.getById("indicator-modal-edit-button")
    .scrollIntoView()
    .should("exist")
    .should("be.visible");
});

When("I open edit indicator modal", () => {
  cy.getById("dropdown")
    .contains("edit indicator", { matchCase: false })
    .click();
});

When("I fill in new name", () => {
  cy.getByName("label").clear().type("EDITED_INDICATOR_NAME");
});

Then("I should see changed indicator", () => {
  cy.get("body").contains("EDITED_INDICATOR_NAME");
  cy.get("body").contains("Indicator was updated successffully");
});

When("I click delete indicator", () => {
  cy.getById("table-row").its("length").as("rows");
  cy.getById("dropdown")
    .contains("delete indicator", { matchCase: false })
    .click();
  cy.intercept("DELETE", /api\/admin\/indicators/).as(
    "delete-indicators-request"
  );
});

Then("deleted indicator should not be displayed in a table", () => {
  cy.wait("@delete-indicators-request");
  cy.get("@rows").should("not.eq", cy.getById("table-row").its("length"));
});

When("I select indicator", () => {
  cy.getById("select-button").first().click();
});

When("I unselect indicator", () => {
  cy.getById("select-button").first().click();
});

Then("indicator should not be selected", () => {
  cy.getById("table-row").should("not.have.class", "selected");
});

When("I select {int} first indicators", (indicatorsToSelect: number) => {
  for (let i = 0; i < indicatorsToSelect; i++) {
    cy.getById("select-button").eq(i).click();
  }
});

When("I click unselect 3 indicators", () => {
  cy.getById("dropdown")
    .contains("clear selection", { matchCase: false })
    .click();
});

Then("no indicators should be selected", () => {
  cy.getById("admin-dashboard-table").get(".selected").should("not.exist");
});

When("I click delete selected indicators", () => {
  cy.getById("table-row").its("length").as("rows");
  cy.getById("dropdown")
    .contains("delete selected", { matchCase: false })
    .click();

  cy.intercept("DELETE", /api\/admin\/indicators/).as(
    "delete-indicators-request"
  );
});

Then("deleted indicators should not be displayed", () => {
  cy.wait("@delete-indicators-request");
  cy.get("@rows").should("not.eq", cy.getById("table-row").its("length"));
});

When("I click hide selected indicators", () => {
  cy.intercept("PATCH", /api\/admin\/indicators/).as(
    "visibility-change-request"
  );
  cy.getById("dropdown")
    .contains("hide all selected", { matchCase: false })
    .click();
});

Then("selected indicators should be hidden", () => {
  cy.wait("@visibility-change-request");
  cy.getById("switch").eq(0).find("[data-checked=true]").should("exist");
  cy.getById("switch").eq(1).find("[data-checked=true]").should("exist");
  cy.getById("switch").eq(2).find("[data-checked=true]").should("exist");
});

When("I click expose selected indicators", () => {
  cy.intercept("PATCH", /api\/admin\/indicators/).as(
    "visibility-change-request"
  );
  cy.getById("dropdown")
    .contains("expose all selected", { matchCase: false })
    .click();
});

When("I select all the hidden indicators", () => {
  cy.getByData("checked", "true").each((el) => {
    cy.wrap(el)
      .getParentById("table-row")
      .getChildById("select-button")
      .click();
  });
});

Then("selected indicators should be exposed", () => {
  cy.wait("@visibility-change-request");
  cy.getByData("checked", "true").should("not.exist");
});
