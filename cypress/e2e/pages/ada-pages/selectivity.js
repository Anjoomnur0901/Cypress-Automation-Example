import ADA_LOCATORS from '../../locators/ada-locators/ada-locators.json';
import SCREENING_CUTPOINT_LOCATORS from "../../locators/ada-locators/screening-cutpoint-locators.json";
import SELECTIVITY_LOCATORS from "../../locators/ada-locators/selectivity-locators.json";
import FixtureDataService from "../../services/fixture-data-service";

class Selectivity {
  static goToSelectivity() {
    cy.xpath(SELECTIVITY_LOCATORS.selectivityTab).scrollToElement().click();
    cy.xpath("//h3[normalize-space()='Selectivity']").scrollToElement();
    cy.xpath("//h3[normalize-space()='Selectivity']").should("be.visible");
  }

  static selectTemplateForSelectivity(plateNumber) {
    if (plateNumber === 1 || plateNumber === 5) {
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).scrollToElement();
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).should("be.visible");
      cy.selectDropdownOption(
        SCREENING_CUTPOINT_LOCATORS.selectTemplate,
        "Selectivity Template 1"
      );
      cy.get("#plate").should("exist");
    }
    if (plateNumber === 2) {
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).scrollToElement();
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).should("be.visible");
      cy.selectDropdownOption(
        SCREENING_CUTPOINT_LOCATORS.selectTemplate,
        "Selectivity Template 2"
      );
      cy.get("#plate").should("exist");
    }

    if (plateNumber === 3 || plateNumber === 6) {
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).scrollToElement();
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).should("be.visible");
      cy.selectDropdownOption(
        SCREENING_CUTPOINT_LOCATORS.selectTemplate,
        "Selectivity Template 3"
      );
      cy.get("#plate").should("exist");
    }

    if (plateNumber === 4) {
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).scrollToElement();
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).should("be.visible");
      cy.selectDropdownOption(
        SCREENING_CUTPOINT_LOCATORS.selectTemplate,
        "Selectivity Template 4"
      );
      cy.get("#plate").should("exist");
    }

    if (plateNumber === 7) {
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).scrollToElement();
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).should("be.visible");
      cy.selectDropdownOption(
        SCREENING_CUTPOINT_LOCATORS.selectTemplate,
        "Selectivity Template 5"
      );
      cy.get("#plate").should("exist");
    }

    if (plateNumber === 8) {
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).scrollToElement();
      cy.xpath(SCREENING_CUTPOINT_LOCATORS.selectTemplate).should("be.visible");
      cy.selectDropdownOption(
        SCREENING_CUTPOINT_LOCATORS.selectTemplate,
        "Selectivity Template 6"
      );
      cy.get("#plate").should("exist");
    }
  }

  static importCsvFileforPlateForSelectivity(plateNumber) {
    const filePath = FixtureDataService.findFixtureDataByKey(
      `U_selectivity_d1_plate${plateNumber}_path`
    );
    const fileName = FixtureDataService.findFixtureDataByKey(
      `U_selectivity_d1_plate${plateNumber}_file_name`
    );

    cy.importPlateDataCSV(filePath, fileName);
  }

  static selectGroup(choice) {
    const choiceLocator = SELECTIVITY_LOCATORS[choice.toLowerCase()];
    cy.xpath(choiceLocator).scrollToElement().click();
    cy.screenshot();
  }

  static giveResultNameAndComment(plate, choice) {
    const plateResultObject = FixtureDataService.findFixtureDataByKey(`U_p${plate}_result`);
    const parts = plateResultObject.split(",").map(part => part.trim());
    const result = parts.find(part => part.includes(choice));

    cy.get(SELECTIVITY_LOCATORS.resultNameInput).type(result);
    cy.get(SELECTIVITY_LOCATORS.resultCommentTextarea).type("Automation Test");
    cy.clickSaveBtn();
  }

  static goToSelectivityTest() {
    cy.xpath(SELECTIVITY_LOCATORS.selectivityTest).should("be.visible").click();
    cy.xpath(ADA_LOCATORS.d1P1Checkbox).should(
      "be.visible"
    );
  }

  static clickOnAddNewSelectivity() {
    cy.contains("button", "Add New Selectivity Test").scrollToElement().click();
    cy.get("modal-container").should("be.visible");
  }

  static clickOnTestSelectivity() {
    cy.contains("button", "Test Selectivity").scrollToElement().click();
  }

  static goToFinalSelectivity() {
    cy.get("app-container-tabs").scrollToElement().within(() => {
      cy.get(SELECTIVITY_LOCATORS.finalSelectivityTab).should('be.visible').click();
    });
    cy.screenshot({capture: "fullPage"});
  }

  static performSelectivityTest(plateNumber, group) {
    cy.checkPlateCheckbox(plateNumber);
    this.clickOnAddNewSelectivity();
    this.selectGroup(group);
    this.clickOnTestSelectivity();
    cy.screenshot({capture: "fullPage"});
    this.giveResultNameAndComment(plateNumber, group);
    cy.provideEsign();
    cy.screenshot({capture: "fullPage"});
  }
}

export default Selectivity;
