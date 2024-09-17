// commented out for this release


/*import studyvalidationPlan_locator from "../locators/ValidationPlan-locators.json";
import statisticalLocator from '../locators/Statistical-locators.json';

class statistical{

    goToStatisticPlan() {
        cy.xpath (statisticalLocator.statistic_tab).click();
        cy.wait(100)
    }

    clickStartStatistic() {
        cy.contains("button", "Start Report").click();
        cy.wait(100)
    }

    renameNewSection() {
        cy.xpath(studyvalidationPlan_locator.nes_sec_name).invoke("val", "").type('13. Results and Discussion');
        cy.wait(100)
    }


    approveSc(){
        cy.get(statisticalLocator.subsec_btn).eq(0).click();
        cy.xpath(statisticalLocator.sec1).invoke("val", "").type('13.1.1. Screening Cut Point');
        cy.get("div[id='section2.1'] div[class='tool-bar'] button:nth-child(1)").click();
        cy.get(':nth-child(2) > .icon-btn > .fas').click({multiple:true})
        cy.xpath(statisticalLocator.av_sc).click()
        cy.xpath(studyvalidationPlan_locator.add).click();
        cy.wait(100)
    }

    approvecc(){
        cy.xpath(studyvalidationPlan_locator.sub_sec).eq(0).click();
        cy.xpath(statisticalLocator.sec2).invoke("val", "").type('13.1.2. Approved Confirmatory Cutpoint');
        cy.get("div[id='section2.2'] div[class='tool-bar'] button:nth-child(1)").click();
        cy.get(':nth-child(2) > .icon-btn > .fas').click({multiple:true})
        cy.xpath(statisticalLocator.cc).click()
        cy.xpath(studyvalidationPlan_locator.add).click();
        cy.wait(100)
    }

    approvetc(){
        cy.xpath(studyvalidationPlan_locator.sub_sec).eq(0).click();
        cy.xpath(statisticalLocator.sec3).invoke("val", "").type('13.1.3. Approved Titer Cutpoint');
        cy.get("div[id='section2.3'] div[class='tool-bar'] button:nth-child(1)").click();
        cy.get(':nth-child(2) > .icon-btn > .fas').click({multiple:true})
        cy.xpath(statisticalLocator.tc).click()
        cy.xpath(studyvalidationPlan_locator.add).click();
        cy.wait(100)
    }

    approvesensi(){
        cy.xpath(studyvalidationPlan_locator.sub_sec).eq(0).click();
        cy.xpath(statisticalLocator.sec4).invoke("val", "").type('13.1.4. Final Sensitivity');
        cy.get("div[id='section2.4'] div[class='tool-bar'] button:nth-child(1)").click();
        cy.get(':nth-child(2) > .icon-btn > .fas').click({multiple:true})
        cy.xpath(statisticalLocator.sensi).click()
        cy.xpath(studyvalidationPlan_locator.add).click();
        cy.wait(100)
    }

    approvePreci(){
        cy.xpath(studyvalidationPlan_locator.sub_sec).eq(0).click();
        cy.xpath(statisticalLocator.sec5).invoke("val", "").type('13.1.5. Intra and Inter Precision ');
        cy.get("div[id='section2.5'] div[class='tool-bar'] button:nth-child(1)").click();
        cy.get(':nth-child(2) > .icon-btn > .fas').click({multiple:true})
        cy.xpath(statisticalLocator.intra).click()
        cy.xpath(studyvalidationPlan_locator.add).click();
        cy.wait(100)
    }

    approvedrug(){
        cy.xpath(studyvalidationPlan_locator.sub_sec).eq(0).click();
        cy.xpath(statisticalLocator.sec6).invoke("val", "").type('13.1.6. Drug Tolerance');
        cy.get("div[id='section2.6'] div[class='tool-bar'] button:nth-child(1)").click();
        cy.get(':nth-child(2) > .icon-btn > .fas').click({multiple:true})
        cy.xpath(statisticalLocator.drug).click()
        cy.xpath(studyvalidationPlan_locator.add).click();
        cy.wait(100)
    }

    approveselect(){
        cy.xpath(studyvalidationPlan_locator.sub_sec).eq(0).click();
        cy.xpath(statisticalLocator.sec7).invoke("val", "").type('13.1.7.  Final Selectivity');
        cy.get("div[id='section2.7'] div[class='tool-bar'] button:nth-child(1)").click();
        cy.get(':nth-child(2) > .icon-btn > .fas').click({multiple:true})
        cy.xpath(statisticalLocator.select).click()
        cy.xpath(studyvalidationPlan_locator.add).click();
        cy.wait(100)
    }

    /*addConslusion() {
        cy.xpath(studyvalidationPlan_locator.nes_sec_name).invoke("val", "").type('14. CONCLUSION');
        cy.wait(100)

    }*/

/*}export default statistical*/