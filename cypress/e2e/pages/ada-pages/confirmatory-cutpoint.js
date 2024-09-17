import ADA_LOCATORS from '../../locators/ada-locators/ada-locators.json';
import CONFIRMATORY_CUTPOINT_LOCATORS from "../../locators/ada-locators/confimatory-cutpoint-locators.json";
import FixtureDataService from '../../services/fixture-data-service';
import Ada from './ada';

class ConfirmatoryCutpoint {
  static goToConfirmatoryCutpoint() {
    cy.xpath(CONFIRMATORY_CUTPOINT_LOCATORS.confirmatoryCutpointFromNav).navigate();
  }

  static importCsvFileforPlateForConfirmatory(plateNumber, dataset) {
    const filePath = FixtureDataService.findFixtureDataByKey(
      `U_confirmatory_d${dataset}_plate${plateNumber}_path`
    );
    const fileName = FixtureDataService.findFixtureDataByKey(
      `U_confirmatory_d${dataset}_plate${plateNumber}_file_name`
    );

      cy.importPlateDataCSV(filePath, fileName);
  }

  static goToCutpointTab() {
    cy.xpath(ADA_LOCATORS.cutpointTab).scrollIntoView().click();
    cy.contains("button", "New Confirmatory Cutpoint Analysis").should("be.visible");
  }

  static startCutpointAnalysis() {
    this.goToCutpointTab();
    cy.contains("button", "New Confirmatory Cutpoint Analysis").click();
  }

  static clickOnTestArticle() {
    cy.xpath(CONFIRMATORY_CUTPOINT_LOCATORS.TestArticle).click();
  }

  static checkIncludeNegativePercentInhibition() {
    cy.get(CONFIRMATORY_CUTPOINT_LOCATORS.includeNegativeInhChecbox)
      .scrollToElement()
      .click()
      .should('be.checked');
  }

  static acceptSwTest() {
    cy.get(CONFIRMATORY_CUTPOINT_LOCATORS.swStep).should('be.visible');
    cy.contains("button", "Accept").scrollToElement().click();
    cy.contains("button", "Unaccept").should("be.visible");
  }

  static proceedToDescriptiveStatistics() {
    cy.get(CONFIRMATORY_CUTPOINT_LOCATORS.statStep).should('be.visible');
    cy.clickNextBtn();
  }

  static proceedToCutpointAnalysis() {
    cy.get(CONFIRMATORY_CUTPOINT_LOCATORS.testStep).should('be.visible');
    this.assertCCPResult();
    cy.clickNextBtn();
  }

  static assertCCPResult() {
    cy.get(ADA_LOCATORS.cutpointResult).then($el => {
      const expectedValue = FixtureDataService.findFixtureDataByKey('U_ccp_result');
      const actualValue = $el.text().replace("%", '');

      cy.assertValueWithinTolerance(actualValue, expectedValue);
    });
  }

  static performAnalyticalOutlierAnalysis() {
    this.goToConfirmatoryCutpoint();
    Ada.goToAnalyticalOutlierTab();
    Ada.assertAnalyticalOutlier('ccp');
    Ada.acceptAnalyticalOutlier();
  }

  static performBiologicalOutlierAnalysis() {
    this.goToConfirmatoryCutpoint();
    Ada.goToBiologicalOutlierTab();
    Ada.assertBiologicalOutlier('ccp');
    Ada.acceptBiologicalOutlier();
  }
}

export default ConfirmatoryCutpoint;
