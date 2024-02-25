declare namespace Cypress {
  interface Chainable {
    getByDataCurrency(
      type: string,
      name: string
    ): Chainable<JQuery<HTMLInputElement>>;
  }
}

Cypress.Commands.add("getByDataCurrency", (type: string, name: string) =>
  cy.contains("span", name).parents(`div[data-currency="${type}"]`)
);
