import STUDY_CONFIG_LOCATORS from "../locators/study-configuration-locators.json";
import FixtureDataService from "../services/fixture-data-service";


class StudyAnalysisFromExternalData {
  importDataFromConfig() {
    cy.xpath(STUDY_CONFIG_LOCATORS.dropdownArrow).should("be.visible").click();
    cy.xpath(STUDY_CONFIG_LOCATORS.importDataOption).should(
      "be.visible"
    ).click();
    cy.get(".no-data > :nth-child(2)").should("be.visible").click();
    const sampleFilePath = FixtureDataService.findFixtureDataByKey(
      "U_study_sample_data_file_path"
    );
    const sampleFileName = FixtureDataService.findFixtureDataByKey(
      "U_study_sample_file_name"
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

    const controlFilePath = FixtureDataService.findFixtureDataByKey(
      "U_study_control_data_file_path"
    );
    const controlFileName = FixtureDataService.findFixtureDataByKey(
      "U_study_control_file_name"
    );

    cy.get(".no-data > :nth-child(4)").should("be.visible").click();

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
    cy.xpath("//button[normalize-space()='Start Test']").should("be.visible").click();

    cy.contains("button", "Complete").scrollToElement().click();
    cy.screenshot();

    cy.get(".edit-study-content").should("be.visible");
  }
}

export default StudyAnalysisFromExternalData;
