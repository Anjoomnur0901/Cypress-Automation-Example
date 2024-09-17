import { find } from "lodash";

class FixtureDataService {
  static findFixtureDataByKey(key) {
    const foundItem = find(Cypress.env("fixtureData"), { Variable: key });

    return foundItem ? foundItem.Value : undefined;
  }
}

export default FixtureDataService;