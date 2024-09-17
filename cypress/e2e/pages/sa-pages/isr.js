import '../../../support/commands';
import ISR from '../../locators/sa-locators/isr-locators.json';
import FixtureDataService from '../../services/fixture-data-service';
import SA from './sa';

class IncurredSampleReanalysis {
  static goToISRTab() {
    cy.xpath(ISR.isrTab).navigate();

    cy.screenshot({capture: 'fullPage'});
  }

  static ISRSelectSample() {
    cy.get(':nth-child(6) > :nth-child(1) > input').click();//304
    cy.get(':nth-child(9) > :nth-child(1) > input').click();//323
    cy.get(':nth-child(12) > :nth-child(1) > input').click();//337
    cy.get(':nth-child(16) > :nth-child(1) > input').click();//347
    cy.get(':nth-child(20) > :nth-child(1) > input').click();//367
    cy.get(':nth-child(31) > :nth-child(1) > input').click();//308
    cy.get(':nth-child(34) > :nth-child(1) > input').click();//327
    cy.get(':nth-child(41) > :nth-child(1) > input').click();//353
    cy.get(':nth-child(45) > :nth-child(1) > input').click();//373
    cy.get(':nth-child(59) > :nth-child(1) > input').click();//343
    cy.get(':nth-child(64) > :nth-child(1) > input').click();//357
    cy.get(':nth-child(68) > :nth-child(1) > input').click();//377
    cy.get(':nth-child(75) > :nth-child(1) > input').click();//314

    cy.get(':nth-child(92) > :nth-child(1) > input').click();//317
    cy.get(':nth-child(94) > :nth-child(1) > input').click();//319
    cy.get(':nth-child(95) > :nth-child(1) > input').click();//320
    cy.xpath(ISR.acceptSelection).scrollToElement().click();
    cy.screenshot({capture: 'fullPage'});
  }

  static ISRSampleWell() {
    //D3 to F4
    cy.get('tr:nth-child(5) td:nth-child(4) div:nth-child(1)').scrollToElement().click({
      ctrlKey: true
    });

    cy.get('tr:nth-child(5) td:nth-child(5) div:nth-child(1)').scrollToElement().click({
      ctrlKey: true
    });


    cy.get('tr:nth-child(6) td:nth-child(4) div:nth-child(1)').scrollToElement().click({
      ctrlKey: true
    });


    cy.get('tr:nth-child(6) td:nth-child(5) div:nth-child(1)').scrollToElement().click({
      ctrlKey: true
    });


    cy.get('tr:nth-child(7) td:nth-child(4) div:nth-child(1)').scrollToElement().click({
      ctrlKey: true
    });

    cy.get('tr:nth-child(7) td:nth-child(5) div:nth-child(1)').scrollToElement().click({
      ctrlKey: true
    });

    //A5 to H6
    cy.selectWell(2,6);
    cy.selectWell(2,7);
    cy.selectWell(3,6);
    cy.selectWell(3,7);
    cy.selectWell(4,6);
    cy.selectWell(4,7);
    cy.selectWell(5,6);
    cy.selectWell(5,7);
    cy.selectWell(6,6);
    cy.selectWell(6,7);
    cy.selectWell(7,6);
    cy.selectWell(7,7);
    cy.selectWell(8,6);
    cy.selectWell(8,7);
    cy.selectWell(9,6);
    cy.selectWell(9,7);
    //A7 to E8
    //A
    cy.selectWell(2,8);
    cy.selectWell(2,9);
    //B
    cy.selectWell(3,8);
    cy.selectWell(3,9);
    //C
    cy.selectWell(4,8);
    cy.selectWell(4,9);
    //D
    cy.selectWell(5,8);
    cy.selectWell(5,9);

    //E
    cy.selectWell(6,8);
    cy.selectWell(6,9);
    SA.clickSampleTypeRadioBtn();
  }

  static adjustDilutionTo10() {
    cy.get(
      "app-edit-study-body div[class='study-body-main'] tr tr:nth-child(2) td:nth-child(2) input:nth-child(1)"
    ).clear().type(10);
    cy.get(
      "app-edit-study-body div[class='study-body-main'] tr tr:nth-child(3) td:nth-child(2) input:nth-child(1)"
    ).clear().type(10);
    cy.get(
      "app-edit-study-body div[class='study-body-main'] tr tr:nth-child(9) td:nth-child(2) input:nth-child(1)"
    ).clear().type(10);
    cy.get(
      "app-edit-study-body div[class='study-body-main'] tr tr:nth-child(10) td:nth-child(2) input:nth-child(1)"
    ).clear().type(10);
    cy.get(
      "app-edit-study-body div[class='study-body-main'] tr tr:nth-child(11) td:nth-child(2) input:nth-child(1)"
    ).clear().type(10);
    cy.get(
      "app-edit-study-body div[class='study-body-main'] tr tr:nth-child(14) td:nth-child(2) input:nth-child(1)"
    ).clear().type(10);
    cy.get(
      "app-edit-study-body div[class='study-body-main'] tr tr:nth-child(16) td:nth-child(2) input:nth-child(1)"
    ).clear().type(10);
    cy.get(
      "app-edit-study-body div[class='study-body-main'] tr tr:nth-child(17) td:nth-child(2) input:nth-child(1)"
    ).clear().type(10);
    cy.screenshot({capture: 'fullPage'});
  }

  static checkISRResult() {
    cy.xpath(ISR.isrResult).scrollToElement().click();
    cy.screenshot({capture: 'fullPage'});
  }

  static importDataISRPlate1() {
    const fileName = FixtureDataService.findFixtureDataByKey('U_ISR_filepath');
    cy.importPlateDataXlsx(fileName);
  }

  static isrRule() {
    const rule = FixtureDataService.findFixtureDataByKey('U_isr_rule').trim(); // Trim whitespace

    // Retrieve the text first
    cy.get('.text-success').invoke('text').then(text => {
      // Trim whitespace from the text retrieved from the element
      const textTrimmed = text.trim();
      // Once the text is retrieved, perform the assertion
      expect(textTrimmed).to.equal(rule);
    });
  }
}

export default IncurredSampleReanalysis;
