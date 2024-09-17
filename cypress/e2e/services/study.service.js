import { times } from "lodash";
import PlateService from "./plate-service";

class StudyService {
  static addDatasetAndPlates(datasetCount, plateCount, templateName, importPlateFn, plateCreationCb, includePlateNumber = false, customPlateIndex) {
    describe(`Add ${datasetCount} dataset(s): ${plateCount} plate(s) for each dataset`, () => {
      times(datasetCount, datasetIndex => {
        const datasetNumber = datasetIndex + 1;

        describe(`Add dataset ${datasetNumber}`, () => {
          it(`Add new dataset ${datasetNumber}`, () => {
            cy.addNewDataset();
          });

          describe(`Add plates to the dataset ${datasetNumber}`, () => {
            times(plateCount, plateIndex => {
              const plateNumber = customPlateIndex ? customPlateIndex[datasetIndex][plateIndex] : plateIndex + 1;
              const customTemplateName = typeof templateName === "object" ? templateName[plateNumber] : templateName;

              it(`Go to dataset ${datasetNumber}`, () => {
                cy.goToDataset(datasetNumber);
              });

              it(`Add new plate ${plateNumber}`, () => {
                cy.addNewPlate();
                const templateWithPlateNumber = includePlateNumber ? `${customTemplateName} ${plateNumber}` : customTemplateName;
                PlateService.selectTemplate(templateWithPlateNumber);
                cy.clickOnNextStepBtn();
                importPlateFn(plateNumber, datasetNumber);
                cy.clickOnNextStepBtn();
                cy.clickOnNextStepBtn();
                cy.provideEsign();
              });

              plateCreationCb(plateNumber);
            });
          });
        });
      });
    });
  }
}

export default StudyService;
