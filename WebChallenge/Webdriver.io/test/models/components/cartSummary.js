const CartItem = require("./cartItem");

module.exports = class CartSummary {
  $el;

  constructor(el) {
    this.$el = el;
  }

  async getCartItems() {
    let $el = await this.$el.$("tbody");
    let $items = await $el.$$("tr");
    let cartItems = [];
    for (let $item of $items) {
      cartItems.push(new CartItem($item));
    }
    return new Promise((resolve) => resolve(cartItems));
  }

  async getSubTotal() {
    let $el = await this.$el.$("#total_product");
    let text = await $el.getText();
    return new Promise((resolve) => resolve(Number(text.substring(1))));
  }
};
