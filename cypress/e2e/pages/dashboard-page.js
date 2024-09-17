import DASHBOARD_PAGE_LOCATORS from '../locators/dashboard-page-locators.json';

class DashboardPage {
  static selectAdaModule() {
    cy.xpath(DASHBOARD_PAGE_LOCATORS.immunogenicityModule).should("be.visible").click();
    cy.get('.dropdown-container > .btn').should("be.visible");
  }

  static selectPKModule() {
    cy.xpath(DASHBOARD_PAGE_LOCATORS.pkModule).should("be.visible").click();
    cy.get('.dropdown-container > .btn').should("be.visible");
  }
}

export default DashboardPage
