import "cypress-wait-until";

Cypress.Commands.addQuery("getById", (id: string) => {
  const getFn = cy.now(
    "get",
    `[data-testid="${id}"]`
  ) as () => Promise<HTMLElement>;
  return () => getFn();
});
