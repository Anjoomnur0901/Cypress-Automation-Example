import newProjectForm from "../../locators/new-project-locators.json";
import NEW_STUDY_LOCATORS from "../../locators/new-study-locators.json";
import FixtureDataService from "../../services/fixture-data-service";
import ProgramService from "../../services/program-service";

class PageForLogS {
  createNewStudyForLogS() {
    const title = FixtureDataService.findFixtureDataByKey("U_study_5_17_title");
    const des = FixtureDataService.findFixtureDataByKey("U_study_5_17_description");
    const tag = FixtureDataService.findFixtureDataByKey("U_study_5_17_tag");

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

  createNewStudyForLogSAuto() {
    const title = FixtureDataService.findFixtureDataByKey("U_study2_5_17_title");
    const des = FixtureDataService.findFixtureDataByKey("U_study2_5_17_description");
    const tag = FixtureDataService.findFixtureDataByKey("U_study2_5_17_tag");

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

  importConfigForLogS() {
    const configFilePath = FixtureDataService.findFixtureDataByKey(
      "U_study_configuration_LogS_file_path"
    );
    const configFileName = FixtureDataService.findFixtureDataByKey(
      "U_study_configuration_LogS_file_name"
    );

    cy.fixture(configFilePath).then(fileContent => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent,
        fileName: configFileName,
      });
    });
    cy.screenshot({capture: "fullPage"});

    cy.contains("button", "Import").should("be.visible");
    cy.contains("button", "Import").click();
    cy.get(".modal-body").should("be.visible");

    cy.contains("button", "Yes").click();
    cy.get(".edit-study-content").should("be.visible");
  }
}

export default PageForLogS;
