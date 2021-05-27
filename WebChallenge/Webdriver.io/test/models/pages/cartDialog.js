class CartDialog {
  $el;

  constructor(el) {
    this.$el = el;
  }

  async clickContinueShoppingButton() {
    let timeout = 10000;
    let btn = await $("[title='Continue shopping']");
    await btn.waitForClickable({
      timeout: timeout,
      timeoutMsg: `element for ContinueShoppingButton was not clickable within the timeout of ${timeout} ms`,
    });
    return await btn.click();
  }
}
module.exports = CartDialog;
