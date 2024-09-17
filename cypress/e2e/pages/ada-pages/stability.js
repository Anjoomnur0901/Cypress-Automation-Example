import ADA_LOCATORS from '../../locators/ada-locators/ada-locators.json';
import STABILITY_LOCATOR from "../../locators/ada-locators/stability-locators.json";
import FixtureDataService from "../../services/fixture-data-service";

class Stability {
  static goToStability() {
    cy.xpath(STABILITY_LOCATOR.stabilityTab).scrollToElement();
    cy.xpath(STABILITY_LOCATOR.stabilityTab).should(
      "be.visible"
    );
    cy.xpath(STABILITY_LOCATOR.stabilityTab).click();
    cy.xpath("//h3[normalize-space()='Stability']").scrollToElement();
    cy.xpath("//h3[normalize-space()='Stability']").should(
      "be.visible"
    );
  }

  static importCsvFileforPlateForStability(plateNumber) {
    const filePath = FixtureDataService.findFixtureDataByKey(
      `U_stability_d1_plate${plateNumber}_path`
    );
    const fileName = FixtureDataService.findFixtureDataByKey(
      `U_stability_d1_plate${plateNumber}_file_name`
    );
    cy.importPlateDataCSV(filePath, fileName);
  }

  static goToStabilityTest() {
    cy.xpath(STABILITY_LOCATOR.stabilityTest).should("be.visible").click();
    cy.xpath(ADA_LOCATORS.d1P1Checkbox).should(
      "be.visible"
    );
  }

  static clickOnStartNewStability() {
    cy.contains("button", "Add New Stability Test").should("be.visible").click();
  }

  static selectChoice(choice) {
    const choiceLocator = STABILITY_LOCATOR[choice];
    cy.xpath(choiceLocator).click();
    cy.contains("button", "Test Stability").scrollToElement();
    cy.contains("button", "Test Stability").should(
      "be.enabled"
    );
  }

  static giveResultNameCommentForPlateAndChoice(plate, choice) {
    const plateResultObject = FixtureDataService.findFixtureDataByKey(
      `U_p${plate}_stability_result`
    );
    // Find result and comment based on plate and gender

    // Extract results and comments from the object values
    const results = plateResultObject.split(",").map(part => part.trim());

    // Find the result and comment for the specific choice
    const resultForChoice = results.find(result => result.includes(choice));

    // Extract result from the found choice
    const result = resultForChoice ? resultForChoice.split(" ")[1] : "";

    // Enter result and comment in the form
    cy.get(".optional-input > input").type(result);
    cy.get("textarea").type("Automation Test");

    // Save the form
    cy.clickSaveBtn();
    cy.get(".modal-body").should("be.visible");
  }

  static clickOnTestStability() {
    cy.contains("button", "Test Stability").should("be.visible").click();
    cy.get(".optional-input").scrollToElement();
    cy.get(".optional-input").should("be.visible");
  }
}

export default Stability;
