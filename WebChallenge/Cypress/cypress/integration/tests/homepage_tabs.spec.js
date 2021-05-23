/// <reference types="cypress" />

import { HomePage } from "../../pageObjects/homePage";

describe("test home page tabs", async () => {
  let homePage;

  before(() => {
    homePage = new HomePage();
    homePage.visit();
  });

  it("home page tabs control should be visible", () => {
    debugger;
    homePage.tabs.getContainerElement().scrollIntoView().should("be.visible");
  });

  it("BEST SELLERS tab should be visible on the home page", () => {
    homePage.tabs
      .getTabByLabel("Best Sellers")
      .getContainerElement()
      .scrollIntoView()
      .should("be.visible");
  });

  it("BEST SELLERS tab should be active after clicking", () => {
    homePage.tabs.getTabByLabel("Best Sellers").getContainerElement().click();
    homePage.tabs.getTabByLabel("Best Sellers").shouldBeActive();
    homePage.tabs.getTabByLabel("Best Sellers").getShelf().shouldBeVisible();
  });
});
