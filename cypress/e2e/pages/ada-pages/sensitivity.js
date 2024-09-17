import ADA_LOCATORS from '../../locators/ada-locators/ada-locators.json';
import SENSITIVITY_LOCATORS from "../../locators/ada-locators/sensitivity-locators.json";
import FixtureDataService from "../../services/fixture-data-service";

class Sensitivity {
  static goToSensitivity() {
    cy.xpath(SENSITIVITY_LOCATORS.sensitivityTab).navigate();
  }

  static importCsvFileforPlateForSensitivity(plateNumber) {
    const filePath = FixtureDataService.findFixtureDataByKey(
      `U_sensitivity_d1_plate${plateNumber}_path`
    );
    const fileName = FixtureDataService.findFixtureDataByKey(
      `U_sensitivity_d1_plate${plateNumber}_file_name`
    );

    cy.importPlateDataCSV(filePath, fileName);
  }

  static goToSensitivityTestTab() {
    cy.xpath(SENSITIVITY_LOCATORS.sensitivityTestTab).scrollToElement().click();
    cy.xpath(ADA_LOCATORS.d1P1Checkbox).should(
      "be.visible"
    );
  }

  static clickOnStartNewSensivity() {
    cy.contains("button", "Add New Sensitivity Test").should("be.visible").click();
    cy.get(".max-width > .table-container > .table > :nth-child(1) > th").scrollToElement();
    cy.get(".max-width > .table-container > .table > :nth-child(1) > th").should("be.visible");
  }

  static clickOnSen1Checkbox() {
    cy.xpath(SENSITIVITY_LOCATORS.sen1Checkbox).scrollToElement().click();
    cy.contains("button", "Next").scrollToElement();
    cy.contains("button", "Next").should("be.enabled");
  }

  static clickOnPlateCheckbox(plate) {
    const plateCheckboxXPath = SENSITIVITY_LOCATORS[`d1P${plate}Checkbox`];
    cy.xpath(plateCheckboxXPath).click();
    cy.screenshot({capture: "fullPage"});
  }

  static  giveResultNameCommentForPlate(plate) {
    const plateResult = FixtureDataService.findFixtureDataByKey(`U_p${plate}_result_name`);
    const plateComment = FixtureDataService.findFixtureDataByKey(
      `U_p${plate}_result_comment`
    );

    cy.get(".optional-input > input").type(plateResult);

    cy.get("textarea").type(plateComment);
    cy.screenshot();

    cy.clickSaveBtn();
    cy.get(".modal-body").should("be.visible");
  }

  static goToFinalSensitivity() {
    cy.get("app-container-tabs > .nav > :nth-child(2)").scrollToElement().click();
  }

  static clickOnAccept() {
    cy.contains("button", "Accept").click();
    cy.get(".modal-body").should("be.visible");
  }

  static selectAllSensitivityResultsForFinalSensitivity() {
    cy.get(SENSITIVITY_LOCATORS.sensitivityResults).within(() => {
      cy.get('input[type="checkbox"]').scrollToElement().check().should("be.checked");
    });
  }

  static  performSensitivityTest(plate) {
    cy.checkPlateCheckbox(plate);
    this.clickOnStartNewSensivity();
    this.clickOnSen1Checkbox();
    cy.clickOnNextStepBtn();
    cy.get('.loading').should('be.visible');
    cy.get('.loading').should('not.exist');
    cy.clickOnNextStepBtn();
    this.giveResultNameCommentForPlate(plate);
    cy.provideEsign();
  }
}

export default Sensitivity;
