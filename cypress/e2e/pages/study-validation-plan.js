// commented out for this release


/*import studyvalidationPlan_locator from "../locators/ValidationPlan-locators.json";

class studyValidationPlan {
  goToProject() {
    cy.xpath(studyvalidationPlan_locator.select_project).click();
    cy.waitUntil(() =>
      cy
        .get(".obj-list")
        .contains("li", "Automated Test Study")
        .should("be.visible")
    );
  }

  goTo1stStudy() {
    cy.get(".obj-list").contains("li", "Automated Test Study").click();
    cy.waitUntil(() =>
      cy.get(".edit-study-content").should("be.visible")
    );
  }

  goToDocument() {
    cy.xpath(studyvalidationPlan_locator.document).click();
    cy.waitUntil(() =>
      cy.get(".edit-study-content").should("be.visible")
    );
  }

  goToValidaionPlan() {
    cy.xpath(studyvalidationPlan_locator.val_plan).click();
    /*cy.waitUntil(() =>
      cy
        .contains("button", "Start Validation Plan")
        .scrollToElement()
        .should("be.visible")
    );*/
/*}

clickStartValidation() {
  cy.contains("button", "Start Validation Plan").click();
  cy.waitUntil(() =>
    cy
      .contains("button", "Update")
      .scrollToElement()
      .should("be.visible")
  );
}

goToContributor() {
  cy.xpath(studyvalidationPlan_locator.contributor).scrollToElement().click();
  cy.wait(100);

}

clickOnAdd() {
  cy.xpath(studyvalidationPlan_locator.add).click();
  cy.wait(100);
}

selectPrepareBy() {
  cy.get("select").select("a").scrollToElement();
  cy.wait(100);
}

addDetailsforPrepare() {
  //return cy.readFixtureCSV().then(() => {
    //cy.get("@fixtureData").then((fixtureData) => {
      const fixtureData = Cypress.env("fixtureData");

      const nameObject = fixtureData.find(
        (item) => item.key === "U_prepareBy_name"
      );
      const name = nameObject.value;

      const roleObject = fixtureData.find(
        (item) => item.key === "U_prepareBy_role"
      );
      const role = roleObject.value;

      const emailObject = fixtureData.find(
        (item) => item.key === "U_prepareBy_email"
      );
      const email = emailObject.value;

      cy.get(":nth-child(1) > :nth-child(3) > label > .form-control").type(
        name
      );
      cy.wait(100);
      cy.get(":nth-child(4) > label > .form-control").type(role);
      cy.wait(100);
      cy.get(":nth-child(1) > label > .form-control").type(email);
      cy.wait(100);
    //});
  //});
}

selectReviewBy() {
  cy.selectDropdownOption(
    studyvalidationPlan_locator.contributor_dropdown_review_by,
    "Review By"
  );
  cy.wait(100);
 // cy.get('select').select('b').scrollToElement();
  //cy.wait(100);

  // cy.wait(2000);
}

addDetailsforReview() {
  //return cy.readFixtureCSV().then(() => {
    //cy.get("@fixtureData").then((fixtureData) => {
      const fixtureData = Cypress.env("fixtureData");

      const nameObject = fixtureData.find(
        (item) => item.key === "U_reviewBy_name"
      );
      const name = nameObject.value;

      const roleObject = fixtureData.find(
        (item) => item.key === "U_reviewBy_role"
      );
      const role = roleObject.value;

      const emailObject = fixtureData.find(
        (item) => item.key === "U_reviewBy_email"
      );
      const email = emailObject.value;

      cy.get(":nth-child(3) > :nth-child(3) > label > .form-control").type(
        name
      );
      cy.wait(100);
      cy.get(":nth-child(3) > :nth-child(4) > label > .form-control").type(role);
      cy.wait(100);
      cy.get(":nth-child(4) > :nth-child(1) > label > .form-control").type(email);
      cy.wait(100);
    //});
  //});
}

selectApproveBy() {
  cy.selectDropdownOption(
    studyvalidationPlan_locator.contributor_dropdown_approve_by,
    "Approve By"
  );
  // cy.get('select').select('c');
  cy.wait(100);
}

addDetailsforApprove() {
  //return cy.readFixtureCSV().then(() => {
    //cy.get("@fixtureData").then((fixtureData) => {
      const fixtureData = Cypress.env("fixtureData");

      const nameObject = fixtureData.find(
        (item) => item.key === "U_approveBy_name"
      );
      const name = nameObject.value;

      const roleObject = fixtureData.find(
        (item) => item.key === "U_approveBy_role"
      );
      const role = roleObject.value;

      const emailObject = fixtureData.find(
        (item) => item.key === "U_approveBy_email"
      );
      const email = emailObject.value;

      cy.get(":nth-child(5) > :nth-child(3) > label > .form-control").type(
        name
      );
      cy.wait(100);
      cy.get(":nth-child(5) > :nth-child(4) > label > .form-control").type(role);
      cy.wait(100);
      cy.get(":nth-child(6) > :nth-child(1) > label").type(email);
      cy.wait(100);
    //});
  //});
}

clickOnUpdate() {
  cy.xpath(studyvalidationPlan_locator.update).click();
  cy.wait(100);
}

clickOnSponsor() {
  cy.xpath(studyvalidationPlan_locator.sponsor_tab).scrollToElement().click();
  cy.wait(100);

}

addDetailsforSponsor() {
  //return cy.readFixtureCSV().then(() => {
    //cy.get("@fixtureData").then((fixtureData) => {
      const fixtureData = Cypress.env("fixtureData");

      const nameObject = fixtureData.find(
        (item) => item.key === "U_sponsor1By_name"
      );
      const name = nameObject.value;

      const roleObject = fixtureData.find(
        (item) => item.key === "U_sponsor1By_role"
      );
      const role = roleObject.value;

      const emailObject = fixtureData.find(
        (item) => item.key === "U_sponsor1By_email"
      );
      const email = emailObject.value;

      cy.get(":nth-child(1) > :nth-child(2) > label > .form-control").type(
        name
      );
      cy.wait(100);
      cy.get(":nth-child(1) > :nth-child(3) > label > .form-control").type(role);
      cy.wait(100);
      cy.get(":nth-child(1) > label > .form-control").type(email);
      cy.wait(100);
    //});
  //});
}

clickOnDocumenTab() {
  cy.xpath(studyvalidationPlan_locator.doc).click();
  cy.wait(100);
}

clickOnNextBtn() {
  cy.xpath(studyvalidationPlan_locator.next_btn).click();
  cy.wait(100);
}

clickOnAddTable() {
  cy.xpath(studyvalidationPlan_locator.addTbale_info).click();
  cy.wait(100);
}

clickOnInfo() {
  cy.xpath(studyvalidationPlan_locator.info).click();
  cy.wait(100);
}

addReviewer() {
  cy.xpath(studyvalidationPlan_locator.review_info).click();
  cy.wait(100);
}

clickonSave() {
  cy.xpath(studyvalidationPlan_locator.save_btn).click();
  cy.wait(100);
}

addNewSection() {
  cy.xpath(studyvalidationPlan_locator.new_sec).click();
  cy.wait(100);
}

renameNewSection() {
  cy.xpath(studyvalidationPlan_locator.nes_sec_name)
    .invoke("val", "")
    .type("Configuration Details");
  cy.wait(100);
}

addNewSubSection() {
  cy.xpath(studyvalidationPlan_locator.sub_sec).click();
  cy.wait(100);
}

renameSubSec() {
  cy.xpath(studyvalidationPlan_locator.rename_sub_sec)
    .invoke("val", "")
    .type("Acceptance Criteria");
  cy.wait(100);
}

selectConfig() {
  cy.xpath(studyvalidationPlan_locator.sec1_add).click();
  cy.xpath(studyvalidationPlan_locator.config).click();
  cy.wait(100);
}

addAcceptCriteria() {
  cy.xpath(studyvalidationPlan_locator.ac_cri).click();
  cy.wait(100);
}

goToNextSec() {
  cy.xpath(studyvalidationPlan_locator.next_page).click();
  cy.wait(100);
}

addQC() {
  cy.xpath(studyvalidationPlan_locator.sub_sec).eq(0).click();

  cy.xpath(studyvalidationPlan_locator.sec2)
    .invoke("val", "")
    .type("Quality Control");
  cy.xpath(studyvalidationPlan_locator.sec2_add).click();
  cy.xpath(studyvalidationPlan_locator.config).click();
  cy.xpath(studyvalidationPlan_locator.qc).click();
  cy.xpath(studyvalidationPlan_locator.add).click();
  // cy.xpath(studyvalidationPlan_locator.save_btn).click();
  cy.wait(100);
}

addSc() {
  cy.xpath(studyvalidationPlan_locator.sub_sec).eq(0).click();

  cy.xpath(studyvalidationPlan_locator.sec3)
    .invoke("val", "")
    .type("Screening Cutpoint");
  cy.xpath(studyvalidationPlan_locator.sec3_add).click();
  cy.xpath(studyvalidationPlan_locator.config).click();
  cy.xpath(studyvalidationPlan_locator.sc).click();
  cy.xpath(studyvalidationPlan_locator.add).click();
  //cy.xpath(studyvalidationPlan_locator.save_btn).click();
  cy.wait(100);
}

addCC() {
  cy.xpath(studyvalidationPlan_locator.sub_sec).eq(0).click();

  cy.xpath(studyvalidationPlan_locator.sec4)
    .invoke("val", "")
    .type("Confirmatory Cutpoint");
  cy.xpath(studyvalidationPlan_locator.sec4_add).click();
  cy.xpath(studyvalidationPlan_locator.config).click();
  cy.xpath(studyvalidationPlan_locator.cc).click();
  cy.xpath(studyvalidationPlan_locator.add).click();
  //cy.xpath(studyvalidationPlan_locator.save_btn).click();
  cy.wait(100);
}

addTC() {
  cy.xpath(studyvalidationPlan_locator.sub_sec).eq(0).click();

  cy.xpath(studyvalidationPlan_locator.sec5)
    .invoke("val", "")
    .type("Titer Cutpoint");
  cy.xpath(studyvalidationPlan_locator.sec5_add).click();
  cy.xpath(studyvalidationPlan_locator.config).click();
  cy.xpath(studyvalidationPlan_locator.tc).click();
  cy.xpath(studyvalidationPlan_locator.add).click();
  // cy.xpath(studyvalidationPlan_locator.save_btn).click();
  cy.wait(100);
}

addPAC() {
  cy.xpath(studyvalidationPlan_locator.sub_sec).eq(0).click();

  cy.xpath(studyvalidationPlan_locator.sec6)
    .invoke("val", "")
    .type("Precision and Acceptance Criteria Intra Assay");
  cy.xpath(studyvalidationPlan_locator.sec6_add).click();
  cy.xpath(studyvalidationPlan_locator.config).click();
  cy.xpath(studyvalidationPlan_locator.intra).click();
  cy.xpath(studyvalidationPlan_locator.add).click();
  //cy.xpath(studyvalidationPlan_locator.save_btn).click();
  cy.wait(100);
}

addPAControl() {
  cy.xpath(studyvalidationPlan_locator.sub_sec).eq(0).click();

  cy.xpath(studyvalidationPlan_locator.sec7)
    .invoke("val", "")
    .type("Precision and Acceptance Criteria Control");
  cy.xpath(studyvalidationPlan_locator.sec7_add).click();
  cy.xpath(studyvalidationPlan_locator.config).click();
  cy.xpath(studyvalidationPlan_locator.control).click();
  cy.xpath(studyvalidationPlan_locator.add).click();
  //cy.xpath(studyvalidationPlan_locator.save_btn).click();
  cy.wait(100);
}

addSensi() {
  cy.xpath(studyvalidationPlan_locator.sub_sec).eq(0).click();

  cy.xpath(studyvalidationPlan_locator.sec8)
    .invoke("val", "")
    .type("Sensitivity");
  cy.xpath(studyvalidationPlan_locator.sec8_add).click();
  cy.xpath(studyvalidationPlan_locator.config).click();
  cy.xpath(studyvalidationPlan_locator.sensi).click();
  cy.xpath(studyvalidationPlan_locator.add).click();
  // cy.xpath(studyvalidationPlan_locator.save_btn).click();
  cy.wait(100);
}

addHook() {
  cy.xpath(studyvalidationPlan_locator.sub_sec).eq(0).click();

  cy.xpath(studyvalidationPlan_locator.sec9)
    .invoke("val", "")
    .type("Hook Effect");
  cy.xpath(studyvalidationPlan_locator.sec9_add).click();
  cy.xpath(studyvalidationPlan_locator.config).click();
  cy.xpath(studyvalidationPlan_locator.hook).click();
  cy.xpath(studyvalidationPlan_locator.add).click();
  //cy.xpath(studyvalidationPlan_locator.save_btn).click();
  cy.wait(100);
}

addSelectivity() {
  cy.xpath(studyvalidationPlan_locator.sub_sec).eq(0).click();

  cy.xpath(studyvalidationPlan_locator.sec10)
    .invoke("val", "")
    .type("Selectivity");
  cy.xpath(studyvalidationPlan_locator.sec10_add).click();
  cy.xpath(studyvalidationPlan_locator.config).click();
  cy.xpath(studyvalidationPlan_locator.selecti).click();
  cy.xpath(studyvalidationPlan_locator.add).click();
  // cy.xpath(studyvalidationPlan_locator.save_btn).click();
  cy.wait(100);
}

addStable() {
  cy.xpath(studyvalidationPlan_locator.sub_sec).eq(0).click();

  cy.xpath(studyvalidationPlan_locator.sec11)
    .invoke("val", "")
    .type("Stability Short Term");
  cy.xpath(studyvalidationPlan_locator.sec11_add).click();
  cy.xpath(studyvalidationPlan_locator.config).click();
  cy.xpath(studyvalidationPlan_locator.stable).click();
  cy.xpath(studyvalidationPlan_locator.add).click();
  //cy.xpath(studyvalidationPlan_locator.save_btn).click();
  cy.wait(100);
}

goToTool() {
  cy.xpath(studyvalidationPlan_locator.tool_tab).click();
  cy.wait(100);
}

goToWord() {
  cy.xpath(studyvalidationPlan_locator.word).click();
  cy.wait(100);
}

goToPdf() {
  cy.xpath(studyvalidationPlan_locator.pdf).click();
  cy.wait(100);
  cy.xpath(studyvalidationPlan_locator.yes).click();
  cy.wait(100);
}
}
/*export default studyValidationPlan;*/
