import PrecisionAcceptance from "../pages/ada-pages/precision-acceptance.js";
//import statisticPlanPage from "../pages/statistic-page.js";
//import validationPlanPage from "../pages/study-validation-plan.js";
import { times } from "lodash";
import Ada from "../pages/ada-pages/ada.js";
import ConfirmatoryCutpoint from "../pages/ada-pages/confirmatory-cutpoint.js";
import DrugTolerance from "../pages/ada-pages/drug-tolerance.js";
import HookEffect from '../pages/ada-pages/hook-effect.js';
import ScreeningCutpoint from "../pages/ada-pages/screening-cutpoint.js";
import Selectivity from "../pages/ada-pages/selectivity.js";
import Sensitivity from "../pages/ada-pages/sensitivity.js";
import Stability from "../pages/ada-pages/stability.js";
import TiterCutpoint from "../pages/ada-pages/titer-cutpoint.js";
import AddNewModal from "../pages/add-new-modal";
import Configuration from "../pages/common-pages/configuration.js";
import DashboardPage from "../pages/dashboard-page.js";
import LoginPage from "../pages/login-page.js";
import Summary from "../pages/summary-page.js";
import FixtureDataService from "../services/fixture-data-service.js";
import PlateService from "../services/plate-service.js";
import StudyService from "../services/study.service.js";

describe("ADA_test_script_v3.5.0", () => {
  before(() => {
    cy.clearLocalStorage();
    cy.readFixtureCSV("ADA Data Files/Test-Data.csv").then(fixtureData => {
      Cypress.FixtureDataService  = new FixtureDataService(fixtureData);
      Cypress.env('fixtureData', fixtureData);
    });
  });
  after(() => {
    LoginPage.logout();
  });

  it("Login with correct credentials", () => {
    LoginPage.loginWithCorrectCredentials();
  });

  describe("Create an ADA study", () => {
    it("OQ 3.1.2-> clicks on Immunogenicity module", () => {
      DashboardPage.selectAdaModule();
    });

    it("OQ 3.5.5-> create a new study", () => {
      AddNewModal.createNewStudy();
    });

    it("OQ 3.6.7-> edit study description", () => {
      AddNewModal.editFirstStudy();
    });

    it("OQ 5.1.2-> go to Automated Test Study", () => {
      Configuration.navigateToConfigPage();
    });

    it("OQ 5.1.2-> nc value must be median ", () => {
      Ada.checkNCEvaluationMedian();
    });
  });

  describe("Test script 5-1: Perform Screening Cutpoint analysis", () => {
    before(() => {
      ScreeningCutpoint.goToScreeningCutpoint();
    });

    describe("OQ 5.1.5 -> Add dataset and plates, then perform NC Evaluation on each plate", () => {
      const importPlateFn = (plateNumber, datasetNumber) => ScreeningCutpoint.importCsvFileforPlateForScreening(plateNumber, datasetNumber);
      const plateCreationCb = () => {
        it("Click on the NC Evaluation (Negative Control) tab and click the Start NC Evaluation Button.", () => {
          ScreeningCutpoint.goToNcEvTab();
          ScreeningCutpoint.startNcEv();
          ScreeningCutpoint.acceptNcEv();
          cy.provideEsign();
        });

        it("Click on Summary tab, change plate status from saved to accepted.", () => {
          PlateService.acceptPlate();
        });
      };

      StudyService.addDatasetAndPlates(4, 2, "SCP Template", importPlateFn, plateCreationCb, true);
    });

    describe("Peform Screening Cutpoint Calculation", () => {
      it("OQ 5.1.21 -> Click on the Screening Cutpoint link in the sidebar, then the Analytical Outlier tab. Click on the Start Analytical Outlier Analysis button.", () => {
        ScreeningCutpoint.performAnalyticalOutlierAnalysis();
      });

      it("OQ 5.1.23 -> Click on the Screening Cutpoint link and then the Biological Outlier tab and click on the Start Biological Outlier Analysis button. Scroll down to bottom of screen and click the “Accept Biological Outlier Analysis” Button.", () => {
        ScreeningCutpoint.performBiologicalOutlierAnalysis();
      });

      it("OQ 5.1.25 -> Click on the screening cutpoint link and then the cutpoint analysis tab. Click the New Screening Cutpoint Analysis button.", () => {
        ScreeningCutpoint.goToScreeningCutpoint();
        ScreeningCutpoint.goToCutpointOutlierTab();
        ScreeningCutpoint.clickOnStartCutpointOutlierAnalysis();
      });

      it("OQ 5.1.26 -> With the parametric tab selected, choose all of the datasets.", () => {
        Ada.selectParametric();
        Ada.selectNaiTestArticle();
        Ada.selectAllDatasetsCheckboxes();
      });

      it(`OQ 5.1.27 -> Click the Start Analysis button.
        Next click on the Log Transform button and then the Accept button for the Shaprio Test - Log Transform.`,
        () => {
          Ada.clickOnStartAnalysisButton();
          ScreeningCutpoint.clickOnLogTramsform();
          ScreeningCutpoint.acceptOfLogTransform();
          cy.clickNextBtn();
        }
      );

      it(`OQ 5.1.28 -> Click on Proceed to Cutpoint Calculation.
        The cutpoint result should be within tolerance of the expected value`,
        () => {
          Ada.clickOnCalculateCutpoint();
          ScreeningCutpoint.assertSCPResult();
          cy.clickNextBtn();
        }
      );

      it("OQ 5.1.29 -> Give the result a name, click save and provide your E Signature.", () => {
        Ada.saveCutpointResult();
        cy.provideEsign();
      });

      it("OQ 5.1.29 -> Click on the check mark approve icon and provide your E Signature.", () => {
        Ada.approveResult();
      });
    });
  });

  describe("Test Script 5-2: Perform Confirmatory Cutpoint analysis", () => {
    before(() => {
      ConfirmatoryCutpoint.goToConfirmatoryCutpoint();
    });

    describe("OQ 5.2.3 -> Add dataset and plates", () => {
      const importPlateFn = (plateNumber, datasetNumber) => ConfirmatoryCutpoint.importCsvFileforPlateForConfirmatory(plateNumber, datasetNumber);
      const plateCreationCb = () => {
        it("Click on Summary tab, change plate status from saved to accepted.", () => {
          PlateService.acceptPlate();
        });
      };

      StudyService.addDatasetAndPlates(4, 2, "CCP Template", importPlateFn, plateCreationCb, true);
    });

    describe("Perform Confirmatory Cutpoint Analysis", () => {
      it("OQ 5.2.15 -> Click on the Confirmatory Cutpoint link and then the Analytical Outlier tab. Click on the Start Analytical Outlier Analysis button. Scroll to the bottom of the screen and click on the Accept Analytical Outlier Analysis button. When E Signature dialog appears, provide E Signature.", () => {
        ConfirmatoryCutpoint.performAnalyticalOutlierAnalysis();
      });
      it("OQ 5.2.16 -> Click on the Confirmatory Cutpoint link and then the Biological Outlier tab and click on the Start Biological Outlier Analysis button. Scroll down to the bottom of screen and click the “Accept Biological Outlier Analysis” Button.", () => {
        ConfirmatoryCutpoint.performBiologicalOutlierAnalysis();
      });
      it("OQ 5.2.18 -> Click on the confirmatory cutpoint link and then the cutpoint analysis tab. Click the New Confirmatory Cutpoint Analysis button.", () => {
        ConfirmatoryCutpoint.goToConfirmatoryCutpoint();
        ConfirmatoryCutpoint.startCutpointAnalysis();
      });
      it("OQ 5.2.19 -> With the parametric tab selected, choose all of the datasets.", () => {
        Ada.selectParametric();
        ConfirmatoryCutpoint.clickOnTestArticle();
        Ada.selectAllDatasetsCheckboxes();
        ConfirmatoryCutpoint.checkIncludeNegativePercentInhibition();
      });
      it("OQ 5.2.20 & 5.2.21-> Click the Start Analysis button and click the Accept button for the Shapiro Test.", () => {
        Ada.clickOnStartAnalysisButton();
        ConfirmatoryCutpoint.acceptSwTest();
      });
      it(`OQ 5.2.21 -> Click on Proceed to Cutpoint Calculation.
        The cutpoint result should be within tolerance of the expected value.`,
        () => {
          Ada.clickOnCalculateCutpoint();
          ConfirmatoryCutpoint.proceedToDescriptiveStatistics();
          ConfirmatoryCutpoint.proceedToCutpointAnalysis();
        }
      );
      it("OQ 5.2.22 -> Give the result a name, click save and provide your E Signature.", () => {
        Ada.saveCutpointResult();
        cy.provideEsign();
      });
      it("OQ 5.2.23 -> Click on the check mark approve icon and provide your E Signature.", () => {
        Ada.approveResult();
      });
    });
  });

  describe("Test Script 5-3: Perform Precision and Accpetance Criteria", () => {
    it("OQ 5.3.3-> User clicks on Precision and Acceptance Criteria link and then clicks on Acceptance Criteria tab and then clicks on Add New Precision and Acceptance Criteria button.", () => {
      PrecisionAcceptance.goToPrecisionAcceptence();
      PrecisionAcceptance.goToAcceptenceCriteriaTab();
      PrecisionAcceptance.clickOnStartNewAceptence();
    });

    it("OQ 5.3.5-> User clicks on next", () => {
      PrecisionAcceptance.clickOnNextForFirstTime();
    });

    it("OQ 5.3.6-> User clicks on next", () => {
      PrecisionAcceptance.clickOnNextForSecondTime();
    });

    it("OQ 5.3.7-> User clicks on next", () => {
      PrecisionAcceptance.clickOnNextForThirdTime();
    });

    it("OQ 5.3.8-> User clicks on next", () => {
      PrecisionAcceptance.clickOnNextForLastTime();
    });

    it("OQ 5.3.9-> User clicks on Save Result.", () => {
      PrecisionAcceptance.clickOnSave();
    });

    it("OQ 5.3.10-> User provides E Signature.", () => {
      cy.provideEsign();
    });
  });

  describe("Test Script 5-4: Perform Titer Cutpoint Analysis", () => {
    before(() => {
      TiterCutpoint.goToTiterCutpoint();
    });

    it("OQ 5.4.3(a)-> User clicks on Titer Cutpoint link", () => {
      TiterCutpoint.goToCutpointTab();
      TiterCutpoint.clickOnNewTiterCutpointAnalysis();
    });

    it("OQ 5.4.4-> User ensures parametric is selected, selects NAI_TEST_ARTICLE and selects all datasets Start Analysis button.", () => {
      Ada.selectParametric();
      Ada.selectNaiTestArticle();
      Ada.selectAllDatasetsCheckboxes();
      Ada.clickOnStartAnalysisButton();
    });

    it(`OQ 5.4.5-> Leave at 99.9% and click on Proceed to Cutpoint Calculation.
      The cutpoint result should be within tolerance of the expected value`,
      () => {
        Ada.clickOnCalculateCutpoint();
        TiterCutpoint.assertTCPResult();
        cy.screenshot();
        cy.clickNextBtn();
      }
    );

    it("OQ 5.4.6-> User gives result a name and clicks save. Click on the accept icon and provide e-signature.", () => {
      TiterCutpoint.saveResult();
    });
  });

  describe("Test Script 5-5: Perform Sensitivity Test", () => {
    before(() => {
      Sensitivity.goToSensitivity();
    });

    describe("OQ 5.5.3(b) -> Add Dataset of 6 plates. Use the Sensitivity Template. Accept the plates", () => {
      const importPlateFn = plateNumber => Sensitivity.importCsvFileforPlateForSensitivity(plateNumber);
      const plateCreationCb = () => {
        it("Click on Summary tab, change plate status from saved to accepted.", () => {
          PlateService.acceptPlate();
        });
      };

      StudyService.addDatasetAndPlates(1, 6, "Sensitivity Template", importPlateFn, plateCreationCb);
    });

    describe("OQ 5.5.4 -> Peform Sensitivy Test", () => {
      it("OQ 5.5.4-> User clicks on the Sensitivity link, then the Dataset 1 link, and then clicks on the Sensitivity Test tab.", () => {
        Sensitivity.goToSensitivity();
        cy.goToDataset(1);
        Sensitivity.goToSensitivityTestTab();
      });

      it("OQ 5.5.5 to 5.5.8-> User selects each plates radio button and clicks Add New Sensitivity Test.User Selects Sen1 radio button, leave Analysis method at Regression and ensures that Exclude… check box is checked and clicks on Next button and then next button on the following screen. User gives result a name, clicks save result and provides E Signature.", () => {
        times(6, plateIndex => {
          const plate = plateIndex + 1;
          Sensitivity.performSensitivityTest(plate);
        });
      });
      it("OQ 5.5.9-> User clicks on the Sensitivity link and the final sensitivity tab. User selects all the datasets and clicks on accept.", () => {
        Sensitivity.goToSensitivity();
        Sensitivity.goToFinalSensitivity();
        Sensitivity.selectAllSensitivityResultsForFinalSensitivity();
        Sensitivity.clickOnAccept();
        cy.provideEsign();
      });
    });
  });

  describe("Test Script 5-6: Perform Titer Acceptance Test", () => {
    before(() => {
      TiterCutpoint.goToTiterCutpoint();
    });

    describe("OQ 5.6.3-> Add dataset", () => {
      const importPlateFn = plateNumber => TiterCutpoint.importCsvFileforPlateForTiter(plateNumber);
      const plateCreationCb = () => {
        it("Click on Summary tab, change plate status from saved to accepted.", () => {
          PlateService.acceptPlate();
        });
      };

      StudyService.addDatasetAndPlates(1, 4, "Titer Template", importPlateFn, plateCreationCb);
    });

    describe("Perform Titer Evaluation", () => {
      it("OQ 5.6.4-> User clicks on the Dataset 1 link, and then clicks on the Titer Evaluation tab.", () => {
        cy.goToDataset(1);
        TiterCutpoint.goToDatasetEvaluteTab();
      });

      it("OQ 5.6.5 to oq 5.6.8-> Add New Titer Evaluation to all 4 plates", () => {
        times(4, plateIndex => {
          const plate = plateIndex + 1;
          cy.checkPlateCheckbox(plate);
          TiterCutpoint.clickOnStartNewAceptence();
          TiterCutpoint.clickOnTiterCheckbox();
          TiterCutpoint.clickOnNext1();
          TiterCutpoint.clickOnNext2();
          Sensitivity.giveResultNameCommentForPlate(plate);
        });
      });

      it("OQ 5.6.9-> User clicks on the Titer Cutpoint link and the Cutpoint Analysis tab and clicks on the User/Check icon to accept the TCP. User provides E Signature.", () => {
        TiterCutpoint.goToTiterCutpoint();
        TiterCutpoint.goToCutpointTab();
        Ada.approveResult();
      });
    });
  });

  describe("Test Script 5-7:  Set Intra Assay Precision and Acceptance", () => {
    before(() => {
      PrecisionAcceptance.goToPrecisionAcceptence();
    });

    describe("OQ 5.7.3(b)-> User clicks on Precision and Acceptance Criteria link and then adds a dataset of 7 plates", () => {
      const importPlateFn = plateNumber => PrecisionAcceptance.importCsvFileforPlateForPrecision(plateNumber);
      const plateCreationCb = () => {
        it("Click on Summary tab, change plate status from saved to accepted.", () => {
          PlateService.acceptPlate();
        });
      };
      StudyService.addDatasetAndPlates(1, 7, "Precision Accept Template 1", importPlateFn, plateCreationCb);
    });

    describe("Pefrom Intra Assay Analysis", () => {
      it("OQ 5.7.4 -> clicks on Precision and Acceptance Criteria link, clicks on Intra-Assay Tab", () => {
        PrecisionAcceptance.goToPrecisionAcceptence();
        PrecisionAcceptance.goToIntraAssayTab();
      });
    });
  });

  describe("Test Script 5-8: Perform Hook Effect test", () => {
    before(() => {
      HookEffect.goToHook();
    });

    describe("OQ 5.8.3 -> Add 1 dataset and 1 plate", () => {
      const importPlateFn = plateNumber => HookEffect.importCsvFileforPlateForHookEffect(plateNumber);
      const plateCreationCb = () => {
        it("Click on Summary tab, change plate status from saved to accepted.", () => {
          PlateService.acceptPlate();
        });
      };
      StudyService.addDatasetAndPlates(1, 1, "Hook Effect Template", importPlateFn, plateCreationCb);
    });

    describe("Perfrom Hook Effect Test", () => {
      it("OQ 5.8.4 -> User clicks on the Hook Effect link, on the Dataset1 link then on the Hook Effect test tab. ", () => {
        HookEffect.goToHook();
        cy.goToDataset(1);
        HookEffect.clickonHookTest();
      });

      it("OQ 5.8.5 -> User selects the only data set radio button and clicks Add New Hook Effect test button.Select Pro1 radio button and ensure the Exclude sample...checkbox is checked and click Next button and then next button on the following screen. Give result a name and save and provide E signature. Select Pro1 radio button and ensure the Exclude sample...checkbox is checked and click Next button and then next button on the following screen. Give result a name and save and provide E signature.", () => {
        HookEffect.clickonP1RdatioBtn();
        HookEffect.clickOnNewHookTest();
        HookEffect.clickonPro1();
        TiterCutpoint.clickOnNext1();
        TiterCutpoint.clickOnNext2();
        Sensitivity.giveResultNameCommentForPlate(1);
        cy.provideEsign();
      });
    });
  });

  describe("Test Script 5-9: Perform Selectivity test", () => {
    before(() => {
      Selectivity.goToSelectivity();
    });

    describe("OQ 5.9.3(b)-> User clicks on Selectivity Link and then adds a dataset of 8 plates", () => {
      const importPlateFn = plateNumber => Selectivity.importCsvFileforPlateForSelectivity(plateNumber);
      const plateCreationCb = () => {
        it("Click on Summary tab, change plate status from saved to accepted.", () => {
          PlateService.acceptPlate();
        });
      };
      StudyService.addDatasetAndPlates(1, 8, "Selectivity Template", importPlateFn, plateCreationCb, true, [[1, 2, 3, 4, 1, 2, 5, 6]]);
    });

    describe("OQ 5.9.4 Peform Selectivity for all plates", () => {
      it("Navigates to dataset 1 Selectivity tab", () => {
        Selectivity.goToSelectivity();
        cy.goToDataset(1);
        Selectivity.goToSelectivityTest();
      });

      times(8, plateIndex => {
        const plateNumber = plateIndex + 1;
        const groups = [6, 7].includes(plateIndex)
          ? ["Male", "Female"]
          : ["Pool", "Male", "Female"];

        groups.forEach(group => {
          it(`Perform Selectivity Test for ${group} group of Plate ${plateNumber}`, () => {
            Selectivity.performSelectivityTest(plateNumber, group);
          });
        });
      });
    });

    describe("Peform Final Selectivity Test", () => {
      it("OQ 5.9.5 -> User navigates to Selectivity and click on “Final Selectivity” ", () => {
        Selectivity.goToSelectivity();
        Selectivity.goToFinalSelectivity();
        cy.screenshot();
      });
    });
  });

  describe("Test Script 5-10: Perform Drug Tolerance test", () => {
    before(() => {
      DrugTolerance.goToDrugTolerance();
    });

    describe("OQ 5.10.3-> User clicks on Drug Tolerance link and then adds a new dataset then add 2 plates.", () => {
      const importPlateFn = plateNumber => DrugTolerance.importCsvFileforPlateForDrug(plateNumber);
      const plateCreationCb = () => {
        it("Click on Summary tab, change plate status from saved to accepted.", () => {
          PlateService.acceptPlate();
        });
      };

      StudyService.addDatasetAndPlates(1, 2, "Drug Tolerance Template", importPlateFn, plateCreationCb, true);
    });

    describe("Peform Drug Tolerance Test", () => {
      it("OQ 5.10.4-> User clicks on the Drug Tolerance link, on the Dataset1 link then on the Drug Tolerance test tab. User will perform the test for each of the plates. User will run multiple tests for each group on each plate. For example: select D1_P1_NewPlate and Add New Drug Tolerance Test, select radio button for DTR_Dru_HPC and click on Next and Next again. Give the result a name, save and Provide E Signature.Repeat for both groups on this plate and then both plates. There should be 4 results when you are finished.Take Screenshot", () => {
        DrugTolerance.goToDrugTolerance();
        cy.goToDataset(1);
        DrugTolerance.goToDrugTest();

        const plates = [1, 2];

        plates.forEach(plate => {
          const choiceLocator = plate === 1 ? ["DtrDruHpc", "DtrDruLpc3"] : ["DtrDruLpc1", "DtrDruLpc2"];
          const choices = plate === 1 ? ["HPC", "LPC"] : ["LPC1", "LPC2"];

          choiceLocator.forEach((locator, index) => {
            cy.checkPlateCheckbox(plate);
            DrugTolerance.clickOnStartNewDrug();
            DrugTolerance.selectChoiceForDrug(locator);
            cy.clickOnNextStepBtn();
            cy.get('.loading').should('be.visible');
            cy.get('.loading').should('not.exist');
            cy.clickOnNextStepBtn();
            DrugTolerance.giveResultNameCommentForPlateAndChoice(plate, choices[index]);
            cy.provideEsign();
          });
        });
        cy.screenshot();
      });
    });
  });


  describe("Test Script 5-11: Perform Stability Test", () => {
    before(() => {
      Stability.goToStability();
    });

    describe("OQ 5.11.3-> User clicks on Stability link and then adds a new dataset and a plate", () => {
      const importPlateFn = plateNumber => Stability.importCsvFileforPlateForStability(plateNumber);
      const plateCreationCb = () => {
        it("Click on Summary tab, change plate status from saved to accepted.", () => {
          PlateService.acceptPlate();
        });
      };

      StudyService.addDatasetAndPlates(1, 1, "Stability Template", importPlateFn, plateCreationCb);
    });

    describe("Peform Stability Test", () => {
      it("OQ 5.11.4-> User clicks on the Stability link, on the Dataset1 link then on the Stability test tab. User will perform the test for the plate for each of the 4 groups. For example: select D1_P1_NewPlate and Add New Stability Test, select radio button for ST_HPC and click on Next. Give the result a name, save and Provide E Signature.Repeat for all groups on this plate. There should be 4 results when you are finished.Take Screenshot", () => {
          Stability.goToStability();
          cy.goToDataset(1);
          Stability.goToStabilityTest();

          let choiceLocators = ["StHpc", "StLpc", "FtHpc", "FtLpc"];
          let choices = ["ST_HPC", "ST_LPC", "FT_HPC", "FT_LPC"];

          choiceLocators.forEach((locator, index) => {
            cy.checkPlateCheckbox(1);
            Stability.clickOnStartNewStability();
            Stability.selectChoice(locator);
            Stability.clickOnTestStability();
            Stability.giveResultNameCommentForPlateAndChoice(1, choices[index]);
            cy.provideEsign();
          });
          cy.screenshot();
        });
    });
  });

  describe("Test Script 5-12: Perform Summary Precision test", () => {
    // 5.12 Summary
    it("OQ 5.12.3-> User clicks on Summary Precision link and then clicks on Add New Summary Precision button.", () => {
      Summary.goToSummary();
      Summary.clickAddSummary();
    });

    it("OQ 5.12.4 -> User selects only the Precision and Acceptance results (PAC Criteria) and clicks on calculate precision button. Click on the next button on 4 following screens and finally Save Result and provide E Signature.", () => {
      Summary.uncheckAllExceptPAV();
      Summary.clickCalculate();
      cy.clickOnNextStepBtn();
      cy.clickOnNextStepBtn();
      cy.clickOnNextStepBtn();
      cy.clickOnNextStepBtn();
      Summary.clickSave();
      cy.provideEsign();
      cy.screenshot({capture: "fullPage"});
    });
  });

  // // 6.1 to 6.3 are commentted out for this realase
  // // validationPlan  6.1

  // /*it("OQ 6.1.3-> User clicks on Documents and Validation plan in the nav bar. User ensures that test site information is correct, selects “validation Plan Template” from the template drop down and clicks on “Start Validation Plan” button. ", () => {
  //   validationPlan.goToDocument();
  //   validationPlan.goToValidaionPlan();
  //   validationPlan.clickStartValidation();
  // });

  // it("OQ 6.1.4-> User clicks on Contributors tab and adds 3 different contributors to the study.The user types required are: 1 “prepare by” user, 1 “review by” user and 1 “approve by” user. Click on update after providing required data.", () => {
  //   validationPlan.goToContributor();
  //   validationPlan.clickOnAdd();

  //   validationPlan.selectPrepareBy();
  //   validationPlan.addDetailsforPrepare();
  //   validationPlan.clickOnAdd();

  //   validationPlan.selectReviewBy();
  //   validationPlan.addDetailsforReview();
  //   validationPlan.clickOnAdd();

  //   validationPlan.selectApproveBy();
  //   validationPlan.addDetailsforApprove();
  //   validationPlan.clickOnUpdate();
  // });

  // it("OQ 6.1.5-> User clicks on Sponsor(s) tab and clicks Add button, provides required data fields and then clicks update.", () => {
  //   validationPlan.clickOnSponsor();
  //   validationPlan.clickOnAdd();
  //   validationPlan.addDetailsforSponsor();
  //   validationPlan.clickOnUpdate();
  // });

  // it("OQ 6.1.6-> User clicks on document tab. User clicks on << icon (next to save button) to view default table of contents resulting from use of validation plan template.", () => {
  //   validationPlan.clickOnDocumenTab();
  //   validationPlan.addNewSection();
  //   cy.wait(100);
  // });

  // it("OQ 6.1.7 & 8-> User clicks on the “Add Table/Info” button and then selects the “Info” button and then clicks the radio button next to “Review Person Info” and clicks on Add button.", () => {
  //   validationPlan.clickOnAddTable();
  //   validationPlan.clickOnInfo();
  //   validationPlan.addReviewer();
  //   validationPlan.clickOnAdd();
  //   //validationPlan.clickonSave();
  // });

  // it("OQ 6.1.9-> User clicks on the New Section button and where the name “New Section” appears, replaces the text with “Configuration Details” and clicks save button.", () => {
  //   validationPlan.addNewSection();
  //   cy.wait(100);
  //   validationPlan.renameNewSection();
  // });

  // it("OQ 6.1.10-> User clicks on +Sub-Section and changes the name to Acceptance Criteria then User clicks on the “Add Table/Info” button and then selects the Config button and then clicks the radio button next to Acceptance Criteria and clicks on Add button and clicks on the save icon.", () => {
  //   validationPlan.addNewSubSection();
  //   validationPlan.renameSubSec();
  //   validationPlan.selectConfig();
  //   validationPlan.addAcceptCriteria();
  //   validationPlan.clickOnAdd();
  // });

  // it("OQ 6.1.11&12->User clicks on Sub section next to the Configuration Details and adds 12 more subsections. User replaces the New Section text with the following subsection titles.Quality Control Screening Cutpoint Confirmatory Cutpoint Titer Cutpoint Precision and Acceptance Criteria Intra Assay Precision and Acceptance Criteria Controls Sensitivity Hook Effect Selectivity Stability Short Term", () => {
  //   validationPlan.addQC();
  //   validationPlan.addSc();
  //   validationPlan.addCC();
  //   validationPlan.addTC();
  //   validationPlan.addPAC();
  //   validationPlan.addPAControl();
  //   validationPlan.addSensi();
  //   validationPlan.addHook();
  //   validationPlan.addSelectivity();
  //   validationPlan.addStable();
  //   validationPlan.clickonSave();
  // });

  // it("OQ 6.1.13,14&15-> User navigates to Validation Plan then clicks on “Tools” tab and clicks on the PDF icon then clicks on word icon  ", () => {
  //   validationPlan.goToTool();
  //   validationPlan.goToWord();
  //   validationPlan.goToPdf();
  //   Ada.reloadStudy();
  // });

  // // 6.2

  // it("OQ 6.2.3-> User clicks on Documents and Validation report in the nav bar. User ensures that test site information is correct, selects Report Template” from the template drop down and clicks on “Start Report” button. User records time between clicking “Start Report” and When report is displayed.", () => {
  //   validationPlan.goToDocument();
  //   statisticPlan.goToStatisticPlan();
  //   statisticPlan.clickStartStatistic();
  // });

  // it("OQ 6.2.4-> User clicks on Contributors tab and adds 3 different contributors to the study.The user types required are: 1 “prepare by” user, 1 “review by” user and 1 “approve by” user. Click on update after providing required data.", () => {
  //   validationPlan.goToContributor();
  //   validationPlan.clickOnAdd();

  //   validationPlan.selectPrepareBy();
  //   validationPlan.addDetailsforPrepare();
  //   validationPlan.clickOnAdd();

  //   validationPlan.selectReviewBy();
  //   validationPlan.addDetailsforReview();
  //   validationPlan.clickOnAdd();

  //   validationPlan.selectApproveBy();
  //   validationPlan.addDetailsforApprove();
  //   validationPlan.clickOnUpdate();
  // });

  // it("OQ 6.2.5-> User clicks on Sponsor(s) tab and clicks Add button, provides required data fields and then clicks update.", () => {
  //   validationPlan.clickOnSponsor();
  //   validationPlan.clickOnAdd();
  //   validationPlan.addDetailsforSponsor();
  //   validationPlan.clickOnUpdate();
  // });

  // it("OQ 6.2.8-> User adds a new section under documents as “13. Results and Discussion” ", () => {
  //   validationPlan.clickOnDocumenTab();
  //   validationPlan.addNewSection();
  //   cy.wait(100);
  //   validationPlan.addNewSection();
  //   cy.wait(100);
  //   statisticPlan.renameNewSection();
  // });

  // it("OQ 6.2.9&10-> User adds a new subsection as ‘13.1.1. Screening Cut Point’ and  selects ‘Add Table info’ and selects ‘Data’User selects the data option ‘Approved Screening Cutpoint’ and selects ‘Add’", () => {
  //   statisticPlan.approveSc();
  //   statisticPlan.approvecc();
  //   statisticPlan.approvetc();
  //   statisticPlan.approvesensi();
  //   statisticPlan.approvePreci();
  //   statisticPlan.approvedrug();
  //   statisticPlan.approveselect();
  //   validationPlan.clickonSave();
  // });

  // it("OQ 6.2.14,15&16-> User navigates to Validation Plan then clicks on “Tools” tab and clicks on the PDF icon then clicks on word icon  ", () => {
  //   validationPlan.goToTool();
  //   validationPlan.goToWord();
  //   validationPlan.goToPdf();
  // });

  // // 6.3

  // it("OQ 6.3.3-> User navigates to the Configuration and clicks on Plate Template tab selects the first plate map scrolls down and clicks on icon.", () => {
  //   Ada.navigateToConfigPage();
  //   validationReport.goToPlateMap();
  //   validationReport.clickFirstPlate();
  //   validationReport.firstPlatePDF();
  // });

  // it("OQ 6.3.4-> User clicks on Documents and Statistical Report in the nav bar. User ensures that test site information is correct, selects “Blank” from the template drop down and clicks on “Start Report” button. ", () => {
  //   validationPlan.goToDocument();
  //   ScreeningCutpoint.clickonYes();
  //   validationReport.goToValidationReport();
  //   //validationReport.selectBlank();
  //   validationReport.clickStartReport();
  // });

  // it("OQ 6.3.5-> User navigates to the Info tab and modifies the Title and Test Site Information and clicks on “Update”", () => {
  //   //validationPlan.clickOnDocumenTab();
  //   validationReport.renameTitle();
  //   validationReport.renameTestTitle();
  //   validationReport.clickUpdate();
  //   cy.screenshot();
  // });

  // it("OQ 6.3.6-> User clicks on Contributors tab and adds 4 different contributors to the study.", () => {
  //   validationPlan.goToContributor();
  //   validationPlan.clickOnAdd();

  //   validationPlan.selectPrepareBy();
  //   validationPlan.addDetailsforPrepare();
  //   validationPlan.clickOnAdd();

  //   validationPlan.selectReviewBy();
  //   validationPlan.addDetailsforReview();
  //   validationPlan.clickOnAdd();

  //   validationPlan.selectApproveBy();
  //   validationPlan.addDetailsforApprove();
  //   validationPlan.clickOnAdd();

  //   validationReport.selectParticipate();
  //   validationReport.addDetailsforParticipate();
  //   validationPlan.clickOnUpdate();
  //   cy.screenshot();
  // });

  // it("OQ 6.3.7-> User clicks on Sponsor(s) tab and clicks Add button twice to add two sponsors, provides the following required data fields and then clicks update.", () => {
  //   validationPlan.clickOnSponsor();
  //   validationPlan.clickOnAdd();
  //   validationPlan.addDetailsforSponsor();
  //   validationPlan.clickOnAdd();
  //   validationReport.addDetailsforSponsor2();
  //   validationPlan.clickOnUpdate();
  //   cy.screenshot();
  // });

  // it("OQ 6.3.8-> User clicks on the “Remove” button for the second sponsor and clicks on “Update” ", () => {
  //   validationPlan.clickOnSponsor();
  //   validationReport.removeSecondSponsor();
  //   validationPlan.clickOnUpdate();
  //   cy.screenshot();
  // });

  // it("OQ 6.3.9-> User clicks on the document tab. User clicks on “+New Section” and replace the “New Section” title with “Configuration”  and clicks save button.", () => {
  //   validationPlan.clickOnDocumenTab();
  //   validationPlan.addNewSection();
  //   cy.wait(100);
  //   validationReport.renameSec1();
  //   validationReport.addTestTilte();
  //   cy.wait(100);
  //   validationPlan.addNewSection();
  //   cy.wait(100);
  //   validationPlan.renameNewSection();
  // });

  // it("OQ 6.3.10-> User clicks on ‘Sub section’ and changes the name to ‘ Acceptance Criteria’ then User clicks on the “Add Table/Info” button and then selects the “Config” button and then clicks the radio button next to “ Acceptance Criteria” and clicks on Add button and clicks on the save icon.", () => {
  //   validationPlan.addNewSubSection();
  //   validationPlan.renameSubSec();
  //   validationPlan.selectConfig();
  //   validationPlan.addAcceptCriteria();
  //   validationPlan.clickOnAdd();
  //   cy.wait(500);
  // });

  // it("OQ 6.3.12-> User navigates to “Acceptance Criteria” then clicks on “+Add Table/Info” then clicks on “Config”. Take Screenshot on the table.User clicks on the “X” icon to close as the user has already added the Config for Acceptance criteria in previous steps", () => {
  //   validationPlan.selectConfig();
  //   validationPlan.addAcceptCriteria();
  //   validationPlan.clickOnAdd();
  //   cy.wait(500);
  //   validationReport.removeExtra();
  //   cy.wait(500);
  // });

  // it("OQ 6.3.13&14->User clicks on Sub section next to the Configuration Details and adds 12 more subsections. User replaces the New Section text with the following subsection titles.Quality Control Screening Cutpoint Confirmatory Cutpoint Titer Cutpoint Precision and Acceptance Criteria Intra Assay Precision and Acceptance Criteria Controls Sensitivity Hook Effect Selectivity Stability Short Term", () => {
  //   validationPlan.addQC();
  //   validationPlan.addSc();
  //   validationPlan.addCC();
  //   validationPlan.addTC();
  //   validationPlan.addPAC();
  //   validationPlan.addPAControl();
  //   validationPlan.addSensi();
  //   validationPlan.addHook();
  //   validationPlan.addSelectivity();
  //   validationPlan.addStable();
  // });

  // it("OQ 6.3.15&16-> User clicks on the “Add Table/Info” button and then selects the “Info” button and then clicks the radio button next to “Review Person Info” and clicks on Add button.", () => {
  //   validationReport.addReview();
  //   validationPlan.clickonSave();
  //   cy.screenshot();
  // });

  // it("OQ 6.3.17-> User clicks on the document tab. User clicks on “+New Section” and replace the “New Section” title with “Study Data”  and clicks save button.", () => {
  //   validationPlan.addNewSection();
  //   cy.wait(100);
  //   validationReport.renameThirdSection();
  // });

  // it("OQ 6.3.18,19,20-> User clicks on ‘+Sub-section’ and changes the name to ‘ Approved Screening Cutpoint’ then User clicks on the “Add Table/Info” button and then selects the “Data” button. User clicks the radio button next to “Approved Screening Cutpoint” and clicks on Add button and clicks on the save icon.User repeats the last two steps for all the approved results and adds appropriate subsection s for each: -Confirmatory Cutpoint-Add Approved Confirmatory Cutpoint-Sensitivity-Add Final Sensitivity-Inter and Intra-Assay Precision of Controls- Add Intra and Inter Precision -Drug Tolerance- Add Drug Tolerance Result-Selectivity- Add Final Selectivity Click on the Save icon", () => {
  //   validationReport.approveSc();
  //   validationReport.approvecc();
  //   validationReport.approvetc();
  //   validationReport.approvesensi();
  //   validationReport.approvePreci();
  //   validationReport.approvedrug();
  //   validationReport.approveselect();
  //   validationPlan.clickonSave();
  // });


  // it("OQ 6.3.25,26-> User Navigates to the Appendix Tab and enters the SCP Template 1 then click on “Choose File”.User selects the plate template file downloaded and clicks on “Add”", () => {
  //   validationReport.goToAppendix();
  //   validationReport.addSCP();
  //   validationPlan.clickOnAdd();
  //   validationPlan.clickOnUpdate();
  // });

  // it("OQ 6.3.27,28-> User navigates to Validation Plan then clicks on “Tools” tab and clicks on the PDF icon then clicks on word icon  ", () => {
  //   validationPlan.goToTool();
  //   validationPlan.goToWord();
  //   validationPlan.goToPdf();
  // });*/

  // // 5.13 ->Create a new study

  // it("OQ 5.13.2-> clicks on Add New button and select New Study", () => {
  //   Ada.selectProgramToAddOtherStudy();
  //   Ada.clickNewStudyFromAddNewButton();
  //   Ada.createNewStudyForAutoImportExternalStudyData();
  // });

  // // Configuration
  // it("OQ 5.13.3-> User clicks on configuration link and drop down next to configuration title and chooses Import Config. User selects the Configuration.json file from the autoimport folder provided, clicks the import button, clicks update and provides E Signature.", () => {
  //   Ada.navigateToConfigPage();
  //   Ada.importConfigFileforAutoImportExternalStudyData();
  //   Ada.updateConfiguration();
  //   cy.provideEsign();
  //   Ada.navigateToConfigPage();
  //   studyAnalysis.importDataFromConfig();
  //   ScreeningCutpoint.navigateToScreeningCutpointFromConfiguration();
  //   cy.confirmNotification();
  // });

  // // Cutpoint Analysis
  // it("OQ 5.13.4-> Navigate to Screening cutpoint then click on Cutpoint Analysis andTake Screenshot", () => {
  //   ScreeningCutpoint.goToScreeningCutpoint();
  //   ScreeningCutpoint.goToCutpointOutlierTab();
  //   cy.screenshot({capture: "fullPage"});
  // });

  // // 5.14
  // it("OQ 5.14.2-> Create a new study", () => {
  //   Ada.selectProgramToAddOtherStudy();
  //   Ada.clickNewStudyFromAddNewButton();

  //   Ada.createNewStudyForReuseSCPDataForCCP();
  // });

  // // Configuration
  // it("OQ 5.14.3-5.14.4-> User clicks on configuration link and drop down next to configuration title and chooses Import Config. User selects the Configuration.json file from the autoimport folder provided, clicks the import button, clicks update and provides E Signature.", () => {
  //   Ada.navigateToConfigPage();
  //   Ada.importConfigFileForReuseSCPDataForCCP();
  //   Ada.updateConfiguration();
  //   cy.provideEsign();
  //   ScreeningCutpoint.navigateToScreeningCutpointFromConfiguration();
  //   cy.confirmNotification();
  // });

  // it("OQ 5.14.5-> User adds 4 datsets with 3 plates each.", () => {
  //   ScreeningCutpoint.goToScreeningCutpoint();

  //   // Add 4 datasets with 3 plates each
  //   for (let dataset = 1; dataset < 5; dataset++) {
  //     cy.addNewDataset();

  //     for (let plate = 1; plate < 4; plate++) {
  //       // Go to the dataset
  //       ScreeningCutpoint.goToDatasetForReuseSCPDataForCCP(dataset);

  //       // Add a new plate
  //       cy.addNewPlate();

  //       // Select template based on the plate number
  //       ScreeningCutpoint.selectTemplateForReuseSCPDataForCCP(plate);

  //       // Proceed to the next step
  //       cy.clickOnNextStepBtn();

  //       // Import CSV file for the current plate and dataset
  //       ScreeningCutpoint.importCsvFileforPlateForReuseSCPDataForCCP(
  //         plate,
  //         dataset
  //       );

  //       // Complete the process
  //       cy.clickOnNextStepBtn();
  //       ScreeningCutpoint.clickNextToSavePlate();

  //       // Perform e-sign for reuse
  //       cy.provideEsign();

  //       // Start and accept NcEv
  //       ScreeningCutpoint.goToNcEvTab();
  //       ScreeningCutpoint.startNcEv();
  //       ScreeningCutpoint.acceptNcEv();
  //       cy.provideEsign();

  //       // Go to the Summary tab, change status, and e-sign
  //       ScreeningCutpoint.goToSummaryTab();
  //       ScreeningCutpoint.changePlateStatusToAccept();
  //       ScreeningCutpoint.acceptPlate();
  //       cy.provideEsign();
  //     }
  //   }
  // });

  // it("OQ 5.14.6-> User goes to ConfirmatoryCutpoint. ", () => {
  //   ConfirmatoryCutpoint.goToConfirmatoryCutpoint();
  //   cy.screenshot({capture: "fullPage"});
  // });

  // // 5.15
  // it("OQ 5.15.2-> User creates a new study called Test Study 5-15 Manual under Test Project as described in the previous steps.", () => {
  //   Ada.selectProgramToAddOtherStudy();
  //   Ada.clickNewStudyFromAddNewButton();

  //   pageForNoNormalization.createNewStudyForNoNormalization();
  // });

  // it("OQ 5.15.3-> User selects the configuration link in the left hand navigation bar.", () => {
  //   Ada.navigateToConfigPage();
  // });

  // it("OQ 5.15.4-> User selects the drop down icon next to the Configuration title and chooses the Import Config option. Use clicks the Choose file button and then navigates to “SCP Validation” folder and selects the Configuration SN.json file", () => {
  //   pageLogSByN.importConfigFileFromConfiguration();
  //   pageForNoNormalization.importConfigForNoNormalization();
  // });

  // it("OQ 5.15.5 & 5.15.6-> User clicks the Update button", () => {
  //   Ada.updateConfiguration();
  //   cy.provideEsign();
  //   ScreeningCutpoint.navigateToScreeningCutpointFromConfiguration();
  //   cy.confirmNotification();
  // });

  // it("OQ 5.15.7 to OQ 5.15.14-> User clicks on Screening Cutpoint and Add New Dataset to create Dataset1 ", () => {
  //   ScreeningCutpoint.goToScreeningCutpoint();
  //   // Add 2 datasets with 3 plates each
  //   for (let dataset = 1; dataset < 3; dataset++) {
  //     cy.addNewDataset();

  //     for (let plate = 1; plate < 4; plate++) {
  //       // Go to the dataset
  //       ScreeningCutpoint.goToDatasetForScreeningCutpoint(dataset);

  //       // Add a new plate
  //       cy.addNewPlate();

  //       // Select template based on the plate number
  //       pageLogSByN.selectTemplate();
  //       pageLogSByN.clickOnYesRadioButton();
  //       pageLogSByN.clickOnChooseFile();
  //       pageLogSByN.importPlateID(plate, dataset);

  //       // Proceed to the next step
  //       cy.clickOnNextStepBtn();

  //       // Import CSV file for the current plate and dataset
  //       pageLogSByN.importPlateOD(plate, dataset);

  //       // Complete the process
  //       cy.clickOnNextStepBtn();
  //       ScreeningCutpoint.clickNextToSavePlate();

  //       // Perform e-sign
  //       cy.provideEsign();

  //       // Start and accept NcEv
  //       ScreeningCutpoint.goToNcEvTab();
  //       ScreeningCutpoint.startNcEv();
  //       ScreeningCutpoint.acceptNcEv();
  //       cy.provideEsign();

  //       // Go to the Summary tab, change status, and e-sign
  //       ScreeningCutpoint.goToSummaryTab();
  //       ScreeningCutpoint.changePlateStatusToAccept();
  //       ScreeningCutpoint.acceptPlate();
  //       cy.provideEsign();
  //     }
  //   }
  // });

  // it("OQ 5.15.15 -> Click on the Screening Cutpoint link and then the Analytical Outlier tab and click on the Start Analytical Outlier Analysis button. Scroll down to bottom of screen and click the “Accept Analytical Outlier Analysis” Button.", () => {
  //   ScreeningCutpoint.performScreeningCutpointAnalyticalOutlierAnalysis();
  // });

  // it("OQ 5.15.16 -> Click on the Screening Cutpoint link and then the Biological Outlier tab and click on the Start Biological Outlier Analysis button. Scroll down to bottom of screen and click the “Accept Biological Outlier Analysis” Button.", () => {
  //   ScreeningCutpoint.performScreeningCutpointBiologicalOutlierAnalysis();
  // });

  // it("OQ 5.15.17 -> Click on the screening cutpoint link and then the cutpoint analysis tab. Click the New Screening Cutpoint Analysis button.", () => {
  //   ScreeningCutpoint.goToScreeningCutpoint();
  //   ScreeningCutpoint.goToCutpointOutlierTab();
  //   pageLogSByN.startCutPointAnalysis();
  // });

  // it("OQ 5.15.30 - 5.15.34 -> With the parametric tab selected, choose both datasets, select the NegC radio button and click the Start Analysis button.", () => {
  //   pageLogSByN.performScreeningCutpointOutlierAnalysisForParametric();

  //   pageLogSByN.performScreeningCutpointOutlierAnalysisForNonParametric();
  // });

  // it("OQ 5.15.35-> User creates a new study called Test Study 5-15 Auto under Test Project as described in the previous steps.", () => {
  //   Ada.selectProgramToAddOtherStudy();
  //   Ada.clickNewStudyFromAddNewButton();

  //   pageForNoNormalization.createNewStudyForNoNormalizationAuto();
  // });

  // it("OQ 5.15.36-> User clicks on configuration link and drop down next to configuration title and chooses Import Config. User selects the Configuration LogS/N.json file from the SCP Validation folder provided, clicks the import button, clicks update and provides E ", () => {
  //   Ada.navigateToConfigPage();
  //   pageLogSByN.importConfigFileFromConfiguration();
  //   pageForNoNormalization.importConfigForNoNormalization();
  //   Ada.updateConfiguration();
  //   cy.provideEsign();
  // });

  // it("OQ 5.15.37-> User clicks on Configuration drop down and selects Import Data. For the Sample File, select the sample.xlsx from the SCP ValidationImport files folder. For the control file, select the control.xlsx file from the same folder.", () => {
  //   Ada.navigateToConfigPage();
  //   pageLogSByN.importSampleAndControlExcels();
  //   ScreeningCutpoint.navigateToScreeningCutpointFromConfiguration();
  //   cy.confirmNotification();

  //   ScreeningCutpoint.goToScreeningCutpoint();
  //   ScreeningCutpoint.goToCutpointOutlierTab();
  //   cy.screenshot({capture: "fullPage"});
  // });

  // // 5.16
  // it("OQ 5.16.2-> User creates a new study called Test Study 5-16 Manual under Test Project as described in the previous steps.", () => {
  //   Ada.selectProgramToAddOtherStudy();
  //   Ada.clickNewStudyFromAddNewButton();

  //   pageSByN.createNewStudyForSByN();
  // });

  // it("OQ 5.16.3-> User selects the configuration link in the left hand navigation bar.", () => {
  //   Ada.navigateToConfigPage();
  // });

  // it("OQ 5.16.4-> User selects the drop down icon next to the Configuration title and chooses the Import Config option. Use clicks the Choose file button and then navigates to “SCP Validation” folder and selects the Configuration SN.json file", () => {
  //   pageLogSByN.importConfigFileFromConfiguration();
  //   pageSByN.importConfigForSByN();
  // });

  // it("OQ 5.16.5 & 5.16.6-> User clicks the Update button", () => {
  //   Ada.updateConfiguration();
  //   cy.provideEsign();
  //   ScreeningCutpoint.navigateToScreeningCutpointFromConfiguration();
  //   cy.confirmNotification();
  // });

  // it("OQ 5.16.7 to OQ 5.16.23-> User clicks on Screening Cutpoint and Add New Dataset to create Dataset1 ", () => {
  //   ScreeningCutpoint.goToScreeningCutpoint();
  //   // Add 2 datasets with 3 plates each
  //   for (let dataset = 1; dataset < 3; dataset++) {
  //     cy.addNewDataset();

  //     for (let plate = 1; plate < 4; plate++) {
  //       // Go to the dataset
  //       ScreeningCutpoint.goToDatasetForScreeningCutpoint(dataset);

  //       // Add a new plate
  //       cy.addNewPlate();

  //       // Select template based on the plate number
  //       pageLogSByN.selectTemplate();
  //       pageLogSByN.clickOnYesRadioButton();
  //       pageLogSByN.clickOnChooseFile();
  //       pageLogSByN.importPlateID(plate, dataset);

  //       // Proceed to the next step
  //       cy.clickOnNextStepBtn();

  //       // Import CSV file for the current plate and dataset
  //       pageLogSByN.importPlateOD(plate, dataset);

  //       // Complete the process
  //       cy.clickOnNextStepBtn();
  //       ScreeningCutpoint.clickNextToSavePlate();

  //       // Perform e-sign
  //       cy.provideEsign();

  //       // Start and accept NcEv
  //       ScreeningCutpoint.goToNcEvTab();
  //       ScreeningCutpoint.startNcEv();
  //       ScreeningCutpoint.acceptNcEv();
  //       cy.provideEsign();

  //       // Start and accept normdata
  //       pageLogSByN.goToNormDataTab();
  //       pageLogSByN.clickOnStartPlateEv();
  //       pageLogSByN.clickOnShowData();
  //       pageLogSByN.clickOnAcceptData();
  //       cy.provideEsign();

  //       // Go to the Summary tab, change status, and e-sign
  //       ScreeningCutpoint.goToSummaryTab();
  //       ScreeningCutpoint.changePlateStatusToAccept();
  //       ScreeningCutpoint.acceptPlate();
  //       cy.provideEsign();
  //     }
  //   }
  // });

  // it("OQ 5.16.24 -> Click on the Screening Cutpoint link and then the Analytical Outlier tab and click on the Start Analytical Outlier Analysis button. Scroll down to bottom of screen and click the “Accept Analytical Outlier Analysis” Button.", () => {
  //   ScreeningCutpoint.performScreeningCutpointAnalyticalOutlierAnalysis();
  // });

  // it("OQ 5.16.25 -> Click on the Screening Cutpoint link and then the Biological Outlier tab and click on the Start Biological Outlier Analysis button. Scroll down to bottom of screen and click the “Accept Biological Outlier Analysis” Button.", () => {
  //   ScreeningCutpoint.performScreeningCutpointBiologicalOutlierAnalysis();
  // });

  // it("OQ 5.16.27 -> Click on the screening cutpoint link and then the cutpoint analysis tab. Click the New Screening Cutpoint Analysis button.", () => {
  //   ScreeningCutpoint.goToScreeningCutpoint();
  //   ScreeningCutpoint.goToCutpointOutlierTab();
  //   pageLogSByN.startCutPointAnalysis();
  // });

  // it("OQ 5.16.28 - 5.16.32 -> With the parametric tab selected, choose both datasets, select the NegC radio button and click the Start Analysis button.", () => {
  //   pageLogSByN.performScreeningCutpointOutlierAnalysisForParametric();

  //   pageLogSByN.performScreeningCutpointOutlierAnalysisForNonParametric();
  // });

  // it("OQ 5.16.35-> User creates a new study called Test Study 5-18 Auto under Test Project as described in the previous steps.", () => {
  //   Ada.selectProgramToAddOtherStudy();
  //   Ada.clickNewStudyFromAddNewButton();

  //   pageSByN.createNewStudyForSByNAuto();
  // });

  // it("OQ 5.16.36-> User clicks on configuration link and drop down next to configuration title and chooses Import Config. User selects the Configuration LogS/N.json file from the SCP Validation folder provided, clicks the import button, clicks update and provides E ", () => {
  //   Ada.navigateToConfigPage();
  //   pageLogSByN.importConfigFileFromConfiguration();
  //   pageSByN.importConfigForSByN();
  //   Ada.updateConfiguration();
  //   cy.provideEsign();
  // });

  // it("OQ 5.16.37-> User clicks on Configuration drop down and selects Import Data. For the Sample File, select the sample.xlsx from the SCP ValidationImport files folder. For the control file, select the control.xlsx file from the same folder.", () => {
  //   Ada.navigateToConfigPage();
  //   pageLogSByN.importSampleAndControlExcels();
  //   ScreeningCutpoint.navigateToScreeningCutpointFromConfiguration();
  //   cy.confirmNotification();
  //   ScreeningCutpoint.goToScreeningCutpoint();
  //   ScreeningCutpoint.goToCutpointOutlierTab();
  //   cy.screenshot({capture: "fullPage"});
  // });

  // // 5.17
  // it("OQ 5.17.2-> User creates a new study called Test Study 5-17 Manual under Test Project as described in the previous steps.", () => {
  //   Ada.selectProgramToAddOtherStudy();
  //   Ada.clickOnAddNew();
  //   Ada.clickonNewStudy();
  //   pageLogS.createNewStudyForLogS();
  // });

  // it("OQ 5.17.3-> User selects the configuration link in the left hand navigation bar.", () => {
  //   Ada.navigateToConfigPage();
  // });

  // it("OQ 5.17.4-> User selects the drop down icon next to the Configuration title and chooses the Import Config option. Use clicks the Choose file button and then navigates to “SCP Validation” folder and selects the Configuration LogSN.json file", () => {
  //   pageLogSByN.importConfigFileFromConfiguration();
  //   pageLogS.importConfigForLogS();
  // });

  // it("OQ 5.17.5 & 5.17.6-> User clicks the Update button", () => {
  //   Ada.updateConfiguration();
  //   cy.provideEsign();
  //   ScreeningCutpoint.navigateToScreeningCutpointFromConfiguration();
  //   cy.confirmNotification();
  // });

  // it("OQ 5.17.7 to oq 5.17.23-> User clicks on Screening Cutpoint and Add New Dataset to create Dataset1 ", () => {
  //   ScreeningCutpoint.goToScreeningCutpoint();
  //   // Add 2 datasets with 3 plates each
  //   for (let dataset = 1; dataset < 3; dataset++) {
  //     cy.addNewDataset();

  //     for (let plate = 1; plate < 4; plate++) {
  //       // Go to the dataset
  //       ScreeningCutpoint.goToDatasetForScreeningCutpoint(dataset);

  //       // Add a new plate
  //       cy.addNewPlate();

  //       // Select template based on the plate number
  //       pageLogSByN.selectTemplate();
  //       pageLogSByN.clickOnYesRadioButton();
  //       pageLogSByN.clickOnChooseFile();
  //       pageLogSByN.importPlateID(plate, dataset);

  //       // Proceed to the next step
  //       cy.clickOnNextStepBtn();

  //       // Import CSV file for the current plate and dataset
  //       pageLogSByN.importPlateOD(plate, dataset);

  //       // Complete the process
  //       cy.clickOnNextStepBtn();
  //       ScreeningCutpoint.clickNextToSavePlate();

  //       // Perform e-sign
  //       cy.provideEsign();

  //       // Start and accept NcEv
  //       ScreeningCutpoint.goToNcEvTab();
  //       ScreeningCutpoint.startNcEv();
  //       ScreeningCutpoint.acceptNcEv();
  //       cy.provideEsign();

  //       // Start and accept normdata
  //       pageLogSByN.goToNormDataTab();
  //       pageLogSByN.clickOnStartPlateEv();
  //       pageLogSByN.clickOnShowData();
  //       pageLogSByN.clickOnAcceptData();
  //       cy.provideEsign();

  //       // Go to the Summary tab, change status, and e-sign
  //       ScreeningCutpoint.goToSummaryTab();
  //       ScreeningCutpoint.changePlateStatusToAccept();
  //       ScreeningCutpoint.acceptPlate();
  //       cy.provideEsign();
  //     }
  //   }
  // });

  // it("OQ 5.17.24 -> Click on the Screening Cutpoint link and then the Analytical Outlier tab and click on the Start Analytical Outlier Analysis button. Scroll down to bottom of screen and click the “Accept Analytical Outlier Analysis” Button.", () => {
  //   ScreeningCutpoint.performScreeningCutpointAnalyticalOutlierAnalysis();
  // });

  // it("OQ 5.17.28 -> Click on the Screening Cutpoint link and then the Biological Outlier tab and click on the Start Biological Outlier Analysis button. Scroll down to bottom of screen and click the “Accept Biological Outlier Analysis” Button.", () => {
  //   ScreeningCutpoint.performScreeningCutpointBiologicalOutlierAnalysis();
  // });

  // it("OQ 5.17.29 -> Click on the screening cutpoint link and then the cutpoint analysis tab. Click the New Screening Cutpoint Analysis button.", () => {
  //   ScreeningCutpoint.goToScreeningCutpoint();
  //   ScreeningCutpoint.goToCutpointOutlierTab();
  //   pageLogSByN.startCutPointAnalysis();
  // });

  // it("OQ 5.17.30 - 5.17.34 -> With the parametric tab selected, choose both datasets, select the NegC radio button and click the Start Analysis button.", () => {
  //   pageLogSByN.performScreeningCutpointOutlierAnalysisForParametric();

  //   pageLogSByN.performScreeningCutpointOutlierAnalysisForNonParametric();
  // });

  // it("OQ 5.17.35-> User creates a new study called Test Study 5-17 Auto under Test Project as described in the previous steps.", () => {
  //   Ada.selectProgramToAddOtherStudy();
  //   Ada.clickNewStudyFromAddNewButton();

  //   pageLogS.createNewStudyForLogSAuto();
  // });

  // it("OQ 5.17.36-> User clicks on configuration link and drop down next to configuration title and chooses Import Config. User selects the Configuration LogS/N.json file from the SCP Validation folder provided, clicks the import button, clicks update and provides E ", () => {
  //   Ada.navigateToConfigPage();
  //   pageLogSByN.importConfigFileFromConfiguration();
  //   pageLogS.importConfigForLogS();
  //   Ada.updateConfiguration();
  //   cy.provideEsign();
  // });

  // it("OQ 5.17.37-> User clicks on Configuration drop down and selects Import Data. For the Sample File, select the sample.xlsx from the SCP ValidationImport files folder. For the control file, select the control.xlsx file from the same folder.", () => {
  //   Ada.navigateToConfigPage();
  //   pageLogSByN.importSampleAndControlExcels();
  //   ScreeningCutpoint.navigateToScreeningCutpointFromConfiguration();
  //   cy.confirmNotification();
  //   ScreeningCutpoint.goToScreeningCutpoint();
  //   ScreeningCutpoint.goToCutpointOutlierTab();
  //   cy.screenshot({capture: "fullPage"});
  // });

  // // 5.18
  // it("OQ 5.18.2-> User creates a new study called Test Study 5-18 Manual under Test Project as described in the previous steps.", () => {
  //   Ada.selectProgramToAddOtherStudy();
  //   Ada.clickNewStudyFromAddNewButton();

  //   pageLogSByN.createNewStudyForLogSByN();
  // });

  // it("OQ 5.18.3-> User selects the configuration link in the left hand navigation bar.", () => {
  //   Ada.navigateToConfigPage();
  // });

  // it("OQ 5.18.4-> User selects the drop down icon next to the Configuration title and chooses the Import Config option. Use clicks the Choose file button and then navigates to “SCP Validation” folder and selects the Configuration LogSN.json file", () => {
  //   pageLogSByN.importConfigFileFromConfiguration();
  //   pageLogSByN.importConfigForLogSByN();
  // });

  // it("OQ 5.18.5 & 5.18.6-> User clicks the Update button", () => {
  //   Ada.updateConfiguration();
  //   cy.provideEsign();
  //   ScreeningCutpoint.navigateToScreeningCutpointFromConfiguration();
  //   cy.confirmNotification();
  // });

  // it("OQ 5.18.7 to oq 5.18.26-> User clicks on Screening Cutpoint and Add New Dataset to create Dataset1 ", () => {
  //   ScreeningCutpoint.goToScreeningCutpoint();
  //   // Add 2 datasets with 3 plates each
  //   for (let dataset = 1; dataset < 3; dataset++) {
  //     cy.addNewDataset();

  //     for (let plate = 1; plate < 4; plate++) {
  //       // Go to the dataset
  //       ScreeningCutpoint.goToDatasetForScreeningCutpoint(dataset);

  //       // Add a new plate
  //       cy.addNewPlate();

  //       // Select template based on the plate number
  //       pageLogSByN.selectTemplate();
  //       pageLogSByN.clickOnYesRadioButton();
  //       pageLogSByN.clickOnChooseFile();
  //       pageLogSByN.importPlateID(plate, dataset);

  //       // Proceed to the next step
  //       cy.clickOnNextStepBtn();

  //       // Import CSV file for the current plate and dataset
  //       pageLogSByN.importPlateOD(plate, dataset);

  //       // Complete the process
  //       cy.clickOnNextStepBtn();
  //       ScreeningCutpoint.clickNextToSavePlate();

  //       // Perform e-sign
  //       cy.provideEsign();

  //       // Start and accept NcEv
  //       ScreeningCutpoint.goToNcEvTab();
  //       ScreeningCutpoint.startNcEv();
  //       ScreeningCutpoint.acceptNcEv();
  //       cy.provideEsign();

  //       // Start and accept normdata
  //       pageLogSByN.goToNormDataTab();
  //       pageLogSByN.clickOnStartPlateEv();
  //       pageLogSByN.clickOnShowData();
  //       pageLogSByN.clickOnAcceptData();
  //       cy.provideEsign();

  //       // start and accept analytical data
  //       pageLogSByN.goToAnalyticalTab();
  //       pageLogSByN.PerformAnalyticalAnalysis();
  //       pageLogSByN.clickOnAcceptAanlytical();
  //       cy.provideEsign();

  //       // Go to the Summary tab, change status, and e-sign
  //       ScreeningCutpoint.goToSummaryTab();
  //       ScreeningCutpoint.changePlateStatusToAccept();
  //       ScreeningCutpoint.acceptPlate();
  //       cy.provideEsign();
  //     }
  //   }
  // });

  // it("OQ 5.18.27 -> Click on the Screening Cutpoint link and then the Biological Outlier tab and click on the Start Biological Outlier Analysis button. Scroll down to bottom of screen and click the “Accept Biological Outlier Analysis” Button.", () => {
  //   ScreeningCutpoint.performScreeningCutpointBiologicalOutlierAnalysis();
  //   cy.screenshot({capture: "fullPage"});
  // });

  // it("OQ 5.18.29 -> Click on the screening cutpoint link and then the cutpoint analysis tab. Click the New Screening Cutpoint Analysis button.", () => {
  //   ScreeningCutpoint.goToScreeningCutpoint();
  //   ScreeningCutpoint.goToCutpointOutlierTab();
  //   pageLogSByN.startCutPointAnalysis();
  // });

  // it("OQ 5.18.30 - 5.18.34 -> With the parametric tab selected, choose both datasets, select the NegC radio button and click the Start Analysis button.", () => {
  //   pageLogSByN.performScreeningCutpointOutlierAnalysisForParametric();
  //   pageLogSByN.performScreeningCutpointOutlierAnalysisForNonParametric();
  //   cy.screenshot({capture: "fullPage"});
  // });

  // it("OQ 5.18.35-> User creates a new study called Test Study 5-18 Auto under Test Project as described in the previous steps.", () => {
  //   Ada.selectProgramToAddOtherStudy();
  //   Ada.clickNewStudyFromAddNewButton();

  //   pageLogSByN.createNewStudyForLogSByNAuto();
  // });

  // it("OQ 5.18.36-> User clicks on configuration link and drop down next to configuration title and chooses Import Config. User selects the Configuration LogS/N.json file from the SCP Validation folder provided, clicks the import button, clicks update and provides E ", () => {
  //   Ada.navigateToConfigPage();
  //   pageLogSByN.importConfigFileFromConfiguration();
  //   pageLogSByN.importConfigForLogSByN();
  //   Ada.updateConfiguration();
  //   cy.provideEsign();
  // });

  // it("OQ 5.18.5 & 5.18.6-> User clicks on Configuration drop down and selects Import Data. For the Sample File, select the sample.xlsx from the SCP ValidationImport files folder. For the control file, select the control.xlsx file from the same folder.", () => {
  //   Ada.navigateToConfigPage();
  //   pageLogSByN.importSampleAndControlExcels();
  //   ScreeningCutpoint.navigateToScreeningCutpointFromConfiguration();
  //   cy.confirmNotification();
  //   ScreeningCutpoint.goToScreeningCutpoint();
  //   ScreeningCutpoint.goToCutpointOutlierTab();
  //   cy.screenshot({capture: "fullPage"});
  // });

  // it("OQ 3.3.7-> create second new project", () => {
  //   Ada.selectProgramToAddOtherStudy();
  //   Ada.clickOnAddNew();
  //   Ada.clickOnNewProject();
  //   Ada.createSecondNewProject();
  // });

  // it("OQ 3.5.7-> create another new study", () => {
  //   Ada.clickNewStudyFromAddNewButton();
  //   Ada.createSecondNewStudy();
  // });

  // it("OQ 4.1.3-> User selects the configuration link in the left hand navigation bar", () => {
  //   Ada.navigateToConfigPage();
  // });
  // it("OQ 4.1.4-> select Import config button from dropdown and Import config.json", () => {
  //   Ada.importConfigFileFromConfiguration();
  // });
  // it("OQ 4.1.5-> clicks the Update button", () => {
  //   Ada.updateConfiguration();
  // });
  // it("OQ 4.1.6-> E Signature dialog opens", () => {
  //   cy.provideEsign();
  // });
  // it("OQ 4.1.7-> clicks the Approve button", () => {
  //   Ada.navigateToConfigPage();
  //   Ada.approveConfiguration();
  // });
  // it("OQ 4.1.8-> E Signature dialog opens", () => {
  //   cy.provideEsign();
  // });
  // it("OQ 4.2.4-> clicks the Unapprove button", () => {
  //   Ada.unapproveConfiguration();
  // });
  // it("OQ 4.2.5-> E Signature dialog opens", () => {
  //   cy.provideEsign();
  // });
  // it("OQ 4.3.4-> clicks the Reject button", () => {
  //   Ada.rejectConfiguration();
  // });
  // it("OQ 4.3.5-> E Signature dialog opens", () => {
  //   cy.provideEsign();
  // });
  // it("OQ 4.3.6-> clicks the Approve button", () => {
  //   Ada.approveConfiguration();
  // });
  // it("OQ 4.3.7-> E Signature dialog opens", () => {
  //   cy.provideEsign();
  //   login.logout();
  // });

});
