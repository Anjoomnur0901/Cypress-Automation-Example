// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// login(email, password) => { ... })
//
//
// -- This is a child command --
// drag{ prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// dismiss{ prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
import 'cypress-file-upload';
import 'cypress-wait-until';
import csv from 'neat-csv';

import DATASET_LOCATORS from "../e2e/locators/dataset-locators.json";
import E_SIGN_LOCATORS from '../e2e/locators/e-sign-locators.json';
import LOGIN_LOCATORS from "../e2e/locators/login-locators.json";
import MISC_LOCATORS from '../e2e/locators/misc-locators.json';
import PLATE_LOCATORS from "../e2e/locators/plate-locators.json";


import SAMPLE_ANALYSIS_LOCATORS from '../e2e/locators/sa-locators/sample-analysis-locators.json';
import FixtureDataService from '../e2e/services/fixture-data-service';

Cypress.Commands.add(
  "scrollToElement",
  {prevSubject: true},
  subject => {
    if (subject.length) {
      cy.wrap(subject).each(item => {
        cy.wrap(item).scrollIntoView();
        cy.wrap(item).should('be.visible');
      });
    } else if (subject) {
      cy.wrap(subject).scrollIntoView();
      cy.wrap(subject).should('be.visible');
    }

    return cy.wrap(subject);
  }
);
Cypress.Commands.add(
  "navigate",
  {prevSubject: true},
  tab => {
    cy.wrap(tab).scrollToElement().click();
    cy.confirmNotification();
  }
);
Cypress.Commands.addAll({
  login(username, password) {
    cy.visit('/login');
    cy.screenshot({capture: "fullPage"});

    cy.get(LOGIN_LOCATORS.username).type(username);
    cy.get(LOGIN_LOCATORS.username).should("have.value", username);
    cy.get(LOGIN_LOCATORS.password).type(password);
    cy.get(LOGIN_LOCATORS.password).should("have.value", password);

    cy.contains("button", "Login").click();
  },
  removeWatermark() {
    cy.get('#env-watermark').invoke('remove');
  },
  selectDropdownOption(selector, optionText) {
    cy.xpath(selector).scrollIntoView();
    cy.xpath(selector).should('be.visible').select(optionText);
  },
  readFixtureCSV(filePath) {
    return cy.fixture(filePath).then(csv);
  },
  addNewDataset() {
    cy.xpath(DATASET_LOCATORS.addNewDataset).scrollToElement().click();
  },
  addNewPlate() {
    cy.xpath(DATASET_LOCATORS.addNewPlate).scrollToElement().click();
    cy.get("#newplatecontainer").should("be.visible");
  },
  clickOnNextStepBtn() {
    cy.contains("button", "Next").scrollToElement().click();
  },
  provideEsign() {
    const eSignPass = FixtureDataService.findFixtureDataByKey("U_correct_password");
    const eSignComment = FixtureDataService.findFixtureDataByKey("U_Esign_comment");

    //cy.get(E_SIGN_LOCATORS.eSignature).should("be.visible")
    cy.xpath(E_SIGN_LOCATORS.submit).should("be.visible");
    cy.xpath(E_SIGN_LOCATORS.pass).should("be.visible").type(eSignPass);
    cy.xpath(E_SIGN_LOCATORS.comment).should("be.visible").type(eSignComment);

    cy.contains("button", "Submit").click().then(() => {
      cy.get(E_SIGN_LOCATORS.esignModal).should("not.exist");
      //cy.get(E_SIGN_LOCATORS.eSignature).should("not.exist")
    });
  },
  confirmNotification() {
    return cy.get("body").then($body => {
      if ($body.find(MISC_LOCATORS.notificationModal).length > 0) {
        cy.get(`${MISC_LOCATORS.notificationModal}:visible`);
        cy.contains("button", "Yes").click().then(() => {
          cy.get(MISC_LOCATORS.notificationModal).should("not.exist");
        });
      }
    });
  },
  clickNextBtn() {
    cy.contains("button", "Next").scrollToElement().click();
  },
  goToDataset(index) {
    cy.get('app-side-menu-item').within(() => {
      cy.contains('label', `Dataset ${index}`).scrollToElement().click();
    });
  },
  importPlateDataCSV(filePath, fileName) {
    cy.contains("button", "Import Data").scrollToElement().click();
    cy.get(".modal-body").should("be.visible");

    cy.xpath(PLATE_LOCATORS.selectCsvCheckbox).should("be.visible").click();
    cy.get(".card-body").should("be.visible");
    cy.xpath(PLATE_LOCATORS.fileHeaderCheckbox).should("be.visible").click();

    cy.xpath(PLATE_LOCATORS.chooseFile).click();
    cy.fixture(filePath).then(fileContent => {
      cy.get('input[type="file"]').attachFile({
        fileContent,
        fileName,
      });
    });

    cy.xpath(PLATE_LOCATORS.previewTitle).should("exist");
    cy.screenshot();

    cy.contains("button", "Submit").scrollToElement().click();
    cy.get('modal-container').should('not.exist');
  },
  importPlateDataXlsx(fileName) {
    cy.get(".modal-body").should("be.visible");
    cy.xpath(PLATE_LOCATORS.Gen5Btn).scrollToElement().click();
    cy.get(".card-body").should("be.visible");
    cy.xpath(PLATE_LOCATORS.dataStartAtColumnInput).should("be.visible");
    cy.xpath(PLATE_LOCATORS.dataStartAtColumnInput).clear().type('2');
    cy.xpath(PLATE_LOCATORS.chooseXlsx).should("be.visible").click();
    cy.fixture(fileName, 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then(fileContent => {
        cy.xpath(PLATE_LOCATORS.chooseXlsx).attachFile({
          fileContent,
          fileName,
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          encoding: 'utf8'
        });
      });
    cy.xpath(PLATE_LOCATORS.previewTitle).should("exist");
    cy.screenshot();
    cy.contains("button", "Submit").scrollToElement();
    cy.contains("button", "Submit").click();
    cy.get('modal-container').should('not.exist');
  },

  clickSaveBtn() {
    cy.contains("button", "Save").scrollToElement().click();
  },
  saveEditedDescription() {
    cy.xpath(MISC_LOCATORS.saveBtn).scrollToElement().click();
    cy.xpath(MISC_LOCATORS.saveBtn).should('not.exist');
  },

  checkPlateCheckbox(plateNumber) {
    cy.get(`[data-cy=checkbox-plate-${plateNumber}`).scrollToElement().click();
  },
  assertValueWithinTolerance(rawActualValue, rawExpectedValue) {
    const actualValue = removeSymbolsFromNumberString(rawActualValue);
    const expectedValue = removeSymbolsFromNumberString(rawExpectedValue);
    const tolerance = Cypress.env("tolerance");
    const difference = Math.abs(actualValue - expectedValue);
    const toleranceValue = Math.abs(expectedValue * tolerance);

    cy.addTestContext(`Expected value is ${expectedValue}`);
    cy.addTestContext(`Actual value is ${actualValue}`);
    cy.addTestContext(`Tolerance is ${tolerance}`);
    cy.addTestContext(`Variation is ${difference}`);

    expect(difference).to.be.lte(toleranceValue);
  },
  assertDataWithinRow(tdLocator, expectedValue, $row, directComparison = false) {
    const actualValue = $row.find(tdLocator).text();

    if (directComparison) {
      expect(actualValue).to.be.eq(expectedValue);
      return;
    }

    cy.assertValueWithinTolerance(actualValue, expectedValue);
  },
  clickAddBtn() {
    cy.contains("button", "Add").scrollToElement();
    cy.contains("button", "Add").click();
  },
  clickAcceptBtn() {
    cy.contains("button", "Accept").scrollToElement();
    cy.contains("button", "Accept").click();
  },
  clickCloseBtn() {
    cy.contains("button", "Close").scrollToElement();
    cy.contains("button", "Close").click();
  },
  clickOnYesButton() {
    cy.get(`${MISC_LOCATORS.notificationModal}:visible`);
    cy.contains("button", "Yes").click();
  },
  selectDropdownOptionGet(selector, optionText) {
    cy.get(selector).scrollIntoView();
    cy.get(selector).should('be.visible').select(optionText);
  },
  clickOnAutoSelectBtn() {
    cy.xpath(SAMPLE_ANALYSIS_LOCATORS.autoSelectBtn).should("be.visible");
    cy.xpath(SAMPLE_ANALYSIS_LOCATORS.autoSelectBtn).click();
    cy.screenshot({capture: "fullPage"});
  },
  clickOnImportDataButton() {
    cy.contains("button", "Import Data").scrollToElement();
    cy.contains("button", "Import Data").click();
  },
  selectWell(row, col) {
    const selector = `:nth-child(${row}) > :nth-child(${col}) > .displayWell`;
    cy.get(selector).scrollToElement().click({ctrlKey: true});
  }
});
Cypress.Commands.add('takeCustomScreenshot', (startXPath, endXPath, screenshotName) => {
  cy.xpath(startXPath)
    .then($startElement => {
      $startElement[0].scrollIntoView(); // Scroll to the starting element
      cy.xpath(endXPath)
        .then($endElement => {
          const startElementRect = $startElement[0].getBoundingClientRect();
          const endElementRect = $endElement[0].getBoundingClientRect();
          const options = {
            x: startElementRect.x,
            y: startElementRect.y,
            width: endElementRect.x + endElementRect.width - startElementRect.x,
            height: endElementRect.y + endElementRect.height - startElementRect.y
          };
          cy.screenshot(screenshotName, options);
        });
    });
});


function removeSymbolsFromNumberString(numberString) {
   return Number(numberString.replace(/[%,-]/g, ''));
}