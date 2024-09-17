import AddNewModal from "../pages/add-new-modal.js";
import DashboardPage from "../pages/dashboard-page.js";
import LoginPage from "../pages/login-page.js";
import ConfigurationPage from '../pages/pk-pages/configuration-page.js';

describe("General Test Cases", () => {
  before(() => {
    cy.clearLocalStorage();
    cy.readFixtureCSV("PK Data Files/Test-Data.csv").then(fixtureData => {
      Cypress.env('fixtureData', fixtureData);
    });
  });

  after(() => {
    LoginPage.logout();
  });

  it("Test invalid login credentials", () => {
    LoginPage.incorrectLoginCredentials();
  });

  it("Login with correct credentials", () => {
    LoginPage.loginWithCorrectCredentials();
  });

  describe("Create and edit program and project", () => {
    it("OQ 3.1.2-> clicks on PK module", () => {
      DashboardPage.selectPKModule();
    });

    it("OQ 3.1.5-> create a new program", () => {
      AddNewModal.createNewProgram();
    });

    it("OQ 3.2.5-> edit newly created program", () => {
      AddNewModal.editNewlyCreatedProgram();
    });

    it("OQ 3.3.6-> create a new project", () => {
      AddNewModal.createNewProject();
    });

    it("OQ 3.4.5-> edit project description", () => {
      AddNewModal.editNewlyCreatedProject();
    });
  });

  describe("Create Study without importing config, then update configuration", () => {
    describe("Test Script 3.5:  Test Study Creation -> Create study 2", () => {
      it("OQ OQ 3.5.9-> User creates another new study. User does not import the configuration for this study", () => {
        AddNewModal.createNewStudy(undefined, false, "Study without importing config");
      });
    });

    describe("Test Script 7.1:  Test Configuration Import to the second study", () => {
      it("OQ OQ 7.1.3-> User selects the configuration link in the left-hand navigation bar", () => {
        ConfigurationPage.navigateToConfigPage();
      });

      it("OQ OQ 7.1.4-> User selects the drop-down icon next to the Configuration title and chooses the Import Config option. Use clicks the Open file button and then navigates to “test script files/PK/” folder (a sibling folder to this document) and selects the Configuration pk.json file and clicks “Import", () => {
        ConfigurationPage.importConfigFromConfiguration();
        ConfigurationPage.confirmImportConfig();
      });
      it("OQ OQ 7.1.5-> User navigates to ‘Analysts List’", () => {
        ConfigurationPage.navigateToTab("Analysts List");
      });
      it("OQ OQ 7.1.6-> User chooses their name from the drop-down list and clicks on Add", () => {
        ConfigurationPage.addAnalyst();
      });
      it("OQ OQ 7.1.7 to 7.1.8-> User clicks the Update button.User provides username, password and reason for change and clicks submit", () => {
        ConfigurationPage.updateConfiguration();
      });

      it("OQ OQ 7.1.9 to 7.1.10-> User clicks the Approve button.User provides username, password and reason for change and clicks submit", () => {
        ConfigurationPage.approveConfiguration();
      });

    });

    describe("Test Script 7.2:  Test Configuration Unapprove", () => {
      it("OQ OQ 7.2.3-> User selects the configuration link in the left-hand navigation bar", () => {
        ConfigurationPage.navigateToConfigPage();
      });

      it("OQ OQ 7.2.4 to 7.2.5-> User clicks the unapprove button.User provides username, password and reason for change and clicks submit", () => {
        ConfigurationPage.unapproveConfiguration();
      });
    });

    describe("Test Script 7.3:  Test Configuration Reject", () => {
      it("OQ OQ 7.3.3-> User selects the configuration link in the left-hand navigation bar", () => {
        ConfigurationPage.navigateToConfigPage();
      });

      it("OQ OQ 7.3.4 to 7.3.5-> User clicks the reject button.User provides username, password and reason for change and clicks submit", () => {
        ConfigurationPage.rejectConfiguration();
      });

      it("OQ OQ 7.3.6-> User clicks the Approve button.User provides username, password and reason for change and clicks submit", () => {
        ConfigurationPage.approveConfiguration();
      });
    });
  });
});
