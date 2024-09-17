import AddNewModal from "../pages/add-new-modal";
import DashboardPage from "../pages/dashboard-page.js";
import GenerateCalCurvePage from '../pages/generate-cal-curve-page.js';
import LoginPage from "../pages/login-page.js";
import AccuracyPage from '../pages/pk-pages/accuracy-page.js';
import CalibrationCurvePage from '../pages/pk-pages/calibration-curve-page.js';
import PKConfigurationPage from '../pages/pk-pages/configuration-page.js';
import DilutionalIntegretyAndHookEffectPage from '../pages/pk-pages/dilutional-hook.page.js';
import SelectivityPage from '../pages/pk-pages/selectivity-page.js';
import StabilityPage from "../pages/pk-pages/stability-page";
import StudyService from "../services/study.service.js";

describe("PK_test_script_v3.5.0", () => {
  before(() => {
    cy.clearLocalStorage();
    cy.readFixtureCSV("PK Data Files/Test-Data.csv").then(fixtureData => {
      Cypress.env('fixtureData', fixtureData);
    });
  });

  after(() => {
    // This will run after all test cases are done
    LoginPage.logout();
  });

  it("Login with correct credentials", () => {
    LoginPage.loginWithCorrectCredentials();
  });

  describe("Setting up of program and project", () => {
    it("OQ 3.1.2-> clicks on Pharmacokinetic module", () => {
      DashboardPage.selectPKModule();
    });
  });

  describe("Test Script 3.5:  Test Study Creation -> Create study 1", () => {
    it('OQ 3.5.4-> Add new study', () => {
      AddNewModal.createNewStudy();
    });
  });

  describe("Section 8.0: Study Analysis Configuration pk", () => {
    it("OQ 8.0.2(a)-> Click the configuration tab General Calibration Curve", () => {
      PKConfigurationPage.navigateToConfigPage();
    });
    it("OQ 8.0.2(b)-> Click the configuration tab General Calibration Curve", () => {
      PKConfigurationPage.goToCalibrationCurveFromConfiguration();
      PKConfigurationPage.checkCalibrationCurveParameters();
      PKConfigurationPage.takeScreenshotOfCalibrators();
    });
    it("OQ 8.0.3-> User clicks on ‘QC Sample(s)’", () => {
      PKConfigurationPage.goToQCSamples();
      PKConfigurationPage.takeScreenshotOfQCSamples();
    });
    it("OQ 8.0.4-> User navigates to the ‘Accuracy and Precision’ tab", () => {
      PKConfigurationPage.goToAccuracy();
      PKConfigurationPage.takeScreenshotOfAccuracy();
    });
    it("OQ 8.0.5-> User navigates to ‘Parameters’ tab and then to ‘Sensitivity’", () => {
      PKConfigurationPage.goToParameters();
      PKConfigurationPage.goToSensitivityFromParameters();
      PKConfigurationPage.takeScreenshotOfSensitivity();
    });
    it("OQ 8.0.6-> User navigates Selectivity", () => {
      PKConfigurationPage.goToSelectivityFromParameters();
      PKConfigurationPage.takeScreenshotOfSelectivity();
    });
    it("OQ 8.0.7(a)-> User navigates Dilutional Integrity and Hook Effect", () => {
      PKConfigurationPage.goToDilutionalFromParameters();
      PKConfigurationPage.takeScreenshotOfDilutional();
    });
    it("OQ 8.0.7(b)-> User ensures configuration is approved", () => {
      PKConfigurationPage.approveConfiguration();
    });
  });

  describe("Test Script 8.1:  Add Datasets and Plates from existing data files for Calibration Curve", () => {
    before(() => {
      CalibrationCurvePage.goToCalibrationCurveFromNavBar();
    });

    describe("OQ 8.1.3 to 8.1.17 -> Add dataset and plates, then add and accept calibration curve", () => {
      const importPlateFn = (plateNumber, datasetNumber) => CalibrationCurvePage.importXlsxForCalibrationCurve(plateNumber, datasetNumber);
      const plateCreationCb = () => {
        it("Generate and accept curve.", () => {
          CalibrationCurvePage.generateCalibrationCurve();
          cy.provideEsign();
          CalibrationCurvePage.assertCalibrationCurveGoodness();
          CalibrationCurvePage.acceptGoodness();
          cy.screenshot({capture: 'fullPage'});
        });

      };
      StudyService.addDatasetAndPlates(1, 1, "Calibration Curve", importPlateFn, plateCreationCb);
    });
  });

  describe("Test Script 8.2:  Add Plates from existing data files to perform Accuracy and Precision", () => {
    before(() => {
      AccuracyPage.goToAccuracyFromNavBar();
    });

    describe("OQ 8.2.3 to 8.2.19 -> Add dataset and plates, then add and accept calibration curve", () => {
      const importPlateFn = (plateNumber, datasetNumber) => AccuracyPage.importXlsxForAccuracy(plateNumber, datasetNumber);
      const plateCreationCb = plateNumber => {
        it("Perform Start Data Extrapolation and accept curve for each plate", () => {
          GenerateCalCurvePage.generateCalibrationCurveFullFlow("PK", "accuracy_and_precision", plateNumber);
        });
      };
      StudyService.addDatasetAndPlates(1, 2, "A&P", importPlateFn, plateCreationCb);
    });

    describe("Perform other analysis", () => {
      it("OQ 8.2.20-> Click on Dataset 1", () => {
        cy.goToDataset(1);
      });
      it("OQ 8.2.22-> Navigate to ‘Total Error Test’ and then click on ‘Add Total Error Test’. Select the three uploaded plates and click on ‘Calculate Total Error’ then name the result and click on ‘Save’", () => {
        AccuracyPage.goToTotalErrorTestTab();
        AccuracyPage.clickOnAddTotalErrorTest();
        AccuracyPage.checkAllPlates();
        AccuracyPage.calculateTotalError();
        AccuracyPage.saveTotalErrorResult();
        cy.provideEsign();
        cy.screenshot({capture: 'fullPage'});
      });
      it("OQ 8.2.24-> Click on the approve result icon and provide e-sign", () => {
        AccuracyPage.approveResult();
        cy.provideEsign();
      });
      it("OQ 8.2.26-> Navigate to ‘Sensitivity Test’.Inter Assay Precision, Inter Assay Accuracy and Total Error Pass", () => {
        AccuracyPage.goToSensitivityTestTab();
        AccuracyPage.assertIntraAssayIntraCVTotalError();
      });
      it("OQ 8.2.28(a)-> Navigate to ‘Accuracy and Precision’ and select ‘Precision and Acceptance Criteria Test’ and select ‘Accept Precision and Acceptance Criteria’", () => {
        AccuracyPage.goToAccuracyFromNavBar();
        AccuracyPage.goToPrecisionAndAcceptanceCriteriaTestTab();
        AccuracyPage.acceptTableData();
      });
      it("OQ 8.2.28(b)-> Assert Precision and Acceptance Criteria Test table data", () => {
        AccuracyPage.assertPrecisionAndAcceptanceCriteriaTest();
      });
    });
  });

  describe("Test Script 8.3:  Add Plates from existing data files to perform Selectivity", () => {
    before(() => {
      SelectivityPage.goToSelectivityFromNavBar();
    });

    describe("OQ 8.3.3 to 8.2.16 -> Add dataset and plates, then add and accept calibration curve", () => {
      const importPlateFn = (plateNumber, datasetNumber) => SelectivityPage.importXlsxForSelectivity(plateNumber, datasetNumber);
      const plateCreationCb = plateNumber => {
        it("Perform Start Data Extrapolation and accept curve for each plate", () => {
          GenerateCalCurvePage.generateCalibrationCurveFullFlow("PK", "selectivity", plateNumber);
        });
      };
      StudyService.addDatasetAndPlates(1, 1, "Selectivity", importPlateFn, plateCreationCb);
    });

    describe("Perform Selectivity", () => {
      it("OQ 8.3.17-> Click on Dataset 1", () => {
        cy.goToDataset(1);
      });
      it("OQ 8.3.18(a)-> Navigate to ‘Selectivity Test’ and then click on ‘Add New Selectivity Test Result’. Select ‘Normal[Female] Take Screenshot and then Normal[Male] Take Screenshot ", () => {
        SelectivityPage.goToSelectivityTestTab();
        SelectivityPage.clickOnAddNewSelectivityTestResult();
        SelectivityPage.saveSelectivityResult();
        SelectivityPage.goToPlate1FromSelectivityTest();
        SelectivityPage.expandFemaleSection();
        cy.screenshot({capture: 'fullPage'});
        SelectivityPage.expandMaleSection();
        cy.screenshot({capture: 'fullPage'});
        cy.clickCloseBtn();
      });
      it("OQ 8.3.18(b)-> Assert overall test result for female", () => {
        SelectivityPage.goToPlate1FromSelectivityTest();
        SelectivityPage.expandFemaleSection();
        SelectivityPage.assertOverAllTestResultForFemale();
      });
      it("OQ 8.3.18(c)-> Assert overall test result for male", () => {
        SelectivityPage.goToPlate1FromSelectivityTest();
        SelectivityPage.expandMaleSection();
        SelectivityPage.assertOverAllTestResultForMale();
      });

    });

  });

  describe("Test Script 8.4:  Perform Dilutional Integrity and Hook Effect Analysis", () => {
    before(() => {
      DilutionalIntegretyAndHookEffectPage.goToHookEffectFromNavBar();
    });

    describe("OQ 8.4.3 to 8.4.16 -> Add dataset and plates, then add and accept calibration curve", () => {
      const importPlateFn = (plateNumber, datasetNumber) => DilutionalIntegretyAndHookEffectPage.importXlsxForDilutionalHook(plateNumber, datasetNumber);
      const plateCreationCb = plateNumber => {
        it("Perform Start Data Extrapolation and accept curve for each plate", () => {
          GenerateCalCurvePage.generateCalibrationCurveFullFlow("PK", "dilutional_integrity_and_hook_effect", plateNumber);
        });
      };
      StudyService.addDatasetAndPlates(1, 1, "Dilutional Linearity Template", importPlateFn, plateCreationCb);
    });

    describe("Perform  Dilutional Linearity Test", () => {
      it("OQ 8.4.18-> Click on Dataset 1", () => {
        cy.goToDataset(1);
      });
      it("OQ 8.4.19-> Navigate to ‘Dilutional Linearity’ and then click on ‘Add New Dilutional Linearity Test’. Select ‘Save’", () => {
        DilutionalIntegretyAndHookEffectPage.goToDilutionalLinearityTest();
        DilutionalIntegretyAndHookEffectPage.clickOnAddNewDilutionalLinearityTest();
        DilutionalIntegretyAndHookEffectPage.saveDilutionalLinearityTestResult();
      });

      it("OQ 8.3.20-> There should be 23 samples out of 30 that pass and the overall test should fail.", () => {
        DilutionalIntegretyAndHookEffectPage.goToPlate1FromDilutionalTest();
        DilutionalIntegretyAndHookEffectPage.assertTotalSampleCountForDilutionalTest();
        DilutionalIntegretyAndHookEffectPage.assertTotalPassedSampleCountForDilutionalTest();

      });

    });

  });

  describe("Test Script 8.5:  Add Plates from existing data files to perform Stability Test", () => {
    before(() => {
      StabilityPage.goToStabilityFromNavBar();
    });

    describe("OQ 8.5.4 to 8.5.36 -> Add dataset and plates, then add and accept calibration curve", () => {
      const importPlateFn = (plateNumber, datasetNumber) => StabilityPage.importXlsxForStability(plateNumber, datasetNumber);
      const plateCreationCb = plateNumber => {
        it("Perform Start Data Extrapolation and accept curve for each plate", () => {
          GenerateCalCurvePage.generateCalibrationCurveFullFlow("PK", "stability", plateNumber);
        });
      };


      StudyService.addDatasetAndPlates(
        1,
        3,
        { 1: "Freeze Thaw Template", 2: "Short Term Template", 3: "Long Term Template" },
        importPlateFn,
        plateCreationCb
      );
    });

    describe("Perform Stability Test for each plate", () => {
      it("OQ 8.5.37-> Click on Dataset 1", () => {
        cy.goToDataset(1);
      });
      it("OQ 8.5.38 to 8.5.40-> Navigate to ‘Stability Test’’ and then click on ‘Add New Stability Test’. Select ‘Save", () => {
        StabilityPage.goToStabilityTest();
        StabilityPage.addStabilityTestResultAndSaveResultForEachPlate();
      });
    });

  });
});
