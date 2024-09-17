import { find } from "lodash";
import SELECTIVITY_LOCATORS from "../../locators/pk-locators/selectivity-locators.json";
import FixtureDataService from "../../services/fixture-data-service";

class Selectivity {
  static goToSelectivityFromNavBar() {
    cy.xpath(SELECTIVITY_LOCATORS.selectivityTab).navigate();
  }

  static importXlsxForSelectivity(plateNumber, dataset) {
    const fileName = FixtureDataService.findFixtureDataByKey(
      `U_selectivity_d${dataset}_p${plateNumber}_file_name`
    );
    cy.get("modal-container, bs-modal-backdrop").should("not.exist");
    cy.clickOnImportDataButton();
    cy.xpath("//div[@class='modal-content']").should("be.visible");
    cy.importPlateDataXlsx(fileName);
    cy.xpath("//div[@class='modal-content']").should("not.exist");
  }

  static goToSelectivityTestTab() {
    cy.xpath(SELECTIVITY_LOCATORS.selectivityTest).navigate();
  }

  static clickOnAddNewSelectivityTestResult() {
    cy.xpath(SELECTIVITY_LOCATORS.addNewSelectivityTestResultBtn).click();
    cy.get(SELECTIVITY_LOCATORS.female).should("be.visible");
    cy.get(SELECTIVITY_LOCATORS.male).should("be.visible");
  }

  static saveSelectivityResult() {
    cy.clickSaveBtn();
    cy.provideEsign();
  }

  static goToPlate1FromSelectivityTest() {
    cy.xpath(SELECTIVITY_LOCATORS.d1p1).should("be.visible").click();
  }

  static expandFemaleSection() {
    cy.get('modal-container, bs-modal-backdrop').should('exist');
    cy.get(SELECTIVITY_LOCATORS.female).click();
  }

  static expandMaleSection() {
    cy.get('modal-container, bs-modal-backdrop').should('exist');
    cy.get(SELECTIVITY_LOCATORS.male).click(); // had to add force, otherwise it doesn't click
  }

  static assertOverAllTestResultForFemale() {
    cy.get("table tr:nth-child(12) td:nth-child(2)").invoke('text').then(actualValue => {
      this.assertOverAllSelectivityTest(actualValue, "overall_status", "female");
    });
  }

  static assertOverAllTestResultForMale() {
    cy.get("table tr:nth-child(12) td:nth-child(2)").invoke('text').then(actualValue => {
      this.assertOverAllSelectivityTest(actualValue, "overall_status", "male");
    });
  }

  static assertOverAllSelectivityTest(value, type, gender) {
    const actualValue = value.trim();
    const expectedValue = FixtureDataService.findFixtureDataByKey(`U_${type}_${gender}`).trim();

    cy.addTestContext(`expectedValue is ${expectedValue}`);
    cy.addTestContext(`actualValue is ${actualValue}`);

    expect(actualValue).to.equal(expectedValue);
    cy.screenshot({capture: "fullPage"});
    cy.clickCloseBtn();
  }

  static assertSelectivityResults() {
    this.getSpikeGroupsFromStudyConfiguration().then(spikeGroups => {
      spikeGroups.forEach((spikeGroup, index) => {
        cy.contains('th', spikeGroup).should('be.visible').within(() => {
          cy.contains('View Detail').click();
        });

        this.makeAssertions(spikeGroup, index);
      });
    });
  }

  static getSpikeGroupsFromStudyConfiguration() {
    const configFileName = FixtureDataService.findFixtureDataByKey("U_study_configuration_file_name");

    // add "0" group as it's a default group
    return cy.fixture(configFileName).then(configFile => ["0", ...configFile.spikeCriMap.map(spike => spike.qcCon)].sort());
  }

  static makeAssertions(spikeGroup, groupIndex) {
    cy.readFixtureCSV(`PK Data Files/Expected Values/Selectivity/selectivity_results_${spikeGroup}.csv`).then(expectedData => {
      cy.get(SELECTIVITY_LOCATORS.resultsTable).children().each($row => {
        const id = $row.find('td:first-child').text();
        const expectedDatum = find(expectedData, { id });

        if (expectedDatum) {
          if (spikeGroup !== "0") {
            this.assertMeanOD(expectedDatum.meanOD, $row, groupIndex);
          }
          this.assertCV(expectedDatum.cv, $row, groupIndex);
          this.assertBias(expectedDatum.bias, $row, groupIndex);
        }
      });
    });
  }

  static assertMeanOD(expectedValue, $row, groupIndex) {
    // collapse view has a column of 3, MeanOD is at the 2nd column
    const colIndex = 3 * groupIndex + 2;
    const actualValue = $row.find(`td:nth-child(${colIndex})`).text();

    cy.assertValueWithinTolerance(actualValue, expectedValue);
  }

  static assertCV(expectedValue, $row, groupIndex) {
    // collapse view has a column of 3, CV is at the 3rd column
    const colIndex = 3 * groupIndex + 3;
    const actualValue = $row.find(`td:nth-child(${colIndex})`).text();

    cy.assertValueWithinTolerance(actualValue, expectedValue);
  }

  static assertBias(expectedValue, $row, groupIndex) {
    // collapse view has a column of 3, Bias is at the 4th column
    const colIndex = 3 * groupIndex + 4;
    const actualValue = $row.find(`td:nth-child(${colIndex})`).text();

    cy.assertValueWithinTolerance(actualValue, expectedValue);
  }
}

export default Selectivity;

