import { HomePageTabShelfItems } from "./homePageTabShelfItems";
export class HomePageTabShelf {
  parent;

  constructor(parent) {
    this.parent = parent;
  }

  getContainerElement() {
    return this.parent
      .getContainerElement()
      .invoke("index")
      .then((i) => {
        cy.get(".tab-content>ul").eq(i);
      });
  }

  shouldBeVisible() {
    return this.getContainerElement().should("be.visible");
  }

  getShelfItems() {
    return new HomePageTabShelfItems(this);
  }
}
