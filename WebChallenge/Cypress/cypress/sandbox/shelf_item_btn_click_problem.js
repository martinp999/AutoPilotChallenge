/// <reference types="cypress" />

import { HomePage } from "../../pageObjects/homePage";

describe("test home page tabs", async () => {
  let homePage;

  before(() => {
    homePage = new HomePage();
    homePage.visit();
  });

  /**
   * Adding the item to the cart from the shortcut on the shelf item
   * proved to be too much of a challenge for the time available.
   *
   * For some reason, clicks from Cypress on the "Add to cart" button
   * on the shelf item do not trigger the event that loads the item overlay.
   *
   * Have tried -
   *
   * - applying a coloured border so that it is clear, both visually and via element style
   *   inspection, that the correct element is being manipulated
   * - using the https://github.com/dmtrKovalenko/cypress-real-events (Apparently, Cypress
   *   does not use the DevTools API as WebDriver does, it runs the site under test in an
   *   iframe on a page that is running the spec.  As such, events that it triggers are untrusted
   *   and may be blocked by some apps (https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted)).
   *   cypress-real-events addin attempts to overcome this by using the DevTools API for some
   *   actions. (it did not work in this case though, so the issue might not be one of trust)
   * - hovering over the element for a second before click (although hover might be another untrusted event)
   * - triggering the mousedown/up/enter/leave events directly (could not try realMouseUp as, although realMouseDown
   *   is recognised as a function, realMouseUp is not (could not see why after a quick inspection of
   *   cypress-real-events code))
   * - selecting the child span rather than the link element in case that was the element that was supposed
   *   to be clicked and propogation was blocked.
   * - changing the auto-scroll behaviour so that the whole item card was visible when the button was being clicked.
   * - changing the position within the element that the click was taking place.
   * - "forcing" the click, which would prevent Cypress from deciding that the element was not clickable.
   * - executing the tests in both Chrome and Edge
   *
   * Cypress documentation indicates that there is an expectation that the development team prioritises ensuring
   * that the application is testable (by Cypress).  Which is a reasonable expectation but might present challenges
   * in situations such as this exercise.
   *
   * For now, will have to apply a work-around and use a different path through the app (_some_ button clicks work, so trying my luck).
   */
  // it("can add to cart from shelf", () => {
  //   debugger;
  //   homePage.tabs
  //     .getTabByLabel("Best Sellers")
  //     .click()
  //     .getShelf()
  //     .getContainerElement()
  //     .children("li")
  //     .eq(6)
  //     .contains("Add to cart")
  //     // .children()
  //     // .parent()
  //     .then((el) => {
  //       el.css("border", "3px solid magenta");
  //     })
  //     // .realMouseUp()
  //     // .realMouseDown()
  //     .trigger("mouseover", { scrollBehavior: "center" })
  //     .trigger("mouseenter", { scrollBehavior: false })
  //     .trigger("mouseleave", { scrollBehavior: false })
  //     .trigger("mouseout", { scrollBehavior: false })
  //     .wait(1000)
  //     .realClick("top", { scrollBehavior: "center", force: true });
  //   // .click({ scrollBehavior: "center", force: true });

  //   cy.wait(3000);

  //   // cy.get("#layer_cart", { timeout: 10000 }).should("be.visible");

  //   // homePage.tabs
  //   //   .getTabByLabel("Best Sellers")
  //   //   .getShelf()
  //   //   .getShelfItems()
  //   //   .each((item, index) => {
  //   //     item.shouldBeVisible();
  //   //     item.getAddToCartButton().should("have.attr", "href");
  //   //     item.getAddToCartButton().click();
  //   //
  //   //   }, []);
  // });
});
