export default class MortgageCalculator {
  public static readonly loadPage = () =>
    cy.visit("/mortgages/mortgage-calculator");
  public static readonly homePriceInput = () =>
    cy.getByDataCurrency("Column", "Home price").find("input");
  public static readonly downPaymentDollarInput = () =>
    cy.getByDataCurrency("Column", "Down payment").first().find("input");
  public static readonly propertyTaxesInput = () =>
    cy.getByDataCurrency("Column", "Property taxes").find("input");
  public static readonly homeownersInsuranceInput = () =>
    cy.getByDataCurrency("Column", "Homeowners insurance").find("input");
  public static readonly privateMortgageInsurance = () =>
    cy
      .getByDataCurrency("Column", "Private mortgage insurance (PMI)")
      .find("input");
  public static readonly interestRateInput = () =>
    cy.contains("Interest rate").parent("div").find("input");
  public static readonly loanTermInput = () => cy.get(".nw-stepper input");
  public static readonly monthlyPaymentText = () =>
    cy.getByDataCurrency("Stack", "Your monthly payment").find("span").eq(1);
  public static readonly principleAndInterestText = () =>
    cy
      .getByDataCurrency("Column", "Principal and Interest")
      .find("span[data-currency='Text']")
      .eq(2);

  public static readonly setMortageDetails = (
    mortgageDetails: MortgageDetails
  ) => {
    for (const key of Object.keys(mortgageDetails)) {
      if (typeof mortgageDetails[key] != "number") {
        throw new Error(`${key} must be a number`);
      }
    }

    const {
      downPaymentDollar,
      homePrice,
      interestRate,
      loanTerm,
      annualHomeownersInsurance,
      annualPropertyTaxes,
      monthlyPrivateMortgageInsurance,
    } = mortgageDetails;

    this.homePriceInput().clear().type(homePrice.toString());
    this.downPaymentDollarInput().clear().type(downPaymentDollar.toString());
    this.interestRateInput().clear().type(interestRate.toString());
    this.loanTermInput().clear().type(loanTerm.toString());
    this.propertyTaxesInput()
      .clear()
      .type(Math.round(annualPropertyTaxes / 12).toString());
    this.homeownersInsuranceInput()
      .clear()
      .type(Math.round(annualHomeownersInsurance / 12).toString());

    if (monthlyPrivateMortgageInsurance) {
      this.privateMortgageInsurance()
        .clear()
        .type(monthlyPrivateMortgageInsurance.toString());
    }
  };
}

interface MortgageDetails {
  downPaymentDollar: number;
  homePrice: number;
  interestRate: number;
  loanTerm: number;
  annualHomeownersInsurance: number;
  annualPropertyTaxes: number;
  monthlyPrivateMortgageInsurance?: number;
}
