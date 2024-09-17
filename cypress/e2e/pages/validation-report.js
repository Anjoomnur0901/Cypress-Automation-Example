// commented out for this release

/*import studyvalidationPlan_locator from "../locators/ValidationPlan-locators.json";
import validationReport_locator from "../locators/ValidationReport-locator.json";
import statisticalLocator from "../locators/Statistical-locators.json";

class ValidationReportPage {
  goToPlateMap() {
    cy.xpath(validationReport_locator.plateMap_tab).click();
    cy.wait(100);
  }

  clickFirstPlate() {
    cy.xpath(validationReport_locator.firstPlate).click();
    cy.wait(100);
  }

  firstPlatePDF() {
    cy.xpath(validationReport_locator.PlatePdf).click();
    cy.wait(100);
  }

  goToValidationReport() {
    cy.xpath(validationReport_locator.val_report).click();
    cy.wait(100);
  }

  selectBlank() {
    cy.get("select").select("blank");
    cy.wait(100);
  }

  clickStartReport() {
    cy.contains("button", "Start Report").click();
    cy.waitUntil(() =>
      cy
        .contains("button", "Update")
        .scrollToElement()
        .should("be.visible")
    );
    cy.waitUntil(() =>
      cy
        .get("td > .form-control")
        .scrollToElement()
        .should("be.visible")
    );
  }

  renameTitle() {
    cy.get("td > .form-control")
      .invoke("val", "")
      .clear()
      .type("Updated Report");
    cy.waitUntil(() =>
      cy
        .get("td > .form-control")
        .scrollToElement()
        .should("have.value", "Updated Report")
    );
  }

  renameTestTitle() {
    cy.get(":nth-child(1) > td > label > .form-control")
      .invoke("val", "")
      .clear()
      .type("Updated Test Address");
    cy.waitUntil(() =>
      cy
        .get(":nth-child(1) > td > label > .form-control")
        .scrollToElement()
        .should("have.value", "Updated Test Address")
    );
  }

  clickUpdate() {
    cy.contains("button", "Update").click();
    cy.wait(100);
  }

  selectParticipate() {
    cy.wait(100);
    cy.selectDropdownOption(
      validationReport_locator.contributor_dropdown_participate,
      "Participate"
    );
    // cy.get('select').select('c');
    cy.wait(100);
  }

  addDetailsforParticipate() {
    //return cy.readFixtureCSV().then(() => {
    //cy.get("@fixtureData").then((fixtureData) => {
    const fixtureData = Cypress.env("fixtureData");

    const nameObject = fixtureData.find(
      (item) => item.key === "U_participateBy_name"
    );
    const name = nameObject.value;

    const roleObject = fixtureData.find(
      (item) => item.key === "U_participateBy_role"
    );
    const role = roleObject.value;

    const emailObject = fixtureData.find(
      (item) => item.key === "U_participateBy_email"
    );
    const email = emailObject.value;

    cy.get(":nth-child(7) > :nth-child(3) > label > .form-control").type(name);
    cy.wait(100);
    cy.get(":nth-child(7) > :nth-child(4) > label > .form-control").type(role);
    cy.wait(100);
    cy.get(":nth-child(8) > :nth-child(1) > label > .form-control").type(email);
    cy.wait(100);
    //});
    //});
  }

  addDetailsforSponsor2() {
    //return cy.readFixtureCSV().then(() => {
    //cy.get("@fixtureData").then((fixtureData) => {
    const fixtureData = Cypress.env("fixtureData");

    const nameObject = fixtureData.find(
      (item) => item.key === "U_sponsor2By_name"
    );
    const name = nameObject.value;

    const roleObject = fixtureData.find(
      (item) => item.key === "U_sponsor2By_role"
    );
    const role = roleObject.value;

    const emailObject = fixtureData.find(
      (item) => item.key === "U_sponsor2By_email"
    );
    const email = emailObject.value;

    cy.get(":nth-child(3) > :nth-child(2) > label > .form-control").type(name);
    cy.wait(100);
    cy.get(":nth-child(3) > :nth-child(3) > label > .form-control").type(role);
    cy.wait(100);
    cy.get(":nth-child(4) > :nth-child(1) > label > .form-control").type(email);
    cy.wait(100);
    //});
    //});
  }

  removeSecondSponsor() {
    cy.xpath(validationReport_locator.remove_btn).click();
    cy.wait(100);
  }

  removeExtra() {
    cy.get(":nth-child(5) > .input-group-append > .btn > .fas").click();
    cy.wait(100);
  }

  addReview() {
    cy.get(statisticalLocator.subsec_btn).eq(0).click();
    cy.xpath(validationReport_locator.sec12).invoke("val", "").type("Review");
    cy.xpath(validationReport_locator.sec12_add).click();
    cy.xpath(studyvalidationPlan_locator.info).click();
    cy.xpath(studyvalidationPlan_locator.review_info).click();
    cy.xpath(studyvalidationPlan_locator.add).click();
    //cy.xpath(studyvalidationPlan_locator.save_btn).click();
    cy.wait(100);
  }

  renameThirdSection() {
    cy.xpath(validationReport_locator.sec3_rename)
      .invoke("val", "")
      .type("Study Data");
    cy.wait(100);
  }

  approveSc() {
    cy.get(statisticalLocator.subsec_btn).eq(0).click();
    cy.xpath(validationReport_locator.sec1)
      .invoke("val", "")
      .type("3.1.1. Screening Cut Point");
    cy.xpath(validationReport_locator.sec1_add).click();
    cy.get(":nth-child(2) > .icon-btn > .fas").click({ multiple: true });
    cy.xpath(validationReport_locator.av_sc).click();
    cy.xpath(studyvalidationPlan_locator.add).click();
    cy.wait(100);
  }

  approvecc() {
    cy.get(statisticalLocator.subsec_btn).eq(0).click();

    cy.xpath(validationReport_locator.sec2)
      .invoke("val", "")
      .type("3.1.2. Approved Confirmatory Cutpoint");
    cy.xpath(validationReport_locator.sec2_add).click();
    cy.get(":nth-child(2) > .icon-btn > .fas").click({ multiple: true });
    cy.xpath(validationReport_locator.cc).click();
    cy.xpath(studyvalidationPlan_locator.add).click();
    cy.wait(100);
  }

  approvetc() {
    cy.get(statisticalLocator.subsec_btn).eq(0).click();

    cy.xpath(validationReport_locator.sec3)
      .invoke("val", "")
      .type("3.1.3. Approved Titer Cutpoint");
    cy.xpath(validationReport_locator.sec3_add).click();
    cy.get(":nth-child(2) > .icon-btn > .fas").click({ multiple: true });
    cy.xpath(validationReport_locator.tc).click();
    cy.xpath(studyvalidationPlan_locator.add).click();
    cy.wait(100);
  }

  approvesensi() {
    cy.get(statisticalLocator.subsec_btn).eq(0).click();

    cy.xpath(validationReport_locator.sec4)
      .invoke("val", "")
      .type("3.1.4. Final Sensitivity");
    cy.xpath(validationReport_locator.sec4_add).click();
    cy.get(":nth-child(2) > .icon-btn > .fas").click({ multiple: true });
    cy.xpath(validationReport_locator.sensi).click();
    cy.xpath(studyvalidationPlan_locator.add).click();
    cy.wait(100);
  }

  approvePreci() {
    cy.get(statisticalLocator.subsec_btn).eq(0).click();

    cy.xpath(validationReport_locator.sec5)
      .invoke("val", "")
      .type("3.1.5. Intra and Inter Precision ");
    cy.xpath(validationReport_locator.sec5_add).click();
    cy.get(":nth-child(2) > .icon-btn > .fas").click({ multiple: true });
    cy.xpath(validationReport_locator.intra).click();
    cy.xpath(studyvalidationPlan_locator.add).click();
    cy.wait(100);
  }

  approvedrug() {
    cy.get(statisticalLocator.subsec_btn).eq(0).click();

    cy.xpath(validationReport_locator.sec6)
      .invoke("val", "")
      .type("3.1.6. Drug Tolerance");
    cy.xpath(validationReport_locator.sec6_add).click();
    cy.get(":nth-child(2) > .icon-btn > .fas").click({ multiple: true });
    cy.xpath(validationReport_locator.drug).click();
    cy.xpath(studyvalidationPlan_locator.add).click();
    cy.wait(100);
  }

  approveselect() {
    cy.get(statisticalLocator.subsec_btn).eq(0).click();

    cy.xpath(validationReport_locator.sec7)
      .invoke("val", "")
      .type("3.1.7.  Final Selectivity");
    cy.xpath(validationReport_locator.sec7_add).click();
    cy.get(":nth-child(2) > .icon-btn > .fas").click({ multiple: true });
    cy.xpath(validationReport_locator.select).click();
    cy.xpath(studyvalidationPlan_locator.add).click();
    cy.wait(100);
  }

  clickPrev() {
    cy.waitUntil(() =>
      cy.contains("button", "Previous").should("be.visible")
    );
    cy.contains("button", "Previous").scrollToElement().click();
    cy.waitUntil(() =>
      cy
        .get("div[id='2'] input[type='text']")
        .should("be.visible")
    );
  }

  clickAgainPrev() {
    cy.contains("button", "Previous").scrollToElement().click();
    cy.waitUntil(() =>
      cy
        .xpath(validationReport_locator.mainSec1)
        .should("be.visible")
    );
  }

  renameSec1() {
    cy.xpath(validationReport_locator.mainSec1)
      .invoke("val", "")
      .clear()
      .type("Document Information");
    cy.wait(100);
  }

  addTestTilte() {
    cy.xpath(validationReport_locator.mainsec_sub).click();
    cy.waitUntil(() =>
      cy
        .xpath(validationReport_locator.sub1)
        .should("be.visible")
    );
    cy.xpath(validationReport_locator.sub1)
      .invoke("val", "")
      .type("Test Site Name");
    cy.xpath(validationReport_locator.sub1_add).click();
    cy.xpath(validationReport_locator.info).click();
    cy.xpath(validationReport_locator.test_site_name).click();
    cy.xpath(studyvalidationPlan_locator.add).click();
    cy.wait(100);
  }

  goToAppendix() {
    cy.xpath(validationReport_locator.appendix_tab).click();
    cy.wait(100);
  }

  addSCP() {
    cy.xpath(validationReport_locator.write_ssp1)
      .invoke("val", "")
      .type("SCP Template 1");
    cy.wait(100);
    cy.xpath(validationReport_locator.chose_file).click();

    // Find the latest PDF in the downloads directory
    cy.findLatestPDFInDownloads().then((latestPDFPath) => {
      cy.readFile(latestPDFPath).then((fileContent) => {
        cy.get('input[type="file"]').attachFile({
          fileContent: fileContent,
          fileName: d1P1FileNameObject.value,
          mimeType: "application/pdf",
        });
      });
    });

    cy.wait(100);
  }

  /*addSCP() {
    cy.xpath(validationReport_locator.write_ssp1)
      .invoke("val", "")
      .type("SCP Template 1");
    cy.wait(100);
    cy.xpath(validationReport_locator.chose_file).click();
    return cy.readFixtureCSV().then(() => {
      cy.get("@fixtureData").then((fixtureData) => {
        const testCaseNumber = fixtureData.find(
          (item) => item.key === "Test case no." && item.value === "6.3.26"
        );

        if (testCaseNumber.value === "6.3.26") {
          const d1P1PathObject = fixtureData.find(
            (item) => item.key === "U_SCP_1_path"
          );
          const d1p1_path = d1P1PathObject.value;

          const d1P1FileNameObject = fixtureData.find(
            (item) => item.key === "U_SCP_1_file_name"
          );
          const d1p1_file_name = d1P1FileNameObject.value;

          cy.readFile(d1p1_path).then((fileContent) => {
            cy.get('input[type="file"]').attachFile({
              fileContent: fileContent,
              fileName: d1p1_file_name,
              mimeType: "application/pdf",
            });
          });

          cy.wait(100);
        }
      });
    });
  }*/
/*}
export default ValidationReportPage; */
