import precisionLocator from "../../locators/ada-locators/precision-locators.json";
import FixtureDataService from "../../services/fixture-data-service";

class PrecisionAcceptance {
  static goToPrecisionAcceptence() {
    cy.xpath(precisionLocator.precisionTab).navigate();
  }

  static goToAcceptenceCriteriaTab() {
    cy.xpath(precisionLocator.acceptenceCriteriaTab).scrollToElement().click();

    cy.contains("button", "Add New Precision and Acceptance Criteria").should("be.visible");
  }

  static clickOnStartNewAceptence() {
    cy.contains("button", "Add New Precision and Acceptance Criteria").click();
    cy.xpath("//h3[normalize-space()='Mean and %CV Tables']").should("be.visible");
  }

  static clickOnNextForFirstTime() {
    cy.contains("button", "Next").scrollToElement().click();
    cy.xpath("//th[normalize-space()='Neg']").should(
      "be.visible"
    );
  }

  static clickOnNextForSecondTime() {
    cy.contains("button", "Next").scrollToElement().click();
    cy.xpath("//h3[normalize-space()='Calculate Precision & Acceptance Criteria']").should("be.visible");
  }

  static clickOnNextForThirdTime() {
    cy.contains("button", "Next").scrollToElement().click();
    cy.xpath("//h4[normalize-space()='User Defined Acceptance Criteria and Rules']").should("be.visible");
  }

  static clickOnNextForLastTime() {
    cy.contains("button", "Next").scrollToElement().click();
    cy.contains("button", "Save").should("be.visible");
  }

  static clickOnSave() {
    cy.contains("button", "Save").scrollToElement();
    cy.clickSaveBtn();
    cy.get(".modal-body").should("be.visible");
  }

  static importCsvFileforPlateForPrecision(plateNumber) {
    const filePath = FixtureDataService.findFixtureDataByKey(
      `U_precision_d1_plate${plateNumber}_path`
    );
    const fileName = FixtureDataService.findFixtureDataByKey(
      `U_precision_d1_plate${plateNumber}_file_name`
    );
    cy.importPlateDataCSV(filePath, fileName);
  }

  static goToIntraAssayTab() {
    cy.xpath((precisionLocator.intraAssayTab)).scrollToElement().click();
    cy.screenshot({capture: "fullPage"});
  }
}

export default PrecisionAcceptance;
