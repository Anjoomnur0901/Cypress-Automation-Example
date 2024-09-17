import { each } from "lodash";
import "../../../support/commands";
import ADA_LOCATORS from "../../locators/ada-locators/ada-locators.json";
import MISC_LOCATORS from "../../locators/misc-locators.json";
import STUDY_CONFIG_LOCATORS from "../../locators/study-configuration-locators.json";
import FixtureDataService from "../../services/fixture-data-service";

class Ada {
  static selectProgramToAddOtherStudy() {
    cy.get(".breadcrumb > :nth-child(1) > a").scrollToElement().click();
    cy.get(".content-list").should("be.visible");
    cy.get(".obj-list").should("be.visible");
  }

  static updateConfiguration() {
    cy.contains("button", "Update").click();
    cy.get(".modal-body").should("be.visible");
  }

  static approveConfiguration() {
    cy.contains("button", "Approve").should("be.visible").click();
    cy.get(".modal-body").should("be.visible");
  }

  static unapproveConfiguration() {
    cy.contains("button", "Unapprove").should("be.visible").click();
    cy.get(".modal-body").should("be.visible");
  }

  static rejectConfiguration() {
    cy.contains("button", "Reject").should("be.visible").click();
    cy.get(".modal-body").should("be.visible");
  }

  static reloadStudy() {
    cy.reload();

    cy.get(".edit-study-content").should("be.visible");

    cy.get(".content-list").should("be.visible");

    cy.get(".menu-toggle").click();
    cy.get(".edit-study-content").should("be.visible");

    cy.get(".content-list").should("be.visible");
  }

  static checkNCEvaluationMedian() {
    cy.xpath(STUDY_CONFIG_LOCATORS.cutpointTab).click();
    cy.xpath(STUDY_CONFIG_LOCATORS.screeningCutOption).click();
    cy.xpath(STUDY_CONFIG_LOCATORS.ncEvMean).click();
    cy.xpath(STUDY_CONFIG_LOCATORS.ncEvMedian).click();
    cy.xpath(STUDY_CONFIG_LOCATORS.bioMedian).click();
    cy.xpath(STUDY_CONFIG_LOCATORS.logTransformBtn).click();
    cy.xpath(STUDY_CONFIG_LOCATORS.meanSdBtn).click();
    cy.xpath(STUDY_CONFIG_LOCATORS.updateBtn).then($btn => {
      if (!$btn.is(":disabled")) {
        cy.wrap($btn).click();
        cy.provideEsign();
      }
    });
    cy.screenshot({capture: "fullPage"});
  }

  // 5.13

  static importConfigFileforAutoImportExternalStudyData() {
    cy.xpath(STUDY_CONFIG_LOCATORS.dropdownArrow).should("be.visible").click();

    cy.get(".tools").should("be.visible");

    cy.xpath(STUDY_CONFIG_LOCATORS.importConfigOption).click();

    cy.get(".modal-body").should("be.visible");

    cy.xpath(STUDY_CONFIG_LOCATORS.choseFile).click();
    cy.screenshot({capture: "fullPage"});

    const configFilePath = FixtureDataService.findFixtureDataByKey(
      "U_5_13_config_file_path"
    );
    const configFileName = FixtureDataService.findFixtureDataByKey(
      "U_5_13_config_file_name"
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

    cy.contains("button", "Yes").should("be.visible").click();

    cy.get(".edit-study-content").should("be.visible");
  }

  // 5.14

  static importConfigFileForReuseSCPDataForCCP() {
    cy.xpath(STUDY_CONFIG_LOCATORS.dropdownArrow).should("be.visible").click();

    cy.get(".tools").should("be.visible");

    cy.xpath(STUDY_CONFIG_LOCATORS.importConfigOption).click();

    cy.get(".modal-body").should("be.visible");

    cy.xpath(STUDY_CONFIG_LOCATORS.choseFile).click();
    cy.screenshot({capture: "fullPage"});

    const configFilePath = FixtureDataService.findFixtureDataByKey(
      "U_study_configuration_file_path_scp"
    );
    const configFileName = FixtureDataService.findFixtureDataByKey(
      "U_study_configuration_file_name_scp"
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
    cy.contains("button", "Yes").should("be.visible").click();

    cy.get(".edit-study-content").should("be.visible");
  }



  static selectAllDatasetsCheckboxes() {
    cy.get(ADA_LOCATORS.datasetCheckboxes).within(() => {
      cy.get('input[type="checkbox"]').scrollToElement().check().should("be.checked");
    });
  }

  static clickOnCalculateCutpoint() {
    cy.contains("button", "Calculate Cutpoint").scrollToElement().click();
    this.awaitCutpointLoading();
  }

  static clickOnStartAnalysisButton() {
    cy.get("[data-cy=start-analysis-btn]").scrollToElement().click();
    cy.get("modal-container").should("be.visible");
    this.awaitCutpointLoading();
  }

  static awaitCutpointLoading() {
    cy.get("[data-cy=cutpoint-loading]").should('not.exist');
  }

  static approveResult() {
    cy.get(MISC_LOCATORS.approveIconBtn).scrollToElement().click();

    cy.provideEsign();
  }

  static goToAnalyticalOutlierTab() {
    cy.xpath(ADA_LOCATORS.analyticalTab).scrollToElement().click();
    cy.contains("button", "Start Analytical Outlier Analysis").should("be.visible");
  }

  static startAnalyticalOutlier() {
    cy.contains("button", "Start Analytical Outlier Analysis").click();
  }

  static assertAnalyticalOutlier(type) {
    this.startAnalyticalOutlier();

    const expectedOutliers = JSON.parse(FixtureDataService.findFixtureDataByKey(`U_${type}_ana_outlier`));

    each(expectedOutliers, (sampleIds, datasetNumber) => {
      // Find the index of the datasetNumber in the first row
      cy.get(`${ADA_LOCATORS.anaOutlierTable} > tr > th`).contains(datasetNumber).then($header => {
        const datasetIndex = $header.index();

        // For each sampleId in the datasetNumber array
        each(sampleIds, sampleId => {
          // Find the row that contains the sampleId in the first column
          cy.contains(`${ADA_LOCATORS.anaOutlierTable} > tr > td`, sampleId).then($sampleCell => {
            // Get the row of the sampleId cell
            const $row = $sampleCell.parent();

            // Find the cell in the same row and column index as the datasetNumber
            cy.wrap($row).find(`td:eq(${datasetIndex})`).should($el => {
              const bgColor = $el.css("background-color");

              expect(bgColor).to.eq("rgb(255, 255, 224)");
            });
          });
        });
      });
    });
  }

  static acceptAnalyticalOutlier() {
    cy.contains("button", "Accept Analytical Outlier Analysis").scrollToElement().click();
    cy.provideEsign();
  }

  static goToBiologicalOutlierTab() {
    cy.xpath(ADA_LOCATORS.biologicalTab).scrollToElement().click();
  }

  static startBiologicalOutlier() {
    cy.contains("button", "Start Biological Outlier Analysis").click();
  }

  static assertBiologicalOutlier(type) {
    this.startBiologicalOutlier();

    const expectedOutliers = FixtureDataService.findFixtureDataByKey(`U_${type}_bio_outlier`)?.split(",");

    expectedOutliers.forEach(sampleId => {
      cy.get(ADA_LOCATORS.bioOutlierTable).within(() => {
        cy.get('td').filter((_, element) => Cypress.$(element).text().trim() === sampleId).parent().should('have.class', 'warn-bg');
      });
    });
  }

  static acceptBiologicalOutlier() {
    cy.contains(
      "button",
      "Accept Biological Outlier Analysis"
    ).scrollToElement().click();
    cy.provideEsign();
  }

  static saveCutpointResult() {
    const resultName = FixtureDataService.findFixtureDataByKey("U_result_name");
    const resultComment = FixtureDataService.findFixtureDataByKey("U_result_comment");

    cy.xpath(ADA_LOCATORS.resultName).type(resultName);
    cy.xpath(ADA_LOCATORS.resultComment).type(resultComment);
    cy.screenshot({capture: "fullPage"});

    cy.clickSaveBtn();
  }

  static selectParametric() {
    cy.xpath(ADA_LOCATORS.parametric).click();
  }

  static selectNaiTestArticle() {
    cy.xpath(ADA_LOCATORS.naiTestArticle).click();
  }
}

export default Ada;
