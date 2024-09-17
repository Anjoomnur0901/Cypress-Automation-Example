import CALIBRATION_CURVE_LOCATORS from "../../locators/pk-locators/calibration-curve-locators.json";
import FixtureDataService from "../../services/fixture-data-service";

class CalibrationCurvePage {
  static goToCalibrationCurveFromNavBar() {
    cy.xpath(CALIBRATION_CURVE_LOCATORS.calibrationCurveTab).navigate();
  }

  static importXlsxForCalibrationCurve(plateNumber, dataset) {
    const fileName = FixtureDataService.findFixtureDataByKey(`U_calibration_curve_d${dataset}_p${plateNumber}_file_name`);
    cy.get("modal-container, bs-modal-backdrop").should("not.exist");
    cy.clickOnImportDataButton();
    cy.xpath("//div[@class='modal-content']").should("be.visible");
    cy.importPlateDataXlsx(fileName);
    cy.xpath("//div[@class='modal-content']").should("not.exist");
  }

  static goToCalibrationCurvesTab() {
    cy.xpath(CALIBRATION_CURVE_LOCATORS.calcurves).click();
    cy.xpath(CALIBRATION_CURVE_LOCATORS.addCalibrationCurveBtn).should(
      "be.visible"
    );
  }

  static clickOnAddCalibrationCurve() {
    cy.xpath(CALIBRATION_CURVE_LOCATORS.addCalibrationCurveBtn).click();
    cy.xpath("//table[@class='table table-bordered']").should("be.visible");
  }

  static clickOnAddCurve() {
    cy.xpath(CALIBRATION_CURVE_LOCATORS.addCurveBtn).click();
    cy.xpath(CALIBRATION_CURVE_LOCATORS.WeightMethod).should("be.visible");
  }

  static chooseNoWeight() {
    cy.selectDropdownOption(
      CALIBRATION_CURVE_LOCATORS.WeightMethod,
      "No Weight"
    );
  }

  static clickOnGenerate() {
    cy.xpath(CALIBRATION_CURVE_LOCATORS.GenerateBtn)
      .should("be.visible")
      .click();
    cy.get("canvas").should("be.visible");
  }

  static acceptCurve() {
    cy.get(CALIBRATION_CURVE_LOCATORS.acceptCurveBtn).scrollToElement().click();
    cy.contains("button", "Unaccept").should("be.visible");
  }

  static saveCurve() {
    cy.xpath(CALIBRATION_CURVE_LOCATORS.proceedToNextBtn).click();
    cy.clickSaveBtn();
  }

  static generateCalibrationCurve() {
    this.goToCalibrationCurvesTab();
    this.clickOnAddCalibrationCurve();
    this.clickOnAddCurve();
    this.chooseNoWeight();
    this.clickOnGenerate();
    this.acceptCurve();
    this.saveCurve();
  }

  static assertCalibrationCurveGoodness() {
    cy.get("table tr:nth-child(2) td:nth-child(4)").invoke('text').then(actualValue => {
      const expectedValue = FixtureDataService.findFixtureDataByKey('U_calibration_curve_goodness');
      cy.assertValueWithinTolerance(actualValue, expectedValue);
    });
  }

  static acceptGoodness() {
    cy.clickAcceptBtn();
    cy.confirmNotification();
    cy.provideEsign();
  }
}

export default CalibrationCurvePage;
