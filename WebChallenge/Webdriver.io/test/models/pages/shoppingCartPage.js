const Page = require("./page");
const CartSummary = require("../components/cartSummary");

module.exports = class ShoppingCartPage extends Page {
  route = "index.php?controller=order";
  open() {
    return super.open(route);
  }

  async isLoaded() {
    let url = await browser.getUrl();
    if (url.endsWith(this.route)) {
      return false;
    }
    let $el = await $("#cart_title");
    return await $el.isDisplayed();
  }

  async getCartSummary() {
    return new CartSummary(await $("#cart_summary"));
  }

  async isCartEmpty() {
    let success = false;
    let $el = await $(".alert-warning");
    let warningIsDisplayed = await $el.isDisplayed();
    if (warningIsDisplayed) {
      let text = await $el.getText();
      if (text == "Your shopping cart is empty.") {
        success = true;
      }
    }
    return new Promise((resolve) => resolve(success));
  }
};
