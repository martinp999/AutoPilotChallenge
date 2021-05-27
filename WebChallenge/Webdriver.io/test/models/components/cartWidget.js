module.exports = class CartWidget {
  $el;

  constructor(el) {
    this.$el = el;
  }

  async click() {
    let timeout = 5000;
    let $el = await this.$el.$("a");
    await $el.waitForClickable({
      timeout: timeout,
      timeoutMsg: `element for CartWidget was not clickable within the timeout of ${timeout} ms`,
    });
    return await $el.click();
  }

  async getQuantity() {
    let $el = await this.$el.$(".ajax_cart_quantity");
    let text = await $el.getText();
    return new Promise((resolve) => resolve(Number(text)));
  }
};
