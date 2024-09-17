import { times } from "lodash"
import IncurredSampleReanalysis from "../../pages/sa-pages/isr"
import TemplateServiceSA from "./template-service"

import "../../../support/commands"
import SA from "../../pages/sa-pages/sa"

class AddPlateServiceSA {
  static addDatasetAndPlatesForSampleAnalysis(datasetCount, plateCount, templateName, importPlateFn, plateCreationCb, customPlateIndex) {
    describe(`Add ${datasetCount} dataset(s): ${plateCount} plate(s) for each dataset`, () => {
      times(datasetCount, datasetIndex => {
        const datasetNumber = datasetIndex + 1

        describe(`dataset ${datasetNumber}`, () => {
          describe(`Add plates to the dataset ${datasetNumber}`, () => {
            times(plateCount, plateIndex => {
              const plateNumber = customPlateIndex ? customPlateIndex[datasetIndex][plateIndex] : plateIndex + 1

              it(`Go to dataset ${datasetNumber}`, () => {
                cy.goToDataset(datasetNumber)
              });

              it(`Add new plate ${plateNumber}`, () => {
                cy.addNewPlate();
                TemplateServiceSA.selectTemplate(templateName);
                if (plateNumber == 1) {
                  SA.selectSamplesWellPlate1()
                  cy.clickOnAutoSelectBtn()
                } else if (plateNumber == 2) {
                  SA.selectSamplesWellp2()
                  SA.selectNotTestedSamples()
                } else if (plateNumber == 3) {
                  SA.selectSamplesWellp3()
                  SA.selectNotTestedSamples()
                } else {
                  SA.selectSamplesWellPlate4and5()
                  SA.selectNotTestedSamples()
                }
                SA.assign()
                cy.clickOnNextStepBtn()
                cy.clickOnImportDataButton()
                importPlateFn(plateNumber)
                cy.clickOnNextStepBtn()
                cy.clickOnNextStepBtn()
                cy.provideEsign()

              });
              plateCreationCb(plateNumber);
            })
          })
        })
      })
    })
  }

  static addPlateForSampleReanalysis(plateNumber, templateName, importPlateFn, dilution, plateCreationCb) {
    it('Go to dataset 1', () => {
      cy.goToDataset(1)
    });

    it(`Add new plate ${plateNumber}`, () => {
      cy.addNewPlate();
      TemplateServiceSA.selectTemplate(templateName);
      SA.reanalysisPlateSelection()
      SA.selectSamplesForReanalaysis()
      SA.assign()

      this.adjustDilution(dilution)

      cy.clickOnNextStepBtn()
      cy.clickOnImportDataButton()
      importPlateFn(plateNumber)
      cy.clickOnNextStepBtn()
      cy.clickOnNextStepBtn()
      cy.provideEsign()
    })

    plateCreationCb(plateNumber);
  }

  static adjustDilution(dilution) {
    cy.xpath(
      "//table[@class='table table-bordered']//tr[2]//td[2]//input"
    ).clear().type(dilution);

    cy.xpath(
      "//table[@class='table table-bordered']//tr[6]//td[2]//input"
    ).clear().type(dilution);
  }

  static addDatasetAndPlatesForIncurredSampleReanalysis(datasetCount, plateCount, templateName, plateCreationCb, customPlateIndex) {
    describe(`Add ${datasetCount} dataset(s): ${plateCount} plate(s) for each dataset`, () => {
      times(datasetCount, datasetIndex => {
        const datasetNumber = datasetIndex + 1

        describe(`dataset ${datasetNumber}`, () => {

          describe(`Add plates to the dataset ${datasetNumber}`, () => {
            times(plateCount, plateIndex => {
              const plateNumber = customPlateIndex ? customPlateIndex[datasetIndex][plateIndex] : plateIndex + 1

              it(`Go to dataset ${datasetNumber}`, () => {
                cy.goToDataset(datasetNumber)
              });

              it(`Add new plate ${plateNumber}`, () => {
                cy.addNewPlate();
                TemplateServiceSA.selectTemplate(templateName);
                IncurredSampleReanalysis.ISRSampleWell()
                cy.clickOnAutoSelectBtn()
                SA.assign()
                IncurredSampleReanalysis.adjustDilutionTo10()
                cy.clickOnNextStepBtn()
                cy.clickOnImportDataButton()
                IncurredSampleReanalysis.importDataISRPlate1()
                cy.clickOnNextStepBtn()
                cy.clickOnNextStepBtn()
                cy.provideEsign()
              })
              plateCreationCb(plateNumber);
            })
          })
        })
      })
    })
  }

}

export default AddPlateServiceSA;
