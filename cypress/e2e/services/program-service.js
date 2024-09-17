import NEW_PROGRAM_LOCATORS from "../locators/new-program-locators.json";
import NEW_PROJECT_LOCATORS from "../locators/new-project-locators.json";
import NEW_STUDY_LOCATORS from "../locators/new-study-locators.json";

const getDefaultData = type => ({
    title: `Automation ${type}`,
    description: `Automation ${type} Description`,
    tag: 'Test'
  });
export const PROGRAM_DATA = getDefaultData('Program');
export const PROJECT_DATA = getDefaultData('Project');
export const STUDY_DATA = getDefaultData('Study');

class ProgramService {

  static getUniqTitle(title) {
    const nanoId = Cypress.env('nanoId');

    return `${nanoId}_${title}`;
  }

  static typeProgramTitle(title) {
    ProgramService.typeTitle(NEW_PROGRAM_LOCATORS.title, title);
  }

  static typeProjectTitle(title) {
    ProgramService.typeTitle(NEW_PROJECT_LOCATORS.title, title);
  }

  static typeStudyTitle(title) {
    ProgramService.typeTitle(NEW_STUDY_LOCATORS.title, title);
  }

  static typeTitle(inputElm, title) {
    const uuidTitle = ProgramService.getUniqTitle(title);
    cy.xpath(inputElm).type(uuidTitle);
    cy.xpath(inputElm).should("have.value", uuidTitle);
  }
}

export default ProgramService;
