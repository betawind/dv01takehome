import MortgageCalculator from "../support/pageobjects/mortgage-calculator";
import RegistrationModal from "../support/pageobjects/registration-modal";

describe("Mortgage Calculator", () => {
  beforeEach(() => {
    MortgageCalculator.loadPage();
  });

  it("calculates monthly payment and interest", () => {
    // Loan Amount: $300,000
    // Down payment: $0
    // Interest rate: 5.0 %
    // Mortgage term: 30 years
    // Annual Taxes: $2,000 per year
    // Annual Insurance: $1,865 per year
    // PMI: $87 per month

    const mortgageDetails = {
      homePrice: 300000,
      downPaymentDollar: 0,
      interestRate: 5,
      loanTerm: 30,
      annualPropertyTaxes: 2000,
      annualHomeownersInsurance: 1865,
      monthlyPrivateMortgageInsurance: 87,
    };

    RegistrationModal.closeButton().should("be.visible").click();
    MortgageCalculator.setMortageDetails(mortgageDetails);
    MortgageCalculator.monthlyPaymentText()
      .invoke("text")
      .should("contain", "$2,019");
    MortgageCalculator.principleAndInterestText()
      .invoke("text")
      .should("contain", "$1,610");
  });
});
