import FixtureDataService from '../../e2e/services/fixture-data-service.js';
import NEW_STUDY_LOCATORS from "../locators/new-study-locators.json";
import AddNewModal from "../pages/add-new-modal";
import Configuration from '../pages/common-pages/configuration.js';
import GenerateCalCurvePage from "../pages/generate-cal-curve-page.js";
import LoginPage from "../pages/login-page.js";
import Dashboard from '../pages/sa-pages/dashboard.js';
import IncurredSampleReanalysis from '../pages/sa-pages/isr.js';
import SA from "../pages/sa-pages/sa.js";
import SampleResult from '../pages/sa-pages/sample-result.js';
import TemplateCreation from '../pages/sa-pages/template.js';
import AddPlateServiceSA from '../services/sa-services/plate-service.js';

describe('Aegyris 3.5.0- PK Sample Analysis-Operational Qualification-v1.0', () => {
  before(() => {
    cy.clearLocalStorage();
    cy.readFixtureCSV("SA-PK Data Files/Test-Data.csv").then(fixtureData => {
      Cypress.FixtureDataService  = new FixtureDataService(fixtureData);
      Cypress.env('fixtureData', fixtureData);
    });
  });

  after(() => {
    LoginPage.logout();
  });


  it('OQ 27.1.1 Login to Aegyris', () => {
    LoginPage.loginWithCorrectCredentials();
  });

  describe('Test Study Creation', () => {
    it('OQ 27.1.2 Click on Sample Analysis Module', () => {
      Dashboard.selectSampleAnalysisModule();
    });

    it('OQ 27.1.3-> Add new study', () => {
      const beforeSaveCb = () => {
        cy.selectDropdownOptionGet(NEW_STUDY_LOCATORS.moduleDropdown, 'PK');
        cy.xpath(NEW_STUDY_LOCATORS.importManifestBtn).click();
        SA.importManifestFile("PK");

        AddNewModal.selectLinkedStudy();
      };

      AddNewModal.createNewStudy(beforeSaveCb, false, "SA-PK");
    });
  });

  describe('Section 27.2: Sample Analysis Configuration', () => {
    it('OQ 27.2a.4 User selects the configuration link in the left-hand navigation bar.', () => {
      Configuration.navigateToConfigPage();
    });
    it('OQ 27.2a.5 User enters First Name and Last Name and clicks on ‘Add’', () => {
      Configuration.navigateToTab("Analysts List");
      Configuration.addAnalyst();
    });
    it('OQ 27.2a.6 User clicks the Update button', () => {
      Configuration.updateButton();
      cy.provideEsign();
    });
    it('OQ 27.2a.7 User navigates to “General” and clicks on “Calibration Curve”', () => {
      Configuration.navigateToTab("General");
      Configuration.setCalibrationCurve();
    });
    it('OQ 27.2a.8 User Navigates to Decimal Control', () => {
      Configuration.decimalControl();
    });
    it('OQ 27.2a.9 User navigated to Incurred Sample Reanalysis and ensured the following is specified and change if does not match', () => {
      Configuration.isr();
    });
    it('OQ 27.2a.11 User updates the information and then clicks on Approve button', () => {
      Configuration.updateButton();
      cy.provideEsign();
      Configuration.approve();
    });
    it('OQ 27.2a.12 User provides the username, password and reason for change and clicks submit.', () => {
      cy.provideEsign();
    });
  });

  describe('Test Configuration Unapprove ', () => {
    it('OQ 27.2b.4 User clicks the unapprove button.', () => {
      Configuration.unapprove();
    });
    it('OQ 27.2b.5 User provides username, password and reason for change and clicks submit', () => {
      cy.provideEsign();
    });
  });
  describe('Test Configuration Reject', () => {
    it('OQ 27.2c.4 User clicks the reject button.', () => {
      Configuration.reject();
    });
    it('OQ 27.2c.5 User provides username, password and reason for change and clicks submit', () => {
      cy.provideEsign();
    });
    it('OQ 27.2c.6 User clicks approve on the configuration page and provides username, password and reason for change and clicks submit.', () => {
      Configuration.approve();
      cy.provideEsign();
    });
  });
  describe('Test Configuration Manage Files', () => {
    it('OQ 27.2d.4 User navigates to “Manage Files” Tab', () => {
      Configuration.goToManageFilesTab();
    });
    it('OQ 27.2d.5 User Clicks add file after selecting ‘unapprove’.', () => {
      Configuration.unapprove();
      cy.provideEsign();
      Configuration.addFile();
    });
    it('OQ 27.2d.6 User clicks on  “Import .xlsx file” then clicks on “choose file” to import sample data.', () => {
      SA.importManifestFile("PK");
      Configuration.updateButton();
      cy.provideEsign();
      Configuration.approve();
      cy.provideEsign();
    });
  });

  describe('Add Datasets and Plates from existing data files for Sample Analysis', () => {
    it('OQ 27.3a.3 User clicks on Sample Analysis and Add New Dataset to create DataSet1 ', () => {
      SA.goToSampleAnalysis();
      cy.addNewDataset();
    });
    it('OQ 27.3a.4 User clicks on Dataset 1 and selects Add New Plate', () => {
      cy.addNewPlate();
    });

    it('OQ 27.3a.5 User selects wells A1 to  H2 then with the “CTRL” key pressed select wells G3 to H4.', () => {
      TemplateCreation.selectCalibrators1();
    });
    it('OQ 27.3a.6 User selects Calibrator from the Labels  and enters Group as “1” and clicks on “Assign”', () => {
      TemplateCreation.assignCalibrator();
    });
    it('OQ 27.3a.7 User selects wells A3 to  C4', () => {
      TemplateCreation.qcFront();
    });
    it('OQ 27.3a.8 User selects QC from the Labels  and adjusts start ID to 2, enters Group as “Front” and clicks on “Assign”', () => {
      TemplateCreation.frontName();
    });
    it('OQ 27.3a.9 User selects wells F11 to  H12', () => {
      TemplateCreation.qcBack();
    });
    it('OQ 27.3a.11 User selects QC from the Labels , adjusts start ID to 2 and enters Group as “Back” and clicks on “Assign”', () => {
      TemplateCreation.backName();
    });
    it('OQ 27.3a.11 User scrolls down and enters the followingTemplate name : SA Template and clicks on “Save Template”', () => {
      TemplateCreation.nameTemplate('SA Template');
      SA.goToSampleAnalysis();

    });

    describe('add plates for sample analysis', () => {
      const importPlateFn = plateNumber => {
        SA.importXlsxForSampleAnalysis(plateNumber);
      };
      const plateCreationCb = plateNumber => {
        it('Generate and accept curve', () => {
          GenerateCalCurvePage.generateCalibrationCurveFullFlow("SA-PK", "sample_analysis", plateNumber);
        });

        it('Accept and assert sample results', () => {
          SampleResult.acceptAndAssertSampleResults('PK', "sample_analysis", plateNumber);
        });
      };

      AddPlateServiceSA.addDatasetAndPlatesForSampleAnalysis(
        1,
        5,
        'SA Template',
        importPlateFn,
        plateCreationCb,
      );
    });
  });

  describe('Reanalysis of failing or >ALQ Samples', () => {
    describe('add plates for sample reanalysis', () => {
      const importPlateFn = plateNumber => {
        SA.importXlsxForSampleAnalysis(plateNumber);
      };

      const plateCreationCb = plateNumber => {
        it('Generate and accept curve', () => {
          GenerateCalCurvePage.generateCalibrationCurveFullFlow("SA-PK", "sample_analysis", plateNumber);
        });

        it('Accept and assert sample results', () => {
          SampleResult.acceptAndAssertSampleResults("PK", "sample_analysis", plateNumber);
        });
      };
      AddPlateServiceSA.addPlateForSampleReanalysis(
        6,
        'SA Template',
        importPlateFn,
        2,
        plateCreationCb
      );
      AddPlateServiceSA.addPlateForSampleReanalysis(
        7,
        'SA Template',
        importPlateFn,
        5,
        plateCreationCb
      );
    });

    it('OQ 27.3b.39 User click sample analysis level', () => {
      SA.goToSampleAnalysis();
    });
    it('OQ 27.3b.40 User clicks sample result tab', () => {
      SA.gotoSaResult();
    });
  });

  describe('Incurred Sample Reanalysis', () => {
    it('OQ 27.3c.3 User navigates to Incurred Sample Reanalysis tab', () => {
      IncurredSampleReanalysis.goToISRTab();
    });
    it('OQ 27.3c.5 manually select the following LDS_EIS304,LDS_EIS323,LDS_EIS337,LDS_EIS347,LDS_EIS367,LDS_EIS308,LDS_EIS327,LDS_EIS353,LDS_EIS373,LDS_EIS343,LDS_EIS357,LDS_EIS377,LDS_EIS314,LDS_EIS317,LDS_EIS319,LDS_EIS320,And click accept selection', () => {
      IncurredSampleReanalysis.ISRSelectSample();
      cy.provideEsign();
      IncurredSampleReanalysis.isrRule();
    });
    it('OQ 27.3c.6 User clicks on Incurred Sample Reanalysis and Add New Dataset to create DataSet1 (if it has not been created yet)', () => {
      cy.addNewDataset();
      cy.addNewPlate();
    });
    it('OQ 27.3c.8 User selects wells A1 to  H2 then with the “CTRL” key pressed select wells G3 to H4.', () => {
      TemplateCreation.selectCalibrators1();
    });
    it('OQ 27.3c.9 User selects Calibrator from the Labels  and enters Group as “1” and clicks on “Assign”', () => {
      TemplateCreation.assignCalibrator();
    });
    it('OQ 27.3c.10 User selects wells A3 to  C4', () => {
      TemplateCreation.qcFront();
    });
    it('OQ 27.3c.11 User selects QC from the Labels  and adjusts start ID to 2, enters Group as “Front” and clicks on “Assign”', () => {
      TemplateCreation.frontName();
    });
    it('OQ 27.3c.12 User selects wells F11 to  H12', () => {
      TemplateCreation.qcBack();
    });
    it('OQ 27.3c.13 User selects QC from the Labels , adjusts start ID to 2 and enters Group as “Back” and clicks on “Assign”', () => {
      TemplateCreation.backName();
    });
    it('OQ 27.3c.14 User scrolls down and enters the followingTemplate name : ISR Template and clicks on “Save Template”', () => {
      TemplateCreation.nameTemplate('ISR Template');
      IncurredSampleReanalysis.goToISRTab();

    });
    describe('Add plates to dataset in ISR Tab', () => {
      const plateCreationCb = plateNumber => {
        it('Generate and accept curve', () => {
          GenerateCalCurvePage.generateCalibrationCurveFullFlow("SA-PK", "sample_analysis", plateNumber);
        });

        it('Accept and assert sample results', () => {
          SampleResult.acceptAndAssertSampleResults("PK", "incurred_sample_reanalysis", plateNumber);
        });
      };
      AddPlateServiceSA.addDatasetAndPlatesForIncurredSampleReanalysis(
        1,
        1,
        'ISR Template',
        plateCreationCb
      );
    });
    it('OQ 27.3a.35 Provide E Signature. All result failed except 320,323', () => {
      IncurredSampleReanalysis.goToISRTab();
      IncurredSampleReanalysis.checkISRResult();
    });
  });
});
