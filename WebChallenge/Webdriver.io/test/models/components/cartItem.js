module.exports = class CartItem {
  $el;

  constructor(el) {
    this.$el = el;
  }

  async getProductName() {
    let $el = await this.$el.$(".product-name a");
    let text = await $el.getText();
    return text;
  }

  async getPrice() {
    let $el = await this.$el.$(".special-price");
    if (!(await $el.isDisplayed())) {
      $el = await this.$el.$(".price");
    }
    let text = await $el.getText();
    return new Promise((resolve) => resolve(Number(text.substring(1))));
  }

  async getQuantity() {
    let $el = await this.$el.$("input[type='hidden']");
    let text = await $el.getAttribute("value");
    return new Promise((resolve) => resolve(Number(text)));
  }

  async clickDeleteButton() {
    let timeout = 5000;
    let $el = await this.$el.$(".cart_quantity_delete");
    await $el.waitForClickable({
      timeout: timeout,
      timeoutMsg: `element for Delete was not clickable within the timeout of ${timeout} ms`,
    });
    return await $el.click();
  }
};
