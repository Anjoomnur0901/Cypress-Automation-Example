import TEMPLATE_LOCATORS from "../../locators/sa-locators/template-locators.json";

import "../../../support/commands"

class TemplateServiceSA {
  static selectTemplate(templateName) {
    cy.xpath(TEMPLATE_LOCATORS.templateDropdown).scrollToElement()
    cy.selectDropdownOption(TEMPLATE_LOCATORS.templateDropdown, templateName);
  }

}

export default TemplateServiceSA;
