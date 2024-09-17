import summaryLocator from "../locators/summary-locators.json";

class Summary {
  static goToSummary() {
    cy.xpath(summaryLocator.summaryTab).should("be.visible").click();

    cy.contains("button", "Add New Summary Precision").scrollToElement();
  }

  static clickAddSummary() {
    cy.contains("button", "Add New Summary Precision").click();

    cy.xpath(summaryLocator.tc).scrollToElement();
    cy.xpath(summaryLocator.tc).should("be.visible");
  }

  static uncheckAllExceptPAV() {
    cy.xpath(summaryLocator.tc).click();

    cy.xpath(summaryLocator.stable).scrollToElement().click();

    cy.xpath(summaryLocator.sensi).scrollToElement().click();

    cy.xpath(summaryLocator.selecti).scrollToElement().click();


    cy.xpath(summaryLocator.sc).scrollToElement().click();


    cy.xpath(summaryLocator.hook).scrollToElement().click();


    cy.xpath(summaryLocator.drug).scrollToElement().click();

    cy.xpath(summaryLocator.cc).scrollToElement().click();

    cy.contains("button", "Calculate Precision").scrollToElement();
    cy.contains("button", "Calculate Precision").should(
      "be.visible"
    );
  }

  static clickCalculate() {
    cy.contains("button", "Calculate Precision").click();
    cy.xpath("//h3[normalize-space()='Mean and %CV Tables']").should("be.visible");
  }

  static clickSave() {
    cy.contains("button", "Save").should("be.visible");
    cy.clickSaveBtn();
    cy.get(".modal-body").should("be.visible");
  }
}

export default Summary;
