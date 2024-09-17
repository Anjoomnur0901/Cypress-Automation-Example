import DASHBOARD from '../../locators/dashboard-page-locators.json'
import '../../../support/commands'

class Dashboard {
  static selectSampleAnalysisModule() {
    cy.xpath(DASHBOARD.saModule).should('be.visible').click();
    cy.screenshot({capture: 'fullPage'});
  }
}

export default Dashboard
