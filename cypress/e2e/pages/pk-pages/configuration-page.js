import CONFIGURATION_LOCATORS from "../../locators/study-configuration-locators.json";
import FixtureDataService from "../../services/fixture-data-service";
import Configuration from "../common-pages/configuration";

class PKConfiguration extends Configuration {
  static goToCalibrationCurveFromConfiguration() {
    cy.xpath(CONFIGURATION_LOCATORS.calibrationCurveWithinConfig).navigate();
  }

  static checkCalibrationCurveParameters() {
    const regressionType = FixtureDataService.findFixtureDataByKey("Regression_Type");
    const weight = FixtureDataService.findFixtureDataByKey("Weight");
    const calibrator = FixtureDataService.findFixtureDataByKey("Calibrator(s)");
    const parcentage = FixtureDataService.findFixtureDataByKey(
      "Parcentage_of_non_zero_passing_calibrator(s)"
    );

    cy.addTestContext(regressionType);

    cy.get(CONFIGURATION_LOCATORS.regression)
      .should("be.visible")
      .invoke("val")
      .should("eq", regressionType);

    cy.get(CONFIGURATION_LOCATORS.weight)
      .should("be.visible")
      .invoke("val")
      .should("eq", weight);

    cy.get(CONFIGURATION_LOCATORS.calibrator)
      .should("be.visible")
      .should("have.value", calibrator);

    cy.xpath(CONFIGURATION_LOCATORS.percentageOfNonZeroPassingCalibrator)
      .should("be.visible")
      .should("have.value", parcentage);
  }

  static takeScreenshotOfCalibrators() {
    cy.takeCustomScreenshot(
      '//th[normalize-space()="ID"]',
      "//tr[15]//td[5]//input[1]",
      "10_Calibrators_Screenshot"
    );
  }

  static goToQCSamples() {
    cy.xpath(CONFIGURATION_LOCATORS.qcSamples).navigate();
  }

  static takeScreenshotOfQCSamples() {
    cy.takeCustomScreenshot(
      '//th[normalize-space()="ID"]',
      "//tr[8]//td[4]",
      "QC_Samples_Screenshot"
    );
  }

  static goToAccuracy() {
    cy.xpath(CONFIGURATION_LOCATORS.accuracy).navigate();
  }

  static takeScreenshotOfAccuracy() {
    cy.takeCustomScreenshot(
      "//th[normalize-space()='Include standard curve acceptance criteria']",
      "//tr[9]/td[8]",
      "Accuracy_Table_Screenshot"
    );
  }

  static goToParameters() {
    cy.xpath(CONFIGURATION_LOCATORS.parameters).navigate();
  }

  static goToSensitivityFromParameters() {
    cy.xpath(CONFIGURATION_LOCATORS.sensitivity).navigate();
  }

  static takeScreenshotOfSensitivity() {
    cy.takeCustomScreenshot(
      "//th[normalize-space()='Inter-Assay Precision']",
      "//tr[1]//td[1]//input[1]",
      "Sensitivity_Table_Screenshot"
    );
  }

  static goToSelectivityFromParameters() {
    cy.xpath(CONFIGURATION_LOCATORS.selectivity).navigate();
  }

  static takeScreenshotOfSelectivity() {
    cy.takeCustomScreenshot(
      "//th[normalize-space()='Type']",
      "//tr[4]/td[7]/textarea[1]",
      "Selectivity_Table_Screenshot"
    );
  }

  static goToDilutionalFromParameters() {
    cy.xpath(CONFIGURATION_LOCATORS.dilutional).navigate();
  }

  static takeScreenshotOfDilutional() {
    cy.takeCustomScreenshot(
      "//th[1]",
      "//tr[7]/td[8]",
      "Dilutional_Table_Screenshot"
    );
  }
}

export default PKConfiguration;
