import MISC_LOCATORS from '../../locators/misc-locators.json'
import SAMPLE_ANALYSIS_TEMPLATE_LOCATORS from '../../locators/sa-locators/template-locators.json'
import '../../../support/commands'

class TemplateCreation {
  static selectCalibrators1() {
    cy.selectWell(2,2);
    cy.selectWell(2,3);
    cy.selectWell(3,2);
    cy.selectWell(3,3);
    cy.selectWell(4,2);
    cy.selectWell(4,3);
    cy.selectWell(5,2);
    cy.selectWell(5,3);
    cy.selectWell(6,2);
    cy.selectWell(6,3);
    cy.selectWell(7,2);
    cy.selectWell(7,3);
    cy.selectWell(8,2);
    cy.selectWell(8,3);
    cy.selectWell(9,2);
    cy.selectWell(9,3);
    cy.selectWell(8,4);
    cy.selectWell(8,5);
    cy.selectWell(9,4);
    cy.selectWell(9,5);
  }

  static assignCalibrator() {
    cy.xpath(SAMPLE_ANALYSIS_TEMPLATE_LOCATORS.calibratorRb).scrollToElement();
    cy.xpath(SAMPLE_ANALYSIS_TEMPLATE_LOCATORS.calibratorRb).click();
    cy.get(
      SAMPLE_ANALYSIS_TEMPLATE_LOCATORS.calibratorGroupTextField
    ).scrollToElement();
    cy.get(SAMPLE_ANALYSIS_TEMPLATE_LOCATORS.calibratorGroupTextField).type('1');
    cy.screenshot({capture: 'fullPage'});
    cy.get(MISC_LOCATORS.assign).should('be.visible').click();
  }

  static qcFront() {
    cy.selectWell(2,4)
    cy.selectWell(2,5)
    cy.selectWell(3,4)
    cy.selectWell(3,5)
    cy.selectWell(4,4)
    cy.selectWell(4,5)
    cy.screenshot({capture: 'fullPage'});
    cy.get(SAMPLE_ANALYSIS_TEMPLATE_LOCATORS.qcRb).scrollToElement();
    cy.get(SAMPLE_ANALYSIS_TEMPLATE_LOCATORS.qcRb).click();
  }

  static frontName() {
    cy.get(SAMPLE_ANALYSIS_TEMPLATE_LOCATORS.qcLabel).should('be.visible');
    cy.get(SAMPLE_ANALYSIS_TEMPLATE_LOCATORS.qcLabel).clear().type('2');
    cy.get(SAMPLE_ANALYSIS_TEMPLATE_LOCATORS.groupNameTextArea).should(
      'be.visible'
    );
    cy.get(SAMPLE_ANALYSIS_TEMPLATE_LOCATORS.groupNameTextArea).clear().type('Front');
    cy.screenshot({capture: 'fullPage'});
    cy.get(MISC_LOCATORS.assign).should('be.visible').click();
    cy.screenshot({capture: 'fullPage'});
  }

  static qcBack() {
    cy.selectWell(7,12)
    cy.selectWell(7,13)
    cy.selectWell(8,12)
    cy.selectWell(8,13)
    cy.selectWell(9,12)
    cy.selectWell(9,13)
    cy.screenshot({capture: 'fullPage'});
  }

  static backName() {
    cy.get(SAMPLE_ANALYSIS_TEMPLATE_LOCATORS.groupNameTextArea).should(
      'be.visible'
    );
    cy.get(SAMPLE_ANALYSIS_TEMPLATE_LOCATORS.groupNameTextArea).clear().type('Back');
    cy.get(MISC_LOCATORS.assign).should('be.visible').click();
    cy.screenshot({capture: 'fullPage'});
  }

  static nameTemplate(TemplateName) {
    cy.get(SAMPLE_ANALYSIS_TEMPLATE_LOCATORS.templateTextarea).scrollToElement();
    cy.get(SAMPLE_ANALYSIS_TEMPLATE_LOCATORS.templateTextarea).clear().type(
      TemplateName
    );//ISR Template,SA Template
    cy.get(SAMPLE_ANALYSIS_TEMPLATE_LOCATORS.saveTemplate).scrollToElement();
    cy.get(SAMPLE_ANALYSIS_TEMPLATE_LOCATORS.saveTemplate).click();
    cy.screenshot({capture: 'fullPage'});
  }
}

export default TemplateCreation
