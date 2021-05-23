import { HomePageTab } from "./homePageTab";

export class HomePageTabs {
  containerElementSelector;
  constructor(containerElementSelector) {
    this.containerElementSelector = containerElementSelector;
  }
  getContainerElement() {
    return cy.get(this.containerElementSelector);
  }
  getTabByLabel(label) {
    return new HomePageTab(this, label);
  }
}
