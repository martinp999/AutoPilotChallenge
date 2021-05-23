/// <reference types="cypress" />

import { HomePage } from "../../pageObjects/homePage";

describe("test home page tabs", async () => {
  let homePage;

  before(() => {
    homePage = new HomePage();
    homePage.visit();
  });

  it("home page tabs control should be visible", () => {
    homePage.tabs
      .getTabByLabel("Best Sellers")
      .click()
      .getShelf()
      .getShelfItems()
      .itemAtIndex(0)
      .getPrice()
      .should("eq", "16.40");

    homePage.tabs
      .getTabByLabel("Best Sellers")
      .click()
      .getShelf()
      .getShelfItems()
      .numbItems()
      .then(($numbItems) => {
        for (var i = 0; i < $numbItems; i++) {
          debugger;
          homePage.tabs
            .getTabByLabel("Best Sellers")
            .getShelf()
            .getShelfItems()
            .itemAtIndex(i)
            .getPrice()
            .then((price) => {
              if (Number(price) < 30) {
                homePage.tabs
                  .getTabByLabel("Best Sellers")
                  .getShelf()
                  .getShelfItems()
                  .itemAtIndex(i)
                  .click();
              }
            });
        }
      });
  });
});
