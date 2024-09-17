import HOOK_EFFECT_LOCATORS from "../../locators/ada-locators/hook-effect-locators.json";
import FixtureDataService from "../../services/fixture-data-service";


class HookEffect {
  static goToHook() {
    cy.xpath(HOOK_EFFECT_LOCATORS.hookTab).navigate();
  }

  static importCsvFileforPlateForHookEffect(plateNumber) {
    const filePath = FixtureDataService.findFixtureDataByKey(
      `U_hook_d1_plate${plateNumber}_path`
    );
    const fileName = FixtureDataService.findFixtureDataByKey(
      `U_hook_d1_plate${plateNumber}_file_name`
    );

    cy.importPlateDataCSV(filePath, fileName);
  }

  static clickonHookTest() {
    cy.xpath(HOOK_EFFECT_LOCATORS.hookTestTab).should("be.visible").click();
    cy.xpath(HOOK_EFFECT_LOCATORS.p1RadioBtn).should("be.visible");
  }

  static clickonP1RdatioBtn() {
    cy.xpath(HOOK_EFFECT_LOCATORS.p1RadioBtn).click();

    cy.contains("button", "Add New Hook Effect Test").scrollToElement();
    cy.contains("button", "Add New Hook Effect Test").should("be.enabled");
  }

  static clickOnNewHookTest() {
    cy.contains("button", "Add New Hook Effect Test").click();

    cy.get(".max-width > .table-container > .table > :nth-child(1) > th").scrollToElement();
    cy.get(".max-width > .table-container > .table > :nth-child(1) > th").should("be.visible");
  }

  static clickonPro1() {
    cy.xpath(HOOK_EFFECT_LOCATORS.pro1).scrollToElement().click();

    cy.contains("button", "Next").scrollToElement();
    cy.contains("button", "Next").should("be.enabled");
  }
}

export default HookEffect;
