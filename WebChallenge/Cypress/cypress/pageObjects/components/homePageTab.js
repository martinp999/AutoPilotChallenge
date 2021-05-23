import { HomePageTabShelf } from "./homePageTabShelf";
export class HomePageTab {
  parent;
  label;
  constructor(parent, label) {
    this.parent = parent;
    this.label = label;
  }
  getContainerElement() {
    return this.parent.getContainerElement().contains(this.label).parent();
  }
  click() {
    this.getContainerElement().click();
    return this;
  }
  shouldBeActive() {
    return this.getContainerElement().should("have.class", "active");
  }

  getShelf() {
    return new HomePageTabShelf(this);
  }
}
