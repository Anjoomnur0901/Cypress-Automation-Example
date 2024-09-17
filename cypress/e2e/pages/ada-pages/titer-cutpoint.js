import ADA_LOCATORS from '../../locators/ada-locators/ada-locators.json';
import TITER_CUTPOINT_LOCATOR from "../../locators/ada-locators/titer-cutpoint-locators.json";
import FixtureDataService from "../../services/fixture-data-service";

class TiterCutpoint {
  static goToTiterCutpoint() {
    cy.xpath(TITER_CUTPOINT_LOCATOR.titerTab).navigate();
  }

  static goToCutpointTab() {
    cy.xpath(TITER_CUTPOINT_LOCATOR.cutpointAnalysisTab).should("be.visible").click();

    cy.contains("button", "New Titer Cutpoint Analysis").should("be.visible");
  }

  static clickOnNewTiterCutpointAnalysis() {
    cy.contains("button", "New Titer Cutpoint Analysis").click();
    cy.xpath(TITER_CUTPOINT_LOCATOR.parametricBtn).should(
      "be.visible"
    );
  }

  static saveResult() {
    const resultComment = FixtureDataService.findFixtureDataByKey("U_Esign_comment");
    const resultName = "OQ-5.4.6 Test";

    cy.xpath(ADA_LOCATORS.resultName).should("be.visible").type(resultName);
    cy.xpath(ADA_LOCATORS.resultComment).should("be.visible").type(resultComment);

    cy.screenshot();

    cy.contains("button", "Save").should("be.visible").click();

    cy.get(".modal-body").should("be.visible");
    cy.provideEsign();
    cy.get('app-cutpoint').should('not.exist');

    cy.get('app-titer-cutpoint').within(() => {
      cy.contains('a', resultName).should('exist');
    });
    cy.screenshot();
  }

  static importCsvFileforPlateForTiter(plateNumber) {
    const filePath = FixtureDataService.findFixtureDataByKey(
      `U_titer_cutpoint_d1_plate${plateNumber}_path`
    );
    const fileName = FixtureDataService.findFixtureDataByKey(
      `U_titer_cutpoint_d1_plate${plateNumber}_file_name`
    );

    cy.importPlateDataCSV(filePath, fileName);
  }

  static goToDatasetEvaluteTab() {
    cy.xpath(TITER_CUTPOINT_LOCATOR.evaluateTab).scrollToElement().click();
    cy.xpath(ADA_LOCATORS.d1P1Checkbox).should(
      "be.visible"
    );
  }

  static clickOnStartNewAceptence() {
    cy.contains("button", "Add New Titer Evaluation").scrollToElement().click();

    cy.get(".max-width > .table-container > .table > :nth-child(1) > th").scrollToElement();
  }

  static clickOnTiterCheckbox() {
    cy.xpath(TITER_CUTPOINT_LOCATOR.titerCheckbox).scrollToElement().click();

    cy.contains("button", "Next").scrollToElement();
    cy.contains("button", "Next").should("be.enabled");
  }

  static clickOnNext1() {
    cy.contains("button", "Next").scrollToElement().click();
    cy.get("canvas").scrollToElement();
    cy.get("canvas").should("be.visible");
  }

  static clickOnNext2() {
    cy.contains("button", "Next").scrollToElement().click();
    cy.get(".optional-input").scrollToElement();
    cy.get(".optional-input").should("be.visible");
  }

  static assertTCPResult() {
    cy.get(ADA_LOCATORS.cutpointResult).then($el => {
      const expectedValue = FixtureDataService.findFixtureDataByKey('U_tcp_result');
      const actualValue = $el.text().replace("%", '');

      cy.assertValueWithinTolerance(actualValue, expectedValue);
    });
  }
}

export default TiterCutpoint;
