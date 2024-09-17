import TEMPLATE_LOCATORS from "../../locators/pk-locators/template-locators.json";

class TemplateService {
  static selectTemplate(templateName) {
    cy.xpath(TEMPLATE_LOCATORS.templateDropdown).scrollToElement();
    cy.xpath(TEMPLATE_LOCATORS.templateDropdown).select(templateName);
    cy.xpath(TEMPLATE_LOCATORS.plateDiv).scrollToElement();
  }
}

export default TemplateService;
