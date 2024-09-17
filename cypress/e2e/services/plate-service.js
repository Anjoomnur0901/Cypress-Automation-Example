import PLATE_LOCATORS from '../locators/plate-locators.json';

class PlateService {
  static selectTemplate(templateName) {
    cy.get(PLATE_LOCATORS.templateSelect)
      .scrollToElement()
      .select(templateName)
      .then(() => {
        cy.get(PLATE_LOCATORS.sampleGroupsTable).within(() => {
          cy.get(PLATE_LOCATORS.sampleGroupName).should('exist');
          cy.get(PLATE_LOCATORS.sampleGroupType).should('exist');
        });
      });
  }

  static goToSummaryTab() {
    cy.xpath(PLATE_LOCATORS.summaryTab).scrollToElement().click();
    cy.get(".plate-info-table").should("exist");
  }

  static updatePlateStatus(newStatus) {
    this.goToSummaryTab();

    cy.get(PLATE_LOCATORS.plateStatusSelect)
      .scrollToElement()
      .select(newStatus);

    cy.confirmNotification();
    cy.provideEsign();
  }

  static acceptPlate() {
    this.updatePlateStatus("Accept");
  }

  static rejectPlate() {
    this.updatePlateStatus("Reject");
  }
}

export default PlateService;