export default class RegistrationModal {
  public static readonly MODAL_LOCATOR = "#contextual-reg-modal-desktop";
  public static readonly closeButton = () =>
    cy.get(`${this.MODAL_LOCATOR} [aria-label=Close]`);
}
