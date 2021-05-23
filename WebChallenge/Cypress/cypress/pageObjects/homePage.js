import { HomePageTabs } from "./components/homePageTabs";

export class HomePage {
  tabs = new HomePageTabs("#home-page-tabs");
  visit() {
    cy.visit("/");
  }
}
