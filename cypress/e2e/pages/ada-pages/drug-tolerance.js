import ADA_LOCATORS from '../../locators/ada-locators/ada-locators.json';
import DRUG_TOLERANCE_LOCATOR from "../../locators/drug-locators.json";
import FixtureDataService from "../../services/fixture-data-service";


class DrugTolerance {
  static goToDrugTolerance() {
    cy.xpath(DRUG_TOLERANCE_LOCATOR.drugTab).scrollToElement();
    cy.xpath(DRUG_TOLERANCE_LOCATOR.drugTab).should("be.visible").click();
    cy.xpath("//h3[normalize-space()='Drug Tolerance']").scrollToElement();
  }

  static importCsvFileforPlateForDrug(plateNumber) {
    const filePath = FixtureDataService.findFixtureDataByKey(
      `U_drug_d1_plate${plateNumber}_path`
    );
    const fileName = FixtureDataService.findFixtureDataByKey(
      `U_drug_d1_plate${plateNumber}_file_name`
    );

    cy.importPlateDataCSV(filePath, fileName);
  }

  static selectChoiceForDrug(choiceLocator) {
    const choiceLoc = DRUG_TOLERANCE_LOCATOR[choiceLocator];
    cy.xpath(choiceLoc).click();
    cy.contains("button", "Next").scrollToElement().should("be.enabled");
  }

  static giveResultNameCommentForPlateAndChoice(plate, choice) {
    // Find result and comment based on plate and choice
    //const plateKey = `U_p${plate}_drug_result`;

    //const plateResultObject = fixtureData.find((item) => item.key === plateKey);
    const plateResultObject = FixtureDataService.findFixtureDataByKey(
      `U_p${plate}_drug_result`
    );

    // Extract results and comments from the object values
    const results = plateResultObject.split(",").map(part => part.trim());

    // Find the result and comment for the specific choice
    const resultForChoice = results.find(result => result.includes(choice));

    // Extract result from the found choice
    const result = resultForChoice ? resultForChoice.split(" ")[1] : "";

    // Enter result and comment in the form
    cy.get(".optional-input > input").type(result);
    cy.get("textarea").type("Automation test");

    // Save the result
    cy.clickSaveBtn();
    cy.get(".modal-body").should("be.visible");
  }

  static goToDrugTest() {
    cy.xpath(DRUG_TOLERANCE_LOCATOR.drugTest).should("be.visible");
    cy.xpath(DRUG_TOLERANCE_LOCATOR.drugTest).click();
    cy.xpath(ADA_LOCATORS.d1P1Checkbox).should(
      "be.visible"
    );
  }

  static clickOnStartNewDrug() {
    cy.contains("button", "Add New Drug Tolerance Test").click();

    cy.get("div[class='max-width']").scrollToElement();
  }
}

export default DrugTolerance;
