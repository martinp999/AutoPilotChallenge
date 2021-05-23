export class HomePageTabShelfItem {
  $el;

  constructor($el) {
    this.$el = $el;
  }

  getContainerElement() {
    return cy.wrap(this.$el);
  }

  click() {
    this.getContainerElement().click();
  }

  shouldBeVisible() {
    return this.getContainerElement().should("be.visible");
  }

  getAddToCartButton() {
    return this.getContainerElement().contains("Add to cart");
  }

  getMoreButton() {
    return this.getContainerElement().contains("More");
  }

  getPrice() {
    return this.$el
      .find("[itemprop='price']")
      .invoke("text")
      .then((el) => {
        var price = el.match(/(\d)*\.(\d){2}/);
        return price.length > 0 ? price[0] : undefined;
      });
  }
}
