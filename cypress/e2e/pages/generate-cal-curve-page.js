import { find } from "lodash";
import GENERATE_CAL_CURVE_LOCATORS from "../locators/generate-cal-curve-locators.json";


class GenerateCalCurve {

  static goToCalCurveAndQC() {
    cy.xpath(GENERATE_CAL_CURVE_LOCATORS.calCurveAndQC).navigate();
    cy.xpath(GENERATE_CAL_CURVE_LOCATORS.startDataExtrapolationBtn).should("be.visible");
  }

  static startDataExtrapolation() {
    cy.xpath(GENERATE_CAL_CURVE_LOCATORS.startDataExtrapolationBtn).click();
    cy.xpath(GENERATE_CAL_CURVE_LOCATORS.checkRegressionType).invoke('val')
      .should('eq', '4p');
    cy.xpath(GENERATE_CAL_CURVE_LOCATORS.checkWeight).invoke('val')
      .should('eq', 'general');
    cy.xpath(GENERATE_CAL_CURVE_LOCATORS.generateRegressionCurve).should("be.visible");

  }

  static clickOnGenerateRegressionCurve() {
    cy.xpath(GENERATE_CAL_CURVE_LOCATORS.generateRegressionCurve).scrollIntoView().click();
    cy.get("canvas").should("be.visible");
  }

  static acceptCurve() {
    cy.xpath(GENERATE_CAL_CURVE_LOCATORS.acceptCurveBtn).scrollIntoView().click();
    cy.xpath(GENERATE_CAL_CURVE_LOCATORS.Hpc).should("be.visible");
  }

  static clickNext() {
    cy.clickOnNextStepBtn();
    cy.xpath(GENERATE_CAL_CURVE_LOCATORS.preAnalysisCurveTable).should("be.visible");
  }

  static saveCurve() {
    cy.clickSaveBtn();
    cy.provideEsign();
  }

  static acceptResult() {
    cy.clickAcceptBtn();
    cy.confirmNotification();
    cy.provideEsign();
  }

  static generateCalibrationCurveFullFlow(aegyrisModule, testParameter, plateNumber) {
    this.goToCalCurveAndQC();
    this.startDataExtrapolation();
    this.clickOnGenerateRegressionCurve();
    this.assertCalResults(aegyrisModule, testParameter, plateNumber);
    this.acceptCurve();
    this.assertQCResults(aegyrisModule, testParameter, plateNumber);
    this.clickNext();
    this.saveCurve();
    this.acceptResult();
  }

  static assertCalResults(aegyrisModule, testParameter, plateNumber) {
    this.readExpectedCalResultsFile(aegyrisModule, testParameter, plateNumber).then(expectedData => {
      cy.get(GENERATE_CAL_CURVE_LOCATORS.calCurveResultsTable).children().each($row => {

        const calID = $row.find(GENERATE_CAL_CURVE_LOCATORS.calID).text();
        const expectedDatum = find(expectedData, datum => datum.id === calID);

        if (expectedDatum) {
          cy.assertDataWithinRow(GENERATE_CAL_CURVE_LOCATORS.calMeanOD, expectedDatum.meanOD, $row);
          cy.assertDataWithinRow(GENERATE_CAL_CURVE_LOCATORS.calCV, expectedDatum.cv, $row);
          cy.assertDataWithinRow(GENERATE_CAL_CURVE_LOCATORS.calMeanConc, expectedDatum.meanConc, $row);
          cy.assertDataWithinRow(GENERATE_CAL_CURVE_LOCATORS.calBias, expectedDatum.bias, $row);
        }
      });
    });
  }

  static assertQCResults(aegyrisModule, testParameter, plateNumber) {
    this.readExpectQCResultsFile(aegyrisModule, testParameter, plateNumber).then(expectedData => {
      cy.get(GENERATE_CAL_CURVE_LOCATORS.qualityControlResultsDiv).each($table => {
        cy.wrap($table).find(GENERATE_CAL_CURVE_LOCATORS.qualityControlResultsTable).children().each($row => {

          const qcID = $row.find(GENERATE_CAL_CURVE_LOCATORS.qcID).text();
          const expectedDatum = find(expectedData, datum => datum.id === qcID);

          if (expectedDatum) {
            cy.assertDataWithinRow(GENERATE_CAL_CURVE_LOCATORS.qcMeanOD, expectedDatum.meanOD, $row);
            cy.assertDataWithinRow(GENERATE_CAL_CURVE_LOCATORS.qcCV, expectedDatum.cv, $row);
            cy.assertDataWithinRow(GENERATE_CAL_CURVE_LOCATORS.qcMeanConc, expectedDatum.meanConc, $row);
            cy.assertDataWithinRow(GENERATE_CAL_CURVE_LOCATORS.qcBias, expectedDatum.bias, $row);
          }
        });
      });
    });
  }

  static readExpectedCalResultsFile(aegyrisModule, testParameter, plateNumber) {
    return cy.readFixtureCSV(`${aegyrisModule} Data Files/Expected Values/Cal Curves/cal_${testParameter}_d1_p${plateNumber}.csv`);
  }

  static readExpectQCResultsFile(aegyrisModule, testParameter, plateNumber) {
    return cy.readFixtureCSV(`${aegyrisModule} Data Files/Expected Values/Cal Curves/qc_${testParameter}_d1_p${plateNumber}.csv`);
  }
}

export default GenerateCalCurve;
