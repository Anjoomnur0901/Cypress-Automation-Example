import locatorForLogSByN from "../../locators/5-18-locators.json";
import ADA_LOCATORS from '../../locators/ada-locators/ada-locators.json';
import screeningCut from "../../locators/ada-locators/screening-cutpoint-locators.json";
import newProjectForm from "../../locators/new-project-locators.json";
import NEW_STUDY_LOCATORS from "../../locators/new-study-locators.json";
import STUDY_CONFIG_LOCATORS from "../../locators/study-configuration-locators.json";
import FixtureDataService from "../../services/fixture-data-service";
import ProgramService from "../../services/program-service";
import Ada from "../ada";
import screeningPage from "./screening-cutpoint";
import sensitivityPage from "./sensitivity";

class PageForLogSByN {
  Constructor() {
    this.sensitivityPage = new sensitivityPage();
    this.screeningPage = new screeningPage();
  }

  createNewStudyForLogSByN() {
    const title = FixtureDataService.findFixtureDataByKey("U_study_5_18_title");
    const des = FixtureDataService.findFixtureDataByKey("U_study_5_18_description");
    const tag = FixtureDataService.findFixtureDataByKey("U_study_5_18_tag");

    cy.xpath(newProjectForm.nextButton).click();
    cy.get(".modal-body").should("be.visible");

    ProgramService.typeStudyTitle(title);

    cy.xpath(NEW_STUDY_LOCATORS.newStudyDes).type(des);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyDes).should("have.value", des);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyTag).type(tag);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyTag).should("have.value", tag);
    cy.screenshot({capture: "fullPage"});

    cy.xpath(NEW_STUDY_LOCATORS.choseConfigJson).click();

    cy.get("button[type='submit']").click();
    cy.get("modal-container, bs-modal-backdrop").should(
      "not.exist"
    );
    cy.get(".edit-study-content").should("be.visible");
    cy.screenshot({capture: "fullPage"});
  }

  createNewStudyForLogSByNAuto() {
    const title = FixtureDataService.findFixtureDataByKey("U_study2_5_18_title");
    const des = FixtureDataService.findFixtureDataByKey("U_study2_5_18_description");
    const tag = FixtureDataService.findFixtureDataByKey("U_study2_5_18_tag");

    cy.xpath(newProjectForm.nextButton).click();
    cy.get(".modal-body").should("be.visible");

    ProgramService.typeStudyTitle(title);

    cy.xpath(NEW_STUDY_LOCATORS.newStudyDes).type(des);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyDes).should("have.value", des);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyTag).type(tag);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyTag).should("have.value", tag);
    cy.screenshot({capture: "fullPage"});

    cy.xpath(NEW_STUDY_LOCATORS.choseConfigJson).click();
    cy.get("button[type='submit']").click();
    cy.get("modal-container, bs-modal-backdrop").should(
      "not.exist"
    );
    cy.get(".edit-study-content").should("be.visible");

    cy.screenshot({capture: "fullPage"});
  }

  clickImportConfigFromFile() {
    cy.xpath(STUDY_CONFIG_LOCATORS.dropdownArrow).should("be.visible").click();
    cy.get(".tools").should("be.visible");

    cy.xpath(STUDY_CONFIG_LOCATORS.importConfigOption).click();
    cy.get(".modal-body").should("be.visible");

    cy.xpath(STUDY_CONFIG_LOCATORS.choseFile).click();
    cy.screenshot({capture: "fullPage"});
  }

  importConfigForLogSByN() {
      const configFilePath = FixtureDataService.findFixtureDataByKey(
        "U_study_configuration_LogSN_file_path"
      );
      const configFileName = FixtureDataService.findFixtureDataByKey(
        "U_study_configuration_LogSN_file_name"
      );

      cy.fixture(configFilePath).then(fileContent => {
        cy.get('input[type="file"]').attachFile({
          fileContent: fileContent,
          fileName: configFileName,
        });
      });
      cy.screenshot({capture: "fullPage"});

    cy.contains("button", "Import").should("be.visible").click();
    cy.get(".modal-body").should("be.visible");

    cy.contains("button", "Yes").click();
    cy.get(".edit-study-content").should("be.visible");
  }

  selectTemplate() {
    cy.xpath(screeningCut.selectTemplate).scrollToElement();
    cy.selectDropdownOption(screeningCut.selectTemplate, "S859-876");
    cy.get("#plate").should("exist");
  }

  clickOnYesRadioButton() {
    cy.xpath(locatorForLogSByN.yesRadioBtn).should("be.visible").click();
    cy.get(".edit-study-content").should("be.visible");
  }

  clickOnChooseFile() {
    cy.xpath(locatorForLogSByN.choseBtn).should("be.visible").click();
  }

  importPlateID(plateNumber, dataset) {
      const plateFilePath = FixtureDataService.findFixtureDataByKey(
        `U_d${dataset}_p${plateNumber}_ID${plateNumber}_file_path`
      );
      const plateFileName = FixtureDataService.findFixtureDataByKey(
        `U_d${dataset}_p${plateNumber}_ID${plateNumber}_file_name`
      );

      cy.fixture(plateFilePath).then(fileContent => {
        cy.get('input[type="file"]').attachFile({
          fileContent: fileContent,
          fileName: plateFileName,
        });
      });
      cy.screenshot({capture: "fullPage"});
  }

  importPlateOD(plateNumber, dataset) {
    const plateFilePath = FixtureDataService.findFixtureDataByKey(
      `U_d${dataset}_p${plateNumber}_OD${plateNumber}_file_path`
    );
    const plateFileName = FixtureDataService.findFixtureDataByKey(
      `U_d${dataset}_p${plateNumber}_OD${plateNumber}_file_name`
    );

    cy.fixture(plateFilePath).then(fileContent => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent,
        fileName: plateFileName,
      });
    });
    cy.screenshot({capture: "fullPage"});
    cy.xpath("//h4[normalize-space()='Preview']").should(
      "exist"
    );
  }

  goToNormDataTab() {
    cy.xpath(locatorForLogSByN.normData).scrollToElement().click();

    cy.contains("button", "Start Plate Evaluation").scrollToElement();
    cy.contains("button", "Start Plate Evaluation").should(
      "be.enabled"
    );
  }

  clickOnStartPlateEv() {
    cy.contains("button", "Start Plate Evaluation").click();
    cy.contains("button", "Show Normalized Data").scrollToElement();
    cy.contains("button", "Show Normalized Data").should(
      "be.enabled"
    );
  }

  clickOnShowData() {
    cy.contains("button", "Show Normalized Data").click();
    cy.contains("button", "Accept Normalized Data").scrollToElement();
    cy.contains("button", "Accept Normalized Data").should(
      "be.enabled"
    );
  }

  clickOnAcceptData() {
    cy.contains("button", "Accept Normalized Data").click();
    cy.get(".modal-body").should("be.visible");
  }

  goToAnalyticalTab() {
    cy.xpath(locatorForLogSByN.analyticalOutier).scrollToElement().click();
    cy.contains("button", "Perform Analytical Outlier Analysis").should("be.visible");
  }

  PerformAnalyticalAnalysis() {
    cy.contains("button", "Perform Analytical Outlier Analysis").click();
    cy.contains("button", "Accept Analytical Outlier Analysis").scrollToElement();
    cy.contains("button", "Accept Analytical Outlier Analysis").should("be.visible");
  }

  clickOnAcceptAanlytical() {
    cy.contains("button", "Accept Analytical Outlier Analysis").click();
    cy.get(".modal-body").should("be.visible");
  }

  startCutPointAnalysis() {
    cy.contains("button", "New Screening Cutpoint Analysis").should(
      "be.visible"
    );
    cy.contains("button", "New Screening Cutpoint Analysis").click();
    cy.xpath(locatorForLogSByN.para).should("be.visible");
  }

  clickonParametric() {
    cy.xpath(locatorForLogSByN.para).click();
    cy.xpath(locatorForLogSByN.naiSample).should(
      "be.visible"
    );
  }

  clickonNaiSam() {
    cy.xpath(locatorForLogSByN.naiSample).click();
    cy.xpath(locatorForLogSByN.d1).should("be.visible");
  }

  selectBothdatasets() {
    cy.xpath(locatorForLogSByN.d1).click();
    cy.xpath(locatorForLogSByN.d2).should("be.visible").click();
  }

  clickOnAcceptLog() {
    cy.contains("button", "Accept").click();

    cy.contains("button", "Next").scrollToElement();
    cy.contains("button", "Next").should("be.visible");
  }

  clickNext() {
    cy.contains("button", "Next").scrollToElement().click();

    cy.get(":nth-child(6) > .table > :nth-child(1) > :nth-child(2)").should("be.visible");
  }

  giveResultNameCommentParametric() {
    const eSignComment = FixtureDataService.findFixtureDataByKey("U_Esign_comment");

    cy.xpath(ADA_LOCATORS.resultName).type("SCP Parametric");

    cy.xpath(ADA_LOCATORS.resultComment).type(eSignComment);
    cy.screenshot();

    cy.clickSaveBtn();
    cy.get(".modal-body").should("be.visible");
  }

  clickonNonParametric() {
    cy.xpath(locatorForLogSByN.nonParametric).should("be.visible").click();
    cy.xpath(locatorForLogSByN.naiSample).should(
      "be.visible"
    );
  }

  giveResultNameCommentNonParametric() {
    const eSignComment = FixtureDataService.findFixtureDataByKey("U_Esign_comment");

    cy.xpath(screeningCut.resultName).type("SCP Non_Parametric");

    cy.xpath(screeningCut.resultComment).type(eSignComment);
    cy.screenshot();

    cy.clickSaveBtn();
    cy.get(".modal-body").should("be.visible");
  }

  importSampleAndControlExcels() {
    cy.xpath(STUDY_CONFIG_LOCATORS.dropdownArrow).should("be.visible").click();
    cy.xpath(STUDY_CONFIG_LOCATORS.importDataOption).should(
      "be.visible"
    ).click();
    cy.get(".no-data > :nth-child(2)").should("be.visible").click();

    const sampleFilePath = FixtureDataService.findFixtureDataByKey(
      "U_study5_18_sample_data_file_path"
    );
    const sampleFileName = FixtureDataService.findFixtureDataByKey(
      "U_study5_18_sample_file_name"
    );

    cy.fixture(sampleFilePath, "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then(fileContent => {
        cy.get(".no-data > :nth-child(2)").attachFile({
          fileContent,
          fileName: sampleFileName,
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          encoding: "utf8",
        });
      });

    cy.get(".no-data > :nth-child(4)").should(
      "be.visible"
    );

    const controlFilePath = FixtureDataService.findFixtureDataByKey(
      "U_study5_18_control_data_file_path"
    );
    const controlFileName = FixtureDataService.findFixtureDataByKey(
      "U_study5_18_control_file_name"
    );

    cy.fixture(controlFilePath, "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then(fileContent => {
        cy.get(".no-data > :nth-child(4)").attachFile({
          fileContent,
          fileName: controlFileName,
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          encoding: "utf8",
        });
      });

    cy.contains("button", "Start Test").scrollToElement().click();
    cy.contains("button", "Complete").scrollToElement().click();
    cy.screenshot({capture: "fullPage"});

    cy.get(".edit-study-content").should("be.visible");
  }

  performScreeningCutpointOutlierAnalysisForParametric() {
    this.clickonParametric();
    this.clickonNaiSam();
    this.selectBothdatasets();
    Ada.clickOnStartAnalysisButton();
    this.clickOnAcceptLog();
    this.clickNext();
    Ada.clickOnCalculateCutpoint();
    this.sensitivityPage.clickOnNext2();
    this.giveResultNameCommentParametric();
    cy.provideEsign();
  }

  performScreeningCutpointOutlierAnalysisForNonParametric() {
    this.startCutPointAnalysis();
    this.clickonNonParametric();
    this.clickonNaiSam();
    this.selectBothdatasets();
    Ada.clickOnStartAnalysisButton();
    this.sensitivityPage.clickOnNext2();
    this.giveResultNameCommentNonParametric();
    cy.provideEsign();
  }
}

export default PageForLogSByN;
