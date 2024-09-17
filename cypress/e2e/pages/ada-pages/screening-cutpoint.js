import ADA_LOCATORS from '../../locators/ada-locators/ada-locators.json';
import SCREENING_CUTPOINT_LOCATORS from "../../locators/ada-locators/screening-cutpoint-locators.json";
import FixtureDataService from '../../services/fixture-data-service';
import Ada from "./ada";


class ScreeningCutpoint {
  static goToScreeningCutpoint() {
    cy.xpath(SCREENING_CUTPOINT_LOCATORS.navToScreeningCutpoint).navigate();
  }

  static importCsvFileforPlateForScreening(plateNumber, dataset) {
    const filePath = FixtureDataService.findFixtureDataByKey(
      `U_screening_d${dataset}_plate${plateNumber}_path`
    );
    const fileName = FixtureDataService.findFixtureDataByKey(
      `U_screening_d${dataset}_plate${plateNumber}_file_name`
    );
    cy.importPlateDataCSV(filePath, fileName);
  }

  static goToNcEvTab() {
    cy.xpath(SCREENING_CUTPOINT_LOCATORS.ncEvTab).click();
    cy.contains("button", "Start NC Evaluation").should(
      "be.visible"
    );
  }

  static startNcEv() {
    cy.contains("button", "Start NC Evaluation").click();
    cy.contains("button", "Accept NC").should("be.visible");
  }

  static acceptNcEv() {
    cy.contains("button", "Accept NC").click();

    cy.get(".modal-body").should("be.visible");
  }

  static goToCutpointOutlierTab() {
    cy.xpath(ADA_LOCATORS.cutpointTab).scrollToElement();
    cy.xpath(ADA_LOCATORS.cutpointTab).click();
  }

  static clickOnStartCutpointOutlierAnalysis() {
    cy.contains("button", "New Screening Cutpoint Analysis").scrollToElement();
    cy.contains("button", "New Screening Cutpoint Analysis").click();

    cy.xpath(ADA_LOCATORS.parametric).should("be.visible");
  }

  static clickOnLogTramsform() {
    cy.contains("button", "Log Transform").scrollToElement().click();
    Ada.awaitCutpointLoading();
  }

  static acceptOfLogTransform() {
    cy.get("[data-cy=accept-log-transformed-btn]").scrollToElement().click();
    Ada.awaitCutpointLoading();
  }

  static selectTemplateForReuseSCPDataForCCP(templateNumber) {
    if (templateNumber === 1) {
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).scrollToElement();
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).should("be.visible");
      cy.selectDropdownOption(SCREENING_CUTPOINT_LOCATORS.selectTemplate, "Template 1");
      cy.get("#plate").should("exist");
    }
    if (templateNumber === 2) {
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).scrollToElement();
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).should("be.visible");
      cy.selectDropdownOption(SCREENING_CUTPOINT_LOCATORS.selectTemplate, "Template 2");
      cy.get("#plate").should("exist");
    }
    if (templateNumber === 3) {
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).scrollToElement();
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).should("be.visible");
      cy.selectDropdownOption(SCREENING_CUTPOINT_LOCATORS.selectTemplate, "Template 3");
      cy.get("#plate").should("exist");
    }
  }

  static importCsvFileforPlateForReuseSCPDataForCCP(plateNumber, dataset) {
    const filePath = FixtureDataService.findFixtureDataByKey(
      `U_screening_d${dataset}_plate${plateNumber}_path_scp`
    );
    const fileName = FixtureDataService.findFixtureDataByKey(
      `U_screening_d${dataset}_plate${plateNumber}_file_name_scp`
    );

    cy.importPlateDataCSV(filePath, fileName);
  }

  static performAnalyticalOutlierAnalysis() {
    this.goToScreeningCutpoint();
    Ada.goToAnalyticalOutlierTab();
    Ada.assertAnalyticalOutlier('scp');
    Ada.acceptAnalyticalOutlier();
  }

  static performBiologicalOutlierAnalysis() {
    this.goToScreeningCutpoint();
    Ada.goToBiologicalOutlierTab();
    Ada.assertBiologicalOutlier('scp');
    Ada.acceptBiologicalOutlier();
  }

  static assertSCPResult() {
    cy.get(ADA_LOCATORS.cutpointResult).then($el => {
      const expectedValue = FixtureDataService.findFixtureDataByKey('U_scp_result');
      const actualValue = $el.text().replace("%", '');

      cy.assertValueWithinTolerance(actualValue, expectedValue);
    });
  }
}

export default ScreeningCutpoint;
