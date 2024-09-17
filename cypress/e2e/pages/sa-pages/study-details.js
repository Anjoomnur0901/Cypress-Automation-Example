import '../../../support/commands';
import COMMON_LOCATORS from '../../locators/sa-locators/common-locators.json';
import STUDY_LOCATORS from '../../locators/sa-locators/new-study-locators.json';
import FixtureDataService from '../../services/fixture-data-service';

class StudyDetails {
  static selectProjectProgram() {
    const program_name = FixtureDataService.findFixtureDataByKey('U_program_name');
    const project_name = FixtureDataService.findFixtureDataByKey('U_project_name');
    const nanoId = Cypress.env('nanoId');
    const new_program_name = `${nanoId}_${program_name}`;
    const new_project_name = `${nanoId}_${project_name}`;
    cy.xpath(STUDY_LOCATORS.programDropdown).should('be.visible');
    cy.xpath(STUDY_LOCATORS.programDropdown).select(new_program_name);
    cy.xpath(STUDY_LOCATORS.projectDropdown).should('be.visible');
    cy.xpath(STUDY_LOCATORS.projectDropdown).select(new_project_name);
    cy.screenshot({capture: 'fullPage'});
  }

  static createNewStudy() {
    cy.contains('Add New').should('be.visible');
    cy.contains('Add New').click();
    cy.xpath(STUDY_LOCATORS.addNewStudy).scrollToElement();
    cy.xpath(STUDY_LOCATORS.addNewStudy).click();
    cy.screenshot({capture: 'fullPage'});
  }

  static studyDetails() {
    cy.saSelectDropdownOptionGet(STUDY_LOCATORS.moduleDropdown, 'Pharmacokinetic');
    const title = FixtureDataService.findFixtureDataByKey('U_study1_title');
    const des = FixtureDataService.findFixtureDataByKey('U_study1_description');
    const tag = FixtureDataService.findFixtureDataByKey('U_study1_tag');
    cy.xpath(STUDY_LOCATORS.studyTitle).should('be.visible');
    cy.saTypeStudyTitle(title);
    cy.xpath(STUDY_LOCATORS.studyDescription).should('be.visible');
    cy.xpath(STUDY_LOCATORS.studyDescription).type(des);
    cy.xpath(STUDY_LOCATORS.studyTag).should('be.visible');
    cy.xpath(STUDY_LOCATORS.studyTag).type(tag);

    cy.screenshot({capture: 'fullPage'});
}

  static advancedSettings() {
    cy.xpath(STUDY_LOCATORS.advanceSettings).scrollToElement();
    cy.xpath(STUDY_LOCATORS.advanceSettings).click();
  }

  static checkGLP() {
    cy.xpath(STUDY_LOCATORS.glpCheckbox).should('be.visible');
    cy.xpath(STUDY_LOCATORS.glpCheckbox).click();
    cy.screenshot({capture: 'fullPage'});
  }

  static importData() {
    cy.xpath(STUDY_LOCATORS.importStudyConfigBtn).scrollToElement();
    cy.xpath(STUDY_LOCATORS.importStudyConfigBtn).click();
    const Config = FixtureDataService.findFixtureDataByKey(
      'U_study_configuration_file_path'
    );
    var fileName = Config;
    cy.fixture(fileName, 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then(fileContent => {
        cy.xpath(COMMON_LOCATORS.chooseXslx).attachFile({
          fileContent,
          fileName,
          mimeType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          encoding: 'utf8'
        });
      });
  }

  static gotoProject() {
    cy.get(STUDY_LOCATORS.goToProject).scrollToElement();
    cy.get(STUDY_LOCATORS.goToProject).click();
    cy.screenshot({capture: 'fullPage'});
  }

  static study2Details() {
    const s2title = FixtureDataService.findFixtureDataByKey('U_study2_name');
    const s2des = FixtureDataService.findFixtureDataByKey('U_study2_description');
    const s2tag = FixtureDataService.findFixtureDataByKey('U_study2_tag');

    cy.get(STUDY_LOCATORS.moduleDropdown).should('be.visible');
    cy.saSelectDropdownOptionGet(
      STUDY_LOCATORS.moduleDropdown,
      'Pharmacokinetic'
    );

    cy.xpath(STUDY_LOCATORS.studyTitle).should('be.visible');
    cy.saTypeStudyTitle(s2title);
    cy.xpath(STUDY_LOCATORS.studyDescription).should('be.visible');
    cy.xpath(STUDY_LOCATORS.studyDescription).type(s2des, {delay: 50});
    cy.xpath(STUDY_LOCATORS.studyDescription).should('have.value', s2des);

    cy.xpath(STUDY_LOCATORS.studyTag).should('be.visible');
    cy.xpath(STUDY_LOCATORS.studyTag).type(s2tag, {delay: 50});
    cy.xpath(STUDY_LOCATORS.studyTag).should('have.value', s2tag);

    cy.screenshot({capture: 'fullPage'});
  }

  static goToStudyFromSidenav() {
    const Stitle = FixtureDataService.findFixtureDataByKey('U_study1_title');
    cy.get(STUDY_LOCATORS.sideNavStudyList).scrollToElement();
    cy.get(STUDY_LOCATORS.sideNavStudyList).contains(Stitle).click();
  }
}

export default StudyDetails;
