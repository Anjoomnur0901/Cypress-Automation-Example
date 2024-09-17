import { each } from "lodash";
import NEW_STUDY_LOCATORS from "../locators/new-study-locators.json";
import AddNewModal from "../pages/add-new-modal";
import Configuration from '../pages/common-pages/configuration.js';
import LoginPage from "../pages/login-page.js";
import Dashboard from '../pages/sa-pages/dashboard.js';
import SA from "../pages/sa-pages/sa.js";

describe('Aegyris 3.5.0- ADA Sample Analysis-Operational Qualification-v1.0', () => {
  before(() => {
    cy.clearLocalStorage();
    cy.readFixtureCSV("SA-ADA Data Files/Test-Data.csv").then(fixtureData => {
      Cypress.env('fixtureData', fixtureData);
    });
  });

  after(() => {
    LoginPage.logout();
  });

  it("Login with correct credentials", () => {
    LoginPage.loginWithCorrectCredentials();
  });

  describe('Test Study Creation', () => {
    it('OQ 19.1.2 Click on Sample Analysis Module', () => {
      Dashboard.selectSampleAnalysisModule();
    });

    it('OQ 19.1.5-> Add new study', () => {
      const beforeSaveCb = () => {
        cy.selectDropdownOptionGet(NEW_STUDY_LOCATORS.moduleDropdown, 'ADA');
        cy.xpath(NEW_STUDY_LOCATORS.importManifestBtn).click();
        SA.importManifestFile("ADA");

        AddNewModal.selectLinkedStudy();
      };

      AddNewModal.createNewStudy(beforeSaveCb, false, 'SA-ADA');
    });
  });

  describe('Section 19.2: Sample Analysis Configuration', () => {
    it('OQ 19.2.1.3 User selects the configuration link in the left-hand navigation bar.', () => {
      Configuration.navigateToConfigPage();
    });

    it('OQ 19.2.1.4 User enters First Name and Last Name and clicks on ‘Add’', () => {
      Configuration.navigateToTab("Analysts List");
      Configuration.addAnalyst();
    });

    it('OQ 19.2.1.6 User clicks the Update button', () => {
      Configuration.updateButton();
      cy.provideEsign();
    });

    it('OQ 19.2.1.7 Navigate to General tab and open Acceptance Criteria', () => {
      Configuration.navigateToTab("General");
      Configuration.expandSection("Acceptance Criteria");
    });

    it('OQ 19.2.1.7a Verify the acceptance criteria CVs are set to 20%', () => {
      cy.contains('.input-group-text', "%CV ≤").each($inputGroupText => {
        const $inputGroup = $inputGroupText.parent().parent();
        cy.wrap($inputGroup).within(() => {
          cy.get('input').should('have.value', '20');
        });
      });
    });

    it('OQ 19.2.1.7b Deactivate samples with %CV > criteria is unchecked', () => {
      cy.contains('th', 'Deactivate samples with %CV > criteria').parent().within(() => {
        cy.get("input[type=checkbox]").should('not.be.checked');
      });
    });

    it('OQ 19.2.1.8 QCs should have correct thresholds', () => {
      const thresholds = {
        'HPC1': 5000,
        'LPC1': 100,
        'LPC2': 80,
        'LPC3': 120,
        'LPC4': 160,
        'HIC1': 5000,
        'LIC1': 100,
        'LIC2': 160,
        'LIC3': 120,
        'LIC4': 80
      };
      Configuration.expandSection("QC Sample(s)");

      each(thresholds, (value, key) => {
        cy.contains('td', key).parent().within(() => {
          cy.get('input').should('have.value', value);
        });
      });
    });

    it('OQ 19.2.1.9 Ensure Decimal Control has the correct config', () => {
      Configuration.expandSection('Decimal Control');
      cy.contains('th', 'The minimum number of integer digits before the decimal point').parent().within(() => {
        cy.get('input').should('have.value', 1);
      });

      cy.contains('th', 'The maximum number of decimal place after the decimal point').parent().within(() => {
        cy.get('input').should('have.value', 3);
      });
    });

    it('OQ 19.2.1.10 Ensure Cutpoint values are correct', () => {
      Configuration.navigateToTab("Cutpoint Result");

      cy.contains('td', 'Screening Cutpoint').parent().within(() => {
        cy.get('input[type=number]').should('have.value', 1.232014042502699);
        cy.contains('mat-radio-button', 'Multiplicative').within(() => {
          cy.get('input[type=radio]').should('be.checked');
        });
      });

      cy.contains('td', 'Confirmatory Cutpoint').parent().within(() => {
        cy.get('input[type=number]').should('have.value', 24.977740489578434);
        cy.get('input[type=checkbox]').should('not.be.checked');
      });

      cy.contains('td', 'Titer Cutpoint').parent().within(() => {
        cy.get('input[type=number]').should('have.value', 18.55095030023938);
        cy.contains('mat-radio-button', 'Additive').within(() => {
          cy.get('input[type=radio]').should('be.checked');
        });
      });
    });
  });
});