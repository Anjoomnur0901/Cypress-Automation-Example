import { find } from 'lodash';
import SAMPLE_RESULT_LOCATORS from '../../locators/sa-locators/sample-result-locators.json';

class SampleResult {
  static acceptAndAssertSampleResults(linkedStudyType, plateNumber, testParameter) {
    this.navigateToSampleResult();
    this.acceptSampleResult();
    this.assertSampleResult(linkedStudyType, testParameter, plateNumber);
  }

  static navigateToSampleResult() {
    cy.xpath(SAMPLE_RESULT_LOCATORS.sampleResultTab).navigate();
  }

  static readExpectedResultsFile(linkedStudyType, plateNumber, testParameter) {
    return cy.readFixtureCSV(`SA-${linkedStudyType} Data Files/Expected Values/Sample Results/${testParameter}_d1_p${plateNumber}.csv`);
  }

  static acceptSampleResult() {
    cy.xpath(SAMPLE_RESULT_LOCATORS.acceptResult).scrollToElement().click();
    cy.provideEsign();

    cy.screenshot({capture: 'fullPage'});
  }

  static assertSampleResult(linkedStudyType, testParameter, plateNumber) {
    this.readExpectedResultsFile(linkedStudyType, testParameter, plateNumber).then(expectedData => {
      cy.get(SAMPLE_RESULT_LOCATORS.sampleResultTable)
        .children()
        .each(($row, index) => {
          // skip header
          if (index < 1) return;

          const sampleId = $row.find(SAMPLE_RESULT_LOCATORS.sampleId).text();
          const expectedDatum = find(expectedData, datum => datum.id === sampleId);
          const resultWithoutComma = expectedDatum.result.replace(',', '');
          const isStringExpectedResult = isNaN(Number(resultWithoutComma));

          if (expectedDatum) {
            cy.assertDataWithinRow(SAMPLE_RESULT_LOCATORS.meanOd, expectedDatum.meanOd, $row);
            cy.assertDataWithinRow(SAMPLE_RESULT_LOCATORS.cv, expectedDatum.cv, $row);
            cy.assertDataWithinRow(SAMPLE_RESULT_LOCATORS.meanCalConc, expectedDatum.meanCalConc, $row);
            cy.assertDataWithinRow(SAMPLE_RESULT_LOCATORS.df, expectedDatum.df, $row);
            cy.assertDataWithinRow(SAMPLE_RESULT_LOCATORS.result, expectedDatum.result, $row, isStringExpectedResult);
            cy.assertDataWithinRow(SAMPLE_RESULT_LOCATORS.status, expectedDatum.status, $row, true);
          }
        });
    });
  }
}

export default SampleResult;
