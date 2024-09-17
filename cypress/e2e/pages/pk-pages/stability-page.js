import { isEmpty } from "lodash";
import STABILITY_LOCATORS from "../../locators/pk-locators/stability-locators.json";
import FixtureDataService from "../../services/fixture-data-service";

class Stability {

  static goToStabilityFromNavBar() {
    cy.xpath(STABILITY_LOCATORS.stabilityTab).navigate();
  }

  static importXlsxForStability(plateNumber, dataset) {
    const fileName = FixtureDataService.findFixtureDataByKey(
      `U_stability_d${dataset}_p${plateNumber}_file_name`
    );
    cy.get("modal-container, bs-modal-backdrop").should("not.exist");
    cy.clickOnImportDataButton();
    cy.xpath("//div[@class='modal-content']").should("be.visible");
    cy.importPlateDataXlsx(fileName);
    cy.xpath("//div[@class='modal-content']").should("not.exist");
  }

  static goToStabilityTest() {
    cy.xpath(STABILITY_LOCATORS.stabilityTest).navigate();
  }

  static addStabilityTestResultAndSaveResultForEachPlate() {
    const addTestButtonLocators = [
      STABILITY_LOCATORS.fTStabilityTestBtn,
      STABILITY_LOCATORS.sTStabilityTestBtn,
      STABILITY_LOCATORS.lTStabilityTestBtn
    ];

    addTestButtonLocators.forEach((locator, index) => {
      cy.xpath(locator).click();
      this.assertStabilityResults(index + 1);
      cy.clickSaveBtn();
      cy.provideEsign();
    });
  }

  static assertStabilityResults(plateNumber) {
    cy.get(STABILITY_LOCATORS.stabilityTypeTitle).should('be.visible').click();

    this.readExpectedResultsFile(plateNumber).then(expectedData => {
      let firstDataRowLength;

      cy.get(STABILITY_LOCATORS.stabilityResultsGTable).children().each(($row, rowIndex) => {

        // skip header rows
        if (rowIndex < 2) return;


        if (rowIndex === 2) {
          firstDataRowLength = $row.children().length;
        }

        cy.wrap($row).children().each(($col, index, list) => {
          const colData = $col.text().replace(/[%,]/g, '');

          if (!isEmpty(colData) && !isNaN(Number(colData))) {
            const colIndex = list.length === firstDataRowLength.length ? index : firstDataRowLength - list.length + index;

            cy.assertValueWithinTolerance(colData, expectedData[rowIndex][colIndex]);
          }
        });
      });
    });
  }

  static readExpectedResultsFile(plateNumber) {
    return cy.fixture(`PK Data Files/Expected Values/Stability/d1_p${plateNumber}.csv`).then(rawCSV => {
      const rows = rawCSV.split('\n');

      return rows.map(row => row.split(','));
    });
  }

}

export default Stability;
