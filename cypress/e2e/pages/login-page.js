import LOGIN_LOCATORS from "../locators/login-locators.json";
import FixtureDataService from "../services/fixture-data-service";

class LoginPage {
  static incorrectLoginCredentials() {
      const username = FixtureDataService.findFixtureDataByKey("U_incorrect_username");
      const password = FixtureDataService.findFixtureDataByKey("U_incorrect_password");
      const validator = interception => {
        const response = interception.response;
        expect(response.statusCode).to.not.eq(200);
        cy.xpath(LOGIN_LOCATORS.invalidAlert).should("exist");
        cy.screenshot({capture: "fullPage"});
      };

      cy.intercept({
        method: "POST",
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword*",
      }).as("verifyPassword");

      cy.login(username, password);

      cy.wait("@verifyPassword").then(validator);

  }

  static loginWithCorrectCredentials() {
    const username = FixtureDataService.findFixtureDataByKey("U_correct_username");
    const password = FixtureDataService.findFixtureDataByKey("U_correct_password");
    const validator = () => {
      cy.get(".main-page").should("exist");
      cy.removeWatermark();
      cy.screenshot({capture: "fullPage"});
    };

    cy.intercept({
      method: "POST",
      url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword*",
    }).as("verifyPassword");

    cy.login(username, password);
    cy.wait("@verifyPassword").then(validator);
  }

  static logout() {
    cy.xpath(LOGIN_LOCATORS.logoutButton).should("be.visible");
    cy.xpath(LOGIN_LOCATORS.logoutButton).click();
    cy.get(".inner");
    cy.screenshot({capture: "fullPage"});
  }
}

export default LoginPage;
