import { find } from "lodash";
import ACCURACY_LOCATORS from "../../locators/pk-locators/accuracy-locators.json";
import FixtureDataService from "../../services/fixture-data-service";

class Accuracy {
  static goToAccuracyFromNavBar() {
    cy.xpath(ACCURACY_LOCATORS.accuracyPrecisionTab).navigate();
  }

  static importXlsxForAccuracy(plateNumber, dataset) {
    const fileName = FixtureDataService.findFixtureDataByKey(
      `U_AP_d${dataset}_p${plateNumber}_file_name`
    );
    cy.get("modal-container, bs-modal-backdrop").should("not.exist");
    cy.clickOnImportDataButton();
    cy.xpath("//div[@class='modal-content']").should("be.visible");
    cy.importPlateDataXlsx(fileName);
      cy.xpath("//div[@class='modal-content']").should("not.exist");
  }

  static goToTotalErrorTestTab() {
    cy.xpath(ACCURACY_LOCATORS.totalErrorTest).navigate();
    cy.xpath(ACCURACY_LOCATORS.addTotalErrorTest).should("be.visible");
  }

  static clickOnAddTotalErrorTest() {
    cy.xpath(ACCURACY_LOCATORS.addTotalErrorTest).click();
    cy.get('input[type="checkbox"]').scrollToElement();

  }

  static checkAllPlates() {
    cy.get('input[type="checkbox"]').check();
    cy.get('input[type="checkbox"]').should("be.checked");

  }

  static calculateTotalError() {
    cy.xpath(ACCURACY_LOCATORS.calculateTotalErrorTest).click();
    cy.get(ACCURACY_LOCATORS.resultName).should("be.visible");
  }

  static saveTotalErrorResult() {
    const resultName = FixtureDataService.findFixtureDataByKey("U_ap_total_error_result_name");
    const resultComment = FixtureDataService.findFixtureDataByKey("U_Esign_comment");

    cy.get(ACCURACY_LOCATORS.resultName).type(resultName);
    cy.get(ACCURACY_LOCATORS.resultComment).type(resultComment);
    cy.screenshot({capture: "fullPage"});

    cy.clickSaveBtn();

  }

  static approveResult() {
    cy.xpath(ACCURACY_LOCATORS.approveIcon).click();
  }

  static goToSensitivityTestTab() {
    cy.xpath(ACCURACY_LOCATORS.sensitivityTest).navigate();

  }

  static assertIntraAssayIntraCVTotalError() {
    const termsToCheck = [
      "Inter-Assay Bias",
      "Inter-Assay CV",
      "Total Error"
    ];

    // Iterate over each term and assert its corresponding value
    termsToCheck.forEach(term => {
      cy.xpath(`//td[normalize-space()='${term}']`)
        .parents('tr')
        .find('td:eq(3)') // This selects the fourth td element in the row
        .invoke('text')
        .should('eq', 'Pass');
    });
  }

  static goToPrecisionAndAcceptanceCriteriaTestTab() {
    cy.xpath(ACCURACY_LOCATORS.precisionAndAcceptanceCriteriaTest).click();
  }

  static acceptTableData() {
    cy.xpath(ACCURACY_LOCATORS.acceptPrecisionAndAcceptanceCriteriaTest).click();
    cy.provideEsign();
  }

  static assertPrecisionAndAcceptanceCriteriaTest() {
    cy.readFixtureCSV(`PK Data Files/Expected Values/Accuracy Precision/precision_and_acceptance_criteria_test.csv`).then(expectedData => {
      
    cy.get(ACCURACY_LOCATORS.precisionAndAcceptanceCriteriaTestTable).children().each($row => {
 
        const name = $row.find(ACCURACY_LOCATORS.name).text();
        const expectedDatum = find(expectedData, datum => datum.name === name);

        if (expectedDatum) {
          this.assertDataPrecisionAndAcceptanceCriteriaTest(ACCURACY_LOCATORS.intraAssayBias, expectedDatum.intraAssayBias, $row);
          this.assertDataPrecisionAndAcceptanceCriteriaTest(ACCURACY_LOCATORS.interAssayBias, expectedDatum.interAssayBias, $row);
          this.assertDataPrecisionAndAcceptanceCriteriaTest(ACCURACY_LOCATORS.intraAssayCv, expectedDatum.intraAssayCv, $row);
          this.assertDataPrecisionAndAcceptanceCriteriaTest(ACCURACY_LOCATORS.interAssayCv, expectedDatum.interAssayCv, $row);
          this.assertDataPrecisionAndAcceptanceCriteriaTest(ACCURACY_LOCATORS.totalError, expectedDatum.totalError, $row);
        }
      });
    });
  }

  static assertDataPrecisionAndAcceptanceCriteriaTest(locator, expectedValue, $row) {
    const actualRowValue = $row.find(locator).text();
    const actualValue = actualRowValue.split('|')[0]; // actual value from table contains reference % and has to be excluded
    cy.assertValueWithinTolerance(actualValue, expectedValue);
  }  

}

export default Accuracy;
