import DILUTIONAL_HOOK_LOCATORS from "../../locators/pk-locators/dilutional-hook-locators.json";
import FixtureDataService from "../../services/fixture-data-service";

class DilutionalIntegretyAndHookEffect {

  static goToHookEffectFromNavBar() {
    cy.xpath(DILUTIONAL_HOOK_LOCATORS.dilutionalIntegrityAndHookEffect).navigate();
  }

  static importXlsxForDilutionalHook(plateNumber, dataset) {
    const fileName = FixtureDataService.findFixtureDataByKey(
      `U_dilutional_hook_d${dataset}_p${plateNumber}_file_name`
    );
    cy.get("modal-container, bs-modal-backdrop").should("not.exist");
    cy.clickOnImportDataButton();
    cy.xpath("//div[@class='modal-content']").should("be.visible");
    cy.importPlateDataXlsx(fileName);
    cy.xpath("//div[@class='modal-content']").should("not.exist");
  }

  static goToDilutionalLinearityTest() {
    cy.xpath(DILUTIONAL_HOOK_LOCATORS.dilutionalLinearityTest).navigate();
    cy.xpath(DILUTIONAL_HOOK_LOCATORS.addNewDL).should("be.visible");
  }

  static clickOnAddNewDilutionalLinearityTest() {
    cy.xpath(DILUTIONAL_HOOK_LOCATORS.addNewDL).click();
  }

  static saveDilutionalLinearityTestResult() {
    cy.clickSaveBtn();
    cy.provideEsign();
  }

  static goToPlate1FromDilutionalTest() {
    cy.xpath(DILUTIONAL_HOOK_LOCATORS.d1p1).should("be.visible").click();
    cy.get("table:nth-child(3) tr:nth-child(1)").should("be.visible");
  }

  static assertTotalSampleCountForDilutionalTest() {
    cy.get("table:nth-child(3) tr:nth-child(1) td:nth-child(2)").invoke('text').then(actualValue => {
      cy.addTestContext(`Actual value: ${actualValue}`);
      this.assertDilutionalTestSampleCount(actualValue, "dilutional_hook_test_total_samples");
    });
  }

  static assertTotalPassedSampleCountForDilutionalTest() {
    cy.get("table:nth-child(3) tr:nth-child(2) td:nth-child(2)").invoke('text').then(actualValue => {
      cy.addTestContext(`Actual value: ${actualValue}`);
      this.assertDilutionalTestSampleCount(actualValue, "dilutional_hook_test_passed_samples");
      this.assertFinalResultForDilutionalTest(actualValue);
    });
  }

  static assertDilutionalTestSampleCount(value, type) {
    const actualValue = parseInt(value, 10);
    const expectedValueString = FixtureDataService.findFixtureDataByKey(`U_${type}`);
    const expectedValue = parseInt(expectedValueString, 10);
    cy.addTestContext(`actualValue is ${actualValue}`);
    cy.addTestContext(`expectedValueString is ${expectedValueString}`);
    cy.addTestContext(`expectedValue is ${expectedValue}`);

    // Assertion
    expect(actualValue).to.equal(expectedValue);
    cy.screenshot({capture: "fullPage"});
  }

  static assertFinalResultForDilutionalTest(sampleCount) {
    cy.get("table:nth-child(3) tr:nth-child(5) td:nth-child(2)").invoke('text').then(actualValue => {
      cy.addTestContext(`Actual value: ${actualValue}`);
      this.assertDilutionalResultBasedOnPassedSampleCount(sampleCount, actualValue, "dilutional_hook_test_final_result");
    });
  }

  static assertDilutionalResultBasedOnPassedSampleCount(sampleCount, value, type) {
    // sample count check
    const actualSampleCount = parseInt(sampleCount, 10);
    const expectedValueString = FixtureDataService.findFixtureDataByKey("U_dilutional_hook_test_passed_samples");
    const expectedSampleCount = parseInt(expectedValueString, 10);

    // result pass/fail check
    const actualValue = value.trim();
    const expectedValue = FixtureDataService.findFixtureDataByKey(`U_${type}`).trim();

    cy.addTestContext(`actualSampleCount is ${actualSampleCount}`);
    cy.addTestContext(`actualValue is ${actualValue}`);
    cy.addTestContext(`expectedValue is ${expectedValue}`);

    // Assertion
    expect(actualSampleCount).to.equal(expectedSampleCount);
    expect(actualValue).to.equal(expectedValue);
    cy.screenshot({capture: "fullPage"});

    cy.clickCloseBtn();
  }
}

export default DilutionalIntegretyAndHookEffect;

