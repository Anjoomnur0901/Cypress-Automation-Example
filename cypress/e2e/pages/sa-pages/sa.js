import { times } from 'lodash';
import COLUMN_LOCATORS from '../../locators/sa-locators/column-mapping-locators.json';
import SAMPLE_ANALYSIS_LOCATORS from '../../locators/sa-locators/sample-analysis-locators.json';
import STUDY_CONFIG_LOCATORS from '../../locators/study-configuration-locators';
import FixtureDataService from '../../services/fixture-data-service';

class SA {
  static mapColumnFromSampleManifestFile() {
    cy.selectDropdownOptionGet(COLUMN_LOCATORS.treatmentUserText1, 'Sample ID');
    cy.selectDropdownOptionGet(COLUMN_LOCATORS.timeText, 'Timestamp');
    cy.selectDropdownOptionGet(COLUMN_LOCATORS.visit, 'Extra Info');
    cy.selectDropdownOptionGet(COLUMN_LOCATORS.subject, 'Subject ID');
    cy.selectDropdownOptionGet(COLUMN_LOCATORS.tubeStatus, 'Tube Status');
    cy.screenshot();
    cy.contains("button", "Import").click();
  }

  static importManifestFile(linkedStudyType) {
    const location = linkedStudyType === "PK" ? "SA-PK" : "SA-ADA";
    const filePath = `${location} Data Files/Sample Manifest.xlsx`;

    cy.fixture(filePath, 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then(fileContent => {
        cy.xpath(STUDY_CONFIG_LOCATORS.configChooseFile).attachFile({
          fileContent,
          filePath,
          mimeType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          encoding: 'utf8'
        });
      });
    this.mapColumnFromSampleManifestFile();
  }


  static selectSamplesWellD3ToF4(){
    //D3 to F4
    cy.get('tr:nth-child(5) td:nth-child(4) div:nth-child(1)').scrollToElement().click({
      ctrlKey: true
    });

    cy.get('tr:nth-child(5) td:nth-child(5) div:nth-child(1)').scrollToElement().click({
      ctrlKey: true
    });
    cy.get('tr:nth-child(6) td:nth-child(4) div:nth-child(1)').scrollToElement().click({
      ctrlKey: true
    });
    cy.get('tr:nth-child(6) td:nth-child(5) div:nth-child(1)').scrollToElement().click({
      ctrlKey: true
    });

    cy.get('tr:nth-child(7) td:nth-child(4) div:nth-child(1)').scrollToElement().click({
      ctrlKey: true
    });

    cy.get('tr:nth-child(7) td:nth-child(5) div:nth-child(1)').scrollToElement().click({
      ctrlKey: true
    });
  }
  static goToSampleAnalysis() {
    cy.xpath(SAMPLE_ANALYSIS_LOCATORS.sampleAnalysisSideNav).parent().should($parent => {
      expect($parent).not.to.have.class('block');
    }).navigate();
  }

  static gotoSaResult() {
    cy.xpath(SAMPLE_ANALYSIS_LOCATORS.sampleResultSaLevel).scrollToElement().click();
  }

  static selectSamplesWellPlate1() {
    this.selectSamplesWellD3ToF4();

    //A5 to H6
    cy.selectWell(2,6);
    cy.selectWell(2,7);
    cy.selectWell(3,6);
    cy.selectWell(3,7);
    cy.selectWell(4,6);
    cy.selectWell(4,7);
    cy.selectWell(5,6);
    cy.selectWell(5,7);
    cy.selectWell(6,6);
    cy.selectWell(6,7);
    cy.selectWell(7,6);
    cy.selectWell(7,7);
    cy.selectWell(8,6);
    cy.selectWell(8,7);
    cy.selectWell(9,6);
    cy.selectWell(9,7);

    //A7 to H8
    //A
    cy.selectWell(2,8);
    cy.selectWell(2,9);
    //B
    cy.selectWell(3,8);
    cy.selectWell(3,9);


    //C
    cy.selectWell(4,8);
    cy.selectWell(4,9);
    //D
    cy.selectWell(5,8);
    cy.selectWell(5,9);

    //E
    cy.selectWell(6,8);
    cy.selectWell(6,9);
    //F
    cy.selectWell(7,8);
    cy.selectWell(7,9);
    //G
    cy.selectWell(8,8);
    cy.selectWell(8,9);
    //H
    cy.selectWell(9,8);
    cy.selectWell(9,9);

    //A9 to E10
    cy.selectWell(2,10);
    cy.selectWell(2,11);
    cy.selectWell(3,10);
    cy.selectWell(3,11);
    cy.selectWell(4,10);
    cy.selectWell(4,11);
    cy.selectWell(5,10);
    cy.selectWell(5,11);
    cy.selectWell(6,10);
    cy.selectWell(6,11);
    this.clickSampleTypeRadioBtn();
  }

  static assign() {
    cy.xpath(SAMPLE_ANALYSIS_LOCATORS.assignBtn).should('be.visible').click();
  }

  static selectSamplesWellp2() {
    this.selectSamplesWellD3ToF4();

    //A5 to H6
    cy.selectWell(2,6);
    cy.selectWell(2,7);
    cy.selectWell(3,6);
    cy.selectWell(3,7);
    cy.selectWell(4,6);
    cy.selectWell(4,7);
    cy.selectWell(5,6);
    cy.selectWell(5,7);
    cy.selectWell(6,6);
    cy.selectWell(6,7);
    cy.selectWell(7,6);
    cy.selectWell(7,7);
    cy.selectWell(8,6);
    cy.selectWell(8,7);
    cy.selectWell(9,6);
    cy.selectWell(9,7);

    //A7 to H8
    //A
    cy.selectWell(2,8);
    cy.selectWell(2,9);
    //B
    cy.selectWell(3,8);
    cy.selectWell(3,9);


    //C
    cy.selectWell(4,8);
    cy.selectWell(4,9);
    //D
    cy.selectWell(5,8);
    cy.selectWell(5,9);

    //E
    cy.selectWell(6,8);
    cy.selectWell(6,9);
    //F
    cy.selectWell(7,8);
    cy.selectWell(7,9);
    //G
    cy.selectWell(8,8);
    cy.selectWell(8,9);
    //H
    cy.selectWell(9,8);
    cy.selectWell(9,9);
    //A9 to C10
    cy.selectWell(2,10);
    cy.selectWell(2,11);
    cy.selectWell(3,10);
    cy.selectWell(3,11);
    cy.selectWell(4,10);
    cy.selectWell(4,11);

    this.clickSampleTypeRadioBtn();
  }

  static selectSamplesWellp3() {
    this.selectSamplesWellD3ToF4();
    //A5 to H6
    cy.selectWell(2,6);
    cy.selectWell(2,7);

    cy.selectWell(3,6);
    cy.selectWell(3,7);
    cy.selectWell(4,6);
    cy.selectWell(4,7);
    cy.selectWell(5,6);
    cy.selectWell(5,7);
    cy.selectWell(6,6);
    cy.selectWell(6,7);
    cy.selectWell(7,6);
    cy.selectWell(7,7);
    cy.selectWell(8,6);
    cy.selectWell(8,7);
    cy.selectWell(9,6);
    cy.selectWell(9,7);
    //A7 to H8

    //A7 to H8
    //A
    cy.selectWell(2,8);
    cy.selectWell(2,9);

    //B
    cy.selectWell(3,8);
    cy.selectWell(3,9);


    //C
    cy.selectWell(4,8);
    cy.selectWell(4,9);

    //D
    cy.selectWell(5,8);
    cy.selectWell(5,9);

    //E
    cy.selectWell(6,8);
    cy.selectWell(6,9);

    //F
    cy.selectWell(7,8);
    cy.selectWell(7,9);

    //G
    cy.selectWell(8,8);
    cy.selectWell(8,9);

    //H
    cy.selectWell(9,8);
    cy.selectWell(9,9);

    //A9 to C10
    //A9 to C10
    cy.selectWell(2,10);
    cy.selectWell(2,11);

    cy.selectWell(3,10);
    cy.selectWell(3,11);
    cy.selectWell(4,10);
    cy.selectWell(4,11);

    this.clickSampleTypeRadioBtn();
  }

  static selectSamplesWellPlate4and5() {
    this.selectSamplesWellD3ToF4();
    //A5 to H6
    cy.selectWell(2,6);
    cy.selectWell(2,7);
    cy.selectWell(3,6);
    cy.selectWell(3,7);
    cy.selectWell(4,6);
    cy.selectWell(4,7);

    cy.selectWell(5,6);
    cy.selectWell(5,7);

    cy.selectWell(6,6);
    cy.selectWell(6,7);
    cy.selectWell(7,6);
    cy.selectWell(7,7);

    cy.selectWell(8,6);
    cy.selectWell(8,7);
    cy.selectWell(9,6);
    cy.selectWell(9,7);

    //A7 to H8
    //A
    cy.selectWell(2,8);
    cy.selectWell(2,9);

    //B
    cy.selectWell(3,8);
    cy.selectWell(3,9);

    //C
    cy.selectWell(4,8);
    cy.selectWell(4,9);

    //D
    cy.selectWell(5,8);
    cy.selectWell(5,9);

    //E
    cy.selectWell(6,8);
    cy.selectWell(6,9);
    //F
    cy.selectWell(7,8);
    cy.selectWell(7,9);

    this.clickSampleTypeRadioBtn();
  }

  static selectNotTestedSamples() {
    cy.get(':nth-child(2) > .ng-star-inserted > .btn').scrollToElement().click();
    cy.xpath(SAMPLE_ANALYSIS_LOCATORS.allCheck).should('be.visible').click();
    cy.xpath(SAMPLE_ANALYSIS_LOCATORS.notTested).should('be.visible').click();
    cy.xpath(SAMPLE_ANALYSIS_LOCATORS.applyFilter).should('be.visible').click();
    cy.clickOnAutoSelectBtn();
    cy.screenshot({capture: 'fullPage'});
  }

  static importXlsxForSampleAnalysis(plateNumber) {
    const fileName = FixtureDataService.findFixtureDataByKey(
      `U_PK_plate${plateNumber}_filename`
    );
    cy.importPlateDataXlsx(fileName);
  }

  static importDataReassay1() {
    const fileName = FixtureDataService.findFixtureDataByKey('U_reassay1');
    cy.importPlateDataXlsx(fileName);
  }

  static importDataReassay2() {
    const fileName = FixtureDataService.findFixtureDataByKey('U_reassay2');
    cy.importPlateDataXlsx(fileName);
  }

  static reanalysisPlateSelection() {
    this.selectSamplesWellD3ToF4();
    //A5 to B6
    cy.selectWell(2,6);
    cy.selectWell(2,7);

    cy.selectWell(3,6);
    cy.selectWell(3,7);
    this.clickSampleTypeRadioBtn();
  }

  static selectSamplesForReanalaysis() {
    this.sortSampleIdInDescendingOrder();
    this.goToNextNPage(4);
    this.selectCheckboxBySampleId('LDS_EIS325');
    this.goToPreviousNPage(2);
    this.selectCheckboxBySampleId('LDS_EIS346');
    this.selectCheckboxBySampleId('LDS_EIS358');
    this.goToPreviousNPage();
    this.goToPreviousNPage();
    this.selectCheckboxBySampleId('LDS_EIS392');
    this.selectCheckboxBySampleId('LDS_EIS393');
  }

  static clickSampleTypeRadioBtn() {
    cy.xpath(SAMPLE_ANALYSIS_LOCATORS.sampleRb).scrollToElement().click();
    cy.xpath(SAMPLE_ANALYSIS_LOCATORS.selectSampleBtn).scrollToElement().click();
  }

  static sortSampleIdInDescendingOrder() {
    cy.get(':nth-child(4) > .ng-star-inserted > .btn').scrollToElement().click();
    cy.xpath(SAMPLE_ANALYSIS_LOCATORS.descending).scrollToElement().click();
  }

  static selectCheckboxBySampleId(sampleName) {
    cy.contains('td', sampleName)
      .scrollIntoView()
      .parent()
      .within(() => {
        cy.get('input[type="checkbox"]').check();
      });
  }

  static goToPreviousNPage(n = 1) {
    times(n, () => cy.xpath(SAMPLE_ANALYSIS_LOCATORS.previous).scrollIntoView().click());
  }

  static goToNextNPage(n = 1) {
    times(n, () => cy.get('.pagination-next > .page-link').scrollIntoView().click());
  }
}

export default SA;
