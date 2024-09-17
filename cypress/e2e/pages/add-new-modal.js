import "../../support/commands";
import MISC_LOCATORS from "../locators/misc-locators.json";
import NEW_PROGRAM_LOCATORS from "../locators/new-program-locators.json";
import NEW_PROJECT_LOCATORS from "../locators/new-project-locators.json";
import NEW_STUDY_LOCATORS from "../locators/new-study-locators.json";
import STUDY_CONFIG_LOCATORS from "../locators/study-configuration-locators.json";
import FixtureDataService from "../services/fixture-data-service";
import ProgramService, { PROGRAM_DATA, PROJECT_DATA, STUDY_DATA } from "../services/program-service";

class AddNewModal{
  static clickOnAddNew() {
    cy.get(MISC_LOCATORS.addNewButton).should("be.visible").click();
    cy.get(".dropdown-menu-open").should("be.visible");
  }

  static createNewStudy(beforeSaveCb, importConfig, studyTitle) {
    this.clickOnAddNew();
    this.clickOnNewStudy();

    this.selectProgramProject(beforeSaveCb, importConfig, studyTitle);
  }

  static createNewProgram(titleOverride) {
    this.clickOnAddNew();
    cy.xpath(MISC_LOCATORS.newProgramFromAddNew).should(
      "be.visible"
    ).click();
    cy.get(".modal-body").should("be.visible");

    const { title, description, tag } = PROGRAM_DATA;
    const finalTitle = titleOverride ?? title;

    ProgramService.typeProgramTitle(finalTitle);

    cy.xpath(NEW_PROGRAM_LOCATORS.newProgramDes).clear().type(description);
    cy.xpath(NEW_PROGRAM_LOCATORS.newProgramDes).should("have.value", description);
    cy.xpath(NEW_PROGRAM_LOCATORS.newProgramTag).clear().type(tag);
    cy.xpath(NEW_PROGRAM_LOCATORS.newProgramTag).should("have.value", tag);

    cy.screenshot({ capture: "fullPage" });

    cy.get("button[type='submit']").click();

    cy.get("modal-container, bs-modal-backdrop").should("not.exist");

    cy.screenshot({ capture: "fullPage" });
  }

  static createNewProject() {
    this.clickOnAddNew();
    cy.xpath(MISC_LOCATORS.newProjectFromAddNew).should("be.visible").click();
    cy.get(".modal-body").should("be.visible");

    this.selectProgram().then(() => {
      cy.xpath(NEW_PROJECT_LOCATORS.nextButton).click();
    });

    const { title, description, tag } = PROJECT_DATA;
    ProgramService.typeProjectTitle(title);

    cy.xpath(NEW_PROJECT_LOCATORS.newProjectDes).clear().type(description);
    cy.xpath(NEW_PROJECT_LOCATORS.newProjectDes).should("have.value", description);
    cy.xpath(NEW_PROJECT_LOCATORS.newProjectTag).clear().type(tag);
    cy.xpath(NEW_PROJECT_LOCATORS.newProjectTag).should("have.value", tag);

    cy.screenshot({capture: "fullPage"});

    cy.get("button[type='submit']").click();

    cy.get("modal-container, bs-modal-backdrop")
      .should("not.exist")
      .then(() =>
        cy.get(".content-list").should("be.visible")
      );

    cy.screenshot({capture: "fullPage"});
  }

  static createNewStudyForAutoImportExternalStudyData(){
    const title = FixtureDataService.findFixtureDataByKey("U_study513_title");
    const des = FixtureDataService.findFixtureDataByKey("U_study513_description");
    const tag = FixtureDataService.findFixtureDataByKey("U_study513_tag");

    cy.xpath(NEW_PROJECT_LOCATORS.nextButton).click();

    cy.get(".modal-body").should("be.visible");

    ProgramService.typeStudyTitle(title);

    cy.xpath(NEW_STUDY_LOCATORS.newStudyDes).clear().type(des);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyDes).should("have.value", des);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyTag).clear().type(tag);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyTag).should("have.value", tag);

    cy.screenshot({capture: "fullPage"});
    cy.xpath(NEW_STUDY_LOCATORS.choseConfigJson).click();

    cy.get("button[type='submit']").click();
    cy.get("modal-container, bs-modal-backdrop").should("not.exist");

    cy.get(".edit-study-content").should("be.visible");

    cy.screenshot({capture: "fullPage"});
  }

  static createNewStudyForReuseSCPDataForCCP() {
    const title = FixtureDataService.findFixtureDataByKey("U_study514_title");
    const des = FixtureDataService.findFixtureDataByKey("U_study514_description");
    const tag = FixtureDataService.findFixtureDataByKey("U_study514_tag");

    cy.xpath(NEW_PROJECT_LOCATORS.nextButton).click();

    cy.get(".modal-body").should("be.visible");

    ProgramService.typeStudyTitle(title);

    cy.xpath(NEW_STUDY_LOCATORS.newStudyDes).clear().type(des);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyDes).should("have.value", des);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyTag).clear().type(tag);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyTag).should("have.value", tag);
    cy.xpath(NEW_STUDY_LOCATORS.choseConfigJson).click();

    cy.screenshot({capture: "fullPage"});
    cy.get("button[type='submit']").click();
    cy.get("modal-container, bs-modal-backdrop").should("not.exist");
    cy.get(".edit-study-content").should("be.visible");

    cy.screenshot({capture: "fullPage"});
  }

  static createSecondNewProject() {
    const des = FixtureDataService.findFixtureDataByKey("U_project2_description");
    const tag = FixtureDataService.findFixtureDataByKey("U_project2_tag");

    cy.xpath(NEW_PROJECT_LOCATORS.newProjectDes).clear().type(des);
    cy.xpath(NEW_PROJECT_LOCATORS.newProjectDes).should("have.value", des);

    cy.xpath(NEW_PROJECT_LOCATORS.newProjectTag).clear().type(tag);
    cy.xpath(NEW_PROJECT_LOCATORS.newProjectTag).should("have.value", tag);

    cy.screenshot({capture: "fullPage"});

    cy.get("button[type='submit']").click();
    cy.get("modal-container, bs-modal-backdrop")
      .should("not.exist")
      .then(() =>
        cy.get(".content-list").should("be.visible")
      );

    cy.screenshot({capture: "fullPage"});
  }

  static editNewlyCreatedProject() {
    const editedDes = FixtureDataService.findFixtureDataByKey("U_edited_project_description");

    cy.get(".detail-content").should("be.visible");
    cy.get(MISC_LOCATORS.editBtn).scrollToElement().click();

    cy.xpath(NEW_PROJECT_LOCATORS.editProjectDes)
      .should("be.visible")
      .clear()
      .type(editedDes);

    cy.get(MISC_LOCATORS.editSaveBtn).scrollToElement().click();
    cy.get(MISC_LOCATORS.editSaveBtn).should('not.exist');

    cy.screenshot({capture: "fullPage"});
  }

  static editNewlyCreatedProjectPK(){
    const editedDes = FixtureDataService.findFixtureDataByKey(
      "U_edited_project_description"
    );

    cy.get(".detail-content").should("be.visible");

    cy.xpath(MISC_LOCATORS.editPencilIcon).scrollToElement();
    cy.xpath(MISC_LOCATORS.editPencilIcon).click();
    cy.xpath(NEW_PROJECT_LOCATORS.editProjectDes).should("be.visible");
    cy.xpath(NEW_PROJECT_LOCATORS.editProjectDes).clear().type(editedDes);

    cy.saveEditedDescription();

    cy.screenshot({capture: "fullPage"});
  }

  static clickOnNewStudy() {
    cy.xpath(MISC_LOCATORS.newStudyFromAddNew).should(
      "be.visible"
    ).click();
    cy.get(".modal-body").should("be.visible");
  }

  static inputStudyDetails(studyTitleOverride){
    const { title, description, tag } = STUDY_DATA;
    const finalTitle = studyTitleOverride ?? title;

    cy.get(".modal-body").should("be.visible");

    ProgramService.typeStudyTitle(finalTitle);

    cy.xpath(NEW_STUDY_LOCATORS.newStudyDes).type(description);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyDes).should("have.value", description);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyTag).type(tag);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyTag).should("have.value", tag);

    cy.screenshot({capture: "fullPage"});
  }

  static createSecondNewStudy(){
    const { secondStudytitle, secondStudydes, secondStudytag } = ProgramService.SECOND_STUDY_DATA;
    cy.xpath(NEW_PROJECT_LOCATORS.nextButton).click();
    cy.get(".modal-body").should("be.visible");
    ProgramService.typeStudyTitle(secondStudytitle);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyDes).type(secondStudydes);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyDes).should("have.value", secondStudydes);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyTag).type(secondStudytag);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyTag).should("have.value", secondStudytag);
    cy.xpath(NEW_STUDY_LOCATORS.choseConfigJson).click();
    cy.screenshot({capture: "fullPage"});
    cy.get("button[type='submit']").click();
    cy.get("modal-container, bs-modal-backdrop").should("not.exist");
    cy.get(".edit-study-content").should("be.visible");
    cy.get(".content-list").should("be.visible");
    cy.screenshot({capture: "fullPage"});
  }

  static editNewlyCreatedProgram() {
    cy.get(MISC_LOCATORS.editBtn).scrollToElement().click();
    const des = FixtureDataService.findFixtureDataByKey("U_edited_program_description");
    cy.xpath(NEW_PROGRAM_LOCATORS.editProgramDes).scrollToElement().clear().type(des);
    cy.screenshot({ capture: "fullPage" });
    cy.saveEditedDescription();
    cy.screenshot({ capture: "fullPage" });
  }

  static editFirstStudy() {
    const des = FixtureDataService.findFixtureDataByKey("U_edited_study_description");

    cy.get(NEW_STUDY_LOCATORS.editStudyContent).should('be.visible').within(() => {
      cy.get(MISC_LOCATORS.editBtn).should('be.visible').click().then(() => {
        cy.get(NEW_STUDY_LOCATORS.studyDescriptionTextArea).should('be.visible').clear().type(des);
      });

      cy.clickSaveBtn();
    });

    cy.screenshot({capture: "fullPage"});
  }

  static selectLinkedStudy() {
    const { title } = STUDY_DATA;
    const linkStudyName = ProgramService.getUniqTitle(title);

    cy.get(NEW_STUDY_LOCATORS.linkStudyTextField).clear().type(linkStudyName).then(() => {
      cy.get(NEW_STUDY_LOCATORS.studyDropdown).within(() => {
        cy.contains(linkStudyName).should('be.visible').click();
      });
    });
  }

  static checkAdvancedSettings() {
    cy.xpath(NEW_STUDY_LOCATORS.advanceSettings).should("be.visible").click();
  }

  static checkGLP() {
    this.checkAdvancedSettings();

    cy.xpath(NEW_STUDY_LOCATORS.GLPCheckbox).should("be.visible").click();
  }

  static importStudyConfig() {
    const configFileName = FixtureDataService.findFixtureDataByKey("U_study_configuration_file_name");

    cy.fixture(configFileName, 'binary')
      .then(fileContent => {
        cy.xpath(STUDY_CONFIG_LOCATORS.configChooseFile).attachFile({
          fileContent,
          fileName: configFileName,
        });
      });
  }

  static selectProgramToAddOtherStudy() {
    cy.get(".breadcrumb > :nth-child(1) > a").scrollToElement();

    cy.get(".breadcrumb > :nth-child(1) > a").click();

    cy.get(".content-list").should("be.visible");
    cy.get(".obj-list").should("be.visible");
  }

  // static inputStudyDetailsForSecondStudy() {
  //     const title = FixtureDataService.findFixtureDataByKey("U_study2_title");
  //     const des = FixtureDataService.findFixtureDataByKey("U_study2_description");
  //     const tag = FixtureDataService.findFixtureDataByKey("U_study2_tag");
  //     cy.xpath(NEW_STUDY_LOCATORS.nextButton).click();
  //     cy.get(".modal-body").should("be.visible");
  //     ProgramService.typeStudyTitle(title);

  //     cy.xpath(NEW_STUDY_LOCATORS.newStudyDes, {timeout: Cypress.config('defaultCommandTimeout')}).should("be.visible").type(des);
  //     cy.xpath(NEW_STUDY_LOCATORS.newStudyTag, {timeout: Cypress.config('defaultCommandTimeout')}).should("be.visible").type(tag);
  //     cy.xpath(NEW_STUDY_LOCATORS.choseConfigJson).click();
  //     cy.screenshot({capture: "fullPage"});

  //     cy.get("button[type='submit']").should("be.visible");

  //     cy.get("button[type='submit']").click();
  //     cy.get("modal-container, bs-modal-backdrop").should("not.exist");

  //     cy.get(".edit-study-content", {timeout: Cypress.config('defaultCommandTimeout')}).should("be.visible");

  //     cy.screenshot({capture: "fullPage"});
  // }

  static selectProgramProject(beforeSaveCb, importConfig, studyTitle) {
    const { title } = PROGRAM_DATA;
    const uniqProgramTitle = ProgramService.getUniqTitle(title);

    cy.get(NEW_STUDY_LOCATORS.programDropdown).then($elm => {
      const targetedOption = $elm.find(`option`).filter((_, el) => Cypress.$(el).text() === uniqProgramTitle);
      if (targetedOption.length > 0) {
        this.selectProgram().then(() => {
          this.findOrCreateProject(beforeSaveCb, importConfig, studyTitle);
        });
      } else {
        cy.contains(MISC_LOCATORS.cancelBtn, "Cancel").click();
        this.createNewProgram();
        this.createNewStudy(beforeSaveCb, importConfig, studyTitle);
      }
    });
  }

  static findOrCreateProject(beforeSaveCb, importConfig = true, studyTitle) {
    const { title } = PROJECT_DATA;
    const uniqProjectTitle = ProgramService.getUniqTitle(title);

    cy.get(NEW_STUDY_LOCATORS.projectDropdown).then($elm => {
      const targetedOption = $elm.find(`option`).filter((_, el) => Cypress.$(el).text() === uniqProjectTitle);

      if (targetedOption.length > 0) {
        this.selectProject().then(() => {
          cy.clickNextBtn();
          this.inputStudyDetails(studyTitle);
          this.checkGLP();
          if (importConfig) { this.importStudyConfig(); }
          if (beforeSaveCb) { beforeSaveCb(); }

          cy.screenshot({capture: 'fullPage'});
          cy.clickSaveBtn();
        });
      } else {
        cy.contains(MISC_LOCATORS.cancelBtn, "Cancel").click();
        this.createNewProject();
        this.createNewStudy();
      }
    });
  }

  static selectProgram() {
    const { title } = PROGRAM_DATA;
    const uniqTitle = ProgramService.getUniqTitle(title);

    return cy.selectDropdownOptionGet(NEW_STUDY_LOCATORS.programDropdown, uniqTitle);
  }

  static selectProject(titleOverride) {
    const { title } = PROJECT_DATA;
    const finalTitle = titleOverride ?? title;
    const uniqTitle = ProgramService.getUniqTitle(finalTitle);

    return cy.selectDropdownOptionGet(NEW_STUDY_LOCATORS.projectDropdown, uniqTitle);
  }

  static gotoProjectFromTopNavigationBar() {
    cy.get(NEW_STUDY_LOCATORS.goToProject).scrollToElement();
    cy.get(NEW_STUDY_LOCATORS.goToProject).click();
    cy.screenshot({capture: 'fullPage'});
  }

  static createSecondStudyForSA() {
    const { secondStudytitle, secondStudydes, secondStudytag } = ProgramService.SECOND_STUDY_DATA;

    cy.get(NEW_STUDY_LOCATORS.moduleDropdown).should('be.visible');
    cy.selectDropdownOptionGet(
      NEW_STUDY_LOCATORS.moduleDropdown,
      'Pharmacokinetic'
    );

    cy.xpath(NEW_STUDY_LOCATORS.title).should('be.visible');
    ProgramService.typeStudyTitle(secondStudytitle);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyDes).should('be.visible').type(secondStudydes);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyDes).should('have.value', secondStudydes);

    cy.xpath(NEW_STUDY_LOCATORS.newStudyTag).should('be.visible').type(secondStudytag);
    cy.xpath(NEW_STUDY_LOCATORS.newStudyTag).should('have.value', secondStudytag);

    cy.screenshot({capture: 'fullPage'});
  }

  static goToStudyFromSideNavigationBar() {
    const { title } = STUDY_DATA;
    const uniqStudyTitle = ProgramService.getUniqTitle(title);
    const finalTitle = FixtureDataService.findFixtureDataByKey(uniqStudyTitle);

    cy.get(NEW_STUDY_LOCATORS.sideNavStudyList).scrollToElement();
    cy.get(NEW_STUDY_LOCATORS.sideNavStudyList).contains(finalTitle).click();
  }
} export default AddNewModal;
