import '../../../support/commands';
import STUDY_CONFIG_LOCATORS from '../../locators/study-configuration-locators.json';
import FixtureDataService from '../../services/fixture-data-service';

class Configuration {
  static navigateToConfigPage() {
    cy.xpath(STUDY_CONFIG_LOCATORS.configurationTab).navigate();
    cy.get("modal-container, bs-modal-backdrop").should("not.exist");
  }

  static navigateToTab(tab) {
    cy.contains(STUDY_CONFIG_LOCATORS.tab, tab).scrollToElement().click();
  }

  static expandSection(title) {
    cy.contains("i", title).scrollToElement().click();
  }

  static addAnalyst() {
    cy.get(STUDY_CONFIG_LOCATORS.analystNameDropdown).should("be.visible");

    cy.get('.username > span').scrollToElement()
      .invoke('text')
      .then(currentUser => {
        cy.get(STUDY_CONFIG_LOCATORS.analystNameDropdown).should("be.visible").click();
        cy.get("div[id^='mat-select-']").should('be.visible');
        cy.get("div[id^='mat-select-']")
          .find('span')
          .contains(currentUser)
          .click();
        cy.screenshot({capture: 'fullPage'});
        cy.xpath(STUDY_CONFIG_LOCATORS.addAnalyst).should('be.visible').click();
        cy.screenshot({capture: 'fullPage'});
      });
  }

  static assertNewAnalyst(myVariable) {
    cy.get("table tr:nth-child(4) td:nth-child(1)").invoke('text').then(actualAnalyst => {
      cy.addTestContext(`Actual Analyst: ${actualAnalyst}`);
      const actualAnalystName = actualAnalyst.trim();
      const expectedAnalyst = myVariable.trim();
      expect(actualAnalystName).to.equal(expectedAnalyst);
      cy.screenshot({capture: "fullPage"});

    });
  }

  static importConfigFromConfiguration() {
    cy.xpath(STUDY_CONFIG_LOCATORS.configDropdown).should('be.visible').click();
    cy.xpath(STUDY_CONFIG_LOCATORS.importConfigOption).should('be.visible').click();
    const configFileName = FixtureDataService.findFixtureDataByKey("U_study_configuration_file_name");

    cy.fixture(configFileName).then(fileContent => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent,
        fileName: configFileName,
      });
    });
    cy.contains('button', 'Import').should("be.visible").click();
  }

  static confirmImportConfig() {
    cy.contains('button', 'Yes').should("be.visible").click();
    cy.xpath(STUDY_CONFIG_LOCATORS.updateBtn).should("be.enabled");
    cy.screenshot({capture: "fullPage"});
  }

  static updateButton() {
    cy.contains('button', 'Update').scrollToElement().click();
    cy.screenshot({capture: 'fullPage'});
  }

  static approve() {
    cy.screenshot({capture: 'fullPage'});
    cy.xpath(STUDY_CONFIG_LOCATORS.approveBtn).scrollToElement().click();
  }

  static unapprove() {
    cy.screenshot({capture: 'fullPage'});
    cy.xpath(STUDY_CONFIG_LOCATORS.unapproveBtn).scrollToElement().click();
  }

  static reject() {
    cy.screenshot({capture: 'fullPage'});
    cy.xpath(STUDY_CONFIG_LOCATORS.rejectBtn).scrollToElement().click();
  }

  static generalTab() {
    cy.get(STUDY_CONFIG_LOCATORS.general).scrollToElement().click();
  }

  static setCalibrationCurve() {
    const regression_val = FixtureDataService.findFixtureDataByKey('U_Regression');
    const weight_val = FixtureDataService.findFixtureDataByKey('U_Weight');
    const cal_val = FixtureDataService.findFixtureDataByKey('U_Calibrators');
    const noncal_val = FixtureDataService.findFixtureDataByKey(
      'U_Percentage_of_non_zero_passing_Calibrators'
    );
    cy.get('.max-width > :nth-child(2) > i').scrollToElement().click();
    cy.get(STUDY_CONFIG_LOCATORS.regression).scrollToElement();
    cy.selectDropdownOptionGet(STUDY_CONFIG_LOCATORS.regression, regression_val);
    cy.get(STUDY_CONFIG_LOCATORS.weight).scrollToElement();
    cy.selectDropdownOptionGet(STUDY_CONFIG_LOCATORS.weight, weight_val);
    cy.get(STUDY_CONFIG_LOCATORS.calibrator).scrollToElement();
    cy.get(STUDY_CONFIG_LOCATORS.calibrator).clear().type(cal_val);
    cy.xpath(STUDY_CONFIG_LOCATORS.percentageOfNonZeroPassingCalibrator).scrollToElement();
    cy.xpath(STUDY_CONFIG_LOCATORS.percentageOfNonZeroPassingCalibrator).clear().type(noncal_val);
    cy.screenshot({capture: 'fullPage'});
  }

  static decimalControl() {
    const dp1_val = FixtureDataService.findFixtureDataByKey(
      'U_minimum_number_of_digits_before_decimal_point'
    );
    const dp2_val = FixtureDataService.findFixtureDataByKey(
      'U_maximum_number_of_decimal_place_after_decimal_point'
    );
    cy.get(STUDY_CONFIG_LOCATORS.decimalControl).scrollToElement().click();
    cy.get(STUDY_CONFIG_LOCATORS.beforeDecimalPoint).should('be.visible');
    cy.get(STUDY_CONFIG_LOCATORS.beforeDecimalPoint).clear().type(dp1_val);
    cy.get(STUDY_CONFIG_LOCATORS.afterDecimalPoint).should('be.visible');
    cy.get(STUDY_CONFIG_LOCATORS.afterDecimalPoint).clear().type(dp2_val);
  }

  static isr() {
    cy.xpath(STUDY_CONFIG_LOCATORS.isrTab).scrollToElement().click();
    cy.xpath(STUDY_CONFIG_LOCATORS.isrValue).scrollToElement();
    cy.xpath(STUDY_CONFIG_LOCATORS.isrValue).clear().type('105');
    cy.xpath('//tr[3]//td[1]').scrollToElement().click();
  }

  static goToManageFilesTab() {
    cy.xpath(STUDY_CONFIG_LOCATORS.manageFileTab).scrollToElement().click();
    cy.screenshot({capture: 'fullPage'});
  }

  static addFile() {
    cy.xpath(STUDY_CONFIG_LOCATORS.addFileBtn).scrollToElement().click();
  }



  static approveConfiguration() {
    cy.xpath(STUDY_CONFIG_LOCATORS.approveBtn).scrollToElement().click();
    cy.get(".modal-body").should("be.visible");
    cy.provideEsign();
    // didn't work
    /*cy.get(".status-reject").should("be.visible");
    cy.get(".status-reject").invoke('text').then((actualConfigurationStatus) => {
      cy.log(`Actual Configuration Status: ${actualConfigurationStatus}`);
      const status = actualConfigurationStatus.trim();
      const expectedStatus = 'Study Configuration Status: Accept'
      expect(status).to.equal(expectedStatus);
    });*/
    cy.screenshot({capture: "fullPage"});
  }

  static updateConfiguration() {
    cy.xpath(STUDY_CONFIG_LOCATORS.updateBtn).scrollToElement().click();
    cy.get(".modal-body").should("be.visible");
    cy.provideEsign();
    cy.screenshot({capture: "fullPage"});

  }

  static unapproveConfiguration() {
    cy.xpath(STUDY_CONFIG_LOCATORS.unapproveBtn).scrollToElement();
    cy.xpath(STUDY_CONFIG_LOCATORS.unapproveBtn).click();
    cy.get(".modal-body").should("be.visible");
    cy.provideEsign();
    cy.get(".status-reject").should("be.visible");
    cy.get(".status-reject").invoke('text').then(actualConfigurationStatus => {
      cy.addTestContext(`Actual Configuration Status: ${actualConfigurationStatus}`);
      const status = actualConfigurationStatus.trim();
      const expectedStatus = 'Study Configuration Status: Pending';
      expect(status).to.equal(expectedStatus);
    });
    cy.screenshot({capture: "fullPage"});

  }

  static rejectConfiguration() {
    cy.xpath(STUDY_CONFIG_LOCATORS.rejectBtn).scrollToElement();
    cy.xpath(STUDY_CONFIG_LOCATORS.rejectBtn).click();
    cy.get(".modal-body").should("be.visible");
    cy.provideEsign();
    cy.get(".status-reject").should("be.visible");
    cy.get(".status-reject").invoke('text').then(actualConfigurationStatus => {
      cy.addTestContext(`Actual Configuration Status: ${actualConfigurationStatus}`);
      const status = actualConfigurationStatus.trim();
      const expectedStatus = 'Study Configuration Status: Reject';
      expect(status).to.equal(expectedStatus);
    });
    cy.screenshot({capture: "fullPage"});

  }
}

export default Configuration;
